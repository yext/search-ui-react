import { FilterGroup, FilterGroupCssClasses } from './FilterGroup';
import { FilterOptionConfig } from './Filters';
import { StaticFiltersProvider } from './Filters/StaticFiltersProvider';

/**
 * The CSS class interface for {@link StaticFilters}.
 *
 * @public
 */
export interface StaticFiltersCssClasses extends FilterGroupCssClasses {
  staticFiltersContainer?: string
}

/**
 * The configuration data for a field value static filter option.
 *
 * @public
 */
export type StaticFilterOptionConfig = Omit<FilterOptionConfig, 'matcher' | 'value'> & {
  /** The value used to perform filtering. */
  value: string | number | boolean
};

/**
 * Props for the {@link StaticFilters} component.
 *
 * @public
 */
export interface StaticFiltersProps {
  /** The fieldId corresponding to the static filter group. */
  fieldId: string,
  /** {@inheritDoc StaticFilterOptionConfig} */
  filterOptions: StaticFilterOptionConfig[],
  /** The displayed label for the static filter group. */
  title: string,
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /** {@inheritDoc FilterGroupProps.searchable} */
  searchable?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StaticFiltersCssClasses
}

/**
 * A component that displays a group of user-configured field value filters
 * that will be applied to the current vertical search.
 *
 * @param props - {@link StaticFiltersProps}
 * @returns A React component for field value static filters
 *
 * @public
 */
export function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const { searchOnChange, customCssClasses = {}, ...filterGroupProps } = props;
  const { staticFiltersContainer: containerClassName, ...filterGroupCssClasses } = customCssClasses;
  return (
    <StaticFiltersProvider searchOnChange={searchOnChange} className={containerClassName}>
      <FilterGroup
        key={filterGroupProps.fieldId}
        customCssClasses={filterGroupCssClasses}
        {...filterGroupProps}
      />
    </StaticFiltersProvider>
  );
}
