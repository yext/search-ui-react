import { FacetsProvider } from './Filters';
import { StandardFacetContent } from './StandardFacetContent';
import {
  FacetProps,
  FacetsProps,
  StandardFacetProps
} from './FacetProps';
import { isNumericalFacet, isStringFacet } from '../utils/filterutils';
import { FilterDivider } from './FilterDivider';
import { Fragment, ReactElement } from 'react';
import { NumericalFacets } from './NumericalFacets';

/** @internal */
enum FacetType {
  STANDARD = 'STANDARD',
  NUMERICAL = 'NUMERICAL',
  HIERARCHICAL = 'HIERARCHICAL'
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
 * To override a single facet, use {@link StandardFacet}.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const { searchOnChange, children, customCssClasses = {} } = props;

  const fieldIdToCustomFacetProps = new Map();
  if (children) {
    (Array.isArray(children) ? children : [children])
      .forEach(child => fieldIdToCustomFacetProps.set(child.props.fieldId, child));
  }

  return (
    <div>
      <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.facetsContainer}>
        {facets => facets
          .map((facet, i) => {
            let facetType: FacetType = FacetType.STANDARD;
            let facetProps: FacetProps = {
              fieldId: facet.fieldId,
              label: facet.displayName,
            };
            if (fieldIdToCustomFacetProps.has(facet.fieldId)) {
              const customFacetElement: ReactElement = fieldIdToCustomFacetProps.get(facet.fieldId);
              facetProps = customFacetElement.props;
              facetType = getFacetTypeFromReactElementType(
                (typeof customFacetElement.type === 'function') ? customFacetElement.type.name : '');
            } else {
              if (isStringFacet(facet)) {
                facetType = FacetType.STANDARD;
              } else if (isNumericalFacet(facet)) {
                facetType = FacetType.NUMERICAL;
              }
            }

            let facetComponent: ReactElement;
            switch (facetType) {
              case FacetType.NUMERICAL:
                facetComponent = <div/>;
                break;
              case FacetType.STANDARD:
                // fall through
              default:
                facetComponent = (
                  <StandardFacetContent
                    facet={facet}
                    {...facetProps}
                  />);
            }

            return (
              <Fragment key={facet.fieldId}>
                {facetComponent}
                {(i < facets.length - 1) && <FilterDivider className={customCssClasses?.divider}/>}
              </Fragment>
            );
          })
        }
      </FacetsProvider>
      <NumericalFacets/>
    </div>
  );
}

/**
 * A component that displays a single standard facet. Use this to override the default rendering.
 *
 * @param props - {@link StandardFacetProps}
 * @returns ReactElement
 * @public
 */
export function StandardFacet(props: StandardFacetProps) { return null; }

/**
 * Returns the type of the facet based on the props.
 * @param elementType - string
 * @returns {@link FacetType}
 *
 * @internal
 */
export function getFacetTypeFromReactElementType(elementType: string) {
  switch (elementType) {
    case StandardFacet.toString():
      // fall through
    default:
      return FacetType.STANDARD;
  }
}
