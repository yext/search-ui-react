import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import LoadingIndicator from '../icons/LoadingIndicator';
import { YextIcon } from '../icons/YextIcon';
import { useGeolocationHandler } from '../hooks/useGeolocationHandler';

/**
 * The CSS class interface for the Geolocation component.
 *
 * @public
 */
export interface GeolocationCssClasses {
  geolocationContainer?: string,
  button?: string,
  iconContainer?: string
}

const builtInCssClasses: Readonly<GeolocationCssClasses> = {
  geolocationContainer: 'text-sm text-neutral text-center justify-center items-center flex flex-row',
  button: 'text-primary font-semibold hover:underline focus:underline',
  iconContainer: 'w-4 ml-2'
};

/**
 * The props for the Geolocation component.
 *
 * @public
 */
export interface GeolocationProps {
  /**
   * Configuration used when collecting the user's location.
   * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
   */
  geolocationOptions?: PositionOptions,
  /**
   * The radius, in miles, around the user's location to find results. Defaults to 50.
   * If location accuracy is low, a larger radius may be used automatically.
   */
  radius?: number,
  /** The label for the button. Defaults to 'Use my location'. */
  label?: string,
  /** Custom icon component to display along with the button. */
  GeolocationIcon?: React.FunctionComponent,
  /**
   * A function which is called when the geolocation button is clicked,
   * after user's position is successfully determined.
   */
  handleClick?: (position: GeolocationPosition) => void,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: GeolocationCssClasses
}

/**
 * A React Component which collects location information to create a
 * location filter and perform a new search.
 *
 * @public
 *
 * @param props - {@link GeolocationProps}
 * @returns A react component for geolocation
 */
export function Geolocation({
  geolocationOptions,
  radius = 50,
  label = 'Use my location',
  //TODO: replace default icon with SVG create from design team
  GeolocationIcon = YextIcon,
  handleClick,
  customCssClasses,
}: GeolocationProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const [handleGeolocationClick, isFetchingUserLocation] = useGeolocationHandler({
    geolocationOptions,
    radius,
    handleUserPosition: handleClick
  });

  return (
    <div className={cssClasses.geolocationContainer}>
      <button className={cssClasses.button} onClick={handleGeolocationClick}>
        {label}
      </button>
      <div className={cssClasses.iconContainer}>
        {isFetchingUserLocation ? <LoadingIndicator /> : <GeolocationIcon />}
      </div>
    </div>
  );
}
