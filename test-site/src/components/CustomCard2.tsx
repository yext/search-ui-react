
import { CardProps } from '@yext/search-ui-react';

export interface Custom2ResultsType {
  name: string,
  c_vimeo: string
}

export function CustomCard2(props: CardProps<Custom2ResultsType>): JSX.Element {
  const { result } = props;

  return (
    <div className='flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm'>
        <p className='text-green-600'>Custom Card 2</p>
        <p>Name: {result.rawData.name}</p>
        <p>Link: {result.rawData.c_vimeo}</p>
    </div>
  );
}
