import { ComponentMeta } from '@storybook/react';
import { RangeInput, RangeInputProps } from '../../src/components/Filters/RangeInput';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';
import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { FiltersContext, FiltersContextType } from '../../src/components/Filters/FiltersContext';
import { FilterGroupContext, FilterGroupContextType } from '../../src/components/Filters/FilterGroupContext';
import { userEvent, within } from '@storybook/testing-library';
import { max } from 'lodash';


const meta: ComponentMeta<typeof RangeInput> = {
  title: 'RangeInput',
  component: RangeInput,
};

export default meta;

const mockedHeadlessState: RecursivePartial<State> = {};

const filterContextValue: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: []
};

const filterGroupContextValue: FilterGroupContextType = {
  searchValue: '',
  fieldId: '',
  setSearchValue: () => null,
  getCollapseProps: null,
  getToggleProps: null,
  isExpanded: null,
  isOptionsDisabled: null,
  setIsOptionsDisabled: () => null
};

export const Primary = (args: RangeInputProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput {...args}/>
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>
    </AnswersHeadlessContext.Provider>
  );
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