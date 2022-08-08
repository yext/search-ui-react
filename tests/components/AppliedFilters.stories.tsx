import { ComponentMeta } from '@storybook/react';
import { SearchHeadlessContext, SearchTypeEnum } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { AppliedFiltersDisplay } from '../../src/components/AppliedFiltersDisplay';
import { AppliedFiltersProps, builtInCssClasses } from '../../src/components/AppliedFilters';
import { RemovableFilters } from '../__fixtures__/data/filters';
import { ApplyFiltersButton } from '../../src/components/ApplyFiltersButton';

const meta: ComponentMeta<typeof AppliedFiltersDisplay> = {
  title: 'AppliedFilters',
  component: AppliedFiltersDisplay
};
export default meta;

export const Primary = (args: AppliedFiltersProps) => {
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
      <ApplyFiltersButton />
    </SearchHeadlessContext.Provider>
  );
};

