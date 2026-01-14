import { DirectAnswer as DirectAnswerData, DirectAnswerType, Result, useSearchState } from '@yext/search-headless-react';
import { useCallback } from 'react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { DefaultRawDataType } from '../models/index';
import { useAnalytics } from './useAnalytics';
import { GdaClickEventData } from '../components/GenerativeDirectAnswer';
import { SearchAction } from '../models/SearchEventPayload';

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
  const searchId = useSearchState(state => state.meta.uuid);
  const locale = useSearchState(state => state.meta.locale);
  const experienceKey = useSearchState(state => state.meta.experienceKey);
  const searchTerm = useSearchState(state => state.query.mostRecentSearch);

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
    if (!searchId) {
      console.error('Unable to report a CTA event. Missing field: searchId.');
      return;
    }
    if (!experienceKey) {
      console.error('Unable to report a CTA event. Missing field: experienceKey.');
      return;
    }
    // convert the legacy card event type to the format the current reporter expects.
    const action: SearchAction = eventType === 'TITLE_CLICK'
      ? 'TITLE'
      : eventType === 'VIEW_WEBSITE'
        ? 'WEBSITE'
        : eventType;
    analytics?.report({
      action: action,
      destinationUrl: url,
      entity: entityId,
      locale,
      searchId,
      queryId,
      verticalKey: verticalKey || '',
      isDirectAnswer: directAnswer,
      isGenerativeDirectAnswer: generativeDirectAnswer,
      experienceKey,
      searchTerm,
    });
  }, [analytics, experienceKey, locale, queryId, searchId, searchTerm, verticalKey]);

  const reportFeedbackEvent = useCallback((
    result: CardAnalyticsDataType<T>,
    feedbackType: FeedbackType
  ) => {
    if (!queryId) {
      console.error('Unable to report a result feedback event. Missing field: queryId.');
      return;
    }
    if (!searchId) {
      console.error('Unable to report a result feedback event. Missing field: searchId.');
      return;
    }
    if (!experienceKey) {
      console.error('Unable to report a result feedback event. Missing field: experienceKey.');
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
      searchId,
      queryId,
      verticalKey: verticalKey || '',
      isDirectAnswer: directAnswer,
      isGenerativeDirectAnswer: generativeDirectAnswer,
      experienceKey,
      searchTerm
    });
  }, [analytics, experienceKey, locale, queryId, searchId, searchTerm, verticalKey]);

  return useCallback((
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
}
