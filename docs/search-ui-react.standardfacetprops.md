<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [StandardFacetProps](./search-ui-react.standardfacetprops.md)

## StandardFacetProps interface

Props for the [StandardFacet()](./search-ui-react.standardfacet.md) component.

**Signature:**

```typescript
interface StandardFacetProps 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[collapsible?](./search-ui-react.standardfacetprops.collapsible.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ Whether or not the filter is collapsible. Defaults to true.


</td></tr>
<tr><td>

[customCssClasses?](./search-ui-react.standardfacetprops.customcssclasses.md)


</td><td>


</td><td>

[FilterGroupCssClasses](./search-ui-react.filtergroupcssclasses.md)


</td><td>

_(Optional)_ CSS classes for customizing the component styling.


</td></tr>
<tr><td>

[defaultExpanded?](./search-ui-react.standardfacetprops.defaultexpanded.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ If the filter group is collapsible, whether or not it should start out expanded. Defaults to true.


</td></tr>
<tr><td>

[fieldId](./search-ui-react.standardfacetprops.fieldid.md)


</td><td>


</td><td>

string


</td><td>

The fieldId corresponding to the facet


</td></tr>
<tr><td>

[label?](./search-ui-react.standardfacetprops.label.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ The label of the facet. Defaults to facet's displayName if not provided.


</td></tr>
<tr><td>

[showMoreLimit?](./search-ui-react.standardfacetprops.showmorelimit.md)


</td><td>


</td><td>

number


</td><td>

_(Optional)_ The maximum number of options to render before displaying the "Show more/less" button. Defaults to 10.


</td></tr>
<tr><td>

[showOptionCounts?](./search-ui-react.standardfacetprops.showoptioncounts.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ Whether or not to show the option counts for each filter. Defaults to true.


</td></tr>
<tr><td>

[transformOptions?](./search-ui-react.standardfacetprops.transformoptions.md)


</td><td>


</td><td>

(options: DisplayableFacetOption\[\]) =&gt; DisplayableFacetOption\[\]


</td><td>

_(Optional)_ A function to transform facet's options.


</td></tr>
</tbody></table>
