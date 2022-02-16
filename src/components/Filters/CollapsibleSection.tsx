import { PropsWithChildren } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';

export type CollapsibleSectionProps = PropsWithChildren<{
  className?: string
}>;

/**
 * CollapsibleSection are used for collapsing and un-collapsing groups of filters.
 * It is intended to be used with a {@link Filters.CollapsibleLabel}
 * within the same {@link Filters.FilterGroup}.
 */
export default function CollapsibleSection(props: CollapsibleSectionProps): JSX.Element {
  const {
    className = 'flex flex-col space-y-3',
    children
  } = props;

  const { getCollapseProps } = useFilterGroupContext();

  return (
    <div className={className} {...getCollapseProps()}>
      {children}
    </div>
  );
}