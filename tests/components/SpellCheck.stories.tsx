import React from 'react';

import { ComponentMeta } from '@storybook/react';

import { SpellCheck } from '../../src/components/SpellCheck';
import { MockedHeadless } from '../__fixtures__/answers-headless';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

export default {
  title: 'SpellCheck',
  component: SpellCheck,
} as ComponentMeta<typeof SpellCheck>;

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={MockedHeadless}>
      <SpellCheck />
    </AnswersHeadlessContext.Provider>
  );
};
