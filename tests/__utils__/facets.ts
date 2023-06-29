import { DisplayableFacetOption, FacetOption, SearchActions } from '@yext/search-headless-react';

export function getOptionLabelTextWithCount(option: DisplayableFacetOption) {
  return `${option.displayName} (${option.count})`;
}

export function expectFacetOptionSet(
  actions: SearchActions,
  fieldId: string,
  option: FacetOption,
  selected: boolean
) {
  expect(actions.setFacetOption).toHaveBeenCalledWith(
    fieldId,
    { matcher: option.matcher, value: option.value },
    selected
  );
}
