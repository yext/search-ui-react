import {
  AnswersActions,
  LatLong,
  SearchIntent,
} from '@yext/answers-headless-react';

let isFetching = false;
let userLocation: LatLong = {
  latitude: 38.9072,
  longitude: -77.0369
};

export async function updateLocationIfNeeded(
  answersActions: AnswersActions,
  intents: SearchIntent[],
  _geolocationOptions?: PositionOptions
): Promise<void> {
  if (intents.includes(SearchIntent.NearMe) && !answersActions.state.location.userLocation && !isFetching) {
    answersActions.setUserLocation(userLocation);
  }
}

export async function getUserLocation(_geolocationOptions?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, _) => {
    if (!isFetching) {
      resolve({
        coords: userLocation,
        timestamp: new Date().getTime()
      } as GeolocationPosition);
    }
  });
}

export function decorator(story, { parameters }) {
  if (parameters?.geoLocation) {
    const geoLocation = parameters.geoLocation;
    if (geoLocation.isFetching) {
      isFetching = geoLocation.isFetching;
    }
    if (geoLocation.userLocation) {
      userLocation = geoLocation.userLocation;
    }
  }
  return story();
}
