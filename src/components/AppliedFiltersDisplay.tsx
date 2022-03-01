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
export function AppliedFiltersDisplay(props: AppliedFiltersDisplayProps): JSX.Element {
  const { displayableFilters, cssClasses = {} } = props;
  const answersActions = useAnswersActions();
  function NlpFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    return (
      <div className={cssClasses.nlpFilter}>
        <span className={cssClasses.filterLabel}>{filter.displayName}</span>
      </div>
    );
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

  function RemovableFilter({ filter, onRemoveFilter }: {
    filter: DisplayableFilter,
    onRemoveFilter: (filter: DisplayableFilter) => void
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
  const hasAppliedFilters = Object.values(displayableFilters)
    .some((filters: DisplayableFilter[] | undefined) => filters && filters.length > 0);
  return (<>
    {hasAppliedFilters &&
      <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
        {displayableFilters.nlpFilters?.map(filter =>
          <NlpFilter filter={filter} key={filter.displayName}/>
        )}
        {displayableFilters.facets?.map(filter =>
          <RemovableFilter filter={filter} onRemoveFilter={onRemoveFacetOption} key={filter.displayName}/>
        )}
        {displayableFilters.staticFilters?.map(filter =>
          <RemovableFilter
            filter={filter}
            onRemoveFilter={onRemoveStaticFilterOption}
            key={filter.displayName}
          />
        )}
      </div>
    }
  </>);
}