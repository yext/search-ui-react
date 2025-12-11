import { Meta, StoryFn } from '@storybook/react';
import { Facets, NumericalFacetProps, NumericalFacet } from '../../src';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import React from 'react';

const meta: Meta<typeof Facets> = {
  title: 'Filters/Facets/Standard',
  component: Facets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary: StoryFn<NumericalFacetProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets>
        <NumericalFacet {...args} />
      </Facets>
    </SearchHeadlessContext.Provider>
  );
};
