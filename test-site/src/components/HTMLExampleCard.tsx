import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';
import { useCallback } from 'react';
import '../styles/resetStyles.css';
import React, { useMemo } from 'react';

const builtInCssClasses = {
  container: 'flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm',
  header: 'flex text-neutral-dark',
  title: 'text-lg font-medium',
  thumbsFeedbackContainer: 'flex justify-end mt-4 text-sm text-gray-500 font-medium',
};

// change to the field name that contains html string
const htmlFieldName = 'c_richTextV2Data';

// this interface is used to expose the field name containing HTML Content to the card
interface CustomRawDataType {
  name: string,
  description: string,
  [htmlFieldName]: { html: string }
}

function renderHTMLContent(htmlContent: { __html: string } | undefined) {
  if ( htmlContent )
  {
    return <div className="reset-style" dangerouslySetInnerHTML={htmlContent} />;
  }
  return null;
}

export function HTMLExampleCard(props: CardProps<CustomRawDataType>): React.JSX.Element {
  const { result } = props;
  const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK');
  const cardFeedbackCallback = useCardFeedbackCallback(result);
  const onClick = useCallback(() => {
    cardFeedbackCallback('THUMBS_UP');
  }, [cardFeedbackCallback]);

  const html: string = result.rawData?.[htmlFieldName]?.html;
  const htmlContent = useMemo(() => { return { __html: html }; }, [html]);

  return (
    <div className={builtInCssClasses.container}>
      <p className={builtInCssClasses.header}>HTML Card</p>
      <button onClick={onClickTitle} className={builtInCssClasses.title}>{result.rawData.name}</button>
      {renderHTMLContent(htmlContent)}
      <button onClick={onClick} className={builtInCssClasses.thumbsFeedbackContainer}>Feedback</button>
    </div>
  );
}
