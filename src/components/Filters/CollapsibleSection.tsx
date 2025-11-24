import React, { PropsWithChildren } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';

/**
 * Props for the {@link Filters.CollapsibleSection}.
 *
 * @public
 */
export type CollapsibleSectionProps = PropsWithChildren<{
  /** CSS classes applied to the component's container div. */
  className?: string,
  /** Whether or not the section is collapsible. Defaults to true. */
  collapsible?: boolean
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
    collapsible = true,
    children
  } = props;

  const { getCollapseProps } = useFilterGroupContext();

  // When collapsible is false, don't apply collapse props to avoid orphaned ARIA attributes
  const collapseProps = collapsible ? getCollapseProps() : {};

  return (
    <div className={className} {...collapseProps}>
      {children}
    </div>
  );
}