import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { NumericalFacets, NumericalFacetsProps } from '../../src';

const meta: ComponentMeta<typeof NumericalFacets> = {
  title: 'NumericalFacets',
  component: NumericalFacets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary = (args: NumericalFacetsProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <NumericalFacets {...args} />
    </AnswersHeadlessContext.Provider>
  );
};
