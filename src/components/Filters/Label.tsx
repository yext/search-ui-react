import { ComponentPropsWithRef } from 'react';

const defaultClassName = 'text-gray-900 text-sm font-medium text-left';

export default function Label(props: ComponentPropsWithRef<'div'>): JSX.Element {
  return (
    <div {...props} className={defaultClassName ?? props.className}>
      {props.children}
    </div>
  );
}
