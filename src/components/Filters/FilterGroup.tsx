import { PropsWithChildren, useMemo, useState } from 'react';
import useCollapse from 'react-collapsed';
import { FilterGroupContext } from './FilterGroupContext';

/**
 * Props for a {@link Filters.FilterGroup}.
 *
 * @public
 */
export type FilterGroupProps = PropsWithChildren<{
  /** Whether the {@link Filters.FilterGroup} should start out expanded. Defaults to true. */
  defaultExpanded?: boolean,
  /** {@inheritDoc Filters.FilterGroupContextType.defaultFieldId} */
  defaultFieldId?: string
}>;

/**
 * The Filters.FilterGroup component represents a group of filters to support for searching and collapsing.
 *
 * @remarks
 * A Filter.Group designates a set of filters which may be collapsed through the
 * {@link Filters.CollapsibleLabel} and {@link Filters.CollapsibleSection} components. A Filter.Group
 * also designates a set of filters which may be searched with the {@link Filters.SearchInput}
 * component.
 *
 * @public
 *
 * @param props - {@link Filters.FilterGroupProps}
 */
export function FilterGroup(props: FilterGroupProps): JSX.Element {
  const {
    children,
    defaultExpanded = true,
    defaultFieldId
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [isCheckboxOptionsDisabled, setIsCheckboxOptionsDisabled] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const FilterGroupContextInstance = useMemo(() => {
    return {
      defaultFieldId,
      searchValue,
      setSearchValue,
      getCollapseProps,
      getToggleProps,
      isExpanded,
      isCheckboxOptionsDisabled,
      setIsCheckboxOptionsDisabled
    };
  }, [
    defaultFieldId,
    getCollapseProps,
    getToggleProps,
    isExpanded,
    searchValue,
    isCheckboxOptionsDisabled
  ]);

  return (
    <FilterGroupContext.Provider value={FilterGroupContextInstance}>
      {children}
    </FilterGroupContext.Provider>
  );
}