import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { StandardFacets, StandardFacetsProps } from '../../src';

const meta: ComponentMeta<typeof StandardFacets> = {
  title: 'StandardFacets',
  component: StandardFacets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary = (args: StandardFacetsProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <StandardFacets {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const NoOptionCounts = (args: StandardFacetsProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <StandardFacets {...args} showOptionCounts={false} />
    </AnswersHeadlessContext.Provider>
  );
};
