import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { UniversalResults } from '../../src/components/UniversalResults';
import { RecursivePartial } from '../__utils__/mocks';
import { verticalResults } from '../__fixtures__/data/universalresults';

const meta: ComponentMeta<typeof UniversalResults> = {
  title: 'UniversalResults',
  component: UniversalResults,
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  universal: {
    verticals: verticalResults
  }
};

const verticalConfigMap = {
  vertical1: {
    label: 'Vertical 1',
    viewAllButton: true
  }
};

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <UniversalResults verticalConfigMap={verticalConfigMap} />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: { isLoading: true }
    })}>
      <UniversalResults verticalConfigMap={verticalConfigMap} />
    </AnswersHeadlessContext.Provider>
  );
};
