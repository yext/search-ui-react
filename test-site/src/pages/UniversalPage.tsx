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
  CitationProps
} from '@yext/search-ui-react';
import classNames from 'classnames';
import { useLayoutEffect } from 'react';
// import { CustomCard } from '../components/CustomCard';
// import { CustomCard2 } from '../components/CustomCard2';
// import { CustomSection } from '../components/CustomSection';
// import { MarkdownExampleCard } from '../components/MarkdownExampleCard';
// import { Source } from '@yext/search-headless-react';
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
  searchBarContainer: 'mb-3 text-emerald-800'
};

function CustomCitationCard(props: CitationProps): JSX.Element | null {
  const {
    searchResult,
    cssClasses,
  } = props;
  const citationLink = typeof searchResult.rawData.link  === 'string' ? searchResult.rawData.link : undefined;
  return <a className={cssClasses.citation} href={citationLink}>
    {typeof searchResult.rawData.id === 'string' && <div className={cssClasses.citationTitle}>{searchResult.rawData.id}</div>}
    {typeof searchResult.rawData.s_snippet === 'string' && <div className={cssClasses.citationSnippet}>{searchResult.rawData.s_snippet}</div>}
  </a>;
}

export default function UniversalPage(): JSX.Element {
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
      />
      <SpellCheck />
      <GenerativeDirectAnswer
        answerHeader='A custom answer header'
        CitationCard={CustomCitationCard}
      />
      <DirectAnswer />
      <ResultsCount />
      <UniversalResults
        verticalConfigMap={universalVerticalConfigMap}
      />

      {/*Test generic result type  */}
      {/*<UniversalResults
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
      />*/}

      {/*Test basic markdown example*/}
      {/*<MarkdownExampleCard*/}
      {/*  result={{*/}
      {/*      rawData: {*/}
      {/*          name: "",*/}
      {/*          description: "",*/}
      {/*          c_markdownData: {*/}
      {/*              markdown:*/}
      {/*                  "# Heading 1\n" +*/}
      {/*                  "## Heading 2\n" +*/}
      {/*                  "**THIS IS BOLD TEXT**\n" +*/}
      {/*                  "1. Ordered list item one\n" +*/}
      {/*                  "2. Ordered list item two\n\n" +*/}
      {/*                  "[LINK TO GOOGLE](https://google.com)\n\n" +*/}
      {/*                  "`<ThisIsAComponentDisplayedAsCode />`"*/}
      {/*          },*/}
      {/*      },*/}
      {/*      source: Source.KnowledgeManager,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}