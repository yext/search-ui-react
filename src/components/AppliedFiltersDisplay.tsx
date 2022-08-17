import { CloseIcon } from '../icons/CloseIcon';
import { AppliedFiltersCssClasses } from './AppliedFilters';
import { useClearFiltersCallback } from '../hooks/useClearFiltersCallback';
import { FieldValueFilter, useSearchActions } from '@yext/search-headless-react';
import { isDuplicateFieldValueFilter } from '../utils/filterutils';
import { executeSearch } from '../utils/search-operations';

/**
 * A representation of a filter that can be removed from the AppliedFilters component.
 *
 * @internal
 */
export interface RemovableFilter {
  displayName: string,
  handleRemove: () => void,
  filter: FieldValueFilter
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
  const searchActions = useSearchActions();

  if (removableFilters.length + nlpFilterDisplayNames.length === 0) {
    return null;
  }

  const dedupedNlpFilterDisplayNames = nlpFilterDisplayNames.filter(displayName => {
    return !removableFilters.some(f => f.displayName === displayName);
  });

  const dedupedRemovableFilters = getDedupedRemovableFilters(removableFilters);

  function handleRemoveDedupedFilter(dedupedFilter: DedupedRemovableFilter) {
    dedupedFilter.handleRemove();
    for (const f of dedupedFilter.duplicates ?? []) {
      f.handleRemove();
    }
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }

  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {dedupedNlpFilterDisplayNames.map((displayName, i) => renderNlpFilter(displayName, i, cssClasses))}
      {dedupedRemovableFilters.map((f, i) => {
        return renderRemovableFilter(f.displayName, () => handleRemoveDedupedFilter(f), i, cssClasses);
      })}
      {removableFilters.length > 0 &&
        <button onClick={handleClickClearAllButton} className={cssClasses.clearAllButton}>
          Clear All
        </button>
      }
    </div>
  );
}

interface DedupedRemovableFilter extends RemovableFilter {
  duplicates?: RemovableFilter[]
}

function getDedupedRemovableFilters(filters: RemovableFilter[]) {
  const dedupedFilters: DedupedRemovableFilter[] = [];
  for (const f of filters) {
    const preexistingDupe = dedupedFilters.find(d => isDuplicateFieldValueFilter(d.filter, f.filter));
    if (!preexistingDupe) {
      dedupedFilters.push(f);
    } else {
      if (!preexistingDupe.duplicates) {
        preexistingDupe.duplicates = [f];
      } else {
        preexistingDupe.duplicates.push(f);
      }
    }
  }
  return dedupedFilters;
}

function renderRemovableFilter(
  displayName: string | undefined,
  handleRemove: () => void,
  index: number,
  cssClasses: AppliedFiltersCssClasses
): JSX.Element {
  return (
    <div className={cssClasses.removableFilter} key={`${displayName}-${index}`}>
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

function renderNlpFilter(
  displayName: string | undefined,
  index: number,
  cssClasses: AppliedFiltersCssClasses
): JSX.Element {
  return (
    <div className={cssClasses.nlpFilter} key={`${displayName}-${index}`}>
      <span className={cssClasses.filterLabel}>{displayName}</span>
    </div>
  );
}
