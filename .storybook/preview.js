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
        'MapboxMap',
        'DirectAnswer',
        'FilterSearch',
        'StaticFilters',
        'Facets',
        'StandardFacet',
        'NumericalFacet',
        'HierarchicalFacet',
        'StandardFacets',
        'NumericalFacets',
        'HierarchicalFacets',
        'RangeInput',
        'AppliedFilters',
        'Pagination',
        'AlternativeVerticals',
        'SpellCheck',
        'ResultsCount',
        'Geolocation',
        'LocationBias',
        'Dropdown'
      ]
    }
  }
};

// Add the decorator to all stories
export const decorators = [SearchCoreDecorator];
