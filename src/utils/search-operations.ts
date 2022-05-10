import {
  AnswersActions,
  AutocompleteResponse,
  SearchIntent,
  SearchTypeEnum
} from '@yext/answers-headless-react';

/**
 * Executes a universal/vertical search.
 *
 * @public
 */
export async function executeSearch(answersActions: AnswersActions): Promise<void> {
  const isVertical = answersActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    isVertical
      ? answersActions.executeVerticalQuery()
      : answersActions.executeUniversalQuery();
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
  answersActions: AnswersActions
): Promise<AutocompleteResponse | undefined> {
  const isVertical = answersActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    return isVertical
      ? answersActions.executeVerticalAutocomplete()
      : answersActions.executeUniversalAutocomplete();
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
  answersActions: AnswersActions
): Promise<SearchIntent[] | undefined> {
  const results = await executeAutocomplete(answersActions);
  return results?.inputIntents;
}
