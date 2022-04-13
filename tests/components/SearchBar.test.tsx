import { SearchIntent, QuerySource, AnswersCore, AnswersHeadlessContext, State } from '@yext/answers-headless-react';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '../../src/components/SearchBar';
import userEvent from '@testing-library/user-event';
import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import * as Analytics from '../../src/hooks/useAnalytics';

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

describe('SearchBar', () => {
  describe('query suggestions', () => {
    const mockedAutocompleteResult = {
      results: [
        { value: 'query suggestion 1' },
        { value: 'query suggestion 2' }
      ],
      inputIntents: [],
      uuid: ''
    };

    it('display when click on universal search bar', async () => {
      const mockedUniversalAutocomplete = jest
        .spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );

      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(mockedUniversalAutocomplete).toBeCalledTimes(1);
    });

    it('display when click on vertical search bar', async () => {
      const mockedVerticalAutocomplete = jest
        .spyOn(AnswersCore.prototype, 'verticalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless({
          ...mockedState,
          vertical: {
            verticalKey: 'someKey'
          },
          meta: {
            searchType: 'vertical'
          }
        })}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );

      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(mockedVerticalAutocomplete).toBeCalledTimes(1);
    });

    it('update with new results when type in search bar', async () => {
      const mockedUniversalAutocompleteResultOne = {
        results: [{ value: 'query suggestion 1' }],
        inputIntents: [],
        uuid: ''
      };
      const mockedUniversalAutocompleteResultTwo = {
        results: [{ value: 'query suggestion 2' }],
        inputIntents: [],
        uuid: ''
      };
      const mockedUniversalAutocomplete = jest
        .spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValueOnce(mockedUniversalAutocompleteResultOne)
        .mockResolvedValueOnce(mockedUniversalAutocompleteResultTwo);

      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      expect(screen.queryByText('query suggestion 2')).not.toBeInTheDocument();
      userEvent.type(screen.getByRole('textbox'), 't');
      expect(await screen.findByText('query suggestion 2')).toBeInTheDocument();
      expect(screen.queryByText('query suggestion 1')).not.toBeInTheDocument();
      expect(mockedUniversalAutocomplete).toBeCalledTimes(2);
    });

    it('execute a new search when an option is selected', async () => {
      jest.spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      const mockedUniversalSearch = jest.spyOn(AnswersCore.prototype, 'universalSearch');

      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion 1')).toBeInTheDocument();
      userEvent.keyboard('{arrowdown}');
      userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('query suggestion 1');
      await waitFor(() => expect(mockedUniversalSearch).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockedUniversalSearch).toHaveBeenCalledWith(expect.objectContaining({
        query: 'query suggestion 1'
      })));
    });
  });

  describe('vertical links', () => {
    const mockedUniversalAutocompleteResult = {
      results: [{
        value: 'query suggestion',
        verticalKeys: ['verticalKey1', 'verticalKey2']
      }],
      inputIntents: [],
      uuid: ''
    };

    beforeEach(() => {
      jest.spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedUniversalAutocompleteResult);
    });

    it('display as part of the query suggestions', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(await screen.findByText('in verticalKey1')).toBeInTheDocument();
      expect(await screen.findByText('in verticalKey2')).toBeInTheDocument();
    });

    it('hidden when hideVerticalLinks is true', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideVerticalLinks={true}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(screen.queryByText('in verticalKey1')).not.toBeInTheDocument();
      expect(screen.queryByText('in verticalKey2')).not.toBeInTheDocument();
    });

    it('use display labels from verticalKeyToLabel', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar verticalKeyToLabel={verticalKey => {
            const verticalLabels = { verticalKey1: 'Vertical One', verticalKey2: 'Vertical Two' };
            return verticalLabels[verticalKey];
          }}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      expect(await screen.findByText('in Vertical One')).toBeInTheDocument();
      expect(await screen.findByText('in Vertical Two')).toBeInTheDocument();
    });

    it('execute onSelectVerticalLink callback on select', async () => {
      const mockedOnSelectVerticalLink = jest.fn();
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar onSelectVerticalLink={mockedOnSelectVerticalLink}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('in verticalKey1')).toBeInTheDocument();
      userEvent.click(screen.getByText('in verticalKey1'));
      expect(mockedOnSelectVerticalLink).toBeCalledTimes(1);
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
    it('display in dropdown after performing searches', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      userEvent.type(screen.getByRole('textbox'), 'yext');
      userEvent.keyboard('{enter}');
      userEvent.clear(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), 'answers');
      userEvent.keyboard('{enter}');
      userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('answers')).toBeInTheDocument();
      expect(await screen.findByText('yext')).toBeInTheDocument();
    });

    it('display limited results in dropdown based on recentSearchesLimit', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar recentSearchesLimit={1}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.type(screen.getByRole('textbox'), 'yext');
      userEvent.keyboard('{enter}');
      userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('yext')).toBeInTheDocument();
      userEvent.type(screen.getByRole('textbox'), 'answers');
      userEvent.keyboard('{enter}');
      userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByText('answers')).toBeInTheDocument();
      expect(screen.queryByText('yext')).not.toBeInTheDocument();
    });

    it('hidden when hideRecentSearches is true', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );

      userEvent.type(screen.getByRole('textbox'), 'yext');
      userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('yext');
      userEvent.clear(screen.getByRole('textbox'));
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('');
      expect(screen.queryByText('yext')).not.toBeInTheDocument();
    });
  });

  it('submit button executes a new search', async () => {
    render(
      <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
        <SearchBar />
      </AnswersHeadlessContext.Provider>
    );
    const mockedUniversalSearch = jest.spyOn(AnswersCore.prototype, 'universalSearch');
    const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
    userEvent.click(submitSearchButton);
    await waitFor(() => expect(mockedUniversalSearch).toHaveBeenCalledTimes(1));
  });

  it('clear button deletes text in input element', async () => {
    render(
      <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
        <SearchBar />
      </AnswersHeadlessContext.Provider>
    );
    userEvent.type(screen.getByRole('textbox'), 'yext');
    expect(await screen.findByRole('textbox')).toHaveDisplayValue('yext');
    const clearSearchButton = screen.getByRole('button', { name: 'Clear the search bar' });
    userEvent.click(clearSearchButton);
    expect(await screen.findByRole('textbox')).toHaveDisplayValue('');
  });

  it('execute onSearch callback when click on submit button', async () => {
    const mockedOnSearch = jest.fn();
    render(
      <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
        <SearchBar onSearch={mockedOnSearch}/>
      </AnswersHeadlessContext.Provider>
    );
    const mockedUniversalSearch = jest.spyOn(AnswersCore.prototype, 'universalSearch');
    userEvent.type(screen.getByRole('textbox'), 'yext');
    const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
    userEvent.click(submitSearchButton);
    await waitFor(() => expect(mockedOnSearch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockedOnSearch).toHaveBeenCalledWith({
      verticalKey: '',
      query: 'yext'
    }));
    await waitFor(() => expect(mockedUniversalSearch).toHaveBeenCalledTimes(0));
  });

  describe('executes search with near me location handling', () => {
    const userLocation = {
      latitude: 38.9072,
      longitude: 77.0369
    };

    it('using user location in state', async () => {
      const mockedStateWithUserLocation = {
        ...mockedState,
        location: {
          userLocation
        }
      };
      const mockedUniversalSearch = jest.spyOn(AnswersCore.prototype, 'universalSearch');
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedStateWithUserLocation)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
      userEvent.click(submitSearchButton);
      await waitFor(() => expect(mockedUniversalSearch)
        .toHaveBeenCalledWith(expect.objectContaining({
          location: userLocation
        }))
      );
    });

    it('using nagivator.geolocation API', async () => {
      const mockedUniversalAutocompleteResult = {
        results: [{ value: 'query suggestion 1' }],
        inputIntents: [SearchIntent.NearMe],
        uuid: ''
      };
      const mockedUniversalSearch = jest.spyOn(AnswersCore.prototype, 'universalSearch');
      jest.spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedUniversalAutocompleteResult);

      const mockedGetCurrentPosition = jest.fn()
        .mockImplementation(successCallback => successCallback(
          { coords: userLocation } as GeolocationPosition
        ));
      // requires Object.defineProperty since window.navigator and its properties are read-only
      Object.defineProperty(window.navigator, 'geolocation', {
        value: { getCurrentPosition: mockedGetCurrentPosition }
      });
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      const submitSearchButton = screen.getByRole('button', { name: 'Submit Search' });
      userEvent.click(submitSearchButton);
      await waitFor(() => expect(mockedUniversalSearch)
        .toHaveBeenCalledWith(expect.objectContaining({
          location: userLocation
        }))
      );
    });
  });

  describe('analytics events', () => {
    const mockedAutocompleteResult = {
      results: [{ value: 'query suggestion' }],
      inputIntents: [],
      uuid: ''
    };
    const mockedReport = jest.fn();

    beforeEach(() => {
      jest.spyOn(Analytics, 'useAnalytics')
        .mockImplementation(() => ({ report: mockedReport }));
    });

    it('report AUTO_COMPLETE_SELECTION feedback', async () => {
      jest.spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);

      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar hideRecentSearches={true}/>
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText('query suggestion')).toBeInTheDocument();
      userEvent.keyboard('{arrowdown}');
      userEvent.keyboard('{enter}');
      expect(await screen.findByRole('textbox')).toHaveDisplayValue('query suggestion');
      expect(mockedReport).toHaveBeenCalledTimes(1);
      expect(mockedReport).toHaveBeenCalledWith({
        type: 'AUTO_COMPLETE_SELECTION',
        suggestedSearchText: 'query suggestion'
      });
    });

    it('report SEARCH_CLEAR_BUTTON feedback', async () => {
      const mockedStateWithResults = {
        ...mockedState,
        query: {
          queryId: 'someId',
          input: 't'
        }
      };
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedStateWithResults)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      const clearSearchButton = screen.getByRole('button', { name: 'Clear the search bar' });
      userEvent.click(clearSearchButton);
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
    it('instruction text is present in DOM', () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      expect(screen.getByText(
        'When autocomplete results are available, use up and down arrows to review and enter to select.'
      )).toBeInTheDocument();
    });

    it('description text of number of available autocomplete options is present in DOM', async () => {
      const mockedAutocompleteResult = {
        results: [
          { value: 'query suggestion 1' },
          { value: 'query suggestion 2' }
        ],
        inputIntents: [],
        uuid: ''
      };
      jest.spyOn(AnswersCore.prototype, 'universalAutocomplete')
        .mockResolvedValue(mockedAutocompleteResult);
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText(
        '2 autocomplete suggestions found.'
      )).toBeInTheDocument();
    });

    it('description text of number of available recent search options is present in DOM', async () => {
      render(
        <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
          <SearchBar />
        </AnswersHeadlessContext.Provider>
      );
      userEvent.type(screen.getByRole('textbox'), 'yext');
      userEvent.keyboard('{enter}');
      userEvent.click(screen.getByRole('textbox'));
      expect(await screen.findByText(
        '1 recent search found.'
      )).toBeInTheDocument();
    });
  });
});