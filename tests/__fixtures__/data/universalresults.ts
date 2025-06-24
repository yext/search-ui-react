import { AppliedQueryFilterType, Matcher, Source, VerticalResults } from '@yext/search-headless-react';

const vertical1: VerticalResults = {
  appliedQueryFilters: [{
    displayKey: 'Job Category',
    displayValue: 'Sales',
    type: AppliedQueryFilterType.FieldValue,
    filter: {
      fieldId: 'c_jobCategory',
      matcher: Matcher.Equals,
      value: 'Sales'
    }
  }],
  queryDurationMillis: 500,
  results: [{
    rawData: {
      name: 'title1',
      description: 'text1',
      c_primaryCTA: {
        link: 'link1',
        label: 'job1',
        linkType: 'link'
      },
      c_secondaryCTA: {
        link: 'link2',
        label: 'job2',
        linkType: 'link'
      },
      uid: 'uid1'
    },
    source: Source.KnowledgeManager,
    id: 'id1'
  }, {
    rawData: {
      name: 'title2',
      description: 'text2',
      uid: 'uid2',
      link: 'link2'
    },
    source: Source.KnowledgeManager,
    id: 'id2'
  }],
  resultsCount: 2,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical1'
};

const vertical2: VerticalResults = {
  appliedQueryFilters: [],
  queryDurationMillis: 500,
  results: [{
    rawData: {
      name: 'title3',
      description: 'text3',
      uid: 'uid3'
    },
    source: Source.KnowledgeManager,
    id: 'id3'
  }],
  resultsCount: 1,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical2'
};

const vertical3: VerticalResults = {
  appliedQueryFilters: [],
  queryDurationMillis: 500,
  results: [],
  resultsCount: 0,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical3'
};

const vertical4: VerticalResults = {
  appliedQueryFilters: [],
  queryDurationMillis: 500,
  results: [{
    rawData: {
      name: 'title3',
      description: 'text3',
      uid: 'uid3'
    },
    source: Source.KnowledgeManager,
    id: 'id3'
  }],
  resultsCount: 1,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical4'
};

export const verticalResults = [
  vertical1,
  vertical2,
  vertical3
];

export const verticalResultsWithDuplicateEntity = [
  vertical1,
  vertical2,
  vertical3,
  vertical4
];
