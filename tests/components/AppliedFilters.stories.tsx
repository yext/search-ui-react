import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, SearchTypeEnum } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { AppliedFiltersDisplay } from '../../src/components/AppliedFiltersDisplay';
import { DisplayableFilters, DisplayableHierarchicalFacets } from '../__fixtures__/data/filters';
import { AppliedFiltersProps, builtInCssClasses } from '../../src/components/AppliedFilters';

const meta: ComponentMeta<typeof AppliedFiltersDisplay> = {
  title: 'AppliedFilters',
  component: AppliedFiltersDisplay,
};
export default meta;

export const Primary = (args: AppliedFiltersProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      meta: { searchType: SearchTypeEnum.Vertical }
    })}>
      <AppliedFiltersDisplay
        cssClasses={builtInCssClasses}
        staticFilters={DisplayableFilters.slice(0,2)}
        nlpFilters={[DisplayableFilters[2]]}
        facets={[DisplayableFilters[3]]}
        hierarchicalFacets={DisplayableHierarchicalFacets}
        hierarchicalFacetsDelimiter='>'
        {...args}
      />
    </AnswersHeadlessContext.Provider>
  );
};

