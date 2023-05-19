import { render, screen } from '@testing-library/react';
import { Source, State } from '@yext/search-headless-react';
import { mockAnswersHooks, mockAnswersState, spyOnActions } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import {
  Facets,
  StandardFacet,
  StandardFacetProps,
  NumericalFacet,
  NumericalFacetProps,
  HierarchicalFacet, HierarchicalFacetProps
} from '../../src';
import { expectFacetOptionSet, getOptionLabelTextWithCount } from '../__utils__/facets';
import { DisplayableFacetOption } from '@yext/search-core';
import userEvent from '@testing-library/user-event';

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: DisplayableFacets
  },
  vertical: {
    verticalKey: 'vertical',
    results: [{
      source: Source.KnowledgeManager,
      rawData: {}
    }],
    appliedQueryFilters: []
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  }
};

const mockedActions = {
  state: mockedState,
  setOffset: jest.fn(),
  setFacetOption: jest.fn(),
  executeVerticalQuery: jest.fn()
};

const mockedUtils = {
  isCloseMatch: () => true
};

jest.mock('@yext/search-headless-react');

describe('Facets', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
  });
  it('Properly renders standard facets if present', () => {
    render(<Facets/>);
    const facet = DisplayableFacets[0];

    expect(screen.getByText(facet.displayName)).toBeDefined();
    facet.options.forEach(o => {
      expect(screen.getByText(getOptionLabelTextWithCount(o))).toBeDefined();
    });
  });

  it('Properly renders numerical facets if present', () => {
    render(<Facets/>);
    const numericalFilter = DisplayableFacets[1];

    expect(screen.getByText(numericalFilter.displayName)).toBeDefined();
    numericalFilter.options.forEach(o => {
      expect(screen.getByText(o.displayName)).toBeDefined();
    });
  });

  it('Does not render filters if no facets are present', () => {
    mockAnswersState({
      ...mockedState,
      filters: {
        static: [],
        facets: []
      }
    });
    render(<Facets/>);
    const facet = DisplayableFacets[0];
    const numericalFilter = DisplayableFacets[1];

    expect(screen.queryByText(numericalFilter.displayName)).toBeNull();
    numericalFilter.options.forEach(o => {
      expect(screen.queryByText(o.displayName)).toBeNull();
    });

    expect(screen.queryByText(facet.displayName)).toBeNull();
    facet.options.forEach(o => {
      expect(screen.queryByText(`${o.displayName} (${o.count})}`)).toBeNull();
    });
  });

  it('Properly renders an override standard facet if present', () => {
    const mockTransformOptions = (options: DisplayableFacetOption[]) =>
      options.map(option => ({ ...option, displayName: `my ${option.displayName}` }));

    const overrideFieldId = 'products';
    const overrideLabel = 'My Products';
    const props: StandardFacetProps = {
      fieldId: overrideFieldId,
      label: overrideLabel,
      transformOptions: mockTransformOptions,
    };

    render(
      <Facets>
        <StandardFacet {...props}/>
      </Facets>);
    const facet = DisplayableFacets[0];

    expect(screen.getByText(overrideLabel)).toBeDefined();
    expect(screen.queryByText(facet.displayName)).toBeNull();
    expect(
      screen
        .getByText(
          `my ${facet.options[0].displayName} (${facet.options[0].count})`))
      .toBeDefined();
  });

  it('Properly renders an override numerical facet if present', () => {
    const mockTransformOptions = (options: DisplayableFacetOption[]) =>
      options.map(option => ({ ...option, displayName: `Price is ${option.displayName}` }));

    const overrideFieldId = 'price';
    const overrideLabel = 'My Price';
    const props: NumericalFacetProps = {
      fieldId: overrideFieldId,
      label: overrideLabel,
      transformOptions: mockTransformOptions,
    };

    render(
      <Facets>
        <NumericalFacet {...props}/>
      </Facets>);
    const facet = DisplayableFacets[1];

    expect(screen.getByText(overrideLabel)).toBeDefined();
    expect(screen.queryByText(facet.displayName)).toBeNull();
    expect(screen.getByText(`Price is ${facet.options[0].displayName}`)).toBeDefined();
  });

  it('Properly renders an override hierarchical facet if present', () => {
    const overrideFieldId = 'hier';
    const overrideLabel = 'My Fruit';
    const props: HierarchicalFacetProps = {
      fieldId: overrideFieldId,
      label: overrideLabel,
    };

    render(
      <Facets>
        <HierarchicalFacet {...props}/>
      </Facets>);
    const facet = DisplayableFacets[2];

    expect(screen.getByText(overrideLabel)).toBeDefined();
    expect(screen.queryByText(facet.displayName)).toBeNull();
  });

  it('Clicking a facet option executes a search by default', () => {
    mockAnswersState({
      ...mockedState,
      filters: { facets: [DisplayableFacets[0]] }
    });
    const actions = spyOnActions();
    render(<Facets/>);

    const facet = DisplayableFacets[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(
      getOptionLabelTextWithCount(facet.options[0])
    );
    expect(coffeeCheckbox.checked).toBeFalsy();

    userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, facet.fieldId, facet.options[0], true);
    expect(actions.executeVerticalQuery).toBeCalled();
  });

  it('Clicking a facet option does not execute a search when searchOnChange is false', () => {
    mockAnswersState({
      ...mockedState,
      filters: { facets: [DisplayableFacets[0]] }
    });
    const actions = spyOnActions();
    render(<Facets searchOnChange={false}/>);

    const facet = DisplayableFacets[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(
      getOptionLabelTextWithCount(facet.options[0])
    );
    expect(coffeeCheckbox.checked).toBeFalsy();

    userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, facet.fieldId, facet.options[0], true);
    expect(actions.executeVerticalQuery).not.toBeCalled();
  });
});
