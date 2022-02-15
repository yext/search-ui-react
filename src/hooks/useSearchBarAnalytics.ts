import { useAnalytics } from './useAnalytics';
import { useAnswersState } from '@yext/answers-headless-react';

type SearchBarAnalyticsType = 'AUTO_COMPLETE_SELECTION' | 'SEARCH_CLEAR_BUTTON';

export function useSearchBarAnalytics(): (
  analyticsEventType: SearchBarAnalyticsType,
  suggestedSearchText?: string
) => void {
  const analytics = useAnalytics();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  const reportAutocompleteEvent = (suggestedSearchText: string) => {
    analytics?.report({
      type: 'AUTO_COMPLETE_SELECTION',
      ...(queryId && { queryId }),
      suggestedSearchText
    });
  };
  const reportSearchClearEvent = () => {
    if (!queryId) {
      console.error('Unable to report a search clear event. Missing field: queryId.');
      return;
    }
    analytics?.report({
      type: 'SEARCH_CLEAR_BUTTON',
      queryId,
      verticalKey
    });
  };
  const reportAnalyticsEvent = (
    analyticsEventType: SearchBarAnalyticsType,
    suggestedSearchText?: string
  ) => {
    if (!analytics) {
      return;
    }
    analyticsEventType === 'AUTO_COMPLETE_SELECTION'
      ? reportAutocompleteEvent(suggestedSearchText || '')
      : reportSearchClearEvent();
  };
  return reportAnalyticsEvent;
}
