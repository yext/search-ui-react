import { CloseIcon } from '../icons/CloseIcon';
import { AppliedFiltersCssClasses } from './AppliedFilters';
import { useClearFiltersCallback } from '../hooks/useClearFiltersCallback';

/**
 * Properties for {@link AppliedFilters}.
 */
export interface AppliedFiltersDisplayProps {
  removableFilters?: {
    displayName: string,
    handleRemove: () => void
  }[],
  /**
   * The display values of filters that are applied to the search results
   * from the backend's natural language processing.
   */
  nlpFilters?: string[],
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
    removableFilters = [],
    cssClasses = {}
  } = props;
  const handleClickClearAllButton = useClearFiltersCallback();

  if (removableFilters.length + nlpFilters.length === 0) {
    return null;
  }

  return (
    <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
      {nlpFilters.map(displayName =>
        <NlpFilter displayName={displayName} key={displayName} cssClasses={cssClasses} />
      )}
      {removableFilters.map((filter, i) =>
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