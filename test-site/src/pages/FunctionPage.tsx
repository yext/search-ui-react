import { useLayoutEffect } from 'react';
import { useSearchActions } from '@yext/search-headless-react';
import {
  ResultsCount,
  SearchBar,
  VerticalResults,
  Pagination,
} from '@yext/search-ui-react';
import { FunctionCard } from '../components/FunctionCard';

export function FunctionPage() {
  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    searchActions.setVertical('function_vertical');
    searchActions.executeVerticalQuery();
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='flex-grow'>
        <ResultsCount />
        <VerticalResults
        CardComponent={FunctionCard}
        />
        <Pagination />
        </div>
      </div>
    </div>
  );
}