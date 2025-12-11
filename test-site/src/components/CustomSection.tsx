import { SectionProps, StandardCard } from '@yext/search-ui-react';
import React from 'react';

export function CustomSection<T>(props: SectionProps<T>): React.JSX.Element | null {
  const { results, CardComponent = StandardCard, header } = props;

  if (results.length === 0) {
    return null;
  }

  return (
    <section>
      {header}
      <p>CUSTOM SECTION</p>
      {results.map((result, index) => <CardComponent result={result} key={index}/>)}
    </section>
  );
}