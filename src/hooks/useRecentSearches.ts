import { useCallback, useEffect, useRef, useState } from 'react';
import RecentSearches, { ISearch } from 'recent-searches';

// export const RECENT_SEARCHES_KEY = '__yxt_recent_searches__';

export function useRecentSearches(
  recentSearchesLimit: number,
  verticalKey: string|null,
  isVertical: boolean
): [ISearch[]|undefined, (input: string) => void, () => void] {
  const recentSearchesKey = getRecentSearchesKey();
  const recentSearchesLimitRef = useRef(recentSearchesLimit);
  const [ recentSearches, setRecentSeaches ] = useState<RecentSearches>(
    new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    })
  );
  console.log(recentSearches.getRecentSearches());

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(recentSearchesKey);
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
    localStorage.removeItem(recentSearchesKey);
  }, [recentSearchesKey, recentSearchesLimit]);

  const setRecentSearch = useCallback((input: string) => {
    recentSearches?.setRecentSearch(input);
  }, [recentSearches]);

  useEffect(() => {
    if (recentSearchesLimit !== recentSearchesLimitRef.current) {
      setRecentSeaches(new RecentSearches({
        limit: recentSearchesLimit,
        namespace: recentSearchesKey
      }));
      recentSearchesLimitRef.current = recentSearchesLimit;
    }
  }, [recentSearchesKey, recentSearchesLimit]);

  function getRecentSearchesKey(): string {
    if (isVertical) {
      if (verticalKey) {
        return `__yxt_recent_searches_${verticalKey}__`;
      } else {
        console.error('No vertical key found on this vertical');
        return '';
      }
    } else {
      return '__yxt_recent_searches_universal__';
    }
  }
  return [recentSearches?.getRecentSearches(), setRecentSearch, clearRecentSearches];
}