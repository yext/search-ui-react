export * from './components';
export * from './hooks';
export * from './models';
export * from './utils';

/**
 * Content path to the source files in component library that utilizes Tailwind class names.
 * This is intended to be used in user's custom tailwind config.
 *
 * @public
 *
 * @remarks
 * This assumes that the node_modules folder containing the component library
 * is in adjacent level with the user's tailwind.config.js file.
 *
 * @example
 * In user's tailwind.config.js file:
 *
 * ```
 * const { ComponentsContentPath } = require('@yext/answers-react-components')
 * module.exports = {
 *  content: [ ComponentsContentPath ],
 *  ...
 * };
 * ```
 */
export const ComponentsContentPath = 'node_modules/@yext/answers-react-components/lib/**/*.{js,jsx}';
