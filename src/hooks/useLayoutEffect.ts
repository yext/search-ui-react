import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

export const useLayoutEffect = typeof useIsomorphicLayoutEffect === 'function'
	? useIsomorphicLayoutEffect
	: useIsomorphicLayoutEffect['default'];
