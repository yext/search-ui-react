import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;
type DebouncedFunction<F extends Func> = (...args: Parameters<F>) => Promise<undefined | ReturnType<F>>;

export function useDebouncedFunction<F extends Func>(
  func: F | undefined,
  milliseconds: number
): DebouncedFunction<F> | undefined {
  const timeoutIdRef = useRef<number | undefined>();
  if (!func) {
    return undefined;
  }
  const debounced: DebouncedFunction<F> = (...args: Parameters<F>) => {
    return new Promise(resolve => {
      if (timeoutIdRef.current !== undefined) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = window.setTimeout(() => {
        resolve(func(...args));
        timeoutIdRef.current = undefined;
      }, milliseconds);
    });
  };
  return debounced;
}