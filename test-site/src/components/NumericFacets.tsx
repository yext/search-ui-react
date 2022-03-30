import { Filters } from '@yext/answers-react-components';
import { Fragment } from 'react';
import { Divider } from './Divider';


export function NumericFacets() {
  return (
    <Filters.Facets searchOnChange={true}>
      {facets => {
        return (
          <>
            {
              facets.map((f, i) => {
                return (
                  <Filters.FilterGroup key={f.fieldId} defaultFieldId={f.fieldId}>
                    <Filters.CollapsibleLabel label={f.displayName} />
                    <Filters.CollapsibleSection>
                      {f.options.map(o =>
                        // <Filters.CheckboxOption
                        //   key={o.displayName}
                        //   value={o.value}
                        // />
                        <>{o.displayName}</>
                      )}
                      {(f.fieldId === 'price.value') && <Filters.RangeInput/>}
                    </Filters.CollapsibleSection>
                    {(i < facets.length - 1) && <Divider />}
                  </Filters.FilterGroup>
                )
              })
            }
          </>
        )
      }}
    </Filters.Facets>
  )
}