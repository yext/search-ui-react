import { SearchHeadless, SearchIntent } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { updateLocationIfNeeded } from '../__fixtures__/utils/location-operations';

describe('Location Operations updateLocationIfNeeded', () => {
  let searchActions: SearchHeadless;
  beforeEach(() => {
    searchActions = generateMockedHeadless();
  });

  it('fires getUserLocation with NearMe intent', async () => {
    searchActions.setUserLocation = jest.fn();
    const intents: SearchIntent[] = [SearchIntent.NearMe];
    await updateLocationIfNeeded(searchActions, intents);
    expect(searchActions.setUserLocation).toHaveBeenCalled();
  });

  it('does not fire getUserLocation without NearMe intent', async () => {
    searchActions.setUserLocation = jest.fn();
    const intents: SearchIntent[] = [];
    await updateLocationIfNeeded(searchActions, intents);
    expect(searchActions.setUserLocation).not.toHaveBeenCalled();
  });
});