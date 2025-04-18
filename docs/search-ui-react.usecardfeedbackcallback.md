<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md) &gt; [useCardFeedbackCallback](./search-ui-react.usecardfeedbackcallback.md)

## useCardFeedbackCallback() function

Creates a memoized function for reporting card feedback analytics.

**Signature:**

```typescript
declare function useCardFeedbackCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>): (analyticsType: FeedbackType) => void;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

result


</td><td>

[CardAnalyticsDataType](./search-ui-react.cardanalyticsdatatype.md)<!-- -->&lt;T&gt;


</td><td>

card result that contains data use in the feedback analytics event.


</td></tr>
</tbody></table>
**Returns:**

(analyticsType: [FeedbackType](./search-ui-react.feedbacktype.md)<!-- -->) =&gt; void

