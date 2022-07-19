import { useRecentSearches } from '../../src/hooks/useRecentSearches';
import { renderHook } from '@testing-library/react-hooks';

it('returns recent searches', () => {
  const verticalKey = 'people';
  const { result, rerender } = renderHook(() =>
    useRecentSearches(10, verticalKey)
  );
  const [, setRecentSearch, clearRecentSearches] = result.current;
  setRecentSearch('bob');
  setRecentSearch('carrie');
  setRecentSearch('williard');

  rerender();
  const [recentSearches] = result.current;
  expect(recentSearches?.length).toBe(3);
  clearRecentSearches();
});

it('does not carry over old recent searches to a new vertical', () => {
  let verticalKey = 'people';
  const { result, rerender } = renderHook(() =>
    useRecentSearches(10, verticalKey)
  );
  const [, setRecentPeopleSearch, clearPeopleSearches] = result.current;
  setRecentPeopleSearch('bob');
  setRecentPeopleSearch('carrie');
  rerender();
  let recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(2);

  verticalKey = 'places';
  rerender();
  recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(0);

  clearPeopleSearches();
});

it('preserves recent searches when returning to a vertical', () => {
  let verticalKey = 'people';
  const { result, rerender } = renderHook(() =>
    useRecentSearches(10, verticalKey)
  );
  const [, setRecentPeopleSearch, clearPeopleSearches] = result.current;
  setRecentPeopleSearch('bob');
  setRecentPeopleSearch('carrie');
  rerender();
  let recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(2);

  verticalKey = 'places';
  rerender();
  recentSearches = result.current[0];
  const [, setRecentPlacesSearch, clearPlacesSearches] = result.current;
  expect(recentSearches?.length).toBe(0);

  setRecentPlacesSearch('yext');
  rerender();
  recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(1);

  verticalKey = 'people';
  rerender();
  recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(2);

  clearPeopleSearches();
  clearPlacesSearches();
});

it('clears searches properly', () => {
  let verticalKey = 'people';
  const { result, rerender } = renderHook(() =>
    useRecentSearches(10, verticalKey)
  );
  const [, setRecentPeopleSearch, clearPeopleSearches] = result.current;
  setRecentPeopleSearch('bob');
  setRecentPeopleSearch('carrie');

  clearPeopleSearches();
  verticalKey = 'people';
  rerender();
  const recentSearches = result.current[0];
  expect(recentSearches?.length).toBe(0);
});