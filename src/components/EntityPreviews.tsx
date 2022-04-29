import { Result, VerticalResults as VerticalResultsData, UniversalLimit } from '@yext/answers-headless-react';
import { cloneElement, isValidElement, ReactNode } from 'react';
import { DropdownItem } from './Dropdown/DropdownItem';
import { recursivelyMapChildren } from './utils/recursivelyMapChildren';

/**
 * The props for the {@link EntityPreviews} component.
 *
 * @public
 */
export interface EntityPreviewsProps {
  /** Results associated with the provided verticalKey are passed to the EntityPreviews children function. */
  verticalKey: string,
  /** The entity preview render function which is passed results for the specified vertical. */
  children: (results: Result[], index: number) => JSX.Element,
  /** Limits the number of results provided to the render function. */
  limit?: number
}

/**
 * EntityPreviews is intended for use within VisualSearchBar's renderEntityPreviews.
 * It provides results corresponding to its verticalKey through a props.children
 * Function as Compound Component (FACC).
 *
 * @public
 *
 * @remarks
 * You can optionally specify a limit for the results. This limit will be shared between
 * instances of EntityPreviews with the same verticalKey.
 */
export function EntityPreviews(_: EntityPreviewsProps): JSX.Element | null {
  return null;
}

/**
 * Recursively passes vertical results into instances of EntityPreview. To identify
 * entity preview elements, "isEntityPreview" is injected into the props of the rendered
 * children with type DropdownItem.
 */
export function transformEntityPreviews(
  entityPreviews: JSX.Element,
  verticalResultsArray: VerticalResultsData[]
): ReactNode {
  const verticalKeyToResults = getVerticalKeyToResults(verticalResultsArray);
  let index = 0;
  const renderedChildren = recursivelyMapChildren(entityPreviews, child => {
    if (!isValidElement(child) || child.type !== EntityPreviews) {
      return child;
    }
    const { verticalKey, children } = child.props as EntityPreviewsProps;
    if (!(verticalKey in verticalKeyToResults)) {
      return null;
    }
    const childrenWithResults = children(verticalKeyToResults[verticalKey], index++);
    return recursivelyMapChildren(childrenWithResults, child => {
      if (!isValidElement(child) || child.type !== DropdownItem) {
        return child;
      }
      return cloneElement(child, { itemData: { isEntityPreview: true, ...child.props.itemData } });
    });
  });
  return renderedChildren;
}

/**
 * @returns a mapping of vertical key to VerticalResults
 */
function getVerticalKeyToResults(verticalResultsArray: VerticalResultsData[]): Record<string, Result[]> {
  return verticalResultsArray.reduce<Record<string, Result[]>>((prev, current) => {
    prev[current.verticalKey] = current.results;
    return prev;
  }, {});
}

/**
 * Calculates the universalLimit query param from a ReactNode containing EntityPreviews.
 */
export function calculateUniversalLimit(children: ReactNode): UniversalLimit {
  const universalLimit: Record<string, number | null> = {};
  recursivelyMapChildren(children, c => {
    if (isValidElement(c) && c.type === EntityPreviews) {
      const { verticalKey, limit } = c.props as EntityPreviewsProps;
      universalLimit[verticalKey] = limit || null;
    }
    return c;
  });
  return Object.keys(universalLimit).reduce<UniversalLimit>((limitWithDefaults, verticalKey) => {
    limitWithDefaults[verticalKey] = universalLimit[verticalKey] ?? 4;
    return limitWithDefaults;
  }, {});
}

/**
 * Calculates the number of navigable entity previews from a ReactNode containing DropdownItems.
 */
export function calculateEntityPreviewsCount(children: ReactNode): number {
  let count = 0;
  recursivelyMapChildren(children, c => {
    if (isValidElement(c) && c.type === DropdownItem) {
      count++;
    }
    return c;
  });
  return count;
}