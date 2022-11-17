
import { Matcher, SelectableStaticFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '../utils/search-operations';
import { getUserLocation } from '../utils/location-operations';
import { useCallback } from 'react';

const LOCATION_FIELD_ID = 'builtin.location';
const METERS_PER_MILE = 1609.344;

/**
 * The props for {@link useGeolocationHandler} hook.
 *
 * @internal
 */
interface GeolocationhandlerProps {
  /** A React dispatch function use to update the status of fetching user's location. */
  setIsFetchingLocation: React.Dispatch<React.SetStateAction<boolean>>,
  /** Configuration used when collecting the user's location. */
  geolocationOptions?: PositionOptions,
  /**
   * The radius, in miles, around the user's location to find results. Defaults to 50.
   * If location accuracy is low, a larger radius may be used automatically.
   */
  radius?: number,
  /** Custom handler function to call after user's position is successfully determined. */
  handleUserPosition?: (position: GeolocationPosition) => void
}

/**
 * Returns a function that will collect user's geolocation and, by default, will set
 * a built-in location filter and execute a search.
 *
 * @internal
 *
 * @param props - {@link GeolocationProps}
 * @returns A function to collect and process user's geolocation
 */
export function useGeolocationHandler({
  setIsFetchingLocation,
  geolocationOptions,
  radius = 50,
  handleUserPosition
}: GeolocationhandlerProps): () => Promise<void> {
  const searchActions = useSearchActions();
  const staticFilters = useSearchState(s => s.filters.static || []);

  const defaultHandleUserPosition = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    const locationFilter: SelectableStaticFilter = {
      displayName: 'Current Location',
      selected: true,
      filter: {
        kind: 'fieldValue',
        fieldId: LOCATION_FIELD_ID,
        matcher: Matcher.Near,
        value: {
          lat: latitude,
          lng: longitude,
          radius: Math.max(accuracy, radius * METERS_PER_MILE)
        },
      }
    };
    const nonLocationFilters = staticFilters.filter(filter => {
      return !(filter.filter.kind === 'fieldValue'
        && filter.filter.fieldId === LOCATION_FIELD_ID);
    });
    searchActions.setStaticFilters([...nonLocationFilters, locationFilter]);
    executeSearch(searchActions);
  }, [radius, searchActions, staticFilters]);

  return useCallback(async () => {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      (handleUserPosition ?? defaultHandleUserPosition)(position);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFetchingLocation(false);
    }
  }, [setIsFetchingLocation, geolocationOptions, handleUserPosition, defaultHandleUserPosition]);
}
