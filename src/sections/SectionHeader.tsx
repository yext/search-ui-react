import { AppliedFiltersCssClasses } from '../components/AppliedFilters';
import AppliedFiltersDisplay from '../components/AppliedFiltersDisplay';
// import { ResultsCountConfig } from '../components/ResultsCount';
import { useComposedCssClasses, CompositionMethod } from '../hooks/useComposedCssClasses';
import CollectionIcon from '../icons/CollectionIcon';
import { AppliedQueryFilter, useAnswersState } from '@yext/answers-headless-react';
import { DisplayableFilter } from '../models/displayableFilter';
import classNames from 'classnames';
import { useAnalytics } from '../hooks/useAnalytics';

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
  viewMoreLink: 'text-blue-600 pr-1 pl-3',
  appliedFiltersContainer: 'ml-3 flex flex-wrap',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-800 mr-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2',
  removeFilterButton: 'w-2 h-2 text-gray-500 m-1.5'
};

interface SectionHeaderConfig {
  label: string,
  // resultsCountConfig?: ResultsCountConfig,
  appliedQueryFilters?: AppliedQueryFilter[],
  customCssClasses?: SectionHeaderCssClasses,
  cssCompositionMethod?: CompositionMethod,
  verticalKey: string,
  viewAllButton?: boolean
}

export default function SectionHeader(props: SectionHeaderConfig): JSX.Element {
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedQueryFilters,
    customCssClasses,
    cssCompositionMethod
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const latestQuery = useAnswersState(state => state.query.mostRecentSearch);
  const displayableFilters = appliedQueryFilters?.map(
    (appliedQueryFilter): DisplayableFilter => {
      return {
        filterType: 'NLP_FILTER',
        filter: appliedQueryFilter.filter,
        groupLabel: appliedQueryFilter.displayKey,
        label: appliedQueryFilter.displayValue
      };
    }
  ) ?? [];

  const analytics = useAnalytics();
  const queryId = useAnswersState(state => state.query.queryId);
  const reportViewAllEvent = () => {
    if(!queryId) {
      console.error('Unable to report a vertical view all event. Missing field: queryId.');
      return;
    }
    analytics?.report({
      type: 'VERTICAL_VIEW_ALL',
      queryId,
      verticalKey
    });
  };

  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersContainer___loading ?? '']: isLoading
  });

  return (
    <div className={cssClasses.sectionHeaderContainer}>
      <div className={cssClasses.sectionHeaderIconContainer}>
        <CollectionIcon></CollectionIcon>
      </div>
      <h2 className={cssClasses.sectionHeaderLabel}>{label}</h2>
      {/* TODO (cea2aj): Add support for ResultsCountDisplay once we get the mocks from UX
      {resultsCountConfig && <ResultsCountDisplay
        resultsLength={resultsCountConfig.resultsLength}
        resultsCount={resultsCountConfig.resultsCount}
      />} */}
      {appliedQueryFilters &&
        <AppliedFiltersDisplay displayableFilters={displayableFilters} cssClasses={cssClasses}/>
      }
      {viewAllButton &&
        <div className={cssClasses.viewMoreContainer}>
          <a className={cssClasses.viewMoreLink} href={`/${verticalKey}?query=${latestQuery}`}>
            <button onClick={() => analytics && reportViewAllEvent()}>
              View all
            </button>
          </a>
        </div>}
    </div>
  );
}