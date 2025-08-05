import { useTranslation } from 'react-i18next';
import {
  GenerativeDirectAnswerResponse,
  useSearchActions,
  useSearchState,
  SearchTypeEnum,
  Result
} from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks';
import { useCardAnalytics } from '../hooks/useCardAnalytics';
import { DefaultRawDataType } from '../models/index';
import { executeGenerativeDirectAnswer } from '../utils/search-operations';
import { Markdown, MarkdownCssClasses } from './Markdown';
import React, {useMemo, useRef} from 'react';

/**
 * The CSS class interface used for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export interface GenerativeDirectAnswerCssClasses {
  container?: string,
  header?: string,
  answerText?: string,
  divider?: string,
  citationsContainer?: string,
  citation?: string,
  citationTitle?: string,
  citationSnippet?: string
}

const builtInCssClasses: Readonly<GenerativeDirectAnswerCssClasses> = {
  container: 'p-6 border border-gray-200 rounded-lg shadow-sm',
  header: 'text-xl',
  answerText: 'mt-4 prose',
  divider: 'border-b border-gray-200 w-full pb-6 mb-6',
  citationsContainer: 'mt-4 flex overflow-x-auto gap-4',
  citation: 'p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-100 flex flex-col grow-0 shrink-0 basis-64 text-sm text-neutral overflow-x-auto cursor-pointer hover:border-indigo-500',
  citationTitle: 'font-bold',
  citationSnippet: 'line-clamp-2 text-ellipsis break-words'
};

/**
 * Props for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export interface GenerativeDirectAnswerProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: GenerativeDirectAnswerCssClasses,
  /** The header for the answer section of the generative direct answer. */
  answerHeader?: string | JSX.Element,
  /** The header for the citations section of the generative direct answer. */
  citationsHeader?: string | JSX.Element,
  /**
   * The citations container component for customizing the logic that determines which results can be rendered.
   * By default, a section for citations is displayed if the results that correspond to the
   * citations have the default minimum required info, which is `rawData.uid` and `rawData.name`.
  */
  CitationsContainer?: (props: CitationsProps) => JSX.Element | null
  /** The citation card component for customizing how each citation is displayed. */
  CitationCard?: (props: CitationProps) => JSX.Element | null
}

/**
 * Displays the AI generated answer of a generative direct answer.
 *
 * @public
 *
 * @param props - {@link GenerativeDirectAnswerProps}
 * @returns A React element for the generative direct answer, or null if there is no generated answer
 */
export function GenerativeDirectAnswer({
  customCssClasses,
  answerHeader,
  citationsHeader,
  CitationCard,
  CitationsContainer = Citations,
}: GenerativeDirectAnswerProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const isUniversal = useSearchState(state => state.meta.searchType) === SearchTypeEnum.Universal;
  const universalResults = useSearchState(state => state.universal);
  const verticalResults = useSearchState(state => state.vertical);
  const searchId = useSearchState(state => state.meta.uuid);

  const searchResults: Result[] | undefined = React.useMemo(() => {
    if (isUniversal) {
      return universalResults.verticals?.flatMap(v => v.results);
    } else {
      return verticalResults.results;
    }
  }, [isUniversal, universalResults, verticalResults]);

  const lastExecutedSearchResults = useRef(undefined as Result[] | undefined);
  const searchActions = useSearchActions();
  const gdaResponse = useSearchState(state => state.generativeDirectAnswer?.response);
  const isLoading = useSearchState(state => state.generativeDirectAnswer?.isLoading);
  const handleClickEvent = useReportClickEvent();

  React.useEffect(() => {
    if (!searchResults?.length || !searchId || searchResults === lastExecutedSearchResults.current) {
      return;
    }
    executeGenerativeDirectAnswer(searchActions);
    lastExecutedSearchResults.current = searchResults;
  }, [searchResults, searchId]);

  if (!searchResults?.length || isLoading || !gdaResponse || gdaResponse.resultStatus !== 'SUCCESS') {
    return null;
  }

  return (
    <div className={cssClasses.container}>
      <Answer
        gdaResponse={gdaResponse}
        cssClasses={cssClasses}
        answerHeader={answerHeader}
        linkClickHandler={handleClickEvent}
      />
      <CitationsContainer
        gdaResponse={gdaResponse}
        cssClasses={cssClasses}
        searchResults={searchResults}
        citationsHeader={citationsHeader}
        CitationCard={CitationCard}
        citationClickHandler={handleClickEvent}
      />
    </div>
  );
}

interface AnswerProps {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  answerHeader?: string | JSX.Element,
  linkClickHandler?: (data: GdaClickEventData) => void
}

/**
 * The answer section of the Generative Direct Answer.
 */
function Answer(props: AnswerProps) {
  const {
    gdaResponse,
    cssClasses,
    answerHeader,
    linkClickHandler
  } = props;
  const { t } = useTranslation();
  const markdownCssClasses: MarkdownCssClasses = useMemo(
    () => ({
      container: cssClasses.answerText,
    }),
    [cssClasses.answerText]
  );

  return <>
    <div className={cssClasses.header}>
      {answerHeader ?? t('aiGeneratedAnswer')}
    </div>
    <Markdown
      content={gdaResponse.directAnswer}
      onLinkClick={(destinationUrl) => destinationUrl && linkClickHandler?.({destinationUrl})}
      customCssClasses={markdownCssClasses}
    />
  </>;
}

/**
 * Props for citations component.
 *
 * @public
 */
export interface CitationsProps {
  /** Response object containing generative direct answer info. */
  gdaResponse: GenerativeDirectAnswerResponse,
  /** CSS classes for customizing the component styling. */
  cssClasses: GenerativeDirectAnswerCssClasses,
  /** Returned results relevant to the users' query to be used in Citations. */
  searchResults: Result[],
  /** The header for the citations section generative direct answer. */
  citationsHeader?: string | JSX.Element,
  /** The component for citation card */
  CitationCard?: (props: CitationProps) => JSX.Element | null,
  /** Handle onClick event for citation link. */
  citationClickHandler?: (data: GdaClickEventData) => void
}

/**
 * Displays the citations section of the Generative Direct Answer.
 */
function Citations(props: CitationsProps) {
  const {
    gdaResponse,
    cssClasses,
    searchResults,
    citationsHeader,
    CitationCard = Citation,
    citationClickHandler
  } = props;
  const { t } = useTranslation();
  const citationResults = React.useMemo(() => {
    // If an entity is returned by multiple different verticals, it will be present in
    // searchResults multiple times. We want to only show it once in the citations.
    let citationIds = new Set(gdaResponse.citations);
    return searchResults.filter(result => {
      const {uid, name} = result.rawData ?? {};
      const dataIsInvalid = !uid || !name || typeof name != 'string' || typeof uid != 'string';
      if (dataIsInvalid || !citationIds.has(uid)) {
        return false;
      }
      citationIds.delete(uid);
      return true;
    });
  }, [gdaResponse.citations, searchResults]);

  const count = citationResults.length;
  if (!count) {
    return null;
  }

  return <>
    <div className={cssClasses.divider} />
    <div className={cssClasses.header}>
      {citationsHeader ?? t('sources', { count })}
    </div>
    <div className={cssClasses.citationsContainer}>
      {citationResults.map((r, i) => <CitationCard key={i} searchResult={r} cssClasses={cssClasses} citationClickHandler={citationClickHandler}/>)}
    </div>
  </>;
}

/**
 * Props for citation card.
 *
 * @public
 */
export interface CitationProps {
  searchResult: Result,
  cssClasses: GenerativeDirectAnswerCssClasses,
  citationClickHandler?: (data: GdaClickEventData) => void
}

/**
 * Displays a citation card for the citations section of the Generative Direct Answer.
 */
function Citation(props: CitationProps) {
  const {
    searchResult,
    cssClasses,
    citationClickHandler
  } = props;
  const {name, description, answer, link} = searchResult.rawData ?? {};
  const citationTitle = String(name ?? '');
  const citationSnippet = String(description ?? answer ?? '');
  const citationUrl = typeof link === 'string' ? link : undefined;
  return (
    <a
      className={cssClasses.citation}
      href={citationUrl}
      onClick={() => citationUrl && citationClickHandler?.({searchResult, destinationUrl: citationUrl})}
    >
      <div className={cssClasses.citationTitle}>{citationTitle}</div>
      <div className={cssClasses.citationSnippet}>{citationSnippet}</div>
    </a>
  );
}

/**
 * Payload for click events fired on a generative direct answer card.
 *
 * @public
 */
export interface GdaClickEventData {
  searchResult?: Result,
  destinationUrl: string
}

function useReportClickEvent<T = DefaultRawDataType>(): (data: GdaClickEventData) => void {
  const reportAnalyticsEvent = useCardAnalytics<T>();
  return React.useCallback((data: GdaClickEventData) => {
    if (data.searchResult) {
      reportAnalyticsEvent(data, 'CITATION_CLICK');
    } else {
      reportAnalyticsEvent(data, 'CTA_CLICK');
    }
  }, [reportAnalyticsEvent]);
}
