import { SearchIntent } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { updateLocationIfNeeded } from '../__fixtures__/utils/location-operations';

describe('Location Operations updateLocationIfNeeded', () => {

  it('fires setUserLocation with NearMe intent', async () => {
    const searchActions = generateMockedHeadless();
    searchActions.setUserLocation = jest.fn();
    const intents: SearchIntent[] = [SearchIntent.NearMe];
    await updateLocationIfNeeded(searchActions, intents);
    expect(searchActions.setUserLocation).toHaveBeenCalled();
  });

  it('does not fire setUserLocation without NearMe intent', async () => {
    const searchActions = generateMockedHeadless();
    searchActions.setUserLocation = jest.fn();
    const intents: SearchIntent[] = [];
    await updateLocationIfNeeded(searchActions, intents);
    expect(searchActions.setUserLocation).not.toHaveBeenCalled();
  });

  it('does not fire setUserLocation if already set', async () => {
    const searchActions = generateMockedHeadless({
      location: {
        userLocation: {
          latitude: 38.9072,
          longitude: -77.0369
        }
      }
    });
    searchActions.setUserLocation = jest.fn();
    const intents: SearchIntent[] = [SearchIntent.NearMe];
    await updateLocationIfNeeded(searchActions, intents);
    expect(searchActions.setUserLocation).not.toHaveBeenCalled();
  });
});