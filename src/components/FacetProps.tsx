import { DisplayableFacetOption } from '@yext/search-headless-react';
import { FilterGroupCssClasses } from './FilterGroup';
import { ReactElement } from 'react';

/**
 * The CSS class interface for {@link Facets}.
 *
 * @public
 */
export interface FacetsCssClasses {
  facetsContainer?: string,
  divider?: string
}

/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
export interface FacetsProps {
  /** Whether or not a search is automatically run when a filter is selected. Defaults to true. */
  searchOnChange?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FacetsCssClasses,
  /** List of filter ids that should not be displayed. */
  excludedFieldIds?: string[],
  /** The custom facet components that will override the default rendering.
   *
   * @remarks
   * Supported components include {@link StandardFacet}.
   */
  children?: ReactElement[] | ReactElement | undefined | null
}

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export interface StandardFacetProps {
  /** The fieldId corresponding to the facet */
  fieldId: string,
  /** The label of the facet. Defaults to facet's displayName if not provided. */
  label?: string,
  /** A function to transform facet's options. */
  transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[],
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /** Whether or not to show the option counts for each filter. Defaults to true. */
  showOptionCounts?: boolean,
  /** Limit on the number of options to be displayed. Defaults to 10. */
  showMoreLimit?: number,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterGroupCssClasses
}

/**
 * Props for a single facet component.
 *
 * @public
 */
export type FacetProps = StandardFacetProps;
