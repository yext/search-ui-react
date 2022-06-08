import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * A react hook which combines a component's built-in CSS classes with custom CSS classes.
 *
 * @public
 *
 * @param builtInClasses - The component's built-in css classes
 * @param customClasses - The custom classes to combine with the built-in ones
 * @returns The composed CSS classes
 */
export function useComposedCssClasses<
  ClassInterface extends Partial<Record<keyof ClassInterface & string, string>>
>(
  builtInClasses: ClassInterface,
  customClasses?: Partial<ClassInterface>
): ClassInterface {
  return useMemo(() => {
    const mergedCssClasses = { ...builtInClasses };
    if (!customClasses) {
      return mergedCssClasses;
    }
    Object.keys(customClasses).forEach(key => {
      mergedCssClasses[key] = twMerge(mergedCssClasses[key], customClasses[key]);
    });
    return mergedCssClasses;
  }, [builtInClasses, customClasses]);
}