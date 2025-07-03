import { useTranslation } from 'react-i18next';
import { useSearchActions, useSearchState, LocationBiasMethod } from '@yext/search-headless-react';
import { executeSearch } from '../utils';
import { getUserLocation } from '../utils';
import { twMerge, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import React, { useState } from 'react';
import LoadingIndicator from '../icons/LoadingIndicator';

/**
 * The CSS class interface for the {@link LocationBias} component.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 */
export interface LocationBiasCssClasses {
  locationBiasContainer?: string,
  location?: string,
  source?: string,
  button?: string,
  loadingIndicatorContainer?: string
}

const builtInCssClasses: Readonly<LocationBiasCssClasses> = {
  locationBiasContainer: 'text-sm text-neutral text-center justify-center items-center flex flex-col lg:flex-row',
  location: 'font-semibold lg:ml-7',
  source: 'ml-3 lg:ml-0 whitespace-pre',
  button: 'text-primary hover:underline focus:underline ml-7 lg:ml-0',
  loadingIndicatorContainer: 'w-4 h-4 ml-3 shrink-0'
};

/**
 * The props for the {@link LocationBias} component.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 */
export interface LocationBiasProps {
  /** Configuration used when collecting the user's location.
   * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
   */
  geolocationOptions?: PositionOptions,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: LocationBiasCssClasses
}

/**
 * A React Component which displays and collects location information in order to bias searches.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 *
 * @param props - {@link LocationBiasProps}
 * @returns A react component for Location Bias
 */
export function LocationBias({
  geolocationOptions,
  customCssClasses
}: LocationBiasProps): JSX.Element | null {
  const { t } = useTranslation();
  const searchActions = useSearchActions();
  const locationBias = useSearchState(s => s.location.locationBias);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const loadingIndicatorCss = twMerge(cssClasses.loadingIndicatorContainer, (!isFetchingLocation && 'invisible'));

  if (!locationBias?.displayName) return null;

  const attributionMessage =
      locationBias?.method === LocationBiasMethod.Ip ? t('basedOnYourInternetAddress')
        : locationBias?.method === LocationBiasMethod.Device ? t('basedOnYourDevice')
          : '';

  async function handleGeolocationClick() {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingLocation(false);
    }
    executeSearch(searchActions);
  }

  return (
    <div className={cssClasses.locationBiasContainer}>
      <span className={cssClasses.location}>
        {locationBias.displayName}
      </span>
      <span className={cssClasses.source}>
        {attributionMessage}
        <span className='invisible lg:visible'> - </span>
      </span>
      <div className='flex flex-row items-center'>
        <button
          className={cssClasses.button}
          onClick={handleGeolocationClick}
        >
          {t('updateYourLocation')}
        </button>
        <div className={loadingIndicatorCss}>
          <LoadingIndicator />
        </div>
      </div>
    </div>
  );
}