import { ComponentPropsWithRef } from 'react';
import { PageSize, usePageSize } from '../../hooks/usePageView';

/**
 * Props for {@link Filters.ResponsiveDivider}.
 */
export type ResponsiveDividerProps = {
  /** The browser width in pixels at which the class names for the divider is switched.
   * 
   * @remarks
   * Defaults to 768.
   */
  mobileBreakpoint?: number,
  /** CSS class names applied to the divider above the mobileBreakpoint. */
  desktopClassName?: string,
  /** CSS class names applied to the divider equal to or below the mobileBreakpoint. */
  mobileClassName?: string
} & ComponentPropsWithRef<'div'>;

/**
 * A convenience component for our recommended divider styling.
 *
 * @remarks
 * By default, automatically resizes to full screen width at our default mobile breakpoint.
 * 
 * @public
 */
export default function ResponsiveDivider(props: ResponsiveDividerProps): JSX.Element {
  const {
    mobileBreakpoint,
    desktopClassName = 'w-full h-px bg-gray-200 my-4',
    mobileClassName = 'w-screen relative right-4 border-t border-gray-200 my-4',
    ...divProps
  } = props;

  const [pageSize] = usePageSize(mobileBreakpoint);
  const className = pageSize === PageSize.Mobile ? mobileClassName : desktopClassName;

  return (
    <div {...divProps} className={className}>
      {props.children}
    </div>
  );
}