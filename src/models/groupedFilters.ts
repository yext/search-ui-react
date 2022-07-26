import { SelectableFilter as DisplayableFilter } from '@yext/search-headless-react';

/**
 * DisplayableHierarchicalFacet is a DisplayableFilter with additional metadata, including a reference
 * to its original parent DisplayableFacet.
 */
export type DisplayableHierarchicalFacet = Omit<DisplayableFilter, 'value'> & {
  /** The displayName is a guaranteed property */
  displayName: string,
  /** The value on a DisplayableHierarchicalFacet is guaranteed to be a string. */
  value: string,
  /**
   * The displayName but split into multiple tokens by some delimiter.
   * This exists for convenience and to reduce the number of Array.prototype.split() calls needed.
   **/
  displayNameTokens: string[],
  /** The last value of displayNameTokens, for convenience. */
  lastDisplayNameToken: string
};