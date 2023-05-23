import { FilterGroup } from './FilterGroup';
import { DisplayableFacet } from '@yext/search-headless-react';
import { StandardFacetProps } from './FacetProps';

/**
 * A component that displays the content of a standard facet.
 *
 * @param props - props to render the component
 * @returns A React component for the content of a standard facet
 *
 * @internal
 */
export function StandardFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  facet,
  showMoreLimit = 10,
  showOptionCounts = true,
  ...filterGroupProps
}: StandardFacetProps & { facet: DisplayableFacet }) {
  const options = facet.options || [];
  const transformedOptions = transformOptions ? (transformOptions(options) || []) : options;

  return (
    <FilterGroup
      fieldId={fieldId}
      filterOptions={transformedOptions.map(o => {
        return showOptionCounts ? { ...o, resultsCount: o.count } : o;
      })}
      title={label || facet.displayName}
      customCssClasses={customCssClasses}
      showMoreLimit={showMoreLimit}
      searchable={facet?.options.length > showMoreLimit}
      {...filterGroupProps}
    />
  );
}
