import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { NumericalFacets, NumericalFacetsProps } from '../../src';
import React from 'react';

const meta: Meta<typeof NumericalFacets> = {
  title: 'NumericalFacets',
  component: NumericalFacets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary: StoryFn<NumericalFacetsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <NumericalFacets {...args} />
    </SearchHeadlessContext.Provider>
  );
};
