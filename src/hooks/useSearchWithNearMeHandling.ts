import { AnswersHeadless, SearchTypeEnum } from '@yext/answers-headless-react';
import { executeSearch, updateLocationIfNeeded } from '../utils/search-operations';
import { MutableRefObject, useRef } from 'react';
import { AutocompleteResponse, SearchIntent } from '@yext/answers-headless-react';

type QueryFunc = () => Promise<void>;
export type AutocompleteRef = MutableRefObject<Promise<AutocompleteResponse | undefined> | undefined>;
export type onSearchFunc = (searchEventData: { verticalKey?: string, query?: string }) => void;

/**
 * Returns a search action that will handle near me searches, by first checking
 * for near me intents using an autocomplete request.
 * You can optionally use the provided ref to store autocomplete responses, to avoid
 * making unnecessary autocomplete requests.
 */
export default function useSearchWithNearMeHandling(
  answersActions: AnswersHeadless,
  geolocationOptions?: PositionOptions,
  onSearch?: onSearchFunc
): [QueryFunc, AutocompleteRef] {
  /**
   * Allow a query search to wait on the response to the autocomplete request right
   * before the search execution in order to retrieve the search intents
   */
  const autocompletePromiseRef = useRef<Promise<AutocompleteResponse | undefined>>();
  const isVertical = answersActions.state.meta.searchType === SearchTypeEnum.Vertical;
  const verticalKey = answersActions.state.vertical.verticalKey ?? '';
  const query = answersActions.state.query.input ?? '';

  async function executeQuery() {
    let intents: SearchIntent[] = [];
    if (!answersActions.state.location.userLocation) {
      if (!autocompletePromiseRef.current) {
        autocompletePromiseRef.current = isVertical
          ? answersActions.executeVerticalAutocomplete()
          : answersActions.executeUniversalAutocomplete();
      }
      const autocompleteResponseBeforeSearch = await autocompletePromiseRef.current;
      intents = autocompleteResponseBeforeSearch?.inputIntents || [];
      await updateLocationIfNeeded(answersActions, intents, geolocationOptions);
    }
    executeSearch(answersActions, isVertical);
    onSearch?.({ verticalKey, query });
  }
  return [executeQuery, autocompletePromiseRef];
}