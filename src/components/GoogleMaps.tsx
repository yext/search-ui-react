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

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
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
  const noResults = !locationResults.length;

  console.log(locationResults);

  const bounds = useRef(new google.maps.LatLngBounds()); // maybe not need ref
  const markers = useRef<google.maps.Marker[]>([]); // use ref because need to clear after new search
  deleteMarkers();

  for (const result of locationResults) {
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.current.extend(location);
    markers.current.push(marker);
  }

  map?.fitBounds(bounds.current);
  map?.panToBounds(bounds.current);

  function deleteMarkers(): void {
    for (let i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
    }
    markers.current = [];
    bounds.current = new google.maps.LatLngBounds();
  }

  let googleMapsContainerCssClass = cssClasses.googleMapsContainer;
  let mapElementCssClasses = cssClasses.mapElement;

  if (noResults) {
    googleMapsContainerCssClass = 'h-0';
    mapElementCssClasses = 'h-0';
  }

  return (
    <div className={googleMapsContainerCssClass}>
      <div className={mapElementCssClasses} ref={ref} />
    </div>
  );
}

function getPosition(result: Result){
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}
