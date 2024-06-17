import { 
  GenerativeDirectAnswerResponse, 
  useSearchActions, 
  useSearchState, 
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
  /** The header for the answer section of the generative direct answer. */
  answerHeader?: string | JSX.Element
  /** The header for the citations section of the generative direct answer. */
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

  const universalResults = useSearchState(state => state.universal);
  const verticalResults = useSearchState(state => state.vertical);

  const searchResults: Result[] | undefined = React.useMemo(() => {
    if (universalResults) {
      return universalResults.verticals?.flatMap(v => v.results);
    } else if (verticalResults) {
      return verticalResults.results;
    }
  }, [universalResults, verticalResults]);

  const searchActions = useSearchActions();
  const gdaResponse = useSearchState(state => state.generativeDirectAnswer?.response);
  const isLoading = useSearchState(state => state.generativeDirectAnswer?.isLoading);
  
  React.useEffect(() => {
    if (!searchResults?.length) {
      return;
    }
    executeGenerativeDirectAnswer(searchActions);
  }, [searchResults]);

  if (!searchResults?.length || isLoading || !gdaResponse || gdaResponse.resultStatus !== 'SUCCESS') {
    return null;
  }  

  return (
    <div className={cssClasses.container}>
      <Answer gdaResponse={gdaResponse} cssClasses={cssClasses} answerHeader={answerHeader}/>
      <div className={cssClasses.divider} />
      <Citations gdaResponse={gdaResponse} cssClasses={cssClasses} citationsHeader={citationsHeader} searchResults={searchResults}/>
    </div>
  );
}

interface AnswerProps<T> extends GenerativeDirectAnswerProps<T> {
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerCssClasses,
  answerHeader?: string | JSX.Element,
}

/**
 * The answer section of the Generative Direct Answer.
 */
function Answer<T>(props: AnswerProps<T>) {
  const { 
    gdaResponse, 
    cssClasses,
    answerHeader,
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
  citationsHeader?: string | JSX.Element,
  searchResults: Result[]
}

/**
 * The citations section of the Generative Direct Answer.
 */
function Citations<T>(props: CitationsProps<T>) {
  const { 
    gdaResponse, 
    cssClasses,
    citationsHeader,
    searchResults
  } = props;
  if (!gdaResponse.citations.length) {
    return null;
  }
  return <>
    <div className={cssClasses.header}>
      {citationsHeader}
    </div>
    <div className={cssClasses.citationsContainer}>
      {gdaResponse.citations.map(
        citation => Citation(searchResults, citation, cssClasses))}
    </div>
  </>;
}

function Citation(searchResults: Result[], citation: string, cssClasses: GenerativeDirectAnswerCssClasses) {
  const rawResult: Result | undefined = searchResults.find(r => r.rawData.uid === citation)
  if (!rawResult) {
    return null;
  }

  return <div key={citation} className={cssClasses.citation}>
    <div className={cssClasses.citationTitle}>{rawResult.rawData.name}</div>
    <div className={cssClasses.citationSnippet}>{rawResult.rawData.description}</div>
  </div>;
}
