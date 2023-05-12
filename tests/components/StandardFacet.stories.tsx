import { ComponentMeta, Story } from '@storybook/react';
import { Facets, StandardFacetProps, StandardFacet } from '../../src';

const meta: ComponentMeta<typeof StandardFacet> = {
  title: 'StandardFacet',
  component: StandardFacet
};
export default meta;

export const Primary: Story<StandardFacetProps> = (args) => {
  return (
    <Facets>
      <StandardFacet {...args} />
    </Facets>
  );
};