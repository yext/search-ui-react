import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { SpellCheck } from '../../src/components/SpellCheck';

import { MockedHeadless } from '../__fixtures__/answers-headless';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'SpellCheck',
  component: SpellCheck,
} as ComponentMeta<typeof SpellCheck>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={MockedHeadless}>
      <SpellCheck />
    </AnswersHeadlessContext.Provider>
  );
};
