import { Result } from '@yext/answers-headless-react';
import { isStringOrHighlightedValue, validateData } from '../components/utils/validateData';
import { isCtaData, StandardCardData } from '../models/StandardCardData';

/**
 * Transform and validate results based on the expected data type in {@link StandardCardData}.
 *
 * @public
 *
 * @param result - card result use to transform into {@link StandardCardData} structure
 */
export function useStandardCardData(result: Result): Partial<StandardCardData> {
  const data = {
    title: result.highlightedFields?.name ?? result.rawData.name,
    description: result.highlightedFields?.description ?? result.rawData.description,
    cta1: result.rawData.c_primaryCTA,
    cta2: result.rawData.c_secondaryCTA,
  };

  return validateData(data, {
    title: isStringOrHighlightedValue,
    description: isStringOrHighlightedValue,
    cta1: isCtaData,
    cta2: isCtaData
  });
}
