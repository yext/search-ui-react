<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [useComposedCssClasses](./search-ui-react.usecomposedcssclasses.md)

## useComposedCssClasses() function

useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes.

<b>Signature:</b>

```typescript
export declare function useComposedCssClasses<ClassInterface extends Partial<Record<keyof ClassInterface & string, string>>>(builtInClasses: Readonly<ClassInterface>, customClasses?: Partial<ClassInterface>): ClassInterface;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  builtInClasses | Readonly&lt;ClassInterface&gt; | The component's built-in tailwind classes |
|  customClasses | Partial&lt;ClassInterface&gt; | The custom tailwind classes to merge with the built-in ones |

<b>Returns:</b>

ClassInterface

The composed CSS classes

## Remarks

Tailwind classes will be merged without conflict, with custom classes having higher priority than built-in ones.

## Example

Suppose a component has built-in classes of `{ container: 'px-4 text-slate-700' }`<!-- -->.

Passing in the custom classes:

```ts
{ container: 'text-red-200 mb-3' }
```
results in the merged classes of:

```ts
{ container: 'px-4 text-red-200 mb-3' }
```
