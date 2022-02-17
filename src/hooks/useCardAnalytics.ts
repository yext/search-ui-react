import { Result, useAnswersState } from '@yext/answers-headless-react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { useAnalytics } from './useAnalytics';

type CtaEventType = 'CTA_CLICK' | 'TITLE_CLICK';
type CardAnalyticsType = CtaEventType | FeedbackType;

export function useCardAnalytics(): (
  cardResult: Result, analyticsEventType: CardAnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  const reportCtaEvent = (result: Result, eventType: CtaEventType) => {
    const entityId = result.id;
    if (!queryId) {
      console.error('Unable to report a CTA event. Missing field: queryId.');
      return;
    }
    if (!entityId) {
      console.error('Unable to report a CTA event. Missing field: entityId.');
      return;
    }
    analytics?.report({
      type: eventType,
      entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId,
      verticalKey: verticalKey || '',
      url: result.link
    });
  };
  const reportFeedbackEvent = (result: Result, feedbackType: FeedbackType) => {
    if (!queryId) {
      console.error('Unable to report a result feedback event. Missing field: queryId.');
      return;
    }
    const entityId = result.id;
    analytics?.report({
      type: feedbackType,
      entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId: queryId,
      verticalKey: verticalKey || ''
    });
  };
  const reportAnalyticsEvent = (
    cardResult: Result,
    analyticsEventType: CardAnalyticsType
  ) => {
    if (!analytics) {
      return;
    }
    if (analyticsEventType === 'TITLE_CLICK' || analyticsEventType === 'CTA_CLICK') {
      reportCtaEvent(cardResult, analyticsEventType);
    }
    if (analyticsEventType === 'THUMBS_DOWN' || analyticsEventType === 'THUMBS_UP') {
      reportFeedbackEvent(cardResult, analyticsEventType);
    }
  };
  return reportAnalyticsEvent;
}