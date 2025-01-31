import { useSynchronizedRequest } from '../../src/hooks/useSynchronizedRequest';
import { renderHook } from './getRenderHook';
import {waitFor} from '@testing-library/react';

it('returns an updated execute request function with the same reference', async () => {
  let requestFunction = async () => 0;
  const { result, rerender } = renderHook(() =>
    useSynchronizedRequest(requestFunction)
  );

  const oldReturnedRequestFunction = result.current[1];
  expect(await waitFor(() => oldReturnedRequestFunction())).toBe(0);

  requestFunction = async () => 1;
  rerender();

  const newReturnedRequestFunction = result.current[1];
  expect(await waitFor(() => newReturnedRequestFunction())).toBe(1);

  expect(oldReturnedRequestFunction).toBe(newReturnedRequestFunction);
});

it('uses a new error function while returning same execute request reference', async () => {
  const requestFunction = async () => {
    throw new Error('ERROR');
  };
  let mockedErrorFunction = jest.fn().mockReturnValue(0);
  const { result, rerender } = renderHook(() =>
    useSynchronizedRequest(requestFunction, mockedErrorFunction)
  );

  const oldReturnedRequestFunction = result.current[1];
  await oldReturnedRequestFunction();
  expect(mockedErrorFunction).toBeCalledTimes(1);

  mockedErrorFunction = jest.fn().mockReturnValue(1);
  rerender();

  const newReturnedRequestFunction = result.current[1];
  await newReturnedRequestFunction();
  expect(mockedErrorFunction).toBeCalledTimes(1);

  expect(oldReturnedRequestFunction).toBe(newReturnedRequestFunction);
});
