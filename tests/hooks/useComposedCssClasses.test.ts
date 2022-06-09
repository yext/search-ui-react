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
  const builtInCssClasses = { container: 'block p-1' };
  const customClasses = { container: 'p-2' };
  const { result } = renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
  expect(result.current).toEqual({
    container: 'block p-2'
  });
});

it('does not call twMerge when builtInClass is a blank string', () => {
  const spy = jest.spyOn(require('tailwind-merge'), 'twMerge');
  const builtInCssClasses = { container: '' };
  const customClasses = { container: 'p-2' };
  renderHook(() => useComposedCssClasses(builtInCssClasses, customClasses));
  expect(spy).toHaveBeenCalledTimes(0);
});