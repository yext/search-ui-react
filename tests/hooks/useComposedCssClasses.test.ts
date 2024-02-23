import { useComposedCssClasses } from '../../src/hooks/useComposedCssClasses';
import { renderHook } from './getRenderHook';
import * as tailwindMerge from 'tailwind-merge';

describe('when there are no custom classes', () => {
  const builtInCssClasses = { container: 'block p-1' };

  it('is a pass through', () => {
    const spy = jest.spyOn(tailwindMerge, 'twMerge');
    const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses));
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.current).toEqual(builtInCssClasses);
  });

  it('is a pass through when custom classes is a blank object', () => {
    const spy = jest.spyOn(tailwindMerge, 'twMerge');
    const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, {}));
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.current).toEqual(builtInCssClasses);
  });
});

it('merges classes without conflicts', () => {
  const builtInCssClasses = { container: 'px-4 text-slate-700' };
  const customClasses = { container: 'text-red-200 mb-3' };
  const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
  expect(result.current).toEqual({
    container: 'px-4 text-red-200 mb-3'
  });
});

it('does not call twMerge when builtInClass is a blank string', () => {
  const spy = jest.spyOn(tailwindMerge, 'twMerge');
  const builtInCssClasses = { container: '' };
  const customClasses = { container: 'p-2' };
  const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
  expect(spy).toHaveBeenCalledTimes(0);
  expect(result.current).toEqual({
    container: 'p-2'
  });
});

describe('works with a custom tailwind config', () => {
  it('merges text using custom colors without conflicts', () => {
    const builtInCssClasses = { text: 'text-primary-light' };
    const customClasses = { text: 'text-primary-dark' };
    const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
    expect(result.current).toEqual({
      text: 'text-primary-dark'
    });
  });

  it('merges tailwindcss-forms without conflict', () => {
    const builtInCssClasses = { form: 'form-checkbox' };
    const customClasses = { form: 'form-input form-textarea form-select form-multiselect form-radio' };
    const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
    expect(result.current).toEqual({
      form: 'form-radio'
    });
  });
});
