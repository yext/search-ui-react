import { DisplayableFacet, Matcher, SelectableStaticFilter } from '@yext/search-headless-react';
import { RemovableFilter } from '../../../src/components/AppliedFiltersDisplay';
import { StaticFiltersProps } from '../../../src/components/StaticFilters';
import { createHierarchicalFacet } from '../../__utils__/hierarchicalfacets';

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
  },
  createHierarchicalFacet([
    'food',
    'food > fruit',
    { value: 'food > fruit > banana', selected: true },
    'food > fruit > apple',
  ])
];

export const staticFilters: SelectableStaticFilter[] = [
  {
    filter: {
      kind: 'fieldValue',
      fieldId: 'c_puppyPreference',
      value: 'Bleecker',
      matcher: Matcher.Equals,
    },
    displayName: 'Bleecker',
    selected: true
  },
  {
    filter: {
      kind: 'fieldValue',
      fieldId: 'c_puppyPreference',
      value: 'Clifford',
      matcher: Matcher.Equals
    },
    displayName: 'Clifford',
    selected: false
  }
];

export const staticFiltersProps: StaticFiltersProps = {
  fieldId: 'c_puppyPreference',
  title: 'Puppy Preference',
  filterOptions: [
    {
      value: 'Marty',
      displayName: 'MARTY!'
    },
    {
      value: 'Frodo',
      selectedByDefault: true
    },
    {
      value: 'Bleecker'
    },
    {
      value: 'Clifford',
      selectedByDefault: false
    }
  ]
};
