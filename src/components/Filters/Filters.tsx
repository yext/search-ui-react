import { Filter, SelectableFilter } from '@yext/answers-headless-react';
import { PropsWithChildren } from 'react';
import FiltersContext from './FiltersContext';

export type FiltersProps = PropsWithChildren<{
  handleFilterSelect: (filter: Filter, selected: boolean) => void,
  filters: SelectableFilter[]
}>;

/**
 * Filters is responsible for providing an instance of {@link FiltersContext}.
 */
export default function Filters(props: FiltersProps): JSX.Element {
  const {
    children,
    handleFilterSelect,
    filters
  } = props;
  const filtersContextInstance = { handleFilterSelect, filters };

  return (
    <FiltersContext.Provider value={filtersContextInstance}>
      {children}
    </FiltersContext.Provider>
  );
}