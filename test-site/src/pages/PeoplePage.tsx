import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  FilterSearch,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  StaticFilters
} from '@yext/answers-react-components';
import { useLayoutEffect } from 'react';
import { Facets, hierarchicalFacetFieldIds } from '../components/Facets';

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
          <Facets />
          <StaticFilters
            fieldId='c_employeeCountry'
            title='Employee Country'
            filterOptions={[
              { value: 'United States' },
              { value: 'UK' }
            ]}
          />
          <FilterSearch searchFields={[{fieldApiName: 'name', entityType: 'ce_person' }]}/>
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

