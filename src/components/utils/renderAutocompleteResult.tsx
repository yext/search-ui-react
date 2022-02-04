import { AutocompleteResult } from '@yext/answers-headless-react';
import renderHighlightedValue from '../utils/renderHighlightedValue';

export interface AutocompleteResultCssClasses {
  option?: string,
  icon?: string,
  highlighted?: string,
  nonHighlighted?: string
}

export const builtInCssClasses = {
  option: 'flex whitespace-pre-wrap h-6.5 pl-3',
  icon: 'w-6 text-gray-300'
}

/**
 * Renders an autocomplete result, including an icon to the left if provided.
 * @param result The result to render
 * @returns JSX.Element
 */
export default function renderAutocompleteResult(
  result: AutocompleteResult,
  cssClasses: AutocompleteResultCssClasses = {},
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  ariaLabel?: string
) {
  return <>
    {Icon && <div className={cssClasses.icon}>
      <Icon />
    </div>}
    <div aria-label={ariaLabel || ''} className={cssClasses.option}>
      {renderHighlightedValue(result, cssClasses)}
    </div>
  </>
}
