import { DisplayableFacetOption } from '@yext/search-headless-react';

export function getOptionLabelText(option: DisplayableFacetOption) {
  return `${option.displayName} (${option.count})`;
}
