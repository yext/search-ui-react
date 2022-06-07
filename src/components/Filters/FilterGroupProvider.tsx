import { PropsWithChildren, useMemo, useState } from 'react';
import useCollapse from 'react-collapsed';
import { FilterGroupContext } from './FilterGroupContext';

/**
 * Props for a {@link Filters.FilterGroupProvider}.
 *
 * @public
 */
export type FilterGroupProviderProps = PropsWithChildren<{
  /** Whether the {@link Filters.FilterGroupProvider} should start out expanded. Defaults to true. */
  defaultExpanded?: boolean,
  /** {@inheritDoc Filters.FilterGroupContextType.fieldId} */
  fieldId: string
}>;

/**
 * The Filters.FilterGroupProvider component represents a group of filters to
 * support for searching and collapsing.
 *
 * @remarks
 * A Filter.Group designates a set of filters which may be collapsed through the
 * {@link Filters.CollapsibleLabel} and {@link Filters.CollapsibleSection} components. A Filter.Group
 * also designates a set of filters which may be searched with the {@link Filters.SearchInput}
 * component.
 *
 * @public
 *
 * @param props - {@link Filters.FilterGroupProviderProps}
 */
export function FilterGroupProvider(props: FilterGroupProviderProps): JSX.Element {
  const {
    children,
    defaultExpanded = true,
    fieldId
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const FilterGroupContextInstance = useMemo(() => {
    return {
      fieldId,
      searchValue,
      setSearchValue,
      getCollapseProps,
      getToggleProps,
      isExpanded,
      isOptionsDisabled,
      setIsOptionsDisabled
    };
  }, [
    fieldId,
    getCollapseProps,
    getToggleProps,
    isExpanded,
    searchValue,
    isOptionsDisabled
  ]);

  return (
    <FilterGroupContext.Provider value={FilterGroupContextInstance}>
      {children}
    </FilterGroupContext.Provider>
  );
}