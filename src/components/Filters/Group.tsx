import { PropsWithChildren, useState } from 'react';
import useCollapse from 'react-collapsed';
import GroupContext from './GroupContext';

export type GroupProps = PropsWithChildren<{
  defaultExpanded?: boolean,
  defaultFieldId?: string
}>;

/**
 * The Filters.Group component represents a group of filters, for the purpose
 * of searchable filters and collapsibility.
 */
export default function Group(props: GroupProps): JSX.Element {
  const {
    children,
    defaultExpanded = true,
    defaultFieldId
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const groupContextInstance = {
    defaultFieldId,
    searchValue,
    setSearchValue,
    getCollapseProps,
    getToggleProps,
    isExpanded
  };

  return (
    <GroupContext.Provider value={groupContextInstance}>
      {children}
    </GroupContext.Provider>
  );
}