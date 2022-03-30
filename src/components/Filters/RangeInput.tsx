import { Filter, Matcher,NumberRangeValue, useAnswersActions, useAnswersState, LowerNumberRangeLimit, UpperNumberRangeLimit } from '@yext/answers-headless-react';
import { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useFilterGroupContext } from './FilterGroupContext';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { findSelectableFilter } from '../../utils/filterutils';
import { executeSearch } from '../../utils/search-operations';
import classNames from 'classnames';

/**
 * Props for the {@link Filters.RangeInput}
 *
 * @public
 */
export interface RangeInputProps {
  /**
   * The fieldId used for filtering.
   *
   * @remarks
   * When fieldId is unspecified, it defaults to the defaultFieldId of the nearest
   * {@link Filters.FilterGroup}. If there is no fieldId or defaultFieldId, the component does not render and
   * an error is logged.
   */
  fieldId?: string,
  /**
   * Returns the display name based on the range's start and end values.
   */
  getDisplayName?: (start?: LowerNumberRangeLimit, end?: UpperNumberRangeLimit) => string,
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
  inputContainer?: string,
  inputRowContainer?: string,
  buttonsContainer?: string,
  label?: string,
  inputPrefix?: string,
  divider?: string,
  applyButton?: string,
  clearButton?: string
}

const builtInCssClasses: RangeInputCssClasses = {
  container: 'flex flex-col',
  input: 'w-24 h-9 form-input cursor-pointer border border-gray-300 rounded-md text-neutral-dark text-sm focus:ring-primary focus:ring-0 appearance-none leading-9 placeholder:text-neutral',
  input___withPrefix: 'pl-[1.375rem]',
  input___withoutPrefix: 'px-2',
  inputContainer: 'relative',
  inputRowContainer: 'flex flex-row items-center space-x-3',
  buttonsContainer: 'flex flex-row items-center justify-between pt-2',
  label: 'text-neutral text-sm font-normal cursor-pointer',
  inputPrefix: 'absolute left-2 top-2 text-sm text-neutral',
  divider: 'w-2.5 text-sm text-neutral',
  applyButton: 'text-sm text-primary font-medium',
  clearButton: 'text-sm text-neutral font-medium'
};

/**
 * Represents a single number range static filter which accepts user input.
 *
 * @public
 *
 * @param props - {@link Filters.RangeInputProps}
 */
export function RangeInput(props: RangeInputProps): JSX.Element | null {
  const { defaultFieldId } = useFilterGroupContext();
  const {
    fieldId = defaultFieldId,
    getDisplayName = getDefaultDisplayName,
    inputPrefix
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const minInputId = useMemo(() => uuid(), []);
  const maxInputId = useMemo(() => uuid(), []);
  const answersActions = useAnswersActions();
  const [minRangeInput, setMinRangeInput] = useState<string | undefined>(undefined);
  const [maxRangeInput, setMaxRangeInput] = useState<string | undefined>(undefined);
  const staticFilters = useAnswersState(state => state.filters.static);

  const minRange = parseNumber(minRangeInput);
  const maxRange = parseNumber(maxRangeInput);

  const value: NumberRangeValue = useMemo(() => {
    return {
      ...(minRange !== undefined && {
        start: {
          matcher: Matcher.GreaterThanOrEqualTo,
          value: minRange
        }
      }),
      ...(maxRange !== undefined && {
        end: {
          matcher: Matcher.LessThanOrEqualTo,
          value: maxRange
        }
      })
    };
  }, [maxRange, minRange]);

  const displayName = getDisplayName(value.start, value.end);

  const rangeFilter: Filter = useMemo(() => {
    return {
      fieldId: fieldId ?? '',
      matcher: Matcher.Between,
      value
    };
  }, [fieldId, value]);

  // Find a selected static range filter with the same fieldId
  const selectedFilterFromStorage = staticFilters?.find(filter =>
    filter.fieldId === fieldId && filter.matcher === Matcher.Between && filter.selected === true
  );
  // Find a static filter which matches the current range input
  const matchingFilterFromStorage = findSelectableFilter(rangeFilter, staticFilters ?? []);
  const isSelectedInStorage = matchingFilterFromStorage?.selected === true;

  const isValidNumberInput = useCallback(number => {
    const numberRegex = new RegExp(/^\d*\.?\d*$/);
    return numberRegex.test(number);
  }, []);

  const handleMinChange = useCallback(event => {
    const value = event?.target?.value;
    isValidNumberInput(value) && setMinRangeInput(value);
  }, [isValidNumberInput]);

  const handleMaxChange = useCallback(event => {
    const value = event?.target?.value;
    isValidNumberInput(value) && setMaxRangeInput(value);
  }, [isValidNumberInput]);

  const handleClickApply = useCallback(() => {
    selectedFilterFromStorage && answersActions.setFilterOption({
      ...selectedFilterFromStorage,
      selected: false
    });
    answersActions.setFilterOption({
      ...rangeFilter,
      selected: true,
      displayName
    });
    answersActions.setOffset(0);
    executeSearch(answersActions);
  }, [answersActions, displayName, rangeFilter, selectedFilterFromStorage]);

  const handleClickClear = useCallback(() => {
    setMinRangeInput(undefined);
    setMaxRangeInput(undefined);
  }, []);

  const shouldRenderOption: boolean = useMemo(() => {
    if (!fieldId) {
      console.error('No fieldId found for filter with value', JSON.stringify(value));
      return false;
    }

    return true;
  }, [fieldId, value]);

  if (!shouldRenderOption) {
    return null;
  }

  const isUserInput = minRangeInput || maxRangeInput;
  const renderApplyButton = isUserInput && !isSelectedInStorage;
  const renderButtons = isUserInput || renderApplyButton;

  const inputClasses = classNames(cssClasses.input, {
    [cssClasses.input___withPrefix ?? '']: !!inputPrefix,
    [cssClasses.input___withoutPrefix ?? '']: !inputPrefix
  });

  return (
    <div className={cssClasses.container}>
      <div className={cssClasses.inputRowContainer}>
        <div className={cssClasses.inputContainer}>
          {inputPrefix && <span className={cssClasses.inputPrefix} aria-hidden="true">{inputPrefix}</span>}
          <input
            type='text'
            inputMode='decimal'
            value={minRangeInput ?? ''}
            placeholder='Min'
            id={minInputId}
            className={inputClasses}
            onChange={handleMinChange}
          />
        </div>
        <div className={cssClasses.divider}>-</div>
        <div className={cssClasses.inputContainer}>
          {inputPrefix && <span className={cssClasses.inputPrefix} aria-hidden="true">{inputPrefix}</span>}
          <input
            type='text'
            inputMode='decimal'
            value={maxRangeInput ?? ''}
            placeholder='Max'
            id={maxInputId}
            className={inputClasses}
            onChange={handleMaxChange}
          />
        </div>
      </div>
      {renderButtons &&
        <div className={cssClasses.buttonsContainer}>
          {isUserInput &&
            <button
              className={cssClasses.clearButton}
              onClick={handleClickClear}>Clear min and max
            </button>
          }
          {renderApplyButton &&
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
 * Creates the filter's display name based on the upper and lower limits.
 */
function getDefaultDisplayName(start?: LowerNumberRangeLimit, end?: UpperNumberRangeLimit) {
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
 * Given a string, returns the corresponding number, or undefined if it is NaN.
 */
function parseNumber(num?: string) {
  const parsedNum = parseFloat(num ?? '');
  if (isNaN(parsedNum)) {
    return undefined;
  }
  return parsedNum;
}
