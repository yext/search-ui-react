import { CloseIcon } from '../icons/CloseIcon';
import {
  useAnswersActions,
  SelectableFilter as DisplayableFilter,
  useAnswersState,
  SearchTypeEnum
} from '@yext/answers-headless-react';
import { isNearFilterValue } from '../utils/filterutils';
import { AppliedFiltersCssClasses } from './AppliedFilters';
import { DisplayableHierarchicalFacet } from '../models/groupedFilters';
import { DEFAULT_HIERARCHICAL_DELIMITER } from './Filters/HierarchicalFacet';

/**
 * Properties for {@link AppliedFilters}.
 */
export interface AppliedFiltersDisplayProps {
  /** Filters that are applied to the search results from static filters and filter search. */
  staticFilters?: DisplayableFilter[],
  /** Filters that are applied to the search results from facets. */
  facets?: DisplayableFilter[],
  /** Filters that are applied to the search results from hierarchical facets. */
  hierarchicalFacets?: DisplayableHierarchicalFacet[],
  /** Filters that are applied to the search results from the backend's natural language processing. */
  nlpFilters?: DisplayableFilter[]
  /** {@inheritDoc Filters.HierarchicalFacetProps.delimiter} */
  hierarchicalFacetsDelimiter?: string,
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
  const {
    nlpFilters = [],
    staticFilters = [],
    facets = [],
    hierarchicalFacets = [],
    hierarchicalFacetsDelimiter = DEFAULT_HIERARCHICAL_DELIMITER,
    cssClasses = {}
  } = props;
  const answersActions = useAnswersActions();
  const isVertical = useAnswersState(state => state.meta.searchType) === SearchTypeEnum.Vertical;

  const hasAppliedFilters = (
    nlpFilters.length + staticFilters.length + facets.length + hierarchicalFacets.length) > 0;
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

  const onRemoveHierarchicalFacetOption = (filter: DisplayableHierarchicalFacet) => {
    const { fieldId, parentFacet, displayNameTokens, lastDisplayNameToken } = filter;
    const displayName = filter.displayName.trim();

    // Uncheck all descendant options in the hierarchy
    parentFacet.options.forEach(o => {
      if (!o.displayName.startsWith(displayName)) {
        return;
      }
      const otherDisplayNameTokens = o.displayName.split(hierarchicalFacetsDelimiter).map(t => t.trim());
      if (otherDisplayNameTokens.length <= displayNameTokens.length) {
        return;
      }
      if (lastDisplayNameToken !== otherDisplayNameTokens[displayNameTokens.length - 1]) {
        return;
      }
      answersActions.setFacetOption(fieldId, o, false);
    });

    answersActions.setOffset(0);
    answersActions.setFacetOption(fieldId, filter, false);
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

  const renderRemovableFilter =
    (onRemoveFilter: (filter: DisplayableFilter) => void) =>
      (filter: DisplayableFilter) =>
        <RemovableFilter
          displayName={filter.displayName ?? ''}
          onRemoveFilter={() => onRemoveFilter(filter)}
          key={filter.displayName}
          cssClasses={cssClasses}
        />;

  const hasRemovableFilters = (staticFilters.length + facets.length + hierarchicalFacets.length) > 0;
  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {nlpFilters.map(filter =>
        <NlpFilter filter={filter} key={filter.displayName} cssClasses={cssClasses} />
      )}
      {hierarchicalFacets.map(filter =>
        <RemovableFilter
          key={filter.lastDisplayNameToken}
          onRemoveFilter={() => onRemoveHierarchicalFacetOption(filter)}
          displayName={filter.lastDisplayNameToken}
          cssClasses={cssClasses}
        />
      )}
      {facets.map(renderRemovableFilter(onRemoveFacetOption))}
      {staticFilters.map(renderRemovableFilter(onRemoveStaticFilterOption))}
      {isVertical && hasRemovableFilters &&
        <button onClick={onClickClearAllButton} className={cssClasses.clearAllButton}>
          Clear All
        </button>
      }
    </div>
  );
}

function RemovableFilter({ onRemoveFilter, displayName, cssClasses }: {
  onRemoveFilter: () => void,
  displayName: string,
  cssClasses: AppliedFiltersCssClasses
}): JSX.Element {
  return (
    <div className={cssClasses.removableFilter}>
      <div className={cssClasses.filterLabel}>{displayName}</div>
      <button className={cssClasses.removeFilterButton} onClick={() => onRemoveFilter()}>
        <CloseIcon />
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