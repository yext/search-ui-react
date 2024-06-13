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
  citation: 'p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-100 flex flex-col grow-0 shrink-0 basis-64 text-sm text-neutral',
  citationTitle: 'font-bold',
  citationSnippet: 'line-clamp-2 text-ellipsis break-words'
};

/**
 * Props for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export interface GenerativeDirectAnswerProps<T> {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: GenerativeDirectAnswerCssClasses,
  /** The header for the answer portion of the generative direct answer. */
  answerHeader?: string | JSX.Element
  /** The header for the citations portion of the generative direct answer. */
  citationsHeader?: string | JSX.Element
}

/**
 * Displays the AI generated answer of a generative direct answer.
 *
 * @public
 *
 * @param props - {@link GenerativeDirectAnswerProps}
 * @returns A React element for the generative direct answer, or null if there is no generated answer
 */
export function GenerativeDirectAnswer<T>({
  customCssClasses,
  answerHeader,
  citationsHeader
}: GenerativeDirectAnswerProps<T>): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const isVertical = useSearchState(state => state.meta.searchType === SearchTypeEnum.Vertical);
  const isUniversal = useSearchState(state => state.meta.searchType === SearchTypeEnum.Universal);
  const universalResults = useSearchState(state => state.universal);
  const verticalResults = useSearchState(state => state.vertical);
  const searchId = useSearchState(state => state.meta.uuid);
  const searchTerm = useSearchState(state => state.query.mostRecentSearch);

  const searchResults: Result[] | undefined = React.useMemo(() => {
    if (universalResults) {
      return universalResults.verticals?.flatMap(v => v.results);
    } else if (verticalResults) {
      return verticalResults.results;
    }
  }, [universalResults, verticalResults]);

  const searchActions = useSearchActions();
  const gdaResponse = useSearchState(state => state?.generativeDirectAnswer?.response);
  const isLoading = useSearchState(state => state?.generativeDirectAnswer?.isLoading);
  
  React.useEffect(() => {
    if (searchId && searchTerm && ((isUniversal && universalResults) || (isVertical && verticalResults))) {
      executeGenerativeDirectAnswer(searchActions);
    }
  }, [isVertical, isUniversal, universalResults, verticalResults, searchId]);

  if (isLoading || !gdaResponse || gdaResponse.resultStatus !== 'SUCCESS') {
    return null;
  }  

  return (
    <div className={cssClasses.container}>
      {renderAnswer({ gdaResponse, cssClasses, answerHeader })}
      <div className={cssClasses.divider} />
      {renderCitations({ gdaResponse, cssClasses, citationsHeader, searchResults })}
    </div>
  );
}

interface AnswerProps<T> extends GenerativeDirectAnswerProps<T> {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  answerHeader: string | JSX.Element | undefined,
}

/**
 * Renders the answer section of the Generative Direct Answer.
 */
function renderAnswer<T>(props: AnswerProps<T>): JSX.Element {
  const { 
    gdaResponse, 
    cssClasses,
    answerHeader = 'AI Generated Answer',
  } = props;
  return <>
    <div className={cssClasses.header}>
      {answerHeader}
    </div>
    <ReactMarkdown className={cssClasses.answerText} children={gdaResponse.directAnswer} />
  </>;
}

interface CitationsProps<T> extends GenerativeDirectAnswerProps<T> {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  citationsHeader: string | JSX.Element | undefined,
  searchResults: Result[] | undefined
}

/**
 * Renders the generative direct answer text and citations.
 */
function renderCitations<T>(props: CitationsProps<T>): JSX.Element {
  const { 
    gdaResponse, 
    cssClasses,
    citationsHeader = `Sources (${gdaResponse.citations.length})`,
    searchResults
  } = props;
  return <>
    {gdaResponse.citations.length > 0 && searchResults && <>
      <div className={cssClasses.header}>
        {citationsHeader}
      </div>
      <div className={cssClasses.citationsContainer}>
        {gdaResponse.citations.map(
          citation => renderCitation(searchResults, citation, cssClasses))}
    </div></>}
  </>;
}

function renderCitation(searchResults: Result[], citation: string, cssClasses: GenerativeDirectAnswerCssClasses): JSX.Element | null {
  const rawResult: Result | undefined = searchResults.find(r => r.rawData.uid === citation)
  if (!rawResult) {
    return null;
  }

  return <div key={citation} className={cssClasses.citation}>
    <div className={cssClasses.citationTitle}>{rawResult.rawData.name}</div>
    <div className={cssClasses.citationSnippet}>{rawResult.rawData.description}</div>
  </div>;
}
