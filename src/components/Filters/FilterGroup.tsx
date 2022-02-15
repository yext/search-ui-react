import { PropsWithChildren, useState } from 'react';
import useCollapse from 'react-collapsed';
import FilterGroupContext from './FilterGroupContext';

export type FilterGroupProps = PropsWithChildren<{
  /** Whether the FilterGroup should start out expanded, defaults to true */
  defaultExpanded?: boolean,
  /** The default fieldId to use with child filter components e.g. {@link CheckboxOption} */
  defaultFieldId?: string
}>;

/**
 * The Filters.Group component represents a group of filters, for the purpose
 * of searchable filters and collapsibility.
 */
export default function FilterGroup(props: FilterGroupProps): JSX.Element {
  const {
    children,
    defaultExpanded = true,
    defaultFieldId
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const FilterGroupContextInstance = {
    defaultFieldId,
    searchValue,
    setSearchValue,
    getCollapseProps,
    getToggleProps,
    isExpanded
  };

  return (
    <FilterGroupContext.Provider value={FilterGroupContextInstance}>
      {children}
    </FilterGroupContext.Provider>
  );
}