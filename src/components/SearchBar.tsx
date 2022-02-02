import { QuerySource, SearchTypeEnum, useAnswersActions, useAnswersState, useAnswersUtilities, VerticalResults } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { Fragment, PropsWithChildren, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useEntityPreviews } from '../hooks/useEntityPreviews';
import useRecentSearches from '../hooks/useRecentSearches';
import useSearchWithNearMeHandling from '../hooks/useSearchWithNearMeHandling';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import { ReactComponent as VerticalDividerIcon } from '../icons/bar.svg';
import { ReactComponent as RecentSearchIcon } from '../icons/history.svg';
import { ReactComponent as CloseIcon } from '../icons/light_x.svg';
import { ReactComponent as MagnifyingGlassIcon } from '../icons/magnifying_glass.svg';
import { ReactComponent as YextLogoIcon } from '../icons/yext_logo.svg';
import { BrowserState } from '../PageRouter';
import '../sass/Autocomplete.scss';
import Dropdown from './Dropdown/Dropdown';
import { useDropdownContext } from './Dropdown/DropdownContext';
import DropdownInput from './Dropdown/DropdownInput';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import { FocusedItemData } from './Dropdown/FocusContext';
import { calculateRestrictVerticals, calculateUniversalLimit, transformEntityPreviews } from './EntityPreviews';
import SearchButton from './SearchButton';
import { processTranslation } from './utils/processTranslation';
import renderAutocompleteResult, {
  AutocompleteResultCssClasses,
  builtInCssClasses as AutocompleteResultBuiltInCssClasses
} from './utils/renderAutocompleteResult';

const builtInCssClasses: SearchBarCssClasses = {
  container: 'h-12 mb-3',
  divider: 'border-t border-gray-200 mx-2.5',
  dropdownContainer: 'relative bg-white pt-4 pb-3 z-10',
  inputContainer: 'inline-flex items-center justify-between w-full',
  inputDropdownContainer: 'bg-white border rounded-3xl border-gray-200 w-full overflow-hidden',
  inputDropdownContainer___active: 'shadow-lg',
  inputElement: 'outline-none flex-grow border-none h-full pl-0.5 pr-2',
  logoContainer: 'w-7 mx-2.5 my-2',
  optionContainer: 'flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100',
  searchButtonContainer: ' w-8 h-full mx-2 flex flex-col justify-center items-center',
  searchButton: 'h-7 w-7',
  focusedOption: 'bg-gray-100',
  clearButton: 'mr-3.5 cursor-pointer',
  verticalDivider: 'mr-0.5',
  recentSearchesOptionContainer: 'flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100',
  recentSearchesIcon: 'w-5 mr-1 text-gray-300',
  recentSearchesOption: 'pl-3',
  recentSearchesNonHighlighted: 'font-normal', // Swap this to semibold once we apply highlighting to recent searches
  verticalLink: 'ml-12 pl-1 text-gray-500 italic',
  ...AutocompleteResultBuiltInCssClasses
};

export interface SearchBarCssClasses extends AutocompleteResultCssClasses {
  container?: string,
  inputElement?: string,
  inputContainer?: string,
  inputDropdownContainer?: string,
  inputDropdownContainer___active?: string,
  clearButton?: string,
  searchButton?: string,
  searchButtonContainer?: string,
  dropdownContainer?: string,
  divider?: string,
  logoContainer?: string,
  optionContainer?: string,
  optionIcon?: string,
  focusedOption?: string,
  recentSearchesOptionContainer?: string,
  recentSearchesIcon?: string,
  recentSearchesOption?: string,
  recentSearchesNonHighlighted?: string,
  verticalLink?: string,
  verticalDivider?: string
}

type RenderEntityPreviews = (
  autocompleteLoading: boolean,
  verticalResultsArray: VerticalResults[],
  onSubmit: (value: string, _index: number, itemData?: FocusedItemData) => void
) => JSX.Element;

interface Props {
  placeholder?: string,
  geolocationOptions?: PositionOptions,
  customCssClasses?: SearchBarCssClasses,
  cssCompositionMethod?: CompositionMethod,

  // The debouncing time, in milliseconds, for making API requests for entity previews
  entityPreviewsDebouncingTime?: number,
  renderEntityPreviews?: RenderEntityPreviews,
  hideVerticalLinks?: boolean,
  verticalKeyToLabel?: (verticalKey: string) => string,
  hideRecentSearches?: boolean,
  recentSearchesLimit?: number
}

/**
 * Renders a SearchBar that is hooked up with an InputDropdown component
 */
export default function SearchBar({
  placeholder,
  geolocationOptions,
  hideRecentSearches,
  renderEntityPreviews,
  hideVerticalLinks,
  verticalKeyToLabel,
  recentSearchesLimit = 5,
  customCssClasses,
  cssCompositionMethod,
  entityPreviewsDebouncingTime = 500
}: Props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const browserHistory = useHistory<BrowserState>();
  const answersActions = useAnswersActions();
  const answersUtilities = useAnswersUtilities();

  const query = useAnswersState(state => state.query.input) ?? '';
  const isLoading = useAnswersState(state => state.searchStatus.isLoading) ?? false;
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  const [autocompleteResponse, executeAutocomplete] = useSynchronizedRequest(() => {
    return isVertical
      ? answersActions.executeVerticalAutocomplete()
      : answersActions.executeUniversalAutocomplete();
  });
  const [executeQueryWithNearMeHandling, autocompletePromiseRef] = useSearchWithNearMeHandling(answersActions, geolocationOptions);
  const [recentSearches, setRecentSearch, clearRecentSearches] = useRecentSearches(recentSearchesLimit);
  const filteredRecentSearches = recentSearches?.filter(search =>
    answersUtilities.isCloseMatch(search.query, query)
  );

  useEffect(() => {
    if (hideRecentSearches) {
      clearRecentSearches();
    }
  }, [clearRecentSearches, hideRecentSearches])

  function executeQuery() {
    if (!hideRecentSearches) {
      const input = answersActions.state.query.input;
      input && setRecentSearch(input);
    }
    executeQueryWithNearMeHandling();
  }

  const handleSubmit = (value: string, _index: number, itemData?: FocusedItemData) => {
    answersActions.setQuery(value || '');
    if (itemData && typeof itemData.verticalLink === 'string') {
      browserHistory.push(itemData.verticalLink, {
        querySource: QuerySource.Autocomplete
      });
    } else {
      executeQuery();
    }
  }

  const [entityPreviewsState, executeEntityPreviewsQuery] = useEntityPreviews(entityPreviewsDebouncingTime);
  const { verticalResultsArray, isLoading: entityPreviewsLoading } = entityPreviewsState;
  const entityPreviews = renderEntityPreviews && renderEntityPreviews(entityPreviewsLoading, verticalResultsArray, handleSubmit);
  function updateEntityPreviews(query: string) {
    if (!renderEntityPreviews) {
      return;
    }
    const restrictVerticals = calculateRestrictVerticals(entityPreviews);
    const universalLimit = calculateUniversalLimit(entityPreviews);
    executeEntityPreviewsQuery(query, universalLimit, restrictVerticals);
  }

  function renderInput() {
    return (
      <DropdownInput
        className={cssClasses.inputElement}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        onFocus={(value = '') => {
          answersActions.setQuery(value);
          updateEntityPreviews(value);
          autocompletePromiseRef.current = executeAutocomplete()
        }}
        onChange={(value = '') => {
          answersActions.setQuery(value);
          updateEntityPreviews(value);
          autocompletePromiseRef.current = executeAutocomplete();
        }}
      />
    );
  }

  function renderRecentSearches() {
    if (isVertical) {
      return null;
    }

    const recentSearchesCssClasses = {
      icon: cssClasses.recentSearchesIcon,
      option: cssClasses.recentSearchesOption,
      nonHighlighted: cssClasses.recentSearchesNonHighlighted
    };

    return filteredRecentSearches?.map((result, i) => (
      <DropdownItem
        className={cssClasses.recentSearchesOptionContainer}
        focusedClassName={classNames(cssClasses.recentSearchesOptionContainer, cssClasses.focusedOption)}
        key={i}
        value={result.query}
        onClick={handleSubmit}
      >
        {renderAutocompleteResult(
          { value: result.query },
          recentSearchesCssClasses,
          RecentSearchIcon,
          `recent search: ${result.query}`
        )}
      </DropdownItem>
    ))
  }

  function renderQuerySuggestions() {
    return autocompleteResponse?.results.map((result, i) => (
      <Fragment key={i}>
        <DropdownItem
          className={cssClasses.optionContainer}
          focusedClassName={classNames(cssClasses.optionContainer, cssClasses.focusedOption)}
          value={result.value}
          onClick={handleSubmit}
        >
          {renderAutocompleteResult(
            result,
            { ...cssClasses, icon: cssClasses.optionIcon },
            MagnifyingGlassIcon,
            `autocomplete option: ${result.value}`
          )}
        </DropdownItem>
        {!hideVerticalLinks && !isVertical && result.verticalKeys?.map((verticalKey, j) => (
          <DropdownItem
            key={j}
            className={cssClasses.optionContainer}
            focusedClassName={classNames(cssClasses.optionContainer, cssClasses.focusedOption)}
            value={result.value}
            itemData={{ verticalLink: `/${verticalKey}?query=${result.value}` }}
            onClick={handleSubmit}
          >
            {renderAutocompleteResult(
              { value: `in ${verticalKeyToLabel ? verticalKeyToLabel(verticalKey) : verticalKey}` },
              { ...cssClasses, option: cssClasses.verticalLink }
            )}
          </DropdownItem>
        ))}
      </Fragment>
    ))
  }

  function renderClearButton() {
    return (
      <>
        <button
          aria-label='Clear the search bar'
          className={cssClasses.clearButton}
          onClick={() => {
            updateEntityPreviews('');
            answersActions.setQuery('');
            executeQuery();
            autocompletePromiseRef.current = executeAutocomplete();
          }}
        >
          <CloseIcon />
        </button>
        <VerticalDividerIcon className={cssClasses.verticalDivider}/>
      </>
    );
  }

  const hasItems = !!(autocompleteResponse?.results.length || (!isVertical && filteredRecentSearches?.length));
  const screenReaderText = getScreenReaderText(autocompleteResponse?.results.length, filteredRecentSearches?.length)
  const activeClassName = classNames(cssClasses.inputDropdownContainer, {
    [cssClasses.inputDropdownContainer___active ?? '']: hasItems
  });

  return (
    <div className={cssClasses.container}>
      <Dropdown
        className={cssClasses.inputDropdownContainer}
        activeClassName={activeClassName}
        screenReaderText={screenReaderText}
        parentQuery={query}
        onToggle={(isActive, value = '') => {
          if (!isActive) {
            updateEntityPreviews(value);
            answersActions.setQuery(value);
            autocompletePromiseRef.current = executeAutocomplete();
          }
        }}
      >
        <div className={cssClasses?.inputContainer}>
          <div className={cssClasses.logoContainer}>
            <YextLogoIcon />
          </div>
          {renderInput()}
          {query && renderClearButton()}
          <DropdownSearchButton
            executeQuery={executeQuery}
            cssClasses={cssClasses}
            isLoading={isLoading}
          />
        </div>
        {hasItems &&
          <StyledDropdownMenu cssClasses={cssClasses}>
            {renderRecentSearches()}
            {renderQuerySuggestions()}
            {entityPreviews && transformEntityPreviews(entityPreviews, verticalResultsArray)}
          </StyledDropdownMenu>
        }
      </Dropdown>
    </div>
  );
}


function StyledDropdownMenu({ cssClasses, children }: PropsWithChildren<{
  cssClasses: {
    divider?: string,
    dropdownContainer?: string
  }
}>) {
  return (
    <DropdownMenu>
      <div className={cssClasses.divider} />
      <div className={cssClasses.dropdownContainer}>
        {children}
      </div>
    </DropdownMenu>
  )
}

function getScreenReaderText(autocompleteOptions = 0, recentSearchesOptions = 0) {
  const recentSearchesText = recentSearchesOptions > 0
    ? processTranslation({
      phrase: `${recentSearchesOptions} recent search found.`,
      pluralForm: `${recentSearchesOptions} recent searches found.`,
      count: recentSearchesOptions
    })
    : '';
  const autocompleteText = processTranslation({
    phrase: `${autocompleteOptions} autocomplete suggestion found.`,
    pluralForm: `${autocompleteOptions} autocomplete suggestions found.`,
    count: autocompleteOptions
  });
  return (recentSearchesText + ' ' + autocompleteText).trim();
}

function DropdownSearchButton({ executeQuery, isLoading, cssClasses }: {
  executeQuery: () => void,
  isLoading: boolean,
  cssClasses: {
    searchButtonContainer?: string,
    searchButton?: string
  }
}) {
  const { toggleDropdown } = useDropdownContext();
  return (
    <div className={cssClasses.searchButtonContainer}>
      <SearchButton
        className={cssClasses.searchButton}
        handleClick={() => {
          executeQuery();
          toggleDropdown(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}