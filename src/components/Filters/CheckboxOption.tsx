import { Filter, Matcher, NumberRangeValue, useAnswersUtilities } from '@yext/answers-headless-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useFiltersContext } from './FiltersContext';
import { useFilterGroupContext } from './FilterGroupContext';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { findSelectableFilter } from '../../utils/filterutils';
import classNames from 'classnames';

/**
 * The configuration data for a filter option.
 *
 * @public
 */
export interface FilterOptionConfig {
  /** The value used to perform filtering. */
  value: string | number | boolean | NumberRangeValue,
  /** The type of filtering operation used. Defaults to an equals comparison. */
  matcher?: Matcher,
  /** If this particular filter should be selected by default. */
  selectedByDefault?: boolean,
  /** The display name. Defaults to the value prop. */
  displayName?: string
}

/**
 * Props for the {@link Filters.CheckboxOption}
 *
 * @public
 */
export interface CheckboxOptionProps extends FilterOptionConfig {
  /** CSS classes for customizing the component styling defined by {@link Filters.CheckboxCssClasses} */
  customCssClasses?: CheckboxCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * The CSS class interface for {@link Filters.CheckboxOption}.
 *
 * @public
 */
export interface CheckboxCssClasses {
  input?: string,
  input___disabled?: string,
  label?: string,
  label___disabled?: string,
  container?: string,
  optionContainer?: string,
  tooltipContainer?: string,
  tooltip?: string
}

const builtInCssClasses: CheckboxCssClasses = {
  label: 'text-neutral text-sm font-normal cursor-pointer',
  label___disabled: 'opacity-50 cursor-not-allowed',
  input: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary focus:ring-primary',
  input___disabled: 'border-gray-200 bg-gray-50 cursor-not-allowed',
  container: 'flex items-center',
  optionContainer: 'flex items-center space-x-3 peer',
  tooltipContainer: 'invisible peer-hover:visible relative -right-5 -top-5',
  tooltip: 'absolute z-10 left-0 -top-0.5 whitespace-nowrap rounded shadow-lg p-3 text-sm bg-neutral-dark text-white'
};

/**
 * A checkbox component that represents a single Filter.
 *
 * @public
 *
 * @param props - {@link Filters.CheckboxOptionProps}
 */
export function CheckboxOption(props: CheckboxOptionProps): JSX.Element | null {
  const { searchValue, fieldId, isOptionsDisabled } = useFilterGroupContext();
  const {
    value,
    matcher = Matcher.Equals,
    selectedByDefault = false,
    displayName = props.value,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const optionId = useMemo(() => uuid(), []);
  const answersUtilities = useAnswersUtilities();
  const { selectFilter, filters, applyFilters } = useFiltersContext();

  const handleClick = useCallback((checked: boolean) => {
    selectFilter({
      matcher,
      fieldId,
      value,
      displayName: typeof displayName === 'string' ? displayName : undefined,
      selected: checked
    });
    applyFilters();
  }, [applyFilters, fieldId, displayName, selectFilter, value, matcher]);

  const handleChange = useCallback(evt => {
    handleClick(evt.target.checked);
  }, [handleClick]);

  const optionFilter: Filter = useMemo(() => {
    return {
      fieldId,
      matcher,
      value
    };
  }, [fieldId, value, matcher]);
  const existingStoredFilter = findSelectableFilter(optionFilter, filters);

  const shouldRenderOption: boolean = useMemo(() => {
    if (typeof displayName !== 'string') {
      console.error('A displayName is needed for filter with value', value);
      return false;
    }

    if (!answersUtilities.isCloseMatch(displayName, searchValue)) {
      return false;
    }

    return true;
  }, [value, answersUtilities, displayName, searchValue]);

  useEffect(() => {
    if (shouldRenderOption) {
      if (!existingStoredFilter && selectedByDefault) {
        selectFilter({
          ...optionFilter,
          displayName: typeof displayName === 'string' ? displayName : undefined,
          selected: true
        });
      }
    }
  }, [displayName, selectFilter, selectedByDefault, existingStoredFilter, optionFilter, shouldRenderOption]);

  if (!shouldRenderOption) {
    return null;
  }

  const isSelected = existingStoredFilter ? existingStoredFilter.selected : false;

  const inputClasses = classNames(cssClasses.input, {
    [cssClasses.input___disabled ?? '']: isOptionsDisabled
  });
  const labelClasses = classNames(cssClasses.label, {
    [cssClasses.label___disabled ?? '']: isOptionsDisabled
  });

  return (
    <div className={cssClasses.container}>
      <div className={cssClasses.optionContainer}>
        <input
          type='checkbox'
          id={optionId}
          checked={isSelected}
          className={inputClasses}
          onChange={handleChange}
          disabled={isOptionsDisabled}
        />
        <label className={labelClasses} htmlFor={optionId}>{displayName}</label>
      </div>
      {isOptionsDisabled &&
        <div className={cssClasses.tooltipContainer}>
          <div className={cssClasses.tooltip}>
            Clear the range to select options.
          </div>
        </div>
      }
    </div>
  );
}
