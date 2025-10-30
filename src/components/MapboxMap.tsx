import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl, { MarkerOptions } from 'mapbox-gl';
import { Result, useSearchState, SelectableStaticFilter } from '@yext/search-headless-react';
import { useDebouncedFunction } from '../hooks/useDebouncedFunction';
import _ from 'lodash';

import ReactDOM from 'react-dom';

/**
 * Props for rendering a custom marker on the map.
 *
 * @public
 */
export type PinComponentProps<T> = {
  /** The index of the pin. */
  index: number,
  /** The Mapbox map. */
  mapbox: mapboxgl.Map,
  /** The search result corresponding to the pin. */
  result: Result<T>,
  /** Where the pin is selected. */
  selected?: boolean,
};

/**
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
export type PinComponent<T> = (props: PinComponentProps<T>) => JSX.Element;

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
 * A function which is called when user drags or zooms the map.
 *
 * @public
 */
export type OnDragHandler = (center: mapboxgl.LngLat, bounds: mapboxgl.LngLatBounds) => void;

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
  mapboxOptions?: Omit<mapboxgl.MapboxOptions, 'container'>,
  /**
   * Custom Pin component to render for markers on the map.
   * By default, the built-in marker image from Mapbox GL is used.
   * This prop should not be used with
   * {@link MapboxMapProps.renderPin | renderPin}. If both are provided,
   * only PinComponent will be used.
   */
  PinComponent?: PinComponent<T>,
  /**
   * Render function for a custom marker on the map. This function takes in an
   * HTML element and is responible for rendering the pin into that element,
   * which will be used as the marker.
   * By default, the built-in marker image from Mapbox GL is used.
   * This prop should not be used with
   * {@link MapboxMapProps.PinComponent | PinComponent}. If both are provided,
   * only PinComponent will be used.
   */
  renderPin?: (props: PinComponentProps<T> & { container: HTMLElement }) => void,
  /**
   * A function to derive a result's coordinate for the corresponding marker's location on the map.
   * By default, "yextDisplayCoordinate" field is used as the result's display coordinate.
   */
  getCoordinate?: CoordinateGetter<T>,
  /** {@inheritDoc OnDragHandler} */
  onDrag?: OnDragHandler,
  /**
   * The window object of the iframe where the map should rendered. Must have mapboxgl loaded.
   * If not provided or mapboxgl not loaded, the map will be rendered in the parent window.
   */
  iframeWindow?: Window,
  /**
   * If set to true, the map will update its options when the mapboxOptions prop changes.
   * Otherwise, the map will not update its options once initially set.
   */
  allowUpdates?: boolean,
  /** A function that handles a pin click event. */
  onPinClick?: (result: Result<T> | undefined) => void,
  /** The options to apply to the map markers based on whether it is selected. */
  markerOptionsOverride?: (selected: boolean) => MarkerOptions,
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
  renderPin,
  getCoordinate = getDefaultCoordinate,
  onDrag,
  iframeWindow,
  allowUpdates = false,
  onPinClick,
  markerOptionsOverride,
}: MapboxMapProps<T>): JSX.Element {
  const mapboxInstance = (iframeWindow as Window & { mapboxgl?: typeof mapboxgl })?.mapboxgl ?? mapboxgl;
  useEffect(() => {
    mapboxInstance.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  const locationResults = useSearchState(state => state.vertical.results) as Result<T>[];
  const staticFilters = useSearchState(state => state.filters?.static);
  const onDragDebounced = useDebouncedFunction(onDrag, 100);
  const [selectedResult, setSelectedResult] = useState<Result<T> | undefined>(undefined);

  const handlePinClick = useCallback((result: Result<T>) => {
    setSelectedResult(prev => prev === result ? undefined : result)
  }, [])

  useEffect(() => {
    onPinClick?.(selectedResult);
  }, [selectedResult])

  const locale = useSearchState(state => state.meta?.locale);
  // keep track of the previous value of mapboxOptions across renders
  const prevMapboxOptions = useRef(mapboxOptions);

  const localizeMap = useCallback(() => {
    const mapbox = map.current;
    if (!mapbox || !locale) return;

    const localizeLabels = () => {
      mapbox.getStyle().layers.forEach(layer => {
        if (layer.type === "symbol" && layer.layout?.["text-field"]) {
          mapbox.setLayoutProperty(
            layer.id,
            "text-field",
            [
              'coalesce',
              ['get', `name_${getMapboxLanguage(locale)}`],
              ['get', 'name']
            ]
          );
        }
      });
    }

    if (mapbox.isStyleLoaded()) {
      localizeLabels();
    } else {
      mapbox.once("styledata", () => localizeLabels())
    }
  }, [locale]);

  useEffect(() => {
    if (mapContainer.current) {
      if (map.current && allowUpdates) {
        // Compare current and previous mapboxOptions using deep equality
        if (!_.isEqual(prevMapboxOptions.current, mapboxOptions)) {
          // Update to existing Map
          handleMapboxOptionsUpdates(mapboxOptions, map.current);
          prevMapboxOptions.current = (mapboxOptions);
        }
      } else if (!map.current && mapboxInstance) {
        const options: mapboxgl.MapboxOptions = {
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-74.005371, 40.741611],
          zoom: 9,
          ...mapboxOptions
        };
        map.current = new mapboxInstance.Map(options);
        const mapbox = map.current;
        mapbox.resize();
        const nav = new mapboxInstance.NavigationControl({
          showCompass: false,
          showZoom: true,
          visualizePitch: false
        });
        mapbox.addControl(nav, 'top-right');
        if (onDragDebounced) {
          mapbox.on('drag', () => {
            onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
          });
          mapbox.on('zoom', (e) => {
            if (e.originalEvent) {
              // only trigger on user zoom, not programmatic zoom (e.g. from fitBounds)
              onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
            }
          });
          return () => {
            mapbox.off('drag', () => {
              onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
            });
            mapbox.off('zoom', (e) => {
              if (e.originalEvent) {
                onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
              }
            });
          };
        }
      }
      localizeMap();
    }
  }, [mapboxOptions, onDragDebounced, localizeMap]);

  useEffect(() => {
    if (iframeWindow && map.current) {
      map.current.resize();
    }
  }, [mapContainer.current]);

  useEffect(() => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && locationResults) {
      if (locationResults.length > 0) {
        const bounds = new mapboxInstance.LngLatBounds();
        locationResults.forEach((result, i) => {
          const markerLocation = getCoordinate(result);
          if (markerLocation) {
            const { latitude, longitude } = markerLocation;
            const el = document.createElement('div');
            let markerOptions: mapboxgl.MarkerOptions = {};
            if (PinComponent) {
              if (renderPin) {
                console.warn(
                  'Found both PinComponent and renderPin props. Using PinComponent.'
                );
              }
              ReactDOM.render(<PinComponent
                index={i}
                mapbox={mapbox}
                result={result}
                selected={selectedResult === result}
              />, el);
              markerOptions.element = el;
            } else if (renderPin) {
              renderPin({ index: i, mapbox, result, container: el });
              markerOptions.element = el;
            }

            if (markerOptionsOverride) {
              markerOptions = {
                ...markerOptions,
                ...markerOptionsOverride(selectedResult === result)
              }
            }

            const marker = new mapboxInstance.Marker(markerOptions)
              .setLngLat({ lat: latitude, lng: longitude })
              .addTo(mapbox);

            marker?.getElement().addEventListener('click', () => handlePinClick(result));
            markers.current.push(marker);
            bounds.extend([longitude, latitude]);
          }
        })

        if (!bounds.isEmpty()){
          mapbox.fitBounds(bounds, {
            // these settings are defaults and will be overriden if present on fitBoundsOptions
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: mapboxOptions?.maxZoom ?? 15,
            ...mapboxOptions?.fitBoundsOptions,
          });
        }

        return () => {
          markers.current.forEach((marker, i) => {
            marker?.getElement().removeEventListener('click', () => handlePinClick(locationResults[i]));
          });
        }
      } else if (staticFilters?.length) {
        const locationFilterValue = getLocationFilterValue(staticFilters);
        if (locationFilterValue) {
          mapbox.flyTo({
            center: locationFilterValue
          });
        }
      };
    }
  }, [PinComponent, getCoordinate, locationResults, selectedResult, markerOptionsOverride]);

  return (
    <div ref={mapContainer} className='h-full w-full' />
  );
}

function handleMapboxOptionsUpdates(mapboxOptions: Omit<mapboxgl.MapboxOptions, 'container'> | undefined, currentMap: mapboxgl.Map) {
  if (mapboxOptions?.style) {
    currentMap.setStyle(mapboxOptions.style);
  }
  // Add more options to update as needed
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

export function getMapboxLanguage(locale: string) {
  try {
    const localeOptions = new Intl.Locale(locale.replaceAll('_', '-'));
    return localeOptions.script ? `${localeOptions.language}-${localeOptions.script}` : localeOptions.language;
  } catch (e) {
    console.warn(`Locale "${locale}" is not supported.`)
  }
  return 'en';
}

function getLocationFilterValue(staticFilters: SelectableStaticFilter[]): [number, number] | undefined {
  const locationFilter = staticFilters.find(f => f.filter['fieldId'] === 'builtin.location' && f.filter['value'])?.filter;
  if (locationFilter) {
    const {lat, lng} = locationFilter['value'];
    return [lng, lat];
  }
}
