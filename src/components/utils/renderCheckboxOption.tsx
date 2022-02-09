interface CheckboxOption {
  id: string,
  label: string
}

export interface CheckboxOptionCssClasses {
  option?: string,
  optionLabel?: string,
  optionInput?: string
}

interface CheckBoxOptionProps {
  option: CheckboxOption,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  cssClasses?: CheckboxOptionCssClasses
}

export default function renderCheckboxOption({
  option, selected, onClick, cssClasses = {}
}: CheckBoxOptionProps) {
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
