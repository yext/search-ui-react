import { useMemo } from 'react';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import {
  ApplyFiltersButton,
  CheckboxOption,
  CollapsibleLabel,
  CollapsibleSection,
  FilterGroup,
  SearchInput
} from './Filters';
import { StaticFilters as StaticFiltersCompoundComponent } from './Filters/StaticFilters';

/**
 * The CSS class interface for {@link StaticFilters}.
 *
 * @public
 */
export interface StaticFiltersCssClasses {
  container?: string,
  searchInput?: string,
  optionsContainer?: string,
  option?: string,
  optionInput?: string,
  optionLabel?: string,
  applyFiltersButton?: string
}

/**
 * The configuration data for a filter option.
 *
 * @public
 */
export interface FilterOptionConfig {
  /** {@inheritDoc Filters.CheckboxOptionProps.value} */
  value: string | number | boolean,
  /** {@inheritDoc Filters.CheckboxOptionProps.label} */
  label?: string,
  /** {@inheritDoc Filters.CheckboxOptionProps.selectedByDefault} */
  selectedByDefault?: boolean
}

/**
 * Props for the {@link StaticFilters} component.
 *
 * @public
 */
export interface StaticFiltersProps {
  /** The fieldId corresponding to the static filter group. */
  fieldId: string,
  /** {@inheritDoc FilterOptionConfig} */
  filterOptions: FilterOptionConfig[],
  /** The displayed label for the static filter group. */
  title?: string,
  /** Whether or not the filter is collapsible. Defaults to true. */
  collapsible?: boolean,
  /**
   * If the filter group is collapsible, whether or not it should start out
   * expanded. Defaults to true.
   */
  defaultExpanded?: boolean,
  /** Whether or not to display a text input to search for filter options. */
  searchable?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StaticFiltersCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays a group of user-configured filters that will be
 * applied to the current vertical search.
 *
 * @param props - {@link StaticFiltersProps}
 * @returns A React component for static filters
 *
 * @public
 */
export function StaticFilters({
  fieldId,
  filterOptions,
  title,
  collapsible = true,
  defaultExpanded = true,
  searchable,
  searchOnChange = true,
  customCssClasses = {},
  cssCompositionMethod
}: StaticFiltersProps): JSX.Element {
  const cssClasses = useMemo(() => {
    const { option, optionLabel, optionInput, ...remainingClasses } = customCssClasses;
    return {
      ...remainingClasses,
      ...customCssClasses.option && { optionContainer: option },
      ...customCssClasses.optionLabel && { label: optionLabel },
      ...customCssClasses.optionInput && { input: optionInput }
    };
  }, [customCssClasses]);

  function renderTitle() {
    return collapsible
      ? <CollapsibleLabel label={title} />
      : (title &&
        <div className='text-neutral-dark text-sm font-medium text-left mb-4'>
          {title}
        </div>);
  }

  return (
    <StaticFiltersCompoundComponent searchOnChange={searchOnChange} className={cssClasses.container}>
      <FilterGroup fieldId={fieldId} defaultExpanded={!collapsible || defaultExpanded}>
        {renderTitle()}
        <CollapsibleSection className={cssClasses.optionsContainer}>
          {searchable && <SearchInput className={cssClasses.searchInput} />}
          {filterOptions.map(o => {
            return (
              <CheckboxOption
                {...o}
                key={o.value.toString()}
                customCssClasses={cssClasses}
                cssCompositionMethod={cssCompositionMethod}
              />
            );
          })}
          {!searchOnChange && <ApplyFiltersButton className={customCssClasses.applyFiltersButton} />}
        </CollapsibleSection>
      </FilterGroup>
    </StaticFiltersCompoundComponent>
  );
}
