import { useCardAnalytics } from '../../hooks/useCardAnalytics';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import {
  FeedbackType,
  ThumbsFeedback,
  ThumbsFeedbackCssClasses
} from '../ThumbsFeedback';
import { applyFieldMappings, FieldData } from '../utils/applyFieldMappings';
import { isString, validateData } from '../utils/validateData';

/**
 * Props for a StandardCard.
 *
 * @public
 */
export interface StandardCardProps extends CardProps {
  /** Whether or not to show an ordinal for numbering the card. */
  showOrdinal?: boolean,
  /** Custom mappings for the data fields used in the card. */
  fieldMappings?: {
    title?: FieldData,
    description?: FieldData,
    cta1?: FieldData,
    cta2?: FieldData
  },
  /** Whether or not to show thumbs up/down buttons to provide feedback on the result card */
  showFeedbackButtons?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: StandardCardCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

const defaultFieldMappings: Record<string, FieldData> = {
  title: {
    mappingType: 'FIELD',
    apiName: 'name'
  },
  description: {
    mappingType: 'FIELD',
    apiName: 'description'
  },
  cta1: {
    mappingType: 'FIELD',
    apiName: 'c_primaryCTA'
  },
  cta2: {
    mappingType: 'FIELD',
    apiName: 'c_secondaryCTA'
  },
};

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
  titleLink?: string
}

const builtInCssClasses: StandardCardCssClasses = {
  container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
  header: 'flex text-gray-800',
  body: 'flex justify-end pt-2.5 text-base',
  descriptionContainer: 'w-full',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max bg-primary-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-primary-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-medium',
  titleLink: 'text-lg font-medium text-primary-600 cursor-pointer hover:underline focus:underline',
  feedbackButtonsContainer: 'flex justify-end mt-4 text-sm text-gray-400 font-medium'
};

interface CtaData {
  label: string,
  link: string,
  linkType: string
}

function isCtaData(data: unknown): data is CtaData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const expectedKeys = ['label', 'link', 'linkType'];
  return expectedKeys.every(key => {
    return key in data;
  });
}

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
    fieldMappings: customFieldMappings,
    showOrdinal,
    result,
    customCssClasses,
    cssCompositionMethod,
    showFeedbackButtons
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const reportAnalyticsEvent = useCardAnalytics();

  const transformedFieldData = applyFieldMappings(result.rawData, {
    ...defaultFieldMappings,
    ...customFieldMappings
  });

  const data = validateData(transformedFieldData, {
    title: isString,
    description: isString,
    cta1: isCtaData,
    cta2: isCtaData
  });

  // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
  function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
    const onClick = () => {
      reportAnalyticsEvent(result, 'CTA_CLICK');
    };
    return (<>
      {(cta1 ?? cta2) &&
        <div className={cssClasses.ctaContainer}>
          {cta1 && <button className={cssClasses.cta1} onClick={onClick}>{cta1.label}</button>}
          {cta2 && <button className={cssClasses.cta2} onClick={onClick}>{cta2.label}</button>}
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

  function renderTitle(title: string) {
    const onClick = () => {
      reportAnalyticsEvent(result, 'TITLE_CLICK');
    };
    return (
      result.link
        ? <a href={result.link} className={cssClasses.titleLink} onClick={onClick}>{title}</a>
        : <div className={cssClasses.title}>{title}</div>
    );
  }

  const onClickFeedbackButton = (feedbackType: FeedbackType) => {
    reportAnalyticsEvent(result, feedbackType);
  };

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
            <span>{data.description}</span>
          </div>}
          {renderCTAs(data.cta1, data.cta2)}
        </div>
      }
      {showFeedbackButtons && <ThumbsFeedback
        feedbackText=''
        onClick={onClickFeedbackButton}
        customCssClasses={cssClasses}
        cssCompositionMethod={cssCompositionMethod}
      />}
    </div>
  );
}