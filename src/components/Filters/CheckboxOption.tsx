import { Matcher, useAnswersUtilities } from '@yext/answers-headless-react';
import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useFiltersContext } from './FiltersContext';
import { useFilterGroupContext } from './FilterGroupContext';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { isDuplicateFilter } from '../../utils/filterutils';

/**
 * Props for the {@link Filters.CheckboxOption}
 *
 * @public
 */
export interface CheckboxOptionProps {
  /** The value used to perform filtering. */
  value: string | number | boolean,
  /**
   * The fieldId used for filtering.
   *
   * @remarks
   * When fieldId is unspecified, it defaults to the defaultFieldId of the nearest
   * {@link Filters.FilterGroup}. If there is no fieldId or defaultFieldId, the component does not render and
   * an error is logged.
   */
  fieldId?: string,
  /** If this particular filter should be selected by default. */
  selectedByDefault?: boolean,
  /** The display label. Defaults to the value prop. */
  label?: string,
  /** CSS classes for customizing the component styling defined by {@link Filters.CheckboxCssClasses} */
  customCssClasses?: CheckboxCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod,
}

/**
 * The CSS class interface for {@link Filters.CheckboxOption}.
 *
 * @public
 */
export interface CheckboxCssClasses {
  input?: string,
  label?: string,
  container?: string
}

const builtInCssClasses: CheckboxCssClasses = {
  label: 'text-gray-500 text-sm font-normal cursor-pointer',
  input: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary-600 focus:ring-primary-500',
  container: 'flex items-center space-x-3'
};

/**
 * A checkbox component that represents a single Filter.
 *
 * @public
 *
 * @param props - {@link Filters.CheckboxOptionProps}
 */
export function CheckboxOption(props: CheckboxOptionProps): JSX.Element | null {
  const { searchValue, defaultFieldId } = useFilterGroupContext();
  const {
    fieldId = defaultFieldId,
    value,
    selectedByDefault = false,
    label = props.value,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const optionId = useMemo(() => uuid(), []);
  const answersUtilities = useAnswersUtilities();
  const { selectFilter, filters, applyFilters } = useFiltersContext();

  const handleClick = useCallback((checked: boolean) => {
    selectFilter({
      matcher: Matcher.Equals,
      fieldId: fieldId ?? '',
      value,
      displayName: typeof label === 'string' ? label : undefined,
      selected: checked
    });
    applyFilters();
  }, [applyFilters, fieldId, label, selectFilter, value]);

  const handleChange = useCallback(evt => {
    handleClick(evt.target.checked);
  }, [handleClick]);

  if (!fieldId) {
    console.error('No fieldId found for filter with value', value);
    return null;
  }

  if (typeof label !== 'string') {
    console.error('A label is needed for filter with value', value);
    return null;
  }

  if (!answersUtilities.isCloseMatch(label.toString(), searchValue)) {
    return null;
  }

  const existingStoredFilter = filters.find(storedDisplayableFilter => {
    const { displayName:_, ...storedFilter } = storedDisplayableFilter;
    const targetFilter = {
      fieldId,
      matcher: Matcher.Equals,
      value
    };
    return isDuplicateFilter(storedFilter, targetFilter);
  });

  let isSelected = false;
  if (existingStoredFilter) {
    isSelected = existingStoredFilter.selected;
  } else if (selectedByDefault) {
    isSelected = true;
    selectFilter({
      matcher: Matcher.Equals,
      fieldId: fieldId ?? '',
      value,
      displayName: typeof label === 'string' ? label : undefined,
      selected: true
    });
    applyFilters();
  }

  return (
    <div className={cssClasses.container}>
      <input
        type='checkbox'
        id={optionId}
        checked={isSelected}
        className={cssClasses.input}
        onChange={handleChange}
      />
      <label className={cssClasses.label} htmlFor={optionId}>{label}</label>
    </div>
  );
}
