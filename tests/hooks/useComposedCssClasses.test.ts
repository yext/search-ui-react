import { useComposedCssClasses } from '../../src/hooks/useComposedCssClasses';
import { renderHook } from '@testing-library/react-hooks';

describe('when there are no custom classes', () => {
  const builtInCssClasses = { container: 'block p-1' };

  it('is a pass through', () => {
    const spy = jest.spyOn(require('tailwind-merge'), 'twMerge');
    const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses));
    expect(spy).toHaveBeenCalledTimes(0);
    expect(result.current).toEqual(builtInCssClasses);
  });

  it('is a pass through when custom classes is a blank object', () => {
    const spy = jest.spyOn(require('tailwind-merge'), 'twMerge');
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
  const spy = jest.spyOn(require('tailwind-merge'), 'twMerge');
  const builtInCssClasses = { container: '' };
  const customClasses = { container: 'p-2' };
  renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
  expect(spy).toHaveBeenCalledTimes(0);
});