import { createContext, useContext, CSSProperties, ReactNode, TransitionEvent, MouseEvent } from 'react';


declare type AriaBoolean = boolean | 'true' | 'false';

export interface GetTogglePropsOutput {
  disabled?: boolean | undefined;
  type?: 'button' | undefined;
  role?: string | undefined;
  id: string;
  'aria-controls': string;
  onClick: (e: MouseEvent) => void;
}

export interface GetTogglePropsInput {
  [key: string]: unknown;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export interface GetCollapsePropsOutput {
  id: string;
  style: CSSProperties;
  'aria-hidden': AriaBoolean;
}

export interface GetCollapsePropsInput {
  [key: string]: unknown;
  style?: CSSProperties;
  onTransitionEnd?: (e: TransitionEvent) => void;
  refKey?: string;
  ref?: (node: ReactNode) => void | null | undefined;
}

/**
 * FilterGroupContext is responsible for searchable filters and collapsible filter groups.
 *
 * @public
 */
export interface FilterGroupContextType {
  /** The value which is being used to search the FilterGroup. */
  searchValue: string,
  /** The fieldId to use with child filter components e.g. {@link Filters.CheckboxOption}. */
  fieldId: string,
  /** Sets the searchValue which is used to filter the FilterGroup. */
  setSearchValue: (value: string) => void,
  /** Returns the attributes used to collapse the filter group. */
  getCollapseProps: (config?: GetCollapsePropsInput) => GetCollapsePropsOutput,
  /** Returns the attributes used to toggle the filter group. */
  getToggleProps: (config?: GetTogglePropsInput) => GetTogglePropsOutput;
  /** Indicates whether or not the filter group is expanded. */
  isExpanded: boolean,
  /** Whether or not the filter options should be disabled. */
  isOptionsDisabled: boolean,
  /** Sets the value for whether or not the filter options should be disabled. */
  setIsOptionsDisabled: (value: boolean) => void
}

/**
 * Filter context to support searchable filters and collapsible filter groups.
 *
 * @public
 */
export const FilterGroupContext = createContext<FilterGroupContextType | null>(null);

/**
 * A hook used to access the {@link Filters.FilterGroupContextType}.
 *
 * @public
 */
export function useFilterGroupContext(): FilterGroupContextType {
  const filterGroupContextInstance = useContext(FilterGroupContext);
  if (filterGroupContextInstance === null) {
    throw new Error('Tried to use FilterGroupContext when none exists.');
  }
  return filterGroupContextInstance;
}