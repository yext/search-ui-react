import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  FilterSearch,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults
} from '@yext/answers-react-components';
import { useEffect } from 'react';
import { Facets, hierarchicalFacetFieldIds } from '../components/Facets';
import { StaticFilters } from '../components/StaticFilters';

export function PeoplePage() {
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setVertical('people');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='min-w-fit pr-4'>
          <Facets />
          <StaticFilters />
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
        </div>
      </div>
    </div>
  );
}

