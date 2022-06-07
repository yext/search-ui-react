import { useAnswersActions } from '@yext/answers-headless-react';
import {
  DirectAnswer,
  ResultsCount,
  SearchBar,
  SpellCheck,
  UniversalResults
} from '@yext/answers-react-components';
import { TestSyncExternalStore } from '../components/TestSyncExternalStore';
import { TestSyncExternalStore2  } from '../components/TestSyncExternalStore2';
import { TestSyncExternalStore3  } from '../components/TestSyncExternalStore3';
import { TestSyncExternalStore4  } from '../components/TestSyncExternalStore4';

import { useEffect } from 'react';

export default function TestPage(): JSX.Element {
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setUniversal();
  });

  return (
    <div>
      <SearchBar />
      {/* example of tearing */}
      {/* <TestSyncExternalStore /> */}
      {/* try with headless */}
      {/* <TestSyncExternalStore2 /> */}
      {/* example 2 of tearing */}
      {/* <TestSyncExternalStore3 /> */}
      {/* try with headless */}
      <TestSyncExternalStore4 />
      {/* <SpellCheck />
      <DirectAnswer />
      <ResultsCount />
      <UniversalResults
        verticalConfigMap={{
          people: {}
        }}
      /> */}
    </div>
  );
}