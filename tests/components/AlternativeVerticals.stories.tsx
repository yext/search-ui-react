import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { AlternativeVerticals } from '../../src/components/AlternativeVerticals';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { verticalNoResults } from '../__fixtures__/data/verticalnoresults';

const meta: ComponentMeta<typeof AlternativeVerticals> = {
  title: 'AlternativeVerticals',
  component: AlternativeVerticals,
};
export default meta;

const mockedHeadlessState = {
  ...VerticalSearcherState,
  vertical: verticalNoResults
};

const verticalConfigMap = {
  faqs: { label: 'FAQs' },
  events: { label: 'Events' },
  locations: { label: 'Locations' }
};

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={verticalConfigMap}
        displayAllOnNoResults={false}
      />
    </AnswersHeadlessContext.Provider>
  );
};

export const DisplayAllOnNoResults = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={verticalConfigMap}
        displayAllOnNoResults={true}
      />
    </AnswersHeadlessContext.Provider>
  );
};


export const Loading = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: {
        isLoading: true
      }
    })}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={verticalConfigMap}
        displayAllOnNoResults={true}
      />
    </AnswersHeadlessContext.Provider>
  );
};
