import { CloseIcon } from '../icons/CloseIcon';
import {
  useAnswersActions,
  SelectableFilter as DisplayableFilter,
  useAnswersState,
  SearchTypeEnum
} from '@yext/answers-headless-react';
import { isNearFilterValue } from '../utils/filterutils';
import { AppliedFiltersCssClasses } from './AppliedFilters';
import { GroupedFilters } from '../models/groupedFilters';

/**
 * Properties for {@link AppliedFilters}.
 */
export interface AppliedFiltersDisplayProps {
  /** Sets of categorized filters to construct the applied filter tags from. */
  displayableFilters: GroupedFilters,
  /** CSS classes for customizing the component styling. */
  cssClasses?: AppliedFiltersCssClasses
}

/**
 * A component that renders applied filters based on the provided GroupedFilters.
 *
 * @param props - {@link AppliedFiltersDisplayProps}
 * @returns A React element for the applied filters
 */
export function AppliedFiltersDisplay(props: AppliedFiltersDisplayProps): JSX.Element | null {
  const { displayableFilters, cssClasses = {} } = props;
  const { nlpFilters = [], staticFilters = [], facets = [] } = displayableFilters;
  const answersActions = useAnswersActions();
  const isVertical = useAnswersState(state => state.meta.searchType) === SearchTypeEnum.Vertical;

  const hasAppliedFilters = (nlpFilters.length + staticFilters.length + facets.length) > 0;
  if (!hasAppliedFilters) {
    return null;
  }

  const onRemoveFacetOption = (filter: DisplayableFilter) => {
    const { fieldId, matcher, value } = filter;
    if (isNearFilterValue(value)) {
      console.error('A Filter with a NearFilterValue is not a supported RemovableFilter.');
      return;
    }
    answersActions.setOffset(0);
    answersActions.setFacetOption(fieldId, { matcher, value }, false);
    answersActions.executeVerticalQuery();
  };

  const onRemoveStaticFilterOption = (filter: DisplayableFilter) => {
    answersActions.setOffset(0);
    answersActions.setFilterOption({ ...filter, selected: false });
    answersActions.executeVerticalQuery();
  };

  const onClickClearAllButton = () => {
    answersActions.setOffset(0);
    answersActions.resetFacets();
    answersActions.setStaticFilters([]);
    answersActions.executeVerticalQuery();
  };

  const hasRemovableFilters = (staticFilters.length + facets.length) > 0;
  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {nlpFilters.map(filter =>
        <NlpFilter filter={filter} key={filter.displayName} cssClasses={cssClasses}/>
      )}
      {facets.map(filter =>
        <RemovableFilter
          filter={filter}
          onRemoveFilter={onRemoveFacetOption}
          key={filter.displayName}
          cssClasses={cssClasses}
        />
      )}
      {staticFilters.map(filter =>
        <RemovableFilter
          filter={filter}
          onRemoveFilter={onRemoveStaticFilterOption}
          key={filter.displayName}
          cssClasses={cssClasses}
        />
      )}
      {isVertical && hasRemovableFilters &&
        <button onClick={onClickClearAllButton} className={cssClasses.clearAllButton}>
          Clear All
        </button>
      }
    </div>
  );
}

function RemovableFilter({ filter, onRemoveFilter, cssClasses }: {
  filter: DisplayableFilter,
  onRemoveFilter: (filter: DisplayableFilter) => void
  cssClasses: AppliedFiltersCssClasses
}): JSX.Element {
  return (
    <div className={cssClasses.removableFilter}>
      <div className={cssClasses.filterLabel}>{filter.displayName}</div>
      <button className={cssClasses.removeFilterButton} onClick={() => onRemoveFilter(filter)}>
        <CloseIcon/>
      </button>
    </div>
  );
}

function NlpFilter({ filter, cssClasses }: {
  filter: DisplayableFilter,
  cssClasses: AppliedFiltersCssClasses
}): JSX.Element {
  return (
    <div className={cssClasses.nlpFilter}>
      <span className={cssClasses.filterLabel}>{filter.displayName}</span>
    </div>
  );
}