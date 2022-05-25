import { Facets as FacetsCompoundComponent } from './Filters/Facets';
import { FilterGroup } from './FilterGroup';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { Fragment } from 'react';

/**
 * The CSS class interface for {@link Facets}.
 *
 * @public
 */
export interface FacetsCssClasses {
  container?: string,
  divider?: string,
  searchInput?: string,
  optionsContainer?: string,
  option?: string,
  optionInput?: string,
  optionLabel?: string
}

/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
export interface FacetsProps {
  /** Whether or not the filter is collapsible. Defaults to true. */
  collapsible?: boolean,
  /**
   * If the filter group is collapsible, whether or not it should start out
   * expanded. Defaults to true.
   */
  defaultExpanded?: boolean,
  /** Whether or not to display a text input to search for filter options. */
  searchable?: boolean,
  /**
   * Whether or not a search is automatically run when a filter is selected.
   * Defaults to true.
   */
  searchOnChange?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FacetsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays all facets applicable to the current vertical search.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const { searchOnChange, customCssClasses = {}, ...filterGroupProps } = props;
  const { container:containerCssClasses, divider, ...filterGroupCssClasses } = customCssClasses;
  return (
    <FacetsCompoundComponent searchOnChange={searchOnChange} className={containerCssClasses}>
      {facets => {
        const filteredFacets = facets.filter(f => f.options.length > 0);
        return (<>
          {filteredFacets.map((f, i) => {
            const filterOptions = f.options.map(option => ({ ...option, label: option.displayName }));
            return (
              <Fragment key={f.fieldId}>
                <FilterGroup
                  fieldId={f.fieldId}
                  filterOptions={filterOptions}
                  title={f.displayName}
                  customCssClasses={filterGroupCssClasses}
                  {...filterGroupProps}
                />
                {(i < facets.length - 1) && <Divider cssClasses={divider}/>}
              </Fragment>
            );
          })}
        </>);
      }}
    </FacetsCompoundComponent>
  );
}

function Divider({
  cssClasses = 'w-full h-px bg-gray-200 my-4' 
}: { cssClasses?: string }) {
  return <div className={cssClasses}></div>;
}
