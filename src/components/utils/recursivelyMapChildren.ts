import { Children, cloneElement, isValidElement, ReactElement, ReactNode, ReactPortal } from 'react';

/**
 * Recursively performs React.Children.map on a given ReactNode.
 */
export function recursivelyMapChildren(
  children: ReactNode,
  elementReplacer: (c: ReactElement | ReactPortal, index: number) => ReactNode | null
): ReactNode {
  return Children.map<ReactNode, ReactNode>(children, (c, index) => {
    if (!isValidElement(c)) {
      return c;
    }
    const replacedElement = elementReplacer(c, index);
    if (!replacedElement || !isValidElement(replacedElement)) {
      return replacedElement;
    }
    if (!('props' in replacedElement)) {
      return replacedElement;
    }
    const grandchildren = (replacedElement as ReactElement<{ children?: ReactNode }>).props.children;
    if (!grandchildren) {
      return replacedElement;
    }
    const replacedGrandchildren = recursivelyMapChildren(grandchildren, elementReplacer);
    return cloneElement(replacedElement, {}, [replacedGrandchildren]);
  });
}