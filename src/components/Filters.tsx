import { Filter, Matcher, useAnswersUtilities } from '@yext/answers-headless-react';
import { useState } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import CollapsibleLabel, { CollapsibleLabelCssClasses } from './CollapsibleLabel';
import renderCheckboxOption from './utils/renderCheckboxOption';

/**
 * Properties for {@link Filters}.
 */
interface FiltersProps {
  /** Configurations for individual filter groups. */
  filterConfigs: FilterConfig[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FiltersCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * Configuration for a filter.
 */
export interface FilterConfig {
  /** Options to display together in a group. */
  options: FilterOption[],
  /** Whether or not to display the filter option search input. */
  searchable?: boolean,
  /** The placeholder text used for the filter option search input */
  placeholderText?: string,
  /** Label for the filter group. */
  label?: string,
  /** Allow expanding and collapsing the group of filters. Defaults to true. */
  collapsible?: boolean,
  /** Whether or not the group of filters should be expanded on initial page load. Defaults to true. */
  defaultExpanded?: boolean
}

interface FilterOption {
  fieldId: string,
  value: string | number | boolean,
  label: string,
  onClick?: (filter: Filter, selected: boolean) => void,
  isSelected?: boolean
}

/**
 * The CSS class interface used for {@link Filters}.
 */
export interface FiltersCssClasses extends CollapsibleLabelCssClasses {
  /** Applies to outermost container of the groups of filters. */
  container?: string,
  /** Applies to the divider between groups of filters. */
  divider?: string,
  /** Applies to the filter option search input. */
  searchableInputElement?: string,
  /** Applies to container of individual group of filters. */
  optionsContainer?: string
}

const builtInCssClasses: FiltersCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-500 text-sm font-normal cursor-pointer',
  container: 'md:w-40',
  divider: 'w-full h-px bg-gray-200 my-4',
  searchableInputElement: 'text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600',
  optionsContainer: 'flex flex-col space-y-3',
};

/**
 * A component that display groups of filter options based on the provided list of filter configurations.
 *
 * @param props - {@inheritdoc FiltersProps}
 * @returns A React element for the Filters
 */
export default function Filters(props: FiltersProps): JSX.Element {
  const { filterConfigs, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  // Maintain the state of the search inputs where the key is the index of the filterConfig, and the
  // value is the search input
  const [ searchTerms, setSearchTerms ] = useState<Record<number, string>>({});
  const answersUtilities = useAnswersUtilities();

  function renderSearchInput({
    value = '',
    placeholderText = 'Search here...',
    index
  }: {
    value?: string,
    placeholderText?: string,
    index: number
  }) {
    return (<input
      className={cssClasses.searchableInputElement}
      type='text'
      placeholder={placeholderText}
      value={value}
      onChange={e => setSearchTerms({
        ...searchTerms,
        [index]: e.target.value
      })}
    />);
  }

  return (
    <div className={cssClasses.container}>
      {filterConfigs.map((filterConfig, index) => {
        const isLastfilter = index === filterConfigs.length - 1;
        const options = filterConfig.searchable
          ? filterConfig.options.filter(o => answersUtilities.isCloseMatch(o.label ?? '', searchTerms[index] ?? ''))
          : filterConfig.options;
        const hasSelectedFilterOption = !!options.find(o => o.isSelected);

        return (
          <div key={`${filterConfig.label}-${index}`}>
            <CollapsibleLabel
              collapsible={filterConfig.collapsible}
              label={filterConfig.label ?? ''}
              defaultExpanded={hasSelectedFilterOption || filterConfig.defaultExpanded}
              customCssClasses={cssClasses}
              cssCompositionMethod={cssCompositionMethod}
            >
              {filterConfig.searchable && renderSearchInput({
                value: searchTerms[index],
                placeholderText: filterConfig.placeholderText,
                index
              })}
              <div className={cssClasses.optionsContainer}>
                {options.map((option, index) => {
                  const filter = {
                    fieldId: option.fieldId,
                    matcher: Matcher.Equals,
                    value: option.value
                  };
                  return renderCheckboxOption({
                    option: { id: `${option.label}-${index}`, label: option.label },
                    onClick: selected => option.onClick?.(filter, selected),
                    selected: option.isSelected,
                    cssClasses
                  });
                })}
              </div>
            </CollapsibleLabel>
            {!isLastfilter && <Divider customCssClasses={{ divider: cssClasses.divider }} cssCompositionMethod='replace'/>}
          </div>
        );
      })}
    </div>
  );
}

interface DividerProps {
  customCssClasses?: {
    divider?: string
  },
  cssCompositionMethod?: CompositionMethod
}

export function Divider({ customCssClasses, cssCompositionMethod }: DividerProps): JSX.Element {
  const builtInCssClasses = {
    divider: 'w-full h-px bg-gray-200 my-4'
  };
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return <div className={cssClasses.divider}></div>;
}
