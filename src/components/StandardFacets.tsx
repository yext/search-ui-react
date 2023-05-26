import { FacetsProvider } from './Filters';
import { FilterGroup, FilterGroupCssClasses } from './FilterGroup';
import { Fragment } from 'react';
import { FilterDivider } from './FilterDivider';
import { isStringFacet } from '../utils/filterutils';

/**
 * The CSS class interface for {@link StandardFacets}.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
export interface StandardFacetsCssClasses extends FilterGroupCssClasses {
  standardFacetsContainer?: string,
  divider?: string
}

/**
 * Props for the {@link StandardFacets} component.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
export interface StandardFacetsProps {
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /** List of filter ids that should not be displayed. */
  excludedFieldIds?: string[],
  /**
   * Whether or not to show the option counts for each filter.
   * Defaults to true.
   */
  showOptionCounts?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardFacetsCssClasses,
  /**
   * Limit on the number of options to be displayed.
   * Defaults to 10.
   */
  showMoreLimit?: number
}

/**
 * A component that displays simple facets applicable to the current vertical search.
 *
 * @remarks
 * Numerical facets is not included. Hierachical facets will not be display in a
 * tree level structure. Use `excludedFieldIds` to exclude hierachical facets, if any,
 * when using this component.
 *
 * @param props - {@link StandardFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link Facets} instead.
 * @public
 */
export function StandardFacets(props: StandardFacetsProps) {
  const {
    searchOnChange,
    excludedFieldIds = [],
    customCssClasses = {},
    showMoreLimit = 10,
    showOptionCounts = true,
    ...filterGroupProps
  } = props;
  return (
    <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.standardFacetsContainer}>
      {facets => facets
        .filter(f => !excludedFieldIds.includes(f.fieldId) && isStringFacet(f))
        .map((f, i) => {
          return (
            <Fragment key={f.fieldId}>
              <FilterGroup
                fieldId={f.fieldId}
                filterOptions={f.options.map(o => {
                  return showOptionCounts ? { ...o, resultsCount: o.count } : o;
                })}
                title={f.displayName}
                customCssClasses={customCssClasses}
                showMoreLimit={showMoreLimit}
                searchable={f.options.length > showMoreLimit}
                {...filterGroupProps}
              />
              {(i < facets.length - 1) && <FilterDivider className={customCssClasses.divider}/>}
            </Fragment>
          );
        })
      }
    </FacetsProvider>
  );
}
