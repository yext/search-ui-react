import { ComponentMeta, Story } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { DropdownItem } from '../../src/components';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import React from 'react';

const meta: ComponentMeta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown
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

export const Primary: Story<DropdownProps> = (args) => {
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

export const DropdownExpanded: any = Primary.bind({});
DropdownExpanded.play = ({ canvasElement }) => {
  clickTextbox(canvasElement);
};

export const DropdownSelected: any = Primary.bind({});
DropdownSelected.play = ({ canvasElement }) => {
  clickTextbox(canvasElement);
  userEvent.keyboard('{arrowdown}{arrowdown}');
  userEvent.keyboard('{enter}');
};

export const AlwaysSelectExpanded: any = Primary.bind({});
AlwaysSelectExpanded.args = {
  alwaysSelectOption: true
};
AlwaysSelectExpanded.play = ({ canvasElement }) => {
  clickTextbox(canvasElement);
};

function clickTextbox(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
}
