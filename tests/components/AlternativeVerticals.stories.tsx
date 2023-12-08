import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { AlternativeVerticals, AlternativeVerticalsProps } from '../../src/components/AlternativeVerticals';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { verticalNoResults } from '../__fixtures__/data/vertical/noresults';
import React from 'react';

const meta: Meta<typeof AlternativeVerticals> = {
  title: 'AlternativeVerticals',
  component: AlternativeVerticals,
};
export default meta;

const mockedHeadlessState = {
  ...VerticalSearcherState,
  vertical: verticalNoResults
};

const verticalConfigMap = {
  faqs: { label: 'FAQs' },
  events: { label: 'Events' },
  locations: { label: 'Locations' }
};

export const Primary: StoryFn<AlternativeVerticalsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <AlternativeVerticals
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};
Primary.args = {
  currentVerticalLabel: 'Jobs',
  verticalConfigMap,
  displayAllOnNoResults: false
};

export const DisplayAllOnNoResults: StoryFn<AlternativeVerticalsProps> = Primary.bind({});
DisplayAllOnNoResults.args = {
  ...Primary.args,
  displayAllOnNoResults: true
};

export const Loading: StoryFn<AlternativeVerticalsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: {
        isLoading: true
      }
    })}>
      <AlternativeVerticals
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};
Loading.args = {
  ...DisplayAllOnNoResults.args
};
