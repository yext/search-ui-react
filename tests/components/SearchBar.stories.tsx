import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { SearchBar, SearchBarProps } from '../../src/components';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedAutocompleteService } from '../__fixtures__/core/autocomplete-service';

const mockedAutocompleteResult = {
  results: [{
    value: 'query suggestion 1',
    verticalKeys: ['verticalKey1', 'verticalKey2']
  }, {
    value: 'query suggestion 2'
  }],
  inputIntents: [],
  uuid: ''
};

const meta: ComponentMeta<typeof SearchBar> = {
  title: 'SearchBar',
  component: SearchBar,
  parameters: {
    answersCoreServices: {
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
  }
};
export default meta;

export const Primary = (args: SearchBarProps) => {
  localStorage.clear();
  const recentSearches = [
    {
      query: 'recent search 2',
      timestamp: 1656512443860
    },
    {
      query: 'recent search 1',
      timestamp: 1656512440493
    }
  ];
  localStorage.setItem('__yxt_recent_searches__', JSON.stringify(recentSearches));

  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless()}>
      <SearchBar {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const DropdownExpanded = Primary.bind({});
DropdownExpanded.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByRole('textbox'));
};

export const DropdownHighlight = Primary.bind({});
DropdownHighlight.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByRole('textbox'));
  userEvent.keyboard('{Tab}{Tab}{Tab}', { delay: 1 });
};