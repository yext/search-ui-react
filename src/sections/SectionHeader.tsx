import { AppliedFiltersCssClasses } from '../components/AppliedFilters';
import { AppliedFiltersDisplay } from '../components/AppliedFiltersDisplay';
import { useComposedCssClasses, CompositionMethod } from '../hooks/useComposedCssClasses';
import { CollectionIcon } from '../icons/CollectionIcon';
import { AppliedQueryFilter, SelectableFilter as DisplayableFilter, useAnswersState } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { useAnalytics } from '../hooks/useAnalytics';
import { VerticalLink } from '../models/verticalLink';
import { useCallback } from 'react';

/**
 * The CSS class interface used for {@link SectionHeader}.
 */
export interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
  sectionHeaderContainer?: string,
  sectionHeaderIconContainer?: string,
  sectionHeaderLabel?: string,
  viewMoreContainer?: string,
  viewMoreLink?: string
}

const builtInCssClasses: SectionHeaderCssClasses = {
  sectionHeaderContainer: 'flex items-center w-full pl-1 mb-4',
  sectionHeaderIconContainer: 'w-5 h-5',
  sectionHeaderLabel: 'font-bold text-gray-800 text-base pl-3',
  viewMoreContainer: 'flex justify-end flex-grow ml-auto font-medium text-gray-800',
  viewMoreLink: 'text-primary-600 pr-1 pl-3',
  appliedFiltersContainer: 'ml-3 flex flex-wrap',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-800 mr-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2',
  removeFilterButton: 'w-2 h-2 text-gray-500 m-1.5'
};

/**
 * The props for a {@link SectionHeader}.
 */
export interface SectionHeaderProps {
  /** The display label for the section header. */
  label: string,
  /** An array of AppliedQueryFilters which are displayed in the section header. */
  appliedQueryFilters?: AppliedQueryFilter[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: SectionHeaderCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod,
  /** The verticalKey associated with the section. */
  verticalKey: string,
  /** Display a button to view all results for that section, if true. */
  viewAllButton?: boolean,
  /** A function which returns the viewAll link based on the vertical and query. */
  getViewAllUrl?: (data: VerticalLink) => string
}

/**
 * The header of a section which includes an icon, the section title, applied query filters, and optionally
 * a view all button.
 *
 * @param props - {@link SectionHeaderProps}
 * @returns A React element for a Section Header
 */
export function SectionHeader(props: SectionHeaderProps): JSX.Element {
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedQueryFilters,
    customCssClasses,
    cssCompositionMethod,
    getViewAllUrl
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const latestQuery = useAnswersState(state => state.query.mostRecentSearch);
  const nlpFilters = appliedQueryFilters?.map(
    (appliedQueryFilter): DisplayableFilter => ({
      ...appliedQueryFilter.filter,
      displayName: appliedQueryFilter.displayValue,
      selected: true
    })
  ) ?? [];

  const analytics = useAnalytics();
  const queryId = useAnswersState(state => state.query.queryId);

  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });

  const href = getViewAllUrl
    ? getViewAllUrl({ verticalKey, query: latestQuery })
    : `/${verticalKey}?query=${latestQuery}`;

  const handleClickViewAllButton = useCallback(() => {
    if (!analytics) {
      return;
    }
    if (!queryId) {
      console.error('Unable to report a vertical view all event. Missing field: queryId.');
      return;
    }
    analytics?.report({
      type: 'VERTICAL_VIEW_ALL',
      queryId,
      verticalKey
    });
  }, [analytics, queryId, verticalKey]);

  return (
    <div className={cssClasses.sectionHeaderContainer}>
      <div className={cssClasses.sectionHeaderIconContainer}>
        <CollectionIcon></CollectionIcon>
      </div>
      <h2 className={cssClasses.sectionHeaderLabel}>{label}</h2>
      {appliedQueryFilters &&
        <AppliedFiltersDisplay nlpFilters={nlpFilters} cssClasses={cssClasses} />
      }
      {viewAllButton &&
        <div className={cssClasses.viewMoreContainer}>
          <a className={cssClasses.viewMoreLink} href={href}>
            <button onClick={handleClickViewAllButton}>
              View all
            </button>
          </a>
        </div>}
    </div>
  );
}