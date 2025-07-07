import {
  SearchIntent,
  QuerySource,
  SearchCore,
  SearchHeadlessContext,
  State
} from '@yext/search-headless-react';
import { render, RenderResult, screen } from '@testing-library/react';
import { SearchBar, onSearchFunc } from '../../src/components/SearchBar';
import { VerticalLink } from '../../src/models/verticalLink';
import { SearchI18nextProvider } from '../../src/components/SearchI18nextProvider';
import userEvent from '@testing-library/user-event';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import * as Analytics from '../../src/hooks/useAnalytics';
import { SearchAnalyticsService } from '@yext/analytics';
import React from 'react';

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: []
  },
  universal: {},
  vertical: {},
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  },
  query: {},
  location: {}
};

const pause = (millis: number) => new Promise(resolve => setTimeout(resolve, millis));
// wait for debounce period + extra buffer to address flakiness
const waitForDebounce = () => pause(200 + 200);

function renderSearchBar(
  mockState: RecursivePartial<State>,
  showVerticalLinks?: boolean,
  onSelectVerticalLink?: (data: { verticalLink: VerticalLink, querySource: QuerySource }) => void,
  verticalKeyToLabel?: (verticalKey: string) => string,
  hideRecentSearches?: boolean,
  recentSearchesLimit?: number,
  onSearch?: onSearchFunc
): RenderResult {
  const searcher = generateMockedHeadless(mockState);

  return render(<SearchHeadlessContext.Provider value={searcher}>
    <SearchI18nextProvider searcher={searcher}>
      <SearchBar 
        showVerticalLinks={showVerticalLinks}
        onSelectVerticalLink={onSelectVerticalLink}
        verticalKeyToLabel={verticalKeyToLabel}
        hideRecentSearches={hideRecentSearches}
        recentSearchesLimit={recentSearchesLimit}
        onSearch={onSearch}
      />
    </SearchI18nextProvider>
  </SearchHeadlessContext.Provider>);
}

describe('SearchBar', () => {
  describe('query suggestions', () => {
    const mockedAutocompleteResult = {
      results: [
        { value: 'query suggestion 1', inputIntents: [] },
        { value: 'query suggestion 2', inputIntents: [] }
      ],
      inputIntents: [],
      uuid: ''
    };

    it('displays universal query suggestions when click on universal search bar', async () => {
      const mockedUniversalAutocomplete = jest
        .spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      renderSearchBar(mockedState);

      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(mockedUniversalAutocomplete).toBeCalledTimes(1);
    });

    it('displays vertical query suggestions when click on vertical search bar', async () => {
      const mockedVerticalAutocomplete = jest
        .spyOn(SearchCore.prototype, 'verticalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);
      
      renderSearchBar({
          ...mockedState,
          vertical: {
            verticalKey: 'someKey'
          },
          meta: {
            searchType: 'vertical'
          }
        },
        undefined,
        undefined,
        undefined,
        true
      );

      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(mockedVerticalAutocomplete).toHaveBeenCalledTimes(1);
    });

    it('updates query suggestions with new autocomplete results when type in search bar', async () => {
      const mockedUniversalAutocompleteResultOne = {
        results: [{ value: 'query suggestion 1', inputIntents: [] }],
        inputIntents: [],
        uuid: ''
      };
      const mockedUniversalAutocompleteResultTwo = {
        results: [{ value: 'query suggestion 2', inputIntents: [] }],
        inputIntents: [],
        uuid: ''
      };
      const mockedUniversalAutocomplete = jest
        .spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValueOnce(mockedUniversalAutocompleteResultOne)
        .mockResolvedValueOnce(mockedUniversalAutocompleteResultTwo);

      renderSearchBar(mockedState, undefined, undefined, undefined, true);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      await userEvent.type(screen.getByRole('textbox'), 't');
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(mockedUniversalAutocomplete).toHaveBeenCalledTimes(2);
    });

    it('executes a new search when a query suggestion option is selected', async () => {
      jest.spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');

      renderSearchBar(mockedState, undefined, undefined, undefined, true);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      await userEvent.keyboard('{arrowdown}');
      await userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('query suggestion 1');
      expect(mockedUniversalSearch).toHaveBeenCalledTimes(1)
      expect(mockedUniversalSearch).toHaveBeenCalledWith(expect.objectContaining({
        query: 'query suggestion 1'
      }));
    });
  });

  describe('vertical links', () => {
    const mockedUniversalAutocompleteResult = {
      results: [{
        value: 'query suggestion',
        verticalKeys: ['verticalKey1', 'verticalKey2'],
        inputIntents: []
      }],
      inputIntents: [],
      uuid: ''
    };

    beforeEach(() => {
      jest.spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedUniversalAutocompleteResult);
    });

    it('displays vertical links as part of the query suggestions when showVerticalLinks is set to true', async () => {
      renderSearchBar(mockedState, true);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(await screen.findByText('in verticalKey1')).toBeInTheDocument();
      expect(await screen.findByText('in verticalKey2')).toBeInTheDocument();
    });

    it('does not display vertical links on default', async () => {
      renderSearchBar(mockedState);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(screen.queryByText('in verticalKey1')).not.toBeInTheDocument();
      expect(screen.queryByText('in verticalKey2')).not.toBeInTheDocument();
    });

    it('vertical links use display labels from verticalKeyToLabel when it is specified', async () => {
      renderSearchBar(mockedState, true, undefined, verticalKey => {
        const verticalLabels = { verticalKey1: 'Vertical One', verticalKey2: 'Vertical Two' };
        return verticalLabels[verticalKey];
      });
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(await screen.findByText('in Vertical One')).toBeInTheDocument();
      expect(await screen.findByText('in Vertical Two')).toBeInTheDocument();
    });

    it('executes onSelectVerticalLink callback when a vertical link is selected', async () => {
      const mockedOnSelectVerticalLink = jest.fn();
      renderSearchBar(mockedState, true, mockedOnSelectVerticalLink);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('in verticalKey1')).toBeInTheDocument();
      await userEvent.click(screen.getByText('in verticalKey1'));
      expect(mockedOnSelectVerticalLink).toHaveBeenCalledTimes(1);
      expect(mockedOnSelectVerticalLink).toHaveBeenCalledWith({
        verticalLink: {
          query: 'query suggestion',
          verticalKey: 'verticalKey1'
        },
        querySource: QuerySource.Autocomplete
      });
    });
  });

  describe('recent searches', () => {
    it('displays recent searches in dropdown after performing searches', async () => {
      renderSearchBar(mockedState);
      await userEvent.type(screen.getByRole('textbox'), 'yext');
      await userEvent.keyboard('{enter}');
      await userEvent.clear(screen.getByRole('textbox'));
      await userEvent.type(screen.getByRole('textbox'), 'answers');
      await userEvent.keyboard('{enter}');
      await userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('answers')).toBeInTheDocument();
      expect(await screen.findByText('yext')).toBeInTheDocument();
    });

    it('displays limited recent search results in dropdown based on recentSearchesLimit', async () => {
      renderSearchBar(mockedState, undefined, undefined, undefined, undefined, 1);
      await userEvent.type(screen.getByRole('textbox'), 'yext');
      await userEvent.keyboard('{enter}');
      await userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('yext')).toBeInTheDocument();
      await userEvent.type(screen.getByRole('textbox'), 'answers');
      await userEvent.keyboard('{enter}');
      await userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('answers')).toBeInTheDocument();
      expect(screen.queryByText('yext')).not.toBeInTheDocument();
    });

    it('hides recent searches when hideRecentSearches is true', async () => {
      renderSearchBar(mockedState, undefined, undefined, undefined, true);

      await userEvent.type(screen.getByRole('textbox'), 'yext');
      await userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('yext');
      await userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('');
      expect(screen.queryByText('yext')).not.toBeInTheDocument();
    });
  });

  it('submit button executes a new search', async () => {
    renderSearchBar(mockedState);
    const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');
    const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
    await userEvent.click(submitSearchButton);
    expect(mockedUniversalSearch).toHaveBeenCalledTimes(1);
  });

  it('clear button deletes text in input element, but does not search', async () => {
    renderSearchBar(mockedState);
    const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');
    await userEvent.type(screen.getByRole('textbox'), 'yext');
    expect(await screen.findByRole('textbox')).toHaveDisplayValue('yext');
    const clearSearchButton = screen.getByRole('button', { name: 'Clear the search bar' });
    await userEvent.click(clearSearchButton);
    expect(await screen.findByRole('textbox')).toHaveDisplayValue('');
    expect(mockedUniversalSearch).toHaveBeenCalledTimes(0);
  });

  it('executes onSearch callback when click on submit button', async () => {
    const mockedOnSearch = jest.fn();
    renderSearchBar(mockedState, undefined, undefined, undefined, undefined, undefined, mockedOnSearch);
    const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');
    await userEvent.type(screen.getByRole('textbox'), 'yext');
    await waitForDebounce(); // Submit button won't fire query until debounce period is over
    const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
    await userEvent.click(submitSearchButton);
    expect(mockedOnSearch).toHaveBeenCalledTimes(1);
    expect(mockedOnSearch).toHaveBeenCalledWith({
      verticalKey: '',
      query: 'yext'
    });
    expect(mockedUniversalSearch).toHaveBeenCalledTimes(0);
  });

  describe('executes search with near me location handling', () => {
    const userLocation = {
      latitude: 38.9072,
      longitude: 77.0369
    };

    it('search with near me location handling using user location in state', async () => {
      const mockedStateWithUserLocation = {
        ...mockedState,
        location: {
          userLocation
        }
      };
      const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');
      renderSearchBar(mockedStateWithUserLocation);
      const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
      await userEvent.click(submitSearchButton);
      expect(mockedUniversalSearch)
        .toHaveBeenCalledWith(expect.objectContaining({
          location: userLocation
        }));
    });

    it('search with near me location handling using nagivator.geolocation API', async () => {
      const mockedUniversalAutocompleteResult = {
        results: [{ value: 'query suggestion 1', inputIntents: [] }],
        inputIntents: [SearchIntent.NearMe],
        uuid: ''
      };
      const mockedUniversalSearch = jest.spyOn(SearchCore.prototype, 'universalSearch');
      jest.spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedUniversalAutocompleteResult);

      const mockedGetCurrentPosition = jest.fn()
        .mockImplementation(successCallback => successCallback(
          { coords: userLocation } as GeolocationPosition
        ));
      // requires Object.defineProperty since window.navigator and its properties are read-only
      Object.defineProperty(window.navigator, 'geolocation', {
        value: { getCurrentPosition: mockedGetCurrentPosition }
      });
      renderSearchBar(mockedState);
      const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
      await userEvent.click(submitSearchButton);
      expect(mockedUniversalSearch)
        .toHaveBeenCalledWith(expect.objectContaining({
          location: userLocation
        }));
    });
  });

  describe('analytics events', () => {
    const mockedAutocompleteResult = {
      results: [{ value: 'query suggestion', inputIntents: [] }],
      inputIntents: [],
      uuid: ''
    };
    const mockedReport = jest.fn();

    beforeEach(() => {
      jest.spyOn(Analytics, 'useAnalytics')
        .mockImplementation(() => ({ report: mockedReport }) as unknown as SearchAnalyticsService);
    });

    it('reports AUTO_COMPLETE_SELECTION feedback', async () => {
      jest.spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      renderSearchBar(mockedState, undefined, undefined, undefined, true);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      await userEvent.keyboard('{arrowdown}');
      await userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('query suggestion');
      expect(mockedReport).toHaveBeenCalledTimes(1);
      expect(mockedReport).toHaveBeenCalledWith({
        type: 'AUTO_COMPLETE_SELECTION',
        suggestedSearchText: 'query suggestion'
      });
    });

    it('reports SEARCH_CLEAR_BUTTON feedback', async () => {
      const mockedStateWithResults = {
        ...mockedState,
        query: {
          queryId: 'someId',
          input: 't'
        }
      };
      renderSearchBar(mockedStateWithResults);
      const clearSearchButton = screen.getByRole('button', { name: 'Clear the search bar' });
      await userEvent.click(clearSearchButton);
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('');
      expect(mockedReport).toHaveBeenCalledTimes(1);
      expect(mockedReport).toHaveBeenCalledWith({
        type: 'SEARCH_CLEAR_BUTTON',
        queryId: 'someId',
        verticalKey: undefined
      });
    });
  });

  describe('Screen reader text', () => {
    it('search bar instruction text for screen reader is present in DOM', () => {
      renderSearchBar(mockedState);
      expect(screen.getByText(
        'When autocomplete results are available, use up and down arrows to review and enter to select.'
      )).toBeInTheDocument();
    });

    it('description text of number of available autocomplete options is present in DOM', async () => {
      const mockedAutocompleteResponse = {
        results: [
          { value: 'query suggestion 1', inputIntents: [] },
          { value: 'query suggestion 2', inputIntents: [] }
        ],
        inputIntents: [],
        uuid: ''
      };
      jest.spyOn(SearchCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResponse);
      renderSearchBar(mockedState);
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText(
        '2 autocomplete suggestions found.'
      )).toBeInTheDocument();
    });

    it('description text of number of available recent search options is present in DOM', async () => {
      renderSearchBar(mockedState);
      await userEvent.type(screen.getByRole('textbox'), 'yext');
      await userEvent.keyboard('{enter}');
      await userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText(
        '1 recent search found.'
      )).toBeInTheDocument();
    });
  });
});