import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { SearchBar, SearchBarProps } from '../../src/components';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedAutocompleteService } from '../__fixtures__/core/autocomplete-service';
import React from 'react';

const mockedAutocompleteResult = {
  results: [{
    value: 'query suggestion 1',
    verticalKeys: ['verticalKey1', 'verticalKey2'],
    inputIntents: [],
  }, {
    value: 'query suggestion 2',
    inputIntents: [],
  }],
  inputIntents: [],
  uuid: ''
};

const meta: Meta<typeof SearchBar> = {
  title: 'SearchBar',
  component: SearchBar,
  parameters: {
    searchCoreServices: {
      autoCompleteService: generateMockedAutocompleteService(mockedAutocompleteResult)
    }
  },
  argTypes: {
    onSearch: {
      control: false
    },
    geolocationOptions: {
      control: false
    }
  },
  args: {
    onSearch: fn()
  }
};
export default meta;

export const Primary: StoryFn<SearchBarProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <SearchBar {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const DropdownExpanded: StoryFn<SearchBarProps> = Primary.bind({});
DropdownExpanded.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const comboboxEl = canvas.getByRole('combobox');
  await conductRecentSearches(comboboxEl);
  await userEvent.click(comboboxEl);
  await canvas.findByText('query suggestion 1');
};

export const DropdownHighlight: StoryFn<SearchBarProps> = Primary.bind({});
DropdownHighlight.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const comboboxEl = canvas.getByRole('combobox');
  await conductRecentSearches(comboboxEl);
  await userEvent.click(comboboxEl);
  await canvas.findByText('query suggestion 1');
  await userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}', { delay: 1 });
};

export const DropdownExpandedVerticalLinks: StoryFn<SearchBarProps> = Primary.bind({});
DropdownExpandedVerticalLinks.args = {
  showVerticalLinks: true
};
DropdownExpandedVerticalLinks.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const comboboxEl = canvas.getByRole('combobox');
  await conductRecentSearches(comboboxEl);
  await userEvent.click(comboboxEl);
  await canvas.findByText('query suggestion 1');
};

async function conductRecentSearches(comboboxEl: HTMLElement) {
  await userEvent.type(comboboxEl, 'recent search 1');
  await userEvent.keyboard('{enter}');
  await userEvent.clear(comboboxEl);
  await userEvent.type(comboboxEl, 'recent search 2');
  await userEvent.keyboard('{enter}');
}
