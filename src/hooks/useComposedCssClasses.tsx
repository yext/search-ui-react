import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes.
 *
 * @remarks
 * Tailwind classes will be merged without conflict, with custom classes having higher priority
 * than built-in ones.
 *
 * @example
 * Suppose a component has built-in classes of `{ container: 'px-4 text-slate-700' }`.
 * Passing in custom classes of:
 * `{ container: 'text-red-200 mb-3' }`
 * results in the classes:
 * `{ container: 'px-4 text-red-200 mb-3' }`
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