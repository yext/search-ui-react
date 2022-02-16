import classNames from 'classnames';
import ChevronIcon from '../../icons/ChevronIcon';
import { useFilterGroupContext } from './FilterGroupContext';

/**
 * Props for {@link Filters.CollapsibleLabel}.
 * 
 * @public
 */
export type CollapsibleLabelProps = {
  /** The label's text value which is displayed by the component. */
  label?: string
};

/**
 * CollapsibleLabel is a button for collapsing and expanding filters
 * within a parent {@link Filters.FilterGroup}.
 *
 * For more customization, use {@link Filters.FilterGroupContext} directly.
 * 
 * @public
 */
export default function CollapsibleLabel({ label }: CollapsibleLabelProps): JSX.Element {
  const { isExpanded, getToggleProps } = useFilterGroupContext();
  const iconClassName = classNames('w-3', {
    'transform rotate-180': !isExpanded
  });

  return (
    <button className='w-full flex justify-between items-center mb-4' {...getToggleProps()}>
      <div className='text-gray-900 text-sm font-medium text-left'>
        {label}
      </div>
      <ChevronIcon className={iconClassName}/>
    </button>
  );
}
