import {fireEvent, render, screen} from "@testing-library/react";
import { LocationBias } from "../../src/components/LocationBias";
import { State, LocationBiasMethod } from "@yext/answers-headless-react";
import { getUserLocation } from "../../src/utils/location-operations";

import { mockAnswersState } from "../__utils__/mocks";

const mockedState_VaFromDevice: Partial<State> = {
  location: {
    locationBias: {
      latitude: 38.89552025579547,
      longitude: -77.06991520330985,
      displayName: 'Arlington, VA', 
      method: LocationBiasMethod.Device
    }
  },
  meta: {
    searchType: 'universal'
  },
}

const mockedState_NycFromIp: Partial<State> = {
  location: {
    locationBias: {
      latitude: 40.741591687843005,
      longitude: -74.00530254443494,
      displayName: 'New York City, NY', 
      method: LocationBiasMethod.Ip
    }
  },
  meta: {
    searchType: 'universal'
  },
}

jest.mock("@yext/answers-headless-react");
jest.mock("../../src/utils/location-operations", () => {
  // const original = jest.requireActual("../../src/utils/location-operations");
  return {
      // ...original,
      getUserLocation: jest.fn()
  };
});



/// SIMPLE LOG LOCATION TEST

beforeEach(() => {
  const data = {
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
  (getUserLocation as jest.Mock).mockResolvedValue(data);
})

it("log location", async () => {

  const userLocation = await getUserLocation();
  console.log(userLocation);
  console.log(getUserLocation);
});

/////// TESTS

// describe("LocationBias", () => {
//   beforeEach(() => {
//     mockAnswersState(mockedState_VaFromDevice);
//   })

//   it('"Update your location" button is present', () => {
//     render(<LocationBias />);
//     const updateLocationButton = screen.getByText("Update your location");
//     expect(updateLocationButton).toBeDefined();
//   })
//   it("Tests that LocationBias from Arlington shows proper name and method", () => {
//     render(<LocationBias />);
//     const expectedLocationName = mockedState_VaFromDevice.location.locationBias.displayName;
//     const locationNameElement = screen.getByText(expectedLocationName);
//     expect(locationNameElement).toBeDefined();
//   })

//   it("Ip location originally in VA, click update location, device located in NY", () => {
//     render(<LocationBias />)
//     const expectedLocationName = mockedState_VaFromDevice.location.locationBias.displayName;
//     const locationNameElement = screen.getByText(expectedLocationName);
//     expect(locationNameElement).toBeDefined();

//     // mockAnswersState(mockedState_NycFromIp);

//     const updateLocationButton = screen.getByText("Update your location");
//     fireEvent.click(updateLocationButton);

//     console.log(getUserLocation());

//     const expectedLocationNameAfterUpdate = mockedState_NycFromIp.location.locationBias.displayName;
//     const locationNameElementAfterUpdate = screen.getByText(expectedLocationNameAfterUpdate);
//     expect(locationNameElementAfterUpdate).toBeDefined();
//   })
// });
