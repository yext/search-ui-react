import { Children, cloneElement, isValidElement, ReactElement, ReactNode, ReactPortal } from 'react';

/**
 * Recursively performs React.Children.map on a given ReactNode.
 */
export default function recursivelyMapChildren(
  children: ReactNode,
  elementReplacer: (c: ReactElement | ReactPortal, index: number) => ReactElement | null
): ReactNode {
  return Children.map<ReactNode, ReactNode>(children, (c, index) => {
    if (!isValidElement(c)) {
      return c;
    }
    const replacedElement = elementReplacer(c, index);
    if (!replacedElement) {
      return replacedElement;
    }
    const grandchildren = replacedElement.props.children;
    if (!grandchildren) {
      return replacedElement;
    }
    const replacedGrandchildren = recursivelyMapChildren(grandchildren, elementReplacer);
    return cloneElement(replacedElement, { children: replacedGrandchildren });
  });
}