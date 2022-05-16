import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, SearchTypeEnum } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { FilterSearch, FilterSearchProps } from '../../src/components';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedAutocompleteService } from '../__fixtures__/core/autocomplete-service';
import { sectionedFilterSearchResponse, unsectionedFilterSearchResponse } from '../__fixtures__/data/filtersearch';

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
};
export default meta;

export const Primary = (args: FilterSearchProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <FilterSearch searchFields={searchFields} {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const DropdownUnsectioned = Primary.bind({});
DropdownUnsectioned.parameters = {
  answersCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, unsectionedFilterSearchResponse)
  }
};
DropdownUnsectioned.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByRole('textbox'), 'name');
};

export const DropdownSectioned = (args: FilterSearchProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <FilterSearch searchFields={searchFields} sectioned={true} {...args} />
    </AnswersHeadlessContext.Provider>
  );
};
DropdownSectioned.parameters = {
  answersCoreServices: {
    autoCompleteService: generateMockedAutocompleteService(undefined, sectionedFilterSearchResponse)
  }
};
DropdownSectioned.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByRole('textbox'), 'name');
};
