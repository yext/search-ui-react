import { useAnalytics } from './useAnalytics';
import { useSearchState } from '@yext/search-headless-react';

type SearchBarAnalyticsType = 'AUTO_COMPLETE_SELECTION' | 'SEARCH_CLEAR_BUTTON';

export function useSearchBarAnalytics(): (
  analyticsEventType: SearchBarAnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useSearchState(state => state.vertical.verticalKey);
  const queryId = useSearchState(state => state.query.queryId);
  const searchId = useSearchState(state => state.meta.uuid);
  const locale = useSearchState(state => state.meta.locale);
  const experienceKey = useSearchState(state => state.meta.experienceKey);
  const searchTerm = useSearchState(state => state.query.mostRecentSearch);

  const reportAutocompleteEvent = () => {
    if (!experienceKey) {
      console.error('Unable to report an autocomplete event. Missing field: experienceKey.');
      return;
    }
    analytics?.report({
      action: 'AUTO_COMPLETE_SELECTION',
      locale,
      searchId,
      queryId,
      verticalKey,
      experienceKey,
      searchTerm,
    });
  };
  const reportSearchClearEvent = () => {
    if (!experienceKey) {
      console.error('Unable to report a search clear event. Missing field: experienceKey.');
      return;
    }
    analytics?.report({
      action: 'SEARCH_CLEAR_BUTTON',
      locale,
      searchId,
      queryId,
      verticalKey,
      experienceKey,
      searchTerm,
    });
  };
  return (
    analyticsEventType: SearchBarAnalyticsType
  ) => {
    if (!analytics) {
      return;
    }
    analyticsEventType === 'AUTO_COMPLETE_SELECTION'
      ? reportAutocompleteEvent()
      : reportSearchClearEvent();
  };
}
