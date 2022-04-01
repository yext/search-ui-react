import { Matcher,NumberRangeValue, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFilterGroupContext } from './FilterGroupContext';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { findSelectableFilter, isNumberRangeValue, parseNumberRangeInput } from '../../utils/filterutils';
import { executeSearch } from '../../utils/search-operations';
import classNames from 'classnames';
import { NumberRangeFilter } from '../../models/NumberRangeFilter';
import { useFiltersContext } from './FiltersContext';

/**
 * Props for the {@link Filters.RangeInput}
 *
 * @public
 */
export interface RangeInputProps {
  /**
   * Returns the filter's display name based on the range values which is used when the filter
   * is displayed by other components such as AppliedFilters.
   *
   * @remarks
   * By default, the displayName separates the range with a dash such as '10 - 20'.
   * If the range is unbounded, it will display as 'Up to 20' or 'Over 10'.
   */
  getFilterDisplayName?: (value: NumberRangeValue) => string,
  /**
   * An optional element which renders in front of the input text.
   */
  inputPrefix?: JSX.Element,
  /** CSS classes for customizing the component styling defined by {@link Filters.RangeInputCssClasses} */
  customCssClasses?: RangeInputCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * The CSS class interface for {@link Filters.RangeInput}.
 *
 * @public
 */
export interface RangeInputCssClasses {
  container?: string,
  input?: string,
  input___withPrefix?: string,
  input___withoutPrefix?: string,
  input___disabled?: string,
  input___enabled?: string,
  inputContainer?: string,
  inputRowContainer?: string,
  buttonsContainer?: string,
  label?: string,
  inputPrefix?: string,
  inputPrefix___disabled?: string,
  inputPrefix___enabled?: string,
  divider?: string,
  applyButton?: string,
  clearButton?: string,
  tooltipContainer?: string,
  tooltip?: string
}

const builtInCssClasses: RangeInputCssClasses = {
  container: 'flex flex-col',
  input: 'w-24 h-9 form-input cursor-pointer border border-gray-300 rounded-md text-sm focus:ring-primary focus:ring-0 appearance-none leading-9 text-neutral-dark',
  input___withPrefix: 'pl-[1.375rem]',
  input___withoutPrefix: 'px-2',
  input___disabled: 'bg-gray-50 placeholder:text-neutral-light cursor-not-allowed',
  input___enabled: 'placeholder:text-neutral',
  inputContainer: 'relative',
  inputRowContainer: 'flex flex-row items-center space-x-3 peer',
  buttonsContainer: 'flex flex-row items-center justify-between pt-2',
  label: 'text-neutral text-sm font-normal cursor-pointer',
  inputPrefix: 'absolute left-2 top-2 text-sm',
  inputPrefix___disabled: 'text-neutral-light cursor-not-allowed',
  inputPrefix___enabled: 'text-neutral',
  divider: 'w-2.5 text-sm text-neutral',
  applyButton: 'text-sm text-primary font-medium',
  clearButton: 'text-sm text-neutral font-medium',
  tooltipContainer: 'invisible peer-hover:visible relative -right-60 -top-10',
  tooltip: 'absolute z-10 left-0 whitespace-nowrap rounded shadow-lg p-3 text-sm bg-neutral-dark text-white'
};

/**
 * Represents a single number range static filter which accepts user input.
 *
 * @public
 *
 * @param props - {@link Filters.RangeInputProps}
 */
export function RangeInput(props: RangeInputProps): JSX.Element | null {
  const { filters } = useFiltersContext();
  const { defaultFieldId: fieldId, setIsOptionsDisabled } = useFilterGroupContext();
  const {
    getFilterDisplayName = getDefaultFilterDisplayName,
    inputPrefix
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const answersActions = useAnswersActions();
  const [minRangeInput, setMinRangeInput] = useState<string>('');
  const [maxRangeInput, setMaxRangeInput] = useState<string>('');
  const staticFilters = useAnswersState(state => state.filters.static);
  const isDisabled = !!filters.find(filter => filter.selected && filter.fieldId === fieldId);

  const rangeFilter: NumberRangeFilter = useMemo(() => {
    return {
      fieldId: fieldId ?? '',
      matcher: Matcher.Between,
      value: parseNumberRangeInput(minRangeInput, maxRangeInput),
    };
  }, [fieldId, maxRangeInput, minRangeInput]);

   // Find a static filter which matches the current range input
  const matchingFilter = findSelectableFilter(rangeFilter, staticFilters ?? []);
  const isSelectedInAnswersState = matchingFilter?.selected === true;
  const hasUserInput = !!(minRangeInput || maxRangeInput);
  const shouldRenderApplyButton = hasUserInput && !isSelectedInAnswersState;

  useEffect(() => setIsOptionsDisabled(hasUserInput), [hasUserInput, setIsOptionsDisabled]);

  const handleMinChange = useCallback(event => {
    const input = event?.target?.value;
    validateNumericInput(input) && setMinRangeInput(input);
  }, []);

  const handleMaxChange = useCallback(event => {
    const input = event?.target?.value;
    validateNumericInput(input) && setMaxRangeInput(input);
  }, []);

  const handleClickApply = useCallback(() => {
    const displayName = getFilterDisplayName(rangeFilter.value);
    // Find selected static range filters with the same fieldId
    const selectedRangeFilters = staticFilters?.filter(filter =>
      filter.fieldId === fieldId && filter.selected === true && isNumberRangeValue(filter.value)
    );
    selectedRangeFilters?.forEach(filter => {
      answersActions.setFilterOption({
        ...filter,
        selected: false
      });
    });
    answersActions.setFilterOption({
      ...rangeFilter,
      selected: true,
      displayName
    });
    answersActions.setOffset(0);
    executeSearch(answersActions);
  }, [answersActions, fieldId, getFilterDisplayName, rangeFilter, staticFilters]);

  const handleClickClear = useCallback(() => {
    setMinRangeInput('');
    setMaxRangeInput('');
  }, []);

  if (fieldId === undefined) {
    console.error('RangeInput cannot be rendered because a defaultFieldId wasn\'t specified for its FilterGroup.');
    return null;
  }

  const inputClasses = classNames(cssClasses.input, {
    [cssClasses.input___withPrefix ?? '']: !!inputPrefix,
    [cssClasses.input___withoutPrefix ?? '']: !inputPrefix,
    [cssClasses.input___disabled ?? '']: isDisabled,
    [cssClasses.input___enabled ?? '']: !isDisabled
  });

  const inputPrefixClasses = classNames(cssClasses.inputPrefix, {
    [cssClasses.inputPrefix___disabled ?? '']: isDisabled,
    [cssClasses.inputPrefix___enabled ?? '']: !isDisabled,
  });

  return (
    <div className={cssClasses.container}>
      <div className={cssClasses.inputRowContainer}>
        <div className={cssClasses.inputContainer}>
          {inputPrefix && <span className={inputPrefixClasses} aria-hidden="true">{inputPrefix}</span>}
          <input
            type='text'
            inputMode='decimal'
            value={minRangeInput}
            placeholder='Min'
            disabled={isDisabled}
            className={inputClasses}
            onChange={handleMinChange}
          />
        </div>
        <div className={cssClasses.divider}>-</div>
        <div className={cssClasses.inputContainer}>
          {inputPrefix && <span className={inputPrefixClasses} aria-hidden="true">{inputPrefix}</span>}
          <input
            type='text'
            inputMode='decimal'
            value={maxRangeInput}
            placeholder='Max'
            disabled={isDisabled}
            className={inputClasses}
            onChange={handleMaxChange}
          />
        </div>
      </div>
      {isDisabled &&
        <div className={cssClasses.tooltipContainer}>
          <div className={cssClasses.tooltip}>
            Unselect an option to enter in a range.
          </div>
        </div>
      }
      {hasUserInput &&
        <div className={cssClasses.buttonsContainer}>
          <button
            className={cssClasses.clearButton}
            onClick={handleClickClear}>Clear min and max
          </button>
          {shouldRenderApplyButton &&
            <button
              className={cssClasses.applyButton}
              onClick={handleClickApply}>Apply
            </button>
          }
        </div>
      }
    </div>
  );
}

/**
 * Creates the filter's display name based on the number range.
 */
function getDefaultFilterDisplayName(numberRange: NumberRangeValue) {
  const start = numberRange.start;
  const end = numberRange.end;

  if (start && end) {
    return `${start.value} - ${end.value}`;
  } else if (start && !end) {
    return `Over ${start.value}`;
  } else if (end && !start) {
    return `Up to ${end.value}`;
  }
  return '';
}

/**
 * Returns true only if the provided string passes the numeric validation.
 *
 * @remarks
 * Allows whole numbers and numbers with a single period.
 */
function validateNumericInput(str: string) {
  const numberRegex = new RegExp(/^\d*\.?\d*$/);
  return numberRegex.test(str);
}