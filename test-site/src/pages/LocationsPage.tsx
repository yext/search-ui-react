import { useAnswersActions } from '@yext/answers-headless-react';
import {
  AppliedFilters,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  GoogleMaps,
  Pagination
} from '@yext/answers-react-components';
import { useLayoutEffect } from 'react';

export function LocationsPage() {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setVertical('KM');
  });

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='min-w-fit pr-4'>
        </div>
        <div className='flex-grow'>
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters />
          </div>
          <GoogleMaps 
            apiKey='AIzaSyB5D45ghF1YMfqTLSzWubmlCN1euBVPhFw'
            centerLatitude={37.540778} 
            centerLongitude={-77.433928} 
            defaultZoom={10} 
            showEmptyMap={false}
            locale='en'
            />
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

