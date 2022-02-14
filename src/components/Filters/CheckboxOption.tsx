import { Matcher, useAnswersUtilities } from '@yext/answers-headless-react';
import { useMemo, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useFiltersContext } from './FiltersContext';
import { useGroupContext } from './GroupContext';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';

export type CheckboxOptionProps = {
  value: string | number | boolean,
  fieldId?: string,
  cssClasses?: CheckboxCssClasses,
  cssCompositionMethod?: CompositionMethod,
  label?: string, // defaults to the value if unspecified
  defaultChecked?: boolean
};

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

export default function CheckboxOption(props: CheckboxOptionProps): JSX.Element | null {
  const { searchValue, defaultFieldId } = useGroupContext();
  const {
    fieldId = defaultFieldId,
    value,
    label = props.value,
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.cssClasses, props.cssCompositionMethod);
  const optionId = useMemo(() => uuid(), []);
  const answersUtilities = useAnswersUtilities();
  const { handleFilterSelect } = useFiltersContext();
  const [ checked, setChecked ] = useState<boolean>(!!props.defaultChecked);

  useEffect(() => {
    if (!fieldId) {
      console.error('No fieldId found for filter with value', value);
    }
  }, [fieldId, value]);

  if (!answersUtilities.isCloseMatch(label.toString(), searchValue)) {
    return null;
  }

  function onClick(checked: boolean) {
    setChecked(checked);
    fieldId && handleFilterSelect({
      matcher: Matcher.Equals,
      fieldId,
      value
    }, checked);
  }

  return (
    <div className={cssClasses.container}>
      <input
        type='checkbox'
        id={optionId}
        checked={checked}
        className={cssClasses.input}
        onChange={evt => onClick(evt.target.checked)}
      />
      <label className={cssClasses.label} htmlFor={optionId}>{label}</label>
    </div>
  );
}
