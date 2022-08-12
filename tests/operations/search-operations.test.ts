import { SearchHeadless } from '@yext/search-headless-react';
import { executeAutocomplete, executeSearch } from '../../src/utils/search-operations';
import { generateMockedHeadless } from '../__fixtures__/search-headless';

describe('Search Operations with Vertical Searcher', () => {
  let verticalSearcher: SearchHeadless;
  beforeEach(() => {
    verticalSearcher = generateMockedHeadless({ meta: { searchType: 'vertical' } });
  });

  it('fires vertical search when executeSearch is invoked', async () => {
    verticalSearcher.executeVerticalQuery = jest.fn();
    await executeSearch(verticalSearcher);
    expect(verticalSearcher.executeVerticalQuery).toHaveBeenCalled();
  });

  it('fires vertical Autocomplete when executeAutocomplete is invoked', async () => {
    verticalSearcher.executeVerticalAutocomplete = jest.fn();
    await executeAutocomplete(verticalSearcher);
    expect(verticalSearcher.executeVerticalAutocomplete).toHaveBeenCalled();
  });
});

describe('Search Operations with Universal Searcher', () => {
  let universalSearcher: SearchHeadless;
  beforeEach(() => {
    universalSearcher = generateMockedHeadless();
  });

  it('fires universal search when executeSearch is invoked', async () => {
    universalSearcher.executeUniversalQuery = jest.fn();
    await executeSearch(universalSearcher);
    expect(universalSearcher.executeUniversalQuery).toHaveBeenCalled();
  });

  it('fires universal Autocomplete when executeAutocomplete is invoked', async () => {
    universalSearcher.executeUniversalAutocomplete = jest.fn();
    await executeAutocomplete(universalSearcher);
    expect(universalSearcher.executeUniversalAutocomplete).toHaveBeenCalled();
  });
});
