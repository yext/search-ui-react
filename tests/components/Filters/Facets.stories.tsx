import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, State } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../../__fixtures__/answers-headless';
import { RecursivePartial } from '../../__utils__/mocks';
import { DisplayableFacets } from '../../__fixtures__/data/filters';
import { Filters } from '../../../src/components';


const meta: ComponentMeta<typeof Filters.Facets> = {
  title: 'Facets',
  component: Filters.Facets,
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Filters.Facets>
        {facets => {
          const filteredFacets = facets.filter(f => f.options.length > 0);
          return (
            <>
              {filteredFacets.map(f => {
                return (
                  <Filters.FilterGroup key={f.fieldId} fieldId={f.fieldId}>
                    <Filters.CollapsibleLabel label={f.displayName} />
                    <Filters.CollapsibleSection>
                      {f.options.map(o =>
                        <Filters.CheckboxOption
                          key={o.displayName}
                          value={o.value}
                          matcher={o.matcher}
                          label={o.displayName}
                        />
                      )}
                    </Filters.CollapsibleSection>
                  </Filters.FilterGroup>
                );
              })}
            </>
          );
        }}
      </Filters.Facets>
    </AnswersHeadlessContext.Provider>
  );
};
