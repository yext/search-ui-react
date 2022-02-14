import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export type CollapseButtonProps = PropsWithChildren<{
  className?: string
}>;

/**
 * CollapseButton toggles instances of {@link CollapsibleSection} that are in the same
 * {@link CollapsibleSection} as itself.
 */
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