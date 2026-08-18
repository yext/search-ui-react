import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import {
  SearchI18nextProvider,
  SearchTranslationOverrides
} from '../../src/components/SearchI18nextProvider';
import { StaticFilters } from '../../src/components';
import { staticFilters, staticFiltersProps } from '../__fixtures__/data/filters';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { i18nInstance } from '../../src/utils';

const NAMESPACE = 'search-ui-react';
const LABEL_KEY = 'filterGroupSearchInputLabel';
const originalEsLabel: string =
  i18nInstance.getResource('es', NAMESPACE, LABEL_KEY);

function renderStaticFilters(
  locale?: string,
  translationOverrides?: SearchTranslationOverrides
) {
  const searcher = generateMockedHeadless({
    filters: { static: staticFilters },
    vertical: { verticalKey: 'vertical1' },
    meta: { searchType: 'vertical', locale }
  });

  return render(
    <SearchHeadlessContext.Provider value={searcher}>
      <SearchI18nextProvider searcher={searcher} translationOverrides={translationOverrides}>
        <StaticFilters {...staticFiltersProps} searchable={true} />
      </SearchI18nextProvider>
    </SearchHeadlessContext.Provider>);
}

describe('SearchI18nextProvider', () => {
  afterEach(async () => {
    i18nInstance.addResourceBundle(
      'es', NAMESPACE, { [LABEL_KEY]: originalEsLabel }, true, true);
    await i18nInstance.changeLanguage('en');
  });

  it('Uses the default options search input label when no override is given', () => {
    renderStaticFilters();

    expect(screen.getByRole('textbox', {
      name: `Search ${staticFiltersProps.title} Options`
    })).toBeDefined();
  });

  it('Applies an options search input label translation override', async () => {
    renderStaticFilters('es', {
      es: { filterGroupSearchInputLabel: 'Filtrar la lista de {{title}}' }
    });

    expect(await screen.findByRole('textbox', {
      name: `Filtrar la lista de ${staticFiltersProps.title}`
    })).toBeDefined();
  });
});
