import classNames from 'classnames';
import { ChevronIcon } from '../../icons/ChevronIcon';
import { useFilterGroupContext } from './FilterGroupContext';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';

/**
 * The CSS class interface for {@link CollapsibleLabelProps}.
 *
 * @public
 */
export interface CollapsibleLabelCssClasses {
  label?: string
}

/**
 * Props for {@link Filters.CollapsibleLabel}.
 *
 * @public
 */
export interface CollapsibleLabelProps {
  /** The label's text value which is displayed by the component. */
  label?: string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: CollapsibleLabelCssClasses
}

export const builtInCssClasses: Readonly<CollapsibleLabelCssClasses> = {
  label: 'text-neutral-dark text-sm font-medium text-left',
};

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
export function CollapsibleLabel({ label, customCssClasses }: CollapsibleLabelProps): JSX.Element {
  const { isExpanded, getToggleProps } = useFilterGroupContext();
  const iconClassName = classNames('w-3 text-gray-400', {
    'transform rotate-180': !isExpanded
  });
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  return (
    <button className='w-full flex justify-between items-center mb-4' {...getToggleProps()}>
      <div className={cssClasses.label}>
        {label}
      </div>
      <ChevronIcon className={iconClassName}/>
    </button>
  );
}
