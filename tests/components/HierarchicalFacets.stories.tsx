import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';
import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';
import { RecursivePartial } from '../__utils__/mocks';
import { HierarchicalFacets, HierarchicalFacetsProps } from '../../src';

const meta: ComponentMeta<typeof HierarchicalFacets> = {
  title: 'HierarchicalFacets',
  component: HierarchicalFacets
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

export function Primary(args: HierarchicalFacetsProps): JSX.Element {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <HierarchicalFacets fieldIds={['hier']} {...args} />
    </AnswersHeadlessContext.Provider>
  );
}
