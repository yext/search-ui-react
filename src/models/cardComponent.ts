import { Result } from '@yext/answers-headless-react';

/**
 * The props provided to every {@link CardComponent).
 */
export interface CardProps {
  result: Result,
}

/**
 * A functional component that can be used to render a result card.
 */
export type CardComponent = (props: CardProps) => JSX.Element;