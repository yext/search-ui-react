<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [MapboxMap](./search-ui-react.mapboxmap.md)

## MapboxMap() function

A component that renders a map with markers to show result locations using Mapbox GL.

<b>Signature:</b>

```typescript
export declare function MapboxMap<T>({ mapboxAccessToken, mapboxOptions, PinComponent, getCoordinate, onDrag }: MapboxMapProps<T>): JSX.Element;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  { mapboxAccessToken, mapboxOptions, PinComponent, getCoordinate, onDrag } | [MapboxMapProps](./search-ui-react.mapboxmapprops.md)<!-- -->&lt;T&gt; |  |

<b>Returns:</b>

JSX.Element

A React element containing a Mapbox Map

## Remarks

For the map to work properly, be sure to include Mapbox GL stylesheet in the application.

## Example

For instance, user may add the following import statement in their application's index file or in the file where `MapboxMap` is used: `import 'mapbox-gl/dist/mapbox-gl.css';`

Or, user may add a stylesheet link in their html page: `<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />`
