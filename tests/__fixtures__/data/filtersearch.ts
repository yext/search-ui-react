import { FilterSearchResponse, Matcher } from '@yext/answers-headless-react';

export const unsectionedFilterSearchResponse: FilterSearchResponse = {
  sections: [
    {
      results: [
        {
          value: 'first name 1',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'first name 1' }
        },
        {
          value: 'first name 2',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'first name 2' }
        },
        {
          value: 'last name 1',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'last name 1' }
        }
      ],
    }
  ],
  uuid: ''
};

export const sectionedFilterSearchResponse: FilterSearchResponse = {
  sections: [
    {
      results: [
        {
          value: 'first name 1',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'first name 1' }
        },
        {
          value: 'first name 2',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'first name 2' }
        }
      ],
      label: 'First name'
    },
    {
      results: [
        {
          value: 'last name 1',
          filter: { fieldId: 'ce_person', matcher: Matcher.Equals, value: 'last name 1' }
        }
      ],
      label: 'Last name'
    }
  ],
  uuid: ''
};

export const noResultsFilterSearchResponse: FilterSearchResponse = {
  sections: [{
    results:[]
  }],
  uuid: null
};

