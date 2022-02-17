import { AnswersHeadless, UniversalLimit, VerticalResults as VerticalResultsModel } from '@yext/answers-headless-react';
import { useState } from 'react';
import useComponentMountStatus from './useComponentMountStatus';
import useDebouncedFunction from './useDebouncedFunction';

interface EntityPreviewsState {
  verticalResultsArray: VerticalResultsModel[],
  isLoading: boolean
}

type ExecuteEntityPreviewsQuery = (
  query: string,
  universalLimit: UniversalLimit,
  restrictVerticals: string[]
) => void;

/**
 * useEntityPreviews provides state surrounding the visual entities portion of visual autocomplete,
 * which performs debounced universal searches.
 *
 * @param entityPreviewSearcher the headless instance use as searcher for entity preview related queries
 * @param debounceTime the time in milliseconds to debounce the universal search request
 */
export function useEntityPreviews(
  entityPreviewSearcher: AnswersHeadless | undefined,
  debounceTime: number
): [ EntityPreviewsState, ExecuteEntityPreviewsQuery ] {
  const isMountedRef = useComponentMountStatus();
  const [verticalResultsArray, setVerticalResultsArray] = useState<VerticalResultsModel[]>([]);
  const debouncedUniversalSearch = useDebouncedFunction(async () => {
    if (!entityPreviewSearcher) {
      return;
    }
    await entityPreviewSearcher.executeUniversalQuery();
    /**
     * Avoid performing a React state update on an unmounted component
     * (e.g unmounted during async await)
     */
    if (!isMountedRef.current) {
      return;
    }
    const results = entityPreviewSearcher.state.universal.verticals || [];
    setVerticalResultsArray(results);
    setLoadingState(false);
  }, debounceTime);
  const [isLoading, setLoadingState] = useState<boolean>(false);

  function executeEntityPreviewsQuery(
    query: string,
    universalLimit: UniversalLimit,
    restrictVerticals: string[]
  ) {
    if (!entityPreviewSearcher) {
      return;
    }
    if (query === entityPreviewSearcher.state.query.input) {
      return;
    }
    setLoadingState(true);
    entityPreviewSearcher.setQuery(query);
    entityPreviewSearcher.setRestrictVerticals(restrictVerticals);
    entityPreviewSearcher.setUniversalLimit(universalLimit);
    debouncedUniversalSearch();
  }
  return [{ verticalResultsArray, isLoading }, executeEntityPreviewsQuery];
}