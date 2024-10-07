import { 
  GenerativeDirectAnswerResponse, 
  useSearchActions, 
  useSearchState, 
  SearchTypeEnum,
  Result
} from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks';
import { executeGenerativeDirectAnswer } from '../utils/search-operations';
import ReactMarkdown from "react-markdown";
import React from 'react';

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
  answerText: 'mt-4',
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

  const searchActions = useSearchActions();
  const gdaResponse = useSearchState(state => state.generativeDirectAnswer?.response);
  const isLoading = useSearchState(state => state.generativeDirectAnswer?.isLoading);

  React.useEffect(() => {
    if (!searchResults?.length || !searchId) {
      return;
    }
    executeGenerativeDirectAnswer(searchActions);
  }, [searchResults, searchId]);

  if (!searchResults?.length || isLoading || !gdaResponse || gdaResponse.resultStatus !== 'SUCCESS') {
    return null;
  }

  return (
    <div className={cssClasses.container}>
      <Answer gdaResponse={gdaResponse} cssClasses={cssClasses} answerHeader={answerHeader}/>
      <CitationsContainer
        gdaResponse={gdaResponse}
        cssClasses={cssClasses}
        searchResults={searchResults}
        citationsHeader={citationsHeader}
        CitationCard={CitationCard}
      />
    </div>
  );
}

interface AnswerProps {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  answerHeader?: string | JSX.Element
}

/**
 * The answer section of the Generative Direct Answer.
 */
function Answer(props: AnswerProps) {
  const { 
    gdaResponse, 
    cssClasses,
    answerHeader = 'AI Generated Answer'
  } = props;
  return <>
    <div className={cssClasses.header}>
      {answerHeader}
    </div>
    <ReactMarkdown className={cssClasses.answerText} children={gdaResponse.directAnswer} />
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
  CitationCard?: (props: CitationProps) => JSX.Element | null
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
  } = props;
  const citationResults = React.useMemo(() => {
    return searchResults.filter(result => {
      const {uid, name} = result.rawData ?? {};
      if (!uid || typeof uid != 'string' || !name) {
        return false;
      }
      return gdaResponse.citations.includes(uid);
    })
  }, [gdaResponse.citations, searchResults]);

  if (!citationResults.length) {
    return null;
  }

  return <>
    <div className={cssClasses.divider} />
    <div className={cssClasses.header}>
      {citationsHeader ?? `Sources (${citationResults.length})`}
    </div>
    <div className={cssClasses.citationsContainer}>
      {citationResults.map((r, i) => <CitationCard key={i} searchResult={r} cssClasses={cssClasses}/>)}
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
  cssClasses: GenerativeDirectAnswerCssClasses
}

/**
 * Displays a citation card for the citations section of the Generative Direct Answer. 
 */
function Citation(props: CitationProps) {
  const {
    searchResult,
    cssClasses
  } = props;
  const {name, description, answer, link} = searchResult.rawData ?? {};
  return (
    <a className={cssClasses.citation} href={typeof link === 'string' ? link : undefined}>
      <div className={cssClasses.citationTitle}>{name}</div>
      <div className={cssClasses.citationSnippet}>{description ?? answer}</div>
    </a>
  );
}