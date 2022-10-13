import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, SearchTypeEnum } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { FilterSearch, FilterSearchProps } from '../../src/components';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedAutocompleteService } from '../__fixtures__/core/autocomplete-service';
import { labeledFilterSearchResponse, unlabeledFilterSearchResponse } from '../__fixtures__/data/filtersearch';

const mockedHeadlessState = {
  vertical: {
    verticalKey: 'people'
  },
  meta: {
    searchType: SearchTypeEnum.Vertical
  }
};

const searchFields = [
  {
    fieldApiName: 'first_name',
    entityType: 'ce_person'
  },
  {
    fieldApiName: 'last_name',
    entityType: 'ce_person'
  }
];

const meta: ComponentMeta<typeof FilterSearch> = {
  title: 'FilterSearch',
  component: FilterSearch,
  argTypes: {
    sectioned: {
      control: false
    },
    searchFields: {
      control: false
    },
    label: {
      defaultValue: 'Filter'
    }
  }
};
export default meta;

export const Primary: Story<FilterSearchProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <FilterSearch {...args} searchFields={searchFields} />
    </SearchHeadlessContext.Provider>
  );
};

export const DropdownUnsectioned = Primary.bind({});
DropdownUnsectioned.parameters = {
  searchCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, unlabeledFilterSearchResponse)
  }
};
DropdownUnsectioned.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByRole('textbox'), 'name');
};

export const DropdownSectioned = Primary.bind({});
DropdownSectioned.args = {
  sectioned: true
};
DropdownSectioned.parameters = {
  searchCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, labeledFilterSearchResponse)
  }
};
DropdownSectioned.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByRole('textbox'), 'name');
};

export const NoLabel = Primary.bind({});
NoLabel.args = {
  label: undefined
};
