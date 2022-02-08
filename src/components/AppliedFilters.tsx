import { DisplayableFilter } from '../models/displayableFilter';
import { ReactComponent as CloseX } from '../icons/x.svg';
import { useAnswersActions, AppliedQueryFilter, useAnswersState, FiltersState } from '@yext/answers-headless-react'
import { isNearFilterValue } from '../utils/filterutils';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { GroupedFilters } from '../models/groupedFilters';
import { getGroupedAppliedFilters } from '../utils/appliedfilterutils';
import { useRef } from 'react';
import classNames from 'classnames';

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
  removeFilterButton: 'w-2 h-2 text-blue-500 m-1.5'
}

interface AppliedFiltersDisplayProps {
  showFieldNames?: boolean,
  labelText?: string,
  delimiter?: string,
  displayableFilters: DisplayableFilter[],
  cssClasses?: AppliedFiltersCssClasses
}

export interface AppliedFiltersProps {
  hiddenFields?: Array<string>,
  labelText?: string,
  /**
   * A mapping of static filter fieldIds to their displayed group labels.
   */
  staticFiltersGroupLabels?: Record<string, string>,
  appliedQueryFilters?: AppliedQueryFilter[],
  customCssClasses?: AppliedFiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function AppliedFilters (
  props : AppliedFiltersProps
): JSX.Element {
  const nlpFilters = useAnswersState(state => state.vertical.appliedQueryFilters) || [];
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const verticalResults = useAnswersState(state => state.vertical.results);
  const filters = useAnswersState(state => state.filters);

  const filterState = useRef<FiltersState>({});
  if (!isLoading) {
    filterState.current = verticalResults ? filters : {};
  }

  const { hiddenFields = [], staticFiltersGroupLabels = {}, customCssClasses = {}, cssCompositionMethod, ...otherProps } = props;
  const groupedFilters: Array<GroupedFilters> = getGroupedAppliedFilters(filterState.current, nlpFilters, hiddenFields, staticFiltersGroupLabels);
  const appliedFilters = groupedFilters.flatMap(groupedFilters => groupedFilters.filters);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });
  return <AppliedFiltersDisplay displayableFilters={appliedFilters} cssClasses={cssClasses} {...otherProps}/>
};

export function AppliedFiltersDisplay ({
  labelText,
  displayableFilters,
  cssClasses = {}
}: AppliedFiltersDisplayProps): JSX.Element {

  function NlpFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    return (
      <div className={cssClasses.nlpFilter}>
        <span className={cssClasses.filterLabel}>{filter.label}</span>
      </div>
    );
  }
  
  function RemovableFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    const answersAction = useAnswersActions();
  
    const onRemoveFacetOption = () => {
      const { fieldId, matcher, value } = filter.filter;
      if (isNearFilterValue(value)) {
        console.error('A Filter with a NearFilterValue is not a supported RemovableFilter.');
        return;
      }
      answersAction.setFacetOption(fieldId, { matcher, value }, false);
      answersAction.executeVerticalQuery();
    }
  
    const onRemoveStaticFilterOption = () => {
      answersAction.setFilterOption({ ...filter.filter, selected: false });
      answersAction.executeVerticalQuery();
    }
  
    const onRemoveFilter = filter.filterType === 'FACET' ? onRemoveFacetOption : onRemoveStaticFilterOption;
  
    return (
      <div className={cssClasses.removableFilter}>
        <div className={cssClasses.filterLabel}>{filter.label}</div>
        <button className={cssClasses.removeFilterButton} onClick={onRemoveFilter}><CloseX className='text-blue-600'/></button>
      </div>
    );
  }

  return (
    <>
      { displayableFilters.length > 0 &&
        <div className={cssClasses.appliedFiltersContainer} aria-label={labelText}>
          {displayableFilters.map((filter: DisplayableFilter) => {
            const key = `${filter.filterType}-${filter.label}`;
            if (filter.filterType === 'NLP_FILTER') {
              return <NlpFilter filter={filter} key={key}/>
            }
            return <RemovableFilter filter={filter} key={key}/>
          })}
        </div>
      }
    </>
  )
}