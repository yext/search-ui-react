import { useCallback, useEffect, useRef, useState } from 'react';
import RecentSearches, { ISearch } from 'recent-searches';

export function useRecentSearches(
  recentSearchesLimit: number,
  isVertical: boolean,
  verticalKey: string | null
): [
    ISearch[]|undefined,
    (input: string) => void,
    () => void,
    (isVertical: boolean, verticalKey: string | null) => void
  ] {
  const recentSearchesLimitRef = useRef(recentSearchesLimit);
  const [ recentSearchesKey, setRecentSearchesKey ] = useState(getRecentSearchesKey(isVertical, verticalKey));
  const [ recentSearches, setRecentSeaches ] = useState<RecentSearches>(
    new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    })
  );

  const updateRecentSearchesKey = useCallback((isVertical: boolean, verticalKey: string | null) => {
    const newRecentSearchesKey = getRecentSearchesKey(isVertical, verticalKey);
    if (recentSearchesKey !== newRecentSearchesKey) {
      setRecentSearchesKey(newRecentSearchesKey);
      const newRecentSearchObj = new RecentSearches({
        limit: recentSearchesLimit,
        namespace: newRecentSearchesKey
      });
      setRecentSeaches(newRecentSearchObj);
    }
  }, [recentSearchesKey, recentSearchesLimit]);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(recentSearchesKey);
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
    localStorage.removeItem(recentSearchesKey);
  }, [recentSearchesKey, recentSearchesLimit]);

  const setRecentSearch = useCallback((input: string) => {
    recentSearches.setRecentSearch(input);
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

  return [recentSearches?.getRecentSearches(), setRecentSearch, clearRecentSearches, updateRecentSearchesKey];
}

function getRecentSearchesKey(isVertical: boolean, verticalKey: string|null): string {
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