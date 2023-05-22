import { DisplayableFacetOption } from '@yext/search-headless-react';
import { FilterGroupCssClasses } from './FilterGroup';
import { ReactElement } from 'react';
import { NumberRangeValue } from '@yext/search-headless-react';
import { HierarchicalFacetDisplayCssClasses, RangeInputCssClasses } from './Filters';

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
  /** If set to true, only the facets specified in the children are rendered. If set to false, all
   * facets are rendered with the ones specified in the children overrode. Default to false. */
  onlyRenderChildren?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FacetsCssClasses,
  /** List of filter ids that should not be displayed. */
  excludedFieldIds?: string[],
  /** The delimiter for determining if a facet is hierarchical, defaults to "\>". */
  delimiter?: string,
  /** The custom facet components that will override the default rendering.
   *
   * @remarks
   * Supported components include {@link StandardFacet}, {@link NumericalFacet}.
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
  /**
   * The maximum number of options to render before displaying the "Show more/less" button.
   * Defaults to 10.
   */
  showMoreLimit?: number,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterGroupCssClasses
}

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export interface NumericalFacetProps extends StandardFacetProps {
  /** Whether or not to show the option counts for each filter. Defaults to false. */
  showOptionCounts?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterGroupCssClasses & RangeInputCssClasses,
  /**
   * Returns the filter's display name based on the range values which is used when the filter
   * is displayed by other components such as AppliedFilters.
   *
   * @remarks
   * By default, the displayName separates the range with a dash such as '10 - 20'.
   * If the range is unbounded, it will display as 'Up to 20' or 'Over 10'.
   */
  getFilterDisplayName?: (value: NumberRangeValue) => string,
  /**
   * An optional element which renders in front of the input text.
   */
  inputPrefix?: JSX.Element
}

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export interface HierarchicalFacetProps extends
  Omit<StandardFacetProps, 'transformOptions' | 'showOptionCounts'> {
  /**
   * A function to transform facet's options. The returned options need to be delimited to keep
   * the hierarchy.
   */
  transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[],
  /**
   * The maximum number of options to render before displaying the "Show more/less" button.
   * Defaults to 4.
   */
  showMoreLimit?: number,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: Omit<FilterGroupCssClasses, 'searchInput' | 'optionsContainer' | 'option' |
  'optionInput' | 'optionLabel'> & HierarchicalFacetDisplayCssClasses,
  /** The delimiter for determining facet hierarchies, defaults to "\>". */
  delimiter?: string
}

/**
 * Props for a single facet component.
 *
 * @public
 */
export type FacetProps = StandardFacetProps | NumericalFacetProps | HierarchicalFacetProps;
