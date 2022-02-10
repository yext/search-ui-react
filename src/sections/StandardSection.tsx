import { VerticalResultsDisplay } from '../components/VerticalResultsDisplay';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

/**
 * The CSS class interface used for {@link StandardSection}.
 */
export interface StandardSectionCssClasses {
  section?: string
}

const builtInCssClasses: StandardSectionCssClasses = {
  section: ''
};

/**
 * The configuration for a StandardSection.
 */
export interface StandardSectionConfig extends SectionConfig {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardSectionCssClasses,
  /** {@inheritDoc CompositionMethod} */
  compositionmethod?: CompositionMethod
}

/**
 * A component that displays all the results for a vertical using a standard section template.
 *
 * @param props - {@inheritDoc StandardSectionConfig}
 * @returns A React element for a standard section, or null if there are no results to display
 */
const StandardSection: SectionComponent = function(props: StandardSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    props.customCssClasses,
    props.compositionmethod
  );
  const { results, cardConfig, header } = props;

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  return (
    <section className={cssClasses.section}>
      {header}
      <VerticalResultsDisplay
        results={results}
        CardComponent={cardComponent}
        {...cardConfig}
      />
    </section>
  );
};
export default StandardSection;