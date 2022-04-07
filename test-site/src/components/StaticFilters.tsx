import { Filters } from '@yext/answers-react-components';

export function StaticFilters() {
  return (
    <Filters.StaticFilters searchOnChange={true}>
      <Filters.FilterGroup fieldId='c_puppyPreference'>
        <Filters.CollapsibleLabel label='Puppy Preference'/>
        <Filters.CollapsibleSection>
          <Filters.SearchInput />
          <Filters.CheckboxOption value='Marty'/>
          <Filters.CheckboxOption value='Frodo'/>
        </Filters.CollapsibleSection>
      </Filters.FilterGroup>
    </Filters.StaticFilters>
  )
}