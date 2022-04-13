import { Filters } from '../../../src/components';

export function Facets({ searchOnChange = true }: { searchOnChange?: boolean }): JSX.Element {
  return (
    <Filters.Facets searchOnChange={searchOnChange}>
      {facets => {
        const filteredFacets = facets.filter(f => f.options.length > 0);
        return (
          <>
            {filteredFacets.map(f => {
              return (
                <Filters.FilterGroup key={f.fieldId} fieldId={f.fieldId}>
                  <Filters.CollapsibleLabel label={f.displayName} />
                  <Filters.CollapsibleSection>
                    {f.options.map(o =>
                      <Filters.CheckboxOption
                        key={o.displayName}
                        value={o.value}
                        matcher={o.matcher}
                        label={o.displayName}
                      />
                    )}
                  </Filters.CollapsibleSection>
                  {filteredFacets.length > 0 && !searchOnChange && <Filters.ApplyFiltersButton />}
                </Filters.FilterGroup>
              );
            })}
          </>
        );
      }}
    </Filters.Facets>
  );
}
