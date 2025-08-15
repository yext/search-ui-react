import { AnalyticsConfig } from '@yext/analytics';
import { AnalyticsService } from '@yext/analytics';
import { AutocompleteResponse } from '@yext/search-headless-react';
import { DirectAnswer as DirectAnswer_2 } from '@yext/search-headless-react';
import { DisplayableFacetOption } from '@yext/search-headless-react';
import { FieldValueStaticFilter } from '@yext/search-headless-react';
import { FilterSearchResponse } from '@yext/search-headless-react';
import { GenerativeDirectAnswerResponse } from '@yext/search-headless-react';
import { HighlightedValue } from '@yext/search-headless-react';
import * as i18next from 'i18next';
import { default as mapboxgl_2 } from 'mapbox-gl';
import { MarkerOptions } from 'mapbox-gl';
import { Matcher } from '@yext/search-headless-react';
import { NumberRangeValue } from '@yext/search-headless-react';
import { PropsWithChildren } from 'react';
import { QuerySource } from '@yext/search-headless-react';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { Result } from '@yext/search-headless-react';
import { SearchActions } from '@yext/search-headless-react';
import { SearchHeadless } from '@yext/search-headless-react';
import { SearchIntent } from '@yext/search-headless-react';
import { SearchParameterField } from '@yext/search-headless-react';
import { StaticFilter } from '@yext/search-headless-react';
import { UniversalLimit } from '@yext/search-headless-react';
import { UnknownFieldValueDirectAnswer } from '@yext/search-headless-react';
import { VerticalResults as VerticalResults_2 } from '@yext/search-headless-react';

/**
 * The parameters that are passed into {@link FilterSearchProps.afterDropdownInputFocus}.
 *
 * @public
 */
export declare interface AfterDropdownInputFocusProps {
    /** The input element's value. */
    value: string;
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
export declare function AlternativeVerticals({ currentVerticalLabel, verticalConfigMap, displayAllOnNoResults, customCssClasses }: AlternativeVerticalsProps): JSX.Element | null;

/**
 * The CSS class interface used for {@link AlternativeVerticals}.
 *
 * @public
 */
export declare interface AlternativeVerticalsCssClasses {
    alternativeVerticalsContainer?: string;
    alternativeVerticalsLoading?: string;
    noResultsText?: string;
    categoriesText?: string;
    suggestion?: string;
    verticalIcon?: string;
}

/**
 * Props for {@link AlternativeVerticals}.
 *
 * @public
 */
export declare interface AlternativeVerticalsProps {
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
 * A higher-order component which provides analytics for its children.
 *
 * @public
 *
 * @param props - The configuration for the analytics service
 * @returns A React element that provides analytics context
 */
export declare function AnalyticsProvider(props: PropsWithChildren<AnalyticsConfig>): JSX.Element;

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
export declare function AppliedFilters(props: AppliedFiltersProps): JSX.Element;

/**
 * The CSS class interface used for {@link AppliedFilters}.
 *
 * @public
 */
export declare interface AppliedFiltersCssClasses {
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
export declare interface AppliedFiltersProps {
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
 * Runs a vertical search.
 * By default has `position: sticky` styling that anchors it to the bottom of the page.
 *
 * @remarks
 * This is intended to be used when `searchOnChange` field is set to false on all
 * the Facets/StaticFilters components.
 *
 * @public
 */
export declare function ApplyFiltersButton({ customCssClasses, label }: ApplyFiltersButtonProps): JSX.Element;

/**
 * The CSS class interface for {@link ApplyFiltersButtonProps}.
 *
 * @public
 */
export declare interface ApplyFiltersButtonCssClasses {
    button?: string;
}

/**
 * Props for {@link ApplyFiltersButton}
 *
 * @public
 */
export declare interface ApplyFiltersButtonProps {
    /** The label for the button, defaults to 'Apply Filters' */
    label?: string;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ApplyFiltersButtonCssClasses;
}

/**
 * The CSS class interface for the Autocomplete Result.
 *
 * @public
 */
export declare interface AutocompleteResultCssClasses {
    option?: string;
    icon?: string;
    highlighted?: string;
    nonHighlighted?: string;
}

/**
 * The data types use to construct the payload in the analytics event.
 *
 * @public
 */
export declare type CardAnalyticsDataType<T = DefaultRawDataType> = DirectAnswer_2 | Result<T> | GdaClickEventData;

/**
 * Analytics event types for interactions on a card.
 *
 * @public
 */
export declare type CardAnalyticsType = CardCtaEventType | FeedbackType;

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export declare type CardComponent<T = DefaultRawDataType> = (props: CardProps<T>) => JSX.Element;

/**
 * Analytics event types for cta click, title click, and citation click.
 *
 * @public
 */
export declare type CardCtaEventType = 'CTA_CLICK' | 'TITLE_CLICK' | 'CITATION_CLICK' | 'DRIVING_DIRECTIONS' | 'VIEW_WEBSITE' | 'TAP_TO_CALL';

/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export declare interface CardProps<T = DefaultRawDataType> {
    /** The result data provided to the card for rendering. */
    result: Result<T>;
}

/**
 * Props for citation card.
 *
 * @public
 */
export declare interface CitationProps {
    searchResult: Result;
    cssClasses: GenerativeDirectAnswerCssClasses;
    citationClickHandler?: (data: GdaClickEventData) => void;
}

/**
 * Props for citations component.
 *
 * @public
 */
export declare interface CitationsProps {
    /** Response object containing generative direct answer info. */
    gdaResponse: GenerativeDirectAnswerResponse;
    /** CSS classes for customizing the component styling. */
    cssClasses: GenerativeDirectAnswerCssClasses;
    /** Returned results relevant to the users' query to be used in Citations. */
    searchResults: Result[];
    /** The header for the citations section generative direct answer. */
    citationsHeader?: string | JSX.Element;
    /** The component for citation card */
    CitationCard?: (props: CitationProps) => JSX.Element | null;
    /** Handle onClick event for citation link. */
    citationClickHandler?: (data: GdaClickEventData) => void;
}

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
export declare const ComponentsContentPath = "node_modules/@yext/search-ui-react/lib/**/*.{js,jsx}";

/**
 * Coordinate use to represent the result's location on a map.
 *
 * @public
 */
export declare interface Coordinate {
    /** The latitude of the location. */
    latitude: number;
    /** The longitude of the location. */
    longitude: number;
}

/**
 * A function use to derive a result's coordinate.
 *
 * @public
 */
export declare type CoordinateGetter<T> = (result: Result<T>) => Coordinate | undefined;

/**
 * The shape of a StandardCard CTA field's data.
 *
 * @public
 */
export declare interface CtaData {
    /** The display label for the CTA element. */
    label: string;
    /** The CTA link source. */
    link: string;
    /** The CTA link type (e.g. URL, Phone, Email, Other). */
    linkType: string;
}

/**
 * The default type for "rawData" field of type Result.
 *
 * @public
 */
export declare type DefaultRawDataType = Record<string, unknown>;

/**
 * Renders Direct Answers provided by the Search API.
 *
 * @public
 *
 * @param props - {@link DirectAnswerProps}
 * @returns A react element for DirectAnswer
 */
export declare function DirectAnswer({ customCssClasses, UnknownFieldTypeDisplay }: DirectAnswerProps): JSX.Element | null;

/**
 *  The CSS class interface for {@link DirectAnswer}.
 *
 * @public
 */
export declare interface DirectAnswerCssClasses extends ThumbsFeedbackCssClasses {
    directAnswerContainer?: string;
    directAnswerLoading?: string;
    answer?: string;
    description?: string;
    content?: string;
    highlighted?: string;
    answerContainer?: string;
}

/**
 * Props for {@link DirectAnswer}.
 *
 * @public
 */
export declare interface DirectAnswerProps {
    /** A component to handle rendering results with "unknown" field type in field value direct answer. */
    UnknownFieldTypeDisplay?: UnknownFieldTypeDisplayComponent;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: DirectAnswerCssClasses;
}

/**
 * A wrapper component for specifying a DropdownItemWithIndex.
 * The index will be automatically provided by the Dropdown component instance.
 *
 * @public
 */
export declare function DropdownItem(_props: DropdownItemProps): JSX.Element | null;

/**
 * Props for the {@link DropdownItem}.
 *
 * @public
 */
export declare type DropdownItemProps = PropsWithChildren<{
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
    ariaLabel?: (value: string) => string;
}>;

/**
 * Executes a universal/vertical autocomplete search and return the corresponding response.
 *
 * @public
 */
export declare function executeAutocomplete(searchActions: SearchActions): Promise<AutocompleteResponse | undefined>;

/**
 * Executes a generative direct answer and return the corresponding response.
 *
 * @public
 */
export declare function executeGenerativeDirectAnswer(searchActions: SearchActions): Promise<GenerativeDirectAnswerResponse | undefined>;

/**
 * Executes a universal/vertical search.
 *
 * @public
 */
export declare function executeSearch(searchActions: SearchActions): Promise<void>;

/**
 * Props for a single facet component.
 *
 * @public
 */
export declare type FacetProps = StandardFacetProps | NumericalFacetProps | HierarchicalFacetProps;

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
export declare function Facets(props: FacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link Facets}. Any {@link FilterGroupCssClasses} props will be
 * overridden by the same props from customCssClasses on {@link StandardFacetProps},
 * {@link NumericalFacetProps}, or {@link HierarchicalFacetProps}.
 *
 * @public
 */
export declare interface FacetsCssClasses extends FilterGroupCssClasses {
    facetsContainer?: string;
    divider?: string;
}

/**
 * Props for the {@link Facets} component.
 *
 * @public
 */
export declare interface FacetsProps {
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
 * Analytics event types for quality feedback.
 *
 * @public
 */
export declare type FeedbackType = 'THUMBS_UP' | 'THUMBS_DOWN';

/**
 * A divider component used to separate NumericalFacets, HierarchicalFacets, StandardFacets,
 * and StaticFilters.
 *
 * @param props - A customizable className for filter divider
 * @returns A React component for filter divider
 *
 * @public
 */
export declare function FilterDivider({ className }: {
    className?: string;
}): JSX.Element;

/**
 * The CSS class interface for FilterGroup.
 *
 * @public
 */
export declare interface FilterGroupCssClasses {
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
export declare interface FilterGroupProps {
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
 * The configuration data for a field value filter option.
 *
 * @public
 */
export declare interface FilterOptionConfig {
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
 * A component which allows a user to search for filters associated with specific entities and fields.
 *
 * @public
 *
 * @param props - {@link FilterSearchProps}
 * @returns A react component for Filter Search
 */
export declare function FilterSearch({ searchFields, label, placeholder, searchOnSelect, onSelect, onDropdownInputChange, afterDropdownInputFocus, sectioned, customCssClasses, disableBuiltInClasses, ariaLabel, showCurrentLocationButton, geolocationProps }: FilterSearchProps): JSX.Element;

/**
 * The CSS class interface for {@link FilterSearch}.
 *
 * @public
 */
export declare interface FilterSearchCssClasses extends AutocompleteResultCssClasses {
    filterSearchContainer?: string;
    label?: string;
    inputElement?: string;
    sectionLabel?: string;
    focusedOption?: string;
    optionsContainer?: string;
    currentLocationButton?: string;
    currentLocationAndInputContainer?: string;
}

/**
 * The props for the {@link FilterSearch} component.
 *
 * @public
 */
export declare interface FilterSearchProps {
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
    /** A function which is called when the input element's value changes. Replaces the default behavior. */
    onDropdownInputChange?: (params: OnDropdownInputChangeProps) => void;
    /** A function which is called immediately after the input gains focus. It does not replace the default focus behavior. */
    afterDropdownInputFocus?: (params: AfterDropdownInputFocusProps) => void;
    /** Determines whether or not the results of the filter search are separated by field. Defaults to false. */
    sectioned?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: FilterSearchCssClasses;
    /** Whether to disable the default CSS classes entirely  */
    disableBuiltInClasses?: boolean;
    /** The accessible label for the dropdown input. */
    ariaLabel?: string;
    /** Whether to include a button to search on the user's location. Defaults to false. */
    showCurrentLocationButton?: boolean;
    /** The props for the geolocation component, if the current location button is enabled. */
    geolocationProps?: GeolocationProps;
}

/**
 * The data associated with the currently focused item.
 *
 * @public
 */
export declare type FocusedItemData = Record<string, unknown>;

/**
 * Payload for click events fired on a generative direct answer card.
 *
 * @public
 */
export declare interface GdaClickEventData {
    searchResult?: Result;
    destinationUrl: string;
}

/**
 * Displays the AI generated answer of a generative direct answer.
 *
 * @public
 *
 * @param props - {@link GenerativeDirectAnswerProps}
 * @returns A React element for the generative direct answer, or null if there is no generated answer
 */
export declare function GenerativeDirectAnswer({ customCssClasses, answerHeader, citationsHeader, CitationCard, CitationsContainer, }: GenerativeDirectAnswerProps): JSX.Element | null;

/**
 * The CSS class interface used for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export declare interface GenerativeDirectAnswerCssClasses {
    container?: string;
    header?: string;
    answerText?: string;
    divider?: string;
    citationsContainer?: string;
    citation?: string;
    citationTitle?: string;
    citationSnippet?: string;
}

/**
 * Props for {@link GenerativeDirectAnswer}.
 *
 * @public
 */
export declare interface GenerativeDirectAnswerProps {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: GenerativeDirectAnswerCssClasses;
    /** The header for the answer section of the generative direct answer. */
    answerHeader?: string | JSX.Element;
    /** The header for the citations section of the generative direct answer. */
    citationsHeader?: string | JSX.Element;
    /**
     * The citations container component for customizing the logic that determines which results can be rendered.
     * By default, a section for citations is displayed if the results that correspond to the
     * citations have the default minimum required info, which is `rawData.uid` and `rawData.name`.
     */
    CitationsContainer?: (props: CitationsProps) => JSX.Element | null;
    /** The citation card component for customizing how each citation is displayed. */
    CitationCard?: (props: CitationProps) => JSX.Element | null;
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
declare function Geolocation_2({ geolocationOptions, radius, label, GeolocationIcon, handleClick, customCssClasses, useIconAsButton, disableBuiltInClasses }: GeolocationProps): JSX.Element | null;
export { Geolocation_2 as Geolocation }

/**
 * The CSS class interface for the Geolocation component.
 *
 * @public
 */
export declare interface GeolocationCssClasses {
    geolocationContainer?: string;
    button?: string;
    iconContainer?: string;
}

/**
 * The props for the Geolocation component.
 *
 * @public
 */
export declare interface GeolocationProps {
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
    GeolocationIcon?: React_2.FunctionComponent;
    /**
     * A function which is called when the geolocation button is clicked,
     * after user's position is successfully determined.
     */
    handleClick?: (position: GeolocationPosition) => void;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: GeolocationCssClasses;
    /** Whether to use the icon as a button, rather than the label. */
    useIconAsButton?: boolean;
    /** Whether to disable built-in classes and use only custom classes. */
    disableBuiltInClasses?: boolean;
}

/**
 * Get search intents of the current query stored in headless using autocomplete request.
 *
 * @public
 */
export declare function getSearchIntents(searchActions: SearchActions): Promise<SearchIntent[] | undefined>;

/**
 * Retrieves user's location using navigator.geolocation API.
 *
 * @public
 */
export declare function getUserLocation(geolocationOptions?: PositionOptions): Promise<GeolocationPosition>;

/**
 * A component that displays a single hierarchical facet, in a tree level structure, applicable to
 * the current vertical search. Use this to override the default rendering.
 *
 * @param props - {@link HierarchicalFacetProps}
 * @returns ReactElement
 * @public
 */
export declare function HierarchicalFacet(props: HierarchicalFacetProps): null;

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
declare interface HierarchicalFacetCustomCssClasses extends HierarchicalFacetDisplayCssClasses {
    /** CSS classes for customizing the title label styling. */
    titleLabel?: string;
}

/**
 * The CSS class interface for HierarchicalFacetDisplay.
 *
 * @public
 */
export declare interface HierarchicalFacetDisplayCssClasses {
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
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export declare interface HierarchicalFacetProps extends Omit<StandardFacetProps, 'transformOptions' | 'showOptionCounts'> {
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
 * A component that displays hierarchical facets, in a tree level structure,
 * applicable to the current vertical search.
 *
 * @param props - {@link HierarchicalFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link HierarchicalFacet} with {@link Facets} instead.
 * @public
 */
export declare function HierarchicalFacets({ searchOnChange, collapsible, defaultExpanded, includedFieldIds, customCssClasses, delimiter, showMoreLimit }: HierarchicalFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link HierarchicalFacets}.
 *
 * @public
 */
export declare interface HierarchicalFacetsCssClasses extends HierarchicalFacetDisplayCssClasses {
    hierarchicalFacetsContainer?: string;
    divider?: string;
}

/**
 * Props for the {@link HierarchicalFacets} component.
 *
 * @deprecated Use {@link HierarchicalFacet} with {@link Facets} instead.
 * @public
 */
export declare interface HierarchicalFacetsProps extends Omit<StandardFacetsProps, 'excludedFieldIds'> {
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
 * The CSS class interface for {@link renderHighlightedValue}.
 *
 * @public
 */
export declare interface HighlightedValueCssClasses {
    highlighted?: string;
    nonHighlighted?: string;
}

/* Excluded from this release type: i18nInstance */

/**
 * Type guard for CtaData.
 *
 * @public
 *
 * @param data - the data to validate.
 * @returns whether the data is of type CtaData.
 */
export declare function isCtaData(data: unknown): data is CtaData;

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
export declare function LocationBias({ geolocationOptions, customCssClasses }: LocationBiasProps): JSX.Element | null;

/**
 * The CSS class interface for the {@link LocationBias} component.
 *
 * @public
 *
 * @deprecated LocationBias component has been superseded by Geolocation component.
 */
export declare interface LocationBiasCssClasses {
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
export declare interface LocationBiasProps {
    /** Configuration used when collecting the user's location.
     * Definition: {@link https://w3c.github.io/geolocation-api/#position_options_interface}.
     */
    geolocationOptions?: PositionOptions;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: LocationBiasCssClasses;
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
export declare function MapboxMap<T>({ mapboxAccessToken, mapboxOptions, PinComponent, renderPin, getCoordinate, onDrag, iframeWindow, allowUpdates, onPinClick, markerOptionsOverride, }: MapboxMapProps<T>): JSX.Element;

/**
 * Props for the {@link MapboxMap} component.
 * The type param "T" represents the type of "rawData" field of the results use in the map.
 *
 * @public
 */
export declare interface MapboxMapProps<T> {
    /** Mapbox access token. */
    mapboxAccessToken: string;
    /** Interface for map customization derived from Mapbox GL's Map options. */
    mapboxOptions?: Omit<mapboxgl_2.MapboxOptions, 'container'>;
    /**
     * Custom Pin component to render for markers on the map.
     * By default, the built-in marker image from Mapbox GL is used.
     * This prop should not be used with
     * {@link MapboxMapProps.renderPin | renderPin}. If both are provided,
     * only PinComponent will be used.
     */
    PinComponent?: PinComponent<T>;
    /**
     * Render function for a custom marker on the map. This function takes in an
     * HTML element and is responible for rendering the pin into that element,
     * which will be used as the marker.
     * By default, the built-in marker image from Mapbox GL is used.
     * This prop should not be used with
     * {@link MapboxMapProps.PinComponent | PinComponent}. If both are provided,
     * only PinComponent will be used.
     */
    renderPin?: (props: PinComponentProps<T> & {
        container: HTMLElement;
    }) => void;
    /**
     * A function to derive a result's coordinate for the corresponding marker's location on the map.
     * By default, "yextDisplayCoordinate" field is used as the result's display coordinate.
     */
    getCoordinate?: CoordinateGetter<T>;
    /** {@inheritDoc OnDragHandler} */
    onDrag?: OnDragHandler;
    /**
     * The window object of the iframe where the map should rendered. Must have mapboxgl loaded.
     * If not provided or mapboxgl not loaded, the map will be rendered in the parent window.
     */
    iframeWindow?: Window;
    /**
     * If set to true, the map will update its options when the mapboxOptions prop changes.
     * Otherwise, the map will not update its options once initially set.
     */
    allowUpdates?: boolean;
    /** A function that handles a pin click event. */
    onPinClick?: (result: Result<T> | undefined) => void;
    /** The options to apply to the map markers based on whether it is selected. */
    markerOptionsOverride?: (selected: boolean) => MarkerOptions;
}

/**
 * A component that displays a single numerical facet. Use this to override the default rendering.
 *
 * @param props - {@link NumericalFacetProps}
 * @returns ReactElement
 * @public
 */
export declare function NumericalFacet(props: NumericalFacetProps): null;

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export declare interface NumericalFacetProps extends StandardFacetProps {
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
 * A component that displays numerical facets applicable to the current vertical search.
 *
 * @param props - {@link NumericalFacetsProps}
 * @returns A React component for facets
 *
 * @deprecated Use {@link NumericalFacet} with {@link Facets} instead.
 * @public
 */
export declare function NumericalFacets({ searchOnChange, includedFieldIds, getFilterDisplayName, inputPrefix, customCssClasses, ...filterGroupProps }: NumericalFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link NumericalFacets}.
 *
 * @public
 */
export declare interface NumericalFacetsCssClasses extends FilterGroupCssClasses, RangeInputCssClasses {
    numericalFacetsContainer?: string;
    divider?: string;
}

/**
 * Props for the {@link NumericalFacets} component.
 *
 * @deprecated Use {@link NumericalFacet} with {@link Facets} instead.
 * @public
 */
export declare interface NumericalFacetsProps extends Omit<StandardFacetsProps, 'excludedFieldIds'> {
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
 * A function which is called when user drags or zooms the map.
 *
 * @public
 */
export declare type OnDragHandler = (center: mapboxgl_2.LngLat, bounds: mapboxgl_2.LngLatBounds) => void;

/**
 * The parameters that are passed into {@link FilterSearchProps.onDropdownInputChange}.
 *
 * @public
 */
export declare interface OnDropdownInputChangeProps {
    /** The input element's new value after the change */
    value: string;
    /**
     * A function that executes a filter search and updates the input and dropdown options
     * with the response.
     */
    executeFilterSearch: (query?: string) => Promise<FilterSearchResponse | undefined>;
}

/**
 * The interface of a function which is called on a search.
 *
 * @public
 */
export declare type onSearchFunc = (searchEventData: {
    verticalKey?: string;
    query?: string;
}) => void;

/**
 * The parameters that are passed into {@link FilterSearchProps.onSelect}.
 *
 * @public
 */
export declare interface OnSelectParams {
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
 * Renders a component that divide a series of vertical results into chunks
 * across multiple pages and enable user to navigate between those pages.
 *
 * @public
 */
export declare function Pagination(props: PaginationProps): JSX.Element | null;

/**
 * The CSS classes used for pagination.
 *
 * @public
 */
export declare interface PaginationCssClasses {
    paginationContainer?: string;
    paginationLoading?: string;
    label?: string;
    selectedLabel?: string;
    leftIconContainer?: string;
    rightIconContainer?: string;
    icon?: string;
}

/**
 * Props for {@link Pagination} component
 *
 * @public
 */
export declare interface PaginationProps {
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
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
export declare type PinComponent<T> = (props: PinComponentProps<T>) => JSX.Element;

/**
 * Props for rendering a custom marker on the map.
 *
 * @public
 */
export declare type PinComponentProps<T> = {
    /** The index of the pin. */
    index: number;
    /** The Mapbox map. */
    mapbox: mapboxgl_2.Map;
    /** The search result corresponding to the pin. */
    result: Result<T>;
    /** Where the pin is selected. */
    selected?: boolean;
};

/**
 * The CSS class interface for RangeInput.
 *
 * @public
 */
export declare interface RangeInputCssClasses {
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
export declare type RenderEntityPreviews = (autocompleteLoading: boolean, verticalKeyToResults: Record<string, VerticalResults_2>, dropdownItemProps: {
    onClick: (value: string, _index: number, itemData?: FocusedItemData) => void;
    ariaLabel: (value: string) => string;
}) => JSX.Element | null;

/**
 * Renders a HighlightedValue with highlighting based on its matchedSubstrings.
 * @returns JSX.Element
 *
 * @public
 *
 * @param highlightedValueOrString - the text to add highlight to.
 * @param customCssClasses - css classes use for the non-highlighted and highlighted text.
 */
export declare function renderHighlightedValue(highlightedValueOrString: Partial<HighlightedValue> | string, customCssClasses?: HighlightedValueCssClasses): JSX.Element;

/**
 * Renders results count of a universal/vertical search.
 *
 * @public
 *
 * @param props - {@link ResultsCountProps}
 */
export declare function ResultsCount({ customCssClasses }: ResultsCountProps): JSX.Element | null;

/**
 *  The CSS class interface for {@link ResultsCount}.
 *
 * @public
 */
export declare interface ResultsCountCssClasses {
    resultsCountContainer?: string;
    resultsCountLoading?: string;
}

/**
 * Props for {@link ResultsCount}.
 *
 * @public
 */
export declare interface ResultsCountProps {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ResultsCountCssClasses;
}

/**
 * Renders a SearchBar that is hooked up with an InputDropdown component.
 *
 * @public
 */
export declare function SearchBar({ placeholder, geolocationOptions, hideRecentSearches, visualAutocompleteConfig, showVerticalLinks, onSelectVerticalLink, verticalKeyToLabel, recentSearchesLimit, customCssClasses, onSearch }: SearchBarProps): JSX.Element;

/**
 * The CSS class interface for the {@link SearchBar}.
 *
 * @public
 */
export declare interface SearchBarCssClasses extends AutocompleteResultCssClasses {
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
 * The props for the {@link SearchBar} component.
 *
 * @public
 */
export declare interface SearchBarProps {
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
 * The configuration options for Search I18next.
 *
 * @public
 */
declare interface SearchI18nextConfig {
    searcher: SearchHeadless;
    translationOverrides?: SearchTranslationOverrides;
}

/**
 * A higher-order component which provides translations for search react components.
 *
 * @public
 *
 * @param props - The configuration for the search headless service
 * @returns A React element that provides translation context
 */
export declare function SearchI18nextProvider(props: PropsWithChildren<SearchI18nextConfig>): JSX.Element;

/**
 * SearchI18next translation overrides
 *
 * The key is the locale to override.
 * The value is the translation object that define specific translations override.
 *
 * @public
 */
export declare type SearchTranslationOverrides = {
    [key: string]: translations;
};

/**
 * A component that can be used to render a section template for vertical results.
 *
 * @public
 */
export declare type SectionComponent<T = DefaultRawDataType> = (props: SectionProps<T>) => JSX.Element | null;

/**
 * The CSS class interface used for the SectionHeader component.
 *
 * @public
 */
export declare interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
    sectionHeaderContainer?: string;
    sectionHeaderIconContainer?: string;
    sectionHeaderLabel?: string;
    viewMoreContainer?: string;
    viewMoreLink?: string;
}

/**
 * The configuration of a section template for a vertical's results on a universal page.
 *
 * @public
 */
export declare interface SectionProps<T = DefaultRawDataType> {
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
 * Renders a suggested query if the Search API provides one.
 *
 * @public
 *
 * @param props - {@link SpellCheckProps}
 * @returns A react component for spell check, or null if none exists
 */
export declare function SpellCheck({ customCssClasses, onClick }: SpellCheckProps): JSX.Element | null;

/**
 * The CSS Class interface for SpellCheck.
 *
 * @public
 */
export declare interface SpellCheckCssClasses {
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
export declare interface SpellCheckProps {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: SpellCheckCssClasses;
    /** A function which is called when a spell check suggestion is clicked. */
    onClick?: (data: {
        correctedQuery: string;
        verticalKey: string;
    }) => void;
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
export declare function StandardCard(props: StandardCardProps<any>): JSX.Element;

/**
 * The CSS class interface used for the StandardCardDisplay.
 *
 * @public
 */
export declare interface StandardCardCssClasses extends ThumbsFeedbackCssClasses {
    container?: string;
    header?: string;
    body?: string;
    cta1?: string;
    cta2?: string;
    title?: string;
}

/**
 * The data used by the {@link StandardCard} and taken from the original Result.
 *
 * @public
 */
export declare interface StandardCardData {
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
 * Props for a StandardCard.
 *
 * @public
 */
export declare interface StandardCardProps<T = DefaultRawDataType> extends CardProps<T> {
    /** Whether to show thumbs up/down buttons to provide feedback on the result card */
    showFeedbackButtons?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardCardCssClasses;
}

/**
 * A component that displays a single standard facet. Use this to override the default rendering.
 *
 * @param props - {@link StandardFacetProps}
 * @returns ReactElement
 * @public
 */
export declare function StandardFacet(props: StandardFacetProps): null;

/**
 * Props for the {@link StandardFacet} component.
 *
 * @public
 */
export declare interface StandardFacetProps {
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
export declare function StandardFacets(props: StandardFacetsProps): JSX.Element;

/**
 * The CSS class interface for {@link StandardFacets}.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
export declare interface StandardFacetsCssClasses extends FilterGroupCssClasses {
    standardFacetsContainer?: string;
    divider?: string;
}

/**
 * Props for the {@link StandardFacets} component.
 *
 * @deprecated Use {@link StandardFacet} with {@link Facets} instead.
 * @public
 */
export declare interface StandardFacetsProps {
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
 * A component that displays all the results for a vertical using a standard section template.
 *
 * @public
 *
 * @param props - {@link StandardSectionProps}
 * @returns A React element for a standard section, or null if there are no results to display
 */
export declare function StandardSection<T>(props: StandardSectionProps<T>): JSX.Element | null;

/**
 * The CSS class interface used for {@link StandardSection}.
 *
 * @public
 */
export declare interface StandardSectionCssClasses extends VerticalResultsCssClasses {
    section?: string;
}

/**
 * The configuration for a StandardSection.
 *
 * @public
 */
export declare interface StandardSectionProps<T = DefaultRawDataType> extends SectionProps<T> {
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardSectionCssClasses;
}

/**
 * The configuration data for a field value static filter option.
 *
 * @public
 */
export declare type StaticFilterOptionConfig = Omit<FilterOptionConfig, 'value'> & {
    /** The value used to perform filtering. */
    value: string | number | boolean;
};

/**
 * A component that displays a group of user-configured field value filters
 * that will be applied to the current vertical search.
 *
 * @param props - {@link StaticFiltersProps}
 * @returns A React component for field value static filters
 *
 * @public
 */
export declare function StaticFilters(props: StaticFiltersProps): JSX.Element;

/**
 * The CSS class interface for {@link StaticFilters}.
 *
 * @public
 */
export declare interface StaticFiltersCssClasses extends FilterGroupCssClasses {
    staticFiltersContainer?: string;
}

/**
 * Props for the {@link StaticFilters} component.
 *
 * @public
 */
export declare interface StaticFiltersProps {
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
 * Renders a quality feedback widget composed of thumbs up and thumbs down buttons.
 *
 * @public
 *
 * @param props - The configuration for the the feedback component.
 * @returns A React element for quality feedback widget.
 */
export declare function ThumbsFeedback(props: ThumbsFeedbackProps): JSX.Element;

/**
 * The CSS class interface used for {@link ThumbsFeedback}.
 *
 * @public
 */
export declare interface ThumbsFeedbackCssClasses {
    thumbsFeedbackContainer?: string;
    thumbsUpIcon?: string;
    thumbsDownIcon?: string;
}

/**
 * Props for {@link ThumbsFeedback}.
 *
 * @public
 */
export declare interface ThumbsFeedbackProps {
    /** A function which is called when a quality feedback button is clicked. */
    onClick: (feedbackType: FeedbackType) => void;
    /** Text to display alongside the quality feedback buttons. */
    feedbackText?: string;
    /** Text to display after a quality feedback button is clicked. */
    feedbackTextOnSubmission?: string;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: ThumbsFeedbackCssClasses;
}

declare type translationKeys = 'aiGeneratedAnswer' | 'allCategories' | 'appliedFiltersToCurrentSearch' | 'apply' | 'applyFilters' | 'autocompleteOptionsFound_zero' | 'autocompleteOptionsFound_one' | 'autocompleteOptionsFound_two' | 'autocompleteOptionsFound_few' | 'autocompleteOptionsFound_many' | 'autocompleteOptionsFound_other' | 'autocompleteSuggestion' | 'autocompleteSuggestionsFound_zero' | 'autocompleteSuggestionsFound_one' | 'autocompleteSuggestionsFound_two' | 'autocompleteSuggestionsFound_few' | 'autocompleteSuggestionsFound_many' | 'autocompleteSuggestionsFound_other' | 'basedOnYourDevice' | 'basedOnYourInternetAddress' | 'categoriesText_zero' | 'categoriesText_one' | 'categoriesText_two' | 'categoriesText_few' | 'categoriesText_many' | 'categoriesText_other' | 'clearAll' | 'clearMinAndMax' | 'clearTheRangeToSelectOptions' | 'clearTheSearchBar' | 'conductASearch' | 'currentLocation' | 'didYouMean' | 'dropDownScreenReaderInstructions' | 'feedback' | 'invalidRange' | 'max' | 'min' | 'navigateToTheNextResultsPage' | 'navigateToThePreviousResultsPage' | 'noAutocompleteOptionsFound' | 'noAutocompleteSuggestionsFound' | 'noResultsFoundIn' | 'pagination' | 'readMoreAbout' | 'recentSearch' | 'recentSearchesFound_zero' | 'recentSearchesFound_one' | 'recentSearchesFound_two' | 'recentSearchesFound_few' | 'recentSearchesFound_many' | 'recentSearchesFound_other' | 'removeFilter' | 'resultPreview' | 'resultPreviewsFound_zero' | 'resultPreviewsFound_one' | 'resultPreviewsFound_two' | 'resultPreviewsFound_few' | 'resultPreviewsFound_many' | 'resultPreviewsFound_other' | 'resultsCountText_zero' | 'resultsCountText_one' | 'resultsCountText_two' | 'resultsCountText_few' | 'resultsCountText_many' | 'resultsCountText_other' | 'resultsCountWithPaginationText' | 'searchHere' | 'showLess' | 'showMore' | 'showingAllInstead' | 'sources_zero' | 'sources_one' | 'sources_two' | 'sources_few' | 'sources_many' | 'sources_other' | 'submitSearch' | 'suggestionResultsCount_zero' | 'suggestionResultsCount_one' | 'suggestionResultsCount_two' | 'suggestionResultsCount_few' | 'suggestionResultsCount_many' | 'suggestionResultsCount_other' | 'thisAnsweredMyQuestion' | 'thisDidNotAnswerMyQuestion' | 'unselectAnOptionToEnterInARange' | 'updateYourLocation' | 'viewAll' | 'viewDetails' | 'useMyLocation' | 'viewAll' | 'viewDetails';

declare type translations = {
    [key in translationKeys]?: string;
};

/**
 * Displays the results of a universal search with the results for each vertical separated
 * into sections.
 *
 * @public
 *
 * @param props - {@link UniversalResultsProps}
 * @returns A React element for the universal results, or null if there are none
 */
export declare function UniversalResults<T>({ verticalConfigMap, showAppliedFilters, customCssClasses }: UniversalResultsProps<T>): JSX.Element | null;

/**
 * The CSS class interface used for {@link UniversalResults}.
 *
 * @public
 */
export declare interface UniversalResultsCssClasses extends SectionHeaderCssClasses {
    universalResultsContainer?: string;
    universalResultsLoading?: string;
}

/**
 * Props for {@link UniversalResults}.
 *
 * @public
 */
export declare interface UniversalResultsProps<T> {
    /** Whether or not to show the applied filters. */
    showAppliedFilters?: boolean;
    /** A mapping of verticalKey to the configuration for each vertical. */
    verticalConfigMap: VerticalConfigMap<T>;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: UniversalResultsCssClasses;
}

/**
 * A React component interface to render results with "unknown" field type in field value direct answer.
 *
 * @public
 */
export declare type UnknownFieldTypeDisplayComponent = (props: UnknownFieldTypeDisplayProps) => JSX.Element;

/**
 * Props for {@link UnknownFieldTypeDisplayComponent}.
 *
 * @public
 */
export declare interface UnknownFieldTypeDisplayProps {
    result: UnknownFieldValueDirectAnswer;
}

/**
 * If the provided search intents include a 'NEAR_ME' intent and there's no existing
 * user's location in state, retrieve and store user's location in headless state.
 *
 * @public
 */
export declare function updateLocationIfNeeded(searchActions: SearchActions, intents: SearchIntent[], geolocationOptions?: PositionOptions): Promise<void>;

/**
 * Returns a service that can be used to report analytics events.
 *
 * @public
 */
export declare function useAnalytics(): AnalyticsService | null;

/**
 * Creates a memoized function for reporting card analytics.
 *
 * @public
 *
 * @param result - result that contains data use in the card analytics event.
 * @param analyticsType - the card analytics event type to report.
 */
export declare function useCardAnalyticsCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>, analyticsType: CardAnalyticsType): () => void;

/**
 * Creates a memoized function for reporting card feedback analytics.
 *
 * @public
 *
 * @param result - card result that contains data use in the feedback analytics event.
 */
export declare function useCardFeedbackCallback<T = DefaultRawDataType>(result: CardAnalyticsDataType<T>): (analyticsType: FeedbackType) => void;

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
 * @param disableBuiltInClasses - If set to true, the customClasses with replace (not merge with) the builtInClasses
 * @returns The composed CSS classes
 */
export declare function useComposedCssClasses<ClassInterface extends Partial<Record<keyof ClassInterface & string, string>>>(builtInClasses: Readonly<ClassInterface>, customClasses?: Partial<ClassInterface>, disableBuiltInClasses?: boolean): ClassInterface;

/**
 * The configuration for a vertical.
 *
 * @public
 */
export declare interface VerticalConfig<T = DefaultRawDataType> {
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
export declare type VerticalConfigMap<T = Record<string, DefaultRawDataType>> = {
    [K in keyof T]: VerticalConfig<T[K]>;
};

/**
 * A map of vertical keys to labels.
 *
 * @public
 */
export declare interface VerticalLabelMap {
    /** Config mapped to a vertical. */
    [verticalKey: string]: Pick<VerticalConfig, 'label'>;
}

/**
 * Data needed to create a URL to a vertical search page.
 *
 * @public
 */
export declare interface VerticalLink {
    /** The vertical key associated with the vertical link. */
    verticalKey: string;
    /** The query used when the vertical link is selected. */
    query?: string;
}

/**
 * A component that renders search results for a vertical page.
 *
 * @public
 *
 * @param props - {@link VerticalResultsProps}
 * @returns A React element for the results, or null if no results should be displayed
 */
export declare function VerticalResults<T>(props: VerticalResultsProps<T>): JSX.Element | null;

/**
 * The CSS class interface used for {@link VerticalResults}.
 *
 * @public
 */
export declare interface VerticalResultsCssClasses {
    verticalResultsContainer?: string;
    verticalResultsLoading?: string;
}

/**
 * Props for the VerticalResults component.
 *
 * @public
 */
export declare interface VerticalResultsProps<T> {
    /** {@inheritDoc CardComponent} */
    CardComponent: CardComponent<T>;
    /**
     * Whether or not all results should be displayed when there are none returned from the search.
     * Defaults to true.
     */
    displayAllOnNoResults?: boolean;
    /** CSS classes for customizing the component styling. */
    customCssClasses?: VerticalResultsCssClasses;
    /** set individual result refs. */
    setResultsRef?: (index: number) => ((result: HTMLDivElement) => void) | null;
}

/**
 * The configuration options for Visual Autocomplete.
 *
 * @public
 */
export declare interface VisualAutocompleteConfig {
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

export { }
