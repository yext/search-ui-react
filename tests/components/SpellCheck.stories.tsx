import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { SpellCheck } from '../../src/components/SpellCheck';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof SpellCheck> = {
  title: 'SpellCheck',
  component: SpellCheck,
};
export default meta;

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(VerticalSearcherState)}>
      <SpellCheck />
    </AnswersHeadlessContext.Provider>
  );
};
