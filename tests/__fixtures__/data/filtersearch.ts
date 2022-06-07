import { FilterSearchResponse } from '@yext/answers-headless-react';

export const unsectionedFilterSearchResponse = {
  sections: [
    {
      results: [
        {
          value: 'first name 1'
        },
        {
          value: 'first name 2'
        },
        {
          value: 'last name 1'
        }
      ],
    }
  ],
  uuid: ''
};

export const sectionedFilterSearchResponse = {
  sections: [
    {
      results: [
        {
          value: 'first name 1'
        },
        {
          value: 'first name 2'
        }
      ],
      label: 'First name'
    },
    {
      results: [
        {
          value: 'last name 1'
        }
      ],
      label: 'Last name'
    }
  ],
  uuid: ''
};

export const mockedFilterSearchResponse: FilterSearchResponse = {
  sections: [{
    label: 'People',
    results: [
      { value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } },
      { value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  },
  {
    label: 'Condiments',
    results: [
      { value: 'Jam',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  }],
  uuid: null
};

export const mockedFilterSearchResponseNoLabels: FilterSearchResponse = {
  sections: [{
    results: [
      { value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } },
      { value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  }],
  uuid: null
};

export const mockedFilterSearchResponseNoResults: FilterSearchResponse = {
  sections: [{
    results:[]
  }],
  uuid: null
};

