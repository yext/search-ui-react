<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [FacetsProps](./search-ui-react.facetsprops.md)

## FacetsProps interface

Props for the [Facets()](./search-ui-react.facets.md) component.

<b>Signature:</b>

```typescript
export interface FacetsProps 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [children?](./search-ui-react.facetsprops.children.md) | ReactElement\[\] \| ReactElement \| undefined \| null | <i>(Optional)</i> The custom facet components that will override the default rendering. |
|  [customCssClasses?](./search-ui-react.facetsprops.customcssclasses.md) | [FacetsCssClasses](./search-ui-react.facetscssclasses.md) | <i>(Optional)</i> CSS classes for customizing the component styling. |
|  [excludedFieldIds?](./search-ui-react.facetsprops.excludedfieldids.md) | string\[\] | <i>(Optional)</i> List of field ids that should not be displayed. |
|  [hierarchicalFieldIds?](./search-ui-react.facetsprops.hierarchicalfieldids.md) | string\[\] | <i>(Optional)</i> List of field ids that should be rendered as hierarchical facets. |
|  [onlyRenderChildren?](./search-ui-react.facetsprops.onlyrenderchildren.md) | boolean | <i>(Optional)</i> If set to true, only the facets specified in the children are rendered. If set to false, all facets are rendered with the ones specified in the children overridden. Default to false. |
|  [searchOnChange?](./search-ui-react.facetsprops.searchonchange.md) | boolean | <i>(Optional)</i> Whether or not a search is automatically run when a filter is selected. Defaults to true. |
