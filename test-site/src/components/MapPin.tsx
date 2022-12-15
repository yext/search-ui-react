import { useEffect, useRef, useState, useCallback } from 'react';
import { Popup, LngLatLike } from 'mapbox-gl';
import { PinComponent, Coordinate } from '@yext/search-ui-react';
import { Location } from '../pages/LocationsPage';

const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

export const MapPin: PinComponent<Location> = props => {
  const { mapbox, result } = props;
  const yextCoordinate = result.rawData.yextDisplayCoordinate;
  const [active, setActive] = useState(false);
  const popupRef = useRef(new Popup({ offset: 15 })
    .on('close', () => setActive(false))
  );

  useEffect(() => {
    if (active && yextCoordinate) {
      popupRef.current
        .setLngLat(transformToMapboxCoord(yextCoordinate))
        .setText(result.name || 'unknown location')
        .addTo(mapbox);
    }
  }, [active, mapbox, result, yextCoordinate]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick} aria-label='Show pin details'>
      <svg
        width="33" height="42"
        viewBox="0 0 30 38"
        fill="#1e293b"
        stroke="#fff"
        strokeWidth="2px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z" />
      </svg>
    </button>
  );
};
