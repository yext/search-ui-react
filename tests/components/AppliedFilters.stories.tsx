import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, SearchTypeEnum } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { AppliedFiltersDisplay, AppliedFiltersDisplayProps } from '../../src/components/AppliedFiltersDisplay';
import { builtInCssClasses } from '../../src/components/AppliedFilters';
import { RemovableFilters } from '../__fixtures__/data/filters';
import React from 'react';

const meta: ComponentMeta<typeof AppliedFiltersDisplay> = {
  title: 'AppliedFilters',
  component: AppliedFiltersDisplay
};
export default meta;

export const Primary: Story<AppliedFiltersDisplayProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      meta: { searchType: SearchTypeEnum.Vertical }
    })}>
      <AppliedFiltersDisplay
        cssClasses={builtInCssClasses}
        nlpFilterDisplayNames={['Near Me']}
        removableFilters={RemovableFilters}
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};
