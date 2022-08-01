import './index.css';
import { SearchCoreDecorator } from '../tests/__fixtures__/core/SearchCore';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    expanded: true
  },
  a11y: {
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
    }
  },
  options: {
    storySort: {
      order: [
        'SearchBar',
        'UniversalResults',
        'VerticalResults',
        'DirectAnswer',
        'FilterSearch',
        'StaticFilters',
        'StandardFacets',
        'NumericalFacets',
        'HierarchicalFacets',
        'RangeInput',
        'AppliedFilters',
        'Pagination',
        'AlternativeVerticals',
        'SpellCheck',
        'ResultsCount',
        'LocationBias'
      ]
    }
  }
};

// Add the decorator to all stories
export const decorators = [SearchCoreDecorator];