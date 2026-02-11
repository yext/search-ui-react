import { provideHeadless, useSearchActions, Result } from '@yext/search-headless-react';
import {
  DirectAnswer,
  DropdownItem,
  ResultsCount,
  SearchBar,
  SpellCheck,
  UniversalResults,
  VisualAutocompleteConfig,
  GenerativeDirectAnswer,
  CitationProps,
  CitationsProps
} from '@yext/search-ui-react';
import classNames from 'classnames';
import React, { useLayoutEffect } from 'react';
// import { CustomCard } from '../components/CustomCard';
// import { CustomCard2 } from '../components/CustomCard2';
// import { CustomSection } from '../components/CustomSection';
import { config } from '../config';

const visualAutocompleteConfig: VisualAutocompleteConfig = {
  entityPreviewSearcher: provideHeadless({
    ...config,
    headlessId: 'visual-autocomplete'
  }),
  includedVerticals: ['people'],
  renderEntityPreviews: (isLoading, verticalKeyToResults, dropdownItemProps) => {
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
            className='flex flex-col mb-3 mr-4 border border-gray-200 rounded-md p-3 text-lg hover:bg-gray-100'
            focusedClassName='flex flex-col mb-3 mr-4 border border-gray-200 rounded-md p-3 text-lg bg-gray-100'
            {...dropdownItemProps}
          >
            {r.name}
          </DropdownItem>
        )}
      </div>
    );
  }
};

const universalVerticalConfigMap = {
  people: {}
};

const customSearchBarCss = {
  searchBarContainer: 'mb-3 text-emerald-800',
  focusedOption: "bg-emerald-200",
};

function CustomCitationCard(props: CitationProps): React.JSX.Element | null {
  const {
    searchResult,
    cssClasses,
    citationClickHandler
  } = props;
  const citationUrl = typeof searchResult.rawData.link  === 'string' ? searchResult.rawData.link : undefined;
  return <a className={cssClasses.citation} href={citationUrl} onClick={() => citationUrl && citationClickHandler?.({searchResult, destinationUrl: citationUrl})}>
    {typeof searchResult.rawData.id === 'string' && <div className={cssClasses.citationTitle}>{searchResult.rawData.id}</div>}
    {typeof searchResult.rawData.s_snippet === 'string' && <div className={cssClasses.citationSnippet}>{searchResult.rawData.s_snippet}</div>}
  </a>;
}

function CustomCitationsComponent(props: CitationsProps): React.JSX.Element | null {
  return (
      <>This is a custom component for citations</>
  )
}

export default function UniversalPage(): React.JSX.Element {
  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  });

  return (
    <div>
      <SearchBar
        visualAutocompleteConfig={visualAutocompleteConfig}
        customCssClasses={customSearchBarCss}
        universalAutocompleteLimit={20}
      />
      <SpellCheck />
      <GenerativeDirectAnswer
        answerHeader='A custom answer header'
        CitationCard={CustomCitationCard}
      />

      {/* Example of passing in custom citations component to GDA */}
      {/*<GenerativeDirectAnswer*/}
      {/*    answerHeader='A custom answer header'*/}
      {/*    CitationsComponent={CustomCitationsComponent}*/}
      {/*    CitationCard={CustomCitationCard}*/}
      {/*/>*/}

      <DirectAnswer />
      <ResultsCount />
      <UniversalResults
        verticalConfigMap={universalVerticalConfigMap}
      />

      {/* Test generic result type  */}
      {/* <UniversalResults
        verticalConfigMap={{
          people: {
            CardComponent: CustomCard,
            SectionComponent: CustomSection
          },
          products: {
            CardComponent: CustomCard2
          },
          links: {
            SectionComponent: CustomSection
          }
        }}
      /> */}
    </div>
  );
}
