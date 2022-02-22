import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export enum PageSize {
  Desktop,
  Mobile
}

/**
 * Provides stateful access the page size.
 *
 * @param mobileWidth The width in pixels to switch from desktop to mobile
 */
export function usePageSize(mobileWidth = 768): [PageSize, Dispatch<SetStateAction<PageSize>>] {
  const isMobile = useCallback(() => {
    return window.innerWidth <= mobileWidth;
  }, [mobileWidth]);

  const [pageSize, setPageSize] = useState<PageSize>(isMobile() ? PageSize.Mobile : PageSize.Desktop);

  useEffect(() => {
    function resizeListener() {
      if (isMobile()) {
        setPageSize(PageSize.Mobile);
      } else {
        setPageSize(PageSize.Desktop);
      }
    }

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [isMobile]);

  return [pageSize, setPageSize];
}