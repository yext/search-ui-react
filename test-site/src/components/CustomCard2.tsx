
import { CardProps } from '@yext/search-ui-react';

export interface Custom2ResultsType {
  name: string,
  c_vimeo: string
}

export function CustomCard2(props: CardProps<Custom2ResultsType>): JSX.Element {
  const { result } = props;
  console.log(result.rawData)

  return (
    <div>
        <p>Custom Card 2!</p>
        <p>Name: {result.rawData.name}</p>
        <p>Link: {result.rawData.c_vimeo}</p>
    </div>
  );
}
