import { useCallback, useEffect, useState } from 'react';
import RecentSearches, { ISearch } from "recent-searches";

export const RECENT_SEARCHES_KEY = '__yxt_recent_searches__'

export default function useRecentSearches(
  recentSearchesLimit: number
): [ISearch[]|undefined, (input: string) => void, () => void] {
  const [ recentSearches, setRecentSeaches ] = useState<RecentSearches>();

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: RECENT_SEARCHES_KEY 
    }));
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, [recentSearchesLimit]);

  const setRecentSearch = (input: string) => {
    recentSearches?.setRecentSearch(input);
  }
  
  useEffect(() => {
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: RECENT_SEARCHES_KEY 
    }));
  }, [recentSearchesLimit]);

  return [recentSearches?.getRecentSearches(), setRecentSearch, clearRecentSearches];
}