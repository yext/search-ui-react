/**
 * Infers the type associated with the provided type guard.
 */
type InferTypeGuard<TypeGuard> = TypeGuard extends (data: any) => data is infer Type ? Type : never;

export type TypeGuardRecord = Record<string, (data: any) => boolean>;

/**
 * Returns a partial record where the keys are the same as the provided type guard and the
 * values are type associated with the type guard.
 */
export type ValidatedData<TypeGuards extends TypeGuardRecord> = Partial<{
  [Property in keyof TypeGuards]: InferTypeGuard<TypeGuards[Property]>
}>;

export function isString(data: any): data is string {
  return typeof data === 'string';
}

export function isBoolean(data: any): data is boolean {
  return typeof data === 'boolean';
}

export function isNumber(data: any): data is number {
  return typeof data === 'number';
}

/**
 * Returns data which passes the corresponding typeGuard validation.
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