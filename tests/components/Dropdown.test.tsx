import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import { DropdownItem } from '../../src/components/Dropdown/DropdownItem';

describe('Dropdown', () => {
  it('Hide/display toggle works as expected', () => {
    const mockedOnToggleFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onToggle: mockedOnToggleFn
    };
    render(
      <div data-testid='container'>
        <Dropdown {...dropdownProps}>
          <DropdownInput/>
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
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText('item1')).toBeDefined();
    expect(mockedOnToggleFn).toBeCalledWith(true, '');

    // hidden when click elsewhere outside of dropdown component
    userEvent.click(screen.getByText('external div'));
    expect(screen.queryByText('item1')).toBeNull();
    expect(mockedOnToggleFn).toBeCalledWith(false, '');

    // display when tab into dropdown input
    userEvent.tab();
    expect(screen.getByText('item1')).toBeDefined();
    expect(mockedOnToggleFn).toBeCalledWith(true, '');
  });

  it('Keyboard navigation properly update focus on the option and input text', () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput/>
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('textbox');
    userEvent.click(inputNode);
    const itemNode = screen.getByText('item1');

    userEvent.keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    userEvent.keyboard('{arrowup}');
    expect(itemNode.className).not.toContain('FocusedItem1');
    expect(inputNode).not.toHaveValue('item1');
  });

  it('Handles option selection when pressing "Enter" on an option', () => {
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput/>
        <DropdownMenu>
          <DropdownItem value='item1'>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('textbox');
    userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnSelectFn).toBeCalledTimes(1);
    expect(mockedOnSelectFn).toHaveBeenCalledWith('item1', 0, undefined);
  });

  it('Handles option selection when clicking on an option', () => {
    const mockedOnSelectFn = jest.fn();
    const mockedOnClickFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput/>
        <DropdownMenu>
          <DropdownItem value='item1' onClick={mockedOnClickFn}>
            <p data-testid='item1'>item1</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('textbox');
    userEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    userEvent.keyboard('{arrowdown}');
    userEvent.click(screen.getByTestId('item1'));

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
    expect(mockedOnClickFn).toBeCalledTimes(1);
    expect(mockedOnClickFn).toHaveBeenCalledWith('item1', 0, undefined);
    expect(mockedOnSelectFn).toBeCalledTimes(1);
    expect(mockedOnSelectFn).toHaveBeenCalledWith('item1', 0, undefined);
  });


  it('Update options when user provide new input', () => {
    const mockedOnChangeFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onChange={mockedOnChangeFn}/>
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('textbox');
    userEvent.click(inputNode);
    const itemNode = screen.getByText('item1');
    expect(itemNode).toBeDefined();
    expect(inputNode).toHaveValue('');

    userEvent.keyboard('{arrowdown}');
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    const userInput = ' someText';
    userEvent.type(inputNode, userInput);
    expect(inputNode).toHaveValue('item1' + userInput);
    expect(mockedOnChangeFn).toBeCalledTimes(userInput.length);
    expect(mockedOnChangeFn).toHaveBeenCalledWith('item1' + userInput);
    // item should no longer be in focus after dropdown update
    expect(itemNode.className).not.toContain('FocusedItem1');
  });

  it('Handles submission when pressing "Enter" in the input box', () => {
    const mockedOnSubmitFn = jest.fn();
    const mockedOnSelectFn = jest.fn();
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here',
      onSelect: mockedOnSelectFn
    };
    render(
      <Dropdown {...dropdownProps}>
        <DropdownInput onSubmit={mockedOnSubmitFn}/>
        <DropdownMenu>
          <DropdownItem value='item1' focusedClassName='FocusedItem1'>
            item1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    const inputNode = screen.getByRole('textbox');
    userEvent.type(inputNode, 'someText');
    userEvent.keyboard('{enter}');

    expect(inputNode).toHaveValue('someText');
    expect(mockedOnSelectFn).toBeCalledTimes(0);
    expect(mockedOnSubmitFn).toBeCalledTimes(1);
    expect(mockedOnSubmitFn).toHaveBeenCalledWith('someText', -1, undefined);
    expect(screen.queryByText('item1')).toBeNull();
  });

  it('Prevents submission if submission criteria failed', () => {
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
    const inputNode = screen.getByRole('textbox');
    userEvent.type(inputNode, 'someText');
    userEvent.keyboard('{enter}');

    expect(inputNode).toHaveValue('someText');
    expect(mockedSubmitCriteriaFn).toBeCalledTimes(1);
    expect(mockedOnSubmitFn).toBeCalledTimes(0);
    // dropdown remains open for failed submission
    expect(screen.getByText('item1')).toBeDefined();
  });
});
