/* eslint-disable @typescript-eslint/no-explicit-any */

import { HighlightedFields, HighlightedValue } from '@yext/answers-headless-react';
import get from 'lodash/get';
import { isHighlightedValue } from './validateData';

/**
 * Indicates a field should equal a constant value. Ignores the API response.
 *
 * @public
 */
export type FieldDataConstant = {
  /** Indicates that the field data is constant. */
  mappingType: 'CONSTANT',
  /** The constant field data value. */
  value: string
};

/**
 * Denotes the path to the field data on the Result's raw data.
 *
 * @public
 */
export type FieldDataPath = {
  /** Indicates that the field data is mapped from the Result's raw data */
  mappingType: 'FIELD',
  /** The api name which denotes the path to the field data.
   *
   * @remarks
   * The path is a string separated by periods '.'.
   * An array may also be supplied to denote fallbacks.
   *
   * @example
   * A result's rawData may contain the following object:
   * ```
   * {
   *    title: {
   *       fullName: 'Yext Answers'
   *       subtitle: 'An AI Search Platform'
   *    }
   * }
   * ```
   * To indicate the subtitle, the apiName would be 'title.subtitle'.
   * Fallbacks could be indicated with an array such as:
   * `['title.fullName', 'title.subtitle']`
   * In this example, if the title is not present, it will fallback to the subtitle.
  */
  apiName: string | string[]
};

/**
 * Denotes the path to the field data on the Result's raw data.
 *
 * @public
 */
export type HighlightedFieldDataPath = {
  /** Indicates that the field data is mapped from the Result's raw data */
  mappingType: 'HIGHLIGHTED_FIELD',
  /** {@inheritDoc FieldDataPath.apiName} */
  apiName: string | string[]
};

/**
 * Indicates either a constant field data value, or a field data mapping.
 *
 * @public
 */
export type FieldData = FieldDataConstant | FieldDataPath | HighlightedFieldDataPath;

function applyFieldDataPath(data: Record<string, unknown>, fieldMap: FieldDataPath): any {
  if (!Array.isArray(fieldMap.apiName)) {
    return get(data, fieldMap.apiName);
  }
  const apiNameWithData = fieldMap.apiName.find(apiName => get(data, apiName));
  return apiNameWithData
    ? get(data, apiNameWithData)
    : undefined;
}

function applyHighlightedFieldDataPath(
  data: Record<string, unknown>,
  highlightedFields: HighlightedFields | undefined,
  fieldMap: HighlightedFieldDataPath
): HighlightedValue | undefined {

  function getHighlightedValueWithDefaulting(apiName: string): HighlightedValue {
    const highlightedValue = get(highlightedFields, fieldMap.apiName);
    if (isHighlightedValue(highlightedValue)) {
      return highlightedValue;
    }

    return {
      value: get(data, apiName) as string ?? '',
      matchedSubstrings: []
    };
  }

  if (!Array.isArray(fieldMap.apiName)) {
    return getHighlightedValueWithDefaulting(fieldMap.apiName);
  }
  const apiNameWithData = fieldMap.apiName.find(apiName => getHighlightedValueWithDefaulting(apiName));
  return apiNameWithData
    ? getHighlightedValueWithDefaulting(apiNameWithData)
    : undefined;
}

/**
 * Collects data based on the provided fields mappings.
 *
 * @example
 * Suppose rawData is:
 * \{
 *    faq: \{
 *      question: 'Which AI search platform should we leverage?'
 *    \}
 * \}
 * And the fieldMappings is:
 * \{
 *    question: \{
 *      mappingType: 'FIELD',
 *      apiName: 'faq.question,
 *    \},
 *    answer: \{
 *      mappingType: 'CONSTANT',
 *      value: 'Yext'
 *    \}
 * \}
 * The function will return:
 * \{
 *    question: 'Which AI search platform should we leverage?',
 *    answer: 'Yext'
 *  \}
 *
 * @param rawData - The rawData from an {@link Result}
 * @param fieldMappings - Indicates where data is located within the rawData field
 * @returns An object of fields to data
 */
export function applyFieldMappings(
  rawData: Record<string, unknown>,
  highlightedFields: HighlightedFields | undefined,
  fieldMappings: Partial<Record<string, FieldData>>,
): Record<string, any> {

  if (!fieldMappings) {
    return {};
  }

  return Object.entries(fieldMappings)
    .reduce((acc: Record<string, any>, [field, mapping]) => {
      if (!mapping) {
        return acc;
      }
      switch (mapping.mappingType) {
        case 'CONSTANT':
          acc[field] = mapping.value;
          break;
        case 'HIGHLIGHTED_FIELD':
          acc[field] = applyHighlightedFieldDataPath(rawData, highlightedFields, mapping);
          break;
        default:
          acc[field] = applyFieldDataPath(rawData, mapping);
      }
      return acc;
    }, {});
}