import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export type CollapsibleSectionProps = PropsWithChildren<{
  className?: string
}>;

/**
 * CollapsibleSection are used for collapsing and un-collapsing groups of filters.
 * It is intended to be used with {@link CollapsibleButton}s within the same {@link Group}.
 */
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