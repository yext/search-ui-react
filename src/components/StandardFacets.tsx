import { FacetsProvider } from './Filters';
import { DisplayableFacet } from '@yext/search-headless-react';
import { BaseStandardFacetProps, BaseFacetCssClasses } from './FacetProps';
import { StandardFacetContent } from './StandardFacet';

/**
 * The CSS class interface for {@link StandardFacets}.
 *
 * @public
 */
export interface StandardFacetsCssClasses extends BaseFacetCssClasses {
  standardFacetsContainer?: string
}

/**
 * Props for the {@link StandardFacets} component.
 *
 * @public
 */
export interface StandardFacetsProps extends BaseStandardFacetProps {
  /** List of filter ids that should not be displayed. */
  excludedFieldIds?: string[],
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardFacetsCssClasses
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
  const {
    searchOnChange,
    excludedFieldIds = [],
    customCssClasses = {}
  } = props;
  return (
    <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.standardFacetsContainer}>
      {facets => facets
        .filter(f => !excludedFieldIds.includes(f.fieldId) && isStringFacet(f))
        .map((f, i) =>
          <StandardFacetContent
            fieldId={f.fieldId}
            label={f.displayName}
            facet={f}
            props={props}
            renderDivider={i < facets.length - 1}
          />)
      }
    </FacetsProvider>
  );
}

function isStringFacet(facet: DisplayableFacet): boolean {
  return facet.options.length > 0 && typeof facet.options[0].value === 'string';
}