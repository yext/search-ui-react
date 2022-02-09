import useCollapse from "react-collapsed";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { CheckboxOptionCssClasses } from "./utils/renderCheckboxOption";
import { ReactComponent as DropdownIcon } from '../icons/chevron.svg';
import { PropsWithChildren } from "react";

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
}

export interface CollapsibleLabelCssClasses extends CheckboxOptionCssClasses {
  label?: string,
  labelIcon?: string,
  labelContainer?: string
}

/**
 * A label which can collapse its contents
 */
export default function CollapsibleLabel(props: PropsWithChildren<CollapsibleLabelProps>) {
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