import { ComponentPropsWithRef } from 'react';

const defaultClassName = 'w-full h-px bg-gray-200 my-4';

export default function Divider(props: ComponentPropsWithRef<'div'>): JSX.Element {
  return (
    <div {...props} className={props.className ?? defaultClassName}>
      {props.children}
    </div>
  );
}