import { useAnswersState, FiltersState } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { GroupedFilters } from '../models/groupedFilters';
import { getGroupedAppliedFilters } from '../utils/appliedfilterutils';
import { useRef } from 'react';
import classNames from 'classnames';
import AppliedFiltersDisplay from './AppliedFiltersDisplay';

export interface AppliedFiltersCssClasses {
  appliedFiltersContainer?: string,
  appliedFiltersContainer___loading?: string,
  nlpFilter?: string,
  removableFilter?: string,
  removeFilterButton?: string,
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

export interface AppliedFiltersProps {
  hiddenFields?: Array<string>,
  /**
   * A mapping of static filter fieldIds to their displayed group labels.
   */
  staticFiltersGroupLabels?: Record<string, string>,
  customCssClasses?: AppliedFiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

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
    hiddenFields = [],
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
