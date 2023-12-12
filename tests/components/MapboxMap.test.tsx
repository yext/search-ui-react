import { render } from '@testing-library/react';
import { mockAnswersState } from '../__utils__/mocks';
import { CoordinateGetter, MapboxMap, Coordinate } from '../../src/components/MapboxMap';
import { Source, State } from '@yext/search-headless-react';
import { Map, Marker } from 'mapbox-gl';
import React from 'react';

jest.mock('@yext/search-headless-react');
jest.mock('mapbox-gl');

interface Location {
  customCoordinate: Coordinate
}

const mockedStateDefaultCoordinate: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
    results: [{
      rawData: {
        yextDisplayCoordinate: {
          latitude: 1,
          longitude: 1
        }
      },
      source: Source.KnowledgeManager
    }]
  }
};

const mockedStateCustomCoordinate: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
    results: [{
      rawData: {
        customCoordinate: {
          latitude: 2,
          longitude: 2
        }
      },
      source: Source.KnowledgeManager
    }]
  }
};

const mockedStateWrongCoordinateType: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
    results: [{
      rawData: {
        yextDisplayCoordinate: [1, 1]
      },
      source: Source.KnowledgeManager
    }]
  }
};

describe('default "getCoordinate"', () => {
  it('uses result\'s "yextDisplayCoordinate" for marker location', () => {
    mockAnswersState(mockedStateDefaultCoordinate);
    const setLngLat = jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
    render(<MapboxMap mapboxAccessToken='TEST_KEY' />);
    expect(setLngLat).toBeCalledWith({ lat: 1, lng: 1 });
  });

  it('displays an error when "yextDisplayCoordinate" field is not present in result', () => {
    mockAnswersState(mockedStateCustomCoordinate);
    const setLngLat = jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<MapboxMap mapboxAccessToken='TEST_KEY' />);
    expect(errorSpy).toBeCalledTimes(1);
    const expectedMessage = 'Unable to use the default "yextDisplayCoordinate" field as the result\'s coordinate';
    expect(errorSpy).toBeCalledWith(expect.stringContaining(expectedMessage));
    expect(setLngLat).not.toBeCalled();
  });

  it('displays an error when "yextDisplayCoordinate" field is not of type "Coordinate"', () => {
    mockAnswersState(mockedStateWrongCoordinateType);
    const setLngLat = jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<MapboxMap mapboxAccessToken='TEST_KEY' />);
    expect(errorSpy).toBeCalledTimes(1);
    const expectedMessage = 'The default `yextDisplayCoordinate` field from result is not of type "Coordinate".';
    expect(errorSpy).toBeCalledWith(expect.stringContaining(expectedMessage));
    expect(setLngLat).not.toBeCalled();
  });
});

it('executes custom "getCoordinate" and use the derived coordinate for marker location', () => {
  mockAnswersState(mockedStateCustomCoordinate);
  const setLngLat = jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
  const customGetCoordinate: CoordinateGetter<Location> = jest.fn().mockImplementation(
    result => result.rawData.customCoordinate);

  const errorSpy = jest.spyOn(console, 'error').mockImplementation();
  render(<MapboxMap mapboxAccessToken='TEST_KEY' getCoordinate={customGetCoordinate} />);
  expect(errorSpy).toBeCalledTimes(0);
  expect(customGetCoordinate).toBeCalledTimes(1);
  expect(setLngLat).toBeCalledWith({ lat: 2, lng: 2 });
});

it('registers "onDrag" callback to Mapbox\'s event listener for "drag to pan" interaction', () => {
  jest.useFakeTimers();
  jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
  const mapOnEventListener = jest.spyOn(Map.prototype, 'on')
    .mockImplementation((e, cb) => {
      e === 'drag' && cb({});
      return Map.prototype;
    });
  const onDragFn = jest.fn();
  render(<MapboxMap mapboxAccessToken='TEST_KEY' onDrag={onDragFn} />);
  expect(mapOnEventListener).toBeCalledWith('drag', expect.anything());
  expect(onDragFn).toBeCalledTimes(0);
  jest.advanceTimersByTime(100); //debounce time
  expect(onDragFn).toBeCalledTimes(1);
});
