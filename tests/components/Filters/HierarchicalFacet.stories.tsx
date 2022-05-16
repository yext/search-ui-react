import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';
import { Filters } from '../../../src/components';
import { generateMockedHeadless } from '../../__fixtures__/answers-headless';
import { HierarchicalFacets } from '../../__compound-components__/Filters/HierarchicalFacet';
import { createHierarchicalFacet } from '../../__utils__/hierarchicalfacets';
import { RecursivePartial } from '../../__utils__/mocks';

const meta: ComponentMeta<typeof Filters.HierarchicalFacet> = {
  title: 'Hierarchical Facets',
  component: Filters.HierarchicalFacet
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: [
      createHierarchicalFacet([
        'food',
        'food > fruit',
        { value: 'food > fruit > banana', selected: true },
        'food > fruit > apple',
      ])
    ]
  }
};

export function Primary(args: Filters.HierarchicalFacetProps): JSX.Element {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <HierarchicalFacets {...args} />
    </AnswersHeadlessContext.Provider>
  );
}
