import { useSearchActions, Matcher, useSearchState, SelectableStaticFilter } from '@yext/search-headless-react';
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
  Coordinate
} from '@yext/search-ui-react';
import { LngLat, LngLatBounds } from 'mapbox-gl';
import { useCallback, useLayoutEffect } from 'react';
import { MapPin } from '../components/MapPin';

export interface Location {
  yextDisplayCoordinate?: Coordinate
}

const mapboxOptions: MapboxMapProps<Location>['mapboxOptions'] = {
  zoom: 10
};

export function LocationsPage() {
  const searchActions = useSearchActions();
  const filters = useSearchState(state => state.filters.static);
  useLayoutEffect(() => {
    searchActions.setVertical('KM');
    searchActions.executeVerticalQuery();
  }, [searchActions]);

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
  return (
    <div>
      <SearchBar />
      <div className='flex flex-col'>
        <div className='flex items-baseline'>
          <ResultsCount />
          <AppliedFilters />
        </div>
        <div className='h-80 mb-4'>
          <MapboxMap
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY || 'REPLACE_KEY'}
            mapboxOptions={mapboxOptions}
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
}