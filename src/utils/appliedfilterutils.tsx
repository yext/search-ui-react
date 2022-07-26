import {
  AppliedQueryFilter,
  FiltersState,
  SelectableFilter as DisplayableFilter
} from '@yext/search-headless-react';
import { DisplayableHierarchicalFacet } from '../models/groupedFilters';

export function isDescendantHierarchicalFacet(
  displayName: string,
  displayNameTokens: string[],
  childDisplayName: string,
  delimiter: string
): boolean {
  const {
    displayNameTokens: parentTokens,
    lastDisplayNameToken: parentLastDisplayNameToken
  } = parentFacet;
  const parentDisplayName = parentFacet.displayName.trim();

  if (!childDisplayName.startsWith(parentDisplayName)) {
    return false;
  }

  const otherTokens = childDisplayName.split(delimiter).map(t => t.trim());
  if (otherTokens.length <= parentTokens.length) {
    return false;
  }

  // Ensure that we don't return true for parent = `a > b > c` and child = `a > book > c`
  // by checking that the second element of the child is exactly "b"
  const tokenAtIndexOfLastParentToken = otherTokens[parentTokens.length - 1];
  return parentLastDisplayNameToken === tokenAtIndexOfLastParentToken;
}
