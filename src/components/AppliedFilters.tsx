import { useAnswersState, FiltersState } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { pruneAppliedFilters } from '../utils/appliedfilterutils';
import { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { AppliedFiltersDisplay } from './AppliedFiltersDisplay';
import { GroupedFilters } from '../models/groupedFilters';
import { DEFAULT_HIERARCHICAL_DELIMITER } from './Filters/HierarchicalFacet';
import { useSnapshottedAnswersState } from '../hooks/useSnapshottedAnswersState';

/**
 * The CSS class interface used for {@link AppliedFilters}.
 *
 * @public
 */
export interface AppliedFiltersCssClasses {
  appliedFiltersContainer?: string,
  appliedFiltersContainer___loading?: string,
  nlpFilter?: string,
  removableFilter?: string,
  removeFilterButton?: string,
  filterLabel?: string,
  clearAllButton?: string
}

const builtInCssClasses: AppliedFiltersCssClasses = {
  // Use negative margin to remove space above the filters on mobile
  appliedFiltersContainer: 'flex flex-wrap -mt-3 md:mt-0 mb-2',
  appliedFiltersContainer___loading: 'opacity-50',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
  removeFilterButton: 'w-2 h-2 text-neutral m-1.5',
  clearAllButton: 'text-sm font-medium text-primary hover:underline focus:underline mb-2'
};

/**
 * Properties for {@link AppliedFilters}.
 *
 * @public
 */
export interface AppliedFiltersProps {
  /** List of filters that should not be displayed. By default, builtin.entityType will be hidden. */
  hiddenFields?: Array<string>,
  /** A set of facet fieldIds that should be interpreted as "hierarchical". */
  hierarchicalFacetsFieldIds?: string[],
  /** {@inheritDoc Filters.HierarchicalFacetProps.delimiter} */
  hierarchicalFacetsDelimiter?: string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: AppliedFiltersCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays a list of filters applied to the current vertical
 * search, which may include any selected options from static filters, facets, and
 * NLP filters.
 *
 * @public
 *
 * @param props - {@link AppliedFiltersProps}
 * @returns A React element for the applied filters
 */
export function AppliedFilters(props: AppliedFiltersProps): JSX.Element {
  const nlpFilters = useAnswersState(state => state.vertical.appliedQueryFilters);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const verticalResults = useAnswersState(state => state.vertical.results);
  const filters = useSnapshottedAnswersState(state => state.filters);

  const {
    hiddenFields,
    customCssClasses = {},
    cssCompositionMethod,
    hierarchicalFacetsDelimiter = DEFAULT_HIERARCHICAL_DELIMITER,
    hierarchicalFacetsFieldIds
  } = props;

  const appliedFilters: GroupedFilters = useMemo(() => {
    const filtersHiddenForNoResults = (verticalResults && filters) ?? {};
    return pruneAppliedFilters(
      filtersHiddenForNoResults,
      nlpFilters ?? [],
      hiddenFields ?? ['builtin.entityType'],
      hierarchicalFacetsFieldIds ?? [],
      hierarchicalFacetsDelimiter
    );
  }, [
    verticalResults,
    filters,
    hiddenFields,
    hierarchicalFacetsDelimiter,
    hierarchicalFacetsFieldIds,
    nlpFilters
  ]);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });
  return <AppliedFiltersDisplay
    {...appliedFilters}
    cssClasses={cssClasses}
    hierarchicalFacetsDelimiter={hierarchicalFacetsDelimiter}
  />;
}
