import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { executeSearch } from '../utils/search-operations';

/**
 * The CSS Class interface for SpellCheck.
 *
 * @public
 */
export interface SpellCheckCssClasses {
  container?: string,
  helpText?: string,
  spellCheck___loading?: string,
  link?: string
}

const builtInCssClasses: SpellCheckCssClasses = {
  container: 'text-lg pb-3',
  helpText: 'text-gray-600',
  spellCheck___loading: 'opacity-50',
  link: 'text-primary-600 font-bold cursor-pointer hover:underline focus:underline'
};

/**
 * The props for the {@link SpellCheck} component.
 *
 * @public
 */
export interface SpellCheckProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: SpellCheckCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod,
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
  cssCompositionMethod,
  onClick
}: SpellCheckProps): JSX.Element | null {
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) ?? '';
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const correctedQuery = useAnswersState(state => state.spellCheck.correctedQuery);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.spellCheck___loading ?? '']: isLoading
  });
  const answersActions = useAnswersActions();
  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={containerClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button className={cssClasses.link} onClick={() => {
        answersActions.setQuery(correctedQuery);
        onClick
          ? onClick({ correctedQuery, verticalKey })
          : executeSearch(answersActions, !!verticalKey);
      }}>{correctedQuery}</button>
    </div>
  );
}