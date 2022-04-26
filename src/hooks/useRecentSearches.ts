import { useCallback, useEffect, useRef, useState } from 'react';
import RecentSearches, { ISearch } from 'recent-searches';
const RecentSearchesHack = (RecentSearches as any).default;

export const RECENT_SEARCHES_KEY = '__yxt_recent_searches__';

export function useRecentSearches(
  recentSearchesLimit: number
): [ISearch[]|undefined, (input: string) => void, () => void] {
  const recentSearchesLimitRef = useRef(recentSearchesLimit);
  const [ recentSearches, setRecentSeaches ] = useState<RecentSearches>(
    new RecentSearchesHack({
      limit: recentSearchesLimit,
      namespace: RECENT_SEARCHES_KEY
    })
  );

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSeaches(new RecentSearchesHack({
      limit: recentSearchesLimit,
      namespace: RECENT_SEARCHES_KEY
    }));
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, [recentSearchesLimit]);

  const setRecentSearch = useCallback((input: string) => {
    recentSearches?.setRecentSearch(input);
  }, [recentSearches]);

  useEffect(() => {
    if (recentSearchesLimit !== recentSearchesLimitRef.current) {
      setRecentSeaches(new RecentSearchesHack({
        limit: recentSearchesLimit,
        namespace: RECENT_SEARCHES_KEY
      }));
      recentSearchesLimitRef.current = recentSearchesLimit;
    }
  }, [recentSearchesLimit]);

  return [recentSearches?.getRecentSearches(), setRecentSearch, clearRecentSearches];
}