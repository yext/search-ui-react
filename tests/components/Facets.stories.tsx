import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { Facets, FacetsProps } from '../../src';

const meta: ComponentMeta<typeof Facets> = {
  title: 'Facets',
  component: Facets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary: Story<FacetsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets {...args} />
    </SearchHeadlessContext.Provider>
  );
};