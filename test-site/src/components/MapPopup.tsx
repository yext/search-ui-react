import { Result } from '@yext/search-headless-react';
import { Location } from '../pages/LocationsPage';

interface MapPopupProps {
  entity: Result<Location>
}

export const MapPopup = ({ entity }: MapPopupProps) => {
  return (
    <div>
      {entity.name}
    </div>
  );
}