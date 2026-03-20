import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { Result, useSearchState, SelectableStaticFilter } from '@yext/search-headless-react';
import { useDebouncedFunction } from '../hooks/useDebouncedFunction';
import _ from 'lodash';

import ReactDOM from 'react-dom';
// Try to statically import createRoot, will be undefined for <18.
import * as ReactDomClient from 'react-dom/client';

type LegacyReactDOM = {
  render?: (element: React.ReactElement, container: Element) => void,
  unmountComponentAtNode?: (container: Element | DocumentFragment) => boolean
};

type RootHandle = {
  render: (children: React.ReactNode) => void,
  unmount: () => void
};

const legacyReactDOM = ReactDOM as LegacyReactDOM;
const reactMajorVersion = Number(React.version.split('.')[0]);
const supportsCreateRoot = !Number.isNaN(reactMajorVersion) && reactMajorVersion >= 18;

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
 * A map center coordinate with helper methods that are owned by this library.
 *
 * @public
 */
export interface MapCenter extends Coordinate {
  /** Calculates the distance in meters between this coordinate and another coordinate. */
  distanceTo: (coordinate: Coordinate) => number
}

/**
 * A library-owned map bounds interface for drag and zoom callbacks.
 *
 * @public
 */
export interface MapBounds {
  /** Gets the north east corner of the current bounds. */
  getNorthEast: () => MapCenter,
  /** Gets the north west corner of the current bounds. */
  getNorthWest: () => MapCenter,
  /** Gets the south east corner of the current bounds. */
  getSouthEast: () => MapCenter,
  /** Gets the south west corner of the current bounds. */
  getSouthWest: () => MapCenter
}

/**
 * Padding around a fit-bounds request.
 *
 * @public
 */
export interface MapPadding {
  top?: number,
  bottom?: number,
  left?: number,
  right?: number
}

/**
 * Options used when fitting the map view to a set of bounds.
 *
 * @public
 */
export interface MapFitBoundsOptions {
  padding?: number | MapPadding,
  maxZoom?: number
}

/**
 * The subset of map configuration supported by this component.
 *
 * @public
 */
export interface MapboxMapOptions {
  center?: Coordinate,
  fitBoundsOptions?: MapFitBoundsOptions,
  maxZoom?: number,
  style?: string | Record<string, unknown>,
  zoom?: number
}

/**
 * Marker options supported by this component.
 *
 * @public
 */
export interface MapMarkerOptions {
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  className?: string,
  clickTolerance?: number,
  color?: string,
  draggable?: boolean,
  occludedOpacity?: number,
  pitchAlignment?: 'map' | 'viewport' | 'auto',
  rotation?: number,
  rotationAlignment?: 'map' | 'viewport' | 'auto' | 'horizon',
  scale?: number
}

/**
 * A library-owned facade over the backing map implementation.
 *
 * @public
 */
export interface MapInstance {
  fitBounds: (bounds: MapBounds, options?: MapFitBoundsOptions) => void,
  flyTo: (options: { center: Coordinate }) => void,
  getBounds: () => MapBounds | undefined,
  getCenter: () => MapCenter,
  /**
   * Returns the native map implementation instance for advanced integrations.
   *
   * @remarks
   * This value is intentionally untyped because it is implementation-specific.
   */
  getNativeInstance: () => unknown,
  resize: () => void
}

/**
 * Props for rendering a custom marker on the map.
 *
 * @public
 */
export type PinComponentProps<T> = {
  /** The index of the pin. */
  index: number,
  /** A stable map facade for advanced pin interactions. */
  mapbox: MapInstance,
  /** The search result corresponding to the pin. */
  result: Result<T>,
  /** Whether the pin is selected. */
  selected?: boolean
};

/**
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
export type PinComponent<T> = (props: PinComponentProps<T>) => React.JSX.Element;

/**
 * A function use to derive a result's coordinate.
 *
 * @public
 */
export type CoordinateGetter<T> = (result: Result<T>) => Coordinate | undefined;

/**
 * A function which is called when user drags or zooms the map.
 *
 * @public
 */
export type OnDragHandler = (center: MapCenter, bounds: MapBounds) => void;

/**
 * Props for the {@link MapboxMap} component.
 * The type param "T" represents the type of "rawData" field of the results use in the map.
 *
 * @public
 */
export interface MapboxMapProps<T> {
  /** Mapbox access token. */
  mapboxAccessToken: string,
  /** Interface for map customization supported by this component. */
  mapboxOptions?: MapboxMapOptions,
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
  markerOptionsOverride?: (selected: boolean) => MapMarkerOptions
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
}: MapboxMapProps<T>): React.JSX.Element {
  const mapboxInstance = (iframeWindow as Window & { mapboxgl?: typeof mapboxgl })?.mapboxgl ?? mapboxgl;
  // keep the mapbox access token in sync with prop changes.
  useEffect(() => {
    mapboxInstance.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken, mapboxInstance]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const mapFacade = useRef<MapInstance | null>(null);
  const markerRoots = useRef(new Map<HTMLElement, RootHandle>());
  const activeMarkerElements = useRef(new Set<HTMLElement>());
  const markerData = useRef<Array<{ marker: mapboxgl.Marker, result: Result<T>, index: number }>>([]);

  const locationResults = useSearchState(state => state.vertical.results) as Result<T>[];
  const staticFilters = useSearchState(state => state.filters?.static);
  const onDragDebounced = useDebouncedFunction(onDrag, 100);
  const [selectedResult, setSelectedResult] = useState<Result<T> | undefined>(undefined);

  const handlePinClick = useCallback((result: Result<T>) => {
    setSelectedResult(prev => prev === result ? undefined : result);
  }, []);

  // notify consumers when the selected pin changes.
  useEffect(() => {
    onPinClick?.(selectedResult);
  }, [onPinClick, selectedResult]);

  const scheduleRootUnmount = useCallback((root: RootHandle) => {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(() => root.unmount());
    } else {
      setTimeout(() => root.unmount(), 0);
    }
  }, []);

  const cleanupPinComponent = useCallback((element: HTMLElement) => {
    activeMarkerElements.current.delete(element);
    if (supportsCreateRoot) {
      const root = markerRoots.current.get(element);
      if (root) {
        // unmount must be called after the current render finishes, so schedule it for the next
        // microtask
        scheduleRootUnmount(root);
        markerRoots.current.delete(element);
      }
    } else {
      legacyReactDOM.unmountComponentAtNode?.(element);
    }
  }, [scheduleRootUnmount]);

  const attachPinComponent = useCallback((element: HTMLElement, component: React.JSX.Element) => {
    if (supportsCreateRoot && typeof ReactDomClient.createRoot === 'function') {
      // Use React 18+ API
      let root = markerRoots.current.get(element);
      if (!root) {
        root = ReactDomClient.createRoot(element);
        markerRoots.current.set(element, root);
      }
      root.render(component);
    } else if (typeof legacyReactDOM.render === 'function') {
      // Fallback for React <18
      legacyReactDOM.render(component, element);
    }
  }, []);

  // builds and attaches a single marker to the mapbox map
  const createMarker = useCallback((
    mapbox: MapInstance,
    result: Result<T>,
    index: number,
    selected: boolean
  ) => {
    const markerLocation = getCoordinate(result);
    if (!markerLocation) {
      return null;
    }
    const { latitude, longitude } = markerLocation;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    const el = document.createElement('div');
    let markerOptions: mapboxgl.MarkerOptions = {};
    if (PinComponent) {
      if (renderPin) {
        console.warn(
          'Found both PinComponent and renderPin props. Using PinComponent.'
        );
      }
      attachPinComponent(el, (
        <PinComponent
          index={index}
          mapbox={mapbox}
          result={result}
          selected={selected}
        />
      ));
      markerOptions.element = el;
    } else if (renderPin) {
      renderPin({ index, mapbox, result, container: el });
      markerOptions.element = el;
    }

    if (markerOptionsOverride) {
      markerOptions = {
        ...markerOptions,
        ...toNativeMarkerOptions(markerOptionsOverride(selected))
      };
    }

    const nativeMap = mapbox.getNativeInstance();
    if (!(nativeMap instanceof mapboxgl.Map)) {
      return null;
    }

    const marker = new mapboxInstance.Marker(markerOptions)
      .setLngLat({ lat: latitude, lng: longitude })
      .addTo(nativeMap);

    marker?.getElement().addEventListener('click', () => handlePinClick(result));

    return { marker, location: markerLocation };
  }, [
    PinComponent,
    attachPinComponent,
    getCoordinate,
    handlePinClick,
    mapboxInstance,
    markerOptionsOverride,
    renderPin
  ]);

  const removeMarkers = useCallback(() => {
    markers.current.forEach(marker => {
      if (!marker) {
        return;
      }
      const element = marker?.getElement?.();
      if (element) {
        cleanupPinComponent(element);
      }
      if (typeof marker.remove === 'function') {
        marker.remove();
      }
    });
    markers.current = [];
    markerData.current = [];
  }, [cleanupPinComponent]);

  const locale = useSearchState(state => state.meta?.locale);
  // keep track of the previous value of mapboxOptions across renders
  const prevMapboxOptions = useRef(mapboxOptions);

  /**
   * Localizes Mapbox label text to a specific locale.
   *
   * Updates symbol layers that are place names such that labels prefer `name_<lang>`
   * (e.g. `name_fr`) and fall back to `name` when unavailable.
   *
   * Note:
   * - Symbol layers that are place names would have `text-field` properties that includes
   *   'name', which are localized.
   * - Other symbol layers (e.g. road shields, transit, icons) are left unchanged.
   */
  const localizeMap = useCallback(() => {
    const mapbox = map.current;
    if (!mapbox || !locale) return;

    const localizeLabels = () => {
      mapbox.getStyle().layers.forEach(layer => {
        if (layer.type !== 'symbol') {
          return;
        }
        const textField = layer.layout?.['text-field'];
        if (typeof textField === 'string'
          ? textField.includes('name')
          : (Array.isArray(textField) && JSON.stringify(textField).includes('name'))) {
          mapbox.setLayoutProperty(
            layer.id,
            'text-field',
            [
              'coalesce',
              ['get', `name_${getMapboxLanguage(locale)}`],
              ['get', 'name']
            ]
          );
        }
      });
    };

    if (mapbox.isStyleLoaded()) {
      localizeLabels();
    } else {
      mapbox.once('styledata', () => localizeLabels());
    }
  }, [locale]);

  // initialize the map once and update mapbox options when allowUpdates is true.
  useEffect(() => {
    if (mapContainer.current) {
      if (map.current && allowUpdates) {
        // Compare current and previous mapboxOptions using deep equality
        if (!_.isEqual(prevMapboxOptions.current, mapboxOptions)) {
          // Update to existing Map
          handleMapboxOptionsUpdates(mapboxOptions, map.current);
          prevMapboxOptions.current = mapboxOptions;
        }
      } else if (!map.current && mapboxInstance) {
        const options: mapboxgl.MapOptions = {
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-74.005371, 40.741611],
          zoom: 9,
          ...toNativeMapboxOptions(mapboxOptions)
        };
        map.current = new mapboxInstance.Map(options);
        const nativeMap = map.current;
        mapFacade.current = createMapInstanceFacade(nativeMap);
        nativeMap.resize();
        const nav = new mapboxInstance.NavigationControl({
          showCompass: false,
          showZoom: true,
          visualizePitch: false
        });
        nativeMap.addControl(nav, 'top-right');
      }
      localizeMap();
    }
  }, [allowUpdates, localizeMap, mapboxInstance, mapboxOptions]);

  // Register drag listeners separately from map initialization so rerenders do not
  // accidentally remove them without reattaching them.
  useEffect(() => {
    const nativeMap = map.current;
    if (!nativeMap || !onDragDebounced) {
      return;
    }

    const dispatchDrag = () => {
      const bounds = nativeMap.getBounds();
      if (!bounds) {
        return;
      }
      onDragDebounced(toMapCenter(nativeMap.getCenter()), toMapBounds(bounds));
    };
    const onDrag = () => {
      dispatchDrag();
    };
    const onZoom = (e: mapboxgl.MapEventOf<'zoom'>) => {
      if ('originalEvent' in e && e.originalEvent) {
        // only trigger on user zoom, not programmatic zoom (e.g. from fitBounds)
        dispatchDrag();
      }
    };

    nativeMap.on('drag', onDrag);
    nativeMap.on('zoom', onZoom);

    return () => {
      nativeMap.off('drag', onDrag);
      nativeMap.off('zoom', onZoom);
    };
  }, [onDragDebounced]);

  // resize the map when its iframe container changes size.
  useEffect(() => {
    if (iframeWindow && map.current) {
      map.current.resize();
    }
  }, [iframeWindow]);

  // create and place markers when results change, then cleanup on teardown
  useEffect(() => {
    removeMarkers();
    const nativeMap = map.current;
    const mapbox = mapFacade.current;
    if (nativeMap && mapbox && locationResults) {
      if (locationResults.length > 0) {
        const bounds = new mapboxInstance.LngLatBounds();
        // create a marker for each result
        locationResults.forEach((result, i) => {
          const created = createMarker(mapbox, result, i, false);
          if (!created) {
            return;
          }
          markers.current.push(created.marker);
          markerData.current.push({ marker: created.marker, result, index: i });
          bounds.extend([created.location.longitude, created.location.latitude]);
        });

        // fit the map to the markers
        nativeMap.resize();
        const canvas = nativeMap.getCanvas();

        // add padding to map
        if (!bounds.isEmpty()
            && !!canvas
            && canvas.clientHeight > 0
            && canvas.clientWidth > 0
        ) {
          const resolvedOptions = {
            // these settings are defaults and will be overriden if present on fitBoundsOptions
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: mapboxOptions?.maxZoom ?? 15,
            ...toNativeFitBoundsOptions(mapboxOptions?.fitBoundsOptions),
          };

          let resolvedPadding;
          if (typeof resolvedOptions.padding === 'number') {
            resolvedPadding = {
              top: resolvedOptions.padding,
              bottom: resolvedOptions.padding,
              left: resolvedOptions.padding,
              right: resolvedOptions.padding
            };
          } else {
            resolvedPadding = {
              top: resolvedOptions.padding?.top ?? 0,
              bottom: resolvedOptions.padding?.bottom ?? 0,
              left: resolvedOptions.padding?.left ?? 0,
              right: resolvedOptions.padding?.right ?? 0
            };
          }

          // Padding must not exceed the map's canvas dimensions
          const verticalPaddingSum = resolvedPadding.top + resolvedPadding.bottom;
          if (verticalPaddingSum >= canvas.clientHeight) {
            const ratio = canvas.clientHeight / (verticalPaddingSum || 1);
            resolvedPadding.top = Math.max(0, resolvedPadding.top * ratio - 1);
            resolvedPadding.bottom = Math.max(0, resolvedPadding.bottom * ratio - 1);
          }
          const horizontalPaddingSum = resolvedPadding.left + resolvedPadding.right;
          if (horizontalPaddingSum >= canvas.clientWidth) {
            const ratio = canvas.clientWidth / (horizontalPaddingSum || 1);
            resolvedPadding.left = Math.max(0, resolvedPadding.left * ratio - 1);
            resolvedPadding.right = Math.max(0, resolvedPadding.right * ratio - 1);
          }
          resolvedOptions.padding = resolvedPadding;
          nativeMap.fitBounds(bounds, resolvedOptions);
        }

        // return a cleanup function to remove markers when the map component unmounts
        return () => {
          markers.current.forEach((marker, i) => {
            marker?.getElement().removeEventListener('click', () => handlePinClick(locationResults[i]));
          });
          removeMarkers();
        };
      } else if (staticFilters?.length) {
        const locationFilterValue = getLocationFilterValue(staticFilters);
        if (locationFilterValue) {
          nativeMap.flyTo({
            center: locationFilterValue
          });
        }
      }
    }
  }, [
    createMarker,
    handlePinClick,
    locationResults,
    mapboxInstance,
    mapboxOptions,
    removeMarkers,
    staticFilters
  ]);

  const previousSelectedResult = useRef<Result<T> | undefined>(undefined);

  // update marker options when markerOptionsOverride changes or selectedResult changes
  useEffect(() => {
    const mapbox = mapFacade.current;
    if (!mapbox || !markerOptionsOverride) {
      previousSelectedResult.current = selectedResult;
      return;
    }

    const prevSelected = previousSelectedResult.current;
    previousSelectedResult.current = selectedResult;

    // markerOptionsOverride is applied at creation time, so we recreate only the affected
    // markers to reflect selection changes without tearing down all pins.
    const resultsToUpdate = new Set<Result<T>>();
    if (prevSelected) {
      resultsToUpdate.add(prevSelected);
    }
    if (selectedResult) {
      resultsToUpdate.add(selectedResult);
    }

    resultsToUpdate.forEach((result) => {
      const markerEntry = markerData.current.find(entry => entry.result === result);
      if (!markerEntry) {
        return;
      }
      // recreate the marker to apply new markerOptionsOverride (e.g. color/scale).
      const oldMarker = markerEntry.marker;
      const element = oldMarker?.getElement?.();
      if (element) {
        cleanupPinComponent(element);
      }
      oldMarker?.remove?.();

      const created = createMarker(mapbox, result, markerEntry.index, selectedResult === result);
      if (!created) {
        return;
      }
      markerEntry.marker = created.marker;
      markers.current[markerEntry.index] = created.marker;
    });
  }, [cleanupPinComponent, createMarker, markerOptionsOverride, selectedResult]);

  // re-render custom PinComponent on selection changes to update the visual state
  useEffect(() => {
    const mapbox = mapFacade.current;
    if (!mapbox || !PinComponent) {
      return;
    }
    markerData.current.forEach(({ marker, result, index }) => {
      const element = marker?.getElement?.();
      if (!element) {
        return;
      }
      attachPinComponent(element, (
        <PinComponent
          index={index}
          mapbox={mapbox}
          result={result}
          selected={selectedResult === result}
        />
      ));
    });
  }, [attachPinComponent, PinComponent, selectedResult]);

  return (
    <div ref={mapContainer} className='h-full w-full' />
  );
}

function toMapCenter(lngLat: mapboxgl.LngLat): MapCenter {
  const coordinate = {
    latitude: lngLat.lat,
    longitude: lngLat.lng
  };

  return {
    ...coordinate,
    distanceTo: (nextCoordinate: Coordinate) => lngLat.distanceTo(
      new mapboxgl.LngLat(nextCoordinate.longitude, nextCoordinate.latitude)
    )
  };
}

function toMapBounds(bounds: mapboxgl.LngLatBounds): MapBounds {
  return {
    getNorthEast: () => toMapCenter(bounds.getNorthEast()),
    getNorthWest: () => toMapCenter(bounds.getNorthWest()),
    getSouthEast: () => toMapCenter(bounds.getSouthEast()),
    getSouthWest: () => toMapCenter(bounds.getSouthWest())
  };
}

function toNativeCoordinate(coordinate: Coordinate): [number, number] {
  return [coordinate.longitude, coordinate.latitude];
}

function toNativeFitBoundsOptions(
  fitBoundsOptions: MapFitBoundsOptions | undefined
): mapboxgl.MapOptions['fitBoundsOptions'] | undefined {
  if (!fitBoundsOptions) {
    return undefined;
  }

  return {
    ...fitBoundsOptions,
    padding: fitBoundsOptions.padding
      ? typeof fitBoundsOptions.padding === 'number'
        ? fitBoundsOptions.padding
        : {
          top: fitBoundsOptions.padding.top ?? 0,
          bottom: fitBoundsOptions.padding.bottom ?? 0,
          left: fitBoundsOptions.padding.left ?? 0,
          right: fitBoundsOptions.padding.right ?? 0
        }
      : undefined
  };
}

function toNativeMapboxOptions(mapboxOptions: MapboxMapOptions | undefined): Omit<mapboxgl.MapOptions, 'container'> {
  if (!mapboxOptions) {
    return {};
  }

  return {
    ...mapboxOptions,
    center: mapboxOptions.center ? toNativeCoordinate(mapboxOptions.center) : undefined,
    fitBoundsOptions: toNativeFitBoundsOptions(mapboxOptions.fitBoundsOptions),
    style: mapboxOptions.style as mapboxgl.StyleSpecification | string | undefined
  };
}

function toNativeMarkerOptions(markerOptions: MapMarkerOptions): mapboxgl.MarkerOptions {
  return { ...markerOptions };
}

function createMapInstanceFacade(map: mapboxgl.Map): MapInstance {
  return {
    fitBounds: (bounds, options) => {
      map.fitBounds(
        [
          toNativeCoordinate(bounds.getSouthWest()),
          toNativeCoordinate(bounds.getNorthEast())
        ],
        toNativeFitBoundsOptions(options)
      );
    },
    flyTo: ({ center }) => {
      map.flyTo({ center: toNativeCoordinate(center) });
    },
    getBounds: () => {
      const bounds = map.getBounds();
      return bounds ? toMapBounds(bounds) : undefined;
    },
    getCenter: () => toMapCenter(map.getCenter()),
    getNativeInstance: () => map,
    resize: () => {
      map.resize();
    }
  };
}

function handleMapboxOptionsUpdates(mapboxOptions: MapboxMapOptions | undefined, currentMap: mapboxgl.Map) {
  if (mapboxOptions?.style) {
    currentMap.setStyle(mapboxOptions.style as mapboxgl.StyleSpecification | string);
  }
  // Add more options to update as needed
}

function isCoordinate(data: unknown): data is Coordinate {
  return typeof data == 'object'
    && typeof (data as any)?.['latitude'] === 'number'
    && typeof (data as any)?.['longitude'] === 'number';
}

function getDefaultCoordinate<T>(result: Result<T>): Coordinate | undefined {
  const yextDisplayCoordinate: Coordinate = (result.rawData as any)['yextDisplayCoordinate'];
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
    console.warn(`Locale "${locale}" is not supported.`);
  }
  return 'en';
}

function getLocationFilterValue(staticFilters: SelectableStaticFilter[]): [number, number] | undefined {
  const locationFilter = staticFilters.find(f => (f.filter as any)['fieldId'] === 'builtin.location' && (f.filter as any)['value'])?.filter;
  if (locationFilter) {
    const { lat, lng } = (locationFilter as any)['value'];
    return [lng, lat];
  }
}
