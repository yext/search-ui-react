import { Meta, StoryFn } from '@storybook/react';
import {
  BuiltInFieldType,
  SearchHeadlessContext,
  FieldValueDirectAnswer as FieldValueDirectAnswerType,
  ComplexURL,
  Address
} from '@yext/search-headless-react';

import { DirectAnswer, DirectAnswerProps } from '../../src/components/DirectAnswer';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { featuredSnippetDAState, fieldValueDAState } from '../__fixtures__/data/directanswers';
import React from 'react';

const meta: Meta<typeof DirectAnswer> = {
  title: 'DirectAnswer',
  component: DirectAnswer,
  argTypes: {
    UnknownFieldTypeDisplay: {
      control: false
    }
  }
};
export default meta;

const baseDirectAnswerResult = fieldValueDAState.result;

function generateFieldValueDirectAnswer(
  args: DirectAnswerProps,
  fieldType?: FieldValueDirectAnswerType['fieldType'],
  value?: unknown,
): React.JSX.Element {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: {
        result: {
          ...baseDirectAnswerResult,
          ...(fieldType !== undefined && { fieldType }),
          ...(value !== undefined && { value }),
        } as FieldValueDirectAnswerType
      }
    })}>
      <DirectAnswer {...args} />
    </SearchHeadlessContext.Provider>
  );
}

export const URLFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.URL, '[url]');
};

export const ComplexURLFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  const complexUrl: ComplexURL = {
    url: '[url]',
    displayUrl: '[displayUrl]',
    preferDisplayUrl: true
  };
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.ComplexURL, complexUrl);
};

export const ListFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  const emails = [
    'email1@yext.com',
    'email2@yext.com',
    'email3@yext.com'
  ];
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.Email, emails);
};

export const AddressFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  const address: Address = {
    line1: '[line1]',
    line2: '[line2]',
    line3: '[line3]',
    city: '[city]',
    region: '[region]',
    postalCode: '[postalCode]',
    countryCode: '[countryCode]'
  };
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.Address, address);
};

export const StringFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.MultiLineText, 'multi\nline\ntext');
};

export const NumberFieldValue: StoryFn<DirectAnswerProps> = (args) => {
  return generateFieldValueDirectAnswer(args, BuiltInFieldType.Integer, 123456789);
};

export const PlainTextFeaturedSnippet: StoryFn<DirectAnswerProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: featuredSnippetDAState
    })}>
      <DirectAnswer {...args} />
    </SearchHeadlessContext.Provider>
  );
};

// TODO: SLAP-2340, add story for RichTextFeaturedSnippet

export const Loading: StoryFn<DirectAnswerProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: featuredSnippetDAState,
      searchStatus: { isLoading: true }
    })}>
      <DirectAnswer {...args} />
    </SearchHeadlessContext.Provider>
  );
};
