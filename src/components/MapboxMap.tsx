import { useRef, useEffect } from 'react';
import mapboxgl, { Map, Marker, MapboxOptions, LngLatBounds, MarkerOptions, LngLat } from 'mapbox-gl';
import { Result, useSearchState } from '@yext/search-headless-react';
import { useDebouncedFunction } from '../hooks/useDebouncedFunction';
import ReactDOM from 'react-dom';

/**
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
export type PinComponent<T> = (props: {
  index: number,
  mapbox: Map,
  result: Result<T>
}) => JSX.Element;

/**
 * A function use to derive a result's coordinate.
 *
 * @public
 */
export type CoordinateGetter<T> = (result: Result<T>) => Coordinate | undefined;

/**
 * Coordinate use to represent the result's location on a map.
 *
 * @public
 */
export interface Coordinate {
  /** The latitude of the location. */
  latitude: number,
  /** The longitude of the location. */
  longitude: number
}

/**
 * A function which is called when user drag the map.
 *
 * @public
 */
export type OnDragHandler = (center: LngLat, bounds: LngLatBounds) => void;

/**
 * Props for the {@link MapboxMap} component.
 * The type param "T" represents the type of "rawData" field of the results use in the map.
 *
 * @public
 */
export interface MapboxMapProps<T> {
  /** Mapbox access token. */
  mapboxAccessToken: string,
  /** Interface for map customization derived from Mapbox GL's Map options. */
  mapboxOptions?: Omit<MapboxOptions, 'container'>,
  /**
   * Custom Pin component to render for markers on the map.
   * By default, the built-in marker image from Mapbox GL is used.
   */
  PinComponent?: PinComponent<T>,
  /**
   * A function to derive a result's coordinate for the corresponding marker's location on the map.
   * By default, "yextDisplayCoordinate" field is used as the result's display coordinate.
   */
  getCoordinate?: CoordinateGetter<T>,
  /** {@inheritDoc OnDragHandler} */
  onDrag?: OnDragHandler
}

/**
 * A component that renders a map with markers to show result locations using Mapbox GL.
 *
 * @remarks
 * For the map to work properly, be sure to include Mapbox GL stylesheet in the application.
 *
 * @example
 * For instance, user may add the following import statement in their application's index file
 * or in the file where `MapboxMap` is used:
 * `import 'mapbox-gl/dist/mapbox-gl.css';`
 *
 * Or, user may add a stylesheet link in their html page:
 * `<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />`
 *
 * @param props - {@link MapboxMapProps}
 * @returns A React element containing a Mapbox Map
 *
 * @public
 */
export function MapboxMap<T>({
  mapboxAccessToken,
  mapboxOptions,
  PinComponent,
  getCoordinate = getDefaultCoordinate,
  onDrag
}: MapboxMapProps<T>) {
  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markers = useRef<Marker[]>([]);

  const locationResults = useSearchState(state => state.vertical.results) as Result<T>[];
  const onDragDebounced = useDebouncedFunction(onDrag, 100);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const options: MapboxOptions = {
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.005371, 40.741611],
        zoom: 9,
        ...mapboxOptions
      };
      map.current = new Map(options);
      const mapbox = map.current;
      mapbox.resize();
      if (onDragDebounced) {
        mapbox.on('drag', () => {
          onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
        });
      }
    }
  }, [mapboxOptions, onDragDebounced]);

  useEffect(() => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && locationResults?.length > 0) {
      const bounds = new LngLatBounds();
      locationResults.forEach((result, i) => {
        const markerLocation = getCoordinate(result);
        if (markerLocation) {
          const { latitude, longitude } = markerLocation;
          const el = document.createElement('div');
          const markerOptions: MarkerOptions = {};
          if (PinComponent) {
            ReactDOM.render(<PinComponent
              index={i}
              mapbox={mapbox}
              result={result}
            />, el);
            markerOptions.element = el;
          }
          const marker = new Marker(markerOptions)
            .setLngLat({ lat: latitude, lng: longitude })
            .addTo(mapbox);
          markers.current.push(marker);
          bounds.extend([longitude, latitude]);
        }
      });

      if (!bounds.isEmpty()){
        mapbox.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }
  }, [PinComponent, getCoordinate, locationResults]);

  return (
    <div ref={mapContainer} className='h-full w-full' />
  );
}

function isCoordinate(data: unknown): data is Coordinate {
  return typeof data == 'object'
    && typeof data?.['latitude'] === 'number'
    && typeof data?.['longitude'] === 'number';
}

function getDefaultCoordinate<T>(result: Result<T>): Coordinate | undefined {
  const yextDisplayCoordinate = result.rawData['yextDisplayCoordinate'];
  if (!yextDisplayCoordinate) {
    console.error('Unable to use the default "yextDisplayCoordinate" field as the result\'s coordinate to display on map.'
    + '\nConsider providing the "getCoordinate" prop to MapboxMap component to fetch the desire coordinate from result.');
    return undefined;
  }
  if (!isCoordinate(yextDisplayCoordinate)) {
    console.error('The default `yextDisplayCoordinate` field from result is not of type "Coordinate".');
    return undefined;
  }
  return yextDisplayCoordinate;
}
