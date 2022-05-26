import { Facets as FacetsCompoundComponent } from './Filters/Facets';
import { FilterGroup, FilterGroupCssClasses } from './FilterGroup';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { Fragment } from 'react';

/**
 * The CSS class interface for {@link Facets}.
 *
 * @public
 */
export interface FacetsCssClasses extends FilterGroupCssClasses {
  container?: string,
  divider?: string
}

/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
export interface FacetsProps {
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean,
  /** {@inheritDoc FilterGroupProps.defaultExpanded} */
  defaultExpanded?: boolean,
  /** {@inheritDoc FilterGroupProps.searchable} */
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
  const {
    container: containerClassName,
    divider: dividerClassName,
    ...filterGroupCssClasses
  } = customCssClasses;
  return (
    <FacetsCompoundComponent searchOnChange={searchOnChange} className={containerClassName}>
      {facets => facets
        .filter(f => f.options.length > 0)
        .map((f, i) => {
          return (
            <Fragment key={f.fieldId}>
              <FilterGroup
                fieldId={f.fieldId}
                filterOptions={f.options}
                title={f.displayName}
                customCssClasses={filterGroupCssClasses}
                {...filterGroupProps}
              />
              {(i < facets.length - 1) && <Divider className={dividerClassName}/>}
            </Fragment>
          );
        })
      }
    </FacetsCompoundComponent>
  );
}

function Divider({ className ='w-full h-px bg-gray-200 my-4' }: { className?: string }) {
  return <div className={className} />;
}