import { CloseIcon } from '../icons/CloseIcon';
import { AppliedFiltersCssClasses } from './AppliedFilters';
import { useClearFiltersCallback } from '../hooks/useClearFiltersCallback';
import { Filter } from '@yext/search-headless-react';
import { isDuplicateFilter } from '../utils/filterutils';

/**
 * A representation of a filter that can be removed from the AppliedFilters component.
 *
 * @internal
 */
export interface RemovableFilter {
  displayName: string,
  handleRemove: () => void,
  filter: Filter
}

/**
 * Properties for {@link AppliedFilters}.
 *
 * @internal
 */
export interface AppliedFiltersDisplayProps {
  removableFilters?: RemovableFilter[],
  /**
   * The display values of filters that are applied to the search results
   * from the backend's natural language processing.
   */
  nlpFilterDisplayNames?: string[],
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
    nlpFilterDisplayNames = [],
    removableFilters = [],
    cssClasses = {}
  } = props;
  const handleClickClearAllButton = useClearFiltersCallback();

  if (removableFilters.length + nlpFilterDisplayNames.length === 0) {
    return null;
  }

  const dedupedRemovableFilters = getDedupedRemovableFilters(removableFilters);
  const dedupedNlpFilterDisplaynames = nlpFilterDisplayNames.filter(displayName => {
    return removableFilters.some(f => f.displayName === displayName);
  });

  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {dedupedNlpFilterDisplaynames.map(displayName =>
        <NlpFilter displayName={displayName} key={displayName} cssClasses={cssClasses} />
      )}
      {dedupedRemovableFilters.map((filter, i) =>
        <RemovableFilter
          displayName={filter.displayName}
          handleRemove={filter.handleRemove}
          key={`${filter.displayName}-${i}`}
          cssClasses={cssClasses}
        />
      )}
      {removableFilters.length > 0 &&
        <button onClick={handleClickClearAllButton} className={cssClasses.clearAllButton}>
          Clear All
        </button>
      }
    </div>
  );
}

function getDedupedRemovableFilters(filters: RemovableFilter[]) {
  const dedupedFilters: RemovableFilter[] = [];
  for (const f of filters) {
    if (!dedupedFilters.some(d => isDuplicateFilter(d.filter, f.filter))) {
      dedupedFilters.push(f);
    }
  }
  return dedupedFilters;
}

function RemovableFilter({ displayName, handleRemove, cssClasses }: {
  displayName: string | undefined,
  handleRemove: () => void,
  cssClasses: AppliedFiltersCssClasses
}): JSX.Element {
  return (
    <div className={cssClasses.removableFilter}>
      <div className={cssClasses.filterLabel}>{displayName}</div>
      <button
        className='w-2 h-2 text-neutral m-1.5'
        onClick={handleRemove}
        aria-label={`Remove "${displayName}" filter`}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function NlpFilter({ displayName, cssClasses }: {
  displayName: string | undefined,
  cssClasses: AppliedFiltersCssClasses
}): JSX.Element {
  return (
    <div className={cssClasses.nlpFilter}>
      <span className={cssClasses.filterLabel}>{displayName}</span>
    </div>
  );
}