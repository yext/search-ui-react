import { FacetsProvider } from './Filters';
import { FilterGroup } from './FilterGroup';
import { Fragment } from 'react';
import { DisplayableFacet } from '@yext/search-headless-react';
import { FilterDivider } from './FilterDivider';
import { BaseStandardFacetProps, BaseFacetCssClasses, BaseFacetProps } from './FacetProps';
import { DisplayableFacetOption } from '@yext/search-core';

/**
 * The CSS class interface for {@link StandardFacet}.
 *
 * @public
 */
export interface StandardFacetCssClasses extends BaseFacetCssClasses {
  standardFacetContainer?: string
}

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export interface StandardFacetProps extends BaseFacetProps, BaseStandardFacetProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardFacetCssClasses
}

/**
 * A component that displays a single standard facet.
 *
 * @param props - {@link StandardFacetProps}
 * @param renderDivider - boolean
 * whether to render a divider after the facet or not, defaults to false
 * @returns A React component for the facet
 *
 * @public
 */
export function StandardFacet({ props, renderDivider = false }) {
  const {
    fieldId,
    searchOnChange,
    customCssClasses,
  } = props;
  return (
    <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses?.standardFacetContainer || ''}>
      {facets => facets
        .filter(facet => facet.fieldId === fieldId)
        .map(facet =>
          <StandardFacetContent
            fieldId={props.fieldId}
            label={props.label}
            facet={facet}
            renderDivider={renderDivider}
            props={props}
            transformOptions={props.transformOptions}
          />)
      }
    </FacetsProvider>
  );
}

/**
 * A component that displays the content of a standard facet.
 *
 * @param fieldId - string
 * @param label - string
 * @param facet - {@link DisplayableFacet}
 * @param renderDivider - boolean
 * @param props - {@link BaseStandardFacetProps}
 * @param transformOptions - a function to transform facet's options
 * @returns A React component for the content of a standard facet
 *
 * @internal
 */
export function StandardFacetContent({
  fieldId,
  label,
  facet,
  props,
  renderDivider = false,
  transformOptions = undefined
}: {
  fieldId: string,
  label: string,
  facet: DisplayableFacet,
  props: BaseStandardFacetProps,
  renderDivider?: boolean,
  transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[]
}) {
  const {
    customCssClasses,
    showMoreLimit = 10,
    showOptionCounts = true,
    ...filterGroupProps
  } = props;

  const options = facet.options || [];
  const transformedOptions = transformOptions ? (transformOptions(options) || []) : options;

  return (
    <Fragment key={fieldId}>
      <FilterGroup
        fieldId={fieldId}
        filterOptions={transformedOptions.map(o => {
          return showOptionCounts ? { ...o, resultsCount: o.count } : o;
        })}
        title={label || facet?.displayName}
        customCssClasses={customCssClasses}
        showMoreLimit={showMoreLimit}
        searchable={facet?.options.length > showMoreLimit}
        {...filterGroupProps}
      />
      {renderDivider && <FilterDivider className={customCssClasses?.divider}/>}
    </Fragment>
  );
}
