import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchCoreDecorator } from '../tests/__fixtures__/core/SearchCore';
import { runOnly } from './wcagConfig';

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
      runOnly
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
        'MapboxMap',
        'SpellCheck',
        'ResultsCount',
        'LocationBias',
        'Dropdown',
      ]
    }
  }
};

// Add the decorator to all stories
export const decorators = [SearchCoreDecorator];