import { useAnswersActions, useAnswersState, LocationBiasMethod } from '@yext/answers-headless-react';
import { executeSearch } from '../utils/search-operations';
import { getUserLocation } from '../utils/location-operations';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useState } from 'react';
import LoadingIndicator from '../icons/LoadingIndicator';

/**
 * The CSS class interface for the {@link LocationBias} component.
 *
 * @public
 */
export interface LocationBiasCssClasses {
  container?: string,
  location?: string,
  source?: string,
  button?: string,
  loadingIndicatorContainer?: string
}

const builtInCssClasses: LocationBiasCssClasses = {
  container: 'text-sm text-neutral text-center flex justify-center items-center',
  location: 'font-semibold mr-1',
  button: 'text-primary hover:underline focus:underline ml-1',
  loadingIndicatorContainer: 'w-4 h-4 ml-3 shrink-0'
};

/**
 * The props for the {@link LocationBias} component.
 *
 * @public
 */
export interface LocationBiasProps {
  /** Configuration used when collecting the user's location.
   * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
   */
  geolocationOptions?: PositionOptions,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: LocationBiasCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A React Component which displays and collects location information in order to bias searches.
 *
 * @public
 *
 * @param props - {@link LocationBiasProps}
 * @returns A react component for Location Bias
 */
export function LocationBias({
  geolocationOptions,
  customCssClasses,
  cssCompositionMethod
}: LocationBiasProps): JSX.Element | null {
  const answersActions = useAnswersActions();
  const locationBias = useAnswersState(s => s.location.locationBias);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (!locationBias?.displayName) return null;

  const attributionMessage =
      locationBias?.method === LocationBiasMethod.Ip ? ' (based on your internet address) - '
        : locationBias?.method === LocationBiasMethod.Device ? ' (based on your device) - '
          : ' - ';

  async function handleGeolocationClick() {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingLocation(false);
    }
    executeSearch(answersActions);
  }

  return (
    <div className={cssClasses.container}>
      {isFetchingLocation && <div className={cssClasses.loadingIndicatorContainer}/>}
      <span className={cssClasses.location}>
        {locationBias.displayName}
      </span>
      <span className={cssClasses.source}>
        {attributionMessage}
      </span>
      <button
        className={cssClasses.button}
        onClick={handleGeolocationClick}
      >
        Update your location
      </button>
      {isFetchingLocation &&
        <div className={cssClasses.loadingIndicatorContainer}>
          <LoadingIndicator />
        </div>
      }
    </div>
  );
}