import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Map, Popup, LngLatLike } from 'mapbox-gl';
import { PinComponent, Coordinate } from '@yext/search-ui-react';
import { Result } from '@yext/search-headless-react';
import { Location } from '../pages/LocationsPage';
import { MapPopup } from './MapPopup';

interface MapPinProps {
  result: Result<Location>
  index: number
  mapbox: Map
}

const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

export const MapPin: PinComponent<Location> = (props: MapPinProps) => {
  const popupRef = useRef(new Popup({ offset: 15 }));
  const initialRender = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!initialRender.current && active) {
      const popup = document.createElement('div');
      ReactDOM.render(<MapPopup entity={props.result} />, popup);
      popupRef.current
        .setLngLat(coordinate)
        .setDOMContent(popup)
        .addTo(props.mapbox);
    }
    initialRender.current = false;
  }, [active]);

  const yextCoordinate: Location["yextDisplayCoordinate"] = props.result.rawData.yextDisplayCoordinate;
  if (!yextCoordinate) return <></>;
  const coordinate = transformToMapboxCoord(yextCoordinate);

  return (
    <button
      className='relative z-10'
      onClick={() => setActive(!active)}
    >
      <svg
        className='z-40 fill-slate-800 hover:fill-slate-500 stroke-2 stroke-white'
        width="33" height="42"
        viewBox="0 0 30 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z" />
      </svg>
    </button>
  );
};
