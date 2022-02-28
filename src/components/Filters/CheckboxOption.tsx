import { Matcher, useAnswersUtilities } from '@yext/answers-headless-react';
import { useMemo } from 'react';
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
  input: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
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
    label = props.value,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const optionId = useMemo(() => uuid(), []);
  const answersUtilities = useAnswersUtilities();
  const { handleFilterSelect, filters } = useFiltersContext();

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

  const isSelected = !!filters?.find(storedDisplayableFilter => {
    const { selected, displayName:_, ...storedFilter } = storedDisplayableFilter;
    if (!selected) {
      return false;
    }
    const targetFilter = {
      fieldId,
      matcher: Matcher.Equals,
      value
    };
    return isDuplicateFilter(storedFilter, targetFilter);
  });

  function onClick(checked: boolean) {
    fieldId && handleFilterSelect({
      matcher: Matcher.Equals,
      fieldId,
      value,
      displayName: label as string,
      selected: isSelected
    }, checked);
  }

  return (
    <div className={cssClasses.container}>
      <input
        type='checkbox'
        id={optionId}
        checked={isSelected}
        className={cssClasses.input}
        onChange={evt => onClick(evt.target.checked)}
      />
      <label className={cssClasses.label} htmlFor={optionId}>{label}</label>
    </div>
  );
}
