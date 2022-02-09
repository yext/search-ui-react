import { useAnswersActions, useAnswersState, LocationBiasMethod } from '@yext/answers-headless-react';
import { executeSearch, getUserLocation } from '../utils/search-operations';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

export interface LocationBiasCssClasses {
  container?: string,
  location?: string,
  source?: string,
  button?: string
}

const builtInCssClasses: LocationBiasCssClasses = {
  container: 'text-sm text-gray-500 text-center m-auto',
  location: 'font-semibold',
  button: 'text-blue-600 cursor-pointer hover:underline focus:underline',
};

export interface LocationBiasProps {
  geolocationOptions?: PositionOptions,
  customCssClasses?: LocationBiasCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function LocationBias({
  geolocationOptions,
  customCssClasses,
  cssCompositionMethod
}: LocationBiasProps): JSX.Element | null {
  const answersActions = useAnswersActions();
  const isVertical = useAnswersState(s => s.meta.searchType) === 'vertical';
  const locationBias = useAnswersState(s => s.location.locationBias);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (!locationBias?.displayName) return null;

  const attributionMessage =
      locationBias?.method === LocationBiasMethod.Ip ? ' (based on your internet address) - '
        : locationBias?.method === LocationBiasMethod.Device ? ' (based on your device) - '
          : ' - ';

  async function handleGeolocationClick() {
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    }
    executeSearch(answersActions, isVertical);
  }

  return (
    <div className={cssClasses.container}>
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
    </div>
  );
}