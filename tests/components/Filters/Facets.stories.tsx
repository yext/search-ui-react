import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../../__fixtures__/answers-headless';
import { RecursivePartial } from '../../__utils__/mocks';
import { DisplayableFacets } from '../../__fixtures__/data/filters';
import { Filters } from '../../../src/components';
import { Facets } from '../../__compound-components__/Filters/Facets';


const meta: ComponentMeta<typeof Filters.Facets> = {
  title: 'Facets',
  component: Filters.Facets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets />
    </AnswersHeadlessContext.Provider>
  );
};
