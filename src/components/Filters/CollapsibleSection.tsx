import { PropsWithChildren } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';

/**
 * Props for the {@link Filters.CollapsibleSection}.
 *
 * @public
 */
export type CollapsibleSectionProps = PropsWithChildren<{
  /** CSS classes applied to the component's container div. */
  className?: string
}>;

/**
 * CollapsibleSection are used for collapsing and un-collapsing groups of filters.
 * It is intended to be used with {@link Filters.CollapsibleLabel}s within the same
 * {@link Filters.FilterGroupProvider}.
 *
 * @param props - {@link Filters.CollapsibleSectionProps}
 *
 * @public
 */
export function CollapsibleSection(props: CollapsibleSectionProps): JSX.Element {
  const {
    className = 'space-y-3',
    children
  } = props;

  const { getCollapseProps } = useFilterGroupContext();

  return (
    <div className={className} {...getCollapseProps()}>
      {children}
    </div>
  );
}