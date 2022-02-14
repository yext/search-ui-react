import { DisplayableFacet, Filter, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { ReactNode } from 'react';
import Filters from './Filters';

export type FacetsProps = {
  className?: string,
  searchOnChange?: boolean,
  children?: (facets: DisplayableFacet[]) => ReactNode
};

export default function Facets(props: FacetsProps): JSX.Element {
  const {
    children,
    className = 'md:w-40',
    searchOnChange = true
  } = props;
  const answersActions = useAnswersActions();
  const facets = useAnswersState(state => state.filters.facets) ?? [];

  function handleFilterSelect(filter: Filter, selected: boolean) {
    if (typeof filter.value === 'object') {
      console.error('Facets only support string, number, and boolean. Found the following object value instead:', filter.value);
      return;
    }
    const facetOption = {
      matcher: filter.matcher,
      value: filter.value
    };
    answersActions.setFacetOption(filter.fieldId, facetOption, selected);
    if (searchOnChange) {
      answersActions.executeVerticalQuery();
    }
  }

  return (
    <div className={className}>
      <Filters handleFilterSelect={handleFilterSelect}>
        {children?.(facets)}
      </Filters>
    </div>
  );
}