import { HighlightedValue } from "@yext/answers-headless-react";

const defaultCssClasses: HighlightedValueCssClasses = {
  highlighted: 'font-normal',
  nonHighlighted: 'font-semibold'
}

interface HighlightedValueCssClasses {
  highlighted?: string,
  nonHighlighted?: string
}

/**
 * Renders a HighlightedValue with highlighting based on its matchedSubstrings.
 * @returns JSX.Element
 */
export default function renderHighlightedValue ({ value = '', matchedSubstrings }: Partial<HighlightedValue>, customCssClasses?: HighlightedValueCssClasses): JSX.Element {
  const cssClasses = { ...defaultCssClasses, ...customCssClasses };
  if (!matchedSubstrings || matchedSubstrings.length === 0) {
    return <span>{value}</span>;
  }
  const substrings = [...matchedSubstrings];
  substrings.sort((a, b) => a.offset - b.offset);
  const highlightedJSX = []
  let curr = 0;
  for (let { offset, length } of substrings) {
    if (offset > curr) {
      highlightedJSX.push(<span key={curr} className={cssClasses.nonHighlighted} >{value.substring(curr, offset)}</span>)
    }
    highlightedJSX.push(<span key={offset} className={cssClasses.highlighted}>{value.substring(offset, offset + length)}</span>)
    curr = offset + length;
  }
  if (curr < value.length) {
    highlightedJSX.push(<span key={curr} className={cssClasses.nonHighlighted} >{value.substring(curr)}</span>)
  }
  return <>{highlightedJSX}</>;
}