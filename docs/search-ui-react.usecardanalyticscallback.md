<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [useCardAnalyticsCallback](./search-ui-react.usecardanalyticscallback.md)

## useCardAnalyticsCallback() function

Creates a memoized function for reporting card analytics.

**Signature:**

```typescript
declare function useCardAnalyticsCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>, analyticsType: CardAnalyticsType): () => void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  result | [CardAnalyticsDataType](./search-ui-react.cardanalyticsdatatype.md)<!-- -->&lt;T&gt; | result that contains data use in the card analytics event. |
|  analyticsType | [CardAnalyticsType](./search-ui-react.cardanalyticstype.md) | the card analytics event type to report. |

**Returns:**

() =&gt; void

