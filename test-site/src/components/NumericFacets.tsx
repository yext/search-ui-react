import { NumberRangeValue } from '@yext/answers-headless-react';
import { Filters } from '@yext/answers-react-components';
import { Divider } from './Divider';


export function NumericFacets() {
  return (
    <Filters.FacetsProvider searchOnChange={true}>
      {facets => {
        return (
          <>
            {
              facets.map((f, i) => {
                return (
                  <Filters.FilterGroupProvider key={f.fieldId} fieldId={f.fieldId}>
                    <Filters.CollapsibleLabel label={f.displayName} />
                    <Filters.CollapsibleSection>
                      {f.options.map(o =>
                        <Filters.CheckboxOption
                          key={o.displayName}
                          value={o.value}
                          matcher={o.matcher}
                          displayName={o.displayName}
                        />
                      )}
                      {(f.fieldId === 'price.value') && <Filters.RangeInput getFilterDisplayName={getFilterDisplayName} inputPrefix={<>$</>}/>}
                    </Filters.CollapsibleSection>
                    {(i < facets.length - 1) && <Divider />}
                  </Filters.FilterGroupProvider>
                )
              })
            }
          </>
        )
      }}
    </Filters.FacetsProvider>
  )
}

/**
 * Creates the filter's display name based on the number range.
 */
 function getFilterDisplayName(numberRange: NumberRangeValue) {
  const start = numberRange.start;
  const end = numberRange.end;

  if (start && end) {
    return `$${start.value} - $${end.value}`;
  } else if (start && !end) {
    return `Over $${start.value}`;
  } else if (end && !start) {
    return `Up to $${end.value}`;
  }
  return '';
}