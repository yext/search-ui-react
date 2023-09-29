import { AutocompleteResult } from '@yext/search-headless-react';
import { renderHighlightedValue } from './renderHighlightedValue';
import React from 'react';

/**
 * The CSS class interface for the Autocomplete Result.
 *
 * @public
 */
export interface AutocompleteResultCssClasses {
  option?: string,
  icon?: string,
  highlighted?: string,
  nonHighlighted?: string
}

export const builtInCssClasses: Readonly<AutocompleteResultCssClasses> = {
  option: 'whitespace-no-wrap max-w-full px-3 text-neutral-dark truncate',
  icon: 'w-6 h-full flex-shrink-0 text-gray-400'
};

/**
 * Renders an autocomplete result, including an icon to the left if provided.
 * @param result - The result to render
 * @returns JSX.Element
 */
export function renderAutocompleteResult(
  result: AutocompleteResult,
  cssClasses: AutocompleteResultCssClasses = {},
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  ariaLabel?: string
): JSX.Element {
  return (<>
    {Icon && <div className={cssClasses.icon}>
      <Icon />
    </div>}
    <div aria-label={ariaLabel || ''} className={cssClasses.option}>
      {renderHighlightedValue(result, cssClasses)}
    </div>
  </>);
}
