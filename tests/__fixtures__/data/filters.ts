import { DisplayableFacet, Matcher, SelectableFilter as DisplayableFilter } from '@yext/search-headless-react';
import { RemovableFilter } from '../../../src/components/AppliedFiltersDisplay';

function createRemovableFilter(value: string) {
  return {
    displayName: value,
    handleRemove: () => console.log('Remove', value),
    filter: {
      value: value,
      matcher: Matcher.Equals,
      fieldId: 'c_custom'
    }
  };
}

export const RemovableFilters: RemovableFilter[] = [
  'Toaster', 'Mixer', 'Value 4', 'Value 1', 'Value 2'
].map(createRemovableFilter);

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

export const staticFilters: DisplayableFilter[] = [
  {
    fieldId: 'c_puppyPreference',
    value: 'Bleecker',
    displayName: 'Bleecker',
    matcher: Matcher.Equals,
    selected: true
  },
  {
    fieldId: 'c_puppyPreference',
    value: 'Clifford',
    displayName: 'Clifford',
    matcher: Matcher.Equals,
    selected: false
  }
];
