import { ComponentMeta } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { UniversalResults, UniversalResultsProps } from '../../src/components/UniversalResults';
import { RecursivePartial } from '../__utils__/mocks';
import { verticalResults } from '../__fixtures__/data/universalresults';
import { DefaultRawDataType } from '../../src/models/DefaultRawDataType';
import { VerticalConfigMap } from '../../src/models/verticalConfig';

const verticalConfigMap: VerticalConfigMap = {
  vertical1: {
    label: 'Vertical 1',
    viewAllButton: true
  }
};

const meta: ComponentMeta<typeof UniversalResults> = {
  title: 'UniversalResults',
  component: UniversalResults,
  args: {
    showAppliedFilters: true,
    verticalConfigMap: verticalConfigMap
  }
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  universal: {
    verticals: verticalResults
  }
};

export const Primary = (args: UniversalResultsProps<DefaultRawDataType>) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <UniversalResults {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading = (args: UniversalResultsProps<DefaultRawDataType>) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: { isLoading: true }
    })}>
      <UniversalResults {...args} />
    </SearchHeadlessContext.Provider>
  );
};
