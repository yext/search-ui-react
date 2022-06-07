import { FacetsProvider } from './Filters';
import { FilterGroup, FilterGroupCssClasses } from './FilterGroup';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { Fragment } from 'react';
import { DisplayableFacet } from '@yext/answers-headless-react';

/**
 * The CSS class interface for {@link StandardFacets}.
 *
 * @public
 */
export interface StandardFacetsCssClasses extends FilterGroupCssClasses {
  container?: string,
  divider?: string
}

/**
 * Props for the {@link StandardFacets} component.
 *
 * @public
 */
export interface StandardFacetsProps {
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /** {@inheritDoc FilterGroupProps.searchable} */
  searchable?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /** List of filter ids that should not be displayed. */
  excludedFieldIds?: string[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardFacetsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
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
 * @public
 */
export function StandardFacets(props: StandardFacetsProps) {
  const { searchOnChange, excludedFieldIds = [], customCssClasses = {}, ...filterGroupProps } = props;
  return (
    <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.container}>
      {facets => facets
        .filter(f => !excludedFieldIds.includes(f.fieldId) && isStringFacet(f))
        .map((f, i) => {
          return (
            <Fragment key={f.fieldId}>
              <FilterGroup
                fieldId={f.fieldId}
                filterOptions={f.options}
                title={f.displayName}
                customCssClasses={customCssClasses}
                {...filterGroupProps}
              />
              {(i < facets.length - 1) && <Divider className={customCssClasses.divider}/>}
            </Fragment>
          );
        })
      }
    </FacetsProvider>
  );
}

function isStringFacet(facet: DisplayableFacet): boolean {
  return facet.options.length > 0 && typeof facet.options[0].value === 'string';
}

function Divider({ className ='w-full h-px bg-gray-200 my-4' }: { className?: string }) {
  return <div className={className} />;
}