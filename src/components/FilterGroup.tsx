import { PropsWithChildren, useMemo } from 'react';
import {
  CheckboxOption,
  CollapsibleLabel,
  CollapsibleSection,
  FilterOptionConfig,
  SearchInput,
  FilterGroupProvider
} from './Filters';

/**
 * The CSS class interface for FilterGroup.
 *
 * @public
 */
export interface FilterGroupCssClasses {
  searchInput?: string,
  optionsContainer?: string,
  option?: string,
  optionInput?: string,
  optionLabel?: string
}

/**
 * Props for the FilterGroup component.
 *
 * @public
 */
export interface FilterGroupProps {
  /** The fieldId corresponding to the filter group. */
  fieldId: string,
  /** {@inheritDoc FilterOptionConfig} */
  filterOptions: FilterOptionConfig[],
  /** The displayed label for the filter group. */
  title: string,
  /** Whether or not the filter is collapsible. Defaults to true. */
  collapsible?: boolean,
  /**
   * If the filter group is collapsible, whether or not it should start out
   * expanded. Defaults to true.
   */
  defaultExpanded?: boolean,
  /** Whether or not to display a text input to search for filter options. */
  searchable?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterGroupCssClasses
}

/**
 * Renders a group of selectable filters with support for searching and collapsing.
 */
export function FilterGroup({
  fieldId,
  filterOptions,
  title,
  collapsible = true,
  defaultExpanded = true,
  searchable,
  customCssClasses = {},
  children
}: PropsWithChildren<FilterGroupProps>) {
  const cssClasses = useMemo(() => {
    const { option, optionLabel, optionInput, ...remainingClasses } = customCssClasses;
    return {
      ...remainingClasses,
      ...option && { optionContainer: option },
      ...optionLabel && { label: optionLabel },
      ...optionInput && { input: optionInput }
    };
  }, [customCssClasses]);

  function renderTitle() {
    return collapsible
      ? <CollapsibleLabel label={title} />
      : (title &&
        <div className='text-neutral-dark text-sm font-medium text-left mb-4'>
          {title}
        </div>);
  }
  return (
    <FilterGroupProvider
      fieldId={fieldId}
      defaultExpanded={!collapsible || defaultExpanded}
    >
      {renderTitle()}
      <CollapsibleSection className={cssClasses.optionsContainer}>
        {searchable && <SearchInput className={cssClasses.searchInput} />}
        {filterOptions.map(o => {
          return (
            <CheckboxOption
              {...o}
              key={o.displayName || o.value.toString()}
              customCssClasses={cssClasses}
            />
          );
        })}
        {children}
      </CollapsibleSection>
    </FilterGroupProvider>
  );
}
