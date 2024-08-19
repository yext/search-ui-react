import { useLayoutEffect } from 'react';
import { FieldValueStaticFilter, SelectableStaticFilter, useSearchActions } from '@yext/search-headless-react';
import {
  ResultsCount,
  SearchBar,
  VerticalResults,
  Pagination,
  OnDropdownInputChangeProps
} from '@yext/search-ui-react';
import { CustomCard3 } from '../components/CustomCard3';

export function FunctionPage() {
  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    searchActions.setVertical('function_vertical');
    searchActions.executeVerticalQuery();
  });

  /**
   * This example function that's being used for onDropdownInputChange allows for clearing the filter in the search state when the input is empty.
   * This is especially useful for implementations that have multiple FilterSearch components.
   * Ex. a user can search using both inputs initially, but then wants to clear one of the FilterSearch inputs and re-run a search.
   */  
  const removeAssociatedFilterWhenInputIsEmpty = (searchFields: { fieldApiName: string; entityType: string; }[]) => (params: OnDropdownInputChangeProps) => {
    const { value, executeFilterSearch } = params;
    // If there is still an input value, execute the filter search as normal
    if (value !== "") {
      executeFilterSearch(value);
    }
    // When the input is empty, remove the associated filter from the search state while keeping any other filters that are applied.
    else {
      const fieldIds = searchFields.map((field: {fieldApiName: string, entityType: string}) => field.fieldApiName);
      const filtersToKeep: SelectableStaticFilter[] = [];
      searchActions.state.filters.static?.forEach((staticFilter) => {
        const filter = staticFilter.filter as FieldValueStaticFilter;
        if (!fieldIds.includes(filter.fieldId)) {
          filtersToKeep.push(staticFilter);
        }
      });
      searchActions.setStaticFilters(filtersToKeep);
    }
  }

  return (
    <div>
      <SearchBar />
      <div className='flex'>
        <div className='flex-grow'>
          <div className='hi'>
            <ResultsCount />
            <VerticalResults
            CardComponent={CustomCard3}
          />
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}