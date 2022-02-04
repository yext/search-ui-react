import { QuerySource, SearchTypeEnum, useAnswersActions, useAnswersState, useAnswersUtilities, VerticalResults } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { Fragment, PropsWithChildren, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useEntityPreviews } from '../hooks/useEntityPreviews';
import useRecentSearches from '../hooks/useRecentSearches';
import useSearchWithNearMeHandling from '../hooks/useSearchWithNearMeHandling';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import VerticalDividerIcon from '../icons/BarIcon';
import RecentSearchIcon from '../icons/HistoryIcon';
import CloseIcon from '../icons/CloseIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import YextLogoIcon from '../icons/YextIcon';
import { BrowserState } from './PageRouter';
import Dropdown from './Dropdown/Dropdown';
import { useDropdownContext } from './Dropdown/DropdownContext';
import DropdownInput from './Dropdown/DropdownInput';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import { FocusedItemData } from './Dropdown/FocusContext';
import { calculateEntityPreviewsCount, calculateRestrictVerticals, calculateUniversalLimit, transformEntityPreviews } from './EntityPreviews';
import SearchButton from './SearchButton';
import { processTranslation } from './utils/processTranslation';
import renderAutocompleteResult, {
  AutocompleteResultCssClasses
} from './utils/renderAutocompleteResult';

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
  customCssClasses?: SearchBarCssClasses
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
  customCssClasses: cssClasses = {},
  entityPreviewsDebouncingTime = 500
}: Props): JSX.Element {
  const browserHistory = useHistory<BrowserState>();
  const answersActions = useAnswersActions();
  const answersUtilities = useAnswersUtilities();

  const query = useAnswersState(state => state.query.input) ?? '';
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  const [autocompleteResponse, executeAutocomplete] = useSynchronizedRequest(() => {
    return isVertical
      ? answersActions.executeVerticalAutocomplete()
      : answersActions.executeUniversalAutocomplete();
  });
  const [
    executeQueryWithNearMeHandling,
    autocompletePromiseRef
  ] = useSearchWithNearMeHandling(answersActions, geolocationOptions);
  const [recentSearches, setRecentSearch, clearRecentSearches] = useRecentSearches(recentSearchesLimit);
  const filteredRecentSearches = recentSearches?.filter(search =>
    answersUtilities.isCloseMatch(search.query, query)
  );

  useEffect(() => {
    if (hideRecentSearches) {
      clearRecentSearches();
    }
  }, [clearRecentSearches, hideRecentSearches]);

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
  };

  const [entityPreviewsState, executeEntityPreviewsQuery] = useEntityPreviews(entityPreviewsDebouncingTime);
  const { verticalResultsArray, isLoading: entityPreviewsLoading } = entityPreviewsState;
  const entityPreviews = renderEntityPreviews
    && renderEntityPreviews(entityPreviewsLoading, verticalResultsArray, handleSubmit);
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
          autocompletePromiseRef.current = executeAutocomplete();
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
    ));
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
    ));
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

  const transformedEntityPreviews = entityPreviews
    && transformEntityPreviews(entityPreviews, verticalResultsArray);
  const entityPreviewsCount = calculateEntityPreviewsCount(transformedEntityPreviews);
  const hasItems = !!(autocompleteResponse?.results.length
    || (!isVertical && filteredRecentSearches?.length) || entityPreviewsCount);
  const screenReaderText = getScreenReaderText(
    autocompleteResponse?.results.length,
    filteredRecentSearches?.length, entityPreviewsCount
  );
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
          />
        </div>
        {hasItems &&
          <StyledDropdownMenu cssClasses={cssClasses}>
            {renderRecentSearches()}
            {renderQuerySuggestions()}
            {transformedEntityPreviews}
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
  );
}

function getScreenReaderText(
  autocompleteOptions = 0,
  recentSearchesOptions = 0,
  entityPreviewsCount = 0
): string {
  const recentSearchesText = recentSearchesOptions > 0
    ? processTranslation({
      phrase: `${recentSearchesOptions} recent search found.`,
      pluralForm: `${recentSearchesOptions} recent searches found.`,
      count: recentSearchesOptions
    })
    : '';
  const entityPreviewsText = entityPreviewsCount > 0
    ? ' ' + processTranslation({
      phrase: `${entityPreviewsCount} result preview found.`,
      pluralForm: `${entityPreviewsCount} result previews found.`,
      count: entityPreviewsCount
    })
    : '';
  const autocompleteText = autocompleteOptions > 0
    ? ' ' + processTranslation({
      phrase: `${autocompleteOptions} autocomplete suggestion found.`,
      pluralForm: `${autocompleteOptions} autocomplete suggestions found.`,
      count: autocompleteOptions
    })
    : '';

  const text = recentSearchesText + autocompleteText + entityPreviewsText;
  if (text === '') {
    return processTranslation({
      phrase: '0 autocomplete suggestion found.',
      pluralForm: '0 autocomplete suggestions found.',
      count: 0
    });
  }
  return text.trim();
}

function DropdownSearchButton({ executeQuery, cssClasses }: {
  executeQuery: () => void,
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
      />
    </div>
  );
}