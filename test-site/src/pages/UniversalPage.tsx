import { provideAnswersHeadless, useAnswersActions } from '@yext/answers-headless-react';
import {
  DirectAnswer,
  ResultsCount,
  SearchBar,
  SpellCheck,
  UniversalResults,
  EntityPreviews,
  VisualAutocompleteConfig
} from '@yext/answers-react-components';
import { useLayoutEffect } from 'react';
import { config } from '../config';


const visualAutocompleteConfig: VisualAutocompleteConfig = {
  entityPreviewSearcher: provideAnswersHeadless({
    ...config,
    headlessId: 'visual-autocomplete'
  }),
  restrictVerticals: ['people'],
  renderEntityPreviews: isLoading => (
    <div className={isLoading ? 'opacity-50' : ''}>
      <EntityPreviews verticalKey='people'>
        {results => (
          <div className='flex ml-4 mt-1'>
            {results.map((r, index) =>
              <div
                key={index + '-' + r.name}
                tabIndex={0}
                className='flex flex-col mb-3 mr-4 border rounded-md p-3 text-lg'
              >
                {r.name}
              </div>
            )}
          </div>
        )}
      </EntityPreviews>
    </div>
  )
}


export default function UniversalPage(): JSX.Element {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setUniversal();
  });

  return (
    <div>
      <SearchBar visualAutocompleteConfig={visualAutocompleteConfig}/>
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