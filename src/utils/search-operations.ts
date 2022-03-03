import {
  AnswersActions,
  AutocompleteResponse,
  SearchIntent,
  SearchTypeEnum
} from '@yext/answers-headless-react';

const defaultGeolocationOptions: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 6000,
  maximumAge: 300000,
};

/**
 * If the provided search intents include a 'NEAR_ME' intent and there's no existing
 * user's location in state, retrieve and store user's location in headless state.
 *
 * @public
 */
export async function updateLocationIfNeeded(
  answersActions: AnswersActions,
  intents: SearchIntent[],
  geolocationOptions?: PositionOptions
): Promise<void> {
  if (intents.includes(SearchIntent.NearMe) && !answersActions.state.location.userLocation) {
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Executes a universal/vertical search.
 *
 * @public
 */
export async function executeSearch(answersActions: AnswersActions): Promise<void> {
  const isVertical = answersActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    isVertical
      ? answersActions.executeVerticalQuery()
      : answersActions.executeUniversalQuery();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? 'vertical': 'universal'} search.\n`, e);
  }
}

/**
 * Executes a universal/vertical autocomplete search.
 *
 * @public
 */
export async function executeAutocomplete(
  answersActions: AnswersActions
): Promise<AutocompleteResponse | undefined> {
  const isVertical = answersActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    return isVertical
      ? answersActions.executeVerticalAutocomplete()
      : answersActions.executeUniversalAutocomplete();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? 'vertical': 'universal'} autocomplete search.\n`, e);
  }
}

/**
 * Get search intents of the current query stored in headless using autocomplete request.
 *
 * @public
 */
export async function getSearchIntents(
  answersActions: AnswersActions
): Promise<SearchIntent[] | undefined> {
  const results = await executeAutocomplete(answersActions);
  return results?.inputIntents;
}

/**
 * Retrieves user's location using nagivator.geolocation API.
 *
 * @public
 */
export async function getUserLocation(geolocationOptions?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => {
          console.error('Error occured using geolocation API. Unable to determine user\'s location.');
          reject(err);
        },
        { ...defaultGeolocationOptions, ...geolocationOptions }
      );
    } else {
      reject('No access to geolocation API. Unable to determine user\'s location.');
    }
  });
}
