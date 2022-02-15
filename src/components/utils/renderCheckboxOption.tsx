/**
 * Represents the data for a checkbox option
 *
 * @public
 */
interface CheckboxOption {
  id: string,
  label: string
}

/**
 * The CSS class interface used in {@link renderCheckboxOption}.
 *
 * @public
 */
export interface CheckboxOptionCssClasses {
  /** Applies to the container of the option. */
  option?: string,
  /** Applies to the option's checkbox. */
  optionInput?: string,
  /** Applies to the option's label. */
  optionLabel?: string,
}

/**
 * The props of a checkbox option
 *
 * @public
 */
export interface CheckboxOptionProps {
  option: CheckboxOption,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  cssClasses?: CheckboxOptionCssClasses
}

/**
 * Renders a checkbox option
 *
 * @public
 *
 * @param props - {@link CheckboxOptionProps}
 * @returns A checkbox option react component
 */
export default function renderCheckboxOption({
  option, selected, onClick, cssClasses = {}
}: CheckboxOptionProps): JSX.Element {
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
