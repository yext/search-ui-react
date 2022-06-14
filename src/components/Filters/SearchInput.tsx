import { useCallback } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';

/**
 * Props for the {@link Filters.SearchInput}.
 *
 * @public
 */
export interface SearchInputProps {
  /** CSS class names applied to the input element. */
  className?: string,
  /** {@inheritDoc FilterSearch.placeholder} */
  placeholder?: string
}

/**
 * SearchInput is a simple input component that updates the
 * active searchValue for a particular {@link Filters.FilterGroupProvider}.
 *
 * @param props - {@link Filters.SearchInputProps}
 *
 * @public
 */
export function SearchInput(props: SearchInputProps): JSX.Element {
  const {
    className = 'text-sm form-input bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:ring-primary focus:ring-0 text-neutral-dark placeholder:text-neutral',
    placeholder = 'Search here...'
  } = props;
  const { searchValue, setSearchValue } = useFilterGroupContext();
  const handleChange = useCallback(e => {
    setSearchValue(e.target.value);
  }, [setSearchValue]);

  return (
    <input
      className={className}
      type='text'
      placeholder={placeholder}
      value={searchValue}
      onChange={handleChange}
    />
  );
}