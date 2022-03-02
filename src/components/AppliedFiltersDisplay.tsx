import { CloseIcon } from '../icons/CloseIcon';
import { useAnswersActions, SelectableFilter as DisplayableFilter } from '@yext/answers-headless-react';
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
  const answersActions = useAnswersActions();

  const hasAppliedFilters = Object.values(displayableFilters)
    .some((filters: DisplayableFilter[] | undefined) => filters && filters.length > 0);
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

  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {displayableFilters.nlpFilters?.map(filter =>
        <NlpFilter filter={filter} key={filter.displayName} cssClasses={cssClasses}/>
      )}
      {displayableFilters.facets?.map(filter =>
        <RemovableFilter
          filter={filter}
          onRemoveFilter={onRemoveFacetOption}
          key={filter.displayName}
          cssClasses={cssClasses}
        />
      )}
      {displayableFilters.staticFilters?.map(filter =>
        <RemovableFilter
          filter={filter}
          onRemoveFilter={onRemoveStaticFilterOption}
          key={filter.displayName}
          cssClasses={cssClasses}
        />
      )}
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