import classNames from 'classnames';
import { ChevronIcon } from '../../icons/ChevronIcon';
import { useFilterGroupContext } from './FilterGroupContext';

/**
 * Props for {@link Filters.CollapsibleLabel}.
 *
 * @public
 */
export interface CollapsibleLabelProps {
  /** The label's text value which is displayed by the component. */
  label?: string
}

/**
 * CollapsibleLabel is a button for collapsing and expanding filters within a parent
 * {@link Filters.FilterGroupProvider}.
 *
 * For more customization, use {@link Filters.FilterGroupContext} directly.
 *
 * @param props - {@link Filters.CollapsibleLabelProps}
 *
 * @public
 */
export function CollapsibleLabel({ label }: CollapsibleLabelProps): JSX.Element {
  const { isExpanded, getToggleProps } = useFilterGroupContext();
  const iconClassName = classNames('w-3 text-gray-400', {
    'transform rotate-180': !isExpanded
  });

  return (
    <button className='w-full flex justify-between items-center mb-4' {...getToggleProps()}>
      <div className='text-neutral-dark text-sm font-medium text-left'>
        {label}
      </div>
      <ChevronIcon className={iconClassName}/>
    </button>
  );
}
