import { useSearchActions, Matcher, useSearchState, SelectableStaticFilter, Result } from '@yext/search-headless-react';
import {
  AppliedFilters,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  MapboxMap,
  Pagination,
  MapboxMapProps,
  OnDragHandler,
  Coordinate,
  FilterSearch,
} from '@yext/search-ui-react';
import { LngLat, LngLatBounds } from 'mapbox-gl';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { MapPin } from '../components/MapPin';

export interface Location {
  yextDisplayCoordinate?: Coordinate
}

const mapboxOptions: MapboxMapProps<Record<string, unknown>>['mapboxOptions'] = {
  zoom: 10
};

const filterSearchFields = [{ fieldApiName: 'builtin.location', entityType: 'location' }];

export function LocationsPage() {
  const searchActions = useSearchActions();
  const filters = useSearchState(state => state.filters.static);
  useLayoutEffect(() => {
    searchActions.setVertical('KM');
    searchActions.executeVerticalQuery();
  }, [searchActions]);

  const resultsRef = useRef<Array<HTMLDivElement | null>>([]);
  const resultsContainer = useRef<HTMLDivElement>(null);

  const setResultsRef = useCallback((index: number) => {
    if (!resultsRef?.current) return null;
    return (result: HTMLDivElement) => (resultsRef.current[index] = result);
  }, []);

  const onDrag: OnDragHandler = useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] = filters?.filter(f => f.filter.kind !== 'fieldValue' || f.filter.fieldId !== 'builtin.location') ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: 'Near Current Area',
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.location',
          matcher: Matcher.Near,
          value: { ...center, radius }
        }
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    }, [filters, searchActions]);

  const scrollToResult = useCallback((result: Result | undefined) => {
    if (result) {
      const scrollTop = resultsRef.current
        .filter((r, index) => r && result.index ? index < result.index : false)
        .map((elem) => elem?.scrollHeight ?? 0)
        .reduce((total, height) => total + height + 16);
      resultsContainer.current?.scroll({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [resultsRef.current, resultsContainer])

  const markerOptionsOverride = useCallback((selected: boolean) => {
    return {
      color: '#FFB6C1',
      scale: selected ? 1.5 : 1,
    }
  }, [])

  return (
    <div>
      <SearchBar />
      <FilterSearch
        searchFields={filterSearchFields}
        searchOnSelect={true}
        label='FilterSearch Location Filter'
        customCssClasses={
          {
            currentLocationAndInputContainer: 'w-1/5',
            focusedOption: 'bg-red-500'
          }
        }
        showCurrentLocationButton={true}
        geolocationProps={{
          radius: 25,
        }}
      />
      <div className='flex flex-col'>
        <div className='flex items-baseline'>
          <ResultsCount />
          <AppliedFilters />
        </div>
        <div className='h-80 mb-4'>
          <MapboxMap
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY || 'REPLACE_KEY'}
            mapboxOptions={mapboxOptions}
            // markerOptionsOverride={markerOptionsOverride}
            PinComponent={MapPin}
            onDrag={onDrag}
          />
        </div>
        <VerticalResults
          CardComponent={StandardCard}
        />
        <Pagination />
        <LocationBias />
      </div>
    </div>
  );

  /**
   * uncomment this to test side by side view of search results and interactive map pins
   * note that scroll to results do not fully work ONLY on this test-site due to extra height in the StandardCard padding
   */
  // return (
  //   <div className="flex h-96">
  //     <div ref={resultsContainer} className="w-1/4 p-4 overflow-y-auto">
  //       <SearchBar />
  //       <ResultsCount />
  //       <AppliedFilters />
  //       <VerticalResults
  //           setResultsRef={setResultsRef}
  //           CardComponent={StandardCard}
  //         />
  //     </div>
  //     <div className="w-3/4 p-4">
  //       <MapboxMap
  //         mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY || 'REPLACE_KEY'}
  //         mapboxOptions={mapboxOptions}
  //         onDrag={onDrag}
  //         scrollToResult={scrollToResult}
  //         markerOptionsOverride={markerOptionsOverride}
  //       />
  //     </div>
  //   </div>
  // )
}
