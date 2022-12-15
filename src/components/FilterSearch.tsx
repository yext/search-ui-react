import { AutocompleteResult, FieldValueStaticFilter, FilterSearchResponse, SearchParameterField, SelectableStaticFilter, StaticFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import { executeSearch } from '../utils';
import { isDuplicateStaticFilter } from '../utils/filterutils';
import { Dropdown } from './Dropdown/Dropdown';
import { DropdownInput } from './Dropdown/DropdownInput';
import { DropdownItem } from './Dropdown/DropdownItem';
import { DropdownMenu } from './Dropdown/DropdownMenu';
import { processTranslation } from './utils/processTranslation';
import { renderAutocompleteResult, AutocompleteResultCssClasses } from './utils/renderAutocompleteResult';

/**
 * The CSS class interface for {@link FilterSearch}.
 *
 * @public
 */
export interface FilterSearchCssClasses extends AutocompleteResultCssClasses {
  filterSearchContainer?: string,
  label?: string,
  inputElement?: string,
  sectionLabel?: string,
  focusedOption?: string,
  optionsContainer?: string
}

const builtInCssClasses: Readonly<FilterSearchCssClasses> = {
  filterSearchContainer: 'relative mb-2',
  label: 'mb-4 text-sm font-medium text-neutral-dark',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral',
  sectionLabel: 'text-sm text-neutral-dark font-semibold py-2 px-4',
  focusedOption: 'bg-gray-100',
  option: 'text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4'
};

/**
 * The parameters that are passed into {@link FilterSearchProps.onSelect}.
 *
 * @public
 */
export interface OnSelectParams {
  /** The newly selected filter. */
  newFilter: FieldValueStaticFilter,
  /** The display name of the newly selected filter. */
  newDisplayName: string,
  /** The previously selected filter. */
  currentFilter: StaticFilter | undefined,
  /** A function that sets which filter the component is currently associated with. */
  setCurrentFilter: (filter: StaticFilter) => void,
  /**
   * A function that executes a filter search and updates the input and dropdown options
   * with the response.
   */
  executeFilterSearch: (query?: string) => Promise<FilterSearchResponse | undefined>
}

/**
 * The props for the {@link FilterSearch} component.
 *
 * @public
 */
export interface FilterSearchProps {
  /** An array of fieldApiName and entityType which indicates what to perform the filter search against. */
  searchFields: Omit<SearchParameterField, 'fetchEntities'>[],
  /** The display label for the component. */
  label?: string,
  /**
   * The search input's placeholder text when no text has been entered by the user.
   * Defaults to "Search here...".
   */
  placeholder?: string,
  /**
   * Whether to trigger a search when an option is selected. Defaults to false.
   *
   * @deprecated Use the `onSelect` prop instead.
   */
  searchOnSelect?: boolean,
  /** A function which is called when a filter is selected. */
  onSelect?: (params: OnSelectParams) => void,
  /** Determines whether or not the results of the filter search are separated by field. Defaults to false. */
  sectioned?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterSearchCssClasses
}

/**
 * A component which allows a user to search for filters associated with specific entities and fields.
 *
 * @public
 *
 * @param props - {@link FilterSearchProps}
 * @returns A react component for Filter Search
 */
export function FilterSearch({
  searchFields,
  label,
  placeholder = 'Search here...',
  searchOnSelect,
  onSelect,
  sectioned = false,
  customCssClasses
}: FilterSearchProps): JSX.Element {
  const searchActions = useSearchActions();
  const searchParamFields = searchFields.map((searchField) => {
    return { ...searchField, fetchEntities: false };
  });
  const matchingFieldIds: Set<string> = useMemo(() => {
    const fieldIds = new Set(searchFields.map(s => s.fieldApiName));
    if (fieldIds.has('builtin.location')) {
      ['builtin.region', 'address.countryCode'].forEach(s => fieldIds.add(s));
    }
    return fieldIds;
  }, [searchFields]);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const [currentFilter, setCurrentFilter] = useState<StaticFilter>();
  const [filterQuery, setFilterQuery] = useState<string>();
  const staticFilters = useSearchState(state => state.filters.static);
  const matchingFilters: SelectableStaticFilter[] = useMemo(() => {
    return staticFilters?.filter(({ filter, selected }) =>
      selected
      && filter.kind === 'fieldValue'
      && matchingFieldIds.has(filter.fieldId)
    ) ?? [];
  }, [staticFilters, matchingFieldIds]);

  const [
    filterSearchResponse,
    executeFilterSearch,
    clearFilterSearchResponse
  ] = useSynchronizedRequest<string, FilterSearchResponse>(
    inputValue => {
      setFilterQuery(inputValue);
      return searchActions.executeFilterSearch(inputValue ?? '', sectioned, searchParamFields);
    },
    (e) => console.error('Error occured executing a filter search request.\n', e)
  );

  useEffect(() => {
    if (matchingFilters.length > 1 && !onSelect) {
      console.warn('More than one selected static filter found that matches the filter search fields: ['
        + [...matchingFieldIds].join(', ')
        + ']. Please update the state to remove the extra filters.'
        + ' Picking one filter to display in the input.');
    }

    if (currentFilter && staticFilters?.find(f =>
      isDuplicateStaticFilter(f.filter, currentFilter) && f.selected
    )) {
      return;
    }

    if (matchingFilters.length === 0) {
      clearFilterSearchResponse();
      setCurrentFilter(undefined);
      setFilterQuery('');
    } else {
      setCurrentFilter(matchingFilters[0].filter);
      executeFilterSearch(matchingFilters[0].displayName);
    }
  }, [
    clearFilterSearchResponse,
    currentFilter,
    staticFilters,
    executeFilterSearch,
    onSelect,
    matchingFilters,
    matchingFieldIds
  ]);

  const sections = useMemo(() => {
    return filterSearchResponse?.sections.filter(section => section.results.length > 0) ?? [];
  }, [filterSearchResponse?.sections]);

  const hasResults = sections.flatMap(s => s.results).length > 0;

  const handleSelectDropdown = useCallback((_value, _index, itemData) => {
    const newFilter = itemData?.filter as FieldValueStaticFilter;
    const newDisplayName = itemData?.displayName as string;
    if (!newFilter || !newDisplayName) {
      return;
    }

    if (onSelect) {
      if (searchOnSelect) {
        console.warn('Both searchOnSelect and onSelect props were passed to the component.'
          + ' Using onSelect instead of searchOnSelect as the latter is deprecated.');
      }
      return onSelect({
        newFilter,
        newDisplayName,
        currentFilter,
        setCurrentFilter,
        executeFilterSearch
      });
    }

    if (matchingFilters.length > 1) {
      console.warn('More than one selected static filter found that matches the filter search fields: ['
        + [...matchingFieldIds].join(', ')
        + ']. Unselecting all existing matching filters and selecting the new filter.');
    }
    matchingFilters.forEach(f => searchActions.setFilterOption({ filter: f.filter, selected: false }));
    if (currentFilter) {
      searchActions.setFilterOption({ filter: currentFilter, selected: false });
    }
    searchActions.setFilterOption({ filter: newFilter, displayName: newDisplayName, selected: true });
    setCurrentFilter(newFilter);
    executeFilterSearch(newDisplayName);

    if (searchOnSelect) {
      searchActions.setOffset(0);
      searchActions.resetFacets();
      executeSearch(searchActions);
    }
  }, [
    currentFilter,
    searchActions,
    executeFilterSearch,
    onSelect,
    searchOnSelect,
    matchingFilters,
    matchingFieldIds
  ]);

  const meetsSubmitCritera = useCallback(index => index >= 0, []);

  const itemDataMatrix = useMemo(() => {
    return sections.map(section => {
      return section.results.map(result => ({
        filter: { ...result.filter, kind: 'fieldValue' },
        displayName: result.value
      }));
    });
  }, [sections]);

  function renderDropdownItems() {
    return sections.map((section, sectionIndex) => {
      return (
        <div className='pb-2' key={sectionIndex}>
          {section.label &&
            <div className={cssClasses.sectionLabel}>
              {section.label}
            </div>
          }
          <div className={cssClasses.optionsContainer}>
            {section.results.map((result, index) => (
              <DropdownItem
                key={index}
                focusedClassName={cssClasses.focusedOption}
                value={result.value}
                itemData={itemDataMatrix[sectionIndex][index]}
              >
                {renderAutocompleteResult(result, cssClasses)}
              </DropdownItem>
            ))}
          </div>
        </div>
      );
    });
  }

  const handleInputFocus = useCallback((value = '') => {
    if (value) {
      executeFilterSearch(value);
    }
  }, [executeFilterSearch]);

  return (
    <div className={cssClasses.filterSearchContainer}>
      {label && <h1 className={cssClasses.label}>{label}</h1>}
      <Dropdown
        screenReaderText={getScreenReaderText(sections)}
        onSelect={handleSelectDropdown}
        alwaysSelectOption={true}
        parentQuery={filterQuery}
      >
        <DropdownInput
          className={cssClasses.inputElement}
          placeholder={placeholder}
          onChange={executeFilterSearch}
          onFocus={handleInputFocus}
          submitCriteria={meetsSubmitCritera}
        />
        <DropdownMenu>
          {hasResults &&
            <div className='absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 mt-1'>
              {renderDropdownItems()}
            </div>
          }
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function getScreenReaderText(sections: {
  results: AutocompleteResult[],
  label?: string
}[]) {
  let screenReaderText = processTranslation({
    phrase: '0 autocomplete option found.',
    pluralForm: '0 autocomplete options found.',
    count: 0
  });
  if (sections.length === 0) {
    return screenReaderText;
  }
  const screenReaderPhrases = sections.map(section => {
    const optionInfo = section.label
      ? `${section.results.length} ${section.label}`
      : `${section.results.length}`;
    return processTranslation({
      phrase: `${optionInfo} autocomplete option found.`,
      pluralForm: `${optionInfo} autocomplete options found.`,
      count: section.results.length
    });
  });
  screenReaderText = screenReaderPhrases.join(' ');
  return screenReaderText;
}
