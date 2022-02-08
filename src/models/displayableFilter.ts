import { Filter } from '@yext/answers-headless-react';

export interface DisplayableFilter {
  filterType: 'NLP_FILTER' | 'STATIC_FILTER' | 'FACET',
  filter: Filter,
  groupLabel: string,
  label: string
}
