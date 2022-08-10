import { SearchIntent, useSearchActions } from '@yext/search-headless-react';
import { getUserLocation, updateLocationIfNeeded } from '../../src/utils/location-operations';

describe('Location Operations updateLocationIfNeeded', () => {
  it('fires getUserLocation with NearMe intent', async () => {
    const searchActions = useSearchActions();
    const intents: SearchIntent[] = [SearchIntent.NearMe];
    await updateLocationIfNeeded(searchActions, intents);
    expect(getUserLocation).toHaveBeenCalled();
  });

  it('does not fire getUserLocation without NearMe intent', async () => {
    const searchActions = useSearchActions();
    const intents: SearchIntent[] = [];
    await updateLocationIfNeeded(searchActions, intents);
    expect(getUserLocation).not.toHaveBeenCalled();
  });

  it('does not fire getUserLocation if location already set', async () => {
    const searchActions = useSearchActions();
    searchActions.setUserLocation({
      latitude: 38.9072,
      longitude: -77.0369
    });
    const intents: SearchIntent[] = [SearchIntent.NearMe];
    await updateLocationIfNeeded(searchActions, intents);
    expect(getUserLocation).not.toHaveBeenCalled();
  });
});