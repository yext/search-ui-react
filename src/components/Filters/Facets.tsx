import { DisplayableFacet, Filter, SelectableFilter, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { ReactNode } from 'react';
import FiltersContext from './FiltersContext';

export type FacetsProps = {
  className?: string,
  searchOnChange?: boolean,
  children?: (facets: DisplayableFacet[]) => ReactNode
};

/**
 * The Facets component is a wrapper component around {@link Filters} that updates facet options
 * when a child filter is updated.
 *
 * The representation of the facets is configured using a FACC (function as a child component)
 * The FACC is passed the facets data, and is intended for use with components like {@link CheckboxOption}.
 */
export default function Facets(props: FacetsProps): JSX.Element {
  const {
    children,
    className = 'md:w-40',
    searchOnChange = true
  } = props;
  const answersActions = useAnswersActions();
  const facets = useAnswersState(state => state.filters.facets) ?? [];
  const filters: SelectableFilter[] = facets.flatMap(f => f.options.map(o => {
    return {
      fieldId: f.fieldId,
      selected: o.selected,
      value: o.value,
      matcher: o.matcher
    };
  }));

  function handleFilterSelect(filter: Filter, selected: boolean) {
    if (typeof filter.value === 'object') {
      console.error('Facets only support string, number, and boolean. Found the following object value instead:', filter.value);
      return;
    }
    const facetOption = {
      matcher: filter.matcher,
      value: filter.value
    };
    answersActions.setFacetOption(filter.fieldId, facetOption, selected);
    if (searchOnChange) {
      answersActions.executeVerticalQuery();
    }
  }

  const filtersContextInstance = { handleFilterSelect, filters };

  return (
    <div className={className}>
      <FiltersContext.Provider value={filtersContextInstance}>
        {children?.(facets)}
      </FiltersContext.Provider>
    </div>
  );
}