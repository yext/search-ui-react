import {
  DirectAnswer as DirectAnswerData,
  DirectAnswerType,
  FieldValueDirectAnswer,
  Result,
  useSearchState
} from '@yext/search-headless-react';
import { useCallback } from 'react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { DefaultRawDataType } from '../models/index';
import { useAnalytics } from './useAnalytics';
import { GdaClickEventData } from '../components/GenerativeDirectAnswer'

/**
 * Analytics event types for cta click, title click, and citation click.
 *
 * @public
 */
export type CardCtaEventType = 'CTA_CLICK' | 'TITLE_CLICK' | 'CITATION_CLICK' | 'DRIVING_DIRECTIONS' | 'VIEW_WEBSITE' | 'TAP_TO_CALL';

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
  return !!(data as GdaClickEventData)?.destinationUrl;
}

export function useCardAnalytics<T>(): (
  cardResult: CardAnalyticsDataType<T>, analyticsEventType: CardAnalyticsType
) => void {
  const analytics = useAnalytics();
  const verticalKey = useSearchState(state => state.vertical?.verticalKey);
  const queryId = useSearchState(state => state.query.queryId);

  const reportCtaEvent = useCallback((
    result: CardAnalyticsDataType<T>,
    eventType: CardCtaEventType
  ) => {
    let url: string | undefined, entityId: string | undefined, fieldName: string | undefined;
    let directAnswer = false;
    let generativeDirectAnswer = false;
    if (isDirectAnswer(result)) {
      url = result.relatedResult.link;
      entityId = result.relatedResult.id;
      fieldName = result.type === DirectAnswerType.FeaturedSnippet
        ? undefined
        : (result as FieldValueDirectAnswer).fieldName;
      directAnswer = true;
    } else if (isGenerativeDirectAnswer(result)) {
      url = result.destinationUrl;
      entityId = result.searchResult?.id;
      fieldName = 'gda-snippet';
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
    analytics?.report({
      type: eventType,
      entityId: entityId,
      searcher: verticalKey ? 'VERTICAL' : 'UNIVERSAL',
      queryId,
      verticalKey: verticalKey || '',
      url,
      fieldName,
      directAnswer,
      generativeDirectAnswer
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
    let directAnswer = false;
    let entityId: string | undefined;
    if (isDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.relatedResult.id;
    } else if (isGenerativeDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.searchResult?.id;
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
  }, [analytics, queryId, verticalKey]);

  const reportAnalyticsEvent = useCallback((
    cardResult: CardAnalyticsDataType<T>,
    analyticsEventType: CardAnalyticsType
  ) => {
    if (!analytics) {
      return;
    }
    if (analyticsEventType === 'TITLE_CLICK' || analyticsEventType === 'CTA_CLICK' || analyticsEventType === 'CITATION_CLICK' || analyticsEventType === 'DRIVING_DIRECTIONS' || analyticsEventType === 'VIEW_WEBSITE' || analyticsEventType === 'TAP_TO_CALL') {
      reportCtaEvent(cardResult, analyticsEventType);
    }
    if (analyticsEventType === 'THUMBS_DOWN' || analyticsEventType === 'THUMBS_UP') {
      reportFeedbackEvent(cardResult, analyticsEventType);
    }
  }, [analytics, reportCtaEvent, reportFeedbackEvent]);
  return reportAnalyticsEvent;
}