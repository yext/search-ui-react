import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  NumericalFacets,
  Pagination
} from '@yext/search-ui-react';
import { useLayoutEffect } from 'react';

export function ProductsPage() {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setVertical('products');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='w-56 shrink-0 mr-5'>
          <NumericalFacets />
        </div>
        <div className='flex-grow'>
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={StandardCard}
          />
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </div>
  );
}

