import { VerticalResults as VerticalResults$1, SearchHeadless, UniversalLimit, QuerySource, UnknownFieldValueDirectAnswer, FieldValueStaticFilter, StaticFilter, FilterSearchResponse, SearchParameterField, Result, HighlightedValue, NumberRangeValue, Matcher, DisplayableFacetOption, DirectAnswer as DirectAnswer$1, SearchActions, AutocompleteResponse, SearchIntent } from '@yext/search-headless-react';
import { PropsWithChildren, ReactElement } from 'react';
import mapboxgl from 'mapbox-gl';
import { AnalyticsConfig, AnalyticsService } from '@yext/analytics';

/**
 * The data associated with the currently focused item.
 *
 * @public
 */
declare type FocusedItemData = Record<string, unknown>;

/**
 * The CSS class interface for the Autocomplete Result.
 *
 * @public
 */
interface AutocompleteResultCssClasses {
    option?: string;
    icon?: string;
    highlighted?: string;
    nonHighlighted?: string;
}

/**
 * Data needed to create a URL to a vertical search page.
 *
 * @public
 */
interface VerticalLink {
    /** The vertical key associated with the vertical link. */
    verticalKey: string;
    /** The query used when the vertical link is selected. */
    query?: string;
}

/**
 * The CSS class interface for the {@link SearchBar}.
 *
 * @public
 */
interface SearchBarCssClasses extends AutocompleteResultCssClasses {
    searchBarContainer?: string;
    inputElement?: string;
    inputDivider?: string;
    clearButton?: string;
    searchButton?: string;
    searchButtonContainer?: string;
    focusedOption?: string;
    recentSearchesIcon?: string;
    recentSearchesOption?: string;
    recentSearchesNonHighlighted?: string;
    verticalLink?: string;
    verticalDivider?: string;
    entityPreviewsDivider?: string;
}
/**
 * The type of a functional React component which renders entity previews using
 * a map of vertical key to the corresponding VerticalResults data.
 *
 * @remarks
 * The autocomplete loading state is passed in as an optional param.
 *
 * Default props for rendering corresponding DropdownItems are passed in:
 * an onClick function to allow an entity preview to be submitted, and
 * an ariaLabel function that returns text for the screenreader
 *
 * For the entity previews to be navigable in the search bar's dropdown section,
 * wrap each entity preview in a {@link DropdownItem} component.
 *
 * @public
 */
declare type RenderEntityPreviews = (autocompleteLoading: boolean, verticalKeyToResults: Record<string, VerticalResults$1>, dropdownItemProps: {
    onClick: (value: string, _index: number, itemData?: FocusedItemData) => void;
    ariaLabel: (value: string) => string;
}) => JSX.Element | null;
/**
 * The configuration options for Visual Autocomplete.
 *
 * @public
 */
interface VisualAutocompleteConfig {
    /** The Search Headless instance used to perform visual autocomplete searches. */
    entityPreviewSearcher: SearchHeadless;
    /** Renders entity previews based on the autocomplete loading state and results. */
    renderEntityPreviews: RenderEntityPreviews;
    /** Specify which verticals to include for VisualAutocomplete. */
    includedVerticals: string[];
    /** Specify the number of entities to return per vertical. **/
    universalLimit?: UniversalLimit;
    /** The debouncing time, in milliseconds, for making API requests for entity previews. */
    entityPreviewsDebouncingTime?: number;
}
/**
 * The interface of a function which is called on a search.
 *
 * @public
 */
declare type onSearchFunc = (searchEventData: {
    verticalKey?: string;
    query?: string;
}) => void;
/**
 * The props for the {@link SearchBar} component.
 *
 * @public
 */
interface SearchBarProps {
    /** The search bar's placeholder text. */
    placeholder?: string;
    /** {@inheritDoc LocationBiasProps.geolocationOptions} */
    geolocationOptions?: PositionOptions;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: SearchBarCssClasses;
    /** {@inheritDoc VisualAutocompleteConfig} */
    visualAutocompleteConfig?: VisualAutocompleteConfig;
    /** Shows vertical links if true, set to false on default. */
    showVerticalLinks?: boolean;
    /** A function which is called when a vertical link is selected. */
    onSelectVerticalLink?: (data: {
        verticalLink: VerticalLink;
        querySource: QuerySource;
    }) => void;
    /** A function which returns a display label for the given verticalKey. */
    verticalKeyToLabel?: (verticalKey: string) => string;
    /** Hides recent searches if true. */
    hideRecentSearches?: boolean;
    /** Limits the number of recent searches shown. */
    recentSearchesLimit?: number;
    /** A callback which is called when a search is ran. */
    onSearch?: onSearchFunc;
}
/**
 * Renders a SearchBar that is hooked up with an InputDropdown component.
 *
 * @public
 */
declare function SearchBar({ placeholder, geolocationOptions, hideRecentSearches, visualAutocompleteConfig, showVerticalLinks, onSelectVerticalLink, verticalKeyToLabel, recentSearchesLimit, customCssClasses, onSearch }: SearchBarProps): JSX.Element;

/**
 * Props for the {@link DropdownItem}.
 *
 * @public
 */
declare type DropdownItemProps = PropsWithChildren<{
    /** The value associated with the dropdown item. */
    value: string;
    /** The CSS classes which put on the dropdown item. */
    className?: string;
    /** The CSS classes put on the dropdown item when it is focused. */
    focusedClassName?: string;
    /** Data associated with the dropdown item which is passed to the onClick and the onSelect handlers. */
    itemData?: Record<string, unknown> | undefined;
    /** A function which is fired when the item is clicked. */
    onClick?: (value: string, index: number, focusedItemData: FocusedItemData | undefined) => void;
    /** Screenreader text. */
    ariaLabel?: (value: string) => string | string;
}>;
/**
 * A wrapper component for specifying a DropdownItemWithIndex.
 * The index will be automatically provided by the Dropdown component instance.
 *
 * @public
 */
declare function DropdownItem(_props: DropdownItemProps): JSX.Element | null;

/**
 * The CSS Class interface for SpellCheck.
 *
 * @public
 */
interface SpellCheckCssClasses {
    spellCheckLoading?: string;
    spellCheckContainer?: string;
    helpText?: string;
    link?: string;
}
/**
 * The props for the {@link SpellCheck} component.
 *
 * @public
 */
interface SpellCheckProps {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: SpellCheckCssClasses;
    /** A function which is called when a spell check suggestion is clicked. */
    onClick?: (data: {
        correctedQuery: string;
        verticalKey: string;
    }) => void;
}
/**
 * Renders a suggested query if the Search API provides one.
 *
 * @public
 *
 * @param props - {@link SpellCheckProps}
 * @returns A react component for spell check, or null if none exists
 */
declare function SpellCheck({ customCssClasses, onClick }: SpellCheckProps): JSX.Element | null;

/**
 * Analytics event types for quality feedback.
 *
 * @public
 */
declare type FeedbackType = 'THUMBS_UP' | 'THUMBS_DOWN';
/**
 * The CSS class interface used for {@link ThumbsFeedback}.
 *
 * @public
 */
interface ThumbsFeedbackCssClasses {
    thumbsFeedbackContainer?: string;
    thumbsUpIcon?: string;
    thumbsDownIcon?: string;
}
/**
 * Props for {@link ThumbsFeedback}.
 *
 * @public
 */
interface ThumbsFeedbackProps {
    /** A function which is called when a quality feedback button is clicked. */
    onClick: (feedbackType: FeedbackType) => void;
    /** Text to display alongside the quality feedback buttons. */
    feedbackText?: string;
    /** Text to display after a quality feedback button is clicked. */
    feedbackTextOnSubmission?: string;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ThumbsFeedbackCssClasses;
}
/**
 * Renders a quality feedback widget composed of thumbs up and thumbs down buttons.
 *
 * @public
 *
 * @param props - The configuration for the the feedback component.
 * @returns A React element for quality feedback widget.
 */
declare function ThumbsFeedback(props: ThumbsFeedbackProps): JSX.Element;

/**
 * Props for {@link UnknownFieldTypeDisplayComponent}.
 *
 * @public
 */
interface UnknownFieldTypeDisplayProps {
    result: UnknownFieldValueDirectAnswer;
}
/**
 * A React component interface to render results with "unknown" field type in field value direct answer.
 *
 * @public
 */
declare type UnknownFieldTypeDisplayComponent = (props: UnknownFieldTypeDisplayProps) => JSX.Element;
/**
 * Props for {@link DirectAnswer}.
 *
 * @public
 */
interface DirectAnswerProps {
    /** A component to handle rendering results with "unknown" field type in field value direct answer. */
    UnknownFieldTypeDisplay?: UnknownFieldTypeDisplayComponent;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: DirectAnswerCssClasses;
}
/**
 *  The CSS class interface for {@link DirectAnswer}.
 *
 * @public
 */
interface DirectAnswerCssClasses extends ThumbsFeedbackCssClasses {
    directAnswerContainer?: string;
    directAnswerLoading?: string;
    answer?: string;
    description?: string;
    content?: string;
    highlighted?: string;
    answerContainer?: string;
}
/**
 * Renders Direct Answers provided by the Search API.
 *
 * @public
 *
 * @param props - {@link DirectAnswerProps}
 * @returns A react element for DirectAnswer
 */
declare function DirectAnswer({ customCssClasses, UnknownFieldTypeDisplay }: DirectAnswerProps): JSX.Element | null;

/**
 * The CSS class interface for {@link FilterSearch}.
 *
 * @public
 */
interface FilterSearchCssClasses extends AutocompleteResultCssClasses {
    filterSearchContainer?: string;
    label?: string;
    inputElement?: string;
    sectionLabel?: string;
    focusedOption?: string;
    optionsContainer?: string;
}
/**
 * The parameters that are passed into {@link FilterSearchProps.onSelect}.
 *
 * @public
 */
interface OnSelectParams {
    /** The newly selected filter. */
    newFilter: FieldValueStaticFilter;
    /** The display name of the newly selected filter. */
    newDisplayName: string;
    /** The previously selected filter. */
    currentFilter: StaticFilter | undefined;
    /** A function that sets which filter the component is currently associated with. */
    setCurrentFilter: (filter: StaticFilter) => void;
    /**
     * A function that executes a filter search and updates the input and dropdown options
     * with the response.
     */
    executeFilterSearch: (query?: string) => Promise<FilterSearchResponse | undefined>;
}
/**
 * The props for the {@link FilterSearch} component.
 *
 * @public
 */
interface FilterSearchProps {
    /** An array of fieldApiName and entityType which indicates what to perform the filter search against. */
    searchFields: Omit<SearchParameterField, 'fetchEntities'>[];
    /** The display label for the component. */
    label?: string;
    /**
     * The search input's placeholder text when no text has been entered by the user.
     * Defaults to "Search here...".
     */
    placeholder?: string;
    /**
     * Whether to trigger a search when an option is selected. Defaults to false.
     *
     * @deprecated Use the `onSelect` prop instead.
     */
    searchOnSelect?: boolean;
    /** A function which is called when a filter is selected. */
    onSelect?: (params: OnSelectParams) => void;
    /** Determines whether or not the results of the filter search are separated by field. Defaults to false. */
    sectioned?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FilterSearchCssClasses;
}
/**
 * A component which allows a user to search for filters associated with specific entities and fields.
 *
 * @public
 *
 * @param props - {@link FilterSearchProps}
 * @returns A react component for Filter Search
 */
declare function FilterSearch({ searchFields, label, placeholder, searchOnSelect, onSelect, sectioned, customCssClasses }: FilterSearchProps): JSX.Element;

/**
 * The CSS class interface for the {@link LocationBias} component.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 */
interface LocationBiasCssClasses {
    locationBiasContainer?: string;
    location?: string;
    source?: string;
    button?: string;
    loadingIndicatorContainer?: string;
}
/**
 * The props for the {@link LocationBias} component.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 */
interface LocationBiasProps {
    /** Configuration used when collecting the user's location.
     * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
     */
    geolocationOptions?: PositionOptions;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: LocationBiasCssClasses;
}
/**
 * A React Component which displays and collects location information in order to bias searches.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 *
 * @param props - {@link LocationBiasProps}
 * @returns A react component for Location Bias
 */
declare function LocationBias({ geolocationOptions, customCssClasses }: LocationBiasProps): JSX.Element | null;

/**
 * The CSS class interface for the Geolocation component.
 *
 * @public
 */
interface GeolocationCssClasses {
    geolocationContainer?: string;
    button?: string;
    iconContainer?: string;
}
/**
 * The props for the Geolocation component.
 *
 * @public
 */
interface GeolocationProps {
    /**
     * Configuration used when collecting the user's location.
     * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
     */
    geolocationOptions?: PositionOptions;
    /**
     * The radius, in miles, around the user's location to find results. Defaults to 50.
     * If location accuracy is low, a larger radius may be used automatically.
     */
    radius?: number;
    /** The label for the button. Defaults to 'Use my location'. */
    label?: string;
    /** Custom icon component to display along with the button. */
    GeolocationIcon?: React.FunctionComponent;
    /**
     * A function which is called when the geolocation button is clicked,
     * after user's position is successfully determined.
     */
    handleClick?: (position: GeolocationPosition) => void;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: GeolocationCssClasses;
}
/**
 * A React Component which collects location information to create a
 * location filter and perform a new search.
 *
 * @public
 *
 * @param props - {@link GeolocationProps}
 * @returns A react component for geolocation
 */
declare function Geolocation({ geolocationOptions, radius, label, GeolocationIcon, handleClick, customCssClasses, }: GeolocationProps): JSX.Element | null;

/**
 * The CSS class interface used for {@link AppliedFilters}.
 *
 * @public
 */
interface AppliedFiltersCssClasses {
    appliedFiltersContainer?: string;
    appliedFiltersLoading?: string;
    nlpFilter?: string;
    removableFilter?: string;
    filterLabel?: string;
    clearAllButton?: string;
}
/**
 * Properties for {@link AppliedFilters}.
 *
 * @public
 */
interface AppliedFiltersProps {
    /** List of filters that should not be displayed. By default, builtin.entityType will be hidden. */
    hiddenFields?: string[];
    /** A set of facet fieldIds that should be interpreted as "hierarchical". */
    hierarchicalFacetsFieldIds?: string[];
    /** {@inheritDoc HierarchicalFacetsProps.delimiter} */
    hierarchicalFacetsDelimiter?: string;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: AppliedFiltersCssClasses;
}
/**
 * A component that displays a list of filters applied to the current vertical
 * search, which may include any selected options from facets, NLP filters, and
 * field value static filters.
 *
 * @public
 *
 * @param props - {@link AppliedFiltersProps}
 * @returns A React element for the applied filters
 */
declare function AppliedFilters(props: AppliedFiltersProps): JSX.Element;

/**
 * The CSS class interface used for the SectionHeader component.
 *
 * @public
 */
interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
    sectionHeaderContainer?: string;
    sectionHeaderIconContainer?: string;
    sectionHeaderLabel?: string;
    viewMoreContainer?: string;
    viewMoreLink?: string;
}

/**
 * The default type for "rawData" field of type Result.
 *
 * @public
 */
declare type DefaultRawDataType = Record<string, unknown>;

/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
interface CardProps<T = DefaultRawDataType> {
    /** The result data provided to the card for rendering. */
    result: Result<T>;
}
/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
declare type CardComponent<T = DefaultRawDataType> = (props: CardProps<T>) => JSX.Element;

/**
 * The configuration of a section template for a vertical's results on a universal page.
 *
 * @public
 */
interface SectionProps<T = DefaultRawDataType> {
    /** The results from this vertical. */
    results: Result<T>[];
    /** The key for the vertical. */
    verticalKey: string;
    /** A header to display above the results. */
    header?: JSX.Element;
    /** The card to use for this vertical. */
    CardComponent?: CardComponent<T>;
    /** Whether or not to allow more results to be viewed. */
    viewMore?: boolean;
}
/**
 * A component that can be used to render a section template for vertical results.
 *
 * @public
 */
declare type SectionComponent<T = DefaultRawDataType> = (props: SectionProps<T>) => JSX.Element | null;

/**
 * The configuration for a vertical.
 *
 * @public
 */
interface VerticalConfig<T = DefaultRawDataType> {
    /** {@inheritDoc SectionComponent} */
    SectionComponent?: SectionComponent<T>;
    /** The card to use for this vertical. */
    CardComponent?: CardComponent<T>;
    /** The label for the vertical. */
    label?: string;
    /** Whether or not this vertical should show a button to view all results on the vertical page. */
    viewAllButton?: boolean;
    /**
     * A function to provide user defined url path for each vertical's view all link.
     *
     * @remarks
     * Defaults to "/[verticalKey]?query=[query]"
     */
    getViewAllUrl?: (data: VerticalLink) => string;
}
/**
 * A map of verticalKey to a VerticalConfig.
 *
 * @public
 */
declare type VerticalConfigMap<T = Record<string, DefaultRawDataType>> = {
    [K in keyof T]: VerticalConfig<T[K]>;
};

/**
 * The CSS class interface used for {@link UniversalResults}.
 *
 * @public
 */
interface UniversalResultsCssClasses extends SectionHeaderCssClasses {
    universalResultsContainer?: string;
    universalResultsLoading?: string;
}
/**
 * Props for {@link UniversalResults}.
 *
 * @public
 */
interface UniversalResultsProps<T> {
    /** Whether or not to show the applied filters. */
    showAppliedFilters?: boolean;
    /** A mapping of verticalKey to the configuration for each vertical. */
    verticalConfigMap: VerticalConfigMap<T>;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: UniversalResultsCssClasses;
}
/**
 * Displays the results of a universal search with the results for each vertical separated
 * into sections.
 *
 * @public
 *
 * @param props - {@link UniversalResultsProps}
 * @returns A React element for the universal results, or null if there are none
 */
declare function UniversalResults<T>({ verticalConfigMap, showAppliedFilters, customCssClasses }: UniversalResultsProps<T>): JSX.Element | null;

/**
 * The CSS class interface used for {@link VerticalResults}.
 *
 * @public
 */
interface VerticalResultsCssClasses {
    verticalResultsContainer?: string;
    verticalResultsLoading?: string;
}
/**
 * Props for the VerticalResults component.
 *
 * @public
 */
interface VerticalResultsProps<T> {
    /** {@inheritDoc CardComponent} */
    CardComponent: CardComponent<T>;
    /**
     * Whether or not all results should be displayed when there are none returned from the search.
     * Defaults to true.
     */
    displayAllOnNoResults?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: VerticalResultsCssClasses;
}
/**
 * A component that renders search results for a vertical page.
 *
 * @public
 *
 * @param props - {@link VerticalResultsProps}
 * @returns A React element for the results, or null if no results should be displayed
 */
declare function VerticalResults<T>(props: VerticalResultsProps<T>): JSX.Element | null;

/**
 * Props for {@link Pagination} component
 *
 * @public
 */
interface PaginationProps {
    /**
     * Whether or not to paginate based on the total results count of
     * the vertical when there are none returned from the search.
     * Defaults to false.
     */
    paginateAllOnNoResults?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: PaginationCssClasses;
}
/**
 * The CSS classes used for pagination.
 *
 * @public
 */
interface PaginationCssClasses {
    paginationContainer?: string;
    paginationLoading?: string;
    label?: string;
    selectedLabel?: string;
    leftIconContainer?: string;
    rightIconContainer?: string;
    icon?: string;
}
/**
 * Renders a component that divide a series of vertical results into chunks
 * across multiple pages and enable user to navigate between those pages.
 *
 * @public
 */
declare function Pagination(props: PaginationProps): JSX.Element | null;

/**
 * The data used by the {@link StandardCard} and taken from the original Result.
 *
 * @public
 */
interface StandardCardData {
    /** The text to display in the card's header. */
    title: HighlightedValue | string;
    /** The content to display in the card's body. */
    description: HighlightedValue | string;
    /** CTA data to render. */
    cta1: CtaData;
    /** CTA data to render. */
    cta2: CtaData;
}
/**
 * The shape of a StandardCard CTA field's data.
 *
 * @public
 */
interface CtaData {
    /** The display label for the CTA element. */
    label: string;
    /** The CTA link source. */
    link: string;
    /** The CTA link type (e.g. URL, Phone, Email, Other). */
    linkType: string;
}
/**
 * Type guard for CtaData.
 *
 * @public
 *
 * @param data - the data to validate.
 * @returns whether the data is of type CtaData.
 */
declare function isCtaData(data: unknown): data is CtaData;

/**
 * The CSS class interface used for the StandardCardDisplay.
 *
 * @public
 */
interface StandardCardCssClasses extends ThumbsFeedbackCssClasses {
    container?: string;
    header?: string;
    body?: string;
    cta1?: string;
    cta2?: string;
    title?: string;
}

/**
 * Props for a StandardCard.
 *
 * @public
 */
interface StandardCardProps<T = DefaultRawDataType> extends CardProps<T> {
    /** Whether or not to show thumbs up/down buttons to provide feedback on the result card */
    showFeedbackButtons?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardCardCssClasses;
}
/**
 * This Component renders the base result card.
 *
 * @public
 *
 * @param props - An object containing the result itself and any additional information needed
 *                to render the card
 * @returns A React element for the result card
 */
declare function StandardCard(props: StandardCardProps<any>): JSX.Element;

/**
 * The CSS class interface used for {@link AlternativeVerticals}.
 *
 * @public
 */
interface AlternativeVerticalsCssClasses {
    alternativeVerticalsContainer?: string;
    alternativeVerticalsLoading?: string;
    noResultsText?: string;
    categoriesText?: string;
    suggestion?: string;
    verticalIcon?: string;
}
/**
 * A map of vertical keys to labels.
 *
 * @public
 */
interface VerticalLabelMap {
    /** Config mapped to a vertical. */
    [verticalKey: string]: Pick<VerticalConfig, 'label'>;
}
/**
 * Props for {@link AlternativeVerticals}.
 *
 * @public
 */
interface AlternativeVerticalsProps {
    /** The label for the current vertical. */
    currentVerticalLabel: string;
    /** A map of verticalKeys to the display label for that vertical. */
    verticalConfigMap: VerticalLabelMap;
    /**
     * Whether or not all results should be displayed when there are none returned from the search.
     * Defaults to true.
     */
    displayAllOnNoResults?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: AlternativeVerticalsCssClasses;
}
/**
 * A component that displays the alternative verticals that have results if a search returns none
 * on the current vertical.
 *
 * @public
 *
 * @param props - {@link AlternativeVerticalsProps}
 * @returns A React element for the alternative verticals, or null if there are none with results
 */
declare function AlternativeVerticals({ currentVerticalLabel, verticalConfigMap, displayAllOnNoResults, customCssClasses }: AlternativeVerticalsProps): JSX.Element | null;

/**
 *  The CSS class interface for {@link ResultsCount}.
 *
 * @public
 */
interface ResultsCountCssClasses {
    resultsCountContainer?: string;
    resultsCountLoading?: string;
}
/**
 * Props for {@link ResultsCount}.
 *
 * @public
 */
interface ResultsCountProps {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ResultsCountCssClasses;
}
/**
 * Renders results count of a universal/vertical search.
 *
 * @public
 *
 * @param props - {@link ResultsCountProps}
 */
declare function ResultsCount({ customCssClasses }: ResultsCountProps): JSX.Element | null;

/**
 * The configuration data for a field value filter option.
 *
 * @public
 */
interface FilterOptionConfig {
    /** The value used to perform filtering. */
    value: string | number | boolean | NumberRangeValue;
    /** The type of filtering operation used. Defaults to an equals comparison. */
    matcher?: Matcher;
    /** If this particular filter should be selected by default. */
    selectedByDefault?: boolean;
    /** The display name. Defaults to the value prop. */
    displayName?: string;
    /** The number of results associated with this filter. */
    resultsCount?: number;
}

/**
 * The CSS class interface for HierarchicalFacetDisplay.
 *
 * @public
 */
interface HierarchicalFacetDisplayCssClasses {
    treeContainer?: string;
    allCategoriesOption___active?: string;
    allCategoriesOption___inactive?: string;
    availableOption__active?: string;
    availableOption__inactive?: string;
    parentCategory?: string;
    currentCategory?: string;
    showMoreButton?: string;
}

/**
 * The CSS class interface for RangeInput.
 *
 * @public
 */
interface RangeInputCssClasses {
    rangeInputContainer?: string;
    input?: string;
    input___withPrefix?: string;
    input___withoutPrefix?: string;
    input___disabled?: string;
    input___enabled?: string;
    input___valid?: string;
    input___invalid?: string;
    inputContainer?: string;
    inputRowContainer?: string;
    buttonsContainer?: string;
    inputPrefix?: string;
    inputPrefix___disabled?: string;
    inputPrefix___enabled?: string;
    applyButton?: string;
    clearButton?: string;
    tooltipContainer?: string;
    tooltip?: string;
    invalidMessage?: string;
    invalidRowContainer?: string;
}

/**
 * The CSS class interface for FilterGroup.
 *
 * @public
 */
interface FilterGroupCssClasses {
    titleLabel?: string;
    searchInput?: string;
    optionsContainer?: string;
    option?: string;
    optionInput?: string;
    optionLabel?: string;
}
/**
 * Props for the FilterGroup component.
 *
 * @public
 */
interface FilterGroupProps {
    /** The fieldId corresponding to the filter group. */
    fieldId: string;
    /** {@inheritDoc FilterOptionConfig} */
    filterOptions: FilterOptionConfig[];
    /** The displayed label for the filter group. */
    title: string;
    /** Whether or not the filter is collapsible. Defaults to true. */
    collapsible?: boolean;
    /**
     * If the filter group is collapsible, whether or not it should start out
     * expanded. Defaults to true.
     */
    defaultExpanded?: boolean;
    /** Whether or not to display a text input to search for filter options. */
    searchable?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FilterGroupCssClasses;
    /** Limit on the number of options to be displayed. */
    showMoreLimit?: number;
}

/**
 * The CSS class interface for {@link StaticFilters}.
 *
 * @public
 */
interface StaticFiltersCssClasses extends FilterGroupCssClasses {
    staticFiltersContainer?: string;
}
/**
 * The configuration data for a field value static filter option.
 *
 * @public
 */
declare type StaticFilterOptionConfig = Omit<FilterOptionConfig, 'matcher' | 'value'> & {
    /** The value used to perform filtering. */
    value: string | number | boolean;
};
/**
 * Props for the {@link StaticFilters} component.
 *
 * @public
 */
interface StaticFiltersProps {
    /** The fieldId corresponding to the static filter group. */
    fieldId: string;
    /** {@inheritDoc StaticFilterOptionConfig} */
    filterOptions: StaticFilterOptionConfig[];
    /** The displayed label for the static filter group. */
    title: string;
    /** {@inheritDoc FilterGroupProps.collapsible} */
    collapsible?: boolean;
    /** {@inheritDoc FilterGroupProps.defaultExpanded} */
    defaultExpanded?: boolean;
    /** {@inheritDoc FilterGroupProps.searchable} */
    searchable?: boolean;
    /**
     * Whether or not a search is automatically run when a filter is selected.
     * Defaults to true.
     */
    searchOnChange?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StaticFiltersCssClasses;
}
/**
 * A component that displays a group of user-configured field value filters
 * that will be applied to the current vertical search.
 *
 * @param props - {@link StaticFiltersProps}
 * @returns A React component for field value static filters
 *
 * @public
 */
declare function StaticFilters(props: StaticFiltersProps): JSX.Element;

/**
 * The CSS class interface for {@link StandardFacets}.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
interface StandardFacetsCssClasses extends FilterGroupCssClasses {
    standardFacetsContainer?: string;
    divider?: string;
}
/**
 * Props for the {@link StandardFacets} component.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
interface StandardFacetsProps {
    /** {@inheritDoc FilterGroupProps.collapsible} */
    collapsible?: boolean;
    /** {@inheritDoc FilterGroupProps.defaultExpanded} */
    defaultExpanded?: boolean;
    /**
     * Whether or not a search is automatically run when a filter is selected.
     * Defaults to true.
     */
    searchOnChange?: boolean;
    /** List of filter ids that should not be displayed. */
    excludedFieldIds?: string[];
    /**
     * Whether or not to show the option counts for each filter.
     * Defaults to true.
     */
    showOptionCounts?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardFacetsCssClasses;
    /**
     * Limit on the number of options to be displayed.
     * Defaults to 10.
     */
    showMoreLimit?: number;
}
/**
 * A component that displays simple facets applicable to the current vertical search.
 *
 * @remarks
 * Numerical facets is not included. Hierachical facets will not be display in a
 * tree level structure. Use `excludedFieldIds` to exclude hierachical facets, if any,
 * when using this component.
 *
 * @param props - {@link StandardFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link Facets} instead.
 * @public
 */
declare function StandardFacets(props: StandardFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link HierarchicalFacets}.
 *
 * @public
 */
interface HierarchicalFacetsCssClasses extends HierarchicalFacetDisplayCssClasses {
    hierarchicalFacetsContainer?: string;
    divider?: string;
}
/**
 * Props for the {@link HierarchicalFacets} component.
 *
 * @deprecated Use {@link HierarchicalFacet} with {@link Facets} instead.
 * @public
 */
interface HierarchicalFacetsProps extends Omit<StandardFacetsProps, 'excludedFieldIds'> {
    /** List of filter ids to render as hierarchical facets. */
    includedFieldIds: string[];
    /** The delimiter for determining facet hierarchies, defaults to "\>". */
    delimiter?: string;
    /** The maximum number of options to render before displaying the "Show more/less" button. Defaults to 4. */
    showMoreLimit?: number;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: HierarchicalFacetsCssClasses;
}
/**
 * A component that displays hierarchical facets, in a tree level structure,
 * applicable to the current vertical search.
 *
 * @param props - {@link HierarchicalFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link HierarchicalFacet} with {@link Facets} instead.
 * @public
 */
declare function HierarchicalFacets({ searchOnChange, collapsible, defaultExpanded, includedFieldIds, customCssClasses, delimiter, showMoreLimit }: HierarchicalFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link NumericalFacets}.
 *
 * @public
 */
interface NumericalFacetsCssClasses extends FilterGroupCssClasses, RangeInputCssClasses {
    numericalFacetsContainer?: string;
    divider?: string;
}
/**
 * Props for the {@link NumericalFacets} component.
 *
 * @deprecated Use {@link NumericalFacet} with {@link Facets} instead.
 * @public
 */
interface NumericalFacetsProps extends Omit<StandardFacetsProps, 'excludedFieldIds'> {
    /** List of filter ids to render as numerical facets. */
    includedFieldIds?: string[];
    /**
     * Returns the filter's display name based on the range values which is used when the filter
     * is displayed by other components such as AppliedFilters.
     *
     * @remarks
     * By default, the displayName separates the range with a dash such as '10 - 20'.
     * If the range is unbounded, it will display as 'Up to 20' or 'Over 10'.
     */
    getFilterDisplayName?: (value: NumberRangeValue) => string;
    /**
     * An optional element which renders in front of the input text.
     */
    inputPrefix?: JSX.Element;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: NumericalFacetsCssClasses;
}
/**
 * A component that displays numerical facets applicable to the current vertical search.
 *
 * @param props - {@link NumericalFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link NumericalFacet} with {@link Facets} instead.
 * @public
 */
declare function NumericalFacets({ searchOnChange, includedFieldIds, getFilterDisplayName, inputPrefix, customCssClasses, ...filterGroupProps }: NumericalFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link Facets}. Any {@link FilterGroupCssClasses} props will be
 * overridden by the same props from customCssClasses on {@link StandardFacetProps},
 * {@link NumericalFacetProps}, or {@link HierarchicalFacetProps}.
 *
 * @public
 */
interface FacetsCssClasses extends FilterGroupCssClasses {
    facetsContainer?: string;
    divider?: string;
}
/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
interface FacetsProps {
    /** Whether or not a search is automatically run when a filter is selected. Defaults to true. */
    searchOnChange?: boolean;
    /** If set to true, only the facets specified in the children are rendered. If set to false, all
     * facets are rendered with the ones specified in the children overridden. Default to false. */
    onlyRenderChildren?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FacetsCssClasses;
    /** List of field ids that should not be displayed. */
    excludedFieldIds?: string[];
    /** List of field ids that should be rendered as hierarchical facets. */
    hierarchicalFieldIds?: string[];
    /** The custom facet components that will override the default rendering.
     *
     * @remarks
     * Supported components include {@link StandardFacet}, {@link NumericalFacet}.
     */
    children?: ReactElement[] | ReactElement | undefined | null;
}
/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
interface StandardFacetProps {
    /** The fieldId corresponding to the facet */
    fieldId: string;
    /** The label of the facet. Defaults to facet's displayName if not provided. */
    label?: string;
    /** A function to transform facet's options. */
    transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[];
    /** {@inheritDoc FilterGroupProps.collapsible} */
    collapsible?: boolean;
    /** {@inheritDoc FilterGroupProps.defaultExpanded} */
    defaultExpanded?: boolean;
    /** Whether or not to show the option counts for each filter. Defaults to true. */
    showOptionCounts?: boolean;
    /**
     * The maximum number of options to render before displaying the "Show more/less" button.
     * Defaults to 10.
     */
    showMoreLimit?: number;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FilterGroupCssClasses;
}
/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
interface NumericalFacetProps extends StandardFacetProps {
    /** Whether or not to show the option counts for each filter. Defaults to false. */
    showOptionCounts?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FilterGroupCssClasses & RangeInputCssClasses;
    /**
     * Returns the filter's display name based on the range values which is used when the filter
     * is displayed by other components such as AppliedFilters.
     *
     * @remarks
     * By default, the displayName separates the range with a dash such as '10 - 20'.
     * If the range is unbounded, it will display as 'Up to 20' or 'Over 10'.
     */
    getFilterDisplayName?: (value: NumberRangeValue) => string;
    /**
     * An optional element which renders in front of the input text.
     */
    inputPrefix?: JSX.Element;
}
/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
interface HierarchicalFacetCustomCssClasses extends HierarchicalFacetDisplayCssClasses {
    /** CSS classes for customizing the title label styling. */
    titleLabel?: string;
}
/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
interface HierarchicalFacetProps extends Omit<StandardFacetProps, 'transformOptions' | 'showOptionCounts'> {
    /**
     * A function to transform facet's options. The returned options need to be delimited to keep
     * the hierarchy.
     */
    transformOptions?: (options: DisplayableFacetOption[]) => DisplayableFacetOption[];
    /**
     * The maximum number of options to render before displaying the "Show more/less" button.
     * Defaults to 4.
     */
    showMoreLimit?: number;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: HierarchicalFacetCustomCssClasses;
    /** The delimiter for determining facet hierarchies, defaults to "\>". */
    delimiter?: string;
}
/**
 * Props for a single facet component.
 *
 * @public
 */
declare type FacetProps = StandardFacetProps | NumericalFacetProps | HierarchicalFacetProps;

/**
 * A component that displays all facets applicable to the current vertical search.
 *
 * @remarks
 * This component is a quick way of getting facets on the page, and it will render standard facets,
 * numerical facets, and hierarchical facets. The {@link StandardFacet}, {@link NumericalFacet},
 * and {@link HierarchicalFacet} components can be used to override the default facet configuration.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
declare function Facets(props: FacetsProps): JSX.Element;
/**
 * A component that displays a single standard facet. Use this to override the default rendering.
 *
 * @param props - {@link StandardFacetProps}
 * @returns ReactElement
 * @public
 */
declare function StandardFacet(props: StandardFacetProps): null;
/**
 * A component that displays a single numerical facet. Use this to override the default rendering.
 *
 * @param props - {@link NumericalFacetProps}
 * @returns ReactElement
 * @public
 */
declare function NumericalFacet(props: NumericalFacetProps): null;
/**
 * A component that displays a single hierarchical facet, in a tree level structure, applicable to
 * the current vertical search. Use this to override the default rendering.
 *
 * @param props - {@link HierarchicalFacetProps}
 * @returns ReactElement
 * @public
 */
declare function HierarchicalFacet(props: HierarchicalFacetProps): null;

/**
 * A divider component used to separate NumericalFacets, HierarchicalFacets, StandardFacets,
 * and StaticFilters.
 *
 * @param props - A customizable className for filter divider
 * @returns A React component for filter divider
 *
 * @public
 */
declare function FilterDivider({ className }: {
    className?: string;
}): JSX.Element;

/**
 * Props for {@link ApplyFiltersButton}
 *
 * @public
 */
interface ApplyFiltersButtonProps {
    /** The label for the button, defaults to 'Apply Filters' */
    label?: string;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ApplyFiltersButtonCssClasses;
}
/**
 * The CSS class interface for {@link ApplyFiltersButtonProps}.
 *
 * @public
 */
interface ApplyFiltersButtonCssClasses {
    button?: string;
}
/**
 * Runs a vertical search.
 * By default has `position: sticky` styling that anchors it to the bottom of the page.
 *
 * @remarks
 * This is intended to be used when `searchOnChange` field is set to false on all
 * the Facets/StaticFilters components.
 *
 * @public
 */
declare function ApplyFiltersButton({ customCssClasses, label }: ApplyFiltersButtonProps): JSX.Element;

/**
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
declare type PinComponent<T> = (props: {
    index: number;
    mapbox: mapboxgl.Map;
    result: Result<T>;
}) => JSX.Element;
/**
 * A function use to derive a result's coordinate.
 *
 * @public
 */
declare type CoordinateGetter<T> = (result: Result<T>) => Coordinate | undefined;
/**
 * Coordinate use to represent the result's location on a map.
 *
 * @public
 */
interface Coordinate {
    /** The latitude of the location. */
    latitude: number;
    /** The longitude of the location. */
    longitude: number;
}
/**
 * A function which is called when user drag the map.
 *
 * @public
 */
declare type OnDragHandler = (center: mapboxgl.LngLat, bounds: mapboxgl.LngLatBounds) => void;
/**
 * Props for the {@link MapboxMap} component.
 * The type param "T" represents the type of "rawData" field of the results use in the map.
 *
 * @public
 */
interface MapboxMapProps<T> {
    /** Mapbox access token. */
    mapboxAccessToken: string;
    /** Interface for map customization derived from Mapbox GL's Map options. */
    mapboxOptions?: Omit<mapboxgl.MapboxOptions, 'container'>;
    /**
     * Custom Pin component to render for markers on the map.
     * By default, the built-in marker image from Mapbox GL is used.
     */
    PinComponent?: PinComponent<T>;
    /**
     * A function to derive a result's coordinate for the corresponding marker's location on the map.
     * By default, "yextDisplayCoordinate" field is used as the result's display coordinate.
     */
    getCoordinate?: CoordinateGetter<T>;
    /** {@inheritDoc OnDragHandler} */
    onDrag?: OnDragHandler;
}
/**
 * A component that renders a map with markers to show result locations using Mapbox GL.
 *
 * @remarks
 * For the map to work properly, be sure to include Mapbox GL stylesheet in the application.
 *
 * @example
 * For instance, user may add the following import statement in their application's index file
 * or in the file where `MapboxMap` is used:
 * `import 'mapbox-gl/dist/mapbox-gl.css';`
 *
 * Or, user may add a stylesheet link in their html page:
 * `<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />`
 *
 * @param props - {@link MapboxMapProps}
 * @returns A React element containing a Mapbox Map
 *
 * @public
 */
declare function MapboxMap<T>({ mapboxAccessToken, mapboxOptions, PinComponent, getCoordinate, onDrag }: MapboxMapProps<T>): JSX.Element;

/**
 * The CSS class interface for {@link renderHighlightedValue}.
 *
 * @public
 */
interface HighlightedValueCssClasses {
    highlighted?: string;
    nonHighlighted?: string;
}
/**
 * Renders a HighlightedValue with highlighting based on its matchedSubstrings.
 * @returns JSX.Element
 *
 * @public
 *
 * @param highlightedValueOrString - the text to add highlight to.
 * @param customCssClasses - css classes use for the non-highlighted and highlighted text.
 */
declare function renderHighlightedValue(highlightedValueOrString: Partial<HighlightedValue> | string, customCssClasses?: HighlightedValueCssClasses): JSX.Element;

/**
 * The CSS class interface used for {@link StandardSection}.
 *
 * @public
 */
interface StandardSectionCssClasses extends VerticalResultsCssClasses {
    section?: string;
}
/**
 * The configuration for a StandardSection.
 *
 * @public
 */
interface StandardSectionProps<T = DefaultRawDataType> extends SectionProps<T> {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardSectionCssClasses;
}
/**
 * A component that displays all the results for a vertical using a standard section template.
 *
 * @public
 *
 * @param props - {@link StandardSectionProps}
 * @returns A React element for a standard section, or null if there are no results to display
 */
declare function StandardSection<T>(props: StandardSectionProps<T>): JSX.Element | null;

/**
 * A higher-order component which provides analytics for its children.
 *
 * @public
 *
 * @param props - The configuration for the analytics service
 * @returns A React element that provides analytics context
 */
declare function AnalyticsProvider(props: PropsWithChildren<AnalyticsConfig>): JSX.Element;

/**
 * Returns a service that can be used to report analytics events.
 *
 * @public
 */
declare function useAnalytics(): AnalyticsService | null;

/**
 * Analytics event types for cta click and title click.
 *
 * @public
 */
declare type CardCtaEventType = 'CTA_CLICK' | 'TITLE_CLICK';
/**
 * The data types use to construct the payload in the analytics event.
 *
 * @public
 */
declare type CardAnalyticsDataType<T = DefaultRawDataType> = DirectAnswer$1 | Result<T>;
/**
 * Analytics event types for interactions on a card.
 *
 * @public
 */
declare type CardAnalyticsType = CardCtaEventType | FeedbackType;

/**
 * Creates a memoized function for reporting card analytics.
 *
 * @public
 *
 * @param result - result that contains data use in the card analytics event.
 * @param analyticsType - the card analytics event type to report.
 */
declare function useCardAnalyticsCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>, analyticsType: CardAnalyticsType): () => void;

/**
 * Creates a memoized function for reporting card feedback analytics.
 *
 * @public
 *
 * @param result - card result that contains data use in the feedback analytics event.
 */
declare function useCardFeedbackCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>): (analyticsType: FeedbackType) => void;

/**
 * useComposedCssClasses merges a component's built-in tailwind classes with custom tailwind classes.
 *
 * @remarks
 * Tailwind classes will be merged without conflict, with custom classes having higher priority
 * than built-in ones.
 *
 * @example
 * Suppose a component has built-in classes of `{ container: 'px-4 text-slate-700' }`.
 *
 * Passing in the custom classes:
 *
 * ```ts
 * { container: 'text-red-200 mb-3' }
 * ```
 *
 * results in the merged classes of:
 *
 * ```ts
 * { container: 'px-4 text-red-200 mb-3' }
 * ```
 *
 * @public
 *
 * @param builtInClasses - The component's built-in tailwind classes
 * @param customClasses - The custom tailwind classes to merge with the built-in ones
 * @returns The composed CSS classes
 */
declare function useComposedCssClasses<ClassInterface extends Partial<Record<keyof ClassInterface & string, string>>>(builtInClasses: Readonly<ClassInterface>, customClasses?: Partial<ClassInterface>): ClassInterface;

/**
 * Executes a universal/vertical search.
 *
 * @public
 */
declare function executeSearch(searchActions: SearchActions): Promise<void>;
/**
 * Executes a universal/vertical autocomplete search and return the corresponding response.
 *
 * @public
 */
declare function executeAutocomplete(searchActions: SearchActions): Promise<AutocompleteResponse | undefined>;
/**
 * Get search intents of the current query stored in headless using autocomplete request.
 *
 * @public
 */
declare function getSearchIntents(searchActions: SearchActions): Promise<SearchIntent[] | undefined>;

/**
 * If the provided search intents include a 'NEAR_ME' intent and there's no existing
 * user's location in state, retrieve and store user's location in headless state.
 *
 * @public
 */
declare function updateLocationIfNeeded(searchActions: SearchActions, intents: SearchIntent[], geolocationOptions?: PositionOptions): Promise<void>;
/**
 * Retrieves user's location using navigator.geolocation API.
 *
 * @public
 */
declare function getUserLocation(geolocationOptions?: PositionOptions): Promise<GeolocationPosition>;

/**
 * Content path to the source files in component library that utilizes Tailwind class names.
 * This is intended to be used in user's custom tailwind config.
 *
 * @public
 *
 * @remarks
 * This assumes that the node_modules folder containing the component library
 * is in adjacent level with the user's tailwind.config.js file.
 *
 * @example
 * In user's tailwind.config.js file:
 *
 * ```js
 * const { ComponentsContentPath } = require('@yext/search-ui-react');
 *
 * module.exports = {
 *  content: [ ComponentsContentPath ],
 *  // ... the rest of your tailwind config
 * };
 * ```
 */
declare const ComponentsContentPath = "node_modules/@yext/search-ui-react/lib/**/*.{js,jsx}";

export { AlternativeVerticals, AlternativeVerticalsCssClasses, AlternativeVerticalsProps, AnalyticsProvider, AppliedFilters, AppliedFiltersCssClasses, AppliedFiltersProps, ApplyFiltersButton, ApplyFiltersButtonCssClasses, ApplyFiltersButtonProps, AutocompleteResultCssClasses, CardAnalyticsDataType, CardAnalyticsType, CardComponent, CardCtaEventType, CardProps, ComponentsContentPath, Coordinate, CoordinateGetter, CtaData, DefaultRawDataType, DirectAnswer, DirectAnswerCssClasses, DirectAnswerProps, DropdownItem, DropdownItemProps, FacetProps, Facets, FacetsCssClasses, FacetsProps, FeedbackType, FilterDivider, FilterGroupCssClasses, FilterGroupProps, FilterOptionConfig, FilterSearch, FilterSearchCssClasses, FilterSearchProps, FocusedItemData, Geolocation, GeolocationCssClasses, GeolocationProps, HierarchicalFacet, HierarchicalFacetDisplayCssClasses, HierarchicalFacetProps, HierarchicalFacets, HierarchicalFacetsCssClasses, HierarchicalFacetsProps, HighlightedValueCssClasses, LocationBias, LocationBiasCssClasses, LocationBiasProps, MapboxMap, MapboxMapProps, NumericalFacet, NumericalFacetProps, NumericalFacets, NumericalFacetsCssClasses, NumericalFacetsProps, OnDragHandler, OnSelectParams, Pagination, PaginationCssClasses, PaginationProps, PinComponent, RangeInputCssClasses, RenderEntityPreviews, ResultsCount, ResultsCountCssClasses, ResultsCountProps, SearchBar, SearchBarCssClasses, SearchBarProps, SectionComponent, SectionHeaderCssClasses, SectionProps, SpellCheck, SpellCheckCssClasses, SpellCheckProps, StandardCard, StandardCardCssClasses, StandardCardData, StandardCardProps, StandardFacet, StandardFacetProps, StandardFacets, StandardFacetsCssClasses, StandardFacetsProps, StandardSection, StandardSectionCssClasses, StandardSectionProps, StaticFilterOptionConfig, StaticFilters, StaticFiltersCssClasses, StaticFiltersProps, ThumbsFeedback, ThumbsFeedbackCssClasses, ThumbsFeedbackProps, UniversalResults, UniversalResultsCssClasses, UniversalResultsProps, UnknownFieldTypeDisplayComponent, UnknownFieldTypeDisplayProps, VerticalConfig, VerticalConfigMap, VerticalLabelMap, VerticalLink, VerticalResults, VerticalResultsCssClasses, VerticalResultsProps, VisualAutocompleteConfig, executeAutocomplete, executeSearch, getSearchIntents, getUserLocation, isCtaData, onSearchFunc, renderHighlightedValue, updateLocationIfNeeded, useAnalytics, useCardAnalyticsCallback, useCardFeedbackCallback, useComposedCssClasses };
