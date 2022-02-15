import { useAnswersActions, useAnswersState, Filter, Matcher } from '@yext/answers-headless-react';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { isDuplicateFilter } from '../utils/filterutils';
import { FilterConfig } from './Filters';
import Filters, { FiltersCssClasses } from './Filters';

/**
 * A particular static filter
 *
 * @public
 */
export interface StaticFilterOption {
  fieldId: string,
  value: string | number | boolean,
  label: string
}

/**
 * Properties for {@link StaticFilters}.
 *
 * @public
 */
export interface StaticFiltersProps {
  /** Configurations for individual filter groups. */
  filterConfigs: FilterConfig[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StaticFiltersCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}


/**
 * The CSS class interface for Static Filters.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StaticFiltersCssClasses extends FiltersCssClasses {}


/**
 * A component that display groups of user-configured filters
 * that will be apply to the current vertical search.
 *
 * @public
 *
 * @param props - {@link StaticFiltersProps}
 * @returns A React element for the static filters
 */
export default function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const answersActions = useAnswersActions();
  const { filterConfigs: staticFilterConfigs, customCssClasses, cssCompositionMethod } = props;

  const selectableFilters = useAnswersState(state => state.filters.static);
  const isOptionSelected = (option: StaticFilterOption): boolean => {
    const foundFilter = selectableFilters?.find(storedSelectableFilter => {
      const { selected:_, ...storedFilter } = storedSelectableFilter;
      const targetFilter = {
        fieldId: option.fieldId,
        matcher: Matcher.Equals,
        value: option.value
      };
      return isDuplicateFilter(storedFilter, targetFilter);
    });
    return !!foundFilter && foundFilter.selected;
  };

  const handleFilterOptionClick = (option: Filter, isChecked: boolean) => {
    answersActions.resetFacets();
    answersActions.setFilterOption({ ...option, selected: isChecked });
    answersActions.executeVerticalQuery();
  };

  const filterConfigs: FilterConfig[] = staticFilterConfigs.map(staticFilterConfig => {
    const filterOptions = staticFilterConfig.options.map(staticFilterOption => {
      return {
        ...staticFilterOption,
        onClick: handleFilterOptionClick,
        isSelected: isOptionSelected(staticFilterOption)
      };
    });
    return {
      ...staticFilterConfig,
      options: filterOptions,
    };
  });

  return (
    <Filters
      filterConfigs={filterConfigs}
      customCssClasses={customCssClasses}
      cssCompositionMethod={cssCompositionMethod}
    />
  );
}
