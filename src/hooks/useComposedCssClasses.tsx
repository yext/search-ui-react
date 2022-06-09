import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes.
 *
 * @remarks
 * Tailwind classes will be merged without conflict, with custom classes having higher priority
 * than built in ones.
 *
 * @public
 *
 * @param builtInClasses - The component's built-in tailwind classes
 * @param customClasses - The custom tailwind classes to merge with the built-in ones
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
      const builtIn = builtInClasses[key];
      const custom = customClasses[key];
      if (!builtIn || !custom) {
        mergedCssClasses[key] = builtIn ?? custom;
      } else {
        mergedCssClasses[key] = twMerge(builtIn, custom);
      }
    });
    return mergedCssClasses;
  }, [builtInClasses, customClasses]);
}