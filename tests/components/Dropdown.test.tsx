import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import { DropdownItem } from '../../src/components/Dropdown/DropdownItem';
import { testSSR } from '../ssr/utils';

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
    render(
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
    );
    // hidden by default
    expect(screen.queryByText('item1')).toBeNull();

    // display when click into dropdown input
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('item1')).toBeDefined();
    expect(mockedOnToggleFn).toBeCalledWith(true, '', '', -1, undefined);

    // hidden when click elsewhere outside of dropdown component
    await userEvent.click(screen.getByText('external div'));
    expect(screen.queryByText('item1')).toBeNull();
    expect(mockedOnToggleFn).toBeCalledWith(false, '', '', -1, undefined);

    // display when tab into dropdown input
    await userEvent.tab();
    expect(screen.getByText('item1')).toBeDefined();
    expect(mockedOnToggleFn).toBeCalledWith(true, '', '', -1, undefined);
  });

  it('uses a stable live region and re-announces options when reopened', async () => {
    render(
      <div>
        <Dropdown screenReaderText='1 autocomplete option found.'>
          <DropdownInput />
          <DropdownMenu>
            <DropdownItem value='item1'>item1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button>outside</button>
      </div>
    );
    const liveRegion = screen.getByRole('status');
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await waitFor(() => expect(liveRegion).toHaveTextContent('1 autocomplete option found.'));

    await userEvent.click(screen.getByRole('button', { name: 'outside' }));
    expect(liveRegion).toBeEmptyDOMElement();

    await userEvent.click(input);
    expect(screen.getByRole('status')).toBe(liveRegion);
    await waitFor(() => expect(liveRegion).toHaveTextContent('1 autocomplete option found.'));
  });

  it('announces usage instructions only during the first activation', async () => {
    render(
      <div>
        <div id='additional-description'>additional description</div>
        <Dropdown
          screenReaderText='screen reader text here'
          screenReaderInstructions='usage instructions'
        >
          <DropdownInput ariaDescribedBy='additional-description' />
          <DropdownMenu>
            <DropdownItem value='item1'>item1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button>outside</button>
      </div>
    );
    const input = screen.getByRole('combobox');
    const liveRegion = screen.getByRole('status');

    expect(input).toHaveAttribute('aria-describedby', 'additional-description');

    await userEvent.click(input);
    const instructions = await screen.findByText('usage instructions');
    expect(instructions).toHaveAttribute('aria-live', 'polite');
    expect(instructions).not.toHaveAttribute('role');
    await waitFor(() => expect(liveRegion).toHaveTextContent('screen reader text here'));
    await userEvent.click(screen.getByRole('button', { name: 'outside' }));
    expect(input).toHaveAttribute('aria-describedby', 'additional-description');

    await userEvent.click(input);
    expect(input).toHaveAttribute('aria-describedby', 'additional-description');
    await waitFor(() => expect(liveRegion).toHaveTextContent('screen reader text here'));
    expect(screen.queryByText('usage instructions')).not.toBeInTheDocument();
  });

  it('previews focused options in the input without competing announcements', async () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem
            value='item1'
            focusedClassName='FocusedItem1'
            ariaLabel={value => `autocomplete suggestion: ${value}`}
          >
            item1
          </DropdownItem>
          <DropdownItem value='item2'>item2</DropdownItem>
          <DropdownItem value='item3'>item3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    const liveRegion = screen.getByRole('status');
    await userEvent.type(inputNode, 'i');
    const itemNode = screen.getByRole('option', { name: 'autocomplete suggestion: item1' });
    const itemLabelNode = screen.getByText('autocomplete suggestion: item1');

    expect(itemNode.tagName).toBe('DIV');
    expect(itemNode).toHaveAttribute('aria-labelledby', itemLabelNode.id);
    expect(screen.getByText('item1')).toHaveAttribute('aria-hidden', 'true');
    expect(inputNode).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');
    expect(inputNode).toHaveAttribute('aria-activedescendant', itemNode.id);
    expect(itemNode).toHaveAttribute('aria-selected', 'true');
    expect(liveRegion).toBeEmptyDOMElement();

    await userEvent.keyboard('{arrowup}');
    expect(itemNode.className).not.toContain('FocusedItem1');
    expect(itemNode).toHaveAttribute('aria-selected', 'false');
    expect(inputNode).toHaveValue('i');
  });

  it('closes the dropdown menu when tab key is pressed', async () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    await userEvent.keyboard('{Tab}');

    expect(mockedOnToggleFn).toHaveBeenLastCalledWith(false, '', '', -1, undefined);
  });

  it('selects when an option is focused and enter is pressed', async () => {
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1'>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{enter}');

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
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput />
        <DropdownMenu>
          <DropdownItem value='item1' onClick={mockedOnClickFn}>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await userEvent.keyboard('{arrowdown}');
    await userEvent.click(screen.getByTestId('item1'));

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnClickFn).toBeCalledTimes(1);
    expect(mockedOnClickFn).toHaveBeenCalledWith('item1', 0, undefined);
    expect(mockedOnSelectFn).toBeCalledTimes(1);
    expect(mockedOnSelectFn).toHaveBeenCalledWith('item1', 0, undefined);
  });

  it('does not select a focused option when the dropdown is closed', async () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    render(
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
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await userEvent.keyboard('i');
    await userEvent.keyboard('{arrowdown}');
    await userEvent.click(screen.getByText('external div'));

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
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onChange={mockedOnChangeFn} />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    const itemNode = screen.getByRole('option');
    expect(itemNode).toBeDefined();
    expect(inputNode).toHaveValue('');

    await userEvent.keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    const userInput = ' someText';
    await userEvent.type(inputNode, userInput);
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
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onSubmit={mockedOnSubmitFn} />
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.type(inputNode, 'someText');
    await userEvent.keyboard('{enter}');

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
    render(
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
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.type(inputNode, 'someText');
    await userEvent.keyboard('{enter}');

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
    render(
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
    );
    const inputNode = screen.getByRole('combobox');
    await userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    await userEvent.keyboard('i');
    await userEvent.click(screen.getByText('external div'));

    expect(inputNode).toHaveValue('i');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnSelectFn).toBeCalledTimes(0);
  });
});
