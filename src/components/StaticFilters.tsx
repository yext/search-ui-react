import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { FilterGroup, FilterOptionConfig } from './FilterGroup';
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
  optionLabel?: string
}

/**
 * The configuration data for a static filter option.
 *
 * @public
 */
export type StaticFilterOptionConfig = Omit<FilterOptionConfig, 'matcher'>;

/**
 * Props for the {@link StaticFilters} component.
 *
 * @public
 */
export interface StaticFiltersProps {
  /** The fieldId corresponding to the static filter group. */
  fieldId: string,
  /** {@inheritDoc FilterOptionConfig} */
  filterOptions: StaticFilterOptionConfig[],
  /** The displayed label for the static filter group. */
  title: string,
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
export function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const { searchOnChange, customCssClasses = {}, ...filterGroupProps } = props;
  const { container:containerCssClasses, ...filterGroupCssClasses } = customCssClasses;
  return (
    <StaticFiltersCompoundComponent searchOnChange={searchOnChange} className={containerCssClasses}>
      <FilterGroup
        key={filterGroupProps.fieldId}
        customCssClasses={filterGroupCssClasses}
        {...filterGroupProps}
      />
    </StaticFiltersCompoundComponent>
  );
}
