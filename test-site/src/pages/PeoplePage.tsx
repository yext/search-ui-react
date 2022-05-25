import { useLayoutEffect } from 'react';
import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  FilterSearch,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  StaticFilters,
  Facets,
  ApplyFiltersButton
} from '@yext/answers-react-components';

export const hierarchicalFacetFieldIds = ['c_hierarchicalFacet'];

export function PeoplePage() {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setVertical('people');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='min-w-fit pr-4'>
          <Facets
            searchOnChange={false}
          />
          <StaticFilters
            fieldId='c_employeeCountry'
            title='Employee Country'
            filterOptions={[
              { value: 'United States' },
              { value: 'UK' }
            ]}
            searchOnChange={false}
          />
          <FilterSearch searchFields={[{fieldApiName: 'name', entityType: 'ce_person' }]}/>
          <ApplyFiltersButton />
        </div>
        <div className='flex-grow'>
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters hierarchicalFacetsFieldIds={hierarchicalFacetFieldIds}/>
          </div>
          <VerticalResults
            CardComponent={StandardCard}
          />
          <LocationBias />
        </div>
      </div>
    </div>
  );
}
