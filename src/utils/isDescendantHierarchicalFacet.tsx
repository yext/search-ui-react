/**
 * Given a parent displayName and corresponding tokens, and a child displayName and corresponding
 * tokens that we want to check, return whether the "child" is actually a descendant of the "parent"
 *
 * @internal
 */
export function isDescendantHierarchicalFacet(
  descendantTokens: string[],
  parentTokens: string[]
): boolean {
  if (descendantTokens.length <= parentTokens.length) {
    return false;
  }

  for (let i = 0; i < parentTokens.length; i++) {
    if (descendantTokens[i] !== parentTokens[i]) {
      return false;
    }
  }

  return true;
}
