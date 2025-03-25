import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationBias } from '../../src/components/LocationBias';
import { State, LocationBiasMethod, LocationBias as LocationBiasType } from '@yext/search-headless-react';
import * as locationOperations from '../../src/utils/location-operations';
import { mockAnswersHooks, mockAnswersState, RecursivePartial, spyOnActions } from '../__utils__/mocks';
import * as searchOperations from '../../src/utils/search-operations';
import React from 'react';

jest.mock('@yext/search-headless-react');

type LocationBiasState = {
  location: {
    locationBias: LocationBiasType
  }
};

const mockedStateVaDevice: Partial<State> & LocationBiasState = {
  location: {
    locationBias: {
      latitude: 38.89552025579547,
      longitude: -77.06991520330985,
      displayName: 'Arlington, VA',
      method: LocationBiasMethod.Device
    }
  }
};

const mockedStateNyIP: Partial<State> & LocationBiasState = {
  location: {
    locationBias: {
      latitude: 40.741591687843005,
      longitude: -74.00530254443494,
      displayName: 'New York City, NY',
      method: LocationBiasMethod.Ip
    }
  }
};

const mockedStateNoDisplayName: RecursivePartial<State> = {
  location: {
    locationBias: {}
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
    toJSON: function () {
      return {
        accuracy: this.accuracy,
        altitude: this.altitude,
        altitudeAccuracy: this.altitudeAccuracy,
        heading: this.heading,
        latitude: this.latitude,
        longitude: this.longitude,
        speed: this.speed,
      };
    },
  },
  timestamp: 0,
  toJSON: function () {
    return {
      coords: this.coords.toJSON(),
      timestamp: this.timestamp,
    };
  }
};

beforeEach(() => {
  mockAnswersHooks({
    mockedState: mockedStateVaDevice,
    mockedActions: {
      state: mockedStateVaDevice,
      setUserLocation: jest.fn(),
    }
  });
  jest.spyOn(locationOperations, 'getUserLocation').mockResolvedValue(newGeoPosition);
  jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
});

it('renders the proper text (location DisplayName, method, and update btn)', () => {
  render(<LocationBias />);
  const expectedLocationName = mockedStateVaDevice.location.locationBias.displayName;
  const locationNameElement = screen.getByText(expectedLocationName);
  expect(locationNameElement).toBeDefined();

  const expectedMethodMessage = '(based on your device)';
  const basedOnMethodElement = screen.getByText(expectedMethodMessage);
  expect(basedOnMethodElement).toBeDefined();

  const updateLocationButton = screen.getByRole('button', { name: 'Update your location' });
  expect(updateLocationButton).toBeDefined();
});

it('calls setUserLocation with coordinates returned by getUserLocation as params when update location is clicked', async () => {
  const actions = spyOnActions();
  render(<LocationBias />);
  await clickUpdateLocation();

  const expectedCoordinates = {
    latitude: newGeoPosition.coords.latitude,
    longitude: newGeoPosition.coords.longitude
  };

  expect(locationOperations.getUserLocation).toBeCalled();
  expect(actions.setUserLocation).toBeCalledWith(expectedCoordinates);
});

it('updates rendered DisplayName if location changes and update button is clicked', async () => {
  render(<LocationBias />);
  const expectedLocationName = mockedStateVaDevice.location.locationBias.displayName;
  const locationNameElement = screen.getByText(expectedLocationName);
  expect(locationNameElement).toBeDefined();

  mockAnswersState(mockedStateNyIP);
  await clickUpdateLocation();

  expect(searchOperations.executeSearch).toBeCalled();

  const newExpectedLocationName = mockedStateNyIP.location.locationBias.displayName;
  const newLocationNameElement = screen.getByText(newExpectedLocationName);
  expect(newLocationNameElement).toBeDefined();
});

it('renders correct attribution message, device', () => {
  mockAnswersState(mockedStateVaDevice);
  render(<LocationBias />);
  const expectedMethodMessage = '(based on your device)';
  const basedOnMethodElement = screen.getByText(expectedMethodMessage);
  expect(basedOnMethodElement).toBeDefined();
});

it('renders correct attribution message, IP', () => {
  mockAnswersState(mockedStateNyIP);
  render(<LocationBias />);
  const expectedMethodMessage = '(based on your internet address)';
  const basedOnMethodElement = screen.getByText(expectedMethodMessage);
  expect(basedOnMethodElement).toBeDefined();
});

it('renders nothing if there is no display name', () => {
  mockAnswersState(mockedStateNoDisplayName);
  const { container } = render(<LocationBias />);
  expect(container).toBeEmptyDOMElement();
});

async function clickUpdateLocation() {
  const updateLocationButton = screen.getByRole('button', { name: 'Update your location' });
  await userEvent.click(updateLocationButton);
}
