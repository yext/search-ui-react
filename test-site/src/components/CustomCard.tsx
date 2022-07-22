
import { CardProps } from '@yext/search-ui-react';

export interface CustomResultsType {
  name: string,
  description: string,
}

export function CustomCard(props: CardProps<CustomResultsType>): JSX.Element {
  const { result } = props;

  return (
    <div>
        <p>Custom Card!</p>
        <p>Name: {result.rawData.name}</p>
        <p>Description: {result.rawData.description}</p>
    </div>
  );
}
