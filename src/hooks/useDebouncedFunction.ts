import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;
type DebouncedFunction<F extends Func> = (...args: Parameters<F>) => Promise<undefined | ReturnType<F>>;

/**
 * Returns a debounced version of the provided function.
 *
 * @remarks
 * The returned function delays invoking {@link func} until `milliseconds` have elapsed since the
 * most recent call. Repeated calls within the debounce window cancel the previous timeout and only
 * the latest call is eventually executed.
 *
 * @param func - The callback to debounce.
 * @param milliseconds - The debounce delay in milliseconds.
 * @returns A debounced callback, or `undefined` when no callback was provided.
 */
export function useDebouncedFunction<F extends Func>(
  func: F | undefined,
  milliseconds: number
): DebouncedFunction<F> | undefined {
  const timeoutIdRef = useRef<number | undefined>(undefined);
  // Keep the latest callback available to the timeout without recreating the debounced wrapper.
  const funcRef = useRef<F | undefined>(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // The debounced wrapper is memoized so its identity stays stable across renders unless the debounce
  // duration changes. This makes it safe to use in effect dependency arrays or event subscription
  // setup without unintentionally tearing down and recreating listeners on every render.
  const debounced: DebouncedFunction<F> = useCallback((...args: Parameters<F>) => {
    return new Promise(resolve => {
      if (timeoutIdRef.current !== undefined) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = window.setTimeout(() => {
        resolve(funcRef.current?.(...args) as ReturnType<F> | undefined);
        timeoutIdRef.current = undefined;
      }, milliseconds);
    });
  }, [milliseconds]);

  return func ? debounced : undefined;
}
