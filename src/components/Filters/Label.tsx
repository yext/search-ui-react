import { ComponentPropsWithRef } from 'react';

const defaultClassName = 'text-gray-900 text-sm font-medium text-left';

/**
 * Label is a convenience component for our recommended label styling.
 */
export default function Label(props: ComponentPropsWithRef<'div'>): JSX.Element {
  return (
    <div {...props} className={defaultClassName ?? props.className}>
      {props.children}
    </div>
  );
}
