import { composeTheme } from '@css-modules-theme/core';
import { Compose, Theme } from '@css-modules-theme/core';
import { useMemo } from 'react';

/**
 * The method of combining a component's built-in CSS classes with custom CSS classes.
 *
 * @remarks
 * Merge keeps the component's built-in classes and adds the custom classes to them (default).
 * Replace ignore all of the component’s built-in classes and only uses the custom classes.
 * Assign keeps the component's built-in classes, however custom classes will completely override their
 * associated built-in classes.
 *
 * @example
 * Suppose a component has a built-in theme of `{ icon: 'Icon', button: 'Button' }`,
 * and it is provided a custom theme of `{ icon: 'Blue' }`.
 * The various composition methods would result in the following composed themes:
 * Merge: `{ icon: 'Icon Blue', button: 'Button' }`
 * Replace: `{ icon: 'Blue' }`
 * Assign: `{ icon: 'Blue', button: 'Button' }`
 *
 * @public
 */
export type CompositionMethod = 'merge' | 'replace' | 'assign';

/**
 * A react hook which combines a component's built-in CSS classes with custom CSS classes.
 *
 * @public
 *
 * @param builtInClasses - The component's built-in css classes
 * @param customClasses - The custom classes to combine with the built-in ones
 * @param cssCompositionMethod - The method of combining the built-in classes with the custom classes
 * @returns The composed CSS classes
 */
export function useComposedCssClasses<ClassInterface>(
  builtInClasses: ClassInterface,
  customClasses?: ClassInterface,
  cssCompositionMethod?: CompositionMethod
): ClassInterface | Theme {
  return useMemo(() => {
    if (!isThemeObject(customClasses)) {
      return builtInClasses;
    }
    if (!isThemeObject(builtInClasses)) {
      return customClasses ?? {};
    }
    const compose = getCssModulesCompose(cssCompositionMethod);
    return composeTheme([{ theme: builtInClasses }, { theme: customClasses, compose }]);
  }, [builtInClasses, customClasses, cssCompositionMethod]);
}

/**
 * Transforms the CompositionMethod types to the Compose types of the css-modules-theme library
 * @param cssCompositionMethod - The cssCompositionMethod method
 * @returns The css-modules-theme Compose type
 */
function getCssModulesCompose(cssCompositionMethod: CompositionMethod = 'merge'): Compose {
  return {
    replace: Compose.Replace,
    assign: Compose.Assign,
    merge: Compose.Merge
  }[cssCompositionMethod];
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