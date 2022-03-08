import {
  DisplayableFacet,
  SelectableFilter as DisplayableFilter,
  useAnswersActions,
  useAnswersState
} from '@yext/answers-headless-react';
import { ReactNode, useMemo } from 'react';
import { executeSearch } from '../../utils/search-operations';
import { FiltersContext, FiltersContextType } from './FiltersContext';

/**
 * Props for {@link Filters.Facets}
 *
 * @public
 */
export interface FacetsProps {
  /** CSS class names applied to the component's container div. */
  className?: string,
  /** Whether or not a search is automatically run when a filter is selected. Defaults to true. */
  searchOnChange?: boolean,
  /** A function which renders the Facets UI with the provided facets data.
   *
   * @remarks
   * It is intended to be used with the Filters subcomponents including Filters.FilterGroup,
   * Filters.CollapsibleLabel, Filters.SearchInput, Filters.CheckboxOption, Filters.CollapsibleSection
   */
  children?: (facets: DisplayableFacet[]) => ReactNode
}

/**
 * The Facets component is a wrapper component around {@link Filters} that updates facet options
 * when a child filter is updated.
 *
 * The representation of the facets is configured using a FACC (function as a child component)
 * The FACC is passed the facets data, and is intended for use with components like
 * {@link Filters.CheckboxOption}.
 *
 * @public
 *
 * @param props - {@link Filters.FacetsProps}
 */
export function Facets({
  children,
  className = 'md:w-40',
  searchOnChange = true
}: FacetsProps): JSX.Element {
  const answersActions = useAnswersActions();
  const facets = useAnswersState(state => state.filters.facets) ?? [];
  const filters: DisplayableFilter[] = facets.flatMap(f => f.options.map(o => {
    return {
      fieldId: f.fieldId,
      value: o.value,
      matcher: o.matcher,
      selected: o.selected,
      displayName: o.displayName
    };
  }));

  const filtersContextInstance: FiltersContextType = useMemo(() => {
    return {
      selectFilter(filter: DisplayableFilter) {
        if (typeof filter.value === 'object') {
          console.error('Facets only support string, number, and boolean. Found the following object value instead:', filter.value);
          return;
        }
        const facetOption = {
          matcher: filter.matcher,
          value: filter.value
        };
        answersActions.setFacetOption(filter.fieldId, facetOption, filter.selected);
      },
      applyFilters() {
        if (searchOnChange) {
          answersActions.setOffset(0);
          executeSearch(answersActions);
        }
      },
      filters
    };
  }, [answersActions, filters, searchOnChange]);

  return (
    <div className={className}>
      <FiltersContext.Provider value={filtersContextInstance}>
        {children?.(facets)}
      </FiltersContext.Provider>
    </div>
  );
}