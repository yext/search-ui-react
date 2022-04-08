import { DisplayableFacet, Matcher, SelectableFilter as DisplayableFilter } from '@yext/answers-headless-react';
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
    displayName: 'hierarchical',
    displayNameTokens: ['Appliances', 'Small Appliances', 'Toaster'],
    lastDisplayNameToken: 'Toaster'
  },
  {
    selected: true,
    fieldId: 'hierarchicalField',
    value: 'Appliances > Small Appliances > Mixer',
    matcher: Matcher.Equals,
    displayName: 'hierarchical',
    displayNameTokens: ['Appliances', 'Small Appliances', 'Mixer'],
    lastDisplayNameToken: 'Mixer'
  }
];

export const DisplayableFacets: DisplayableFacet[] = [
  {
    fieldId: 'products',
    options: [
      {
        value: 'coffee',
        matcher: Matcher.Equals,
        count: 5,
        displayName: 'coffee',
        selected: false
      },
      {
        value: 'tea',
        matcher: Matcher.Equals,
        count: 3,
        displayName: 'tea',
        selected: true
      }
    ],
    displayName: 'Products'
  },
  {
    fieldId: 'price',
    options: [
      {
        value: {
          start: {
            matcher: Matcher.GreaterThanOrEqualTo,
            value: 0
          },
          end: {
            matcher: Matcher.LessThan,
            value: 9
          }
        },
        matcher: Matcher.Between,
        count: 7,
        displayName: '0 - 9',
        selected: true
      },
      {
        value: {
          start: {
            matcher: Matcher.GreaterThan,
            value: 9
          }
        },
        matcher: Matcher.Between,
        count: 1,
        displayName: 'Over 9',
        selected: false
      }
    ],
    displayName: 'Price'
  }
];
