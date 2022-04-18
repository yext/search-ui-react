import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { useCardAnalyticsCallback } from '../../hooks/useCardAnalyticsCallback';
import { CardProps } from '../../models/cardComponent';
import {
  ThumbsFeedback,
  ThumbsFeedbackCssClasses,
  builtInCssClasses as thumbsFeedbackCssClasses
} from '../ThumbsFeedback';
import { useCardFeedbackCallback } from '../../hooks/useCardFeedbackCallback';
import { renderHighlightedValue } from '../utils/renderHighlightedValue';
import { CtaData, isCtaData, StandardCardData } from '../../models/StandardCardData';
import { isStringOrHighlightedValue, validateData } from '../utils/validateData';

import { HighlightedValue, Result } from '@yext/answers-headless-react';

/**
 * Props for a StandardCard.
 *
 * @public
 */
export interface StandardCardProps extends CardProps {
  /** Whether or not to show an ordinal for numbering the card. */
  showOrdinal?: boolean,
  /** Whether or not to show thumbs up/down buttons to provide feedback on the result card */
  showFeedbackButtons?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardCardCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * The CSS class interface used for {@link StandardCard}.
 *
 * @public
 */
export interface StandardCardCssClasses extends ThumbsFeedbackCssClasses {
  container?: string,
  header?: string,
  body?: string,
  descriptionContainer?: string,
  ctaContainer?: string,
  cta1?: string,
  cta2?: string,
  ordinal?: string,
  title?: string,
  titleLink?: string,
  titleHighlighted?: string,
  titleNonHighlighted?: string,
  descriptionHighlighted?: string,
  descriptionNonHighlighted?: string
}

const builtInCssClasses: StandardCardCssClasses = {
  container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
  header: 'flex text-neutral-dark',
  body: 'flex justify-end pt-2.5 text-base',
  descriptionContainer: 'w-full',
  descriptionHighlighted: 'font-semibold',
  descriptionNonHighlighted: 'font-normal',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'whitespace-nowrap bg-primary text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'whitespace-nowrap bg-white text-primary font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-medium',
  titleHighlighted: 'font-bold',
  titleNonHighlighted: 'font-medium',
  titleLink: 'text-lg font-medium text-primary hover:underline focus:underline',
  feedbackButtonsContainer: 'flex justify-end mt-4 text-sm text-gray-400 font-medium',
  thumbsUpIcon: thumbsFeedbackCssClasses.thumbsUpIcon,
  thumbsDownIcon: thumbsFeedbackCssClasses.thumbsDownIcon
};

/**
 * This Component renders the base result card.
 *
 * @public
 *
 * @param props - An object containing the result itself and any additional information needed
 *                to render the card
 * @returns A React element for the result card
 */
export function StandardCard(props: StandardCardProps): JSX.Element {
  const {
    showOrdinal,
    result,
    customCssClasses,
    cssCompositionMethod,
    showFeedbackButtons
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const data = dataForRender(result);

  const handleCtaClick = useCardAnalyticsCallback(result, 'CTA_CLICK');
  const handleTitleClick = useCardAnalyticsCallback(result, 'TITLE_CLICK');
  const handleFeedbackButtonClick = useCardFeedbackCallback(result);

  // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
  function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
    return (<>
      {(cta1 ?? cta2) &&
        <div className={cssClasses.ctaContainer}>
          {cta1 && <button className={cssClasses.cta1} onClick={handleCtaClick}>{cta1.label}</button>}
          {cta2 && <button className={cssClasses.cta2} onClick={handleCtaClick}>{cta2.label}</button>}
        </div>
      }
    </>);
  }

  // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
  function renderOrdinal(_index: number) {
    // return (
    //   <div className={cssClasses.ordinal}>{_index}</div>
    // );
    return null;
  }

  function renderTitle(title: HighlightedValue | string) {
    const titleJsx = renderHighlightedValue(title, {
      highlighted: cssClasses.titleHighlighted,
      nonHighlighted: cssClasses.titleNonHighlighted
    });

    return (
      result.link
        ? <a href={result.link} className={cssClasses.titleLink} onClick={handleTitleClick}>
          {titleJsx}
        </a>
        : <div className={cssClasses.title}>{titleJsx}</div>
    );
  }

  return (
    <div className={cssClasses.container}>
      <div className={cssClasses.header}>
        {showOrdinal && result.index && renderOrdinal(result.index)}
        {data.title && renderTitle(data.title)}
      </div>
      {(data.description ?? data.cta1 ?? data.cta2) &&
        <div className={cssClasses.body}>
          {data.description &&
          <div className={cssClasses.descriptionContainer}>
            {renderHighlightedValue(data.description, {
              highlighted: cssClasses.descriptionHighlighted,
              nonHighlighted: cssClasses.descriptionNonHighlighted
            })}
          </div>}
          {renderCTAs(data.cta1, data.cta2)}
        </div>
      }
      {showFeedbackButtons && <ThumbsFeedback
        feedbackText=''
        onClick={handleFeedbackButtonClick}
        cssClasses={cssClasses}
      />}
    </div>
  );
}

function dataForRender(result: Result): Partial<StandardCardData> {
  const data = {
    title: result.highlightedFields?.name ?? result.rawData.name,
    description: result.highlightedFields?.description ?? result.rawData.description,
    cta1: result.rawData.c_primaryCTA,
    cta2: result.rawData.c_secondaryCTA,
  };

  return validateData(data, {
    title: isStringOrHighlightedValue,
    description: isStringOrHighlightedValue,
    cta1: isCtaData,
    cta2: isCtaData
  });
}
