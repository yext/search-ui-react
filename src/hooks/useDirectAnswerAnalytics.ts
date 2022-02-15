import { useAnswersState, DirectAnswerType, DirectAnswer as DirectAnswerModel, FieldValueDirectAnswer } from '@yext/answers-headless-react';
import { useAnalytics } from '../hooks';

export type FeedbackType = 'THUMBS_UP' | 'THUMBS_DOWN';
type AnalyticsType = FeedbackType | 'CTA_CLICK';

export function useDirectAnswersAnalytics(): (
  directAnswerResult: DirectAnswerModel,
  analyticsEventType: AnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  const reportCtaEvent = (directAnswerResult: DirectAnswerModel) => {
    const link = directAnswerResult.relatedResult.link;
    const entityId = directAnswerResult.relatedResult.id;
    const fieldName = directAnswerResult.type === DirectAnswerType.FeaturedSnippet
      ? undefined
      : (directAnswerResult as FieldValueDirectAnswer).fieldName;
    if (!queryId) {
      console.error('Unable to report a CTA event. Missing field: queryId.');
      return;
    }
    if (!entityId) {
      console.error('Unable to report a CTA event. Missing field: entityId.');
      return;
    }
    analytics?.report({
      type: 'CTA_CLICK',
      entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId,
      verticalKey: verticalKey || '',
      directAnswer: true,
      url: link,
      fieldName
    });
  };
  const reportFeedbackEvent = (directAnswerResult: DirectAnswerModel, feedbackType: FeedbackType) => {
    if (!queryId) {
      console.error('Unable to report a direct answer feedback event. Missing field: queryId.');
      return;
    }
    const entityId = directAnswerResult.relatedResult.id;
    analytics?.report({
      type: feedbackType,
      entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId: queryId,
      verticalKey: verticalKey || '',
      directAnswer: true,
    });
  };
  const reportAnalyticsEvent = (directAnswerResult: DirectAnswerModel, analyticsEventType: AnalyticsType) => {
    if (!analytics) {
      return;
    }
    analyticsEventType === 'CTA_CLICK'
      ? reportCtaEvent(directAnswerResult)
      : reportFeedbackEvent(directAnswerResult, analyticsEventType);
  };
  return reportAnalyticsEvent;
}