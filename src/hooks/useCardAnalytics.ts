import {DirectAnswer as DirectAnswerData, DirectAnswerType, Result, useSearchState} from '@yext/search-headless-react';
import {useCallback} from 'react';
import {FeedbackType} from '../components/ThumbsFeedback';
import {DefaultRawDataType} from '../models/index';
import {useAnalytics} from './useAnalytics';
import {GdaClickEventData} from '../components/GenerativeDirectAnswer'

/**
 * Analytics event types for cta click, title click, and citation click.
 *
 * @public
 */
export type CardCtaEventType = 'CTA_CLICK' | 'TITLE' | 'CITATION_CLICK';

/**
 * The data types use to construct the payload in the analytics event.
 *
 * @public
 */
export type CardAnalyticsDataType<T = DefaultRawDataType> = DirectAnswerData | Result<T> | GdaClickEventData;

/**
 * Analytics event types for interactions on a card.
 *
 * @public
 */
export type CardAnalyticsType = CardCtaEventType | FeedbackType;

function isDirectAnswer(data: unknown): data is DirectAnswerData {
  return (data as DirectAnswerData)?.type === DirectAnswerType.FeaturedSnippet ||
    (data as DirectAnswerData)?.type === DirectAnswerType.FieldValue;
}

function isGenerativeDirectAnswer(data: unknown): data is GdaClickEventData {
  return !!(data as GdaClickEventData);
}

export function useCardAnalytics<T>(): (
  cardResult: CardAnalyticsDataType<T>, analyticsEventType: CardAnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useSearchState(state => state.vertical?.verticalKey);
  const queryId = useSearchState(state => state.query.queryId);
  const searchId = useSearchState(state => state.meta.uuid);
  const locale = useSearchState(state => state.meta.locale);
  const experienceKey = useSearchState(state => state.meta.experienceKey);

  const reportCtaEvent = useCallback((
    result: CardAnalyticsDataType<T>,
    eventType: CardCtaEventType
  ) => {
    let url: string | undefined, entityId: string | undefined;
    let directAnswer = false;
    let generativeDirectAnswer = false;
    if (isDirectAnswer(result)) {
      url = result.relatedResult.link;
      entityId = result.relatedResult.id;
      directAnswer = true;
    } else if (isGenerativeDirectAnswer(result)) {
      url = result.destinationUrl;
      entityId = result.searchResult?.id;
      directAnswer = true;
      generativeDirectAnswer = true;
    } else {
      url = result.link;
      entityId = result.id;
    }

    if (!queryId) {
      console.error('Unable to report a CTA event. Missing field: queryId.');
      return;
    }
    if (!experienceKey) {
      console.error('Unable to report a vertical view all event. Missing field: experienceKey.');
      return;
    }
    analytics?.report({
      action: eventType,
      destinationUrl: url,
      entity: entityId,
      locale,
      search: {
        searchId,
        queryId,
        ...verticalKey &&  {verticalKey: verticalKey},
        isDirectAnswer: directAnswer,
        isGenerativeDirectAnswer: generativeDirectAnswer,
        experienceKey,
      },
    });
  }, [analytics, queryId, verticalKey]);

  const reportFeedbackEvent = useCallback((
    result: CardAnalyticsDataType<T>,
    feedbackType: FeedbackType
  ) => {
    if (!queryId) {
      console.error('Unable to report a result feedback event. Missing field: queryId.');
      return;
    }
    if (!experienceKey) {
      console.error('Unable to report a vertical view all event. Missing field: experienceKey.');
      return;
    }
    let directAnswer = false;
    let generativeDirectAnswer = false;
    let entityId: string | undefined;
    if (isDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.relatedResult.id;
    } else if (isGenerativeDirectAnswer(result)) {
      directAnswer = true;
      generativeDirectAnswer = true;
      entityId = result.searchResult?.id;
    } else {
      entityId = result.id;
    }
    analytics?.report({
      action: feedbackType,
      entity: entityId,
      locale,
      search: {
        searchId,
        queryId,
        verticalKey,
        isDirectAnswer: directAnswer,
        isGenerativeDirectAnswer: generativeDirectAnswer,
        experienceKey
      },
    });
  }, [analytics, queryId, verticalKey]);

  return useCallback((
      cardResult: CardAnalyticsDataType<T>,
      analyticsEventType: CardAnalyticsType
  ) => {
    if (!analytics) {
      return;
    }
    if (analyticsEventType === 'TITLE' || analyticsEventType === 'CTA_CLICK' || analyticsEventType === 'CITATION_CLICK') {
      reportCtaEvent(cardResult, analyticsEventType);
    }
    if (analyticsEventType === 'THUMBS_DOWN' || analyticsEventType === 'THUMBS_UP') {
      reportFeedbackEvent(cardResult, analyticsEventType);
    }
  }, [analytics, reportCtaEvent, reportFeedbackEvent]);
}
