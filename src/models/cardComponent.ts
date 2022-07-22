import { Result } from '@yext/search-headless-react';
import { DefaultResultType } from './defaultResultType';
/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export interface CardProps<T = DefaultResultType> {
  /** The result data provided to the card for rendering. */
  result: Result<T>
}

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export type CardComponent<T = DefaultResultType> = (props: CardProps<T>) => JSX.Element;