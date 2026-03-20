import { render, waitFor } from '@testing-library/react';
import { mockAnswersState } from '../__utils__/mocks';
import {
  CoordinateGetter,
  MapboxMap,
  Coordinate,
  MapBounds,
  MapCenter,
  getMapboxLanguage
} from '../../src/components/MapboxMap';
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

beforeEach(() => {
  mockAnswersState(mockedStateDefaultCoordinate);
  jest.spyOn(Marker.prototype, 'setLngLat').mockReturnValue(Marker.prototype);
  jest.spyOn(Marker.prototype, 'addTo').mockReturnValue(Marker.prototype);
  jest.spyOn(Marker.prototype, 'getElement').mockReturnValue(document.createElement('div'));
  jest.spyOn(Map.prototype, 'getCenter').mockReturnValue({ lat: 40.741611, lng: -74.005371 } as ReturnType<Map['getCenter']>);
  jest.spyOn(Map.prototype, 'getCanvas').mockReturnValue({
    clientHeight: 400,
    clientWidth: 400
  } as HTMLCanvasElement);
});

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

it('registers "onDrag" callback with library-owned map wrappers', () => {
  jest.useFakeTimers();
  const distanceTo = jest.fn().mockReturnValue(157000);
  const getNorthEast = jest.fn().mockReturnValue({ lat: 42, lng: -73 });
  const getNorthWest = jest.fn().mockReturnValue({ lat: 42, lng: -75 });
  const getSouthEast = jest.fn().mockReturnValue({ lat: 40, lng: -73 });
  const getSouthWest = jest.fn().mockReturnValue({ lat: 40, lng: -75 });
  jest.spyOn(Map.prototype, 'getBounds').mockReturnValue({
    getNorthEast,
    getNorthWest,
    getSouthEast,
    getSouthWest
  } as unknown as ReturnType<Map['getBounds']>);
  jest.spyOn(Map.prototype, 'getCenter').mockReturnValue({
    lat: 41,
    lng: -74,
    distanceTo
  } as unknown as ReturnType<Map['getCenter']>);
  const mapOnEventListener = jest.spyOn(Map.prototype, 'on')
    .mockImplementation((e, cb) => {
      if (e === 'drag' && typeof cb === 'function') {
        (cb as (event: unknown) => void)({});
      }
      return Map.prototype;
    });
  const onDragFn = jest.fn();
  render(<MapboxMap mapboxAccessToken='TEST_KEY' onDrag={onDragFn} />);
  expect(mapOnEventListener).toBeCalledWith('drag', expect.anything());
  expect(onDragFn).toBeCalledTimes(0);
  jest.advanceTimersByTime(100);
  expect(onDragFn).toBeCalledTimes(1);

  const [center, bounds] = onDragFn.mock.calls[0] as [MapCenter, MapBounds];
  expect(center.latitude).toEqual(41);
  expect(center.longitude).toEqual(-74);
  expect(center.distanceTo(bounds.getNorthEast())).toBeGreaterThan(0);
  expect(distanceTo).toBeCalled();
  expect(bounds.getNorthEast()).toMatchObject({ latitude: 42, longitude: -73 });
});

it('uses PinComponent and logs warning if both PinComponent and renderPin are provided', async () => {
  mockAnswersState(mockedStateDefaultCoordinate);
  const PinComponent = jest.fn().mockImplementation(() => null);
  const renderPin = jest.fn();
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

  render(<MapboxMap
    mapboxAccessToken='TEST_KEY'
    PinComponent={PinComponent}
    renderPin={renderPin}
  />);

  expect(warnSpy).toBeCalledTimes(1);
  expect(warnSpy).toBeCalledWith(
    'Found both PinComponent and renderPin props. Using PinComponent.'
  );
  await waitFor(() => expect(PinComponent).toHaveBeenCalled());
  expect(renderPin).not.toBeCalled();
});

it('exposes the native map through the pin component escape hatch', async () => {
  const PinComponent = jest.fn().mockImplementation(() => null);

  render(<MapboxMap
    mapboxAccessToken='TEST_KEY'
    PinComponent={PinComponent}
  />);

  await waitFor(() => expect(PinComponent).toHaveBeenCalled());
  const firstProps = PinComponent.mock.calls[0][0];
  expect(firstProps.mapbox.getNativeInstance()).toBeInstanceOf(Map);
  expect(firstProps.mapbox.getCenter())
    .toMatchObject({ latitude: expect.any(Number), longitude: expect.any(Number) });
});

it('converts supported mapbox options before creating the native map', () => {
  render(
    <MapboxMap
      mapboxAccessToken='TEST_KEY'
      mapboxOptions={{
        center: { latitude: 12, longitude: 34 },
        style: 'mapbox://styles/custom/style',
        zoom: 6
      }}
    />
  );

  const MapConstructor = Map as unknown as jest.Mock;
  expect(MapConstructor.mock.calls[0][0]).toMatchObject({
    center: [34, 12],
    style: 'mapbox://styles/custom/style',
    zoom: 6
  });
});

it('passes converted fit-bounds options through to the native map', () => {
  const fitBounds = jest.spyOn(Map.prototype, 'fitBounds').mockReturnValue(Map.prototype);

  render(
    <MapboxMap
      mapboxAccessToken='TEST_KEY'
      mapboxOptions={{
        fitBoundsOptions: {
          maxZoom: 11,
          padding: {
            top: 10,
            bottom: 20,
            left: 30,
            right: 40
          }
        }
      }}
    />
  );

  expect(fitBounds).toBeCalledWith(
    expect.anything(),
    expect.objectContaining({
      maxZoom: 11,
      padding: {
        top: 10,
        bottom: 20,
        left: 30,
        right: 40
      }
    })
  );
});

it('updates supported options when allowUpdates is true', () => {
  const setStyle = jest.spyOn(Map.prototype, 'setStyle').mockReturnValue(Map.prototype);
  const { rerender } = render(
    <MapboxMap
      mapboxAccessToken='TEST_KEY'
      allowUpdates={true}
      mapboxOptions={{ style: 'mapbox://styles/initial/style' }}
    />
  );

  rerender(
    <MapboxMap
      mapboxAccessToken='TEST_KEY'
      allowUpdates={true}
      mapboxOptions={{ style: 'mapbox://styles/updated/style' }}
    />
  );

  expect(setStyle).toBeCalledWith('mapbox://styles/updated/style');
});

describe('localize the map based on the search locale', () => {
  // list of languages that mapbox supports: (https://github.com/mapbox/mapbox-gl-language/blob/v1.0.1/index.js#L46)
  // ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'mul', 'pt', 'ru', 'vi', 'zh-Hans', 'zh-Hant']
  const expectedMapboxLanguage: Record<string, string> = {
    'ar_DZ': 'ar',
    'de': 'de',
    'de_EU': 'de',
    'en': 'en',
    'en_FR': 'en',
    'en_US': 'en',
    'es': 'es',
    'es_US': 'es',
    'fr': 'fr',
    'fr_CA': 'fr',
    'fr_FR': 'fr',
    'it': 'it',
    'ja': 'ja',
    'ja_JP': 'ja',
    'ko_KR': 'ko',
    'pt': 'pt',
    'ru_UA': 'ru',
    'vi': 'vi',
    'zh_Hans': 'zh-Hans',
    'zh_Hans_CN': 'zh-Hans',
    'zh_Hans_HK': 'zh-Hans',
    'zh_Hant_TW': 'zh-Hant'
  };
  test.each(Object.entries(expectedMapboxLanguage))('updates map labels correctly for locale %s', (searchLocale, mapboxLanguage) => {
    expect(getMapboxLanguage(searchLocale)).toEqual(mapboxLanguage);
  });
});
