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
 * The CSS class interface used for {@link GenerativeDirectAnswerDisplay}.
 *
 * @public
 */
export interface GenerativeDirectAnswerDisplayCssClasses {
  generativeDirectAnswerTitle?: string,
  generativeDirectAnswerText: string,
  generativeDirectAnswerDivider: string,
  generativeDirectAnswerContainer?: string,
  generativeDirectAnswerCitations: string,
  generativeDirectAnswerCitation?: string,
  generativeDirectAnswerCitationTitle?: string,
  generativeDirectAnswerCitationSnippet?: string,
}

const builtInCssClasses: Readonly<GenerativeDirectAnswerDisplayCssClasses> = {
  generativeDirectAnswerTitle: 'text-xl',
  generativeDirectAnswerText: 'mt-4',
  generativeDirectAnswerDivider: 'border-b border-gray-200 w-full pb-6 mb-6',
  generativeDirectAnswerContainer: 'p-6 border border-gray-200 rounded-lg shadow-sm',
  generativeDirectAnswerCitations: 'mt-4 flex overflow-x-auto gap-4',
  generativeDirectAnswerCitation: 'p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-100 flex flex-col basis-64 text-sm text-neutral',
  generativeDirectAnswerCitationTitle: 'font-bold',
  generativeDirectAnswerCitationSnippet: 'line-clamp-2 text-ellipsis break-words',
};

/**
 * Props for {@link GenerativeDirectAnswerDisplay}.
 *
 * @public
 */
export interface GenerativeDirectAnswerDisplayProps<T> {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: GenerativeDirectAnswerDisplayCssClasses
}

/**
 * Displays the AI generated answer of a generative direct answer.
 *
 * @public
 *
 * @param props - {@link GenerativeDirectAnswerDisplayProps}
 * @returns A React element for the generative direct answer display, or null if there is no generated answer
 */
export function GenerativeDirectAnswerDisplay<T>({
  customCssClasses
}: GenerativeDirectAnswerDisplayProps<T>): JSX.Element | null {
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
    <div className={cssClasses.generativeDirectAnswerContainer}>
      {renderGenerativeDirectAnswer({ searchResults, gdaResponse, cssClasses })}
    </div>
  );
}

interface GenerativeDirectAnswerProps<T> extends GenerativeDirectAnswerDisplayProps<T> {
  searchResults: Result[] | undefined,
  gdaResponse: GenerativeDirectAnswerResponse,
  cssClasses: GenerativeDirectAnswerDisplayCssClasses
}

/**
 * Renders the generative direct answer text and citations.
 */
function renderGenerativeDirectAnswer<T>(props: GenerativeDirectAnswerProps<T>): JSX.Element {
  const { searchResults, gdaResponse, cssClasses } = props;
  return <>
    <div className={cssClasses.generativeDirectAnswerTitle}>
      {'AI Generated Answer'}
    </div>
    <ReactMarkdown className={cssClasses.generativeDirectAnswerText} children={gdaResponse.directAnswer} />
    <div className={cssClasses.generativeDirectAnswerDivider} />
    {gdaResponse.citations.length > 0 && searchResults && <>
      <div className={cssClasses.generativeDirectAnswerTitle}>
        {'Citations'}
      </div>
      <div className={cssClasses.generativeDirectAnswerCitations}>
        {gdaResponse.citations.map(
          citation => renderCitation(searchResults, citation, cssClasses))}
    </div></>}
  </>;
}

function renderCitation(searchResults: Result[], citation: string, cssClasses: GenerativeDirectAnswerDisplayCssClasses): JSX.Element | null {
  const rawResult: Result | undefined = searchResults.find(r => r.rawData.uid === citation)
  if (!rawResult) {
    return null;
  }

  return <div key={citation} className={cssClasses.generativeDirectAnswerCitation}>
    <div className={cssClasses.generativeDirectAnswerCitationTitle}>{rawResult.rawData.name}</div>
    <div className={cssClasses.generativeDirectAnswerCitationSnippet}>{rawResult.rawData.description}</div>
  </div>;
}
