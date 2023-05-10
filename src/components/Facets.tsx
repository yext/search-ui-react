import { StandardFacets } from './StandardFacets';
import { NumericalFacets } from './NumericalFacets';
import { PropsWithChildren, ReactNode } from 'react';

/**
 * The CSS class interface for {@link Facets}.
 *
 * @public
 */
export interface FacetsCssClasses {
  facetsContainer?: string
}

/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
export type FacetsProps = PropsWithChildren<{
  /** List of filter ids that should be overridden. */
  overriddenFieldIds?: string[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FacetsCssClasses,
  /** The custom facet components that will override the default rendering.
   *
   * @remarks
   * Supported components include {@link StandardFacet}.
   */
  children?: ReactNode
}>;

/**
 * A component that displays all facets applicable to the current vertical search.
 *
 * @remarks
 * This component is a quick way of getting facets on the page, and it will render standard facets,
 * numerical facets, and hierarchical facets. The {@link StandardFacets}, {@link NumericalFacets},
 * and {@link HierarchicalFacets} components can be used instead for more control over facet
 * configuration.
 *
 * To override a single facet, use {@link StandardFacet} and set the field id on overriddenFieldIds.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const { overriddenFieldIds, children, customCssClasses = {} } = props;

  return (
    <div className={customCssClasses.facetsContainer}>
      {children}
      <StandardFacets excludedFieldIds={overriddenFieldIds}/>
      <NumericalFacets/>
    </div>
  );
}