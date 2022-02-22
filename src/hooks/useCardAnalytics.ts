import {
  DirectAnswer as DirectAnswerData,
  DirectAnswerType,
  FieldValueDirectAnswer,
  Result,
  useAnswersState
} from '@yext/answers-headless-react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { useAnalytics } from './useAnalytics';

type CardCtaEventType = 'CTA_CLICK' | 'TITLE_CLICK';
type CardAnalyticsType = CardCtaEventType | FeedbackType;

export function useCardAnalytics(): (
  cardResult: Result | DirectAnswerData, analyticsEventType: CardAnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  function isDirectAnswer(data: unknown): data is DirectAnswerData {
    return (data as DirectAnswerData)?.type === DirectAnswerType.FeaturedSnippet ||
      (data as DirectAnswerData)?.type === DirectAnswerType.FieldValue;
  }

  const reportCtaEvent = (result: DirectAnswerData | Result, eventType: CardCtaEventType) => {
    let url: string | undefined, entityId: string | undefined, fieldName: string | undefined;
    let directAnswer = false;
    if (isDirectAnswer(result)) {
      url = result.relatedResult.link;
      entityId = result.relatedResult.id;
      fieldName = result.type === DirectAnswerType.FeaturedSnippet
        ? undefined
        : (result as FieldValueDirectAnswer).fieldName;
      directAnswer = true;
    } else {
      url = result.link;
      entityId = result.id;
    }

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
      url,
      fieldName,
      directAnswer
    });
  };

  const reportFeedbackEvent = (result: DirectAnswerData | Result, feedbackType: FeedbackType) => {
    if (!queryId) {
      console.error('Unable to report a result feedback event. Missing field: queryId.');
      return;
    }
    let directAnswer = false;
    let entityId: string | undefined;
    if (isDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.relatedResult.id;
    } else {
      entityId = result.id;
    }
    analytics?.report({
      type: feedbackType,
      entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId,
      verticalKey: verticalKey || '',
      directAnswer
    });
  };

  const reportAnalyticsEvent = (
    cardResult: DirectAnswerData | Result,
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