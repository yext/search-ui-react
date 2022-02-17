export interface VerticalLink {
  verticalKey: string
  query: string | undefined
}

export const isVerticalLink = (obj: unknown): obj is VerticalLink => {
  return typeof obj === 'object' && !!obj && 'verticalKey' in obj && 'query' in obj;
};