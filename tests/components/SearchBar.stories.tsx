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
    }
  }
};
export default meta;

export const Primary = (args: SearchBarProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless()}>
      <SearchBar {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const DropdownExpanded = Primary.bind({});
DropdownExpanded.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByRole('textbox'), 'recent search 1');
  userEvent.keyboard('{enter}');
  userEvent.clear(canvas.getByRole('textbox'));
  userEvent.type(canvas.getByRole('textbox'), 'recent search 2');
  userEvent.keyboard('{enter}');
  userEvent.click(canvas.getByRole('textbox'));
};
