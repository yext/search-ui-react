import { useSynchronizedRequest } from '../../src/hooks/useSynchronizedRequest';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';


let requestFunction = async () => 0;
const errorFunction = () => 'error';

it('returns an updated function with the same reference', async () => {
  const { result, rerender } = renderHook(() => useSynchronizedRequest(requestFunction, errorFunction));

  const oldRequestFunction = result.current[1];
  await waitFor(async () => {
    expect(await oldRequestFunction()).toBe(0);
  });

  requestFunction = async () => 1;
  rerender();

  const updatedRequestFunction = result.current[1];
  await waitFor(async () => {
    expect(await updatedRequestFunction()).toBe(1);
  });

  expect(oldRequestFunction).toBe(updatedRequestFunction);
});