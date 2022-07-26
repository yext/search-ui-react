import { DisplayableFacet, DisplayableFacetOption, Filter, SelectableFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useMemo } from 'react';
import classNames from 'classnames';
import { AppliedFiltersDisplay } from './AppliedFiltersDisplay';
import { DEFAULT_HIERARCHICAL_DELIMITER } from './Filters/HierarchicalFacetDisplay';
import { useStateUpdatedOnSearch } from '../hooks/useStateUpdatedOnSearch';
import { isDuplicateFilter, isNearFilterValue } from '../utils/filterutils';
import { executeSearch } from '../utils/search-operations';
import { isDescendantHierarchicalFacet } from '../utils/appliedfilterutils';

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
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2',
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
 * search, which may include any selected options from static filters, facets, and
 * NLP filters.
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
  const nlpFilters = useNlpFilters(removableFilters.map(f => f.filter), hiddenFields);

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  cssClasses.appliedFiltersContainer = classNames(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersLoading ?? '']: isLoading
  });

  return (
    <AppliedFiltersDisplay
      removableFilters={removableFilters}
      nlpFilters={nlpFilters}
      cssClasses={cssClasses}
    />
  );
}

/**
 * Returns a memoized array of nlp filter display values, with hiddenFields and duplicate filters removed.
 */
function useNlpFilters(
  removableFilters: Filter[],
  hiddenFields: string[]
) {
  const nlpFilters = useSearchState(state => state.vertical.appliedQueryFilters);

  return useMemo(() => {
    return nlpFilters?.filter(({ filter }) => {
      if (!hiddenFields.includes(filter.fieldId)) {
        return false;
      }
      const duplicateFilter = removableFilters.find(f => isDuplicateFilter(f, filter));
      return !duplicateFilter;
    }).map(f => f.displayValue) ?? [];
  }, [hiddenFields, nlpFilters, removableFilters]);
}

function useRemovableFilters(
  hierarchicalFacetFieldIds: string[] | undefined,
  hierarchicalFacetsDelimiter: string,
  hiddenFields: string[]
): {
    displayName: string,
    handleRemove: () => void,
    filter: Filter
  }[]
{
  const facets = useStateUpdatedOnSearch(state => state.filters.facets);
  const staticFilters = useStateUpdatedOnSearch(state => state.filters.static);
  const hasResults = !!useSearchState(state => state.vertical.results);
  const searchActions = useSearchActions();

  return useMemo(() => {
    if (!hasResults) {
      return [];
    }

    function handleRemoveStaticFilterOption(filter: SelectableFilter) {
      searchActions.setOffset(0);
      searchActions.setFilterOption({ ...filter, selected: false });
      executeSearch(searchActions);
    }

    const selectedStaticFilters = staticFilters
      ?.filter(f => f.selected && !hiddenFields.includes(f.fieldId))
      .map(f => ({
        displayName: f.displayName ?? '',
        handleRemove: () => handleRemoveStaticFilterOption(f),
        filter: f
      })) ?? [];

    const selectedFacets = facets?.filter(f => !hiddenFields.includes(f.fieldId)).flatMap(processFacet) ?? [];

    return [...selectedStaticFilters, ...selectedFacets];

    function processFacet(f: DisplayableFacet) {
      const selectedOptions = f.options.filter(o => o.selected);
      if (hierarchicalFacetFieldIds?.includes(f.fieldId)) {
        return processHierarchicalFacetOptions(selectedOptions, f.fieldId);
      }
      return processRegularFacetOptions(selectedOptions, f.fieldId);
    }

    function processHierarchicalFacetOptions(options: DisplayableFacetOption[], fieldId: string) {
      const sortedOptions = [...options].sort((a, b) => {
        return a.displayName.length - b.displayName.length;
      });
      return sortedOptions.map(option => {
        const displayNameTokens = option.displayName.split(hierarchicalFacetsDelimiter).map(t => t.trim());
        const filter = {
          value: option.value,
          matcher: option.matcher,
          fieldId
        };

        return {
          displayName: displayNameTokens[displayNameTokens.length - 1],
          handleRemove: () => handleRemoveHierarchicalFacetOption(filter),
          filter
        };
      });
    }

    function handleRemoveHierarchicalFacetOption(filter: Filter, displayNameTokens: string[]) {
      const { fieldId, matcher, value } = filter;
      // Uncheck all descendant options in the hierarchy
      facets
        ?.filter(f => f.fieldId === fieldId)
        .forEach(hierarchicalFacet => {
          if (isDescendantHierarchicalFacet(facet, hierarchicalFacet, hierarchicalFacetsDelimiter)) {
            searchActions.setFacetOption(fieldId, {
              matcher: hierarchicalFacet.matcher,
              value: hierarchicalFacet.value
            }, false);
          }
        });

      const parentDisplayName = facet.displayNameTokens.slice(0, -1).join(` ${hierarchicalFacetsDelimiter} `);
      const parentFacet = hierarchicalFacets
        .find(hierarchicalFacet => hierarchicalFacet.displayName === parentDisplayName);

      parentFacet && searchActions.setFacetOption(fieldId, {
        matcher: parentFacet?.matcher,
        value: parentFacet?.value
      }, true);

      searchActions.setOffset(0);
      searchActions.setFacetOption(fieldId, { matcher: facet.matcher, value: facet.value }, false);
      executeSearch(searchActions);
    };

    function handleRemoveFacetOption({ fieldId, matcher, value }: Filter) {
      if (isNearFilterValue(value)) {
        console.error('A Filter with a NearFilterValue is not a supported RemovableFilter.');
        return;
      }
      searchActions.setOffset(0);
      searchActions.setFacetOption(fieldId, { matcher, value }, false);
      executeSearch(searchActions);
    }

    function processRegularFacetOptions(options: DisplayableFacetOption[], fieldId: string) {
      return options.map(option => {

        const filter: Filter = {
          value: option.value,
          matcher: option.matcher,
          fieldId
        };

        return {
          displayName: option.displayName,
          handleRemove: () => handleRemoveFacetOption(filter),
          filter
        };
      });
    }
  }, [
    facets,
    hierarchicalFacetFieldIds,
    hierarchicalFacetsDelimiter,
    staticFilters,
    hasResults,
    hiddenFields,
    searchActions
  ]);
}


