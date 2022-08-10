import { ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { DropdownItem } from '../../src/components';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';

const meta: ComponentMeta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
};
export default meta;

const cssClasses = {
  filterSearchContainer: 'relative mb-2',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral',
  focusedOption: 'bg-gray-100 text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4',
  option: 'text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4'
};

const dropdownItemProps = {
  focusedClassName: cssClasses.focusedOption,
  className: cssClasses.option
};

export const Primary = (args: DropdownProps) => {
  return (
    <div className={cssClasses.filterSearchContainer}>
      <Dropdown {...args} screenReaderText='screen reader text here'>
        <DropdownInput className={cssClasses.inputElement} ariaLabel='screen reader text' />
        <DropdownMenu>
          <div className='absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-2 pb-2 mt-1'>
            <DropdownItem {...dropdownItemProps} value='item1'>
              item1
            </DropdownItem>
            <DropdownItem {...dropdownItemProps} value='item2'>
              item2
            </DropdownItem>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const DropdownExpanded = Primary.bind({});
DropdownExpanded.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
};

export const AlwaysSelectExpanded = (args: DropdownProps) => {
  return (
    <div className={cssClasses.filterSearchContainer}>
      <Dropdown {...args} alwaysSelectOption={true} screenReaderText='screen reader text here'>
        <DropdownInput className={cssClasses.inputElement} ariaLabel='screen reader text' />
        <DropdownMenu>
          <div className='absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-2 pb-2 mt-1'>
            <DropdownItem {...dropdownItemProps} value='item1'>
              item1
            </DropdownItem>
            <DropdownItem {...dropdownItemProps} value='item2'>
              item2
            </DropdownItem>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
AlwaysSelectExpanded.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
};

export const DropdownHighlighted = Primary.bind({});
DropdownHighlighted.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
  userEvent.keyboard('{arrowdown}{arrowdown}');
};

export const DropdownSelected = Primary.bind({});
DropdownSelected.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
  userEvent.keyboard('{arrowdown}{arrowdown}');
  userEvent.keyboard('{enter}');
};