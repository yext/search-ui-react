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
  it('Uses the default options search input label when no override is given', () => {
    renderStaticFilters();

    expect(screen.getByLabelText(`Search ${staticFiltersProps.title} Options`)).toBeDefined();
  });

  it('Applies a filterGroupSearchInputLabel override to the options search input', async () => {
    renderStaticFilters('es', {
      es: { filterGroupSearchInputLabel: 'Filtrar la lista de {{title}}' }
    });

    expect(
      await screen.findByLabelText(`Filtrar la lista de ${staticFiltersProps.title}`)
    ).toBeDefined();
  });
});
