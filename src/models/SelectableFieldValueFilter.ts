import { FieldValueFilter } from '@yext/search-headless-react';

export interface SelectableFieldValueFilter extends FieldValueFilter {
  selected: boolean,
  displayName?: string
}