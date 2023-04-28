import { StandardFacets } from './StandardFacets';
import { NumericalFacets } from './NumericalFacets';

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
export interface FacetsProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FacetsCssClasses
}

/**
 * A component that displays all facets applicable to the current vertical search.
 *
 * @remarks
 * This component is a quick way of getting facets on the page, and it will render standard facets,
 * numerical facets, and hierarchical facets. The {@link StandardFacets}, {@link NumericalFacets},
 * and {@link HierarchicalFacets} components can be used instead for more control over facet
 * configuration.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const { customCssClasses = {} } = props;
  return (
    <div className={customCssClasses.facetsContainer}>
      <StandardFacets/>
      <NumericalFacets />
    </div>
  );
}