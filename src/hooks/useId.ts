// Copied with minor modifications from
// https://github.com/reach/reach-ui/blob/dev/packages/auto-id/src/reach-auto-id.ts

import React, { useEffect, useState } from 'react';
import { useLayoutEffect } from './useLayoutEffect';

let serverHandoffComplete = false;
let id = 0;
function genId(baseName: string): string {
  ++id;
  return baseName + '-' + id.toString();
}

// Workaround for https://github.com/webpack/webpack/issues/14814
// https://github.com/eps1lon/material-ui/blob/8d5f135b4d7a58253a99ab56dce4ac8de61f5dc1/packages/mui-utils/src/useId.ts#L21
const maybeReactUseId: undefined | (() => string) = (React as any)[
  'useId'.toString()
];

/**
 * useId
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be empty string and will update after a
 * component mounts.
 *
 * @see Docs https://reach.tech/auto-id
 */

export function useId(baseName: string): string {
  const reactId = maybeReactUseId?.();

  // If this instance isn't part of the initial render, we don't have to do the
  // double render/patch-up dance. We can just generate the ID and return it.
  const initialId = (serverHandoffComplete ? genId(baseName) : '');
  const [id, setId] = useState(initialId);

  useLayoutEffect(() => {
    if (id === '') {
      // Patch the ID after render. We do this in `useLayoutEffect` to avoid any
      // rendering flicker, though it'll make the first render slower (unlikely
      // to matter, but you're welcome to measure your app and let us know if
      // it's a problem).
      setId(genId(baseName));
    }
  }, [baseName, id]);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      // Flag all future uses of `useId` to skip the update dance. This is in
      // `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
      // accidentally bail out of the patch-up dance prematurely.
      serverHandoffComplete = true;
    }
  }, []);

  return reactId ?? id;
}
