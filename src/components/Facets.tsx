import { FacetsProvider } from './Filters';
import { StandardFacetContent } from './StandardFacetContent';
import {
  FacetProps,
  FacetsProps, HierarchicalFacetProps, NumericalFacetProps,
  StandardFacetProps
} from './FacetProps';
import { isNumericalFacet, isStringFacet } from '../utils/filterutils';
import { FilterDivider } from './FilterDivider';
import { Fragment, ReactElement } from 'react';
import { NumericalFacetContent } from './NumericalFacetContent';
import { HierarchicalFacetContent } from './HierarchicalFacetContent';
import { DisplayableFacet } from '@yext/search-headless-react';

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
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const {
    searchOnChange,
    onlyRenderChildren = false,
    children,
    hierarchicalFieldIds,
    excludedFieldIds = [],
    customCssClasses = {},
  } = props;

  const fieldIdToCustomFacetProps = new Map();
  const fieldIds: string[] = [];
  if (children) {
    (Array.isArray(children) ? children : [children])
      .filter(child => child?.props?.fieldId)
      .forEach(child => {
        fieldIdToCustomFacetProps.set(child.props.fieldId, child);
        fieldIds.push(child.props.fieldId);
      });
  }

  return (
    <div>
      <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.facetsContainer}>
        {facets => {
          if (!facets || !facets.length) {
            return;
          }

          if (!onlyRenderChildren) {
            facets.forEach(facet => {
              if (!fieldIds.includes(facet.fieldId)) {
                fieldIds.push(facet.fieldId);
              }
            });
          }

          const fieldIdToFacet = new Map();
          facets.forEach(facet => fieldIdToFacet.set(facet.fieldId, facet));

          return fieldIds
            .filter(fieldId =>
              !excludedFieldIds.includes(fieldId)
              && fieldIdToFacet.get(fieldId).options.length > 0
              && (!onlyRenderChildren || fieldIdToCustomFacetProps.has(fieldId)))
            .map((fieldId, i) => {
              const facet: DisplayableFacet = fieldIdToFacet.get(fieldId);

              return (
                <Fragment key={facet.fieldId}>
                  <Facet
                    facet={facet}
                    facetsCustomCssClasses={customCssClasses}
                    fieldIdToCustomFacetProps={fieldIdToCustomFacetProps}
                    hierarchicalFieldIds={hierarchicalFieldIds}
                  />
                  {(i < facets.length - 1)
                    && <FilterDivider className={customCssClasses?.divider}/>}
                </Fragment>
              );
            });
        }
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
 * A component that represents a single facet.
 *
 * @param facet - {@link DisplayableFacet}
 * @param facetsCustomCssClasses - {@link FacetsCssClasses}
 * @param fieldIdToCustomFacetProps - a map of fieldId to facet props
 * @param hierarchicalFieldIds - a list of hierarchical field ids
 * @returns {@link ReactElement}
 *
 * @internal
 */
export function Facet({
  facet,
  facetsCustomCssClasses,
  fieldIdToCustomFacetProps,
  hierarchicalFieldIds,
}) {
  let facetType: FacetType;
  let facetProps: FacetProps = {
    fieldId: facet.fieldId,
    label: facet.displayName,
  };
  if (fieldIdToCustomFacetProps.has(facet.fieldId)) {
    const customFacetElement: ReactElement = fieldIdToCustomFacetProps.get(facet.fieldId);
    facetProps = { ...facetProps, ...customFacetElement.props };
    facetType = getFacetTypeFromReactElementType(
      (typeof customFacetElement.type === 'function')
        ? customFacetElement.type.name : '');
  } else {
    facetType = getFacetTypeFromFacet(facet, hierarchicalFieldIds);
  }

  facetProps = {
    ...facetProps,
    customCssClasses: {
      ...facetsCustomCssClasses,
      ...facetProps.customCssClasses,
    },
  };

  switch (facetType) {
    case FacetType.NUMERICAL:
      return (<NumericalFacetContent facet={facet} {...facetProps}/>);
    case FacetType.HIERARCHICAL:
      return (<HierarchicalFacetContent facet={facet} {...facetProps}/>);
    case FacetType.STANDARD:
    // fall through
    default:
      return (<StandardFacetContent facet={facet} {...facetProps}/>);
  }
}

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

/**
 * Returns the type of the facet based on facet.
 * @param facet - {@link DisplayableFacet}
 * @param hierarchicalFieldIds - string
 * @returns {@link FacetType}
 *
 * @internal
 */
export function getFacetTypeFromFacet(
  facet: DisplayableFacet,
  hierarchicalFieldIds: string[] = [],
) {
  if (hierarchicalFieldIds.includes(facet.fieldId)) {
    return FacetType.HIERARCHICAL;
  } else if (isStringFacet(facet)) {
    return FacetType.STANDARD;
  } else if (isNumericalFacet(facet)) {
    return FacetType.NUMERICAL;
  }

  return FacetType.STANDARD;
}
