import { useAnalytics } from './useAnalytics';
import { useAnswersState } from '@yext/answers-headless-react';

export function usePaginationAnalytics(): (
  newPage: number,
  currentPage: number,
  totalPageCount: number
) => void {
  const analytics = useAnalytics();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  const reportPaginateEvent = (newPage: number, currentPage: number, totalPageCount: number) => {
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
    analytics.report({
      type: 'PAGINATE',
      queryId: queryId,
      verticalKey: verticalKey,
      newPage,
      currentPage,
      totalPageCount
    });
  };
  return reportPaginateEvent;
}

