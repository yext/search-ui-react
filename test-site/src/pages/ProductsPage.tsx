import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias
} from '@yext/answers-react-components';
import { useEffect } from 'react';
import { NumericFacets } from '../components/NumericFacets';

export function ProductsPage() {
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setVertical('products');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='min-w-fit pr-4'>
          <NumericFacets />
        </div>
        <div className='flex-grow'>
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters />
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

