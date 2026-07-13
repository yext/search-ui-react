import { useTranslation } from 'react-i18next';
import {
  GenerativeDirectAnswerResponse,
  useSearchActions,
  useSearchState,
  SearchTypeEnum,
  Result
} from '@yext/search-headless-react';
import { useCardFeedbackCallback, useComposedCssClasses } from '../hooks';
import { useCardAnalytics } from '../hooks/useCardAnalytics';
import { DefaultRawDataType } from '../models/index';
import { executeGenerativeDirectAnswer } from '../utils/search-operations';
import { AISignpostIcon } from '../icons/AISignpostIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { Markdown, MarkdownCssClasses } from './Markdown';
import { useId } from '../hooks/useId';
import { twMerge } from '../hooks/useComposedCssClasses';
import {
  ThumbsFeedback,
  ThumbsFeedbackCssClasses,
  builtInCssClasses as thumbsFeedbackCssClasses
} from './ThumbsFeedback';
import React, { useCallback, useMemo, useRef } from 'react';

/**
 * The CSS class interface used for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export interface GenerativeDirectAnswerCssClasses extends ThumbsFeedbackCssClasses {
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
  citationSnippet: 'line-clamp-2 text-ellipsis break-words',
  thumbsFeedbackContainer: thumbsFeedbackCssClasses.thumbsFeedbackContainer,
  thumbsUpIcon: thumbsFeedbackCssClasses.thumbsUpIcon,
  thumbsDownIcon: thumbsFeedbackCssClasses.thumbsDownIcon
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
  answerHeader?: string | React.JSX.Element,
  /** Whether to hide the AI signpost for the generative direct answer. */
  hideAISignpost?: boolean,
  /** Whether to show thumbs up/down buttons to provide feedback on the generative direct answer. */
  showFeedbackButtons?: boolean,
  /** The props to pass to the AI signpost component. */
  aiSignpostProps?: AISignpostProps,
  /** The header for the citations section of the generative direct answer. */
  citationsHeader?: string | React.JSX.Element,
  /**
   * The citations container component for customizing the logic that determines which results
   * can be rendered.
   * By default, a section for citations is displayed if the results that correspond to the
   * citations have the default minimum required info, which is `rawData.uid` and `rawData.name`.
  */
  CitationsContainer?: (props: CitationsProps) => React.JSX.Element | null,
  /** The citation card component for customizing how each citation is displayed. */
  CitationCard?: (props: CitationProps) => React.JSX.Element | null
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
  hideAISignpost = false,
  showFeedbackButtons = false,
  aiSignpostProps,
  citationsHeader,
  CitationCard,
  CitationsContainer = Citations,
}: GenerativeDirectAnswerProps): React.JSX.Element | null {
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
  const handleClickFeedbackButton = useCardFeedbackCallback({
    destinationUrl: gdaResponse?.directAnswer ?? ''
  });

  React.useEffect(() => {
    if (!searchResults?.length || !searchId || searchResults === lastExecutedSearchResults.current) {
      return;
    }
    executeGenerativeDirectAnswer(searchActions);
    lastExecutedSearchResults.current = searchResults;
  }, [searchActions, searchResults, searchId]);

  if (!searchResults?.length || isLoading || !gdaResponse || gdaResponse.resultStatus !== 'SUCCESS') {
    return null;
  }

  return (
    <div className={cssClasses.container}>
      <Answer
        gdaResponse={gdaResponse}
        cssClasses={cssClasses}
        answerHeader={answerHeader}
        hideAISignpost={hideAISignpost}
        aiSignpostProps={aiSignpostProps}
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
      {showFeedbackButtons && <ThumbsFeedback
        onClick={handleClickFeedbackButton}
        customCssClasses={cssClasses}
      />}
    </div>
  );
}

interface AnswerProps {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  answerHeader?: string | React.JSX.Element,
  hideAISignpost: boolean,
  aiSignpostProps?: AISignpostProps,
  linkClickHandler?: (data: GdaClickEventData) => void
}

/**
 * Props for the built-in AI signpost component.
 *
 * @public
 */
export interface AISignpostProps {
  /** Icon displayed before the signpost label. Defaults to the SDK's AI signpost icon. */
  icon?: React.JSX.Element,
  /** Label displayed in the signpost button. */
  label?: string,
  /** Header displayed in the signpost popover. Defaults to "AI-Generated Content". */
  popoverHeader?: string,
  /** Body displayed in the signpost popover. */
  popoverBody?: string
}

/**
 * Displays AI signpost content for the generative direct answer.
 */
function AISignpost({
  icon,
  label,
  popoverHeader,
  popoverBody
}: AISignpostProps): React.JSX.Element {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverId = useId('ai-signpost-popover');
  const popoverHeaderId = useId('ai-signpost-popover-header');
  const popoverDescriptionId = useId('ai-signpost-popover-description');
  const ariaLabel = label ?? t('aiGeneratedAnswerSignpostLabel');
  const handleSignpostClick = useCallback(() => {
    setIsOpen(current => !current);
  }, []);
  const onSignpostClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className='relative text-sm text-gray-700'>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-label={ariaLabel}
        className='inline-flex gap-1.5 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-1.5 h-8 min-w-8 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-100'
        onClick={handleSignpostClick}
      >
        {icon ?? <AISignpostIcon className='h-4 w-4' />}
        {label && <span>{label}</span>}
      </button>
      {isOpen && (
        <div
          id={popoverId}
          role='dialog'
          aria-labelledby={popoverHeaderId}
          aria-describedby={popoverDescriptionId}
          className='absolute left-0 top-full z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg'
        >
          <div className='flex flex-col px-4 py-3 gap-3'>
            <div className='flex items-center justify-between'>
              <div id={popoverHeaderId} className='text-sm font-semibold text-gray-900'>
                {popoverHeader ?? t('aiGeneratedAnswerSignpostPopoverHeader')}
              </div>
              <button
                type='button'
                className='inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                aria-label={t('dismiss')}
                onClick={onSignpostClose}
              >
                <CloseIcon className='h-3 w-3' />
              </button>
            </div>
            <div id={popoverDescriptionId} className='text-sm text-gray-700'>
              {popoverBody ?? t('aiGeneratedAnswerSignpostPopoverBody')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * The answer section of the Generative Direct Answer.
 */
function Answer(props: AnswerProps) {
  const {
    gdaResponse,
    cssClasses,
    answerHeader,
    hideAISignpost,
    aiSignpostProps,
    linkClickHandler
  } = props;
  const { t } = useTranslation();
  const markdownCssClasses: MarkdownCssClasses = useMemo(
    () => ({
      container: cssClasses.answerText,
    }),
    [cssClasses.answerText]
  );

  const handleMarkdownLinkClick = useCallback((destinationUrl?: string) => {
    if (destinationUrl) {
      linkClickHandler?.({ destinationUrl });
    }
  }, [linkClickHandler]);

  return <>
    <div className={twMerge(cssClasses.header, 'flex items-center gap-2')}>
      <div>{answerHeader ?? t('aiGeneratedAnswer')}</div>
      {!hideAISignpost && <AISignpost {...aiSignpostProps} />}
    </div>
    <Markdown
      content={gdaResponse.directAnswer}
      onLinkClick={handleMarkdownLinkClick}
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
  citationsHeader?: string | React.JSX.Element,
  /** The component for citation card */
  CitationCard?: (props: CitationProps) => React.JSX.Element | null,
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
    const citationIds = new Set(gdaResponse.citations);
    return searchResults.filter(result => {
      const { uid, name } = result.rawData ?? {};
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
      {citationResults.map((result, index) => (
        <CitationCard
          key={index}
          searchResult={result}
          cssClasses={cssClasses}
          citationClickHandler={citationClickHandler}
        />
      ))}
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
  const { name, description, answer, link } = searchResult.rawData ?? {};
  const citationTitle = String(name ?? '');
  const citationSnippet = String(description ?? answer ?? '');
  const citationUrl = typeof link === 'string' ? link : undefined;
  const handleCitationClick = useCallback(() => {
    if (citationUrl) {
      citationClickHandler?.({ searchResult, destinationUrl: citationUrl });
    }
  }, [citationClickHandler, citationUrl, searchResult]);

  return (
    <a
      className={cssClasses.citation}
      href={citationUrl}
      onClick={handleCitationClick}
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
