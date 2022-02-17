import { ComponentPropsWithRef } from 'react';
import { PageSize, usePageSize } from '../../hooks/usePageView';

export type ResponsiveDividerProps = {
  mobileBreakpoint?: number,
  desktopClassName?: string,
  mobileClassName?: string
} & ComponentPropsWithRef<'div'>;

/**
 * A convenience component for our recommended divider styling.
 *
 * By default, automatically resizes to full screen width at our default mobile breakpoint.
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