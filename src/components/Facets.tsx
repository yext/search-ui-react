import { useAnswersState, useAnswersActions, Filter } from '@yext/answers-headless-react'
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import Filters, { FiltersCssClasses } from './Filters';

interface FacetsProps {
  searchOnChange?: boolean,
  searchable?: boolean,
  collapsible?: boolean,
  defaultExpanded?: boolean,
  facetConfigs?: Record<string, FacetConfig>,
  customCssClasses?: FacetsCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export interface FacetConfig {
  searchable?: boolean,
  placeholderText?: string,
  label?: string,
  collapsible?: boolean,
  defaultExpanded?: boolean
}

interface FacetsCssClasses extends FiltersCssClasses {
  facetsContainer?: string,
  buttonsContainer?: string,
  button?: string
}

const builtInCssClasses: FacetsCssClasses = {
  facetsContainer: 'md:w-40',
  buttonsContainer: 'flex justify-between mt-5',
  button: 'border border-gray-300 px-2.5 py-1 rounded-md',
}

export default function Facets(props: FacetsProps): JSX.Element {
  const {
    searchOnChange,
    searchable,
    collapsible,
    defaultExpanded,
    facetConfigs = {},
    customCssClasses,
    cssCompositionMethod
  } = props;
  const facets = useAnswersState(state => state.filters?.facets) || [];

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const answersActions = useAnswersActions();
  const executeSearch = () => answersActions.executeVerticalQuery();

  const handleResetFacets = () => {
    answersActions.resetFacets();
    if (searchOnChange) {
      executeSearch();
    }
  }

  const onFacetOptionClick = (filter: Filter, selected: boolean) => {
    if (typeof filter.value !== 'string' &&
      typeof filter.value !== 'boolean' &&
      typeof filter.value !== 'number') {
      return;
    }
    const option = {
      matcher: filter.matcher,
      value: filter.value
    }
    answersActions.setFacetOption(filter.fieldId, option, selected);
    if (searchOnChange) {
      executeSearch();
    }
  }

  const filtersConfig = facets
    .filter(facet => facet.options?.length > 0)
    .map(facet => {
      const overrideConfig = facetConfigs?.[facet.fieldId] ?? {};
      const config = {
        searchable,
        collapsible,
        defaultExpanded,
        ...overrideConfig
      }

      const filterOptions = facet.options.map(option => {
        return {
          fieldId: facet.fieldId,
          value: option.value,
          label: `${option.displayName} (${option.count})`,
          isSelected: option.selected,
          onClick: onFacetOptionClick
        }
      });

      return ({
        label: facet.displayName,
        options: filterOptions,
        ...config
      });
    });

  return (
    <div className={cssClasses.facetsContainer}>
      <Filters
        filterConfigs={filtersConfig}
        customCssClasses={customCssClasses}
        cssCompositionMethod={cssCompositionMethod}
      />
      <div className={cssClasses.buttonsContainer}>
        {!searchOnChange && <button onClick={executeSearch} className={cssClasses.button}>Apply</button>}
        <button onClick={handleResetFacets} className={cssClasses.button}>Reset all</button>
      </div>
    </div>
  )
}
