import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { executeSearch } from '../utils/search-operations';

/**
 * The CSS Class interface for SpellCheck.
 *
 * @public
 */
export interface SpellCheckCssClasses {
  container?: string,
  container___loading?: string,
  helpText?: string,
  link?: string
}

const builtInCssClasses: Readonly<SpellCheckCssClasses> = {
  container: 'text-lg pb-3',
  container___loading: 'opacity-50',
  helpText: 'text-neutral',
  link: 'text-primary font-bold hover:underline focus:underline'
};

/**
 * The props for the {@link SpellCheck} component.
 *
 * @public
 */
export interface SpellCheckProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: SpellCheckCssClasses,
  /** A function which is called when a spell check suggestion is clicked. */
  onClick?: (data: { correctedQuery: string, verticalKey: string }) => void
}

/**
 * Renders a suggested query if the Answers API provides one.
 *
 * @public
 *
 * @param props - {@link SpellCheckProps}
 * @returns A react component for spell check, or null if none exists
 */
export function SpellCheck({
  customCssClasses,
  onClick
}: SpellCheckProps): JSX.Element | null {
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) ?? '';
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const correctedQuery = useAnswersState(state => state.spellCheck.correctedQuery) ?? '';
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.container___loading ?? '']: isLoading
  });
  const answersActions = useAnswersActions();
  const handleClickSuggestion = useCallback(() => {
    answersActions.setQuery(correctedQuery);
    onClick
      ? onClick({ correctedQuery, verticalKey })
      : executeSearch(answersActions);
  }, [answersActions, correctedQuery, onClick, verticalKey]);

  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={containerClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button className={cssClasses.link} onClick={handleClickSuggestion}>{correctedQuery}</button>
    </div>
  );
}