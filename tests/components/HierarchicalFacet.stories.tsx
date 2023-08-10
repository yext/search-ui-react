import { ComponentMeta, Story } from '@storybook/react';
import { Facets, HierarchicalFacetProps, HierarchicalFacet } from '../../src';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';

const meta: ComponentMeta<typeof Facets> = {
  title: 'HierarchicalFacet',
  component: Facets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: [
      ...DisplayableFacets,
      createHierarchicalFacet([
        'food',
        'food > fruit',
        { value: 'food > fruit > banana', selected: true },
        'food > fruit > apple',
      ])
    ]
  }
};

export const Primary: Story<HierarchicalFacetProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets>
        <HierarchicalFacet {...args} />
      </Facets>
    </SearchHeadlessContext.Provider>
  );
};