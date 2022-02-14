import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export type CollapseButtonProps = PropsWithChildren<{
  className?: string
}>;

export default function CollapseButton(props: CollapseButtonProps): JSX.Element {
  const {
    className = 'w-full flex justify-between items-center mb-4',
    children
  } = props;
  const { getToggleProps } = useGroupContext();

  return (
    <button className={className} {...getToggleProps()}>
      {children}
    </button>
  );
}