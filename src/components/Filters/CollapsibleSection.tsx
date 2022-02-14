import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export type CollapsibleSectionProps = PropsWithChildren<{
  className?: string
}>;

export default function CollapsibleSection(props: CollapsibleSectionProps): JSX.Element {
  const {
    className = 'flex flex-col space-y-3',
    children
  } = props;

  const { getCollapseProps } = useGroupContext();

  return (
    <div className={className} {...getCollapseProps()}>
      {children}
    </div>
  );
}