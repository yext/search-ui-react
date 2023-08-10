import { ComponentMeta, Story } from '@storybook/react';
import { AutocompleteResponse, SearchHeadlessContext } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
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
} as unknown as AutocompleteResponse;

const meta: ComponentMeta<typeof SearchBar> = {
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
  }
};
export default meta;

export const Primary: Story<SearchBarProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <SearchBar {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const DropdownExpanded = Primary.bind({});
DropdownExpanded.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  conductRecentSearches(textboxEl);
  userEvent.click(textboxEl);
};

export const DropdownHighlight = Primary.bind({});
DropdownHighlight.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  conductRecentSearches(textboxEl);
  userEvent.click(textboxEl);
  userEvent.keyboard('{Tab}{Tab}{Tab}', { delay: 1 });
};

export const DropdownExpandedVerticalLinks = Primary.bind({});
DropdownExpandedVerticalLinks.args = {
  showVerticalLinks: true
};
DropdownExpandedVerticalLinks.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textboxEl = canvas.getByRole('textbox');
  conductRecentSearches(textboxEl);
  userEvent.click(textboxEl);
};

function conductRecentSearches(textboxEl: HTMLElement) {
  userEvent.type(textboxEl, 'recent search 1');
  userEvent.keyboard('{enter}');
  userEvent.clear(textboxEl);
  userEvent.type(textboxEl, 'recent search 2');
  userEvent.keyboard('{enter}');
}
