import { FacetsProvider, RangeInput, RangeInputCssClasses } from './Filters';
import { FilterGroup, FilterGroupCssClasses } from './FilterGroup';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { Fragment } from 'react';
import { DisplayableFacet, NumberRangeValue } from '@yext/answers-headless-react';
import { StandardFacetsProps } from './StandardFacets';
import { isNumberRangeFilter } from '../models/NumberRangeFilter';
import { useMemo } from 'react';

/**
 * The CSS class interface for {@link NumericalFacets}.
 *
 * @public
 */
export interface NumericalFacetsCssClasses extends FilterGroupCssClasses, RangeInputCssClasses {
  container?: string,
  divider?: string,
  rangeInputContainer?: string,
  rangeInputDivider?: string
}

/**
 * Props for the {@link NumericalFacets} component.
 *
 * @public
 */
export interface NumericalFacetsProps extends StandardFacetsProps {
  inputPrefix?: JSX.Element,
  getFilterDisplayName?: (numberRange: NumberRangeValue) => string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: NumericalFacetsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays simple facets applicable to the current vertical search.
 *
 * @remarks
 * Numerical facets is not included. Hierachical facets will not be display in a
 * tree level structure. Use `hiddenFields` to exclude hierachical facets, if any,
 * when using this component.
 *
 * @param props - {@link NumericalFacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function NumericalFacets({
  searchOnChange,
  hiddenFields = [],
  getFilterDisplayName,
  inputPrefix = <>$</>,
  customCssClasses = {},
  ...filterGroupProps
}: NumericalFacetsProps) {
  const rangeInputCssClasses = useMemo(() => {
    return {
      ...customCssClasses,
      container: customCssClasses.inputContainer,
      divider: customCssClasses.divider
    };
  }, [customCssClasses]);

  return (
    <FacetsProvider searchOnChange={searchOnChange} className={customCssClasses.container}>
      {facets => facets
        .filter(f => !hiddenFields.includes(f.fieldId) && isNumericalFacet(f))
        .map((f, i) => {
          return (
            <Fragment key={f.fieldId}>
              <FilterGroup
                fieldId={f.fieldId}
                filterOptions={f.options}
                title={f.displayName}
                customCssClasses={customCssClasses}
                {...filterGroupProps}
              >
                <RangeInput
                  getFilterDisplayName={getFilterDisplayName}
                  inputPrefix={inputPrefix}
                  customCssClasses={rangeInputCssClasses}
                />
              </FilterGroup>
              {(i < facets.length - 1) && <Divider className={customCssClasses.divider}/>}
            </Fragment>
          );
        })
      }
    </FacetsProvider>
  );
}

export function isNumericalFacet(facet: DisplayableFacet): boolean {
  return facet.options.length > 0 && isNumberRangeFilter(facet.options[0]);
}

function Divider({ className ='w-full h-px bg-gray-200 my-4' }: { className?: string }) {
  return <div className={className} />;
}