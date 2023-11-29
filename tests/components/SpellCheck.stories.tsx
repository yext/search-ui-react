import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { SpellCheck, SpellCheckProps } from '../../src/components/SpellCheck';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import React from 'react';

const meta: Meta<typeof SpellCheck> = {
  title: 'SpellCheck',
  component: SpellCheck,
};
export default meta;

export const Primary: StoryFn<SpellCheckProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(VerticalSearcherState)}>
      <SpellCheck {...args} />
    </SearchHeadlessContext.Provider>
  );
};
