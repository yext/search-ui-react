import { CSSProperties, useMemo, useRef, useState } from 'react';
import { MapboxOptions, LngLatLike } from 'mapbox-gl';
import useLayoutEffect from 'use-isomorphic-layout-effect';

/**
 * Props for {@link MapboxStaticImage}
 */
export interface MapboxStaticImageProps {
  /** Mapbox access token. */
  mapboxAccessToken: string,
  /** Map customization for Mapbox static image. */
  mapboxOptions: Pick<MapboxOptions, 'center' | 'zoom' | 'style'>
}

/**
 * Renders a static map image using Mapbox Static Image API
 *
 * @internal
 */
export function MapboxStaticImage({
  mapboxAccessToken,
  mapboxOptions
}: MapboxStaticImageProps): JSX.Element | null {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [divDimension, setDivDimension] = useState<{ width: number, height: number }>();
  useLayoutEffect(() => {
    if (mapContainer.current) {
      setDivDimension({
        width: mapContainer.current.clientWidth,
        height: mapContainer.current.clientHeight
      });
    }
  }, []);

  const staticMapboxStyle: CSSProperties | undefined = useMemo(() => {
    const { style, center, zoom } = mapboxOptions;
    if (!divDimension || !center || !zoom || typeof style !== 'string') {
      return undefined;
    }
    const { width, height } = divDimension;
    const url = getMapboxStaticImageUrl({ mapboxAccessToken, style, center, zoom, width, height });
    if (!url) {
      return undefined;
    }
    return {
      backgroundImage: `url(${url})`
    };
  }, [divDimension, mapboxAccessToken, mapboxOptions]);

  return <div ref={mapContainer} className='col-span-full row-span-full' style={staticMapboxStyle}/>;
}

/**
 * The configuration for Mapbox Static Image API url
 */
interface MapboxStaticImageUrlConfig {
  /** Mapbox access token. */
  mapboxAccessToken: string,
  /** Mapbox stylesheet url to apply to the static map. */
  style: string,
  /** Center point of the static map. */
  center: LngLatLike,
  /** Zoom level of the static map. */
  zoom: number,
  /** Width (in pixels) of the image. */
  width: number,
  /** Height (in pixels) of the image. */
  height: number
}

function getMapboxStaticImageUrl(urlConfig: MapboxStaticImageUrlConfig): string | undefined {
  const { mapboxAccessToken, style, center, zoom, width, height } = urlConfig;
  // Mapbox Static Image API only support width and height between 1-1280 pixels.
  if (width > 1280 || height > 1280) {
    return undefined;
  }
  const stylesheet = style.split('mapbox://styles/')[1].split('?')[0];
  const centerAndZoom = `${center[0]},${center[1]},${zoom}`;
  const dimension = `${width}x${height}`;
  return `https://api.mapbox.com/styles/v1/${stylesheet}/static/${centerAndZoom}/${dimension}?access_token=${mapboxAccessToken}`;
}
