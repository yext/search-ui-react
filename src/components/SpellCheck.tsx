import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

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
  link: 'text-blue-600 font-bold cursor-pointer hover:underline focus:underline'
};

export interface SpellCheckProps {
  customCssClasses?: SpellCheckCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function SpellCheck({
  customCssClasses,
  cssCompositionMethod
}: SpellCheckProps): JSX.Element | null {
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) ?? '';
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const correctedQuery = useAnswersState(state => state.spellCheck.correctedQuery);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.spellCheck___loading ?? '']: isLoading
  });
  const answersActions = useAnswersActions();
  const browserHistory = useHistory();
  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={containerClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button className={cssClasses.link} onClick={() => {
        answersActions.setQuery(correctedQuery);
        browserHistory.push(`/${verticalKey}?query=${correctedQuery}`);
      }}>{correctedQuery}</button>
    </div>
  );
}