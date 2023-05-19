import { FacetsProvider } from './Filters';
import { StandardFacetContent } from './StandardFacetContent';
import {
  FacetProps,
  FacetsProps, HierarchicalFacetProps, NumericalFacetProps,
  StandardFacetProps
} from './FacetProps';
import { isHierarchicalFacet, isNumericalFacet, isStringFacet } from '../utils/filterutils';
import { FilterDivider } from './FilterDivider';
import { Fragment, ReactElement } from 'react';
import { NumericalFacetContent } from './NumericalFacetContent';
import { HierarchicalFacetContent } from './HierarchicalFacetContent';

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
 * numerical facets, and hierarchical facets. The {@link StandardFacet}, {@link NumericalFacet},
 * and {@link HierarchicalFacet} components can be used to override the default facet configuration.
 *
 * To override a single facet, use {@link StandardFacet}, {@link NumericalFacet} or
 * {@link HierarchicalFacet}.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const {
    searchOnChange,
    children,
    delimiter,
    excludedFieldIds = [],
    customCssClasses = {},
  } = props;

  const fieldIdToCustomFacetProps = new Map();
  if (children) {
    (Array.isArray(children) ? children : [children])
      .forEach(child => fieldIdToCustomFacetProps.set(child.props.fieldId, child));
  }

  return (
    <div>
      <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.facetsContainer}>
        {facets => facets
          .filter(facet => !excludedFieldIds.includes(facet.fieldId) && facet.options.length > 0)
          .map((facet, i) => {
            let facetType: FacetType = FacetType.STANDARD;
            let facetProps: FacetProps = {
              fieldId: facet.fieldId,
              label: facet.displayName,
            };
            if (fieldIdToCustomFacetProps.has(facet.fieldId)) {
              const customFacetElement: ReactElement = fieldIdToCustomFacetProps.get(facet.fieldId);
              facetProps = { ...facetProps, ...customFacetElement.props };
              facetType = getFacetTypeFromReactElementType(
                (typeof customFacetElement.type === 'function') ? customFacetElement.type.name : '');
            } else {
              if (isHierarchicalFacet(facet, delimiter)) {
                facetType = FacetType.HIERARCHICAL;
              } else if (isStringFacet(facet)) {
                facetType = FacetType.STANDARD;
              } else if (isNumericalFacet(facet)) {
                facetType = FacetType.NUMERICAL;
              }
            }

            let facetComponent: ReactElement;
            switch (facetType) {
              case FacetType.NUMERICAL:
                facetComponent = (<NumericalFacetContent facet={facet} {...facetProps}/>);
                break;
              case FacetType.HIERARCHICAL:
                facetComponent = (<HierarchicalFacetContent facet={facet} {...facetProps}/>);
                break;
              case FacetType.STANDARD:
                // fall through
              default:
                facetComponent = (<StandardFacetContent facet={facet} {...facetProps}/>);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StandardFacet(props: StandardFacetProps) { return null; }

/**
 * A component that displays a single numerical facet. Use this to override the default rendering.
 *
 * @param props - {@link NumericalFacetProps}
 * @returns ReactElement
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NumericalFacet(props: NumericalFacetProps) { return null; }

/**
 * A component that displays a single hierarchical facet, in a tree level structure, applicable to
 * the current vertical search. Use this to override the default rendering.
 *
 * @param props - {@link HierarchicalFacetProps}
 * @returns ReactElement
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HierarchicalFacet(props: HierarchicalFacetProps) { return null; }

/**
 * Returns the type of the facet based on the props.
 * @param elementType - string
 * @returns {@link FacetType}
 *
 * @internal
 */
export function getFacetTypeFromReactElementType(elementType: string) {
  switch (elementType) {
    case NumericalFacet.name.toString():
      return FacetType.NUMERICAL;
    case HierarchicalFacet.name.toString():
      return FacetType.HIERARCHICAL;
    case StandardFacet.name.toString():
      // fall through
    default:
      return FacetType.STANDARD;
  }
}
