import { FilterGroup } from './FilterGroup';
import { DisplayableFacet } from '@yext/search-headless-react';
import { NumericalFacetProps } from './FacetProps';
import { RangeInput } from './Filters';

const DEFAULT_RANGE_INPUT_PREFIX = <>$</>;

/**
 * A component that displays the content of a numerical facet.
 *
 * @param props - props to render the component
 * @returns A React component for the content of a standard facet
 *
 * @internal
 */
export function NumericalFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  getFilterDisplayName,
  facet,
  showMoreLimit = 10,
  showOptionCounts = false,
  inputPrefix = DEFAULT_RANGE_INPUT_PREFIX,
  ...filterGroupProps
}: NumericalFacetProps & { facet: DisplayableFacet }) {
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
    >
      <RangeInput
        getFilterDisplayName={getFilterDisplayName}
        inputPrefix={inputPrefix}
        customCssClasses={customCssClasses}
      />
    </FilterGroup>
  );
}
