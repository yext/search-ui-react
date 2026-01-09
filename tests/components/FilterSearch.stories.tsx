import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext, SearchTypeEnum } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { FilterSearch, FilterSearchProps } from '../../src/components';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedAutocompleteService } from '../__fixtures__/core/autocomplete-service';
import { labeledFilterSearchResponse, unlabeledFilterSearchResponse } from '../__fixtures__/data/filtersearch';
import React from 'react';

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

const meta: Meta<typeof FilterSearch> = {
  title: 'FilterSearch',
  component: FilterSearch,
  argTypes: {
    sectioned: {
      control: false
    },
    searchFields: {
      control: false
    }
  },
  args: {
    label: 'Filter',
    onDropdownInputChange: undefined,
    afterDropdownInputFocus: undefined,
  }
};
export default meta;

export const Primary: StoryFn<FilterSearchProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <FilterSearch {...args} searchFields={searchFields} />
    </SearchHeadlessContext.Provider>
  );
};

export const DropdownUnsectioned: StoryFn<FilterSearchProps> = Primary.bind({});
DropdownUnsectioned.parameters = {
  searchCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, unlabeledFilterSearchResponse)
  }
};
DropdownUnsectioned.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole('combobox'), 'name');
  await canvas.findByText('first name 1');
};

export const DropdownSectioned: StoryFn<FilterSearchProps> = Primary.bind({});
DropdownSectioned.args = {
  sectioned: true
};
DropdownSectioned.parameters = {
  searchCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, labeledFilterSearchResponse)
  }
};
DropdownSectioned.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole('combobox'), 'name');
  await canvas.findByText('first name 1');
};

export const NoLabel: StoryFn<FilterSearchProps> = Primary.bind({});
NoLabel.args = {
  label: undefined
};
