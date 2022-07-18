import { useCallback, useState } from 'react';
import RecentSearches, { ISearch } from 'recent-searches';

export function useRecentSearches(
  recentSearchesLimit: number,
  verticalKey: string|null,
  isVertical: boolean
): [ISearch[]|undefined, (input: string, verticalKey: string|null, isVertical: boolean) => void, () => void] {
  const [recentSearches, setRecentSeaches] = useState<{ [key: string]: RecentSearches }>({});
  const [recentVerticalKeys, setRecentVerticalsKeys] = useState<string[]>([]);
  const clearRecentSearches = useCallback(() => {
    setRecentSeaches({});
    for (const verticalKey in recentVerticalKeys){
      localStorage.removeItem(verticalKey);
    }
  }, [recentVerticalKeys]);

  const setRecentSearch = useCallback((input: string, verticalKey: string|null, isVertical: boolean) => {
    const recentSearchesKey = getRecentSearchesKey(verticalKey, isVertical);
    if (recentVerticalKeys && recentSearches) {
      if (recentSearchesKey in recentVerticalKeys) {
        recentSearches[recentSearchesKey].setRecentSearch(input);
      } else {
        const recentSearchesKey = getRecentSearchesKey(verticalKey, isVertical);
        const newRecentVerticalKeys = recentVerticalKeys.concat(recentSearchesKey);
        setRecentVerticalsKeys(newRecentVerticalKeys);
        setRecentSeaches({
          [recentSearchesKey]: new RecentSearches({
            limit: recentSearchesLimit,
            namespace: recentSearchesKey
          }),
          ...recentSearches
        });
        console.log(recentSearches[recentSearchesKey]);
        recentSearches[recentSearchesKey].setRecentSearch(input);
      }
    }
  }, [recentSearches, recentSearchesLimit, recentVerticalKeys]);

  // useEffect(() => {
  //   if (recentSearchesLimit !== recentSearchesLimitRef.current) {
  //     setRecentSeaches(new RecentSearches({
  //       limit: recentSearchesLimit,
  //       namespace: recentSearchesKey
  //     }));
  //     recentSearchesLimitRef.current = recentSearchesLimit;
  //   }
  // }, [recentSearchesKey, recentSearchesLimit]);

  const recentSearchesKey = getRecentSearchesKey(verticalKey, isVertical);
  return [recentSearches[recentSearchesKey]?.getRecentSearches(), setRecentSearch, clearRecentSearches];
}

function getRecentSearchesKey(verticalKey: string|null, isVertical: boolean): string {
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