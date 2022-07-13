import { Wrapper } from '@googlemaps/react-wrapper';
import { Result, useAnswersState } from '@yext/answers-headless-react';
import React from 'react';
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
  apiKey: string,
  centerLatitude: number,
  centerLongitude: number,
  defaultZoom: number,
  showEmptyMap: boolean,
  locale: string,
  providerOptions?: google.maps.MapOptions,
  customCssClasses?: GoogleMapsCssClasses
}

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: 'mb-6',
  mapElement: 'h-96'
};

export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <Wrapper apiKey={props.apiKey}>
        <UnwrappedGoogleMaps {...props}/>
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  customCssClasses
}: GoogleMapsProps) {

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

  const locationResults = useAnswersState(state => state.vertical.results) || [];
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);

  const results = locationResults;
  console.log(results);

  const markers = useRef<google.maps.Marker[]>([]); // use hook here?
  deleteMarkers();

  markers.current = [];
  for (const result of results) {
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map
    });

    markers.current.push(marker);
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
    }
    markers.current = [];
  }

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  return (
    <div className={cssClasses.googleMapsContainer}>
      <div className={cssClasses.mapElement} ref={ref} id="map" />
    </div>
  );
}

function getPosition(result: Result){
  const lat = (result.rawData as any).displayCoordinate.latitude;
  const lng = (result.rawData as any).displayCoordinate.longitude;
  return { lat, lng };
}
