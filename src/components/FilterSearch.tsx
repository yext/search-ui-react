import { useTranslation } from 'react-i18next';
import { AutocompleteResult, FieldValueStaticFilter, FilterSearchResponse, SearchParameterField, SelectableStaticFilter, StaticFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useComposedCssClasses } from '../hooks';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import { useDebouncedFunction } from '../hooks/useDebouncedFunction';
import { executeSearch } from '../utils';
import { isDuplicateStaticFilter } from '../utils/filterutils';
import { useId } from '../hooks/useId';
import { Dropdown } from './Dropdown/Dropdown';
import { DropdownInput } from './Dropdown/DropdownInput';
import { DropdownItem } from './Dropdown/DropdownItem';
import { DropdownMenu } from './Dropdown/DropdownMenu';
import { Geolocation, GeolocationProps } from './Geolocation';
import { CurrentLocationIcon } from '../icons/CurrentLocationIcon';
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
  optionsContainer?: string,
  currentLocationButton?: string,
  currentLocationAndInputContainer?: string
}

const builtInCssClasses: Readonly<FilterSearchCssClasses> = {
  filterSearchContainer: 'relative mb-2',
  label: 'mb-4 text-sm font-medium text-neutral-dark',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral',
  sectionLabel: 'text-sm text-neutral-dark font-semibold py-2 px-4',
  focusedOption: 'bg-gray-100',
  option: 'text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4',
  currentLocationButton: 'h-5 w-5',
  currentLocationAndInputContainer: 'w-full flex items-center justify-start gap-2'
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
 * The parameters that are passed into {@link FilterSearchProps.onDropdownInputChange}.
 *
 * @public
 */
export interface OnDropdownInputChangeProps {
  /** The input element's new value after the change */
  value: string,
  /**
   * A function that executes a filter search and updates the input and dropdown options
   * with the response.
   */
  executeFilterSearch: (query?: string) => Promise<FilterSearchResponse | undefined>
}

/**
 * The parameters that are passed into {@link FilterSearchProps.afterDropdownInputFocus}.
 *
 * @public
 */
export interface AfterDropdownInputFocusProps {
  /** The input element's value. */
  value: string
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
  /** A function which is called when the input element's value changes. Replaces the default behavior. */
  onDropdownInputChange?: (params: OnDropdownInputChangeProps) => void,
  /**
   * A function which is called immediately after the input gains focus.
   * It does not replace the default focus behavior.
   */
  afterDropdownInputFocus?: (params: AfterDropdownInputFocusProps) => void,
  /** Determines whether or not the results of the filter search are separated by field. Defaults to false. */
  sectioned?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterSearchCssClasses,
  /** Whether to disable the default CSS classes entirely  */
  disableBuiltInClasses?: boolean,
  /** The accessible label for the dropdown input. */
  ariaLabel?: string,
  /** Whether to include a button to search on the user's location. Defaults to false. */
  showCurrentLocationButton?: boolean,
  /** The props for the geolocation component, if the current location button is enabled. */
  geolocationProps?: GeolocationProps
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
  placeholder,
  searchOnSelect,
  onSelect,
  onDropdownInputChange,
  afterDropdownInputFocus,
  sectioned = false,
  customCssClasses,
  disableBuiltInClasses = false,
  ariaLabel,
  showCurrentLocationButton = false,
  geolocationProps = {}
}: FilterSearchProps): React.JSX.Element {
  const { t } = useTranslation();
  const searchActions = useSearchActions();
  const inputId = useId('filter-search-input');
  const labelId = useId('filter-search-label');
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

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, disableBuiltInClasses);
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

  const debouncedExecuteFilterSearch = useDebouncedFunction(
    (query: string) => searchActions.executeFilterSearch(query, sectioned, searchParamFields),
    200
  );

  const [
    filterSearchResponse,
    executeFilterSearch,
    clearFilterSearchResponse
  ] = useSynchronizedRequest<string, FilterSearchResponse>(
    async (inputValue) => {
      setFilterQuery(inputValue);
      return debouncedExecuteFilterSearch
        ? debouncedExecuteFilterSearch(inputValue ?? '')
        : undefined;
    },
    (e) => console.error('Error occurred executing a filter search request.\n', e)
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

  const currentLocationCssClasses = useMemo(() => ({
    button: cssClasses.currentLocationButton,
    iconContainer: 'w-full h-full ml-0'
  }), [cssClasses.currentLocationButton]);

  const sections = useMemo(() => {
    return filterSearchResponse?.sections.filter(section => section.results.length > 0) ?? [];
  }, [filterSearchResponse?.sections]);

  const hasResults = sections.flatMap(s => s.results).length > 0;

  const handleSelectDropdown = useCallback(async (
    _value: string,
    _index: number,
    itemData: Record<string, unknown> | undefined
  ) => {
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

  const handleInputChange = useCallback((value: string) => {
    onDropdownInputChange ? onDropdownInputChange({
      value,
      executeFilterSearch
    }) : executeFilterSearch(value);
  }, [
    onDropdownInputChange,
    executeFilterSearch
  ]);

  const meetsSubmitCritera = useCallback((index: number) => index >= 0, []);

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

    afterDropdownInputFocus?.({ value });
  }, [afterDropdownInputFocus, executeFilterSearch]);

  const dropdownInput = (
    <DropdownInput
      className={cssClasses.inputElement}
      placeholder={placeholder ?? t('searchHere')}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      submitCriteria={meetsSubmitCritera}
      inputId={inputId}
      ariaLabel={ariaLabel}
      ariaLabelledBy={label ? labelId : undefined}
    />
  );

  const dropdownMenu = (
    <DropdownMenu>
      {hasResults &&
        <div className='absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 mt-1'>
          {renderDropdownItems()}
        </div>
      }
    </DropdownMenu>
  );

  return (
    <div className={cssClasses.filterSearchContainer}>
      {label && (
        <label id={labelId} htmlFor={inputId} className={cssClasses.label}>
          {label}
        </label>
      )}
      <Dropdown
        screenReaderText={getScreenReaderText(sections, t)}
        onSelect={handleSelectDropdown}
        alwaysSelectOption={true}
        parentQuery={filterQuery}
      >
        {showCurrentLocationButton ? (
          <div className={cssClasses.currentLocationAndInputContainer}>
            <div className='relative flex-1'>
              {dropdownInput}
              {dropdownMenu}
            </div>
            <Geolocation
              GeolocationIcon={CurrentLocationIcon}
              customCssClasses={currentLocationCssClasses}
              useIconAsButton={true}
              {...geolocationProps}
            />
          </div>
        ) : (
          <>
            {dropdownInput}
            {dropdownMenu}
          </>
        )}
      </Dropdown>
    </div>
  );
}

function getScreenReaderText(
  sections: {
    results: AutocompleteResult[],
    label?: string
  }[],
  t: ReturnType<typeof useTranslation>['t']
) {
  if (sections.length === 0) {
    return t('noAutocompleteOptionsFound');
  }
  const screenReaderPhrases = sections.map(section => {
    const label = section.label ? ` ${section.label}` : '';
    const count = section.results.length;
    return t('autocompleteOptionsFound', {
      count,
      label,
    });
  });
  return screenReaderPhrases.join(' ');
}
