import {useAnalytics} from './useAnalytics';
import {useSearchState} from '@yext/search-headless-react';

export function usePaginationAnalytics(): () => void {
  const analytics = useAnalytics();
  const verticalKey = useSearchState(state => state.vertical.verticalKey);
  const queryId = useSearchState(state => state.query.queryId);
  const searchId = useSearchState(state => state.meta.uuid);
  const locale = useSearchState(state => state.meta.locale);
  const experienceKey = useSearchState(state => state.meta.experienceKey);

  return () => {
    if (!analytics) {
      return;
    }
    if (!queryId) {
      console.error('Unable to report a pagination event. Missing field: queryId.');
      return;
    }
    if (!verticalKey) {
      console.error('Unable to report a pagination event. Missing field: verticalKey.');
      return;
    }
    if (!experienceKey) {
      console.error('Unable to report a pagination event. Missing field: experienceKey.');
      return;
    }
    analytics?.report({
      action: 'PAGINATE',
      locale,
      search: {
        searchId,
        queryId,
        verticalKey: verticalKey,
        experienceKey,
      },
    });
  };
}

