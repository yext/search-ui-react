import { Filter, Matcher, useAnswersUtilities } from '@yext/answers-headless-react';
import { useState } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import CollapsibleLabel, { CollapsibleLabelCssClasses } from './CollapsibleLabel';
import renderCheckboxOption from './utils/renderCheckboxOption';

interface FiltersProps {
  filterConfigs: FilterConfig[],
  customCssClasses?: FiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export interface FilterConfig {
  options: FilterOption[],
  searchable?: boolean,
  placeholderText?: string,
  label?: string,
  collapsible?: boolean,
  defaultExpanded?: boolean
}

interface FilterOption {
  fieldId: string,
  value: string | number | boolean,
  label: string,
  onClick?: (filter: Filter, selected: boolean) => void,
  isSelected?: boolean
}

export interface FiltersCssClasses extends CollapsibleLabelCssClasses {
  container?: string,
  divider?: string,
  buttonsContainer?: string,
  button?: string,
  searchableInputElement?: string,
  optionsContainer?: string,
  option?: string,
  optionInput?: string,
  optionLabel?: string
}

const builtInCssClasses: FiltersCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-500 text-sm font-normal cursor-pointer',
  container: 'md:w-40',
  divider: 'w-full h-px bg-gray-200 my-4',
  buttonsContainer: 'flex justify-between mt-5',
  button: 'border border-gray-300 px-2.5 py-1 rounded-md',
  searchableInputElement: 'text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600',
  optionsContainer: 'flex flex-col space-y-3',
}

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
    return <input
      className={cssClasses.searchableInputElement} 
      type='text' 
      placeholder={placeholderText} 
      value={value} 
      onChange={e => setSearchTerms({ 
        ...searchTerms,
        [index]: e.target.value
      })}
    />
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
                  }
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

export function Divider({ customCssClasses, cssCompositionMethod }: DividerProps) {
  const builtInCssClasses = {
    divider: 'w-full h-px bg-gray-200 my-4'
  }
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return <div className={cssClasses.divider}></div>
}
