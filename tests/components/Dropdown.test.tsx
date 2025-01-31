import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import { DropdownItem } from '../../src/components/Dropdown/DropdownItem';
import { testSSR } from '../ssr/utils';

async function click(element : HTMLElement) {
  return waitFor(() => userEvent.click(element));
}

async function tab() {
  return waitFor(() => userEvent.tab());
}

async function type(element : HTMLElement, input: string) {
  return waitFor(() => userEvent.type(element, input));
}

async function keyboard(input: string) {
  return waitFor(() => userEvent.keyboard(input));
}

describe('Dropdown', () => {
  it('renders identical content between the server and the client.', () => {
    testSSR(
      <Dropdown screenReaderText='screen reader text here'>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  });

  it('can toggle hide/display', async () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    await React.act(() => render(
      <div data-testid='container'>
        <Dropdown {...dropdownProps}>
          <DropdownInput />
          <DropdownMenu>
            <DropdownItem value='item1'>
              item1
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>external div</div>
      </div>
    ));
    // hidden by default
    expect(screen.queryByText('item1')).toBeNull();

    // display when click into dropdown input
    await click(screen.getByRole('textbox'));
    expect(screen.getByText('item1')).toBeDefined();
    await waitFor(() => expect(mockedOnToggleFn).toBeCalledWith(true, '', '', -1, undefined));

    // hidden when click elsewhere outside of dropdown component
    await click(screen.getByText('external div'));
    expect(screen.queryByText('item1')).toBeNull();
    await waitFor(() => expect(mockedOnToggleFn).toBeCalledWith(false, '', '', -1, undefined));

    // display when tab into dropdown input
    await tab();
    expect(screen.getByText('item1')).toBeDefined();
    await waitFor(() => expect(mockedOnToggleFn).toBeCalledWith(true, '', '', -1, undefined));
  });

  it('handles arrowkey navigation properly and focuses on the option and input text', async () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    const itemNode = screen.getByText('item1');

    await keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    await keyboard('{arrowup}');
    expect(itemNode.className).not.toContain('FocusedItem1');
    expect(inputNode).not.toHaveValue('item1');
  });

  it('handles tab navigation properly and focuses on the option and input text', async () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    const itemNode = screen.getByText('item1');

    await keyboard('{Tab}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    await keyboard('{Shift>}{Tab}{/Shift}');
    expect(itemNode.className).not.toContain('FocusedItem1');
    expect(inputNode).not.toHaveValue('item1');
  });

  it('closes the dropdown menu when tabbing on last option', async () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    await keyboard('{Tab}{Tab}');

    expect(mockedOnToggleFn).toHaveBeenLastCalledWith(false, '', 'item1', 0, undefined);
  });

  it('selects when an option is focused and enter is pressed', async () => {
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1'>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await keyboard('{arrowdown}');
    await keyboard('{enter}');

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnSelectFn).toBeCalledTimes(1);
    expect(mockedOnSelectFn).toHaveBeenCalledWith('item1', 0, undefined);
  });

  it('selects an option on click', async () => {
    const mockedOnSelectFn = jest.fn();
    const mockedOnClickFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' onClick={mockedOnClickFn}>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await keyboard('{arrowdown}');
    await click(screen.getByTestId('item1'));

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnClickFn).toBeCalledTimes(1);
    expect(mockedOnClickFn).toHaveBeenCalledWith('item1', 0, undefined);
    expect(mockedOnSelectFn).toBeCalledTimes(1);
    expect(mockedOnSelectFn).toHaveBeenCalledWith('item1', 0, undefined);
  });

  it('selects when an option is focused on toggle', async () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    await React.act(() => render(
      <div>
        <Dropdown {...dropdownProps}>
          <DropdownInput />
          <DropdownMenu>
            <DropdownItem value='item1'>
              <p data-testid='item1'>item1</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>external div</div>
      </div>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await keyboard('i');
    await keyboard('{arrowdown}');
    await click(screen.getByText('external div'));

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnToggleFn).toBeCalledTimes(3);
    expect(mockedOnToggleFn).toHaveBeenCalledWith(false, 'i', 'item1', 0, undefined);
  });

  it('updates options when user provide new input', async () => {
    const mockedOnChangeFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onChange={mockedOnChangeFn} />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    const itemNode = screen.getByText('item1');
    expect(itemNode).toBeDefined();
    expect(inputNode).toHaveValue('');

    await keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    const userInput = ' someText';
    await type(inputNode, userInput);
    expect(inputNode).toHaveValue('item1' + userInput);
    expect(mockedOnChangeFn).toBeCalledTimes(userInput.length);
    expect(mockedOnChangeFn).toHaveBeenCalledWith('item1' + userInput);
    // item should no longer be in focus after dropdown update
    expect(itemNode.className).not.toContain('FocusedItem1');
  });

  it('submits on "Enter" in the input box', async () => {
    const mockedOnSubmitFn = jest.fn();
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onSubmit={mockedOnSubmitFn} />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await type(inputNode, 'someText');
    await keyboard('{enter}');

    expect(inputNode).toHaveValue('someText');
    expect(mockedOnSelectFn).toBeCalledTimes(0);
    expect(mockedOnSubmitFn).toBeCalledTimes(1);
    expect(mockedOnSubmitFn).toHaveBeenCalledWith('someText', -1, undefined);
    expect(screen.queryByText('item1')).toBeNull();
  });

  it('prevents submission if submission criteria failed', async () => {
    const mockedSubmitCriteriaFn = jest.fn().mockImplementation(() => false);
    const mockedOnSubmitFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    await React.act(() => render(
      <Dropdown {...dropdownProps}>
        <DropdownInput
          onSubmit={mockedOnSubmitFn}
          submitCriteria={mockedSubmitCriteriaFn}
        />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ));
    const inputNode = screen.getByRole('textbox');
    await type(inputNode, 'someText');
    await keyboard('{enter}');

    expect(inputNode).toHaveValue('someText');
    expect(mockedSubmitCriteriaFn).toBeCalledTimes(1);
    expect(mockedOnSubmitFn).toBeCalledTimes(0);
    // dropdown remains open for failed submission
    expect(screen.getByText('item1')).toBeDefined();
  });
});
describe('Always Select Option', () => {
  it('clicking out without interacting with dropdown does not select a filter', async () => {
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn,
      alwaysSelectOption: true
    };
    await React.act(() => render(
      <div>
        <Dropdown {...dropdownProps}>
          <DropdownInput />
          <DropdownMenu>
            <DropdownItem value='item1'>
              <p data-testid='item1'>item1</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>external div</div>
      </div>
    ));
    const inputNode = screen.getByRole('textbox');
    await click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await keyboard('i');
    await click(screen.getByText('external div'));

    expect(inputNode).toHaveValue('i');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnSelectFn).toBeCalledTimes(0);
  });
});
