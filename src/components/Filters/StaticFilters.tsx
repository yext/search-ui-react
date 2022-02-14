import { Filter, useAnswersActions } from '@yext/answers-headless-react';
import { PropsWithChildren } from 'react';
import Filters from './Filters';

export type StaticFiltersProps = PropsWithChildren<{
  className?: string
}>;

export default function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const {
    children,
    className = 'md:w-40'
  } = props;
  const answersActions = useAnswersActions();

  return (
    <div className={className}>
      <Filters handleFilterSelect={(filter: Filter, selected: boolean) => {
        answersActions.resetFacets();
        answersActions.setFilterOption({ ...filter, selected });
        answersActions.executeVerticalQuery();
      }}>
        {children}
      </Filters>
    </div>
  );
}