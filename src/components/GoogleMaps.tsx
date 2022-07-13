import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef, useState } from 'react';
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

export function GoogleMaps(props: GoogleMapsProps) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses);

  return (
    <div className={cssClasses.googleMapsContainer}>
      <Wrapper apiKey='AIzaSyB5D45ghF1YMfqTLSzWubmlCN1euBVPhFw'>
        <UnwrappedGoogleMaps cssClasses={cssClasses} {...props}/>
      </Wrapper>
    </div>
  );
}

interface UnwrappedGoogleMapsProps extends Omit<GoogleMapsProps, 'customCssClasses'>{
  cssClasses: GoogleMapsCssClasses
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  zoom,
  cssClasses
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const [center] = useState<google.maps.LatLngLiteral>({
    lat: centerLatitude,
    lng: centerLongitude
  });

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
      }));
    }
  }, [center, map, zoom]);

  new google.maps.Marker({
    position: {
      lat: centerLatitude,
      lng: centerLongitude
    },
    map
  });

  return <div className={cssClasses.mapElement} ref={ref} id="map" />;
}