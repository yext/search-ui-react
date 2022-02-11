import { Result } from '@yext/answers-headless-react';
import { CardComponent } from './cardComponent';

/**
 * The configuration of a section template for a vertical's results on a universal page.
 */
export interface SectionConfig {
  /** The results from this vertical. */
  results: Result[],
  /** The key for the vertical. */
  verticalKey: string,
  /** A header to display above the results. */
  header?: JSX.Element,
  /** The card to use for this vertical. */
  CardComponent?: CardComponent,
  /** Whether or not to allow more results to be viewed. */
  viewMore?: boolean
}

/**
 * A component that can be used to render a section template for vertical results.
 */
export type SectionComponent = (props: SectionConfig) => JSX.Element | null;
