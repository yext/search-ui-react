import { DisplayableFacet } from '@yext/search-headless-react';
import { HierarchicalFacetProps } from './FacetProps';
import {
  builtInCollapsibleLabelCssClasses,
  CollapsibleLabel, CollapsibleLabelCssClasses,
  CollapsibleSection,
  FilterGroupProvider,
  HierarchicalFacetDisplay
} from './Filters';
import { useMemo } from 'react';
import { twMerge } from '../hooks/useComposedCssClasses';

/**
 * A component that displays the content of a hierarchical facet.
 *
 * @param props - props to render the component
 * @returns A React component for the content of a standard facet
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

  const collapsibleLabelCssClasses: CollapsibleLabelCssClasses = useMemo(() => {
    return {
      label: customCssClasses?.titleLabel
    };
  }, [customCssClasses]);

  function renderTitle() {
    const facetLabel = label || facet.displayName;
    return collapsible
      ? <CollapsibleLabel label={facetLabel} customCssClasses={collapsibleLabelCssClasses} />
      : (facetLabel && <div className={twMerge(
        'mb-4', builtInCollapsibleLabelCssClasses.label, collapsibleLabelCssClasses.label)}>
        {facetLabel}
      </div>);
  }

  return (
    <FilterGroupProvider fieldId={fieldId} defaultExpanded={!collapsible || defaultExpanded}>
      {renderTitle()}
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
