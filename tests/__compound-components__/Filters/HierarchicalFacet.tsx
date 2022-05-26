import { Fragment } from 'react';
import { Filters } from '../../../src/components';

export function HierarchicalFacets(args: Filters.HierarchicalFacetProps): JSX.Element {
  const hierarchicalFacetFieldIds = ['hier'];
  return (
    <Filters.FacetsProvider searchOnChange={true}>
      {facets => {
        const filteredFacets = facets.filter(f => f.options.length > 0);
        return (
          <>
            {
              filteredFacets.map(f => {
                if (hierarchicalFacetFieldIds.includes(f.fieldId)) {
                  return <Fragment key={f.fieldId}>
                    <Filters.HierarchicalFacet facet={f} {...args} />
                  </Fragment>;
                }
                return null;
              })
            }
          </>
        );
      }}
    </Filters.FacetsProvider>
  );
}
