import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import { LocationBias } from "../../src/components/LocationBias";
import { State, LocationBiasMethod, useAnswersActions } from "@yext/answers-headless-react";
import * as locationOperations from "../../src/utils/location-operations";
import { mockAnswersHooks, mockAnswersState, spyOnActions } from "../__utils__/mocks";
import * as searchOperations from "../../src/utils/search-operations";

jest.mock("@yext/answers-headless-react");

const mockedStateVaDevice: Partial<State> = {
  location: {
    locationBias: {
      latitude: 38.89552025579547,
      longitude: -77.06991520330985,
      displayName: 'Arlington, VA', 
      method: LocationBiasMethod.Device
    }
  }
}

const mockedStateNyIP: Partial<State> = {
  location: {
    locationBias: {
      latitude: 40.741591687843005,
      longitude: -74.00530254443494,
      displayName: 'New York City, NY', 
      method: LocationBiasMethod.Ip
    }
  }
}

const mockedStateNoDisplayName: Partial<State> = {
  location: {
    locationBias: {
      latitude: null,
      longitude: null,
      displayName: null, 
      method: null
    }
  },
}

const newGeoPosition = {
  coords: {
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 40.741591687843005,
    longitude: -74.00530254443494,
    speed: null,
  },
timestamp: null
};

describe("LocationBias", () => {
  beforeEach(() => {
    mockAnswersHooks({
      mockedState: mockedStateVaDevice,
      mockedActions: {
        state: mockedStateVaDevice,
        setUserLocation: jest.fn(),
      } 
    });
    jest.spyOn(locationOperations, "getUserLocation").mockImplementation(async ()=> {
      return Promise.resolve(newGeoPosition);
    });
    jest.spyOn(searchOperations, "executeSearch").mockImplementation();
    // jest.spyOn(searchOperations, "executeSearch").mockImplementation(()=> new Promise(()=>null));
  });

  it("Proper text is rendered (Location name, method, and update btn)", () => {
    render(<LocationBias />);
    const expectedLocationName = mockedStateVaDevice.location.locationBias.displayName;
    const locationNameElement = screen.getByText(expectedLocationName);
    expect(locationNameElement).toBeDefined();

    const expectedMethodMessage = "(based on your device) -";
    const basedOnMethodElement = screen.getByText(expectedMethodMessage);
    expect(basedOnMethodElement).toBeDefined();

    const updateLocationButton = screen.getByText("Update your location");
    expect(updateLocationButton).toBeDefined();
  })

  it("On update location click, setUserLocation is called with params being coordinates returned by getUserLocation", async () => {
    const actions = spyOnActions();
    render(<LocationBias />)
    clickUpdateLocation();

    const expectedCoordinates = {
      latitude: newGeoPosition.coords.latitude,
      longitude: newGeoPosition.coords.longitude
    }
    
    await waitFor(() => {
      expect(locationOperations.getUserLocation).toBeCalled();
      expect(actions.setUserLocation).toBeCalledWith(expectedCoordinates);
    })
  });

  it('On location change, clicking "Update your location" updates rendered location name', async () => {
    render(<LocationBias />);
    const expectedLocationName = mockedStateVaDevice.location.locationBias.displayName; 
    const locationNameElement = screen.getByText(expectedLocationName);
    expect(locationNameElement).toBeDefined();

    mockAnswersState(mockedStateNyIP);
    clickUpdateLocation();

    await waitFor(() => {
      expect(searchOperations.executeSearch).toBeCalled();
    })

    const newExpectedLocationName = mockedStateNyIP.location.locationBias.displayName; 
    const newLocationNameElement = screen.getByText(newExpectedLocationName);
    expect(newLocationNameElement).toBeDefined();
  });
});

it('Correct device attribution message rendered, device', () => {
  mockAnswersState(mockedStateVaDevice);
  render(<LocationBias />);
  const expectedMethodMessage = "(based on your device) -";
  const basedOnMethodElement = screen.getByText(expectedMethodMessage);
  expect(basedOnMethodElement).toBeDefined();
})

it('Correct device attribution message rendered, IP', () => {
  mockAnswersState(mockedStateNyIP);
  render(<LocationBias />);
  const expectedMethodMessage = "(based on your internet address) -";
  const basedOnMethodElement = screen.getByText(expectedMethodMessage);
  expect(basedOnMethodElement).toBeDefined();
})

it('Nothing renders if there is no display name', () => {
  mockAnswersState(mockedStateNoDisplayName);
  render(<LocationBias />);

  const updateLocationButton = screen.queryByText("Update your location");
  expect(updateLocationButton).toBeNull();
});

function clickUpdateLocation() {
  const updateLocationButton = screen.getByText("Update your location");
  fireEvent.click(updateLocationButton);
}