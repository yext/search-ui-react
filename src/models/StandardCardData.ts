import { HighlightedValue } from '@yext/answers-headless-react';

/**
 * The data used by the {@link StandardCard} and taken from the original Result.
 */
export interface StandardCardData {
  title: HighlightedValue | string,
  description: HighlightedValue | string,
  cta1: CtaData,
  cta2: CtaData
}

/**
 * The shape of a StandardCard CTA field's data.
 */
export interface CtaData {
  label: string,
  link: string,
  linkType: string
}

export function isCtaData(data: unknown): data is CtaData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const expectedKeys = ['label', 'link', 'linkType'];
  return expectedKeys.every(key => {
    return key in data;
  });
}