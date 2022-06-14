import { useRef, useState, useCallback, useEffect } from 'react';
import { useComponentMountStatus } from './useComponentMountStatus';

/**
 * Handles the network request race condition by synchronizing requests with their responses. If multiple
 * requests are sent before getting a response, only the response corresponding to the latest request will
 * be returned.
 *
 * @param executeRequest - Function that executes the network request
 * @param handleRejectedPromise - Function that executes when a rejected promise is received from the request
 *
 * @returns Reponse to the latest request and a function to execute the request in a synchronized manner
 */
export function useSynchronizedRequest<RequestDataType, ResponseType>(
  executeRequest: (data?: RequestDataType) => Promise<ResponseType | undefined>,
  handleRejectedPromise?: (error: unknown) => void
): [
    ResponseType | undefined,
    (data?: RequestDataType) => Promise<ResponseType | undefined>,
    () => void
  ]
{
  const executeRequestRef = useRef(executeRequest);
  const handleRejectedPromiseRef = useRef(handleRejectedPromise);
  const isMountedRef = useComponentMountStatus();
  const networkIds = useRef({ latestRequest: 0, responseInState: 0 });
  const [synchronizedResponse, setSynchronizedResponse] = useState<ResponseType>();

  const executeSynchronizedRequest = useCallback(async (data?: RequestDataType):
  Promise<ResponseType | undefined> => {
    const requestId = ++networkIds.current.latestRequest;
    return new Promise(async (resolve) => {
      let response: ResponseType | undefined = undefined;
      try {
        response = await executeRequestRef.current(data);
      } catch (e) {
        handleRejectedPromiseRef.current ? handleRejectedPromiseRef.current(e) : console.error(e);
      }
      if (requestId >= networkIds.current.responseInState) {
        /**
         * Avoid performing a React state update on an unmounted component
         * (e.g unmounted during async await)
         */
        if (!isMountedRef.current) {
          return;
        }
        setSynchronizedResponse(response);
        networkIds.current.responseInState = requestId;
      }
      resolve(response);
    });
  }, [isMountedRef]);

  const clearResponseData = useCallback(() => {
    setSynchronizedResponse(undefined);
  }, [setSynchronizedResponse]);

  useEffect(() => {
    executeRequestRef.current = executeRequest;
    handleRejectedPromiseRef.current = handleRejectedPromise;
  });

  return [synchronizedResponse, executeSynchronizedRequest, clearResponseData];
}