import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';
import { useCallback } from 'react';

interface CustomRawDataType {
  name: string,
  uppercased_input: string
}

export function FunctionCard(props: CardProps<CustomRawDataType>): JSX.Element {
  const { result } = props;
  const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK');

  return (
    <div className='flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm'>
      <p className='text-red-600'>Function Vertical Custom Card</p>
      <button onClick={onClickTitle}>UpperCased Input: {result.rawData.uppercased_input}</button>
      <p>Name: {result.rawData.name}</p>
      <p>Source: {result.source}</p>
      <p>index: {result.index}</p>
    </div>
  );
}