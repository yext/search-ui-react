import { Filter, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { PropsWithChildren } from 'react';
import FiltersContext from './FiltersContext';

/**
 * Props for the {@link Filters.StaticFilters}.
 * 
 * @public
 */
export type StaticFiltersProps = PropsWithChildren<{
  /** CSS class names applied to the StaticFilter's container div. */
  className?: string
}>;

/**
 * The StaticFilters component is a wrapper component around {@link Filters} that updates static filter
 * options when a child filter is updated.
 *
 * The representation of the facets is configured using props.children,
 * and is intended for use with components like {@link Filters.CheckboxOption}.
 * 
 * @public
 */
export default function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const {
    children,
    className = 'md:w-40'
  } = props;
  const answersActions = useAnswersActions();
  const filters = useAnswersState(state => state.filters.static) || [];

  const filtersContextInstance = {
    filters,
    handleFilterSelect: (filter: Filter, selected: boolean) => {
      answersActions.resetFacets();
      answersActions.setFilterOption({ ...filter, selected });
      answersActions.executeVerticalQuery();
    }
  };

  return (
    <div className={className}>
      <FiltersContext.Provider value={filtersContextInstance}>
        {children}
      </FiltersContext.Provider>
    </div>
  );
}