import { DisplayableFacet } from '@yext/search-headless-react';
import { HierarchicalFacetProps } from './FacetProps';
import {
  CollapsibleSection,
  FilterGroupProvider,
  HierarchicalFacetDisplay
} from './Filters';
import { FacetTitle } from './FacetTiltle';

/**
 * A component that displays the content of a hierarchical facet.
 *
 * @param props - props to render the component
 * @returns A React component for the content of a hierarchical facet
 *
 * @internal
 */
export function HierarchicalFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  delimiter,
  facet,
  collapsible = true,
  defaultExpanded = true,
  showMoreLimit = 4,
}: HierarchicalFacetProps & { facet: DisplayableFacet }) {
  const options = facet.options || [];
  const transformedOptions = transformOptions ? (transformOptions(options) || []) : options;

  return (
    <FilterGroupProvider fieldId={fieldId} defaultExpanded={!collapsible || defaultExpanded}>
      <FacetTitle
        label={label || facet.displayName}
        customCssClasses={customCssClasses}
        collapsible={collapsible}
      />
      <CollapsibleSection >
        <HierarchicalFacetDisplay
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          facet={{
            ...facet,
            options: transformedOptions,
          }}
          delimiter={delimiter}
          showMoreLimit={showMoreLimit}
          customCssClasses={customCssClasses}
        />
      </CollapsibleSection>
    </FilterGroupProvider>
  );
}
