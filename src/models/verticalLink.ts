/**
 * Data needed to create a URL to a vertical search page.
 *
 * @public
 */
export interface VerticalLink {
  /** The vertical key associated with the vertical link. */
  verticalKey: string,
  /** The query used when the vertical link is selected. */
  query?: string
}

export const isVerticalLink = (obj: unknown): obj is VerticalLink => {
  return typeof obj === 'object' && !!obj && 'verticalKey' in obj;
};