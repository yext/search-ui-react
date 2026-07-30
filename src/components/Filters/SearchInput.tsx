import { useTranslation } from 'react-i18next';
import React, { ChangeEvent, useCallback } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';
import { useId } from '../../hooks/useId';

/**
 * Props for the {@link Filters.SearchInput}.
 *
 * @public
 */
export interface SearchInputProps {
  /** CSS class names applied to the input element. */
  className?: string,
  /** CSS class names applied to the label element. */
  labelClassName?: string,
  /** {@inheritDoc FilterSearch.placeholder} */
  placeholder?: string,
  /** The label text associated with the input. */
  label?: string,
  /**
   * Whether the label is hidden from view while remaining associated with the input for
   * assistive technology. Defaults to false.
   *
   * @remarks
   * When true, labelClassName is not applied since the label is not rendered visibly.
   */
  visuallyHiddenLabel?: boolean
}

/**
 * SearchInput is a simple input component that updates the
 * active searchValue for a particular {@link Filters.FilterGroupProvider}.
 *
 * @param props - {@link Filters.SearchInputProps}
 *
 * @public
 */
export function SearchInput(props: SearchInputProps): React.JSX.Element {
  const { t } = useTranslation();
  const {
    className = 'text-sm form-input bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:ring-primary focus:ring-0 text-neutral-dark placeholder:text-neutral',
    labelClassName = 'mb-1 block text-sm font-medium text-neutral-dark',
    placeholder,
    label,
    visuallyHiddenLabel = false
  } = props;
  const { searchValue, setSearchValue } = useFilterGroupContext();
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, [setSearchValue]);

  const labelId = useId('filters-search-input-label');
  const inputId = useId('filter-group-search-input');
  const labelElement = label && (
    <label
      id={labelId}
      htmlFor={inputId}
      className={visuallyHiddenLabel ? 'sr-only' : labelClassName}
    >
      {label}
    </label>
  );
  return (
    <>
      {!visuallyHiddenLabel && labelElement}
      <input
        id={inputId}
        className={className}
        type='text'
        placeholder={placeholder ?? t('searchHere')}
        value={searchValue}
        onChange={handleChange}
      />
      {/* A hidden label follows the input so that the input remains the first child of its
          container. Sibling spacing utilities such as Tailwind's space-y-* skip the first child,
          so a preceding label would add a gap above the input even though the label itself takes
          up no space. htmlFor keeps the association regardless of order. */}
      {visuallyHiddenLabel && labelElement}
    </>
  );
}
