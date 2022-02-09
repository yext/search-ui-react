interface CheckboxOption {
  id: string,
  label: string
}

/**
 * The CSS class interface used in {@link renderCheckboxOption}.
 */
export interface CheckboxOptionCssClasses {
  /**
   * Styling applied to the container of the option.
   */
  option?: string,
  /**
   * Styling applied to the option's checkbox.
   */
  optionInput?: string,
  /**
   * Styling applied to the option's label.
   */
  optionLabel?: string,
}

interface CheckBoxOptionProps {
  option: CheckboxOption,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  cssClasses?: CheckboxOptionCssClasses
}

export default function renderCheckboxOption({
  option, selected, onClick, cssClasses = {}
}: CheckBoxOptionProps): JSX.Element {
  return (
    <div className={cssClasses.option} key={option.id}>
      <input
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={evt => onClick(evt.target.checked)}
      />
      <label className={cssClasses.optionLabel} htmlFor={option.id}>{option.label}</label>
    </div>
  );
}
