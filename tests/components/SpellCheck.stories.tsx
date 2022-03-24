import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { SpellCheck } from '../../src/components/SpellCheck';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'SpellCheck',
  component: SpellCheck,
} as ComponentMeta<typeof SpellCheck>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(VerticalSearcherState)}>
      <SpellCheck />
    </AnswersHeadlessContext.Provider>
  );
};
