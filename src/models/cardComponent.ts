import { Result } from '@yext/search-headless-react';
import { DefaultRawDataType } from './DefaultRawDataType';
import React from 'react';
/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export interface CardProps<T = DefaultRawDataType> {
  /** The result data provided to the card for rendering. */
  result: Result<T>
}

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export type CardComponent<T = DefaultRawDataType> = (props: CardProps<T>) => React.JSX.Element;