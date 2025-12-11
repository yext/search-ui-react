import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { within, userEvent } from '@storybook/testing-library';
import { DropdownItem } from '../../src/components';
import { Dropdown, DropdownProps } from '../../src/components/Dropdown/Dropdown';
import { DropdownInput } from '../../src/components/Dropdown/DropdownInput';
import { DropdownMenu } from '../../src/components/Dropdown/DropdownMenu';
import React from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    onToggle: fn(),
    onSelect: fn(),
  }
};
export default meta;

const cssClasses = {
  filterSearchContainer: 'relative mb-2',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral',
  focusedOption: 'flex bg-gray-100 text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4',
  option: 'flex text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4'
};

const dropdownItemProps = {
  focusedClassName: cssClasses.focusedOption,
  className: cssClasses.option
};

export const Primary: StoryFn<DropdownProps> = (args) => {
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

export const DropdownExpanded: StoryFn<DropdownProps> = Primary.bind({});
DropdownExpanded.play = async ({ canvasElement }) => {
  await clickComboBox(canvasElement);
};

export const DropdownSelected: StoryFn<DropdownProps> = Primary.bind({});
DropdownSelected.play = async ({ canvasElement }) => {
  await clickComboBox(canvasElement);
  await userEvent.keyboard('{arrowdown}{arrowdown}');
  await userEvent.keyboard('{enter}');
};

export const AlwaysSelectExpanded: StoryFn<DropdownProps> = Primary.bind({});
AlwaysSelectExpanded.args = {
  alwaysSelectOption: true
};
AlwaysSelectExpanded.play = async ({ canvasElement }) => {
  await clickComboBox(canvasElement);
};

async function clickComboBox(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const comboboxEl = canvas.getByRole('combobox');
  await userEvent.click(comboboxEl);
}
