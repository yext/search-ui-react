/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HighlightedValue } from '@yext/answers-headless-react';

/**
 * Infers the type associated with the provided type guard.
 *
 * @public
 */
export type InferTypeGuard<TypeGuard> = TypeGuard extends (data: any) => data is infer Type ? Type : never;

/**
 * Type guard for an Object type.
 *
 * @public
 */
export type TypeGuardRecord = Record<string, (data: any) => boolean>;

/**
 * Returns a partial record where the keys are the same as the provided type guard and the
 * values are type associated with the type guard.
 *
 * @public
 */
export type ValidatedData<TypeGuards extends TypeGuardRecord> = Partial<{
  [Property in keyof TypeGuards]: InferTypeGuard<TypeGuards[Property]>
}>;

/**
 * Type guard for string.
 *
 * @public
 *
 * @param data - the data to validate
 * @returns whether the data is a string
 */
export function isString(data: any): data is string {
  return typeof data === 'string';
}

/**
 * Type guard for boolean.
 *
 * @public
 *
 * @param data - the data to validate
 * @returns whether the data is a boolean
 */
export function isBoolean(data: any): data is boolean {
  return typeof data === 'boolean';
}

/**
 * Type guard for number.
 *
 * @public
 *
 * @param data - the data to validate
 * @returns whether the data is a number
 */
export function isNumber(data: any): data is number {
  return typeof data === 'number';
}

export function isStringOrHighlightedValue(data: any): data is string | HighlightedValue {
  return isString(data) || isHighlightedValue(data);
}

/**
 * Whether or not the param is a HighlightedValue.
 *
 * Does not check that every value within matchedSubstrings is a number.
 */
function isHighlightedValue(data: any): data is HighlightedValue {
  return !!(
    data &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    typeof(data.value) === 'string' &&
    Array.isArray(data.matchedSubstrings)
  );
}

/**
 * Returns data which passes the corresponding typeGuard validation.
 *
 * @public
 *
 * @param data - the set of data to validate
 * @param typeGuards - a record of type guard functions use to verify the data properties' type
 * @returns a validated set of data
 */
export function validateData<TypeGuards extends TypeGuardRecord>(
  data: any,
  typeGuards: TypeGuards
): ValidatedData<TypeGuards> {
  const validatedData: ValidatedData<TypeGuards> = {};

  Object.entries(typeGuards).forEach(([key, typeCheck]) => {
    if (typeCheck(data[key])) {
      validatedData[key as keyof TypeGuards] = data[key];
    } else {
      console.warn(`The validation for the key: ${key} failed, so the data was omitted.`);
    }
  });

  return validatedData;
}