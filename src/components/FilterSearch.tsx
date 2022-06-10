import { AutocompleteResult, Filter, FilterSearchResponse, SearchParameterField, useAnswersActions } from '@yext/answers-headless-react';
import { useCallback, useMemo } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import { executeSearch } from '../utils';
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
  container?: string,
  label?: string,
  dropdownContainer?: string,
  inputElement?: string,
  sectionContainer?: string,
  sectionLabel?: string,
  focusedOption?: string,
  optionsContainer?: string,
  inputContainer?: string
}

const builtInCssClasses: FilterSearchCssClasses = {
  container: 'mb-2',
  label: 'mb-4 text-sm font-medium text-neutral-dark',
  dropdownContainer: 'absolute z-10 shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 px-4 mt-1',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral',
  sectionContainer: 'pb-2',
  sectionLabel: 'text-sm text-neutral-dark font-semibold pb-2',
  focusedOption: 'bg-gray-100',
  option: 'text-sm text-neutral-dark pb-1 cursor-pointer',
};

/**
 * The props for the {@link FilterSearch} component.
 *
 * @public
 */
export interface FilterSearchProps {
  /** The display label for the component. Defaults to "Filter". */
  label?: string,
  /** Determines whether or not the results of the filter search are separated by field. Defaults to false. */
  sectioned?: boolean,
  /** An array of fieldApiName and entityType which indicates what to perform the filter search against. */
  searchFields: Omit<SearchParameterField, 'fetchEntities'>[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterSearchCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
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
  label = 'Filter',
  sectioned = false,
  searchFields,
  customCssClasses,
  cssCompositionMethod
}: FilterSearchProps): JSX.Element {
  const answersActions = useAnswersActions();
  const searchParamFields = useMemo(() => {
    return searchFields.map((searchField) => {
      return { ...searchField, fetchEntities: false };
    });
  }, [searchFields]);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const [
    filterSearchResponse,
    executeFilterSearch
  ] = useSynchronizedRequest<string, FilterSearchResponse>(
    inputValue => answersActions.executeFilterSearch(inputValue ?? '', sectioned, searchParamFields),
    (e) => console.error('Error occured executing a filter search request.\n', e)
  );

  const sections = useMemo(() => {
    return filterSearchResponse?.sections.filter(section => section.results.length > 0) ?? [];
  }, [filterSearchResponse?.sections]);

  const hasResults = sections.flatMap(s => s.results).length > 0;

  const handleSelectDropdown = useCallback((_value, _index, itemData) => {
    const filter = itemData?.filter as Filter;
    const displayName = itemData?.displayName as string;
    if (filter && displayName) {
      answersActions.setFilterOption({ ...filter, displayName, selected: true });
      answersActions.setOffset(0);
      executeSearch(answersActions);
    }
  }, [answersActions]);

  const handleChangeDropdownInput = executeFilterSearch;
  const meetsSubmitCritera = useCallback(index => index >= 0, []);

  const itemDataMatrix = useMemo(() => {
    return sections.map(section => {
      return section.results.map(result => ({
        filter: result.filter,
        displayName: result.value
      }));
    });
  }, [sections]);

  function renderDropdownItems() {
    return sections.map((section, sectionIndex) => {
      return (
        <div className={cssClasses.sectionContainer} key={sectionIndex}>
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

  return (
    <div className={cssClasses.container}>
      <h1 className={cssClasses.label}>{label}</h1>
      <Dropdown
        screenReaderText={getScreenReaderText(sections)}
        onSelect={handleSelectDropdown}
      >
        <div className={cssClasses.inputContainer}>
          <DropdownInput
            className={cssClasses.inputElement}
            placeholder='Search here ...'
            onChange={handleChangeDropdownInput}
            submitCriteria={meetsSubmitCritera}
          />
        </div>
        <DropdownMenu>
          {hasResults &&
            <div className={cssClasses.dropdownContainer}>
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
