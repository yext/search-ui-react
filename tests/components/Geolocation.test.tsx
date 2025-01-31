import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Geolocation } from '../../src/components/Geolocation';
import { Matcher, SelectableStaticFilter, State } from '@yext/search-headless-react';
import * as locationOperations from '../../src/utils/location-operations';
import { mockAnswersHooks, mockAnswersState, spyOnActions } from '../__utils__/mocks';
import React from 'react';

jest.mock('@yext/search-headless-react');

const mockedState: Partial<State> = {
  filters: {
    static: []
  },
  vertical: {
    verticalKey: 'jobs',
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  }
};

const mockedStateWithFilters: Partial<State> = {
  ...mockedState,
  filters: {
    static: [
      {
        displayName: 'Some Location',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.location',
          matcher: Matcher.Near,
          value: {
            lat: 1,
            lng: 1,
            radius: 10
          },
        }
      },
      {
        displayName: 'Current Location',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.location',
          matcher: Matcher.Near,
          value: {
            lat: 2,
            lng: 3,
            radius: 10
          },
        }
      },
      {
        displayName: 'Virginia, US',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.region',
          matcher: Matcher.Equals,
          value: 'US-VA',
        }
      },
      {
        displayName: 'United States',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'address.countryCode',
          matcher: Matcher.Equals,
          value: 'US',
        }
      },
      {
        displayName: 'My name',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'employeeName',
          matcher: Matcher.Equals,
          value: 'Bob',
        }
      }
    ]
  }
};

const newGeoPosition: GeolocationPosition = {
  coords: {
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 40.741591687843005,
    longitude: -74.00530254443494,
    speed: null,
    toJSON(): any {
      return JSON.stringify(this);
    }
  },
  timestamp: 0,
  toJSON(): any {
    return JSON.stringify(this);
  }
};

const newGeoPositionWithLowAccuracy: GeolocationPosition = {
  coords: {
    ...newGeoPosition.coords,
    accuracy: 100000,
  },
  timestamp: 0,
  toJSON(): any {
    return JSON.stringify(this);
  }
};

beforeEach(() => {
  mockAnswersHooks({
    mockedState,
    mockedActions: {
      state: mockedState,
      setStaticFilters: jest.fn(),
      executeVerticalQuery: jest.fn()
    }
  });
  jest.spyOn(locationOperations, 'getUserLocation').mockResolvedValue(newGeoPosition);
});

function renderElement(element: React.ReactElement) {
  return React.act(() => render(element));
}

it('renders custom label when provided', () => {
  renderElement(<Geolocation label='Click me!' />);
  const updateLocationButton = screen.getByRole('button', { name: 'Click me!' });
  expect(updateLocationButton).toBeDefined();
});

it('renders custom icon when provided', () => {
  renderElement(<Geolocation GeolocationIcon={() => <img src="graphic1.png" alt="Custom Icon" />} />);
  const LocationIcon = screen.getByAltText('Custom Icon');
  expect(LocationIcon).toBeDefined();
});

describe('custom click handler', () => {
  it('executes handleClick when user\'s location is successfully determined', async () => {
    const mockedHandleClickFn = jest.fn();
    const actions = spyOnActions();
    await renderElement(<Geolocation handleClick={mockedHandleClickFn} />);
    await clickUpdateLocation();

    expect(mockedHandleClickFn).toHaveBeenCalledWith(newGeoPosition);
    expect(actions.executeVerticalQuery).not.toBeCalled();
  });

  it('does not execute handleClick when error occurs from collecting user\'s location', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    jest.spyOn(locationOperations, 'getUserLocation').mockRejectedValue('mocked error!');
    const mockedHandleClickFn = jest.fn();
    render(<Geolocation handleClick={mockedHandleClickFn} />);
    await clickUpdateLocation();

    expect(consoleWarnSpy).toBeCalledWith('mocked error!');
    expect(mockedHandleClickFn).not.toBeCalled();
  });
});

describe('default click handler', () => {
  it('sets a location filter using provided radius', async () => {
    const actions = spyOnActions();
    render(<Geolocation radius={10} />);
    await clickUpdateLocation();

    const expectedLocationFilter: SelectableStaticFilter = createLocationFilter(10 * 1609.344);
    expect(actions.setStaticFilters).toBeCalledWith([expectedLocationFilter]);
  });

  it('sets a location filter with user\'s coordinates in static filters state when clicked', async () => {
    const actions = spyOnActions();
    render(<Geolocation />);
    await clickUpdateLocation();

    const expectedLocationFilter: SelectableStaticFilter = createLocationFilter();
    expect(locationOperations.getUserLocation).toBeCalled();
    expect(actions.setStaticFilters).toBeCalledWith([expectedLocationFilter]);
  });

  it('replaces existing location filters with a new location filter in static filters state', async () => {
    mockAnswersState(mockedStateWithFilters);
    const actions = spyOnActions();
    render(<Geolocation />);
    await clickUpdateLocation();

    const expectedStaticFilters = [
      {
        displayName: 'My name',
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: 'employeeName',
          matcher: Matcher.Equals,
          value: 'Bob',
        }
      },
      createLocationFilter()
    ];
    expect(actions.setStaticFilters).toBeCalledWith(expectedStaticFilters);
  });

  it('sets a location filter using a larger radius than provided value due to low accuracy of user coordinate', async () => {
    jest.spyOn(locationOperations, 'getUserLocation').mockResolvedValue(newGeoPositionWithLowAccuracy);
    const actions = spyOnActions();
    render(<Geolocation radius={10} />);
    await clickUpdateLocation();

    const accuracy = newGeoPositionWithLowAccuracy.coords.accuracy;
    const expectedLocationFilter: SelectableStaticFilter = createLocationFilter(accuracy);
    expect(actions.setStaticFilters).toBeCalledWith([expectedLocationFilter]);
  });

  it('executes a new search when clicked', async () => {
    const actions = spyOnActions();
    render(<Geolocation />);
    await clickUpdateLocation();

    expect(actions.executeVerticalQuery).toBeCalled();
  });

  it('does not execute default handleClick when error occurs from collecting user\'s location', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    jest.spyOn(locationOperations, 'getUserLocation').mockRejectedValue('mocked error!');
    const actions = spyOnActions();
    render(<Geolocation />);
    await clickUpdateLocation();

    expect(consoleWarnSpy).toBeCalledWith('mocked error!');

    expect(actions.setStaticFilters).not.toBeCalled();
    expect(actions.executeVerticalQuery).not.toBeCalled();
  });
});

async function clickUpdateLocation() {
  const updateLocationButton = screen.getByRole('button');
  await waitFor(() => userEvent.click(updateLocationButton));
}

function createLocationFilter(radius: number = 50 * 1609.344): SelectableStaticFilter {
  return {
    displayName: 'Current Location',
    selected: true,
    filter: {
      kind: 'fieldValue',
      fieldId: 'builtin.location',
      matcher: Matcher.Near,
      value: {
        lat: newGeoPosition.coords.latitude,
        lng: newGeoPosition.coords.longitude,
        radius
      },
    }
  };
}
