import { Filter, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { PropsWithChildren } from 'react';
import { FiltersContext } from './FiltersContext';

/**
 * Props for the {@link Filters.StaticFilters}.
 *
 * @public
 */
export type StaticFiltersProps = PropsWithChildren<{
  /** CSS class names applied to the StaticFilter's container div. */
  className?: string,
  /** Whether or not a search is automatically run when a filter is selected. Defaults to true. */
  searchOnChange?: boolean
}>;

/**
 * The StaticFilters component is a wrapper component around {@link Filters} that updates static filter
 * options when a child filter is updated.
 *
 * The representation of the facets is configured using props.children,
 * and is intended for use with components like {@link Filters.CheckboxOption}.
 *
 * @param props - {@link Filters.StaticFiltersProps}
 *
 * @public
 */
export function StaticFilters({
  children,
  className = 'md:w-40',
  searchOnChange = true
}: StaticFiltersProps): JSX.Element {
  const answersActions = useAnswersActions();
  const filters = useAnswersState(state => state.filters.static) || [];

  const filtersContextInstance = {
    handleFilterSelect(filter: Filter, selected: boolean) {
      answersActions.setFilterOption({ ...filter, selected });
    },
    applyFilters() {
      if (searchOnChange) {
        answersActions.setOffset(0);
        answersActions.resetFacets();
        answersActions.executeVerticalQuery();
      }
    },
    filters
  };

  return (
    <div className={className}>
      <FiltersContext.Provider value={filtersContextInstance}>
        {children}
      </FiltersContext.Provider>
    </div>
  );
}