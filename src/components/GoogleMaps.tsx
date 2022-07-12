import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef } from 'react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';

/**
 * CSS class interface for the {@link GoogleMaps}
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string,
  mapElement?: string
}

/**
 * Props for the {@link GoogleMaps}
 */
export interface GoogleMapsProps {
  centerLatitude: number,
  centerLongitude: number,
  zoom: number,
  customCssClasses?: GoogleMapsCssClasses
}

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  mapElement: 'h-96'
};

export function GoogleMaps({
  centerLatitude,
  centerLongitude,
  zoom,
  customCssClasses
}: GoogleMapsProps) {

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  function UnwrappedGoogleMaps() {
    const center: google.maps.LatLngLiteral = {
      lat: centerLatitude,
      lng: centerLongitude
    };

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (ref.current) {
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
      } else {
        console.error('An error has occurred using the Google Maps API');
      }
    });
    return <div className={cssClasses.mapElement} ref={ref} id="map" />;
  }

  return (
    <div className={cssClasses.googleMapsContainer}>
      <Wrapper apiKey='AIzaSyB5D45ghF1YMfqTLSzWubmlCN1euBVPhFw'>
        <UnwrappedGoogleMaps />
      </Wrapper>
    </div>
  );
}