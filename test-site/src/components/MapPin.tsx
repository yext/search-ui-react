import { PinComponent } from '@yext/search-ui-react';
import { Location } from '../pages/LocationsPage';

export const MapPin: PinComponent<Location> = () => {
  return (
    <div className='relative z-10'>
      <svg
        className='z-40 fill-slate-800 hover:fill-slate-500 stroke-2 stroke-white'
        width="33" height="42"
        viewBox="0 0 30 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z" />
      </svg>
    </div>
  );
};
