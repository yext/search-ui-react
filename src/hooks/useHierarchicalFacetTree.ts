import { DisplayableFacet, FacetOption } from '@yext/answers-headless-react';
import { useMemo } from 'react';

/**
 * A tree of `HierarchicalFacetNode`s
 */
export type HierarchicalFacetTree = {
  [key: string]: HierarchicalFacetNode
};

/**
 * A single node of a `HierarchicalFacetTree`
 */
export type HierarchicalFacetNode = {
  selected: boolean,
  hasSelectedChild: boolean,
  facetOption: FacetOption,
  childTree: HierarchicalFacetTree,
  displayNameTokens: string[],
  lastDisplayNameToken: string
};

/**
 * Parses a `DisplayableFacet` into a `HierarchicalFacetTree`, then memoizes it.
 */
export function useHierarchicalFacetTree(
  hierarchicalFacet: DisplayableFacet,
  divider: string
): HierarchicalFacetTree {
  return useMemo(() => {
    return parseHierarchicalFacetTree(hierarchicalFacet, divider);
  }, [divider, hierarchicalFacet]);
}

function parseHierarchicalFacetTree(
  hierarchicalFacet: DisplayableFacet,
  divider: string
): HierarchicalFacetTree {
  const optionsInAscendingLength = hierarchicalFacet?.options.map(o => {
    const displayNameTokens = o.displayName.split(divider).map(s => s.trim());
    return {
      ...o,
      displayNameTokens
    };
  }).sort((a, b) => a.displayNameTokens.length - b.displayNameTokens.length) || [];

  const tree: HierarchicalFacetTree = {};

  optionsInAscendingLength.forEach(o => {
    const {
      displayNameTokens,
      displayName
    } = o;

    let subtree: HierarchicalFacetTree = tree;

    for (const token of displayNameTokens.slice(0, -1)) {
      if (!(token in subtree)) {
        console.error(
          `Error parsing hierarchical facet option "${displayName}" at token "${token}". Current tree:`,
          JSON.stringify(tree));
        return;
      }
      if (o.selected) {
        subtree[token].hasSelectedChild = true;
      }
      subtree = subtree[token].childTree;
    }

    const lastDisplayNameToken = displayNameTokens[displayNameTokens.length - 1];
    subtree[lastDisplayNameToken] = {
      selected: o.selected,
      displayNameTokens,
      lastDisplayNameToken,
      facetOption: {
        value: o.value,
        matcher: o.matcher
      },
      hasSelectedChild: false,
      childTree: {}
    };
  });

  return tree;
}