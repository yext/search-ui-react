import {
  SearchActions,
  AutocompleteResponse,
  SearchIntent,
  SearchTypeEnum
} from '@yext/search-headless-react';

/**
 * Executes a universal/vertical search.
 *
 * @public
 */
export async function executeSearch(SearchActions: SearchActions): Promise<void> {
  const isVertical = SearchActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    isVertical
      ? SearchActions.executeVerticalQuery()
      : SearchActions.executeUniversalQuery();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? 'vertical': 'universal'} search.\n`, e);
  }
}

/**
 * Executes a universal/vertical autocomplete search and return the corresponding response.
 *
 * @public
 */
export async function executeAutocomplete(
  SearchActions: SearchActions
): Promise<AutocompleteResponse | undefined> {
  const isVertical = SearchActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    return isVertical
      ? SearchActions.executeVerticalAutocomplete()
      : SearchActions.executeUniversalAutocomplete();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? 'vertical': 'universal'} autocomplete search.\n`, e);
  }
}

/**
 * Get search intents of the current query stored in headless using autocomplete request.
 *
 * @public
 */
export async function getSearchIntents(
  SearchActions: SearchActions
): Promise<SearchIntent[] | undefined> {
  const results = await executeAutocomplete(SearchActions);
  return results?.inputIntents;
}
