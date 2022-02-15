import classNames from 'classnames';
import { PropsWithChildren, ReactNode, ComponentPropsWithRef } from 'react';
import ChevronIcon from '../../icons/ChevronIcon';
import { useFilterGroupContext } from './FilterGroupContext';

export type CollapsibleLabelProps = {
  children?: ReactNode
};

/**
 * CollapsibleLabel is a convenience wrapper for a {@link CollapseButton}
 * with a simple {@link Label} and rotating icon.
 *
 * For more customization, use the {@link FilterGroupContext} directly.
 */
export default function CollapsibleLabel({ children }: CollapsibleLabelProps): JSX.Element {
  const { isExpanded } = useFilterGroupContext();
  const iconClassName = classNames('w-3', {
    'transform rotate-180': !isExpanded
  });

  return (
    <CollapseButton>
      <Label>{children}</Label>
      <ChevronIcon className={iconClassName}/>
    </CollapseButton>
  );
}

/**
 * CollapseButton toggles instances of {@link CollapsibleSection} that are in the same
 * {@link CollapsibleSection} as itself.
 */
function CollapseButton(props: PropsWithChildren<{
  className?: string
}>): JSX.Element {
  const {
    className = 'w-full flex justify-between items-center mb-4',
    children
  } = props;
  const { getToggleProps } = useFilterGroupContext();

  return (
    <button className={className} {...getToggleProps()}>
      {children}
    </button>
  );
}

/**
 * Label is a convenience component for our recommended label styling.
 */
function Label(props: ComponentPropsWithRef<'div'>): JSX.Element {
  const {
    className = 'text-gray-900 text-sm font-medium text-left'
  } = props;

  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  );
}