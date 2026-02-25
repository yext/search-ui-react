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
import { DisplayableFacetOption } from '@yext/search-headless-react';
import userEvent from '@testing-library/user-event';
import React from 'react';

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

    expect(screen.getByRole('button', { name: facet.displayName })).toBeDefined();
    facet.options.forEach(o => {
      expect(screen.getByText(getOptionLabelTextWithCount(o))).toBeDefined();
    });
  });

  it('Properly renders numerical facets if present', () => {
    render(<Facets/>);
    const numericalFilter = DisplayableFacets[1];

    expect(screen.getByRole('button', { name: numericalFilter.displayName })).toBeDefined();
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

    expect(screen.queryByRole('button', { name: numericalFilter.displayName })).toBeNull();
    numericalFilter.options.forEach(o => {
      expect(screen.queryByText(o.displayName)).toBeNull();
    });

    expect(screen.queryByRole('button', { name: facet.displayName })).toBeNull();
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

    expect(screen.getByRole('button', { name: overrideLabel })).toBeDefined();
    expect(screen.queryByRole('button', { name: facet.displayName })).toBeNull();
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

    expect(screen.getByRole('button', { name: overrideLabel })).toBeDefined();
    expect(screen.queryByRole('button', { name: facet.displayName })).toBeNull();
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

    expect(screen.getByRole('button', { name: overrideLabel })).toBeDefined();
    expect(screen.queryByRole('button', { name: facet.displayName })).toBeNull();
  });

  it('Clicking a facet option executes a search by default', async () => {
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

    await userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, facet.fieldId, facet.options[0], true);
    expect(actions.executeVerticalQuery).toBeCalled();
  });

  it('Clicking a facet option does not execute a search when searchOnChange is false', async () => {
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

    await userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, facet.fieldId, facet.options[0], true);
    expect(actions.executeVerticalQuery).not.toBeCalled();
  });

  it('Renders all facets by default', () => {
    const overrideFieldId = 'products';
    const overrideLabel = 'My Products';
    const props: StandardFacetProps = {
      fieldId: overrideFieldId,
      label: overrideLabel,
    };

    render(
      <Facets>
        <StandardFacet {...props}/>
      </Facets>);

    expect(screen.getByRole('button', { name: overrideLabel })).toBeDefined();
    expect(screen.getByRole('button', { name: DisplayableFacets[1].displayName })).toBeDefined();
    expect(screen.getByRole('button', { name: DisplayableFacets[2].displayName })).toBeDefined();
  });

  it('Only render customize facets if onlyRenderChildren is set to true', () => {
    const overrideFieldId = 'products';
    const overrideLabel = 'My Products';
    const props: StandardFacetProps = {
      fieldId: overrideFieldId,
      label: overrideLabel,
    };

    render(
      <Facets onlyRenderChildren={true}>
        <StandardFacet {...props}/>
      </Facets>);

    expect(screen.getByRole('button', { name: overrideLabel })).toBeDefined();
    expect(screen.queryByRole('button', { name: DisplayableFacets[1].displayName })).toBeNull();
    expect(screen.queryByRole('button', { name: DisplayableFacets[2].displayName })).toBeNull();
  });

  it('Use FilterGroupCssClasses provided on the Facets level if not provided on the singular facet',
    () => {
      const overrideFieldId = 'products';
      const overrideLabel = 'My Products';
      const facetsTitleLabelClass = 'facets-title-label-class';
      const props: StandardFacetProps = {
        fieldId: overrideFieldId,
        label: overrideLabel,
      };

      render(
        <Facets customCssClasses={{ titleLabel: facetsTitleLabelClass }}>
          <StandardFacet {...props}/>
        </Facets>);

      const overrideTitleButton = screen.getByRole('button', { name: overrideLabel });
      const overrideTitleLabel = screen.getByText(overrideLabel, { selector: 'div' });
      const numericalTitleButton = screen.getByRole('button', { name: DisplayableFacets[1].displayName });
      const numericalTitleLabel = screen.getByText(DisplayableFacets[1].displayName, { selector: 'div' });

      expect(overrideTitleButton).toBeDefined();
      expect(overrideTitleLabel).toHaveClass(facetsTitleLabelClass);
      expect(numericalTitleButton).toBeDefined();
      expect(numericalTitleLabel).toHaveClass(facetsTitleLabelClass);
    });

  it('Use FilterGroupCssClasses provided on the singular facet level if provided',
    () => {
      const overrideFieldId = 'products';
      const overrideLabel = 'My Products';
      const facetsTitleLabelClass = 'facets-title-label-class';
      const standardFacetTitleLabelClass = 'standard-facet-title-label-class';
      const props: StandardFacetProps = {
        fieldId: overrideFieldId,
        label: overrideLabel,
        customCssClasses: { titleLabel: standardFacetTitleLabelClass },
      };

      render(
        <Facets onlyRenderChildren={true} customCssClasses={{ titleLabel: facetsTitleLabelClass }}>
          <StandardFacet {...props}/>
        </Facets>);

      const overrideTitleButton = screen.getByRole('button', { name: overrideLabel });
      const overrideTitleLabel = screen.getByText(overrideLabel, { selector: 'div' });

      expect(overrideTitleButton).toBeDefined();
      expect(overrideTitleLabel).toHaveClass(standardFacetTitleLabelClass);
    });
});
