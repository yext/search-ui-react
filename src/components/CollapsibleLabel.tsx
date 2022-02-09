import useCollapse from 'react-collapsed';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { CheckboxOptionCssClasses } from './utils/renderCheckboxOption';
import DropdownIcon from '../icons/ChevronIcon';
import { PropsWithChildren } from 'react';

interface CollapsibleLabelProps {
  collapsible?: boolean,
  label: string,
  defaultExpanded?: boolean,
  customCssClasses?: CollapsibleLabelCssClasses,
  cssCompositionMethod?: CompositionMethod
}

const builtInCssClasses: CollapsibleLabelCssClasses = {
  label: 'text-gray-900 text-sm font-medium text-left',
  labelIcon: 'w-3',
  labelContainer: 'w-full flex justify-between items-center mb-4'
};

/**
 * The CSS class interface used for {@link CollapsibleLabel}.
 */
export interface CollapsibleLabelCssClasses extends CheckboxOptionCssClasses {
  /**
   * Styling applied to the label.
   */
  label?: string,
  /**
   * Styling applied to the dropdown icon.
   */
  labelIcon?: string,
    /**
   * Styling applied to outermost container of the label and its children element.
   */
  labelContainer?: string
}

/**
 * A label which can collapse its contents
 */
export default function CollapsibleLabel(props: PropsWithChildren<CollapsibleLabelProps>): JSX.Element {
  const {
    label,
    collapsible = true,
    defaultExpanded = true,
    customCssClasses,
    cssCompositionMethod
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const modifiedLabelIconCssClasses = isExpanded
    ? cssClasses.labelIcon
    : cssClasses.labelIcon + ' transform rotate-180';

  return (
    <fieldset>
      <button className={cssClasses.labelContainer} {...(collapsible ? getToggleProps() : {})}>
        <div className={cssClasses.label}>{label}</div>
        {collapsible && <DropdownIcon className={modifiedLabelIconCssClasses}/>}
      </button>
      <div {...(collapsible ? getCollapseProps() : {})}>
        {props.children}
      </div>
    </fieldset>
  );
}