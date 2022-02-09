import { DisplayableFilter } from '../models/displayableFilter';
import CloseIcon from '../icons/CloseIcon';
import { useAnswersActions } from '@yext/answers-headless-react';
import { isNearFilterValue } from '../utils/filterutils';
import { AppliedFiltersCssClasses } from './AppliedFilters';

/**
 * Properties for {@link AppliedFilters}.
 */
export interface AppliedFiltersDisplayProps {
  /**
   * List of {@link DisplayableFilter} to construct the applied filter tags from.
   */
  displayableFilters: DisplayableFilter[],
  /**
   * CSS classes for customizing the component styling.
   */
  cssClasses?: AppliedFiltersCssClasses
}

/**
 * A component that renders applied filters based on a given list of {@link DisplayableFilter}.
 *
 * @param props - {@inheritdoc AppliedFiltersDisplayProps}
 * @returns A React element for the applied filters
 */
export default function AppliedFiltersDisplay(props: AppliedFiltersDisplayProps): JSX.Element {
  const { displayableFilters, cssClasses = {} } = props;
  function NlpFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    return (
      <div className={cssClasses.nlpFilter}>
        <span className={cssClasses.filterLabel}>{filter.label}</span>
      </div>
    );
  }

  function RemovableFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    const answersAction = useAnswersActions();

    const onRemoveFacetOption = () => {
      const { fieldId, matcher, value } = filter.filter;
      if (isNearFilterValue(value)) {
        console.error('A Filter with a NearFilterValue is not a supported RemovableFilter.');
        return;
      }
      answersAction.setFacetOption(fieldId, { matcher, value }, false);
      answersAction.executeVerticalQuery();
    };

    const onRemoveStaticFilterOption = () => {
      answersAction.setFilterOption({ ...filter.filter, selected: false });
      answersAction.executeVerticalQuery();
    };

    const onRemoveFilter = filter.filterType === 'FACET' ? onRemoveFacetOption : onRemoveStaticFilterOption;

    return (
      <div className={cssClasses.removableFilter}>
        <div className={cssClasses.filterLabel}>{filter.label}</div>
        <button className={cssClasses.removeFilterButton} onClick={onRemoveFilter}><CloseIcon/></button>
      </div>
    );
  }

  return (
    <>
      { displayableFilters.length > 0 &&
        <div className={cssClasses.appliedFiltersContainer} aria-label='Applied filters to current search'>
          {displayableFilters.map((filter: DisplayableFilter) => {
            const key = `${filter.filterType}-${filter.label}`;
            if (filter.filterType === 'NLP_FILTER') {
              return <NlpFilter filter={filter} key={key}/>;
            }
            return <RemovableFilter filter={filter} key={key}/>;
          })}
        </div>
      }
    </>
  );
}