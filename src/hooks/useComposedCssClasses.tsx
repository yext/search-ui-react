import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Merge a component's built-in CSS classes with custom CSS classes.
 *
 * @example
 * Suppose a component has a built-in theme of `{ icon: 'Icon', button: 'Button' }`,
 * and it is provided a custom theme of `{ icon: 'Blue' }`. The result would be:
 * `{ icon: 'Icon Blue', button: 'Button' }`
 *
 * @public
 */
export type CompositionMethod = 'merge' | 'replace' | 'assign';

interface Theme {
  [key: string]: string
}

/**
 * A react hook which combines a component's built-in CSS classes with custom CSS classes.
 *
 * @public
 *
 * @param builtInClasses - The component's built-in css classes
 * @param customClasses - The custom classes to combine with the built-in ones
 * @returns The composed CSS classes
 */
export function useComposedCssClasses<ClassInterface>(
  builtInClasses: ClassInterface,
  customClasses?: ClassInterface,
  cssCompositionMethod?: any
): ClassInterface | Theme {
  return useMemo(() => {
    if (!isThemeObject(customClasses)) {
      return builtInClasses;
    }
    if (!isThemeObject(builtInClasses)) {
      return customClasses ?? {};
    }
    const mergedCssClasses = {};
    [...Object.keys(builtInClasses), ...Object.keys(customClasses)].forEach(key => {
      mergedCssClasses[key] = twMerge(builtInClasses[key], customClasses[key]);
    });
    return mergedCssClasses;
  }, [builtInClasses, customClasses]);
}

/**
 * Returns true if the object can be used as a css-modules-theme Theme
 * @param obj - The object to test
 * @returns Whether or not the object is a Theme object
 */
function isThemeObject(obj: unknown): obj is Theme {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  return true;
}