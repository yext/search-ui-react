import { VerticalResultsDisplay } from '../components/VerticalResultsDisplay';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

/**
 * The CSS class interface used for {@link StandardSection}.
 *
 * @public
 */
export interface StandardSectionCssClasses {
  section?: string
}

const builtInCssClasses: StandardSectionCssClasses = {
  section: ''
};

/**
 * The configuration for a StandardSection.
 *
 * @public
 */
export interface StandardSectionConfig extends SectionConfig {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardSectionCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays all the results for a vertical using a standard section template.
 *
 * @public
 *
 * @param props - {@link StandardSectionConfig}
 * @returns A React element for a standard section, or null if there are no results to display
 */
export default function StandardSection(props: StandardSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    props.customCssClasses,
    props.cssCompositionMethod
  );
  const { results, CardComponent = StandardCard, header } = props;

  if (results.length === 0) {
    return null;
  }

  return (
    <section className={cssClasses.section}>
      {header}
      <VerticalResultsDisplay
        results={results}
        CardComponent={CardComponent}
      />
    </section>
  );
};