/**
 * An event payload which represents a single search-related analytics event.
 *
 * @public
 */
export interface SearchEventPayload {
    /** The user action which caused the event, e.g. THUMBS_UP, AUTO_COMPLETE_SELECTION  */
    action?: SearchAction;
    /** The URL of the page the event is directing the visitor to. */
    destinationUrl?: string;
    /** The Yext entity to which the event corresponds. If passed as a string, the value is
     * the mutable, customer-settable entity ID for the entity associated with the event.
     * If passed as a number, it is the immutable entity ID (UID) set by the system. This is an internal ID.
     */
    entity?: string | number;
    /** The locale of the user who generated the event.
     */
    locale?: string;
    /** Unique identifier of the search */
    searchId: string;
    /** Unique identifier for a single query across pagination */
    queryId?: string;
    /** The vertical key on which the event occurred, if any */
    verticalKey?: string;
    /** Whether or not the event occurred on a direct answer card */
    isDirectAnswer?: boolean;
    /** The label of the version number of the search config. Either "PRODUCTION" or "STAGING" */
    versionLabel?: VersionLabel;
    /** The version number of the search config */
    versionNumber?: number;
    /** The identifier of the search experience. */
    experienceKey: string;
    /** Whether or not the event occurred on a generative direct answer card */
    isGenerativeDirectAnswer?: boolean;
    /** The query entered by the user. */
    searchTerm?: string;
}

//todo - how many of these do we want to delete?
export declare type SearchAction =
    'ADD_TO_CART'
    | 'ALL_TAB_NAVIGATION'
    | 'APPLY'
    | 'AUTO_COMPLETE_SELECTION'
    | 'BACKWARD_PAGINATE'
    | 'BOOK'
    | 'BRAND_ICON'
    | 'CASE_START'
    | 'CASE_SUBMITTED'
    | 'CHAT_IMPRESSION'
    | 'CHAT_LINK_CLICK'
    | 'CHAT_RESPONSE'
    | 'CITATION_CLICK'
    | 'COLLAPSE'
    | 'CTA_CLICK'
    | 'DRIVING_DIRECTIONS'
    | 'EVENT'
    | 'EXPAND'
    | 'FEATURED_MESSAGE'
    | 'FILTERING_WITHIN_SECTION'
    | 'FORWARD_PAGINATE'
    | 'HEADER_LINKS'
    | 'ITEM_IN_LIST'
    | 'LINK'
    | 'MAP_CARD'
    | 'MAP_PIN'
    | 'MENU'
    | 'MESSAGE'
    | 'ORDER'
    | 'PAGE_VIEW'
    | 'PAGINATE'
    | 'POST'
    | 'PRESET_PROMPT'
    | 'PRODUCT'
    | 'PROFILE'
    | 'QUESTION_FOCUS'
    | 'QUESTION_SUBMIT'
    | 'REMOVED_FILTER'
    | 'REVIEW'
    | 'SCROLL_TO_BOTTOM_OF_PAGE'
    | 'SEARCH_BAR_IMPRESSION'
    | 'SEARCH_CLEAR_BUTTON'
    | 'TAP_TO_CALL'
    | 'THUMBS_DOWN'
    | 'THUMBS_UP'
    | 'TICKET_URL'
    | 'TITLE'
    | 'VERTICAL_TAB_NAVIGATION'
    | 'VERTICAL_VIEW_ALL'
    | 'VOICE_START'
    | 'VOICE_STOP'
    | 'WEBSITE';

export declare type VersionLabel = "PRODUCTION" | "STAGING"
