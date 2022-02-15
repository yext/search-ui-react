import { Result } from '@yext/answers-headless-react';

/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export interface CardProps {
  /** The result data provided to the card for rendering. */
  result: Result,
}

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export type CardComponent = (props: CardProps) => JSX.Element;