import { CardComponent } from '../models/cardComponent';
import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import PageNavigationIcon from '../icons/ChevronIcon';
import { VerticalResultsDisplay } from './VerticalResultsDisplay';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * The CSS class interface used for {@link VerticalResults}.
 */
export interface VerticalResultsCssClasses extends PaginationCssClasses {
  /** Applies when the results are loading. */
  results___loading?: string
}

/**
 * Props for the VerticalResults component.
 */
export interface VerticalResultsProps {
  /** {@inheritDoc CardComponent} */
  CardComponent: CardComponent,
  /** Configuration passed to the {@link CardComponent}. */
  cardConfig?: Record<string, unknown>,
  /**
   * Whether or not all results should be displayed when there are none returned from the search.
   * Defaults to true.
   */
  displayAllOnNoResults?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: VerticalResultsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod,
  /** Whether to include pagination of the results. Defaults to true. */
  allowPagination?: boolean
}

/**
 * A component that renders search results for a vertical page.
 *
 * @param props - {@inheritDoc VerticalResultsProps}
 * @returns A React element for the results, or null if no results should be displayed
 */
export default function VerticalResults(props: VerticalResultsProps): JSX.Element | null {
  const { displayAllOnNoResults = true, allowPagination = true, ...otherProps } = props;
  const verticalResults = useAnswersState(state => state.vertical.results) || [];
  const allResultsForVertical =
    useAnswersState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  const verticalResultsCount = useAnswersState(state => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical =
    useAnswersState(state => state.vertical?.noResults?.allResultsForVertical.resultsCount) || 0;
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);

  let results = verticalResults;
  let resultsCount = verticalResultsCount;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
    resultsCount = allResultsCountForVertical;
  }

  return (
    <>
      <VerticalResultsDisplay results={results} isLoading={isLoading} {...otherProps}/>
      {allowPagination
        && <Pagination
          numResults={resultsCount}
          customCssClasses={otherProps.customCssClasses}
          cssCompositionMethod={otherProps.cssCompositionMethod}
        />
      }
    </>
  );
}

/**
 * The CSS classes used for pagination.
 */
export interface PaginationCssClasses {
  container?: string,
  labelContainer?: string,
  label?: string,
  selectedLabel?: string,
  leftIconContainer?: string,
  rightIconContainer?: string,
  icon?: string
}

const builtInPaginationCssClasses: PaginationCssClasses = {
  container: 'flex justify-center mb-4',
  labelContainer: 'inline-flex shadow-sm -space-x-px',
  label: 'z-0 inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 text-gray-500',
  selectedLabel: 'z-10 inline-flex items-center px-4 py-2 text-sm font-semibold border border-blue-600 text-blue-600 bg-blue-50',
  leftIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-l-md',
  rightIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-r-md',
  icon: 'w-3 text-gray-500'
};

interface PaginationProps {
  numResults: number,
  customCssClasses?: PaginationCssClasses,
  cssCompositionMethod?: CompositionMethod
}

/**
 * Renders a component that divide a series of results into chunks across multiple pages
 * and enable user to navigate between those pages.
 */
function Pagination(props: PaginationProps): JSX.Element | null {
  const { numResults, customCssClasses = {}, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(
    builtInPaginationCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const answersAction = useAnswersActions();
  const analytics = useAnalytics();
  const offset = useAnswersState(state => state.vertical.offset) || 0;
  const limit = useAnswersState(state => state.vertical.limit) || 10;
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);
  const queryId = useAnswersState(state => state.query.queryId);

  const maxPageCount = Math.ceil(numResults / limit);
  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = (offset / limit) + 1;
  const paginationLabels: string[] = generatePaginationLabels(pageNumber, maxPageCount);

  const reportPaginateEvent = (newPageNumber: number) => {
    if(!queryId) {
      console.error('Unable to report a pagination event. Missing field: queryId.');
      return;
    }
    if(!verticalKey) {
      console.error('Unable to report a pagination event. Missing field: verticalKey.');
      return;
    }
    analytics.report({
      type: 'PAGINATE',
      queryId: queryId,
      verticalKey: verticalKey,
      newPage: newPageNumber,
      currentPage: pageNumber,
      totalPageCount: maxPageCount
    });
  };

  const executeSearchWithNewOffset = (newPageNumber: number) => {
    const newOffset = limit * (newPageNumber - 1);
    answersAction.setOffset(newOffset);
    answersAction.executeVerticalQuery();
    analytics && reportPaginateEvent(newPageNumber);
  };

  return (
    <div className={cssClasses.container}>
      <nav className={cssClasses.labelContainer} aria-label="Pagination">
        <button
          aria-label='Navigate to the previous results page'
          className={cssClasses.leftIconContainer}
          onClick={() => executeSearchWithNewOffset(pageNumber - 1)} disabled={pageNumber === 1}
        >
          <PageNavigationIcon className={cssClasses.icon + ' transform -rotate-90'}/>
        </button>
        {paginationLabels.map((label, index) => {
          switch (label) {
            case '...':
              return (
                <button
                  key={index}
                  className={cssClasses.label}
                >
                  {label}
                </button>
              );
            case `${pageNumber}`:
              return (
                <button
                  key={index}
                  className={cssClasses.selectedLabel}
                  onClick={() => executeSearchWithNewOffset(pageNumber)}
                >
                  {label}
                </button>
              );
            default:
              return (
                <button
                  key={index}
                  className={cssClasses.label}
                  onClick={() => executeSearchWithNewOffset(Number(label))}
                >
                  {label}
                </button>
              );
          }
        })}
        <button
          aria-label='Navigate to the next results page'
          className={cssClasses.rightIconContainer}
          onClick={() => executeSearchWithNewOffset(pageNumber + 1)} disabled={pageNumber === maxPageCount}
        >
          <PageNavigationIcon className={cssClasses.icon + ' transform rotate-90'}/>
        </button>
      </nav>
    </div>
  );
}

function generatePaginationLabels(pageNumber: number, maxPageCount: number): string[] {
  const paginationLabels: string[] = [];
  const previousPageNumber = pageNumber - 1;
  const nextPageNumber = pageNumber + 1;

  if (previousPageNumber > 3) {
    paginationLabels.push('1', '...', `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_, index) => paginationLabels.push(`${index + 1}`));
  }
  paginationLabels.push(`${pageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, '...', `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)]
      .forEach((_, index) => paginationLabels.push(`${nextPageNumber + index}`));
  }
  return paginationLabels;
}
