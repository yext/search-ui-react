import { CardComponent } from '../models/cardComponent';
import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { ChevronIcon as PageNavigationIcon } from '../icons/ChevronIcon';
import { VerticalResultsDisplay } from './VerticalResultsDisplay';
import { usePaginationAnalytics } from '../hooks/usePaginationAnalytics';
import { executeSearch } from '../utils';
import { PropsWithChildren, useCallback } from 'react';

/**
 * The CSS class interface used for {@link VerticalResults}.
 *
 * @public
 */
export interface VerticalResultsCssClasses extends PaginationCssClasses {
  results?: string,
  results___loading?: string
}

/**
 * Props for the VerticalResults component.
 *
 * @public
 */
export interface VerticalResultsProps {
  /** {@inheritDoc CardComponent} */
  CardComponent: CardComponent,
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
 * @public
 *
 * @param props - {@link VerticalResultsProps}
 * @returns A React element for the results, or null if no results should be displayed
 */
export function VerticalResults(props: VerticalResultsProps): JSX.Element | null {
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
      <VerticalResultsDisplay results={results} isLoading={isLoading} {...otherProps} />
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
 *
 * @public
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
  selectedLabel: 'z-10 inline-flex items-center px-4 py-2 text-sm font-semibold border border-primary-600 text-primary-600 bg-primary-50',
  leftIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-l-md',
  rightIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-r-md',
  icon: 'w-3 text-gray-500'
};

interface PaginationButtonProps {
  key?: string,
  className?: string,
  navigateToPage: (newPageNumber: number) => void,
  newPageNumber: number,
  ariaLabel?: string,
  disabled?: boolean
}

function PaginationButton(props: PropsWithChildren<PaginationButtonProps>): JSX.Element | null {
  const { navigateToPage, newPageNumber } = props;
  const onClick = useCallback(() => {
    navigateToPage(newPageNumber);
  }, [navigateToPage, newPageNumber]);

  return (
    <button
      key={props.key}
      aria-label={props.ariaLabel}
      className={props.className}
      onClick={onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

/**
 * The props for the {@link Pagination} component
 *
 * @public
 */
interface PaginationProps {
  numResults: number,
  customCssClasses?: PaginationCssClasses,
  cssCompositionMethod?: CompositionMethod
}

/**
 * Renders a component that divide a series of results into chunks across multiple pages
 * and enable user to navigate between those pages.
 *
 * @public
 */
function Pagination(props: PaginationProps): JSX.Element | null {
  const { numResults, customCssClasses = {}, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(
    builtInPaginationCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const answersActions = useAnswersActions();
  const offset = useAnswersState(state => state.vertical.offset) || 0;
  const limit = useAnswersState(state => state.vertical.limit) || 10;
  const currentPageNumber = (offset / limit) + 1;
  const maxPageCount = Math.ceil(numResults / limit);
  const reportAnalyticsEvent = usePaginationAnalytics();

  const navigateToPage = useCallback((newPageNumber: number) => {
    const newOffset = limit * (newPageNumber - 1);
    answersActions.setOffset(newOffset);
    executeSearch(answersActions);
    reportAnalyticsEvent(newPageNumber, currentPageNumber, maxPageCount);
  }, [answersActions, limit, maxPageCount, currentPageNumber, reportAnalyticsEvent]);

  if (maxPageCount <= 1) {
    return null;
  }

  const paginationLabels: string[] = generatePaginationLabels(currentPageNumber, maxPageCount);

  return (
    <div className={cssClasses.container}>
      <nav className={cssClasses.labelContainer} aria-label="Pagination">
        <PaginationButton
          ariaLabel='Navigate to the previous results page'
          className={cssClasses.leftIconContainer}
          navigateToPage={navigateToPage}
          newPageNumber={currentPageNumber - 1}
          disabled={currentPageNumber === 1}
        >
          <PageNavigationIcon className={cssClasses.icon + ' transform -rotate-90'} />
        </PaginationButton>
        {paginationLabels.map((label, index) => {
          switch (label) {
            case '...':
              return (
                <div
                  key={index}
                  className={cssClasses.label}
                >
                  {label}
                </div>
              );
            case `${currentPageNumber}`:
              return (
                <PaginationButton
                  className={cssClasses.selectedLabel}
                  navigateToPage={navigateToPage}
                  newPageNumber={currentPageNumber}
                >
                  {label}
                </PaginationButton>
              );
            default:
              return (
                <PaginationButton
                  className={cssClasses.label}
                  navigateToPage={navigateToPage}
                  newPageNumber={Number(label)}
                >
                  {label}
                </PaginationButton>
              );
          }
        })}
        <PaginationButton
          aria-label='Navigate to the next results page'
          className={cssClasses.rightIconContainer}
          navigateToPage={navigateToPage}
          newPageNumber={currentPageNumber + 1}
          disabled={currentPageNumber === maxPageCount}
        >
          <PageNavigationIcon className={cssClasses.icon + ' transform rotate-90'} />
        </PaginationButton>
      </nav>
    </div>
  );
}

function generatePaginationLabels(currentPageNumber: number, maxPageCount: number): string[] {
  const paginationLabels: string[] = [];
  const previousPageNumber = currentPageNumber - 1;
  const nextPageNumber = currentPageNumber + 1;

  if (previousPageNumber > 3) {
    paginationLabels.push('1', '...', `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_, index) => paginationLabels.push(`${index + 1}`));
  }
  paginationLabels.push(`${currentPageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, '...', `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)]
      .forEach((_, index) => paginationLabels.push(`${nextPageNumber + index}`));
  }
  return paginationLabels;
}
