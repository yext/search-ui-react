import { Matcher, SelectableStaticFilter, useSearchActions, useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '../utils/search-operations';
import { getUserLocation } from '../utils/location-operations';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useCallback, useState } from 'react';
import LoadingIndicator from '../icons/LoadingIndicator';
import { YextIcon } from '../icons/YextIcon';

/**
 * The CSS class interface for the Geolocation component.
 *
 * @public
 */
export interface GeolocationCssClasses {
  geolocationContainer?: string,
  button?: string,
  iconContainer?: string
}

const builtInCssClasses: Readonly<GeolocationCssClasses> = {
  geolocationContainer: 'text-sm text-neutral text-center justify-center items-center flex flex-row',
  button: 'text-primary font-semibold hover:underline focus:underline',
  iconContainer: 'w-4 ml-2'
};

/**
 * The props for the Geolocation component.
 *
 * @public
 */
export interface GeolocationProps {
  /**
   * Configuration used when collecting the user's location.
   * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
   */
  geolocationOptions?: PositionOptions,
  /**
   * The radius, in miles, around the user's location to find results. Defaults to 50.
   * If location accuracy is low, a larger radius may be used automatically.
   */
  radius?: number,
  /** The label for the button. Defaults to 'Use my location'. */
  label?: string,
  /** Custom icon component to display along with the button. */
  GeolocationIcon?: React.FunctionComponent,
  /** A function which is called when the geolocation button is clicked. */
  handleClick?: (position: GeolocationPosition) => void,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: GeolocationCssClasses
}

const LOCATION_FIELD_ID = 'builtin.location';
const METERS_PER_MILE = 1609.344;

/**
 * A React Component which collects location information to create a
 * location filter and perform a new search.
 *
 * @public
 *
 * @param props - {@link GeolocationProps}
 * @returns A react component for geolocation
 */
export function Geolocation({
  geolocationOptions,
  radius = 50,
  label = 'Use my location',
  //TODO: replace default icon with SVG create from design team
  GeolocationIcon = YextIcon,
  handleClick,
  customCssClasses,
}: GeolocationProps): JSX.Element | null {
  const searchActions = useSearchActions();
  const staticFilters = useSearchState(s => s.filters.static || []);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const handleGeolocationClick = useCallback(async () => {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      if (handleClick) {
        handleClick(position);
        return;
      }
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
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFetchingLocation(false);
    }
  }, [geolocationOptions, handleClick, radius, searchActions, staticFilters]);

  return (
    <div className={cssClasses.geolocationContainer}>
      <button className={cssClasses.button} onClick={handleGeolocationClick}>
        {label}
      </button>
      <div className={cssClasses.iconContainer}>
        {isFetchingLocation ? <LoadingIndicator /> : <GeolocationIcon />}
      </div>
    </div>
  );
}