import { ComponentMeta } from '@storybook/react';
import { RangeInput, RangeInputProps } from '../../src/components/Filters/RangeInput';
import { AnswersHeadlessContext, Matcher, SelectableFilter } from '@yext/answers-headless-react';
import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { FiltersContext, FiltersContextType } from '../../src/components/Filters/FiltersContext';
import { FilterGroupContext, FilterGroupContextType } from '../../src/components/Filters/FilterGroupContext';
import { userEvent, within } from '@storybook/testing-library';

const meta: ComponentMeta<typeof RangeInput> = {
  title: 'RangeInput',
  component: RangeInput,
};

export default meta;

const selectableFilter: SelectableFilter = {
  selected: true,
  fieldId: '123',
  matcher: Matcher.Equals,
  value: 'test'
};

const filterContextValue: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: []
};

const filterContextValueDisabled: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: [selectableFilter]
};

const filterGroupContextValue: FilterGroupContextType = {
  searchValue: '',
  fieldId: '123',
  setSearchValue: () => null,
  getCollapseProps: null,
  getToggleProps: null,
  isExpanded: null,
  isOptionsDisabled: null,
  setIsOptionsDisabled: () => null
};

export const Primary = (args: RangeInputProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless()}>
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput {...args}/>
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>
    </AnswersHeadlessContext.Provider>
  );
};

export const Disabled = ((args: RangeInputProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless()}>
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValueDisabled}>
          <RangeInput {...args}/>
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>
    </AnswersHeadlessContext.Provider>
  );
// eslint-disable-next-line no-extra-bind
}).bind({});
Disabled.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox] = canvas.getAllByRole('textbox');
  const minbox = minTextbox.parentElement.parentElement;
  userEvent.hover(minbox);
};

export const validValues = Primary.bind({});
validValues.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  userEvent.type(minTextbox, '10');
  userEvent.type(maxTextbox, '20');
};

export const invalidValues = Primary.bind({});
invalidValues.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  userEvent.type(minTextbox, '20');
  userEvent.type(maxTextbox, '10');
};