import { CardComponent } from './cardComponent';
import { SectionComponent } from './sectionComponent';
import { VerticalLink } from './verticalLink';

/**
 * The configuration for a vertical.
 *
 * @public
 */
export interface VerticalConfig<T = Record<string, unknown>> {
  /** {@inheritDoc SectionComponent} */
  SectionComponent?: SectionComponent,
  /** The card to use for this vertical. */
  CardComponent?: CardComponent<T>,
  /** The label for the vertical. */
  label?: string,
  /** Whether or not this vertical should show a button to view all results on the vertical page. */
  viewAllButton?: boolean,
  /**
   * A function to provide user defined url path for each vertical's view all link.
   *
   * @remarks
   * Defaults to "/[verticalKey]?query=[query]"
   */
  getViewAllUrl?: (data: VerticalLink) => string
}

/**
 * A map of verticalKey to a VerticalConfig.
 *
 * @public
 */
export interface VerticalConfigMap {
  /** Config mapped to a vertical. */
  [verticalKey: string]: VerticalConfig
}