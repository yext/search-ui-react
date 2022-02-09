import { useAnswersState, FiltersState } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { GroupedFilters } from '../models/groupedFilters';
import { getGroupedAppliedFilters } from '../utils/appliedfilterutils';
import { useRef } from 'react';
import classNames from 'classnames';
import AppliedFiltersDisplay from './AppliedFiltersDisplay';

/**
 * The CSS class interface used for {@link AppliedFilters}.
 */
export interface AppliedFiltersCssClasses {
  /**
   * Styling applied to outermost container of the applied filters.
   */
  appliedFiltersContainer?: string,
  /**
   * Styling to apply when the results are loading.
   */
  appliedFiltersContainer___loading?: string,
  /**
   * Styling applied to NLP filters.
   */
  nlpFilter?: string,
  /**
   * Styling applied to container of individual removable filters.
   */
  removableFilter?: string,
  /**
   * Styling applied the remove button for all removable filters.
   */
  removeFilterButton?: string,
  /**
   * Styling applied the text label for all applied filters.
   */
  filterLabel?: string
}

const builtInCssClasses: AppliedFiltersCssClasses = {
  // Use negative margin to remove space above the filters on mobile
  appliedFiltersContainer: 'flex flex-wrap -mt-3 md:mt-0',
  appliedFiltersContainer___loading: 'opacity-50',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-800 mr-2 mb-4',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2 mb-4',
  removeFilterButton: 'w-2 h-2 text-gray-500 m-1.5'
};

/**
 * Properties for {@link AppliedFilters}.
 */
export interface AppliedFiltersProps {
  /**
   * List of filters that should not be displayed. By default, builtin.entityType will be hidden.
   */
  hiddenFields?: Array<string>,
  /**
   * A mapping of static filter fieldIds to their displayed group labels.
   */
  staticFiltersGroupLabels?: Record<string, string>,
  /**
   * CSS classes for customizing the component styling.
   */
  customCssClasses?: AppliedFiltersCssClasses,
  /**
   * {@inheritDoc CompositionMethod}
   */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays a list of filters applied to the current vertical
 * search, which may include any selected options from static filters, facets, and
 * NLP filters.
 *
 * @param props - {@inheritdoc AppliedFiltersProps}
 * @returns A React element for the applied filters
 */
export default function AppliedFilters(props: AppliedFiltersProps): JSX.Element {
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
    staticFiltersGroupLabels = {},
    customCssClasses = {},
    cssCompositionMethod,
    ...otherProps
  } = props;
  const groupedFilters: Array<GroupedFilters> = getGroupedAppliedFilters(
    filterState.current,nlpFilters, hiddenFields, staticFiltersGroupLabels);
  const appliedFilters = groupedFilters.flatMap(groupedFilters => groupedFilters.filters);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });
  return <AppliedFiltersDisplay displayableFilters={appliedFilters} cssClasses={cssClasses} {...otherProps}/>;
}
