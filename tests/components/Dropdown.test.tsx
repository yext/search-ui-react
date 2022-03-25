import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import { DropdownItem } from '../../src/components/Dropdown/DropdownItem';

describe('Dropdown', () => {
  it('Dropdown hide/display toggle', () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
    };
    render(
      <div>
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
    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText('item1')).toBeDefined();

    // hidden when click elsewhere outside of dropdown component
    fireEvent.click(screen.getByText('external div'));
    expect(screen.queryByText('item1')).toBeNull();
  });

  it('Dropdown registers keyboard navigation', () => {
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
    fireEvent.click(inputNode);
    const itemNode = screen.getByText('item1');

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    fireEvent.keyDown(inputNode, { key: 'ArrowUp' });
    expect(itemNode.className).not.toContain('FocusedItem1');
    expect(inputNode).not.toHaveValue('item1');
  });

  it('Selects an option with KeyboardEvent Enter', () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
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
    fireEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    fireEvent.keyDown(inputNode, { key: 'Enter' });

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
  });

  it('Selects an option with MouseEvent Click', () => {
    const dropdownProps: DropdownProps = {
      screenReaderText: 'screen reader text here'
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
    fireEvent.click(inputNode);
    expect(screen.getByTestId('item1')).toBeDefined();
    expect(inputNode).toHaveValue('');

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    fireEvent.click(screen.getByTestId('item1'));

    expect(inputNode).toHaveValue('item1');
    expect(screen.queryByTestId('item1')).toBeNull();
  });


  it('Dropdown update when user provide new input', () => {
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
    fireEvent.click(inputNode);
    const itemNode = screen.getByText('item1');
    expect(itemNode).toBeDefined();
    expect(inputNode).toHaveValue('');

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    expect(itemNode.className).toContain('FocusedItem1');
    expect(inputNode).toHaveValue('item1');

    fireEvent.change(inputNode, { target: { value: 'someText' } });
    expect(inputNode).toHaveValue('someText');

    // item should no longer be in focus after dropdown update
    expect(itemNode.className).not.toContain('FocusedItem1');
  });
});