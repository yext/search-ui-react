import { useAnswersState, FiltersState } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { pruneAppliedFilters } from '../utils/appliedfilterutils';
import { useRef } from 'react';
import classNames from 'classnames';
import { AppliedFiltersDisplay } from './AppliedFiltersDisplay';
import { GroupedFilters } from '../models/groupedFilters';

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
  appliedFiltersContainer: 'flex flex-wrap -mt-3 md:mt-0 mb-4',
  appliedFiltersContainer___loading: 'opacity-50',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-800 mr-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2',
  removeFilterButton: 'w-2 h-2 text-gray-500 m-1.5',
  clearAllButton: 'text-sm font-medium text-primary-600 hover:underline focus:underline'
};

/**
 * Properties for {@link AppliedFilters}.
 *
 * @public
 */
export interface AppliedFiltersProps {
  /** List of filters that should not be displayed. By default, builtin.entityType will be hidden. */
  hiddenFields?: Array<string>,
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
  const nlpFilters = useAnswersState(state => state.vertical.appliedQueryFilters) || [];
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const verticalResults = useAnswersState(state => state.vertical.results);
  const filters = useAnswersState(state => state.filters);

  const filterState = useRef<FiltersState>({});
  if (!isLoading) {
    filterState.current = verticalResults ? filters : {};
  }

  const {
    hiddenFields = ['builtin.entityType'],
    customCssClasses = {},
    cssCompositionMethod,
    ...otherProps
  } = props;
  const appliedFilters: GroupedFilters = pruneAppliedFilters(filterState.current, nlpFilters, hiddenFields);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });
  return <AppliedFiltersDisplay displayableFilters={appliedFilters} cssClasses={cssClasses} {...otherProps}/>;
}
