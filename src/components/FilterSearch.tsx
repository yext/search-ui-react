import { AutocompleteResult, Filter, FilterSearchResponse, SearchParameterField, useAnswersActions } from '@yext/answers-headless-react';
import { useRef } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import Dropdown from './Dropdown/Dropdown';
import DropdownInput from './Dropdown/DropdownInput';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import { processTranslation } from './utils/processTranslation';
import renderAutocompleteResult, { AutocompleteResultCssClasses } from './utils/renderAutocompleteResult';

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
  label: 'mb-4 text-sm font-medium text-gray-900',
  dropdownContainer: 'absolute z-10 shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 px-4 mt-1',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600',
  sectionContainer: 'pb-2',
  sectionLabel: 'text-sm text-gray-700 font-semibold pb-2',
  focusedOption: 'bg-gray-100',
  option: 'text-sm text-gray-700 pb-1 cursor-pointer',
};

/**
 * The props for the {@link FilterSearch} component.
 *
 * @public
 */
export interface FilterSearchProps {
  /** The display label for the component. */
  label: string,
  /** Determines whether or not the results of the filter search are separated by field. */
  sectioned: boolean,
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
export default function FilterSearch({
  label,
  sectioned,
  searchFields,
  customCssClasses,
  cssCompositionMethod
}: FilterSearchProps): JSX.Element {
  const answersActions = useAnswersActions();
  const selectedFilterOptionRef = useRef<Filter>();
  const searchParamFields = searchFields.map((searchField) => {
    return { ...searchField, fetchEntities: false };
  });
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const [
    filterSearchResponse,
    executeFilterSearch
  ] = useSynchronizedRequest<string, FilterSearchResponse>(inputValue =>
    answersActions.executeFilterSearch(inputValue ?? '', sectioned, searchParamFields)
  );
  const sections = filterSearchResponse?.sections.filter(section => section.results.length > 0) ?? [];
  const hasResults = sections.flatMap(s => s.results).length > 0;

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
                itemData={{ filter: result.filter }}
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
        onSelect={(_value, _index, itemData) => {
          const filter = itemData?.filter as Filter;
          if (filter) {
            if (selectedFilterOptionRef.current) {
              answersActions.setFilterOption({ ...selectedFilterOptionRef.current, selected: false });
            }
            selectedFilterOptionRef.current = filter;
            answersActions.setFilterOption({ ...filter, selected: true });
            answersActions.executeVerticalQuery();
          }
        }}
      >
        <div className={cssClasses.inputContainer}>
          <DropdownInput
            className={cssClasses.inputElement}
            placeholder='Search here ...'
            onChange={query => executeFilterSearch(query)}
            submitCriteria={index => index >= 0}
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
  if (sections.length > 0) {
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
  }
  return screenReaderText;
}
