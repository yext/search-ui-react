import { useSearchState } from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import classNames from 'classnames';
import { AppliedFiltersDisplay } from './AppliedFiltersDisplay';
import { DEFAULT_HIERARCHICAL_DELIMITER } from './Filters/HierarchicalFacetDisplay';
import { useNlpFilterDisplayNames } from '../hooks/useNlpFilterDisplayNames';
import { useRemovableFilters } from '../hooks/useRemovableFilters';

/**
 * The CSS class interface used for {@link AppliedFilters}.
 *
 * @public
 */
export interface AppliedFiltersCssClasses {
  appliedFiltersContainer?: string,
  appliedFiltersLoading?: string,
  nlpFilter?: string,
  removableFilter?: string,
  filterLabel?: string,
  clearAllButton?: string
}

export const builtInCssClasses: Readonly<AppliedFiltersCssClasses> = {
  // Use negative margin to remove space above the filters on mobile
  appliedFiltersContainer: 'flex flex-wrap -mt-3 md:mt-0 mb-2',
  appliedFiltersLoading: 'opacity-50',
  nlpFilter: 'border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
  removableFilter: 'flex items-center border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
  clearAllButton: 'text-sm font-medium text-primary hover:underline focus:underline mb-2'
};

/**
 * Properties for {@link AppliedFilters}.
 *
 * @public
 */
export interface AppliedFiltersProps {
  /** List of filters that should not be displayed. By default, builtin.entityType will be hidden. */
  hiddenFields?: string[],
  /** A set of facet fieldIds that should be interpreted as "hierarchical". */
  hierarchicalFacetsFieldIds?: string[],
  /** {@inheritDoc HierarchicalFacetsProps.delimiter} */
  hierarchicalFacetsDelimiter?: string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: AppliedFiltersCssClasses
}

const DEFUALT_HIDDEN_FIELDS = ['builtin.entityType'];

/**
 * A component that displays a list of filters applied to the current vertical
 * search, which may include any selected options from facets, NLP filters, and
 * field value static filters.
 *
 * @public
 *
 * @param props - {@link AppliedFiltersProps}
 * @returns A React element for the applied filters
 */
export function AppliedFilters(props: AppliedFiltersProps): JSX.Element {
  const isLoading = useSearchState(state => state.searchStatus.isLoading);

  const {
    hiddenFields = DEFUALT_HIDDEN_FIELDS,
    customCssClasses = {},
    hierarchicalFacetsDelimiter = DEFAULT_HIERARCHICAL_DELIMITER,
    hierarchicalFacetsFieldIds
  } = props;

  const removableFilters = useRemovableFilters(
    hierarchicalFacetsFieldIds, hierarchicalFacetsDelimiter, hiddenFields);
  const nlpFilterDisplayNames = useNlpFilterDisplayNames(removableFilters.map(f => f.filter), hiddenFields);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersLoading ?? '']: isLoading
  });

  return (
    <AppliedFiltersDisplay
      removableFilters={removableFilters}
      nlpFilterDisplayNames={nlpFilterDisplayNames}
      cssClasses={cssClasses}
    />
  );
}