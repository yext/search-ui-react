import { provideAnswersHeadless, useAnswersActions } from '@yext/answers-headless-react';
import {
  DirectAnswer,
  DropdownItem,
  ResultsCount,
  SearchBar,
  SpellCheck,
  UniversalResults,
  VisualAutocompleteConfig
} from '@yext/answers-react-components';
import classNames from 'classnames';
import { useLayoutEffect } from 'react';
import { config } from '../config';


const visualAutocompleteConfig: VisualAutocompleteConfig = {
  entityPreviewSearcher: provideAnswersHeadless({
    ...config,
    headlessId: 'visual-autocomplete'
  }),
  restrictVerticals: ['people'],
  renderEntityPreviews: (isLoading, verticalKeyToResults) => {
    if (!verticalKeyToResults.people) {
      return null;
    }

    const { results } = verticalKeyToResults.people;
    const containerClassName = classNames({
      'opacity-50': isLoading,
      'flex ml-4 mt-1': true
    });

    return (
      <div className={containerClassName}>
        {results.map((r, index) =>
          <DropdownItem
            value={r.name ?? ''}
            key={index + '-' + r.name}
            className='flex flex-col mb-3 mr-4 border rounded-md p-3 text-lg'
          >
            {r.name}
          </DropdownItem>
        )}
      </div>
    )
  }
}

const customSearchBarCss = {
  searchBarContainer: 'mb-3 text-emerald-800'
};

export default function UniversalPage(): JSX.Element {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setUniversal();
  });

  return (
    <div>
      <SearchBar
        visualAutocompleteConfig={visualAutocompleteConfig}
        customCssClasses={customSearchBarCss}
      />
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