import { Result } from '@yext/answers-headless-react';

/**
 * CardComponent and the corresponding config options
 */
export interface CardConfig {
  CardComponent: CardComponent,
  [additionalProps: string]: unknown
}

/**
 * The props provided to every {@link CardComponent).
 */
export interface CardProps {
  result: Result,
  [additionalProps: string]: unknown
}

/**
 * A functional component that can be used to render a result card.
 */
export type CardComponent = (props: CardProps) => JSX.Element;