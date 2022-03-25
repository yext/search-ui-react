import { useAnswersActions } from '@yext/answers-headless-react';
import {
  DirectAnswer,
  ResultsCount,
  SearchBar,
  SpellCheck,
  UniversalResults
} from '@yext/answers-react-components';
import { useEffect } from 'react';

export default function UniversalPage(): JSX.Element {
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setUniversal();
  });

  return (
    <div>
      <SearchBar />
      <SpellCheck />
      <DirectAnswer />
      <ResultsCount />
      <UniversalResults
        verticalConfigMap={{
          people: {}
        }}
      />
    </div>
  );
}