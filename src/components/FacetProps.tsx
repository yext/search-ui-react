import { DisplayableFacetOption } from '@yext/search-core';
import { FilterGroupCssClasses } from './FilterGroup';

/**
 * The base CSS class interface for a single facet component.
 *
 * @public
 */
export interface BaseFacetCssClasses extends FilterGroupCssClasses {
  divider?: string
}

/**
 * Base props for a single facet component.
 *
 * @public
 */
export interface BaseFacetProps {
  /** The fieldId corresponding to the facet */
  fieldId: string,
  /** The label of the facet. Defaults to facet's displayName if not provided. */
  label?: string,
  /** A function to transform facet's options. */
  transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[]
}

/**
 * Props for a standard facet.
 *
 * @public
 */
export interface BaseStandardFacetProps {
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /**
   * Whether or not to show the option counts for each filter.
   * Defaults to true.
   */
  showOptionCounts?: boolean,
  /**
   * Limit on the number of options to be displayed.
   * Defaults to 10.
   */
  showMoreLimit?: number,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: BaseFacetCssClasses
}
