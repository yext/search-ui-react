import { useLayoutEffect } from 'react';
import { FieldValueStaticFilter, SelectableStaticFilter, useSearchActions } from '@yext/search-headless-react';
import {
  AppliedFilters,
  FilterSearch,
  ResultsCount,
  SearchBar,
  StandardCard,
  VerticalResults,
  LocationBias,
  StaticFilters,
  StandardFacets,
  Facets,
  HierarchicalFacet,
  HierarchicalFacets,
  FilterDivider,
  ApplyFiltersButton,
  Pagination,
  NumericalFacets,
  AlternativeVerticals,
  StandardFacet,
  NumericalFacet,
  OnDropdownInputChangeProps
} from '@yext/search-ui-react';
// import { CustomCard } from '../components/CustomCard';

const hierarchicalFacetFieldIds = ['c_hierarchicalFacet'];
const filterSearchFields = [{ fieldApiName: 'name', entityType: 'ce_person' }];
const employeeFilterSearchFields = [{fieldApiName: 'c_employeeDepartment', entityType: 'ce_person'}];
const employeeFilterConfigs = [
  { value: 'Consulting' },
  { value: 'Technology' }
];
const hierarchicalFilterConfigs = [
  { value: 'Computer & Tablets' }
];
const alternativeVerticalsConfigMap = {
  products: { label: 'Products' }
};

export function PeoplePage() {
  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    searchActions.setVertical('people');
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
        <div className='w-56 shrink-0 mr-5'>
          <FilterSearch
            searchFields={filterSearchFields}
            searchOnSelect={true}
            label='FilterSearch Name Filter'
            onDropdownInputChange={removeAssociatedFilterWhenInputIsEmpty(filterSearchFields)}
          />
          <FilterSearch
            searchFields={employeeFilterSearchFields}
            searchOnSelect={true}
            label='FilterSearch Department Filter'
            onDropdownInputChange={removeAssociatedFilterWhenInputIsEmpty(employeeFilterSearchFields)}
            showCurrentLocationButton={true}
          />
          <FilterDivider />
          <StaticFilters
            fieldId='c_employeeDepartment'
            title='Static Employee Department'
            filterOptions={employeeFilterConfigs}
          />
          <FilterDivider />
          <StaticFilters
            fieldId='c_hierarchicalFacet'
            title='Static Hierarchical Facets'
            filterOptions={hierarchicalFilterConfigs}
          />
          <FilterDivider />
          <NumericalFacets />
          <StandardFacets
            excludedFieldIds={hierarchicalFacetFieldIds}
          />
          <HierarchicalFacets
            collapsible={true}
            includedFieldIds={hierarchicalFacetFieldIds}
          />
          <Facets/>
          <Facets onlyRenderChildren={true}>
            <StandardFacet fieldId="c_employeeDepartment" label='Yext Department 1' />
          </Facets>
          <Facets>
            <StandardFacet fieldId="c_employeeDepartment" label='Yext Department 2' />
            <NumericalFacet fieldId="c_popularity" label='Yext Popularity' />
            <HierarchicalFacet fieldId={hierarchicalFacetFieldIds[0]} />
          </Facets>
          <br />
          <ApplyFiltersButton />
        </div>
        <div className='flex-grow'>
          <AlternativeVerticals
            currentVerticalLabel='People'
            verticalConfigMap={alternativeVerticalsConfigMap}
          />
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters hierarchicalFacetsFieldIds={hierarchicalFacetFieldIds} />
          </div>
          <VerticalResults
            CardComponent={StandardCard}
          />
          {/* Test generic result type  */}
          {/* <VerticalResults
            CardComponent={CustomCard}
          /> */}
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </div>
  );
}