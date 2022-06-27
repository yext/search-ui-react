import { useMemo } from 'react';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * We extend the base tailwind-merge so that conflicts between custom classes can be
 * handled correctly.
 *
 * When new tailwind classes are introduced they should be added to the `classGroups` object below.
 *
 * @example
 * tailwindcss/forms adds the form-input, form-checkbox, etc. classes,
 * so we need to add the 'form' class group here for twMerge to recognize form-input
 * and form-checkbox as conflicting classes.
 */
export const twMerge = extendTailwindMerge({
  classGroups: {
    form: ['input', 'checkbox', 'textarea', 'select', 'multiselect', 'radio'].map(v => 'form-' + v)
  }
});

/**
 * useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes.
 *
 * @remarks
 * Tailwind classes will be merged without conflict, with custom classes having higher priority
 * than built-in ones.
 *
 * @example
 * Suppose a component has built-in classes of `{ container: 'px-4 text-slate-700' }`.
 *
 * Passing in the custom classes:
 *
 * ```ts
 * { container: 'text-red-200 mb-3' }
 * ```
 *
 * results in the merged classes of:
 *
 * ```ts
 * { container: 'px-4 text-red-200 mb-3' }
 * ```
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
  builtInClasses: Readonly<ClassInterface>,
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
        mergedCssClasses[key] = custom || builtIn;
      } else {
        mergedCssClasses[key] = twMerge(builtIn, custom);
      }
    });
    return mergedCssClasses;
  }, [builtInClasses, customClasses]);
}