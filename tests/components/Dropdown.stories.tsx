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

export const Primary = (args: DropdownProps) => {
  return (
    <div className={cssClasses.filterSearchContainer}>
      <Dropdown {...args}>
        <DropdownInput className={cssClasses.inputElement} />
        <DropdownMenu>
          <div className='absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-2 pb-2 mt-1'>
            <DropdownItem focusedClassName={cssClasses.focusedOption} className={cssClasses.option} value='item1'>
              item1
            </DropdownItem>
            <DropdownItem focusedClassName={cssClasses.focusedOption} className={cssClasses.option} value='item2'>
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

export const DropdownHighlighted = Primary.bind({});
DropdownHighlighted.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
  userEvent.keyboard('{arrowdown}');
};

export const DropdownSelected = Primary.bind({});
DropdownSelected.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  userEvent.click(textboxEl);
  userEvent.keyboard('{arrowdown}');
  userEvent.keyboard('{enter}');
};