import { Filters } from '@yext/answers-react-components';
import { Fragment } from 'react';
import { Divider } from './Divider';

export const hierarchicalFacetFieldIds = ['c_hierarchicalFacet'];

export function Facets() {
  return (
    <Filters.Facets className='min-w-fit pr-4' searchOnChange={true}>
      {facets => {
        const filteredFacets = facets.filter(f => f.options.length > 0);
        filteredFacets.sort((a,b) => {
          const aValue = hierarchicalFacetFieldIds.includes(a.fieldId) ? 1 : 0;
          const bValue = hierarchicalFacetFieldIds.includes(b.fieldId) ? 1 : 0
          return bValue - aValue;
        });
        return (
          <>
            {
              filteredFacets.map((f, i) => {
                if (hierarchicalFacetFieldIds.includes(f.fieldId)) {
                  return <Fragment key={f.fieldId}>
                    <Filters.HierarchicalFacet facet={f}  />
                    {(i < facets.length - 1) && <Divider />}
                  </Fragment>
                }

                return (
                  <Filters.FilterGroup key={f.fieldId}>
                    <Filters.CollapsibleLabel label={f.displayName} />
                    <Filters.CollapsibleSection>
                      <Filters.SearchInput />
                      {f.options.map(o =>
                        <Filters.CheckboxOption
                          key={o.displayName}
                          value={o.value}
                          fieldId={f.fieldId}
                        />
                      )}
                    </Filters.CollapsibleSection>
                    {(i < facets.length - 1) && <Divider />}
                  </Filters.FilterGroup>
                )
              })
            }
            {filteredFacets.length > 0 && <Filters.ApplyFiltersButton />}
          </>
        )
      }}
    </Filters.Facets>
  )
}