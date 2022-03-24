import { DisplayableFacet, Matcher } from '@yext/answers-headless-react';

export function createHierarchicalFacet(
  options: (string | { value: string, selected?: boolean })[],
  fieldId = 'hier'
): DisplayableFacet {
  const transformedOptions = options
    .map(o => typeof o === 'string' ? { value: o, selected: false } : o)
    .map(o => ({
      value: o.value,
      displayName: o.value,
      selected: o.selected,
      count: 82,
      matcher: Matcher.Equals
    }));

  return {
    fieldId,
    displayName: '_unused',
    options: transformedOptions
  };
}