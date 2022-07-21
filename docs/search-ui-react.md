<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-ui-react](./search-ui-react.md)

## search-ui-react package

## Functions

|  Function | Description |
|  --- | --- |
|  [AlternativeVerticals({ currentVerticalLabel, verticalConfigMap, displayAllOnNoResults, customCssClasses })](./search-ui-react.alternativeverticals.md) | A component that displays the alternative verticals that have results if a search returns none on the current vertical. |
|  [AnalyticsProvider(props)](./search-ui-react.analyticsprovider.md) | A higher-order component which provides analytics for its children. |
|  [AppliedFilters(props)](./search-ui-react.appliedfilters.md) | A component that displays a list of filters applied to the current vertical search, which may include any selected options from static filters, facets, and NLP filters. |
|  [ApplyFiltersButton({ customCssClasses, label })](./search-ui-react.applyfiltersbutton.md) | Runs a vertical search. By default has <code>position: sticky</code> styling that anchors it to the bottom of the page. |
|  [DirectAnswer(props)](./search-ui-react.directanswer.md) | Renders Direct Answers provided by the Search API. |
|  [DropdownItem(\_props)](./search-ui-react.dropdownitem.md) | A wrapper component for specifying a DropdownItemWithIndex. The index will be automatically provided by the Dropdown component instance. |
|  [executeAutocomplete(searchActions)](./search-ui-react.executeautocomplete.md) | Executes a universal/vertical autocomplete search and return the corresponding response. |
|  [executeSearch(searchActions)](./search-ui-react.executesearch.md) | Executes a universal/vertical search. |
|  [FilterSearch({ searchFields, label, placeholder, searchOnSelect, sectioned, customCssClasses })](./search-ui-react.filtersearch.md) | A component which allows a user to search for filters associated with specific entities and fields. |
|  [getSearchIntents(searchActions)](./search-ui-react.getsearchintents.md) | Get search intents of the current query stored in headless using autocomplete request. |
|  [getUserLocation(geolocationOptions)](./search-ui-react.getuserlocation.md) | Retrieves user's location using nagivator.geolocation API. |
|  [HierarchicalFacets({ searchOnChange, collapsible, defaultExpanded, includedFieldIds, customCssClasses, delimiter, showMoreLimit })](./search-ui-react.hierarchicalfacets.md) | A component that displays hierarchical facets, in a tree level structure, applicable to the current vertical search. |
|  [isCtaData(data)](./search-ui-react.isctadata.md) | Type guard for CtaData. |
|  [LocationBias({ geolocationOptions, customCssClasses })](./search-ui-react.locationbias.md) | A React Component which displays and collects location information in order to bias searches. |
|  [NumericalFacets({ searchOnChange, includedFieldIds, getFilterDisplayName, inputPrefix, customCssClasses, ...filterGroupProps })](./search-ui-react.numericalfacets.md) | A component that displays numerical facets applicable to the current vertical search. |
|  [Pagination(props)](./search-ui-react.pagination.md) | Renders a component that divide a series of vertical results into chunks across multiple pages and enable user to navigate between those pages. |
|  [renderHighlightedValue(highlightedValueOrString, customCssClasses)](./search-ui-react.renderhighlightedvalue.md) | Renders a HighlightedValue with highlighting based on its matchedSubstrings. |
|  [ResultsCount({ customCssClasses })](./search-ui-react.resultscount.md) | Renders results count of a universal/vertical search. |
|  [SearchBar({ placeholder, geolocationOptions, hideRecentSearches, visualAutocompleteConfig, hideVerticalLinks, onSelectVerticalLink, verticalKeyToLabel, recentSearchesLimit, customCssClasses, onSearch })](./search-ui-react.searchbar.md) | Renders a SearchBar that is hooked up with an InputDropdown component. |
|  [SpellCheck({ customCssClasses, onClick })](./search-ui-react.spellcheck.md) | Renders a suggested query if the Search API provides one. |
|  [StandardCard(props)](./search-ui-react.standardcard.md) | This Component renders the base result card. |
|  [StandardFacets(props)](./search-ui-react.standardfacets.md) | A component that displays simple facets applicable to the current vertical search. |
|  [StandardSection(props)](./search-ui-react.standardsection.md) | A component that displays all the results for a vertical using a standard section template. |
|  [StaticFilters(props)](./search-ui-react.staticfilters.md) | A component that displays a group of user-configured filters that will be applied to the current vertical search. |
|  [ThumbsFeedback(props)](./search-ui-react.thumbsfeedback.md) | Renders a quality feedback widget composed of thumbs up and thumbs down buttons. |
|  [UniversalResults({ verticalConfigMap, showAppliedFilters, customCssClasses })](./search-ui-react.universalresults.md) | Displays the results of a universal search with the results for each vertical separated into sections. |
|  [updateLocationIfNeeded(searchActions, intents, geolocationOptions)](./search-ui-react.updatelocationifneeded.md) | If the provided search intents include a 'NEAR\_ME' intent and there's no existing user's location in state, retrieve and store user's location in headless state. |
|  [useAnalytics()](./search-ui-react.useanalytics.md) | Returns a service that can be used to report analytics events. |
|  [useCardAnalyticsCallback(result, analyticsType)](./search-ui-react.usecardanalyticscallback.md) | Creates a memoized function for reporting card analytics. |
|  [useCardFeedbackCallback(result)](./search-ui-react.usecardfeedbackcallback.md) | Creates a memoized function for reporting card feedback analytics. |
|  [useComposedCssClasses(builtInClasses, customClasses)](./search-ui-react.usecomposedcssclasses.md) | useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes. |
|  [VerticalResults(props)](./search-ui-react.verticalresults.md) | A component that renders search results for a vertical page. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [AlternativeVerticalsCssClasses](./search-ui-react.alternativeverticalscssclasses.md) | The CSS class interface used for [AlternativeVerticals()](./search-ui-react.alternativeverticals.md)<!-- -->. |
|  [AlternativeVerticalsProps](./search-ui-react.alternativeverticalsprops.md) | Props for [AlternativeVerticals()](./search-ui-react.alternativeverticals.md)<!-- -->. |
|  [AppliedFiltersCssClasses](./search-ui-react.appliedfilterscssclasses.md) | The CSS class interface used for [AppliedFilters()](./search-ui-react.appliedfilters.md)<!-- -->. |
|  [AppliedFiltersProps](./search-ui-react.appliedfiltersprops.md) | Properties for [AppliedFilters()](./search-ui-react.appliedfilters.md)<!-- -->. |
|  [ApplyFiltersButtonCssClasses](./search-ui-react.applyfiltersbuttoncssclasses.md) | The CSS class interface for [ApplyFiltersButtonProps](./search-ui-react.applyfiltersbuttonprops.md)<!-- -->. |
|  [ApplyFiltersButtonProps](./search-ui-react.applyfiltersbuttonprops.md) | Props for [ApplyFiltersButton()](./search-ui-react.applyfiltersbutton.md) |
|  [AutocompleteResultCssClasses](./search-ui-react.autocompleteresultcssclasses.md) | The CSS class interface for the Autocomplete Result. |
|  [CardProps](./search-ui-react.cardprops.md) | The props provided to every [CardComponent](./search-ui-react.cardcomponent.md)<!-- -->. |
|  [CtaData](./search-ui-react.ctadata.md) | The shape of a StandardCard CTA field's data. |
|  [DirectAnswerCssClasses](./search-ui-react.directanswercssclasses.md) | The CSS class interface for [DirectAnswer()](./search-ui-react.directanswer.md)<!-- -->. |
|  [DirectAnswerProps](./search-ui-react.directanswerprops.md) | Props for [DirectAnswer()](./search-ui-react.directanswer.md)<!-- -->. |
|  [FilterGroupCssClasses](./search-ui-react.filtergroupcssclasses.md) | The CSS class interface for FilterGroup. |
|  [FilterGroupProps](./search-ui-react.filtergroupprops.md) | Props for the FilterGroup component. |
|  [FilterOptionConfig](./search-ui-react.filteroptionconfig.md) | The configuration data for a filter option. |
|  [FilterSearchCssClasses](./search-ui-react.filtersearchcssclasses.md) | The CSS class interface for [FilterSearch()](./search-ui-react.filtersearch.md)<!-- -->. |
|  [FilterSearchProps](./search-ui-react.filtersearchprops.md) | The props for the [FilterSearch()](./search-ui-react.filtersearch.md) component. |
|  [HierarchicalFacetDisplayCssClasses](./search-ui-react.hierarchicalfacetdisplaycssclasses.md) | The CSS class interface for HierarchicalFacetDisplay. |
|  [HierarchicalFacetsCssClasses](./search-ui-react.hierarchicalfacetscssclasses.md) | The CSS class interface for [HierarchicalFacets()](./search-ui-react.hierarchicalfacets.md)<!-- -->. |
|  [HierarchicalFacetsProps](./search-ui-react.hierarchicalfacetsprops.md) | Props for the [HierarchicalFacets()](./search-ui-react.hierarchicalfacets.md) component. |
|  [HighlightedValueCssClasses](./search-ui-react.highlightedvaluecssclasses.md) | The CSS class interface for [renderHighlightedValue()](./search-ui-react.renderhighlightedvalue.md)<!-- -->. |
|  [LocationBiasCssClasses](./search-ui-react.locationbiascssclasses.md) | The CSS class interface for the [LocationBias()](./search-ui-react.locationbias.md) component. |
|  [LocationBiasProps](./search-ui-react.locationbiasprops.md) | The props for the [LocationBias()](./search-ui-react.locationbias.md) component. |
|  [NumericalFacetsCssClasses](./search-ui-react.numericalfacetscssclasses.md) | The CSS class interface for [NumericalFacets()](./search-ui-react.numericalfacets.md)<!-- -->. |
|  [NumericalFacetsProps](./search-ui-react.numericalfacetsprops.md) | Props for the [NumericalFacets()](./search-ui-react.numericalfacets.md) component. |
|  [PaginationCssClasses](./search-ui-react.paginationcssclasses.md) | The CSS classes used for pagination. |
|  [PaginationProps](./search-ui-react.paginationprops.md) | Props for [Pagination()](./search-ui-react.pagination.md) component |
|  [RangeInputCssClasses](./search-ui-react.rangeinputcssclasses.md) | The CSS class interface for RangeInput. |
|  [ResultsCountCssClasses](./search-ui-react.resultscountcssclasses.md) | The CSS class interface for [ResultsCount()](./search-ui-react.resultscount.md)<!-- -->. |
|  [ResultsCountProps](./search-ui-react.resultscountprops.md) | Props for [ResultsCount()](./search-ui-react.resultscount.md)<!-- -->. |
|  [SearchBarCssClasses](./search-ui-react.searchbarcssclasses.md) | The CSS class interface for the [SearchBar()](./search-ui-react.searchbar.md)<!-- -->. |
|  [SearchBarProps](./search-ui-react.searchbarprops.md) | The props for the [SearchBar()](./search-ui-react.searchbar.md) component. |
|  [SectionHeaderCssClasses](./search-ui-react.sectionheadercssclasses.md) | The CSS class interface used for the SectionHeader component. |
|  [SectionProps](./search-ui-react.sectionprops.md) | The configuration of a section template for a vertical's results on a universal page. |
|  [SpellCheckCssClasses](./search-ui-react.spellcheckcssclasses.md) | The CSS Class interface for SpellCheck. |
|  [SpellCheckProps](./search-ui-react.spellcheckprops.md) | The props for the [SpellCheck()](./search-ui-react.spellcheck.md) component. |
|  [StandardCardCssClasses](./search-ui-react.standardcardcssclasses.md) | The CSS class interface used for the StandardCardDisplay. |
|  [StandardCardData](./search-ui-react.standardcarddata.md) | The data used by the [StandardCard()](./search-ui-react.standardcard.md) and taken from the original Result. |
|  [StandardCardProps](./search-ui-react.standardcardprops.md) | Props for a StandardCard. |
|  [StandardFacetsCssClasses](./search-ui-react.standardfacetscssclasses.md) | The CSS class interface for [StandardFacets()](./search-ui-react.standardfacets.md)<!-- -->. |
|  [StandardFacetsProps](./search-ui-react.standardfacetsprops.md) | Props for the [StandardFacets()](./search-ui-react.standardfacets.md) component. |
|  [StandardSectionCssClasses](./search-ui-react.standardsectioncssclasses.md) | The CSS class interface used for [StandardSection()](./search-ui-react.standardsection.md)<!-- -->. |
|  [StandardSectionProps](./search-ui-react.standardsectionprops.md) | The configuration for a StandardSection. |
|  [StaticFiltersCssClasses](./search-ui-react.staticfilterscssclasses.md) | The CSS class interface for [StaticFilters()](./search-ui-react.staticfilters.md)<!-- -->. |
|  [StaticFiltersProps](./search-ui-react.staticfiltersprops.md) | Props for the [StaticFilters()](./search-ui-react.staticfilters.md) component. |
|  [ThumbsFeedbackCssClasses](./search-ui-react.thumbsfeedbackcssclasses.md) | The CSS class interface used for [ThumbsFeedback()](./search-ui-react.thumbsfeedback.md)<!-- -->. |
|  [ThumbsFeedbackProps](./search-ui-react.thumbsfeedbackprops.md) | Props for [ThumbsFeedback()](./search-ui-react.thumbsfeedback.md)<!-- -->. |
|  [UniversalResultsCssClasses](./search-ui-react.universalresultscssclasses.md) | The CSS class interface used for [UniversalResults()](./search-ui-react.universalresults.md)<!-- -->. |
|  [UniversalResultsProps](./search-ui-react.universalresultsprops.md) | Props for [UniversalResults()](./search-ui-react.universalresults.md)<!-- -->. |
|  [VerticalConfig](./search-ui-react.verticalconfig.md) | The configuration for a vertical. |
|  [VerticalConfigMap](./search-ui-react.verticalconfigmap.md) | A map of verticalKey to a VerticalConfig. |
|  [VerticalLabelMap](./search-ui-react.verticallabelmap.md) | A map of vertical keys to labels. |
|  [VerticalLink](./search-ui-react.verticallink.md) | Data needed to create a URL to a vertical search page. |
|  [VerticalResultsCssClasses](./search-ui-react.verticalresultscssclasses.md) | The CSS class interface used for [VerticalResults()](./search-ui-react.verticalresults.md)<!-- -->. |
|  [VerticalResultsProps](./search-ui-react.verticalresultsprops.md) | Props for the VerticalResults component. |
|  [VisualAutocompleteConfig](./search-ui-react.visualautocompleteconfig.md) | The configuration options for Visual Autocomplete. |

## Variables

|  Variable | Description |
|  --- | --- |
|  [ComponentsContentPath](./search-ui-react.componentscontentpath.md) | Content path to the source files in component library that utilizes Tailwind class names. This is intended to be used in user's custom tailwind config. |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [CardAnalyticsType](./search-ui-react.cardanalyticstype.md) | Analytics event types for interactions on a card. |
|  [CardComponent](./search-ui-react.cardcomponent.md) | A functional component that can be used to render a result card. |
|  [CardCtaEventType](./search-ui-react.cardctaeventtype.md) | Analytics event types for cta click and title click. |
|  [DropdownItemProps](./search-ui-react.dropdownitemprops.md) | Props for the [DropdownItem()](./search-ui-react.dropdownitem.md)<!-- -->. |
|  [FeedbackType](./search-ui-react.feedbacktype.md) | Analytics event types for quality feedback. |
|  [FocusedItemData](./search-ui-react.focuseditemdata.md) | The data associated with the currently focused item. |
|  [onSearchFunc](./search-ui-react.onsearchfunc.md) | The interface of a function which is called on a search. |
|  [RenderEntityPreviews](./search-ui-react.renderentitypreviews.md) | The type of a functional React component which renders entity previews using a map of vertical key to the corresponding VerticalResults data. |
|  [SectionComponent](./search-ui-react.sectioncomponent.md) | A component that can be used to render a section template for vertical results. |
|  [StaticFilterOptionConfig](./search-ui-react.staticfilteroptionconfig.md) | The configuration data for a static filter option. |
