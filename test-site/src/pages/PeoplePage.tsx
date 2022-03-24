import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults
} from '@yext/answers-react-components';
import { useEffect } from 'react';
import { Facets } from '../components/Facets';

export function PeoplePage() {
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setVertical('people');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <Facets />
        <div className='flex-grow'>
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={StandardCard}
          />
        </div>
      </div>
    </div>
  );
}