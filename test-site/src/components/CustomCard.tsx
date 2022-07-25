import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';

interface CustomRawDataType {
  name: string,
  description: string,
}

export function CustomCard(props: CardProps<CustomRawDataType>): JSX.Element {
  const { result } = props;
  const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK')
  const onClickFeedback = useCardFeedbackCallback(result)

  return (
    <div className='flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm'>
        <p className='text-red-600'>Custom Card</p>
        <button onClick={onClickTitle}>Name: {result.rawData.name}</button>
        <p>Description: {result.rawData.description}</p>
        <button onClick={() => onClickFeedback('THUMBS_UP')}>Feedback</button>
    </div>
  );
}
