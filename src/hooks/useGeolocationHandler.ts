import { Matcher, SelectableStaticFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '../utils/search-operations';
import { getUserLocation } from '../utils/location-operations';
import { useCallback, useState } from 'react';

const GEOLOCATION_FIELD_ID = 'builtin.location';
const LOCATION_FIELD_IDS = [GEOLOCATION_FIELD_ID, 'builtin.region', 'address.countryCode'];
const METERS_PER_MILE = 1609.344;

/**
 * The props for {@link useGeolocationHandler} hook.
 *
 * @internal
 */
interface GeolocationHandlerArgs {
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
 * Creates a function to collect user's geolocation and, by default, will set
 * a built-in location filter and execute a search.
 *
 * @internal
 *
 * @param props - {@link GeolocationHandlerArgs}
 * @returns - A function to collect and process user's geolocation
 *          - A boolean to indicate if user's geolocation is being fetch
 */
export function useGeolocationHandler({
  geolocationOptions,
  radius = 50,
  handleUserPosition
}: GeolocationHandlerArgs): [() => Promise<void>, boolean] {
  const [isFetchingUserLocation, setIsFetchingUserLocation] = useState<boolean>(false);
  const searchActions = useSearchActions();
  const staticFilters = useSearchState(s => s.filters.static || []);

  const defaultHandleUserPosition = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    const locationFilter: SelectableStaticFilter = {
      displayName: 'Current Location',
      selected: true,
      filter: {
        kind: 'fieldValue',
        fieldId: GEOLOCATION_FIELD_ID,
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
        && LOCATION_FIELD_IDS.includes(filter.filter.fieldId));
    });
    searchActions.setStaticFilters([...nonLocationFilters, locationFilter]);
    executeSearch(searchActions);
  }, [radius, searchActions, staticFilters]);

  const geolocationHandler = useCallback(async () => {
    setIsFetchingUserLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      (handleUserPosition ?? defaultHandleUserPosition)(position);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFetchingUserLocation(false);
    }
  }, [setIsFetchingUserLocation, geolocationOptions, handleUserPosition, defaultHandleUserPosition]);
  return [geolocationHandler, isFetchingUserLocation];
}
