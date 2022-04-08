import { Matcher, SelectableFilter as DisplayableFilter } from '@yext/answers-headless-react';
import { DisplayableHierarchicalFacet } from '../../../src/models/groupedFilters';

export const DisplayableFilters: DisplayableFilter[] = [
  {
    selected: true,
    fieldId: 'field1',
    value: 'value1',
    matcher: Matcher.Equals,
    displayName: 'Value 1'
  },
  {
    selected: true,
    fieldId: 'field2',
    value: 'value2',
    matcher: Matcher.Equals,
    displayName: 'Value 2'
  },
  {
    selected: true,
    fieldId: 'field3',
    value: 'value3',
    matcher: Matcher.Equals,
    displayName: 'Value 3'
  },
  {
    selected: true,
    fieldId: 'field4',
    value: 'value4',
    matcher: Matcher.Equals,
    displayName: 'Value 4'
  },
];

export const DisplayableHierarchicalFacets: DisplayableHierarchicalFacet[] = [
  {
    selected: true,
    fieldId: 'hierarchicalField',
    value: 'Appliances > Small Appliances > Toaster',
    matcher: Matcher.Equals,
    displayName: 'hierarchical1',
    displayNameTokens: ['Appliances', 'Small Appliances', 'Toaster'],
    lastDisplayNameToken: 'Toaster'
  },
  {
    selected: true,
    fieldId: 'hierarchicalField',
    value: 'Appliances > Small Appliances > Mixer',
    matcher: Matcher.Equals,
    displayName: 'hierarchical2',
    displayNameTokens: ['Appliances', 'Small Appliances', 'Mixer'],
    lastDisplayNameToken: 'Mixer'
  }
]