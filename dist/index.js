var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/SearchBar.tsx
import {
  QuerySource,
  SearchTypeEnum as SearchTypeEnum2,
  useSearchActions as useSearchActions2,
  useSearchState as useSearchState2,
  useSearchUtilities
} from "@yext/search-headless-react";
import classNames from "classnames";
import { Fragment as Fragment5, isValidElement as isValidElement3, useCallback as useCallback5, useEffect as useEffect5, useMemo as useMemo3 } from "react";

// src/hooks/useEntityPreviews.tsx
import { useState } from "react";

// src/hooks/useComponentMountStatus.tsx
import { useEffect, useRef } from "react";
function useComponentMountStatus() {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
}

// src/hooks/useDebouncedFunction.ts
import { useRef as useRef2 } from "react";
function useDebouncedFunction(func, milliseconds) {
  const timeoutIdRef = useRef2();
  if (!func) {
    return void 0;
  }
  const debounced = (...args) => {
    return new Promise((resolve) => {
      if (timeoutIdRef.current !== void 0) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = window.setTimeout(() => {
        resolve(func(...args));
        timeoutIdRef.current = void 0;
      }, milliseconds);
    });
  };
  return debounced;
}

// src/hooks/useEntityPreviews.tsx
function useEntityPreviews(entityPreviewSearcher, debounceTime) {
  const isMountedRef = useComponentMountStatus();
  const [
    verticalKeyToResults,
    setVerticalKeyToResults
  ] = useState({});
  const debouncedUniversalSearch = useDebouncedFunction(async () => {
    if (!entityPreviewSearcher) {
      return;
    }
    await entityPreviewSearcher.executeUniversalQuery();
    if (!isMountedRef.current) {
      return;
    }
    const results = entityPreviewSearcher.state.universal.verticals || [];
    setVerticalKeyToResults(getVerticalKeyToResults(results));
    setLoadingState(false);
  }, debounceTime);
  const [isLoading, setLoadingState] = useState(false);
  function executeEntityPreviewsQuery(query, universalLimit, restrictVerticals) {
    if (!entityPreviewSearcher) {
      return;
    }
    if (query === entityPreviewSearcher.state.query.input) {
      return;
    }
    setLoadingState(true);
    entityPreviewSearcher.setQuery(query);
    entityPreviewSearcher.setRestrictVerticals(restrictVerticals);
    entityPreviewSearcher.setUniversalLimit(universalLimit);
    debouncedUniversalSearch == null ? void 0 : debouncedUniversalSearch();
  }
  return [{ verticalKeyToResults, isLoading }, executeEntityPreviewsQuery];
}
function getVerticalKeyToResults(verticalResultsArray) {
  return verticalResultsArray.reduce((prev, current) => {
    prev[current.verticalKey] = current;
    return prev;
  }, {});
}

// src/hooks/useRecentSearches.ts
import { useCallback, useEffect as useEffect2, useState as useState2 } from "react";
import { RecentSearches } from "recent-searches";
function useRecentSearches(recentSearchesLimit, verticalKey) {
  const recentSearchesKey = getRecentSearchesKey(verticalKey);
  const [recentSearches, setRecentSeaches] = useState2(
    new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    })
  );
  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(recentSearchesKey);
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
    localStorage.removeItem(recentSearchesKey);
  }, [recentSearchesKey, recentSearchesLimit]);
  const setRecentSearch = useCallback((input) => {
    recentSearches.setRecentSearch(input);
  }, [recentSearches]);
  useEffect2(() => {
    setRecentSeaches(new RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
  }, [recentSearchesKey, recentSearchesLimit]);
  return [recentSearches == null ? void 0 : recentSearches.getRecentSearches(), setRecentSearch, clearRecentSearches];
}
function getRecentSearchesKey(verticalKey) {
  if (verticalKey) {
    return `__yxt_recent_searches_${verticalKey}__`;
  } else {
    return "__yxt_recent_searches_universal__";
  }
}

// src/hooks/useSearchWithNearMeHandling.ts
import { useSearchActions } from "@yext/search-headless-react";

// src/utils/search-operations.ts
import {
  SearchTypeEnum
} from "@yext/search-headless-react";
async function executeSearch(searchActions) {
  const isVertical = searchActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    isVertical ? searchActions.executeVerticalQuery() : searchActions.executeUniversalQuery();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? "vertical" : "universal"} search.
`, e);
  }
}
async function executeAutocomplete(searchActions) {
  const isVertical = searchActions.state.meta.searchType === SearchTypeEnum.Vertical;
  try {
    return isVertical ? searchActions.executeVerticalAutocomplete() : searchActions.executeUniversalAutocomplete();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? "vertical" : "universal"} autocomplete search.
`, e);
  }
}
async function getSearchIntents(searchActions) {
  const results = await executeAutocomplete(searchActions);
  return results == null ? void 0 : results.inputIntents;
}

// src/utils/location-operations.ts
import {
  SearchIntent as SearchIntent2
} from "@yext/search-headless-react";
var defaultGeolocationOptions = {
  enableHighAccuracy: false,
  timeout: 6e3,
  maximumAge: 3e5
};
async function updateLocationIfNeeded(searchActions, intents, geolocationOptions) {
  if (intents.includes(SearchIntent2.NearMe) && !searchActions.state.location.userLocation) {
    try {
      const position = await getUserLocation(geolocationOptions);
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (e) {
      console.error(e);
    }
  }
}
async function getUserLocation(geolocationOptions) {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (err) => {
          console.error("Error occured using geolocation API. Unable to determine user's location.");
          reject(err);
        },
        __spreadValues(__spreadValues({}, defaultGeolocationOptions), geolocationOptions)
      );
    } else {
      reject("No access to geolocation API. Unable to determine user's location.");
    }
  });
}

// src/hooks/useSearchWithNearMeHandling.ts
import { useRef as useRef3 } from "react";
function useSearchWithNearMeHandling(geolocationOptions, onSearch) {
  const autocompletePromiseRef = useRef3();
  const searchActions = useSearchActions();
  async function executeQuery() {
    var _a, _b;
    let intents = [];
    if (!searchActions.state.location.userLocation) {
      if (!autocompletePromiseRef.current) {
        autocompletePromiseRef.current = executeAutocomplete(searchActions);
      }
      const autocompleteResponseBeforeSearch = await autocompletePromiseRef.current;
      intents = (autocompleteResponseBeforeSearch == null ? void 0 : autocompleteResponseBeforeSearch.inputIntents) || [];
      await updateLocationIfNeeded(searchActions, intents, geolocationOptions);
    }
    const verticalKey = (_a = searchActions.state.vertical.verticalKey) != null ? _a : "";
    const query = (_b = searchActions.state.query.input) != null ? _b : "";
    onSearch ? onSearch({ verticalKey, query }) : executeSearch(searchActions);
  }
  return [executeQuery, autocompletePromiseRef];
}

// src/hooks/useSynchronizedRequest.tsx
import { useRef as useRef4, useState as useState3, useCallback as useCallback2, useEffect as useEffect3 } from "react";
function useSynchronizedRequest(executeRequest, handleRejectedPromise) {
  const executeRequestRef = useRef4(executeRequest);
  const handleRejectedPromiseRef = useRef4(handleRejectedPromise);
  const isMountedRef = useComponentMountStatus();
  const networkIds = useRef4({ latestRequest: 0, responseInState: 0 });
  const [synchronizedResponse, setSynchronizedResponse] = useState3();
  const executeSynchronizedRequest = useCallback2(async (data) => {
    const requestId = ++networkIds.current.latestRequest;
    return new Promise(async (resolve) => {
      let response = void 0;
      try {
        response = await executeRequestRef.current(data);
      } catch (e) {
        handleRejectedPromiseRef.current ? handleRejectedPromiseRef.current(e) : console.error(e);
      }
      if (requestId >= networkIds.current.responseInState) {
        if (!isMountedRef.current) {
          return;
        }
        setSynchronizedResponse(response);
        networkIds.current.responseInState = requestId;
      }
      resolve(response);
    });
  }, [isMountedRef]);
  const clearResponseData = useCallback2(() => {
    setSynchronizedResponse(void 0);
  }, [setSynchronizedResponse]);
  useEffect3(() => {
    executeRequestRef.current = executeRequest;
    handleRejectedPromiseRef.current = handleRejectedPromise;
  });
  return [synchronizedResponse, executeSynchronizedRequest, clearResponseData];
}

// src/icons/VerticalDividerIcon.tsx
import { jsx } from "react/jsx-runtime";
function VerticalDividerIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      width: "1",
      height: "24",
      viewBox: "0 0 1 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("rect", { width: "1", height: "24", rx: "0.5", fill: "#E1E5E8" })
    }
  );
}

// src/icons/HistoryIcon.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function HistoryIcon() {
  return /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 14 15", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx2("path", { d: "M13.7813 7.75C13.7539 4.00391 10.7188 0.96875 7 0.96875C5.11328 0.96875 3.39063 1.76172 2.16016 2.99219L0.929688 1.76172C0.738281 1.57031 0.382813 1.70703 0.382813 2.00781L0.382813 5.45312C0.382813 5.64453 0.519531 5.78125 0.710938 5.78125L4.21094 5.78125C4.51172 5.78125 4.64844 5.42578 4.45703 5.23437L3.11719 3.92188C4.10156 2.91016 5.46875 2.28125 7 2.28125C10.0078 2.28125 12.4688 4.74219 12.4688 7.75C12.4688 10.7852 10.0078 13.2187 7 13.2188C5.57813 13.2188 4.32031 12.6992 3.33594 11.8516C3.22656 11.7422 3.00781 11.7422 2.89844 11.8516L2.43359 12.3164C2.29688 12.4531 2.29688 12.6719 2.43359 12.8086C3.63672 13.875 5.25 14.5586 7 14.5312C10.7188 14.5312 13.7813 11.4961 13.7813 7.75ZM9.1875 10.2109L9.59766 9.69141C9.67969 9.52734 9.65234 9.33594 9.51563 9.22656L7.65625 7.85937V3.92187C7.65625 3.75781 7.49219 3.59375 7.32813 3.59375H6.67188C6.48047 3.59375 6.34375 3.75781 6.34375 3.92187V8.54297L8.75 10.293C8.88672 10.4023 9.10547 10.375 9.1875 10.2109Z" }) });
}

// src/icons/CloseIcon.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function CloseIcon() {
  return /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M10.9095 9.00028L16.6786 3.2311L17.8684 2.04138C18.0439 1.86587 18.0439 1.58067 17.8684 1.40517L16.5954 0.132192C16.4199 -0.0433137 16.1347 -0.0433137 15.9592 0.132192L9.00028 7.0911L2.04138 0.131629C1.86587 -0.0438764 1.58067 -0.0438764 1.40517 0.131629L0.131629 1.40461C-0.0438764 1.58011 -0.0438764 1.86531 0.131629 2.04081L7.0911 9.00028L0.131629 15.9592C-0.0438764 16.1347 -0.0438764 16.4199 0.131629 16.5954L1.40461 17.8684C1.58011 18.0439 1.86531 18.0439 2.04081 17.8684L9.00028 10.9095L14.7695 16.6786L15.9592 17.8684C16.1347 18.0439 16.4199 18.0439 16.5954 17.8684L17.8684 16.5954C18.0439 16.4199 18.0439 16.1347 17.8684 15.9592L10.9095 9.00028Z", fill: "#6b7280" }) });
}

// src/icons/MagnifyingGlassIcon.tsx
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
function MagnifyingGlassIcon() {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: [
    /* @__PURE__ */ jsx4("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
    /* @__PURE__ */ jsx4(
      "path",
      {
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      }
    )
  ] });
}

// src/components/Dropdown/Dropdown.tsx
import { createElement, isValidElement as isValidElement2, useEffect as useEffect4, useMemo, useRef as useRef5, useState as useState4 } from "react";

// src/components/Dropdown/DropdownContext.ts
import { createContext, useContext } from "react";
var DropdownContext = createContext(null);
function useDropdownContext() {
  const dropdownContextInstance = useContext(DropdownContext);
  if (dropdownContextInstance === null) {
    throw new Error("Tried to use DropdownContext when none exists.");
  }
  return dropdownContextInstance;
}

// src/components/Dropdown/InputContext.tsx
import { useContext as useContext2, createContext as createContext2 } from "react";
var InputContext = createContext2(null);
function useInputContext() {
  const inputContextInstance = useContext2(InputContext);
  if (inputContextInstance === null) {
    throw new Error("Tried to use InputContext when none exists.");
  }
  return inputContextInstance;
}

// src/components/Dropdown/Dropdown.tsx
import useRootClosePkg from "@restart/ui/useRootClose";

// src/components/Dropdown/FocusContext.ts
import { createContext as createContext3, useContext as useContext3 } from "react";
var FocusContext = createContext3(null);
function useFocusContext() {
  const focusContextInstance = useContext3(FocusContext);
  if (focusContextInstance === null) {
    throw new Error("Tried to use FocusContext when none exists.");
  }
  return focusContextInstance;
}

// src/components/ScreenReader.tsx
import { Fragment, jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function ScreenReader({
  instructionsId,
  instructions,
  announcementKey,
  announcementText
}) {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx5(
      "div",
      {
        id: instructionsId,
        className: "hidden",
        children: instructions
      }
    ),
    /* @__PURE__ */ jsx5(
      "div",
      {
        className: "sr-only",
        "aria-live": "assertive",
        children: announcementText
      },
      announcementKey
    )
  ] });
}

// src/components/utils/recursivelyMapChildren.ts
import { Children, cloneElement, isValidElement } from "react";
function recursivelyMapChildren(children, elementReplacer) {
  return Children.map(children, (c, index) => {
    if (!isValidElement(c)) {
      return c;
    }
    const replacedElement = elementReplacer(c, index);
    if (!replacedElement || !isValidElement(replacedElement)) {
      return replacedElement;
    }
    const grandchildren = replacedElement.props.children;
    if (!grandchildren) {
      return replacedElement;
    }
    const replacedGrandchildren = recursivelyMapChildren(grandchildren, elementReplacer);
    return cloneElement(replacedElement, { children: replacedGrandchildren });
  });
}

// src/components/Dropdown/DropdownItem.tsx
import { useCallback as useCallback3 } from "react";

// src/components/Dropdown/generateDropdownId.ts
function generateDropdownId(screenReaderUUID, index) {
  if (!screenReaderUUID)
    return "";
  return screenReaderUUID + "_" + index;
}

// src/components/Dropdown/DropdownItem.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function DropdownItem(_props) {
  return null;
}
function DropdownItemWithIndex(props) {
  const {
    children,
    value,
    index,
    className,
    focusedClassName,
    itemData,
    onClick,
    ariaLabel
  } = props;
  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { focusedIndex, updateFocusedItem } = useFocusContext();
  const { setValue, setLastTypedOrSubmittedValue } = useInputContext();
  const isFocused = focusedIndex === index;
  const handleClick = useCallback3(() => {
    toggleDropdown(false);
    updateFocusedItem(-1);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect == null ? void 0 : onSelect(value, index, itemData);
    onClick == null ? void 0 : onClick(value, index, itemData);
  }, [
    index,
    itemData,
    onClick,
    onSelect,
    setLastTypedOrSubmittedValue,
    setValue,
    toggleDropdown,
    updateFocusedItem,
    value
  ]);
  return /* @__PURE__ */ jsx6(
    "div",
    {
      id: generateDropdownId(screenReaderUUID, index),
      tabIndex: 0,
      className: isFocused ? focusedClassName : className,
      onClick: handleClick,
      "aria-label": typeof ariaLabel === "function" ? ariaLabel(value) : ariaLabel,
      children
    }
  );
}

// src/components/Dropdown/Dropdown.tsx
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import { useId } from "@reach/auto-id";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var useRootClose = typeof useRootClosePkg === "function" ? useRootClosePkg : useRootClosePkg["default"];
var useLayoutEffect = typeof useIsomorphicLayoutEffect === "function" ? useIsomorphicLayoutEffect : useIsomorphicLayoutEffect["default"];
function Dropdown(props) {
  const {
    children,
    screenReaderText,
    screenReaderInstructions = "When autocomplete results are available, use up and down arrows to review and enter to select.",
    onSelect,
    onToggle,
    className,
    activeClassName,
    parentQuery,
    alwaysSelectOption = false
  } = props;
  const containerRef = useRef5(null);
  const screenReaderUUID = useId();
  const [screenReaderKey, setScreenReaderKey] = useState4(0);
  const [hasTyped, setHasTyped] = useState4(false);
  const [childrenWithDropdownItemsTransformed, items] = useMemo(() => {
    return getTransformedChildrenAndItemData(children);
  }, [children]);
  const inputContext = useInputContextInstance();
  const { value, setValue, lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue } = inputContext;
  const focusContext = useFocusContextInstance(
    items,
    lastTypedOrSubmittedValue,
    setValue,
    screenReaderKey,
    setScreenReaderKey,
    alwaysSelectOption
  );
  const { focusedIndex, focusedItemData, updateFocusedItem } = focusContext;
  const dropdownContext = useDropdownContextInstance(
    lastTypedOrSubmittedValue,
    value,
    focusedIndex,
    focusedItemData,
    screenReaderUUID,
    setHasTyped,
    onToggle,
    onSelect
  );
  const { toggleDropdown, isActive } = dropdownContext;
  useLayoutEffect(() => {
    if (parentQuery !== void 0 && parentQuery !== lastTypedOrSubmittedValue) {
      setLastTypedOrSubmittedValue(parentQuery);
      updateFocusedItem(-1, parentQuery);
    }
  }, [
    parentQuery,
    lastTypedOrSubmittedValue,
    updateFocusedItem,
    setLastTypedOrSubmittedValue
  ]);
  useRootClose(containerRef, () => {
    toggleDropdown(false);
  }, { disabled: !isActive });
  function handleKeyDown(e) {
    if (!isActive) {
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
    if (e.key === "ArrowDown") {
      if (alwaysSelectOption && focusedIndex === items.length - 1) {
        updateFocusedItem(0);
      } else {
        updateFocusedItem(focusedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (alwaysSelectOption && focusedIndex === 0) {
        updateFocusedItem(items.length - 1);
      } else {
        updateFocusedItem(focusedIndex - 1);
      }
    } else if (e.key === "Tab" && !e.shiftKey) {
      if (items.length !== 0) {
        if (focusedIndex >= items.length - 1) {
          updateFocusedItem(-1);
          toggleDropdown(false);
        } else {
          updateFocusedItem(focusedIndex + 1);
          e.preventDefault();
        }
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      if (focusedIndex > 0 || !alwaysSelectOption && focusedIndex === 0) {
        updateFocusedItem(focusedIndex - 1);
        e.preventDefault();
      } else {
        updateFocusedItem(-1);
        toggleDropdown(false);
      }
    } else if (!hasTyped) {
      setHasTyped(true);
    }
  }
  return /* @__PURE__ */ jsxs3("div", { ref: containerRef, className: isActive ? activeClassName : className, onKeyDown: handleKeyDown, children: [
    /* @__PURE__ */ jsx7(DropdownContext.Provider, { value: dropdownContext, children: /* @__PURE__ */ jsx7(InputContext.Provider, { value: inputContext, children: /* @__PURE__ */ jsx7(FocusContext.Provider, { value: focusContext, children: childrenWithDropdownItemsTransformed }) }) }),
    /* @__PURE__ */ jsx7(
      ScreenReader,
      {
        announcementKey: screenReaderKey,
        announcementText: isActive && (hasTyped || items.length || value) ? screenReaderText : "",
        instructionsId: screenReaderUUID,
        instructions: screenReaderInstructions
      }
    )
  ] });
}
function useInputContextInstance() {
  const [value, setValue] = useState4("");
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = useState4("");
  return {
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  };
}
function useFocusContextInstance(items, lastTypedOrSubmittedValue, setValue, screenReaderKey, setScreenReaderKey, alwaysSelectOption) {
  const [focusedIndex, setFocusedIndex] = useState4(-1);
  const [focusedValue, setFocusedValue] = useState4(null);
  const [focusedItemData, setFocusedItemData] = useState4(void 0);
  useEffect4(() => {
    if (alwaysSelectOption) {
      if (items.length > 0) {
        const index = focusedIndex === -1 || focusedIndex >= items.length ? 0 : focusedIndex;
        setFocusedIndex(index);
        setFocusedValue(items[index].value);
        setFocusedItemData(items[index].itemData);
      } else {
        setFocusedIndex(-1);
        setFocusedValue(null);
        setFocusedItemData(void 0);
      }
    }
  }, [alwaysSelectOption, focusedIndex, items]);
  function updateFocusedItem(updatedFocusedIndex, value) {
    const numItems = items.length;
    let updatedValue;
    if (updatedFocusedIndex === -1 || updatedFocusedIndex >= numItems || numItems === 0) {
      updatedValue = value != null ? value : lastTypedOrSubmittedValue;
      if (alwaysSelectOption && numItems !== 0) {
        setFocusedIndex(0);
        setFocusedItemData(items[0].itemData);
        setScreenReaderKey(screenReaderKey + 1);
      } else {
        setFocusedIndex(-1);
        setFocusedItemData(void 0);
        setScreenReaderKey(screenReaderKey + 1);
      }
    } else if (updatedFocusedIndex < -1) {
      const loopedAroundIndex = (numItems + updatedFocusedIndex + 1) % numItems;
      updatedValue = value != null ? value : items[loopedAroundIndex].value;
      setFocusedIndex(loopedAroundIndex);
      setFocusedItemData(items[loopedAroundIndex].itemData);
    } else {
      updatedValue = value != null ? value : items[updatedFocusedIndex].value;
      setFocusedIndex(updatedFocusedIndex);
      setFocusedItemData(items[updatedFocusedIndex].itemData);
    }
    setFocusedValue(updatedValue);
    setValue(alwaysSelectOption ? value != null ? value : lastTypedOrSubmittedValue : updatedValue);
  }
  return {
    focusedIndex,
    focusedValue,
    focusedItemData,
    updateFocusedItem
  };
}
function useDropdownContextInstance(prevValue, value, index, focusedItemData, screenReaderUUID, setHasTyped, onToggle, onSelect) {
  const [isActive, _toggleDropdown] = useState4(false);
  const toggleDropdown = (willBeOpen) => {
    if (!willBeOpen) {
      setHasTyped(false);
    }
    _toggleDropdown(willBeOpen);
    onToggle == null ? void 0 : onToggle(willBeOpen, prevValue, value, index, focusedItemData);
  };
  return {
    isActive,
    toggleDropdown,
    onSelect,
    screenReaderUUID
  };
}
function getTransformedChildrenAndItemData(children) {
  const items = [];
  const childrenWithDropdownItemsTransformed = recursivelyMapChildren(children, (child) => {
    if (!(isValidElement2(child) && child.type === DropdownItem)) {
      return child;
    }
    const props = child.props;
    items.push({
      value: props.value,
      itemData: props.itemData
    });
    const transformedItem = createElement(DropdownItemWithIndex, __spreadProps(__spreadValues({}, props), { index: items.length - 1 }));
    return transformedItem;
  });
  return [childrenWithDropdownItemsTransformed, items];
}

// src/components/Dropdown/DropdownInput.tsx
import { useCallback as useCallback4, useRef as useRef6, useState as useState5 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
function DropdownInput(props) {
  const {
    className,
    placeholder,
    ariaLabel,
    onSubmit,
    onFocus,
    onChange,
    submitCriteria
  } = props;
  const inputRef = useRef6(null);
  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { value = "", setLastTypedOrSubmittedValue } = useInputContext();
  const {
    focusedIndex = -1,
    focusedItemData,
    focusedValue,
    updateFocusedItem
  } = useFocusContext();
  const [isTyping, setIsTyping] = useState5(true);
  const handleChange = useCallback4((e) => {
    setIsTyping(true);
    toggleDropdown(true);
    onChange == null ? void 0 : onChange(e.target.value);
    updateFocusedItem(-1, e.target.value);
    setLastTypedOrSubmittedValue(e.target.value);
  }, [onChange, setLastTypedOrSubmittedValue, toggleDropdown, updateFocusedItem]);
  const handleKeyDown = useCallback4((e) => {
    var _a;
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab") {
      setIsTyping(false);
    }
    if (e.key === "Enter" && (!submitCriteria || submitCriteria(focusedIndex))) {
      updateFocusedItem(focusedIndex);
      toggleDropdown(false);
      (_a = inputRef.current) == null ? void 0 : _a.blur();
      onSubmit == null ? void 0 : onSubmit(value, focusedIndex, focusedItemData);
      if (focusedIndex >= 0) {
        onSelect == null ? void 0 : onSelect(value, focusedIndex, focusedItemData);
      }
      updateFocusedItem(-1, focusedValue != null ? focusedValue : void 0);
    }
  }, [
    focusedIndex,
    focusedValue,
    focusedItemData,
    onSelect,
    onSubmit,
    submitCriteria,
    toggleDropdown,
    updateFocusedItem,
    value
  ]);
  const handleFocus = useCallback4(() => {
    toggleDropdown(true);
    updateFocusedItem(-1);
    onFocus == null ? void 0 : onFocus(value);
  }, [onFocus, toggleDropdown, updateFocusedItem, value]);
  return /* @__PURE__ */ jsx8(
    "input",
    {
      ref: inputRef,
      className,
      placeholder,
      value,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      id: generateDropdownId(screenReaderUUID, -1),
      autoComplete: "off",
      "aria-describedby": screenReaderUUID,
      "aria-activedescendant": isTyping ? "" : generateDropdownId(screenReaderUUID, focusedIndex),
      "aria-label": ariaLabel
    }
  );
}

// src/components/Dropdown/DropdownMenu.tsx
import { Fragment as Fragment2, jsx as jsx9 } from "react/jsx-runtime";
function DropdownMenu({ children }) {
  const { isActive } = useDropdownContext();
  if (!isActive) {
    return null;
  }
  return /* @__PURE__ */ jsx9(Fragment2, { children });
}

// src/hooks/useComposedCssClasses.tsx
import { useMemo as useMemo2 } from "react";
import { extendTailwindMerge } from "tailwind-merge";
var twMerge = extendTailwindMerge({
  classGroups: {
    form: ["input", "checkbox", "textarea", "select", "multiselect", "radio"].map((v) => "form-" + v)
  }
});
function useComposedCssClasses(builtInClasses, customClasses) {
  return useMemo2(() => {
    const mergedCssClasses = __spreadValues({}, builtInClasses);
    if (!customClasses) {
      return mergedCssClasses;
    }
    Object.keys(customClasses).forEach((key) => {
      const builtIn = builtInClasses[key];
      const custom = customClasses[key];
      if (!builtIn || !custom) {
        mergedCssClasses[key] = custom || builtIn;
      } else {
        mergedCssClasses[key] = twMerge(builtIn, custom);
      }
    });
    return mergedCssClasses;
  }, [builtInClasses, customClasses]);
}

// src/components/SearchButton.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function SearchButton({ handleClick, className }) {
  return /* @__PURE__ */ jsx10(
    "button",
    {
      className,
      onClick: handleClick,
      "aria-label": "Submit Search",
      children: /* @__PURE__ */ jsx10(MagnifyingGlassIcon, {})
    }
  );
}

// src/components/utils/processTranslation.ts
function processTranslation(args) {
  if (args.count != null && args.pluralForm && args.count !== 1) {
    return args.pluralForm;
  } else {
    return args.phrase;
  }
}

// src/components/utils/renderHighlightedValue.tsx
import { Fragment as Fragment3, jsx as jsx11 } from "react/jsx-runtime";
var defaultCssClasses = {
  highlighted: "font-normal",
  nonHighlighted: "font-semibold"
};
function renderHighlightedValue(highlightedValueOrString, customCssClasses) {
  const { value = "", matchedSubstrings } = typeof highlightedValueOrString === "string" ? { value: highlightedValueOrString, matchedSubstrings: [] } : highlightedValueOrString;
  const cssClasses = __spreadValues(__spreadValues({}, defaultCssClasses), customCssClasses);
  if (!matchedSubstrings || matchedSubstrings.length === 0) {
    return /* @__PURE__ */ jsx11("span", { children: value });
  }
  const substrings = [...matchedSubstrings];
  substrings.sort((a, b) => a.offset - b.offset);
  const highlightedJSX = [];
  let curr = 0;
  for (const { offset, length } of substrings) {
    if (offset > curr) {
      highlightedJSX.push(
        /* @__PURE__ */ jsx11("span", { className: cssClasses.nonHighlighted, children: value.substring(curr, offset) }, curr)
      );
    }
    highlightedJSX.push(
      /* @__PURE__ */ jsx11("span", { className: cssClasses.highlighted, children: value.substring(offset, offset + length) }, offset)
    );
    curr = offset + length;
  }
  if (curr < value.length) {
    highlightedJSX.push(
      /* @__PURE__ */ jsx11("span", { className: cssClasses.nonHighlighted, children: value.substring(curr) }, curr)
    );
  }
  return /* @__PURE__ */ jsx11(Fragment3, { children: highlightedJSX });
}

// src/components/utils/renderAutocompleteResult.tsx
import { Fragment as Fragment4, jsx as jsx12, jsxs as jsxs4 } from "react/jsx-runtime";
var builtInCssClasses = {
  option: "whitespace-no-wrap max-w-full px-3 text-neutral-dark truncate",
  icon: "w-6 h-full flex-shrink-0 text-gray-400"
};
function renderAutocompleteResult(result, cssClasses = {}, Icon, ariaLabel) {
  return /* @__PURE__ */ jsxs4(Fragment4, { children: [
    Icon && /* @__PURE__ */ jsx12("div", { className: cssClasses.icon, children: /* @__PURE__ */ jsx12(Icon, {}) }),
    /* @__PURE__ */ jsx12("div", { "aria-label": ariaLabel || "", className: cssClasses.option, children: renderHighlightedValue(result, cssClasses) })
  ] });
}

// src/hooks/useAnalytics.ts
import { createContext as createContext4, useContext as useContext4 } from "react";
var AnalyticsContext = createContext4(null);
function useAnalytics() {
  return useContext4(AnalyticsContext);
}

// src/hooks/useSearchBarAnalytics.ts
import { useSearchState } from "@yext/search-headless-react";
function useSearchBarAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const queryId = useSearchState((state) => state.query.queryId);
  const reportAutocompleteEvent = (suggestedSearchText) => {
    analytics == null ? void 0 : analytics.report(__spreadProps(__spreadValues({
      type: "AUTO_COMPLETE_SELECTION"
    }, queryId && { queryId }), {
      suggestedSearchText
    }));
  };
  const reportSearchClearEvent = () => {
    if (!queryId) {
      console.error("Unable to report a search clear event. Missing field: queryId.");
      return;
    }
    analytics == null ? void 0 : analytics.report({
      type: "SEARCH_CLEAR_BUTTON",
      queryId,
      verticalKey
    });
  };
  const reportAnalyticsEvent = (analyticsEventType, suggestedSearchText) => {
    if (!analytics) {
      return;
    }
    analyticsEventType === "AUTO_COMPLETE_SELECTION" ? reportAutocompleteEvent(suggestedSearchText || "") : reportSearchClearEvent();
  };
  return reportAnalyticsEvent;
}

// src/models/verticalLink.ts
var isVerticalLink = (obj) => {
  return typeof obj === "object" && !!obj && "verticalKey" in obj;
};

// src/utils/filterutils.tsx
import { Matcher as Matcher2 } from "@yext/search-headless-react";
import isEqual from "lodash/isEqual";

// src/models/NumberRangeFilter.ts
import { Matcher } from "@yext/search-headless-react";
function isNumberRangeFilter(unknownFilter = {}) {
  const filter = unknownFilter;
  return filter.matcher === Matcher.Between && isNumberRangeValue(filter.value);
}

// src/utils/filterutils.tsx
function isNearFilterValue(obj) {
  return typeof obj === "object" && !!obj && "radius" in obj && "lat" in obj && "long" in obj;
}
function isNumberRangeValue(obj) {
  return typeof obj === "object" && !!obj && ("start" in obj || "end" in obj);
}
function isStringFacet(facet) {
  return facet.options.length > 0 && typeof facet.options[0].value === "string";
}
function isNumericalFacet(facet) {
  return facet.options.length > 0 && facet.options.some((option) => isNumberRangeFilter(option));
}
function isDuplicateFieldValueFilter(thisFilter, otherFilter) {
  if (thisFilter.fieldId !== otherFilter.fieldId) {
    return false;
  }
  if (thisFilter.matcher !== otherFilter.matcher) {
    return false;
  }
  return isEqual(thisFilter.value, otherFilter.value);
}
function isDuplicateStaticFilter(thisFilter, otherFilter) {
  if (thisFilter.kind === "fieldValue") {
    return otherFilter.kind === "fieldValue" ? isDuplicateFieldValueFilter(thisFilter, otherFilter) : false;
  }
  if (otherFilter.kind === "fieldValue") {
    return false;
  }
  return thisFilter.combinator === otherFilter.combinator && thisFilter.filters.length === otherFilter.filters.length && thisFilter.filters.every((t) => otherFilter.filters.some((o) => isDuplicateStaticFilter(t, o))) && otherFilter.filters.every((o) => thisFilter.filters.some((t) => isDuplicateStaticFilter(o, t)));
}
function findSelectableFieldValueFilter(filter, selectableFilters) {
  return selectableFilters.find((selectableFilter) => {
    const _a = selectableFilter, { displayName: _ } = _a, storedFilter = __objRest(_a, ["displayName"]);
    return isDuplicateFieldValueFilter(storedFilter, filter);
  });
}
function parseNumberRangeInput(minRangeInput, maxRangeInput) {
  const minRange = parseNumber(minRangeInput);
  const maxRange = parseNumber(maxRangeInput);
  return __spreadValues(__spreadValues({}, minRange !== void 0 && {
    start: {
      matcher: Matcher2.GreaterThanOrEqualTo,
      value: minRange
    }
  }), maxRange !== void 0 && {
    end: {
      matcher: Matcher2.LessThanOrEqualTo,
      value: maxRange
    }
  });
}
function parseNumber(num) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    return void 0;
  }
  return parsedNum;
}
function clearStaticRangeFilters(searchActions, fieldIds) {
  var _a, _b, _c;
  const selectedStaticRangeFilters = (_c = (_b = (_a = searchActions.state) == null ? void 0 : _a.filters) == null ? void 0 : _b.static) == null ? void 0 : _c.filter(
    (filter) => isNumberRangeFilter(filter) && filter.selected === true && (!fieldIds || fieldIds.has(filter.fieldId))
  );
  selectedStaticRangeFilters == null ? void 0 : selectedStaticRangeFilters.forEach((filter) => {
    searchActions.setFilterOption(__spreadProps(__spreadValues({}, filter), {
      selected: false
    }));
  });
}
function getSelectedNumericalFacetFields(searchActions) {
  var _a, _b;
  const selectedNumericalFacets = (_b = (_a = searchActions.state.filters.facets) == null ? void 0 : _a.filter(
    (f) => isNumericalFacet(f) && f.options.some((o) => o.selected)
  )) != null ? _b : [];
  return new Set(selectedNumericalFacets.map((f) => f.fieldId));
}
function getSelectableFieldValueFilters(staticFilters) {
  return staticFilters.map((s) => {
    const _a = s, { filter: _b } = _a, _c = _b, { kind } = _c, filterFields = __objRest(_c, ["kind"]), displayFields = __objRest(_a, ["filter"]);
    if (kind === "fieldValue") {
      return __spreadValues(__spreadValues({}, displayFields), filterFields);
    }
    return void 0;
  }).filter((s) => !!s);
}

// src/components/SearchBar.tsx
import { Fragment as Fragment6, jsx as jsx13, jsxs as jsxs5 } from "react/jsx-runtime";
var builtInCssClasses2 = __spreadValues({
  searchBarContainer: "h-12 mb-6",
  inputDivider: "border-t border-gray-200 mx-2.5",
  inputElement: "outline-none flex-grow border-none h-11 pl-5 pr-2 text-neutral-dark text-base placeholder:text-neutral-light",
  searchButtonContainer: " w-8 h-full mx-2 flex flex-col justify-center items-center",
  searchButton: "h-7 w-7",
  focusedOption: "bg-gray-100",
  clearButton: "h-3 w-3 mr-3.5",
  verticalDivider: "mr-0.5",
  recentSearchesIcon: "w-5 mr-1 flex-shrink-0 h-full text-gray-400",
  recentSearchesOption: "whitespace-no-wrap max-w-full px-3 text-neutral-dark truncate",
  recentSearchesNonHighlighted: "font-normal",
  // Swap this to semibold once we apply highlighting to recent searches
  verticalLink: "ml-12 pl-1 text-neutral italic",
  entityPreviewsDivider: "h-px bg-gray-200 mt-1 mb-4 mx-3.5"
}, builtInCssClasses);
function SearchBar({
  placeholder,
  geolocationOptions,
  hideRecentSearches,
  visualAutocompleteConfig,
  showVerticalLinks = false,
  onSelectVerticalLink,
  verticalKeyToLabel,
  recentSearchesLimit = 5,
  customCssClasses,
  onSearch
}) {
  var _a;
  const {
    entityPreviewSearcher,
    renderEntityPreviews,
    includedVerticals,
    universalLimit,
    entityPreviewsDebouncingTime = 500
  } = visualAutocompleteConfig != null ? visualAutocompleteConfig : {};
  const searchActions = useSearchActions2();
  const searchUtilities = useSearchUtilities();
  const reportAnalyticsEvent = useSearchBarAnalytics();
  const query = (_a = useSearchState2((state) => state.query.input)) != null ? _a : "";
  const cssClasses = useComposedCssClasses(builtInCssClasses2, customCssClasses);
  const isVertical = useSearchState2((state) => state.meta.searchType) === SearchTypeEnum2.Vertical;
  const verticalKey = useSearchState2((state) => state.vertical.verticalKey);
  const [autocompleteResponse, executeAutocomplete2, clearAutocompleteData] = useSynchronizedRequest(
    () => executeAutocomplete(searchActions)
  );
  const [
    executeQueryWithNearMeHandling,
    autocompletePromiseRef
  ] = useSearchWithNearMeHandling(geolocationOptions, onSearch);
  const [
    recentSearches,
    setRecentSearch,
    clearRecentSearches
  ] = useRecentSearches(recentSearchesLimit, verticalKey);
  const filteredRecentSearches = recentSearches == null ? void 0 : recentSearches.filter(
    (search) => searchUtilities.isCloseMatch(search.query, query)
  );
  useEffect5(() => {
    if (hideRecentSearches) {
      clearRecentSearches();
    }
  }, [clearRecentSearches, hideRecentSearches]);
  const clearAutocomplete = useCallback5(() => {
    clearAutocompleteData();
    autocompletePromiseRef.current = void 0;
  }, [autocompletePromiseRef, clearAutocompleteData]);
  const executeQuery = useCallback5(() => {
    if (!hideRecentSearches) {
      const input = searchActions.state.query.input;
      input && setRecentSearch(input);
    }
    executeQueryWithNearMeHandling();
  }, [
    searchActions.state.query.input,
    executeQueryWithNearMeHandling,
    hideRecentSearches,
    setRecentSearch
  ]);
  const handleSubmit = useCallback5((value, index, itemData) => {
    value !== void 0 && searchActions.setQuery(value);
    searchActions.setOffset(0);
    searchActions.setFacets([]);
    clearStaticRangeFilters(searchActions);
    if (itemData && isVerticalLink(itemData.verticalLink) && onSelectVerticalLink) {
      onSelectVerticalLink({ verticalLink: itemData.verticalLink, querySource: QuerySource.Autocomplete });
    } else {
      executeQuery();
    }
    if (typeof index === "number" && index >= 0 && !(itemData == null ? void 0 : itemData.isEntityPreview)) {
      reportAnalyticsEvent("AUTO_COMPLETE_SELECTION", value);
    }
  }, [searchActions, executeQuery, onSelectVerticalLink, reportAnalyticsEvent]);
  const [
    entityPreviewsState,
    executeEntityPreviewsQuery
  ] = useEntityPreviews(entityPreviewSearcher, entityPreviewsDebouncingTime);
  const { verticalKeyToResults, isLoading: entityPreviewsLoading } = entityPreviewsState;
  const entityPreviews = renderEntityPreviews == null ? void 0 : renderEntityPreviews(
    entityPreviewsLoading,
    verticalKeyToResults,
    { onClick: handleSubmit, ariaLabel: getAriaLabel }
  );
  const updateEntityPreviews = useCallback5((query2) => {
    if (!renderEntityPreviews || !includedVerticals) {
      return;
    }
    executeEntityPreviewsQuery(query2, universalLimit != null ? universalLimit : {}, includedVerticals);
  }, [executeEntityPreviewsQuery, renderEntityPreviews, includedVerticals, universalLimit]);
  const handleInputFocus = useCallback5((value = "") => {
    searchActions.setQuery(value);
    updateEntityPreviews(value);
    autocompletePromiseRef.current = executeAutocomplete2();
  }, [searchActions, autocompletePromiseRef, executeAutocomplete2, updateEntityPreviews]);
  const handleInputChange = useCallback5((value = "") => {
    searchActions.setQuery(value);
    updateEntityPreviews(value);
    autocompletePromiseRef.current = executeAutocomplete2();
  }, [searchActions, autocompletePromiseRef, executeAutocomplete2, updateEntityPreviews]);
  const handleClickClearButton = useCallback5(() => {
    updateEntityPreviews("");
    handleSubmit("");
    reportAnalyticsEvent("SEARCH_CLEAR_BUTTON");
  }, [handleSubmit, reportAnalyticsEvent, updateEntityPreviews]);
  function renderInput() {
    return /* @__PURE__ */ jsx13(
      DropdownInput,
      {
        className: cssClasses.inputElement,
        placeholder,
        onSubmit: handleSubmit,
        onFocus: handleInputFocus,
        onChange: handleInputChange,
        ariaLabel: "Conduct a search"
      }
    );
  }
  function renderRecentSearches() {
    const recentSearchesCssClasses = {
      icon: cssClasses.recentSearchesIcon,
      option: cssClasses.recentSearchesOption,
      nonHighlighted: cssClasses.recentSearchesNonHighlighted
    };
    return filteredRecentSearches == null ? void 0 : filteredRecentSearches.map((result, i) => /* @__PURE__ */ jsx13(
      DropdownItem,
      {
        className: "flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100",
        focusedClassName: twMerge("flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
        value: result.query,
        onClick: handleSubmit,
        children: renderAutocompleteResult(
          { value: result.query, inputIntents: [] },
          recentSearchesCssClasses,
          HistoryIcon,
          `recent search: ${result.query}`
        )
      },
      i
    ));
  }
  const itemDataMatrix = useMemo3(() => {
    var _a2;
    return (_a2 = autocompleteResponse == null ? void 0 : autocompleteResponse.results.map((result) => {
      var _a3, _b;
      return (_b = (_a3 = result.verticalKeys) == null ? void 0 : _a3.map((verticalKey2) => ({
        verticalLink: { verticalKey: verticalKey2, query: result.value }
      }))) != null ? _b : [];
    })) != null ? _a2 : [];
  }, [autocompleteResponse == null ? void 0 : autocompleteResponse.results]);
  function renderQuerySuggestions() {
    return autocompleteResponse == null ? void 0 : autocompleteResponse.results.map((result, i) => {
      var _a2;
      return /* @__PURE__ */ jsxs5(Fragment5, { children: [
        /* @__PURE__ */ jsx13(
          DropdownItem,
          {
            className: "flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100",
            focusedClassName: twMerge("flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
            value: result.value,
            onClick: handleSubmit,
            children: renderAutocompleteResult(
              result,
              cssClasses,
              MagnifyingGlassIcon,
              `autocomplete suggestion: ${result.value}`
            )
          }
        ),
        showVerticalLinks && !isVertical && ((_a2 = result.verticalKeys) == null ? void 0 : _a2.map((verticalKey2, j) => /* @__PURE__ */ jsx13(
          DropdownItem,
          {
            className: "flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100",
            focusedClassName: twMerge("flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
            value: result.value,
            itemData: itemDataMatrix[i][j],
            onClick: handleSubmit,
            children: renderAutocompleteResult(
              {
                value: `in ${verticalKeyToLabel ? verticalKeyToLabel(verticalKey2) : verticalKey2}`,
                inputIntents: []
              },
              __spreadProps(__spreadValues({}, cssClasses), { option: cssClasses.verticalLink })
            )
          },
          j
        )))
      ] }, i);
    });
  }
  function renderClearButton() {
    return /* @__PURE__ */ jsxs5(Fragment6, { children: [
      /* @__PURE__ */ jsx13(
        "button",
        {
          "aria-label": "Clear the search bar",
          className: cssClasses.clearButton,
          onClick: handleClickClearButton,
          children: /* @__PURE__ */ jsx13(CloseIcon, {})
        }
      ),
      /* @__PURE__ */ jsx13(VerticalDividerIcon, { className: cssClasses.verticalDivider })
    ] });
  }
  const entityPreviewsCount = calculateEntityPreviewsCount(entityPreviews);
  const showEntityPreviewsDivider = entityPreviews && !!((autocompleteResponse == null ? void 0 : autocompleteResponse.results.length) || (filteredRecentSearches == null ? void 0 : filteredRecentSearches.length));
  const hasItems = !!((autocompleteResponse == null ? void 0 : autocompleteResponse.results.length) || (filteredRecentSearches == null ? void 0 : filteredRecentSearches.length) || entityPreviews);
  const screenReaderText = getScreenReaderText(
    autocompleteResponse == null ? void 0 : autocompleteResponse.results.length,
    filteredRecentSearches == null ? void 0 : filteredRecentSearches.length,
    entityPreviewsCount
  );
  const activeClassName = classNames("relative z-10 bg-white border rounded-3xl border-gray-200 w-full overflow-hidden", {
    ["shadow-lg"]: hasItems
  });
  const handleToggleDropdown = useCallback5((isActive) => {
    if (!isActive) {
      clearAutocomplete();
    }
  }, [clearAutocomplete]);
  return /* @__PURE__ */ jsx13("div", { className: cssClasses.searchBarContainer, children: /* @__PURE__ */ jsxs5(
    Dropdown,
    {
      className: "relative bg-white border rounded-3xl border-gray-200 w-full overflow-hidden",
      activeClassName,
      screenReaderText,
      parentQuery: query,
      onToggle: handleToggleDropdown,
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "inline-flex items-center justify-between w-full", children: [
          renderInput(),
          query && renderClearButton(),
          /* @__PURE__ */ jsx13(
            DropdownSearchButton,
            {
              handleSubmit,
              cssClasses
            }
          )
        ] }),
        hasItems && /* @__PURE__ */ jsxs5(StyledDropdownMenu, { cssClasses, children: [
          renderRecentSearches(),
          renderQuerySuggestions(),
          showEntityPreviewsDivider && /* @__PURE__ */ jsx13("div", { className: cssClasses.entityPreviewsDivider }),
          entityPreviews
        ] })
      ]
    }
  ) });
}
function StyledDropdownMenu({ cssClasses, children }) {
  return /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
    /* @__PURE__ */ jsx13("div", { className: cssClasses.inputDivider }),
    /* @__PURE__ */ jsx13("div", { className: "bg-white py-4", children })
  ] });
}
function getScreenReaderText(autocompleteOptions = 0, recentSearchesOptions = 0, entityPreviewsCount = 0) {
  const recentSearchesText = recentSearchesOptions > 0 ? processTranslation({
    phrase: `${recentSearchesOptions} recent search found.`,
    pluralForm: `${recentSearchesOptions} recent searches found.`,
    count: recentSearchesOptions
  }) : "";
  const entityPreviewsText = entityPreviewsCount > 0 ? " " + processTranslation({
    phrase: `${entityPreviewsCount} result preview found.`,
    pluralForm: `${entityPreviewsCount} result previews found.`,
    count: entityPreviewsCount
  }) : "";
  const autocompleteText = autocompleteOptions > 0 ? " " + processTranslation({
    phrase: `${autocompleteOptions} autocomplete suggestion found.`,
    pluralForm: `${autocompleteOptions} autocomplete suggestions found.`,
    count: autocompleteOptions
  }) : "";
  const text = recentSearchesText + autocompleteText + entityPreviewsText;
  if (text === "") {
    return processTranslation({
      phrase: "0 autocomplete suggestion found.",
      pluralForm: "0 autocomplete suggestions found.",
      count: 0
    });
  }
  return text.trim();
}
function DropdownSearchButton({ handleSubmit, cssClasses }) {
  const { toggleDropdown } = useDropdownContext();
  const handleClick = useCallback5(() => {
    handleSubmit();
    toggleDropdown(false);
  }, [handleSubmit, toggleDropdown]);
  return /* @__PURE__ */ jsx13("div", { className: cssClasses.searchButtonContainer, children: /* @__PURE__ */ jsx13(
    SearchButton,
    {
      className: cssClasses.searchButton,
      handleClick
    }
  ) });
}
function getAriaLabel(value) {
  return "result preview: " + value;
}
function calculateEntityPreviewsCount(children) {
  let count = 0;
  recursivelyMapChildren(children, (c) => {
    if (isValidElement3(c) && c.type === DropdownItem) {
      count++;
    }
    return c;
  });
  return count;
}

// src/components/SpellCheck.tsx
import { useSearchState as useSearchState3, useSearchActions as useSearchActions3 } from "@yext/search-headless-react";
import classNames2 from "classnames";
import { useCallback as useCallback6 } from "react";
import { jsx as jsx14, jsxs as jsxs6 } from "react/jsx-runtime";
var builtInCssClasses3 = {
  spellCheckLoading: "opacity-50",
  spellCheckContainer: "text-lg pb-3",
  helpText: "text-neutral",
  link: "text-primary font-bold hover:underline focus:underline"
};
function SpellCheck({
  customCssClasses,
  onClick
}) {
  var _a, _b, _c;
  const verticalKey = (_a = useSearchState3((state) => state.vertical.verticalKey)) != null ? _a : "";
  const cssClasses = useComposedCssClasses(builtInCssClasses3, customCssClasses);
  const correctedQuery = (_b = useSearchState3((state) => state.spellCheck.correctedQuery)) != null ? _b : "";
  const isLoading = useSearchState3((state) => state.searchStatus.isLoading);
  const containerClassNames = classNames2(cssClasses.spellCheckContainer, {
    [(_c = cssClasses.spellCheckLoading) != null ? _c : ""]: isLoading
  });
  const searchActions = useSearchActions3();
  const handleClickSuggestion = useCallback6(() => {
    searchActions.setQuery(correctedQuery);
    onClick ? onClick({ correctedQuery, verticalKey }) : executeSearch(searchActions);
  }, [searchActions, correctedQuery, onClick, verticalKey]);
  if (!correctedQuery) {
    return null;
  }
  return /* @__PURE__ */ jsxs6("div", { className: containerClassNames, children: [
    /* @__PURE__ */ jsx14("span", { className: cssClasses.helpText, children: "Did you mean " }),
    /* @__PURE__ */ jsx14("button", { className: cssClasses.link, onClick: handleClickSuggestion, children: correctedQuery })
  ] });
}

// src/components/DirectAnswer.tsx
import {
  useSearchState as useSearchState6,
  DirectAnswerType as DirectAnswerType2
} from "@yext/search-headless-react";

// src/components/ThumbsFeedback.tsx
import { useSearchState as useSearchState4 } from "@yext/search-headless-react";
import { useCallback as useCallback7, useState as useState6 } from "react";

// src/icons/ThumbIcon.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function ThumbIcon({ className }) {
  return /* @__PURE__ */ jsx15("svg", { className, viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx15("path", { d: "M10.6667 7.33333H14.6366C15.8756 7.33333 16.6814 8.63719 16.1273 9.74536L13.2107 15.5787C12.9283 16.1433 12.3512 16.5 11.7199 16.5H8.37184C8.23557 16.5 8.09982 16.4833 7.96762 16.4502L4.83333 15.6667M10.6667 7.33333V3.16667C10.6667 2.24619 9.92047 1.5 9 1.5H8.92044C8.50414 1.5 8.16667 1.83748 8.16667 2.25377C8.16667 2.84903 7.99047 3.43096 7.66028 3.92624L4.83333 8.16667V15.6667M10.6667 7.33333H9M4.83333 15.6667H3.16667C2.24619 15.6667 1.5 14.9205 1.5 14V9C1.5 8.07953 2.24619 7.33333 3.16667 7.33333H5.25", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
}

// src/components/ThumbsFeedback.tsx
import useIsomorphicLayoutEffect2 from "use-isomorphic-layout-effect";
import { Fragment as Fragment7, jsx as jsx16, jsxs as jsxs7 } from "react/jsx-runtime";
var useLayoutEffect2 = typeof useIsomorphicLayoutEffect2 === "function" ? useIsomorphicLayoutEffect2 : useIsomorphicLayoutEffect2["default"];
var builtInCssClasses4 = {
  thumbsFeedbackContainer: "flex justify-end mt-2 text-sm text-gray-500 font-medium",
  thumbsUpIcon: "ml-3 w-5",
  thumbsDownIcon: "w-5 ml-1 transform rotate-180"
};
function ThumbsFeedback(props) {
  const {
    onClick,
    feedbackText = "Feedback",
    feedbackTextOnSubmission = "Thank you for your feedback!"
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses4, props.customCssClasses);
  const query = useSearchState4((state) => state.query.mostRecentSearch);
  const [isFeedbackProvided, setIsFeedbackProvided] = useState6(false);
  const handleClickThumbsUp = useCallback7(() => {
    onClick("THUMBS_UP");
    setIsFeedbackProvided(true);
  }, [onClick]);
  const handleClickThumbsDown = useCallback7(() => {
    onClick("THUMBS_DOWN");
    setIsFeedbackProvided(true);
  }, [onClick]);
  useLayoutEffect2(() => {
    setIsFeedbackProvided(false);
  }, [query]);
  return /* @__PURE__ */ jsx16("div", { className: cssClasses.thumbsFeedbackContainer, children: isFeedbackProvided ? feedbackTextOnSubmission : /* @__PURE__ */ jsxs7(Fragment7, { children: [
    feedbackText,
    /* @__PURE__ */ jsx16(
      "button",
      {
        className: cssClasses.thumbsUpIcon,
        onClick: handleClickThumbsUp,
        "aria-label": "This answered my question",
        children: /* @__PURE__ */ jsx16(ThumbIcon, {})
      }
    ),
    /* @__PURE__ */ jsx16(
      "button",
      {
        className: cssClasses.thumbsDownIcon,
        onClick: handleClickThumbsDown,
        "aria-label": "This did not answer my question",
        children: /* @__PURE__ */ jsx16(ThumbIcon, {})
      }
    )
  ] }) });
}

// src/hooks/useCardAnalyticsCallback.tsx
import { useCallback as useCallback9 } from "react";

// src/hooks/useCardAnalytics.ts
import {
  DirectAnswerType,
  useSearchState as useSearchState5
} from "@yext/search-headless-react";
import { useCallback as useCallback8 } from "react";
function isDirectAnswer(data) {
  return (data == null ? void 0 : data.type) === DirectAnswerType.FeaturedSnippet || (data == null ? void 0 : data.type) === DirectAnswerType.FieldValue;
}
function useCardAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = useSearchState5((state) => state.vertical.verticalKey);
  const queryId = useSearchState5((state) => state.query.queryId);
  const reportCtaEvent = useCallback8((result, eventType) => {
    let url, entityId, fieldName;
    let directAnswer = false;
    if (isDirectAnswer(result)) {
      url = result.relatedResult.link;
      entityId = result.relatedResult.id;
      fieldName = result.type === DirectAnswerType.FeaturedSnippet ? void 0 : result.fieldName;
      directAnswer = true;
    } else {
      url = result.link;
      entityId = result.id;
    }
    if (!queryId) {
      console.error("Unable to report a CTA event. Missing field: queryId.");
      return;
    }
    if (!entityId) {
      console.error("Unable to report a CTA event. Missing field: entityId.");
      return;
    }
    analytics == null ? void 0 : analytics.report({
      type: eventType,
      entityId,
      searcher: verticalKey ? "VERTICAL" : "UNIVERSAL",
      queryId,
      verticalKey: verticalKey || "",
      url,
      fieldName,
      directAnswer
    });
  }, [analytics, queryId, verticalKey]);
  const reportFeedbackEvent = useCallback8((result, feedbackType) => {
    if (!queryId) {
      console.error("Unable to report a result feedback event. Missing field: queryId.");
      return;
    }
    let directAnswer = false;
    let entityId;
    if (isDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.relatedResult.id;
    } else {
      entityId = result.id;
    }
    analytics == null ? void 0 : analytics.report({
      type: feedbackType,
      entityId,
      searcher: verticalKey ? "VERTICAL" : "UNIVERSAL",
      queryId,
      verticalKey: verticalKey || "",
      directAnswer
    });
  }, [analytics, queryId, verticalKey]);
  const reportAnalyticsEvent = useCallback8((cardResult, analyticsEventType) => {
    if (!analytics) {
      return;
    }
    if (analyticsEventType === "TITLE_CLICK" || analyticsEventType === "CTA_CLICK") {
      reportCtaEvent(cardResult, analyticsEventType);
    }
    if (analyticsEventType === "THUMBS_DOWN" || analyticsEventType === "THUMBS_UP") {
      reportFeedbackEvent(cardResult, analyticsEventType);
    }
  }, [analytics, reportCtaEvent, reportFeedbackEvent]);
  return reportAnalyticsEvent;
}

// src/hooks/useCardAnalyticsCallback.tsx
function useCardAnalyticsCallback(result, analyticsType) {
  const reportAnalyticsEvent = useCardAnalytics();
  return useCallback9(() => {
    reportAnalyticsEvent(result, analyticsType);
  }, [analyticsType, reportAnalyticsEvent, result]);
}

// src/hooks/useCardFeedbackCallback.tsx
import { useCallback as useCallback10 } from "react";
function useCardFeedbackCallback(result) {
  const reportAnalyticsEvent = useCardAnalytics();
  return useCallback10((analyticsType) => {
    reportAnalyticsEvent(result, analyticsType);
  }, [reportAnalyticsEvent, result]);
}

// src/components/FieldValueDirectAnswer.tsx
import {
  BuiltInFieldType
} from "@yext/search-headless-react";
import { useMemo as useMemo4 } from "react";
import { jsx as jsx17, jsxs as jsxs8 } from "react/jsx-runtime";
function FieldValueDirectAnswer2({
  result,
  viewDetailsClickHandler,
  UnknownFieldTypeDisplay,
  cssClasses = {}
}) {
  var _a;
  const title = `${result.entityName} / ${result.fieldName}`;
  const link = (_a = result.relatedResult.link) != null ? _a : result.relatedResult.rawData.landingPageUrl;
  const resultContent = useMemo4(() => {
    return getResultContent(result, UnknownFieldTypeDisplay);
  }, [result, UnknownFieldTypeDisplay]);
  return /* @__PURE__ */ jsxs8("div", { className: cssClasses.answerContainer, children: [
    title && /* @__PURE__ */ jsx17("div", { className: cssClasses.header, children: title }),
    /* @__PURE__ */ jsxs8("div", { className: cssClasses.content, children: [
      /* @__PURE__ */ jsx17("div", { className: cssClasses.body, children: resultContent }),
      link && /* @__PURE__ */ jsx17("div", { className: "mt-4", children: /* @__PURE__ */ jsx17("a", { href: link, className: "text-primary", onClick: viewDetailsClickHandler, children: "View Details" }) })
    ] })
  ] });
}
function DefaultUnknownFieldTypeDisplay({ result }) {
  let val;
  if (typeof result.value !== "string" && typeof result.value !== "number") {
    console.warn(`Unknown field type for direct answer with "${result.fieldApiName}" fieldApiName. Rendering result's value as a string.
Consider using prop "UnknownFieldTypeDisplay" in DirectAnswer component to properly render result of unknown field type.`);
    val = JSON.stringify(result.value);
  } else {
    val = result.value;
  }
  return getTextJsxElement(val);
}
function getResultContent(result, UnknownFieldTypeDisplay = DefaultUnknownFieldTypeDisplay) {
  switch (result.fieldType) {
    case BuiltInFieldType.InstagramHandle:
      return getAnchorTagJsxElement(`https://www.instagram.com/${result.value}`, result.value);
    case BuiltInFieldType.TwitterHandle:
      return getAnchorTagJsxElement(`https://twitter.com/${result.value}`, `@${result.value}`);
    case BuiltInFieldType.FacebookURL:
    case BuiltInFieldType.AndroidAppURL:
    case BuiltInFieldType.IOSAppURL:
      return getAnchorTagJsxElement(result.value);
    case BuiltInFieldType.ComplexURL:
      const url = result.value.url;
      const displayUrl = result.value.preferDisplayUrl ? result.value.displayUrl : url;
      return getAnchorTagJsxElement(url, displayUrl);
    case BuiltInFieldType.URL:
      return Array.isArray(result.value) ? getListJsxElement(result.value, (url2) => getAnchorTagJsxElement(url2)) : getAnchorTagJsxElement(result.value);
    case BuiltInFieldType.Phone:
      return getAnchorTagJsxElement(`tel:${result.value}`, result.value);
    case BuiltInFieldType.Email:
      return getListJsxElement(result.value, (e) => getAnchorTagJsxElement(`mailto:${e}`, e));
    case BuiltInFieldType.Address:
      return getAddressJsxElement(result.value);
    case BuiltInFieldType.RichText:
      console.warn("Rendering markdown for rich text direct answer is currently not supported. Displaying the unrendered markdown string(s) as is.");
      return Array.isArray(result.value) ? getListJsxElement(result.value, (val) => getTextJsxElement(val)) : getTextJsxElement(result.value);
    case BuiltInFieldType.Hours:
      return /* @__PURE__ */ jsx17("div", { children: JSON.stringify(result.value) });
    case "unknown":
      return /* @__PURE__ */ jsx17(UnknownFieldTypeDisplay, { result });
    default:
      return Array.isArray(result.value) ? getListJsxElement(result.value, (val) => getTextJsxElement(val)) : getTextJsxElement(result.value);
  }
}
function getListJsxElement(list, getItemJsxElement) {
  return /* @__PURE__ */ jsx17("ul", { className: "list-disc list-inside", children: list.map((el, i) => /* @__PURE__ */ jsx17("li", { children: getItemJsxElement(el) }, i)) });
}
function getTextJsxElement(text) {
  return /* @__PURE__ */ jsx17("p", { className: "whitespace-pre-wrap", children: text });
}
function getAnchorTagJsxElement(href, displayText) {
  return /* @__PURE__ */ jsx17("a", { href, className: "text-primary", children: displayText != null ? displayText : href });
}
function getAddressJsxElement(address) {
  if (address.extraDescription) {
    return /* @__PURE__ */ jsx17("div", { children: address.extraDescription });
  }
  const formattedCity = address.city ? address.city + "," : "";
  const formattedCityRegionPostalCode = [formattedCity, address.region, address.postalCode].join(" ").trim();
  return /* @__PURE__ */ jsxs8("div", { children: [
    address.line1 && /* @__PURE__ */ jsx17("p", { children: address.line1 }),
    address.line2 && /* @__PURE__ */ jsx17("p", { children: address.line2 }),
    address.line3 && /* @__PURE__ */ jsx17("p", { children: address.line3 }),
    formattedCityRegionPostalCode && /* @__PURE__ */ jsx17("p", { children: formattedCityRegionPostalCode }),
    /* @__PURE__ */ jsx17("p", { children: address.countryCode })
  ] });
}

// src/components/FeaturedSnippetDirectAnswer.tsx
import { useMemo as useMemo5 } from "react";
import { jsx as jsx18, jsxs as jsxs9 } from "react/jsx-runtime";
var unsupportedTextFormats = ["rich_text", "rich_text_v2", "markdown"];
function FeaturedSnippetDirectAnswer({
  result,
  readMoreClickHandler,
  cssClasses = {}
}) {
  var _a;
  const answer = result.fieldType === "multi_line_text" && result.value;
  if (unsupportedTextFormats.includes(result.fieldType)) {
    console.warn("Rendering " + result.fieldType + " direct answer is currently not supported. You can modify your search configuration to convert " + result.fieldType + " to HTML to be rendered on the page.");
  }
  let snippet;
  const snippetValue = useMemo5(() => {
    var _a2;
    return { __html: (_a2 = result.snippet) == null ? void 0 : _a2.value };
  }, [(_a = result.snippet) == null ? void 0 : _a.value]);
  if (result.fieldType === "html") {
    snippet = /* @__PURE__ */ jsx18("div", { dangerouslySetInnerHTML: snippetValue });
  } else {
    snippet = renderHighlightedValue(result.snippet, { highlighted: cssClasses.highlighted });
  }
  const link = result.relatedResult.link || result.relatedResult.rawData.landingPageUrl;
  const name = result.relatedResult.name;
  const snippetLinkMessage = "Read more about ";
  return /* @__PURE__ */ jsxs9("div", { className: cssClasses.answerContainer, children: [
    answer && /* @__PURE__ */ jsx18("div", { className: cssClasses.header, children: answer }),
    /* @__PURE__ */ jsxs9("div", { className: cssClasses.content, children: [
      /* @__PURE__ */ jsx18("div", { className: cssClasses.body, children: snippet }),
      link && name && /* @__PURE__ */ jsxs9("div", { className: "pt-4 text-neutral", children: [
        snippetLinkMessage,
        /* @__PURE__ */ jsx18(
          "a",
          {
            className: "text-primary",
            href: link,
            onClick: readMoreClickHandler,
            children: name
          }
        )
      ] })
    ] })
  ] });
}

// src/components/DirectAnswer.tsx
import { jsx as jsx19, jsxs as jsxs10 } from "react/jsx-runtime";
var builtInCssClasses5 = {
  directAnswerContainer: "",
  directAnswerLoading: "opacity-50",
  answer: "font-bold text-xl text-neutral-dark",
  description: "text-neutral",
  content: "mt-4",
  highlighted: "bg-primary-light",
  answerContainer: "p-4 border border-gray-200 rounded-lg shadow-sm",
  thumbsFeedbackContainer: builtInCssClasses4.thumbsFeedbackContainer,
  thumbsUpIcon: builtInCssClasses4.thumbsUpIcon,
  thumbsDownIcon: builtInCssClasses4.thumbsDownIcon
};
function DirectAnswer({
  customCssClasses,
  UnknownFieldTypeDisplay
}) {
  const directAnswerResult = useSearchState6((state) => state.directAnswer.result);
  const isLoading = useSearchState6((state) => state.searchStatus.isLoading || false);
  const composedCssClasses = useComposedCssClasses(builtInCssClasses5, customCssClasses);
  const handleClickViewDetails = useCardAnalyticsCallback(directAnswerResult, "CTA_CLICK");
  const handleClickFeedbackButton = useCardFeedbackCallback(directAnswerResult);
  if (!directAnswerResult) {
    return null;
  }
  const cssClasses = getCssClassesForAnswerType(composedCssClasses, directAnswerResult.type);
  const containerCssClasses = twMerge(
    cssClasses.directAnswerContainer,
    isLoading && cssClasses.directAnswerLoading
  );
  return /* @__PURE__ */ jsxs10("div", { className: containerCssClasses, children: [
    directAnswerResult.type === DirectAnswerType2.FieldValue ? /* @__PURE__ */ jsx19(
      FieldValueDirectAnswer2,
      {
        result: directAnswerResult,
        cssClasses,
        viewDetailsClickHandler: handleClickViewDetails,
        UnknownFieldTypeDisplay
      }
    ) : /* @__PURE__ */ jsx19(
      FeaturedSnippetDirectAnswer,
      {
        result: directAnswerResult,
        readMoreClickHandler: handleClickViewDetails,
        cssClasses
      }
    ),
    /* @__PURE__ */ jsx19(
      ThumbsFeedback,
      {
        onClick: handleClickFeedbackButton,
        customCssClasses: composedCssClasses
      }
    )
  ] });
}
function getCssClassesForAnswerType(cssClasses, type) {
  const isSnippet = type === DirectAnswerType2.FeaturedSnippet;
  return __spreadProps(__spreadValues({}, cssClasses), {
    header: isSnippet ? cssClasses.answer : cssClasses.description,
    body: isSnippet ? cssClasses.description : cssClasses.answer
  });
}

// src/components/FilterSearch.tsx
import { useSearchActions as useSearchActions4, useSearchState as useSearchState7 } from "@yext/search-headless-react";
import { useCallback as useCallback11, useEffect as useEffect6, useMemo as useMemo6, useState as useState7 } from "react";
import { jsx as jsx20, jsxs as jsxs11 } from "react/jsx-runtime";
var builtInCssClasses6 = {
  filterSearchContainer: "relative mb-2",
  label: "mb-4 text-sm font-medium text-neutral-dark",
  inputElement: "text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral",
  sectionLabel: "text-sm text-neutral-dark font-semibold py-2 px-4",
  focusedOption: "bg-gray-100",
  option: "text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4"
};
function FilterSearch({
  searchFields,
  label,
  placeholder = "Search here...",
  searchOnSelect,
  onSelect,
  sectioned = false,
  customCssClasses
}) {
  const searchActions = useSearchActions4();
  const searchParamFields = searchFields.map((searchField) => {
    return __spreadProps(__spreadValues({}, searchField), { fetchEntities: false });
  });
  const matchingFieldIds = useMemo6(() => {
    const fieldIds = new Set(searchFields.map((s) => s.fieldApiName));
    if (fieldIds.has("builtin.location")) {
      ["builtin.region", "address.countryCode"].forEach((s) => fieldIds.add(s));
    }
    return fieldIds;
  }, [searchFields]);
  const cssClasses = useComposedCssClasses(builtInCssClasses6, customCssClasses);
  const [currentFilter, setCurrentFilter] = useState7();
  const [filterQuery, setFilterQuery] = useState7();
  const staticFilters = useSearchState7((state) => state.filters.static);
  const matchingFilters = useMemo6(() => {
    var _a;
    return (_a = staticFilters == null ? void 0 : staticFilters.filter(
      ({ filter, selected }) => selected && filter.kind === "fieldValue" && matchingFieldIds.has(filter.fieldId)
    )) != null ? _a : [];
  }, [staticFilters, matchingFieldIds]);
  const [
    filterSearchResponse,
    executeFilterSearch,
    clearFilterSearchResponse
  ] = useSynchronizedRequest(
    (inputValue) => {
      setFilterQuery(inputValue);
      return searchActions.executeFilterSearch(inputValue != null ? inputValue : "", sectioned, searchParamFields);
    },
    (e) => console.error("Error occured executing a filter search request.\n", e)
  );
  useEffect6(() => {
    if (matchingFilters.length > 1 && !onSelect) {
      console.warn("More than one selected static filter found that matches the filter search fields: [" + [...matchingFieldIds].join(", ") + "]. Please update the state to remove the extra filters. Picking one filter to display in the input.");
    }
    if (currentFilter && (staticFilters == null ? void 0 : staticFilters.find(
      (f) => isDuplicateStaticFilter(f.filter, currentFilter) && f.selected
    ))) {
      return;
    }
    if (matchingFilters.length === 0) {
      clearFilterSearchResponse();
      setCurrentFilter(void 0);
      setFilterQuery("");
    } else {
      setCurrentFilter(matchingFilters[0].filter);
      executeFilterSearch(matchingFilters[0].displayName);
    }
  }, [
    clearFilterSearchResponse,
    currentFilter,
    staticFilters,
    executeFilterSearch,
    onSelect,
    matchingFilters,
    matchingFieldIds
  ]);
  const sections = useMemo6(() => {
    var _a;
    return (_a = filterSearchResponse == null ? void 0 : filterSearchResponse.sections.filter((section) => section.results.length > 0)) != null ? _a : [];
  }, [filterSearchResponse == null ? void 0 : filterSearchResponse.sections]);
  const hasResults = sections.flatMap((s) => s.results).length > 0;
  const handleSelectDropdown = useCallback11((_value, _index, itemData) => {
    const newFilter = itemData == null ? void 0 : itemData.filter;
    const newDisplayName = itemData == null ? void 0 : itemData.displayName;
    if (!newFilter || !newDisplayName) {
      return;
    }
    if (onSelect) {
      if (searchOnSelect) {
        console.warn("Both searchOnSelect and onSelect props were passed to the component. Using onSelect instead of searchOnSelect as the latter is deprecated.");
      }
      return onSelect({
        newFilter,
        newDisplayName,
        currentFilter,
        setCurrentFilter,
        executeFilterSearch
      });
    }
    if (matchingFilters.length > 1) {
      console.warn("More than one selected static filter found that matches the filter search fields: [" + [...matchingFieldIds].join(", ") + "]. Unselecting all existing matching filters and selecting the new filter.");
    }
    matchingFilters.forEach((f) => searchActions.setFilterOption({ filter: f.filter, selected: false }));
    if (currentFilter) {
      searchActions.setFilterOption({ filter: currentFilter, selected: false });
    }
    searchActions.setFilterOption({ filter: newFilter, displayName: newDisplayName, selected: true });
    setCurrentFilter(newFilter);
    executeFilterSearch(newDisplayName);
    if (searchOnSelect) {
      searchActions.setOffset(0);
      searchActions.resetFacets();
      executeSearch(searchActions);
    }
  }, [
    currentFilter,
    searchActions,
    executeFilterSearch,
    onSelect,
    searchOnSelect,
    matchingFilters,
    matchingFieldIds
  ]);
  const meetsSubmitCritera = useCallback11((index) => index >= 0, []);
  const itemDataMatrix = useMemo6(() => {
    return sections.map((section) => {
      return section.results.map((result) => ({
        filter: __spreadProps(__spreadValues({}, result.filter), { kind: "fieldValue" }),
        displayName: result.value
      }));
    });
  }, [sections]);
  function renderDropdownItems() {
    return sections.map((section, sectionIndex) => {
      return /* @__PURE__ */ jsxs11("div", { className: "pb-2", children: [
        section.label && /* @__PURE__ */ jsx20("div", { className: cssClasses.sectionLabel, children: section.label }),
        /* @__PURE__ */ jsx20("div", { className: cssClasses.optionsContainer, children: section.results.map((result, index) => /* @__PURE__ */ jsx20(
          DropdownItem,
          {
            focusedClassName: cssClasses.focusedOption,
            value: result.value,
            itemData: itemDataMatrix[sectionIndex][index],
            children: renderAutocompleteResult(result, cssClasses)
          },
          index
        )) })
      ] }, sectionIndex);
    });
  }
  const handleInputFocus = useCallback11((value = "") => {
    if (value) {
      executeFilterSearch(value);
    }
  }, [executeFilterSearch]);
  return /* @__PURE__ */ jsxs11("div", { className: cssClasses.filterSearchContainer, children: [
    label && /* @__PURE__ */ jsx20("h1", { className: cssClasses.label, children: label }),
    /* @__PURE__ */ jsxs11(
      Dropdown,
      {
        screenReaderText: getScreenReaderText2(sections),
        onSelect: handleSelectDropdown,
        alwaysSelectOption: true,
        parentQuery: filterQuery,
        children: [
          /* @__PURE__ */ jsx20(
            DropdownInput,
            {
              className: cssClasses.inputElement,
              placeholder,
              onChange: executeFilterSearch,
              onFocus: handleInputFocus,
              submitCriteria: meetsSubmitCritera
            }
          ),
          /* @__PURE__ */ jsx20(DropdownMenu, { children: hasResults && /* @__PURE__ */ jsx20("div", { className: "absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 mt-1", children: renderDropdownItems() }) })
        ]
      }
    )
  ] });
}
function getScreenReaderText2(sections) {
  let screenReaderText = processTranslation({
    phrase: "0 autocomplete option found.",
    pluralForm: "0 autocomplete options found.",
    count: 0
  });
  if (sections.length === 0) {
    return screenReaderText;
  }
  const screenReaderPhrases = sections.map((section) => {
    const optionInfo = section.label ? `${section.results.length} ${section.label}` : `${section.results.length}`;
    return processTranslation({
      phrase: `${optionInfo} autocomplete option found.`,
      pluralForm: `${optionInfo} autocomplete options found.`,
      count: section.results.length
    });
  });
  screenReaderText = screenReaderPhrases.join(" ");
  return screenReaderText;
}

// src/components/LocationBias.tsx
import { useSearchActions as useSearchActions5, useSearchState as useSearchState8, LocationBiasMethod } from "@yext/search-headless-react";
import { useState as useState8 } from "react";

// src/icons/LoadingIndicator.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
function LoadingIndicator() {
  return /* @__PURE__ */ jsx21("div", { className: "animate-[rotate_1.4s_linear_infinite]", children: /* @__PURE__ */ jsx21("svg", { className: "[stroke-dasharray:208] origin-[50%_50%] animate-[dash_1.4s_ease-in-out_infinite]", viewBox: "0 0 72 72", children: /* @__PURE__ */ jsx21("circle", { className: "", cx: "36", cy: "36", r: "33", stroke: "black", strokeWidth: "3", fill: "none" }) }) });
}

// src/components/LocationBias.tsx
import { jsx as jsx22, jsxs as jsxs12 } from "react/jsx-runtime";
var builtInCssClasses7 = {
  locationBiasContainer: "text-sm text-neutral text-center justify-center items-center flex flex-col lg:flex-row",
  location: "font-semibold lg:ml-7",
  source: "ml-3 lg:ml-0 whitespace-pre",
  button: "text-primary hover:underline focus:underline ml-7 lg:ml-0",
  loadingIndicatorContainer: "w-4 h-4 ml-3 shrink-0"
};
function LocationBias({
  geolocationOptions,
  customCssClasses
}) {
  const searchActions = useSearchActions5();
  const locationBias = useSearchState8((s) => s.location.locationBias);
  const [isFetchingLocation, setIsFetchingLocation] = useState8(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses7, customCssClasses);
  const loadingIndicatorCss = twMerge(cssClasses.loadingIndicatorContainer, !isFetchingLocation && "invisible");
  if (!(locationBias == null ? void 0 : locationBias.displayName))
    return null;
  const attributionMessage = (locationBias == null ? void 0 : locationBias.method) === LocationBiasMethod.Ip ? " (based on your internet address)" : (locationBias == null ? void 0 : locationBias.method) === LocationBiasMethod.Device ? " (based on your device)" : "";
  async function handleGeolocationClick() {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingLocation(false);
    }
    executeSearch(searchActions);
  }
  return /* @__PURE__ */ jsxs12("div", { className: cssClasses.locationBiasContainer, children: [
    /* @__PURE__ */ jsx22("span", { className: cssClasses.location, children: locationBias.displayName }),
    /* @__PURE__ */ jsxs12("span", { className: cssClasses.source, children: [
      attributionMessage,
      /* @__PURE__ */ jsx22("span", { className: "invisible lg:visible", children: " - " })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "flex flex-row items-center", children: [
      /* @__PURE__ */ jsx22(
        "button",
        {
          className: cssClasses.button,
          onClick: handleGeolocationClick,
          children: "Update your location"
        }
      ),
      /* @__PURE__ */ jsx22("div", { className: loadingIndicatorCss, children: /* @__PURE__ */ jsx22(LoadingIndicator, {}) })
    ] })
  ] });
}

// src/icons/YextIcon.tsx
import { jsx as jsx23 } from "react/jsx-runtime";
function YextIcon() {
  return /* @__PURE__ */ jsx23("svg", { viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx23("path", { d: "M25.517 28.142v.095h-.204v.905h-.066v-.905h-.197v-.095h.467zm.667 0h.066v1h-.066v-.825l-.24.595h-.013l-.24-.595v.825h-.066v-1h.066l.247.61.246-.61zM15 28.8c7.622 0 13.8-6.178 13.8-13.8 0-7.622-6.178-13.8-13.8-13.8C7.378 1.2 1.2 7.378 1.2 15c0 7.622 6.178 13.8 13.8 13.8zM15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0zm.45 16.65v-1.2h6.6v1.2h-2.7v5.4h-1.2v-5.4h-2.7zm-1.599-1.35l.849.849-2.601 2.601 2.601 2.601-.849.849-2.601-2.601L8.649 22.2l-.849-.849 2.601-2.601L7.8 16.149l.849-.849 2.601 2.601 2.601-2.601zM18.675 9a2.175 2.175 0 00-1.847 3.323l2.995-2.995A2.163 2.163 0 0018.675 9zm0 5.55a3.375 3.375 0 112.833-5.209l-3.789 3.788a2.175 2.175 0 003.13-1.954h1.201a3.375 3.375 0 01-3.375 3.375zm-7.425-3.734L13.78 7.8l.92.771-2.85 3.397v2.582h-1.2v-2.582L7.8 8.57l.92-.771 2.53 3.016z" }) });
}

// src/hooks/useGeolocationHandler.ts
import { Matcher as Matcher3, useSearchActions as useSearchActions6, useSearchState as useSearchState9 } from "@yext/search-headless-react";
import { useCallback as useCallback12, useState as useState9 } from "react";
var GEOLOCATION_FIELD_ID = "builtin.location";
var LOCATION_FIELD_IDS = [GEOLOCATION_FIELD_ID, "builtin.region", "address.countryCode"];
var METERS_PER_MILE = 1609.344;
function useGeolocationHandler({
  geolocationOptions,
  radius = 50,
  handleUserPosition
}) {
  const [isFetchingUserLocation, setIsFetchingUserLocation] = useState9(false);
  const searchActions = useSearchActions6();
  const staticFilters = useSearchState9((s) => s.filters.static || []);
  const defaultHandleUserPosition = useCallback12((position) => {
    const { latitude, longitude, accuracy } = position.coords;
    const locationFilter = {
      displayName: "Current Location",
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: GEOLOCATION_FIELD_ID,
        matcher: Matcher3.Near,
        value: {
          lat: latitude,
          lng: longitude,
          radius: Math.max(accuracy, radius * METERS_PER_MILE)
        }
      }
    };
    const nonLocationFilters = staticFilters.filter((filter) => {
      return !(filter.filter.kind === "fieldValue" && LOCATION_FIELD_IDS.includes(filter.filter.fieldId));
    });
    searchActions.setStaticFilters([...nonLocationFilters, locationFilter]);
    executeSearch(searchActions);
  }, [radius, searchActions, staticFilters]);
  const geolocationHandler = useCallback12(async () => {
    setIsFetchingUserLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      (handleUserPosition != null ? handleUserPosition : defaultHandleUserPosition)(position);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFetchingUserLocation(false);
    }
  }, [setIsFetchingUserLocation, geolocationOptions, handleUserPosition, defaultHandleUserPosition]);
  return [geolocationHandler, isFetchingUserLocation];
}

// src/components/Geolocation.tsx
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
var builtInCssClasses8 = {
  geolocationContainer: "text-sm text-neutral text-center justify-center items-center flex flex-row",
  button: "text-primary font-semibold hover:underline focus:underline",
  iconContainer: "w-4 ml-2"
};
function Geolocation({
  geolocationOptions,
  radius = 50,
  label = "Use my location",
  //TODO: replace default icon with SVG create from design team
  GeolocationIcon = YextIcon,
  handleClick,
  customCssClasses
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses8, customCssClasses);
  const [handleGeolocationClick, isFetchingUserLocation] = useGeolocationHandler({
    geolocationOptions,
    radius,
    handleUserPosition: handleClick
  });
  return /* @__PURE__ */ jsxs13("div", { className: cssClasses.geolocationContainer, children: [
    /* @__PURE__ */ jsx24("button", { className: cssClasses.button, onClick: handleGeolocationClick, children: label }),
    /* @__PURE__ */ jsx24("div", { className: cssClasses.iconContainer, children: isFetchingUserLocation ? /* @__PURE__ */ jsx24(LoadingIndicator, {}) : /* @__PURE__ */ jsx24(GeolocationIcon, {}) })
  ] });
}

// src/components/AppliedFilters.tsx
import { useSearchState as useSearchState15 } from "@yext/search-headless-react";
import classNames3 from "classnames";

// src/hooks/useClearFiltersCallback.ts
import { useSearchActions as useSearchActions7, useSearchState as useSearchState10 } from "@yext/search-headless-react";
import { useCallback as useCallback13 } from "react";
function useClearFiltersCallback() {
  const searchActions = useSearchActions7();
  const staticFilters = useSearchState10((state) => state.filters.static);
  return useCallback13(() => {
    searchActions.setOffset(0);
    searchActions.resetFacets();
    staticFilters && searchActions.setStaticFilters(staticFilters.map((f) => {
      return __spreadProps(__spreadValues({}, f), {
        selected: false
      });
    }));
    executeSearch(searchActions);
  }, [searchActions, staticFilters]);
}

// src/components/AppliedFiltersDisplay.tsx
import { useSearchActions as useSearchActions8 } from "@yext/search-headless-react";
import { jsx as jsx25, jsxs as jsxs14 } from "react/jsx-runtime";
function AppliedFiltersDisplay(props) {
  const {
    nlpFilterDisplayNames = [],
    removableFilters = [],
    cssClasses = {}
  } = props;
  const handleClickClearAllButton = useClearFiltersCallback();
  const searchActions = useSearchActions8();
  if (removableFilters.length + nlpFilterDisplayNames.length === 0) {
    return null;
  }
  const dedupedNlpFilterDisplayNames = nlpFilterDisplayNames.filter((displayName) => {
    return !removableFilters.some((f) => f.displayName === displayName);
  });
  const dedupedRemovableFilters = getDedupedRemovableFilters(removableFilters);
  function handleRemoveDedupedFilter(dedupedFilter) {
    var _a;
    dedupedFilter.handleRemove();
    for (const f of (_a = dedupedFilter.duplicates) != null ? _a : []) {
      f.handleRemove();
    }
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }
  return /* @__PURE__ */ jsxs14("div", { className: cssClasses.appliedFiltersContainer, "aria-label": "Applied filters to current search", children: [
    dedupedNlpFilterDisplayNames.map((displayName, i) => renderNlpFilter(displayName, i, cssClasses)),
    dedupedRemovableFilters.map((f, i) => {
      return renderRemovableFilter(f.displayName, () => handleRemoveDedupedFilter(f), i, cssClasses);
    }),
    removableFilters.length > 0 && /* @__PURE__ */ jsx25("button", { onClick: handleClickClearAllButton, className: cssClasses.clearAllButton, children: "Clear All" })
  ] });
}
function getDedupedRemovableFilters(filters) {
  const dedupedFilters = [];
  for (const f of filters) {
    const preexistingDupe = dedupedFilters.find((d) => isDuplicateFieldValueFilter(d.filter, f.filter));
    if (!preexistingDupe) {
      dedupedFilters.push(f);
    } else {
      if (!preexistingDupe.duplicates) {
        preexistingDupe.duplicates = [f];
      } else {
        preexistingDupe.duplicates.push(f);
      }
    }
  }
  return dedupedFilters;
}
function renderRemovableFilter(displayName, handleRemove, index, cssClasses) {
  return /* @__PURE__ */ jsxs14("div", { className: cssClasses.removableFilter, children: [
    /* @__PURE__ */ jsx25("div", { className: cssClasses.filterLabel, children: displayName }),
    /* @__PURE__ */ jsx25(
      "button",
      {
        className: "w-2 h-2 text-neutral m-1.5",
        onClick: handleRemove,
        "aria-label": `Remove "${displayName}" filter`,
        children: /* @__PURE__ */ jsx25(CloseIcon, {})
      }
    )
  ] }, `${displayName}-${index}`);
}
function renderNlpFilter(displayName, index, cssClasses) {
  return /* @__PURE__ */ jsx25("div", { className: cssClasses.nlpFilter, children: /* @__PURE__ */ jsx25("span", { className: cssClasses.filterLabel, children: displayName }) }, `${displayName}-${index}`);
}

// src/components/Filters/HierarchicalFacetDisplay.tsx
import { useCallback as useCallback14, useState as useState10 } from "react";

// src/hooks/useHierarchicalFacetTree.ts
import { useMemo as useMemo7 } from "react";
function useHierarchicalFacetTree(hierarchicalFacet, delimiter) {
  return useMemo7(() => {
    return parseHierarchicalFacetTree(hierarchicalFacet, delimiter);
  }, [delimiter, hierarchicalFacet]);
}
function parseHierarchicalFacetTree(hierarchicalFacet, delimiter) {
  const optionsInAscendingLength = (hierarchicalFacet == null ? void 0 : hierarchicalFacet.options.map((o) => {
    const displayNameTokens = o.displayName.split(delimiter).map((s) => s.trim());
    return __spreadProps(__spreadValues({}, o), {
      displayNameTokens
    });
  }).sort((a, b) => a.displayNameTokens.length - b.displayNameTokens.length)) || [];
  const tree = {};
  optionsInAscendingLength.forEach((o) => {
    const {
      displayNameTokens,
      displayName
    } = o;
    let currentTree = tree;
    let parentNode = void 0;
    for (const token of displayNameTokens.slice(0, -1)) {
      if (!(token in currentTree)) {
        console.error(
          `Error parsing hierarchical facet option "${displayName}" at token "${token}". Current tree:`,
          JSON.stringify(tree)
        );
        return;
      }
      if (o.selected) {
        currentTree[token].hasSelectedChild = true;
      }
      parentNode = currentTree[token];
      currentTree = currentTree[token].childTree;
    }
    const lastDisplayNameToken = displayNameTokens[displayNameTokens.length - 1];
    currentTree[lastDisplayNameToken] = {
      selected: o.selected,
      displayNameTokens,
      lastDisplayNameToken,
      facetOption: {
        value: o.value,
        matcher: o.matcher
      },
      hasSelectedChild: false,
      childTree: {},
      parentNode
    };
  });
  return tree;
}

// src/components/Filters/FiltersContext.ts
import { createContext as createContext5, useContext as useContext5 } from "react";
var FiltersContext = createContext5(null);
function useFiltersContext() {
  const filtersContextInstance = useContext5(FiltersContext);
  if (filtersContextInstance === null) {
    throw new Error("Tried to use FiltersContext when none exists.");
  }
  return filtersContextInstance;
}

// src/components/Filters/HierarchicalFacetDisplay.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var DEFAULT_HIERARCHICAL_DELIMITER = ">";
var builtInCssClasses9 = {
  treeContainer: "flex flex-col items-start",
  allCategoriesOption___active: "font-semibold mb-2 text-sm",
  allCategoriesOption___inactive: "mb-2 text-sm",
  availableOption__active: "font-semibold ml-4 mb-2 text-sm",
  availableOption__inactive: "ml-4 mb-2 text-sm",
  parentCategory: "mb-2 text-sm",
  currentCategory: "font-semibold mb-2 text-sm",
  showMoreButton: "ml-4 text-sm font-medium text-primary"
};
function HierarchicalFacetDisplay({
  facet,
  delimiter = DEFAULT_HIERARCHICAL_DELIMITER,
  showMoreLimit = 4,
  customCssClasses
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses9, customCssClasses);
  const tree = useHierarchicalFacetTree(facet, delimiter);
  const [isShowingMore, setIsShowingMore] = useState10(false);
  const resetShowMore = useCallback14(() => setIsShowingMore(false), []);
  const toggleShowMore = useCallback14(() => {
    setIsShowingMore(!isShowingMore);
  }, [isShowingMore]);
  function renderTree() {
    let treePointer = tree;
    const renderedNodesAndShowMoreButton = [renderAllCategoriesButton()];
    while (treePointer) {
      const currentNodes = Object.values(treePointer);
      const selectedChildNode = currentNodes.find((n) => n.selected);
      const selectedHasNoChildren = selectedChildNode && Object.values(selectedChildNode.childTree).length === 0;
      const activeParentNode = currentNodes.find((n) => n.hasSelectedChild);
      if (!selectedChildNode && !activeParentNode || selectedHasNoChildren) {
        renderedNodesAndShowMoreButton.push(...renderAvailableOptions(currentNodes));
        if (currentNodes.length > showMoreLimit) {
          renderedNodesAndShowMoreButton.push(renderShowMoreButton());
        }
        break;
      }
      const activeNode = selectedChildNode != null ? selectedChildNode : activeParentNode;
      if (!activeNode) {
        break;
      }
      renderedNodesAndShowMoreButton.push(
        renderCategory(activeNode, facet.fieldId)
      );
      treePointer = activeNode.childTree;
    }
    return renderedNodesAndShowMoreButton;
  }
  function renderAllCategoriesButton() {
    return /* @__PURE__ */ jsx26(
      AllCategories,
      {
        activeClassName: cssClasses.allCategoriesOption___active,
        inactiveClassName: cssClasses.allCategoriesOption___inactive,
        facet,
        resetShowMore
      },
      "_AllCategories"
    );
  }
  function renderAvailableOptions(nodes) {
    const nodesToRender = isShowingMore ? nodes : nodes.slice(0, showMoreLimit);
    return nodesToRender.map(
      (n) => /* @__PURE__ */ jsx26(
        AvailableOption,
        {
          activeClassName: cssClasses.availableOption__active,
          inactiveClassName: cssClasses.availableOption__inactive,
          fieldId: facet.fieldId,
          currentNode: n,
          resetShowMore,
          siblingNodes: nodes.filter((siblingNode) => siblingNode !== n)
        },
        n.lastDisplayNameToken
      )
    );
  }
  function renderShowMoreButton() {
    return /* @__PURE__ */ jsx26(
      ShowMoreButton,
      {
        className: cssClasses.showMoreButton,
        isShowingMore,
        toggleShowMore
      },
      "_ShowMoreButton"
    );
  }
  function renderCategory(selectedNode, fieldId) {
    const sharedProps = {
      key: selectedNode.lastDisplayNameToken,
      resetShowMore,
      selectedNode,
      fieldId
    };
    if (selectedNode.hasSelectedChild) {
      return /* @__PURE__ */ jsx26(ParentCategory, __spreadValues({ className: cssClasses.parentCategory }, sharedProps));
    } else {
      return /* @__PURE__ */ jsx26(CurrentCategory, __spreadValues({ className: cssClasses.currentCategory }, sharedProps));
    }
  }
  return /* @__PURE__ */ jsx26("div", { className: cssClasses.treeContainer, children: renderTree() });
}
function AllCategories({ facet, inactiveClassName, activeClassName, resetShowMore }) {
  const { applyFilters, selectFilter } = useFiltersContext();
  const handleClickAllCategories = useCallback14(() => {
    facet.options.filter((o) => o.selected).forEach((o) => selectFilter(__spreadProps(__spreadValues({}, o), { fieldId: facet.fieldId, selected: false })));
    applyFilters();
    resetShowMore();
  }, [applyFilters, facet.fieldId, facet.options, resetShowMore, selectFilter]);
  if (facet.options.find((o) => o.selected)) {
    return /* @__PURE__ */ jsx26(
      "button",
      {
        className: inactiveClassName,
        onClick: handleClickAllCategories,
        children: "All Categories /"
      }
    );
  }
  return /* @__PURE__ */ jsx26("div", { className: activeClassName, children: "All Categories" });
}
function AvailableOption(props) {
  var _a;
  const { fieldId, currentNode, activeClassName, inactiveClassName, resetShowMore, siblingNodes } = props;
  const { applyFilters, selectFilter } = useFiltersContext();
  const { selected, lastDisplayNameToken, facetOption } = currentNode;
  const handleClickAvailableOptions = useCallback14(() => {
    var _a2;
    siblingNodes.filter((n) => n.selected).forEach((n) => selectFilter(__spreadProps(__spreadValues({}, n.facetOption), {
      selected: false,
      fieldId
    })));
    selectFilter(__spreadProps(__spreadValues({}, facetOption), {
      selected: !selected,
      fieldId
    }));
    const parentFacetOption = (_a2 = currentNode.parentNode) == null ? void 0 : _a2.facetOption;
    parentFacetOption && selectFilter(__spreadProps(__spreadValues({}, parentFacetOption), {
      selected,
      fieldId
    }));
    applyFilters();
    resetShowMore();
  }, [
    applyFilters,
    (_a = currentNode.parentNode) == null ? void 0 : _a.facetOption,
    facetOption,
    fieldId,
    resetShowMore,
    selectFilter,
    selected,
    siblingNodes
  ]);
  return /* @__PURE__ */ jsx26(
    "button",
    {
      className: selected ? activeClassName : inactiveClassName,
      onClick: handleClickAvailableOptions,
      children: lastDisplayNameToken
    }
  );
}
function ParentCategory({ fieldId, selectedNode, className, resetShowMore }) {
  const { applyFilters, selectFilter } = useFiltersContext();
  const deselectChildOptions = useCallback14((node) => {
    const tree = node.childTree;
    Object.values(tree).forEach((n) => {
      selectFilter(__spreadProps(__spreadValues({}, n.facetOption), {
        selected: false,
        fieldId
      }));
      deselectChildOptions(n);
    });
  }, [fieldId, selectFilter]);
  const handleClickParentCategory = useCallback14(() => {
    selectFilter(__spreadProps(__spreadValues({}, selectedNode.facetOption), {
      selected: true,
      fieldId
    }));
    deselectChildOptions(selectedNode);
    applyFilters();
    resetShowMore();
  }, [applyFilters, deselectChildOptions, fieldId, resetShowMore, selectFilter, selectedNode]);
  return /* @__PURE__ */ jsx26("button", { className, onClick: handleClickParentCategory, children: selectedNode.lastDisplayNameToken + " /" });
}
function CurrentCategory({ fieldId, selectedNode, className, resetShowMore }) {
  var _a;
  const { applyFilters, selectFilter } = useFiltersContext();
  const handleClickCurrentCategory = useCallback14(() => {
    var _a2;
    selectFilter(__spreadProps(__spreadValues({}, selectedNode.facetOption), {
      selected: false,
      fieldId
    }));
    const parentFacetOption = (_a2 = selectedNode.parentNode) == null ? void 0 : _a2.facetOption;
    parentFacetOption && selectFilter(__spreadProps(__spreadValues({}, parentFacetOption), {
      selected: true,
      fieldId
    }));
    applyFilters();
    resetShowMore();
  }, [
    applyFilters,
    fieldId,
    resetShowMore,
    selectFilter,
    selectedNode.facetOption,
    (_a = selectedNode.parentNode) == null ? void 0 : _a.facetOption
  ]);
  return /* @__PURE__ */ jsx26(
    "button",
    {
      className,
      onClick: handleClickCurrentCategory,
      children: selectedNode.lastDisplayNameToken
    }
  );
}
function ShowMoreButton({ className, isShowingMore, toggleShowMore }) {
  return /* @__PURE__ */ jsx26("button", { className, onClick: toggleShowMore, children: isShowingMore ? "Show less" : "Show more" });
}

// src/hooks/useNlpFilterDisplayNames.ts
import { useSearchState as useSearchState11 } from "@yext/search-headless-react";
import { useMemo as useMemo8 } from "react";
function useNlpFilterDisplayNames(removableFilters, hiddenFields) {
  const nlpFilters = useSearchState11((state) => state.vertical.appliedQueryFilters);
  return useMemo8(() => {
    var _a;
    return (_a = nlpFilters == null ? void 0 : nlpFilters.filter(({ filter }) => {
      if (hiddenFields.includes(filter.fieldId)) {
        return false;
      }
      const duplicateFilter = removableFilters.find((f) => isDuplicateFieldValueFilter(f, filter));
      return !duplicateFilter;
    }).map((f) => f.displayValue)) != null ? _a : [];
  }, [hiddenFields, nlpFilters, removableFilters]);
}

// src/hooks/useRemovableFilters.ts
import { useSearchState as useSearchState14, useSearchActions as useSearchActions10 } from "@yext/search-headless-react";
import isEqual2 from "lodash/isEqual";
import { useMemo as useMemo10 } from "react";

// src/utils/isDescendantHierarchicalFacet.tsx
function isDescendantHierarchicalFacet(descendantTokens, parentTokens) {
  if (descendantTokens.length <= parentTokens.length) {
    return false;
  }
  for (let i = 0; i < parentTokens.length; i++) {
    if (descendantTokens[i] !== parentTokens[i]) {
      return false;
    }
  }
  return true;
}

// src/hooks/useStateUpdatedOnSearch.ts
import { useSearchState as useSearchState12 } from "@yext/search-headless-react";
import { useRef as useRef7 } from "react";
function useStateUpdatedOnSearch(stateSelector) {
  const isLoading = useSearchState12((state) => state.searchStatus.isLoading);
  const wasLoading = useRef7(isLoading);
  const currentState = useSearchState12(stateSelector);
  const snapshottedState = useRef7(currentState);
  if (!isLoading && wasLoading.current) {
    snapshottedState.current = currentState;
  }
  wasLoading.current = isLoading;
  return snapshottedState.current;
}

// src/hooks/useRemovableStaticFilters.ts
import { useSearchState as useSearchState13, useSearchActions as useSearchActions9 } from "@yext/search-headless-react";
import { useMemo as useMemo9 } from "react";
function useRemovableStaticFilters(hiddenFields) {
  const staticFilters = useStateUpdatedOnSearch((state) => state.filters.static);
  const hasResults = !!useSearchState13((state) => state.vertical.results);
  const searchActions = useSearchActions9();
  return useMemo9(() => {
    if (!hasResults || !staticFilters) {
      return [];
    }
    function handleRemoveStaticFilterOption(filter) {
      searchActions.setFilterOption({
        filter: __spreadProps(__spreadValues({}, filter), { kind: "fieldValue" }),
        selected: false
      });
    }
    return getSelectableFieldValueFilters(staticFilters).filter((f) => f.selected && !hiddenFields.includes(f.fieldId)).map((f) => {
      var _a;
      return {
        displayName: (_a = f.displayName) != null ? _a : "",
        handleRemove: () => handleRemoveStaticFilterOption(f),
        filter: f
      };
    });
  }, [hasResults, hiddenFields, searchActions, staticFilters]);
}

// src/hooks/useRemovableFilters.ts
function useRemovableFilters(hierarchicalFieldIds, hierarchicalDelimiter, hiddenFields) {
  const facets = useStateUpdatedOnSearch((state) => state.filters.facets);
  const hasResults = !!useSearchState14((state) => state.vertical.results);
  const searchActions = useSearchActions10();
  const removableStaticFilters = useRemovableStaticFilters(hiddenFields);
  return useMemo10(() => {
    var _a;
    if (!hasResults) {
      return [];
    }
    const removableFacets = (_a = facets == null ? void 0 : facets.filter((f) => !hiddenFields.includes(f.fieldId)).flatMap((f) => {
      if (hierarchicalFieldIds == null ? void 0 : hierarchicalFieldIds.includes(f.fieldId)) {
        return processHierarchicalFacet(f, hierarchicalDelimiter, searchActions, facets);
      }
      return processRegularFacet(f, searchActions);
    })) != null ? _a : [];
    return [...removableStaticFilters, ...removableFacets];
  }, [
    facets,
    hasResults,
    hiddenFields,
    hierarchicalDelimiter,
    hierarchicalFieldIds,
    searchActions,
    removableStaticFilters
  ]);
}
function processRegularFacet(f, searchActions) {
  return f.options.filter((o) => o.selected).map((option) => {
    const filter = {
      value: option.value,
      matcher: option.matcher,
      fieldId: f.fieldId
    };
    return {
      displayName: option.displayName,
      handleRemove: () => handleRemoveFacetOption(filter, searchActions),
      filter
    };
  });
}
function processHierarchicalFacet(f, delimiter, searchActions, facets) {
  function createAppliedFilter(o, tokens) {
    const filter = {
      matcher: o.matcher,
      value: o.value,
      fieldId: f.fieldId
    };
    const handleRemove = () => handleRemoveHierarchicalFacetOption(filter, tokens, delimiter, searchActions, facets);
    return {
      displayName: tokens[tokens.length - 1],
      handleRemove,
      filter,
      tokens
    };
  }
  return f.options.filter((o) => o.selected).flatMap((selectedOption) => {
    const displayNameTokens = splitDisplayName(selectedOption.displayName, delimiter);
    const appliedFacets = [createAppliedFilter(selectedOption, displayNameTokens)];
    f.options.forEach((option) => {
      const tokens = splitDisplayName(option.displayName, delimiter);
      const isDescendant = isDescendantHierarchicalFacet(
        displayNameTokens,
        tokens
      );
      if (!isDescendant) {
        return;
      }
      appliedFacets.push(createAppliedFilter(option, tokens));
    });
    appliedFacets.sort((a, b) => a.tokens.length - b.tokens.length);
    return appliedFacets;
  });
}
function handleRemoveHierarchicalFacetOption(filter, displayNameTokens, delimiter, searchActions, facets) {
  searchActions.setFacetOption(filter.fieldId, {
    matcher: filter.matcher,
    value: filter.value
  }, false);
  facets == null ? void 0 : facets.filter((f) => f.fieldId === filter.fieldId).flatMap((f) => f.options).forEach((o) => {
    if (!o.selected) {
      return;
    }
    const tokensToCheck = splitDisplayName(o.displayName, delimiter);
    if (isDescendantHierarchicalFacet(tokensToCheck, displayNameTokens)) {
      searchActions.setFacetOption(filter.fieldId, {
        matcher: o.matcher,
        value: o.value
      }, false);
    }
  });
  const parentTokens = displayNameTokens.slice(0, -1);
  const parentOption = facets == null ? void 0 : facets.filter((f) => f.fieldId === filter.fieldId).flatMap((f) => f.options).find((o) => {
    const tokens = splitDisplayName(o.displayName, delimiter);
    return isEqual2(tokens, parentTokens);
  });
  parentOption && searchActions.setFacetOption(filter.fieldId, {
    matcher: parentOption.matcher,
    value: parentOption.value
  }, true);
}
function handleRemoveFacetOption({ fieldId, matcher, value }, searchActions) {
  if (isNearFilterValue(value)) {
    console.error("A FieldValueFilter with a NearFilterValue is not a supported RemovableFilter.");
    return;
  }
  searchActions.setFacetOption(fieldId, { matcher, value }, false);
}
function splitDisplayName(displayName, delimiter) {
  return displayName.split(delimiter).map((s) => s.trim());
}

// src/components/AppliedFilters.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var builtInCssClasses10 = {
  // Use negative margin to remove space above the filters on mobile
  appliedFiltersContainer: "flex flex-wrap -mt-3 md:mt-0 mb-2",
  appliedFiltersLoading: "opacity-50",
  nlpFilter: "border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2",
  removableFilter: "flex items-center border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2 mb-2",
  clearAllButton: "text-sm font-medium text-primary hover:underline focus:underline mb-2"
};
var DEFAULT_HIDDEN_FIELDS = ["builtin.entityType"];
function AppliedFilters(props) {
  var _a;
  const isLoading = useSearchState15((state) => state.searchStatus.isLoading);
  const {
    hiddenFields = DEFAULT_HIDDEN_FIELDS,
    customCssClasses = {},
    hierarchicalFacetsDelimiter = DEFAULT_HIERARCHICAL_DELIMITER,
    hierarchicalFacetsFieldIds
  } = props;
  const removableFilters = useRemovableFilters(
    hierarchicalFacetsFieldIds,
    hierarchicalFacetsDelimiter,
    hiddenFields
  );
  const nlpFilterDisplayNames = useNlpFilterDisplayNames(removableFilters.map((f) => f.filter), hiddenFields);
  const cssClasses = useComposedCssClasses(builtInCssClasses10, customCssClasses);
  cssClasses.appliedFiltersContainer = classNames3(cssClasses.appliedFiltersContainer, {
    [(_a = cssClasses.appliedFiltersLoading) != null ? _a : ""]: isLoading
  });
  return /* @__PURE__ */ jsx27(
    AppliedFiltersDisplay,
    {
      removableFilters,
      nlpFilterDisplayNames,
      cssClasses
    }
  );
}

// src/components/UniversalResults.tsx
import { useSearchState as useSearchState17 } from "@yext/search-headless-react";

// src/components/VerticalResultsDisplay.tsx
import classNames4 from "classnames";
import { jsx as jsx28 } from "react/jsx-runtime";
var builtInCssClasses11 = {
  verticalResultsLoading: "opacity-50"
};
function VerticalResultsDisplay(props) {
  var _a;
  const {
    CardComponent,
    results,
    isLoading = false,
    customCssClasses
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses11, customCssClasses);
  if (results.length === 0) {
    return null;
  }
  const resultsClassNames = classNames4(cssClasses.verticalResultsContainer, {
    [(_a = cssClasses.verticalResultsLoading) != null ? _a : ""]: isLoading
  });
  return /* @__PURE__ */ jsx28("div", { className: resultsClassNames, children: results == null ? void 0 : results.map((result) => renderResult(CardComponent, result)) });
}
function renderResult(CardComponent, result) {
  return /* @__PURE__ */ jsx28(CardComponent, { result }, result.id || result.index);
}

// src/components/cards/standard/StandardCardDisplay.tsx
import PropTypes from "prop-types";
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
var builtInCssClasses12 = {
  container: "flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm",
  header: "flex text-neutral-dark",
  body: "flex justify-end pt-2.5 text-base",
  cta1: "whitespace-nowrap bg-primary text-white font-medium rounded-lg py-2 px-5 shadow",
  cta2: "whitespace-nowrap bg-white text-primary font-medium rounded-lg py-2 px-5 mt-2 shadow",
  title: "text-lg font-medium",
  thumbsFeedbackContainer: "flex justify-end mt-4 text-sm text-gray-500 font-medium",
  thumbsUpIcon: builtInCssClasses4.thumbsUpIcon,
  thumbsDownIcon: builtInCssClasses4.thumbsDownIcon
};
function StandardCardDisplay(props) {
  var _a;
  const {
    title,
    link,
    description,
    customCssClasses,
    clickHandlers,
    showFeedbackButtons,
    cta1,
    cta2
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses12, customCssClasses);
  function renderTitle(title2, link2) {
    const titleJsx = renderHighlightedValue(title2, { highlighted: "font-bold", nonHighlighted: "font-medium" });
    return link2 ? /* @__PURE__ */ jsx29("a", { href: link2, className: "text-lg font-medium text-primary hover:underline focus:underline", onClick: clickHandlers.handleTitleClick, children: titleJsx }) : /* @__PURE__ */ jsx29("div", { className: cssClasses.title, children: titleJsx });
  }
  function renderCTAs(cta12, cta22) {
    if (cta12 || cta22) {
      return /* @__PURE__ */ jsxs15("div", { className: "flex flex-col justify-end ml-4", children: [
        cta12 && /* @__PURE__ */ jsx29("button", { className: cssClasses.cta1, onClick: clickHandlers.handleCtaClick, children: cta12.label }),
        cta22 && /* @__PURE__ */ jsx29("button", { className: cssClasses.cta2, onClick: clickHandlers.handleCtaClick, children: cta22.label })
      ] });
    }
    return null;
  }
  function renderDescription(text) {
    if (text) {
      return /* @__PURE__ */ jsx29("div", { className: "w-full", children: renderHighlightedValue(text, { highlighted: "font-semibold", nonHighlighted: "font-normal" }) });
    }
    return null;
  }
  function renderFeedbackIcons() {
    if (showFeedbackButtons) {
      return /* @__PURE__ */ jsx29(
        ThumbsFeedback,
        {
          feedbackText: "",
          onClick: clickHandlers.handleFeedbackClick,
          customCssClasses: cssClasses
        }
      );
    }
    return null;
  }
  return /* @__PURE__ */ jsxs15("div", { className: cssClasses.container, children: [
    /* @__PURE__ */ jsx29("div", { className: cssClasses.header, children: renderTitle(title, link) }),
    ((_a = description != null ? description : cta1) != null ? _a : cta2) && /* @__PURE__ */ jsxs15("div", { className: cssClasses.body, children: [
      renderDescription(description),
      renderCTAs(cta1, cta2)
    ] }),
    renderFeedbackIcons()
  ] });
}
StandardCardDisplay.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      matchedSubstrings: PropTypes.arrayOf(PropTypes.shape({
        length: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired
      })).isRequired
    })
  ]).isRequired,
  link: PropTypes.string,
  description: PropTypes.string,
  cta1: PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkType: PropTypes.string.isRequired
  }),
  cta2: PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkType: PropTypes.string.isRequired
  })
};

// src/components/cards/standard/StandardCard.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
function StandardCard(props) {
  var _a, _b, _c, _d, _e;
  const {
    result,
    customCssClasses,
    showFeedbackButtons
  } = props;
  const data = {
    title: (_c = (_b = (_a = result.highlightedFields) == null ? void 0 : _a.name) != null ? _b : result.name) != null ? _c : result.rawData.name,
    description: (_e = (_d = result.highlightedFields) == null ? void 0 : _d.description) != null ? _e : result.rawData.description,
    cta1: result.rawData.c_primaryCTA,
    cta2: result.rawData.c_secondaryCTA
  };
  const clickHandlers = {
    handleCtaClick: useCardAnalyticsCallback(result, "CTA_CLICK"),
    handleTitleClick: useCardAnalyticsCallback(result, "TITLE_CLICK"),
    handleFeedbackClick: useCardFeedbackCallback(result)
  };
  return /* @__PURE__ */ jsx30(
    StandardCardDisplay,
    {
      customCssClasses,
      showFeedbackButtons,
      clickHandlers,
      title: data.title,
      link: result.link,
      description: data.description,
      cta1: data.cta1,
      cta2: data.cta2
    }
  );
}

// src/components/sections/StandardSection.tsx
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
var builtInCssClasses13 = {
  section: ""
};
function StandardSection(props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses13, props.customCssClasses);
  const { results, CardComponent = StandardCard, header } = props;
  if (results.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs16("section", { className: cssClasses.section, children: [
    header,
    /* @__PURE__ */ jsx31(
      VerticalResultsDisplay,
      {
        results,
        CardComponent,
        customCssClasses: cssClasses
      }
    )
  ] });
}

// src/icons/CollectionIcon.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
function CollectionIcon() {
  return /* @__PURE__ */ jsx32("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx32("path", { d: "M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17", stroke: "#1f2937", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
}

// src/components/sections/SectionHeader.tsx
import { useSearchState as useSearchState16 } from "@yext/search-headless-react";
import classNames5 from "classnames";
import { useCallback as useCallback15 } from "react";
import { jsx as jsx33, jsxs as jsxs17 } from "react/jsx-runtime";
var FALLBACK_CSS_CLASSES = {};
var builtInCssClasses14 = {
  sectionHeaderContainer: "flex items-center w-full pl-1 mb-4",
  sectionHeaderIconContainer: "w-5 h-5",
  sectionHeaderLabel: "font-bold text-neutral-dark text-base pl-3",
  viewMoreContainer: "flex justify-end flex-grow ml-auto font-medium text-neutral-dark",
  viewMoreLink: "text-primary pr-1 pl-3",
  appliedFiltersContainer: "ml-3 flex flex-wrap",
  nlpFilter: "border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2",
  removableFilter: "flex items-center border border-gray-200 rounded-3xl px-3 py-1.5 text-sm font-medium text-neutral-dark mr-2"
};
function SectionHeader(props) {
  var _a;
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedQueryFilters,
    cssClasses = FALLBACK_CSS_CLASSES,
    getViewAllUrl
  } = props;
  const latestQuery = useSearchState16((state) => state.query.mostRecentSearch);
  const nlpFilterDisplayNames = appliedQueryFilters == null ? void 0 : appliedQueryFilters.map((f) => f.displayValue);
  const analytics = useAnalytics();
  const queryId = useSearchState16((state) => state.query.queryId);
  const isLoading = useSearchState16((state) => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = classNames5(cssClasses.appliedFiltersContainer, {
    [(_a = cssClasses.appliedFiltersLoading) != null ? _a : ""]: isLoading
  });
  const href = getViewAllUrl ? getViewAllUrl({ verticalKey, query: latestQuery }) : `/${verticalKey}?query=${latestQuery}`;
  const handleClickViewAllButton = useCallback15(() => {
    if (!analytics) {
      return;
    }
    if (!queryId) {
      console.error("Unable to report a vertical view all event. Missing field: queryId.");
      return;
    }
    analytics == null ? void 0 : analytics.report({
      type: "VERTICAL_VIEW_ALL",
      queryId,
      verticalKey
    });
  }, [analytics, queryId, verticalKey]);
  return /* @__PURE__ */ jsxs17("div", { className: cssClasses.sectionHeaderContainer, children: [
    /* @__PURE__ */ jsx33("div", { className: cssClasses.sectionHeaderIconContainer, children: /* @__PURE__ */ jsx33(CollectionIcon, {}) }),
    /* @__PURE__ */ jsx33("h2", { className: cssClasses.sectionHeaderLabel, children: label }),
    appliedQueryFilters && /* @__PURE__ */ jsx33(AppliedFiltersDisplay, { nlpFilterDisplayNames, cssClasses }),
    viewAllButton && /* @__PURE__ */ jsx33("div", { className: cssClasses.viewMoreContainer, children: /* @__PURE__ */ jsx33("a", { className: cssClasses.viewMoreLink, href, children: /* @__PURE__ */ jsx33("button", { onClick: handleClickViewAllButton, children: "View all" }) }) })
  ] });
}

// src/components/UniversalResults.tsx
import classNames6 from "classnames";
import { Fragment as Fragment8, jsx as jsx34 } from "react/jsx-runtime";
var builtInCssClasses15 = __spreadValues({
  universalResultsContainer: "space-y-8",
  universalResultsLoading: "opacity-50"
}, builtInCssClasses14);
function UniversalResults({
  verticalConfigMap,
  showAppliedFilters,
  customCssClasses
}) {
  var _a;
  const cssClasses = useComposedCssClasses(builtInCssClasses15, customCssClasses);
  const resultsFromAllVerticals = useSearchState17((state) => {
    var _a2;
    return (_a2 = state == null ? void 0 : state.universal) == null ? void 0 : _a2.verticals;
  }) || [];
  const isLoading = useSearchState17((state) => state.searchStatus.isLoading);
  if (resultsFromAllVerticals.length === 0) {
    return null;
  }
  const resultsClassNames = classNames6(cssClasses.universalResultsContainer, {
    [(_a = cssClasses.universalResultsLoading) != null ? _a : ""]: isLoading
  });
  return /* @__PURE__ */ jsx34("div", { className: resultsClassNames, children: renderVerticalSections({ resultsFromAllVerticals, showAppliedFilters, verticalConfigMap, cssClasses }) });
}
function renderVerticalSections(props) {
  const { resultsFromAllVerticals, verticalConfigMap, cssClasses } = props;
  return /* @__PURE__ */ jsx34(Fragment8, { children: resultsFromAllVerticals.filter((verticalResults) => verticalResults.results).map((verticalResults) => {
    var _a;
    const verticalKey = verticalResults.verticalKey;
    const verticalConfig = verticalConfigMap[verticalKey] || {};
    const label = (_a = verticalConfig.label) != null ? _a : verticalKey;
    const results = verticalResults.results;
    const SectionComponent = verticalConfig.SectionComponent || StandardSection;
    const appliedQueryFilters = props.showAppliedFilters ? verticalResults.appliedQueryFilters : void 0;
    return /* @__PURE__ */ jsx34(
      SectionComponent,
      {
        results,
        verticalKey,
        header: /* @__PURE__ */ jsx34(SectionHeader, __spreadValues({}, {
          label,
          appliedQueryFilters,
          verticalKey,
          viewAllButton: verticalConfig.viewAllButton,
          getViewAllUrl: verticalConfig.getViewAllUrl,
          cssClasses
        })),
        CardComponent: verticalConfig.CardComponent
      },
      verticalKey
    );
  }) });
}

// src/components/VerticalResults.tsx
import { useSearchState as useSearchState18 } from "@yext/search-headless-react";
import { jsx as jsx35 } from "react/jsx-runtime";
function VerticalResults(props) {
  const _a = props, { displayAllOnNoResults = true } = _a, otherProps = __objRest(_a, ["displayAllOnNoResults"]);
  const verticalResults = useSearchState18((state) => state.vertical.results) || [];
  const allResultsForVertical = useSearchState18((state) => {
    var _a2, _b;
    return (_b = (_a2 = state.vertical) == null ? void 0 : _a2.noResults) == null ? void 0 : _b.allResultsForVertical.results;
  }) || [];
  const isLoading = useSearchState18((state) => state.searchStatus.isLoading);
  let results = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }
  return /* @__PURE__ */ jsx35(VerticalResultsDisplay, __spreadValues({ results, isLoading }, otherProps));
}

// src/components/Pagination.tsx
import { useSearchState as useSearchState20, useSearchActions as useSearchActions11 } from "@yext/search-headless-react";

// src/icons/ChevronIcon.tsx
import { jsx as jsx36 } from "react/jsx-runtime";
function ChevronIcon({ className }) {
  return /* @__PURE__ */ jsx36(
    "svg",
    {
      viewBox: "0 0 12 8",
      fill: "none",
      stroke: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: /* @__PURE__ */ jsx36("path", { d: "M1.33341 6.5L6.00008 1.83333L10.6667 6.5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}

// src/hooks/usePaginationAnalytics.ts
import { useSearchState as useSearchState19 } from "@yext/search-headless-react";
function usePaginationAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = useSearchState19((state) => state.vertical.verticalKey);
  const queryId = useSearchState19((state) => state.query.queryId);
  const reportPaginateEvent = (newPage, currentPage, totalPageCount) => {
    if (!analytics) {
      return;
    }
    if (!queryId) {
      console.error("Unable to report a pagination event. Missing field: queryId.");
      return;
    }
    if (!verticalKey) {
      console.error("Unable to report a pagination event. Missing field: verticalKey.");
      return;
    }
    analytics.report({
      type: "PAGINATE",
      queryId,
      verticalKey,
      newPage,
      currentPage,
      totalPageCount
    });
  };
  return reportPaginateEvent;
}

// src/components/Pagination.tsx
import { useCallback as useCallback16 } from "react";
import classNames7 from "classnames";
import { jsx as jsx37, jsxs as jsxs18 } from "react/jsx-runtime";
var builtInPaginationCssClasses = {
  paginationContainer: "flex justify-center mb-4",
  paginationLoading: "opacity-50",
  label: "z-0 inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 text-neutral",
  selectedLabel: "z-10 inline-flex items-center px-4 py-2 text-sm font-semibold border border-primary text-primary bg-primary-light",
  leftIconContainer: "inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-l-md",
  rightIconContainer: "inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-r-md",
  icon: "w-3 text-gray-600"
};
function Pagination(props) {
  var _a;
  const { customCssClasses = {}, paginateAllOnNoResults = false } = props;
  const cssClasses = useComposedCssClasses(builtInPaginationCssClasses, customCssClasses);
  const searchActions = useSearchActions11();
  const verticalResultsCount = useSearchState20((state) => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical = useSearchState20((state) => {
    var _a2, _b;
    return (_b = (_a2 = state.vertical) == null ? void 0 : _a2.noResults) == null ? void 0 : _b.allResultsForVertical.resultsCount;
  }) || 0;
  const isLoading = useSearchState20((state) => state.searchStatus.isLoading);
  let resultsCount = verticalResultsCount;
  if (verticalResultsCount === 0 && paginateAllOnNoResults) {
    resultsCount = allResultsCountForVertical;
  }
  const offset = useSearchState20((state) => state.vertical.offset) || 0;
  const limit = useSearchState20((state) => state.vertical.limit) || 20;
  const currentPageNumber = offset / limit + 1;
  const maxPageCount = Math.ceil(resultsCount / limit);
  const reportAnalyticsEvent = usePaginationAnalytics();
  const navigateToPage = useCallback16((newPageNumber) => {
    const newOffset = limit * (newPageNumber - 1);
    searchActions.setOffset(newOffset);
    executeSearch(searchActions);
    reportAnalyticsEvent(newPageNumber, currentPageNumber, maxPageCount);
  }, [searchActions, limit, maxPageCount, currentPageNumber, reportAnalyticsEvent]);
  if (maxPageCount <= 1) {
    return null;
  }
  const paginationLabels = generatePaginationLabels(currentPageNumber, maxPageCount);
  const paginationContainerClassNames = classNames7(cssClasses.paginationContainer, {
    [(_a = cssClasses.paginationLoading) != null ? _a : ""]: isLoading
  });
  return /* @__PURE__ */ jsx37("div", { className: paginationContainerClassNames, children: /* @__PURE__ */ jsxs18("nav", { className: "inline-flex shadow-sm -space-x-px", "aria-label": "Pagination", children: [
    /* @__PURE__ */ jsx37(
      PaginationButton,
      {
        ariaLabel: "Navigate to the previous results page",
        className: cssClasses.leftIconContainer,
        navigateToPage,
        newPageNumber: currentPageNumber - 1,
        disabled: currentPageNumber === 1,
        children: /* @__PURE__ */ jsx37(ChevronIcon, { className: cssClasses.icon + " transform -rotate-90" })
      }
    ),
    paginationLabels.map((label, index) => {
      switch (label) {
        case "...":
          return /* @__PURE__ */ jsx37(
            "div",
            {
              className: cssClasses.label,
              children: label
            },
            index
          );
        case `${currentPageNumber}`:
          return /* @__PURE__ */ jsx37(
            PaginationButton,
            {
              className: cssClasses.selectedLabel,
              navigateToPage,
              newPageNumber: currentPageNumber,
              children: label
            },
            index
          );
        default:
          return /* @__PURE__ */ jsx37(
            PaginationButton,
            {
              className: cssClasses.label,
              navigateToPage,
              newPageNumber: Number(label),
              children: label
            },
            index
          );
      }
    }),
    /* @__PURE__ */ jsx37(
      PaginationButton,
      {
        ariaLabel: "Navigate to the next results page",
        className: cssClasses.rightIconContainer,
        navigateToPage,
        newPageNumber: currentPageNumber + 1,
        disabled: currentPageNumber === maxPageCount,
        children: /* @__PURE__ */ jsx37(ChevronIcon, { className: cssClasses.icon + " transform rotate-90" })
      }
    )
  ] }) });
}
function PaginationButton(props) {
  const { navigateToPage, newPageNumber } = props;
  const handleClick = useCallback16(() => {
    navigateToPage(newPageNumber);
  }, [navigateToPage, newPageNumber]);
  return /* @__PURE__ */ jsx37(
    "button",
    {
      "aria-label": props.ariaLabel,
      className: props.className,
      onClick: handleClick,
      disabled: props.disabled,
      children: props.children
    }
  );
}
function generatePaginationLabels(currentPageNumber, maxPageCount) {
  const paginationLabels = [];
  const previousPageNumber = currentPageNumber - 1;
  const nextPageNumber = currentPageNumber + 1;
  if (previousPageNumber > 3) {
    paginationLabels.push("1", "...", `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_, index) => paginationLabels.push(`${index + 1}`));
  }
  paginationLabels.push(`${currentPageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, "...", `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)].forEach((_, index) => paginationLabels.push(`${nextPageNumber + index}`));
  }
  return paginationLabels;
}

// src/icons/StarIcon.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
function StarIcon({ className }) {
  return /* @__PURE__ */ jsx38(
    "svg",
    {
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 18 18",
      className,
      children: /* @__PURE__ */ jsx38("path", { d: "M8.991 0C4.023 0 0 4.032 0 9s4.023 9 8.991 9C13.968 18 18 13.968 18 9s-4.032-9-9.009-9zm3.816 14.4L9 12.105 5.193 14.4l1.008-4.329-3.357-2.907 4.428-.378L9 2.7l1.728 4.077 4.428.378-3.357 2.907z" })
    }
  );
}

// src/components/AlternativeVerticals.tsx
import { useSearchState as useSearchState21 } from "@yext/search-headless-react";
import classNames8 from "classnames";
import { jsx as jsx39, jsxs as jsxs19 } from "react/jsx-runtime";
var builtInCssClasses16 = {
  alternativeVerticalsContainer: "flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm",
  alternativeVerticalsLoading: "opacity-50",
  noResultsText: "text-lg text-neutral-dark pb-2",
  categoriesText: "text-neutral",
  suggestion: "pb-4 flex items-center",
  verticalIcon: "w-4 mr-2"
};
function isVerticalSuggestion(suggestion) {
  return (suggestion == null ? void 0 : suggestion.resultsCount) !== void 0 && (suggestion == null ? void 0 : suggestion.verticalKey) !== void 0;
}
function AlternativeVerticals({
  currentVerticalLabel,
  verticalConfigMap,
  displayAllOnNoResults = true,
  customCssClasses
}) {
  var _a;
  const cssClasses = useComposedCssClasses(builtInCssClasses16, customCssClasses);
  const alternativeVerticals = useSearchState21((state) => {
    var _a2;
    return (_a2 = state.vertical.noResults) == null ? void 0 : _a2.alternativeVerticals;
  }) || [];
  const allResultsForVertical = useSearchState21((state) => {
    var _a2;
    return (_a2 = state.vertical.noResults) == null ? void 0 : _a2.allResultsForVertical.results;
  }) || [];
  const query = useSearchState21((state) => state.query.mostRecentSearch);
  const verticalSuggestions = buildVerticalSuggestions(verticalConfigMap, alternativeVerticals);
  const isShowingAllResults = displayAllOnNoResults && allResultsForVertical.length > 0;
  const isLoading = useSearchState21((state) => state.searchStatus.isLoading);
  const containerClassNames = classNames8(cssClasses.alternativeVerticalsContainer, {
    [(_a = cssClasses.alternativeVerticalsLoading) != null ? _a : ""]: isLoading
  });
  function buildVerticalSuggestions(verticalConfigMap2, alternativeVerticals2) {
    return alternativeVerticals2.filter((alternativeResults) => {
      return !!verticalConfigMap2[alternativeResults.verticalKey];
    }).map((alternativeResults) => {
      return {
        label: verticalConfigMap2[alternativeResults.verticalKey].label,
        verticalKey: alternativeResults.verticalKey,
        resultsCount: alternativeResults.resultsCount
      };
    }).filter(isVerticalSuggestion).filter((verticalSuggestion) => verticalSuggestion.resultsCount > 0);
  }
  if (verticalSuggestions.length <= 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs19("div", { className: containerClassNames, children: [
    renderNoResultsInfo(),
    verticalSuggestions && /* @__PURE__ */ jsxs19("div", { className: "pt-4 text-neutral-dark", children: [
      /* @__PURE__ */ jsxs19("div", { className: cssClasses.categoriesText, children: [
        /* @__PURE__ */ jsx39("span", { children: processTranslation({
          phrase: "The following category yielded results for - ",
          pluralForm: "The following categories yielded results for - ",
          count: verticalSuggestions.length
        }) }),
        /* @__PURE__ */ jsx39("strong", { children: query })
      ] }),
      /* @__PURE__ */ jsx39("ul", { className: "pt-4", children: verticalSuggestions.map(renderSuggestion) })
    ] })
  ] });
  function renderNoResultsInfo() {
    return /* @__PURE__ */ jsxs19("div", { className: cssClasses.noResultsText, children: [
      /* @__PURE__ */ jsxs19("span", { children: [
        "No results found in ",
        currentVerticalLabel,
        "."
      ] }),
      isShowingAllResults && /* @__PURE__ */ jsxs19("span", { children: [
        " Showing all ",
        currentVerticalLabel,
        " instead."
      ] })
    ] });
  }
  function renderSuggestion(suggestion) {
    const resultsCountText = processTranslation({
      phrase: `${suggestion.resultsCount} result`,
      pluralForm: `${suggestion.resultsCount} results`,
      count: suggestion.resultsCount
    });
    return /* @__PURE__ */ jsxs19("li", { className: cssClasses.suggestion, children: [
      /* @__PURE__ */ jsx39("div", { className: cssClasses.verticalIcon, children: /* @__PURE__ */ jsx39(StarIcon, {}) }),
      /* @__PURE__ */ jsxs19("span", { className: "font-bold", children: [
        suggestion.label,
        " - ",
        resultsCountText
      ] })
    ] }, suggestion.verticalKey);
  }
}

// src/components/ResultsCount.tsx
import {
  SearchTypeEnum as SearchTypeEnum3,
  useSearchState as useSearchState22
} from "@yext/search-headless-react";
import classNames9 from "classnames";
import { jsx as jsx40 } from "react/jsx-runtime";
var builtInCssClasses17 = {
  resultsCountContainer: "font-semibold text-neutral mb-4 py-2 mr-2.5 whitespace-nowrap",
  resultsCountLoading: "opacity-50"
};
function ResultsCount({ customCssClasses }) {
  var _a;
  const cssClasses = useComposedCssClasses(builtInCssClasses17, customCssClasses);
  const isLoading = useSearchState22((state) => state.searchStatus.isLoading);
  const resultsCountText = useResultsCount();
  const resultsCountClassnames = classNames9(cssClasses.resultsCountContainer, {
    [(_a = cssClasses.resultsCountLoading) != null ? _a : ""]: isLoading
  });
  return /* @__PURE__ */ jsx40("div", { className: resultsCountClassnames, children: resultsCountText });
}
function useResultsCount() {
  var _a;
  const isVertical = useSearchState22((state) => state.meta.searchType) === SearchTypeEnum3.Vertical;
  const results = useSearchState22((state) => isVertical ? state.vertical : state.universal.verticals);
  const offset = useSearchState22((state) => state.vertical.offset) || 0;
  const limit = useSearchState22((state) => state.vertical.limit) || 20;
  let resultsCount = 0;
  if (results) {
    if (isUniversalSearchResults(results)) {
      results.forEach((resultsOfAVertical) => resultsCount += resultsOfAVertical.resultsCount);
    } else {
      resultsCount = (_a = results.resultsCount) != null ? _a : 0;
    }
  }
  if (resultsCount === 0) {
    return null;
  }
  const resultsCountText = processTranslation({
    phrase: `${resultsCount} Result`,
    pluralForm: `${resultsCount} Results`,
    count: resultsCount
  });
  if (resultsCount > limit && isVertical) {
    const paginateStart = offset + 1;
    const paginateEnd = Math.min(offset + limit, resultsCount);
    const paginateRange = `${paginateStart} - ${paginateEnd}`;
    const resultCountWithPaginationText = `${paginateRange} of ${resultsCount} Results`;
    return resultCountWithPaginationText;
  } else {
    return resultsCountText;
  }
}
function isUniversalSearchResults(data) {
  return Array.isArray(data);
}

// src/components/Filters/CheckboxOption.tsx
import { Matcher as Matcher5 } from "@yext/search-headless-react";
import { useCallback as useCallback17, useEffect as useEffect7, useMemo as useMemo11 } from "react";

// src/components/Filters/FilterGroupContext.ts
import { createContext as createContext6, useContext as useContext6 } from "react";
var FilterGroupContext = createContext6(null);
function useFilterGroupContext() {
  const filterGroupContextInstance = useContext6(FilterGroupContext);
  if (filterGroupContextInstance === null) {
    throw new Error("Tried to use FilterGroupContext when none exists.");
  }
  return filterGroupContextInstance;
}

// src/components/Filters/CheckboxOption.tsx
import classNames10 from "classnames";
import { useId as useId2 } from "@reach/auto-id";
import { jsx as jsx41, jsxs as jsxs20 } from "react/jsx-runtime";
var builtInCssClasses18 = {
  label: "text-neutral text-sm font-normal cursor-pointer",
  label___disabled: "opacity-50 cursor-not-allowed",
  input: "w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary focus:ring-primary",
  input___disabled: "border-gray-200 bg-gray-50 cursor-not-allowed",
  container: "flex items-center",
  optionContainer: "flex items-center space-x-3 peer",
  tooltipContainer: "invisible peer-hover:visible relative -right-5 -top-5",
  tooltip: "absolute z-10 left-0 -top-0.5 whitespace-nowrap rounded shadow-lg p-3 text-sm bg-neutral-dark text-white"
};
function CheckboxOption(props) {
  var _a, _b;
  const { fieldId, isOptionsDisabled } = useFilterGroupContext();
  const {
    value,
    matcher = Matcher5.Equals,
    selectedByDefault = false,
    displayName = props.value,
    resultsCount
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses18, props.customCssClasses);
  const optionId = useId2();
  const { selectFilter, filters, applyFilters } = useFiltersContext();
  const handleClick = useCallback17((checked) => {
    selectFilter({
      matcher,
      fieldId,
      value,
      displayName: typeof displayName === "string" ? displayName : void 0,
      selected: checked
    });
    applyFilters();
  }, [applyFilters, fieldId, displayName, selectFilter, value, matcher]);
  const handleChange = useCallback17((evt) => {
    handleClick(evt.target.checked);
  }, [handleClick]);
  const optionFilter = useMemo11(() => {
    return {
      fieldId,
      matcher,
      value
    };
  }, [fieldId, value, matcher]);
  const existingStoredFilter = findSelectableFieldValueFilter(optionFilter, filters);
  useEffect7(() => {
    if (!existingStoredFilter && selectedByDefault) {
      selectFilter(__spreadProps(__spreadValues({}, optionFilter), {
        displayName: typeof displayName === "string" ? displayName : void 0,
        selected: true
      }));
    }
  }, [displayName, selectFilter, selectedByDefault, existingStoredFilter, optionFilter]);
  const isSelected = existingStoredFilter ? existingStoredFilter.selected : false;
  const labelText = resultsCount ? `${displayName} (${resultsCount})` : displayName;
  const inputClasses = classNames10(cssClasses.input, {
    [(_a = cssClasses.input___disabled) != null ? _a : ""]: isOptionsDisabled
  });
  const labelClasses = classNames10(cssClasses.label, {
    [(_b = cssClasses.label___disabled) != null ? _b : ""]: isOptionsDisabled
  });
  return /* @__PURE__ */ jsxs20("div", { className: cssClasses.container, children: [
    /* @__PURE__ */ jsxs20("div", { className: cssClasses.optionContainer, children: [
      /* @__PURE__ */ jsx41(
        "input",
        {
          type: "checkbox",
          id: optionId,
          checked: isSelected,
          className: inputClasses,
          onChange: handleChange,
          disabled: isOptionsDisabled
        }
      ),
      /* @__PURE__ */ jsx41("label", { className: labelClasses, htmlFor: optionId, children: labelText })
    ] }),
    isOptionsDisabled && /* @__PURE__ */ jsx41("div", { className: cssClasses.tooltipContainer, children: /* @__PURE__ */ jsx41("div", { className: cssClasses.tooltip, children: "Clear the range to select options." }) })
  ] });
}

// src/components/Filters/CollapsibleLabel.tsx
import classNames11 from "classnames";
import { jsx as jsx42, jsxs as jsxs21 } from "react/jsx-runtime";
var builtInCssClasses19 = {
  label: "text-neutral-dark text-sm font-medium text-left"
};
function CollapsibleLabel({ label, customCssClasses }) {
  const { isExpanded, getToggleProps } = useFilterGroupContext();
  const iconClassName = classNames11("w-3 text-gray-400", {
    "transform rotate-180": !isExpanded
  });
  const cssClasses = useComposedCssClasses(builtInCssClasses19, customCssClasses);
  return /* @__PURE__ */ jsxs21("button", __spreadProps(__spreadValues({ className: "w-full flex justify-between items-center mb-4" }, getToggleProps()), { children: [
    /* @__PURE__ */ jsx42("div", { className: cssClasses.label, children: label }),
    /* @__PURE__ */ jsx42(ChevronIcon, { className: iconClassName })
  ] }));
}

// src/components/Filters/CollapsibleSection.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
function CollapsibleSection(props) {
  const {
    className = "space-y-3",
    children
  } = props;
  const { getCollapseProps } = useFilterGroupContext();
  return /* @__PURE__ */ jsx43("div", __spreadProps(__spreadValues({ className }, getCollapseProps()), { children }));
}

// src/components/Filters/FacetsProvider.tsx
import {
  useSearchActions as useSearchActions12,
  useSearchState as useSearchState23
} from "@yext/search-headless-react";
import { useMemo as useMemo12 } from "react";
import { jsx as jsx44 } from "react/jsx-runtime";
function FacetsProvider({
  children,
  className = "w-full",
  searchOnChange = true
}) {
  const searchActions = useSearchActions12();
  const facetsInState = useSearchState23((state) => state.filters.facets);
  const facets = useMemo12(() => facetsInState != null ? facetsInState : [], [facetsInState]);
  const filters = useMemo12(() => {
    return facets.flatMap((f) => f.options.map((o) => {
      return {
        fieldId: f.fieldId,
        value: o.value,
        matcher: o.matcher,
        selected: o.selected,
        displayName: o.displayName
      };
    }));
  }, [facets]);
  const filtersContextInstance = useMemo12(() => {
    return {
      selectFilter(filter) {
        if (typeof filter.value === "object" && !isNumberRangeValue(filter.value)) {
          console.error("Facets only support string, number, boolean, and NumberRangeValue. Found the following object value instead:", filter.value);
          return;
        }
        const facetOption = {
          matcher: filter.matcher,
          value: filter.value
        };
        searchActions.setFacetOption(filter.fieldId, facetOption, filter.selected);
      },
      applyFilters() {
        if (searchOnChange) {
          searchActions.setOffset(0);
          clearStaticRangeFilters(searchActions, getSelectedNumericalFacetFields(searchActions));
          executeSearch(searchActions);
        }
      },
      filters
    };
  }, [searchActions, filters, searchOnChange]);
  return /* @__PURE__ */ jsx44("div", { className, children: /* @__PURE__ */ jsx44(FiltersContext.Provider, { value: filtersContextInstance, children: children == null ? void 0 : children(facets) }) });
}

// src/components/Filters/FilterGroupProvider.tsx
import { useMemo as useMemo13, useState as useState11 } from "react";
import useCollapse from "react-collapsed";
import { jsx as jsx45 } from "react/jsx-runtime";
function FilterGroupProvider(props) {
  const {
    children,
    defaultExpanded = true,
    fieldId
  } = props;
  const [searchValue, setSearchValue] = useState11("");
  const [isOptionsDisabled, setIsOptionsDisabled] = useState11(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const FilterGroupContextInstance = useMemo13(() => {
    return {
      fieldId,
      searchValue,
      setSearchValue,
      getCollapseProps,
      getToggleProps,
      isExpanded,
      isOptionsDisabled,
      setIsOptionsDisabled
    };
  }, [
    fieldId,
    getCollapseProps,
    getToggleProps,
    isExpanded,
    searchValue,
    isOptionsDisabled
  ]);
  return /* @__PURE__ */ jsx45(FilterGroupContext.Provider, { value: FilterGroupContextInstance, children });
}

// src/components/Filters/SearchInput.tsx
import { useCallback as useCallback18 } from "react";
import { jsx as jsx46 } from "react/jsx-runtime";
function SearchInput(props) {
  const {
    className = "text-sm form-input bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:ring-primary focus:ring-0 text-neutral-dark placeholder:text-neutral",
    placeholder = "Search here..."
  } = props;
  const { searchValue, setSearchValue } = useFilterGroupContext();
  const handleChange = useCallback18((e) => {
    setSearchValue(e.target.value);
  }, [setSearchValue]);
  return /* @__PURE__ */ jsx46(
    "input",
    {
      className,
      type: "text",
      placeholder,
      value: searchValue,
      onChange: handleChange
    }
  );
}

// src/components/Filters/StaticFiltersProvider.tsx
import { useSearchActions as useSearchActions13, useSearchState as useSearchState24 } from "@yext/search-headless-react";
import { useMemo as useMemo14 } from "react";
import { jsx as jsx47 } from "react/jsx-runtime";
function StaticFiltersProvider({
  children,
  className = "w-full",
  searchOnChange = true
}) {
  const searchActions = useSearchActions13();
  const displayableFilters = useSearchState24((state) => state.filters.static);
  const filtersContextInstance = useMemo14(() => {
    return {
      selectFilter(filter) {
        const _a = filter, { selected, displayName } = _a, fieldValueFilter = __objRest(_a, ["selected", "displayName"]);
        searchActions.setFilterOption({
          filter: __spreadValues({
            kind: "fieldValue"
          }, fieldValueFilter),
          selected,
          displayName
        });
      },
      applyFilters() {
        if (searchOnChange) {
          searchActions.setOffset(0);
          searchActions.resetFacets();
          executeSearch(searchActions);
        }
      },
      filters: getSelectableFieldValueFilters(displayableFilters != null ? displayableFilters : [])
    };
  }, [searchActions, displayableFilters, searchOnChange]);
  return /* @__PURE__ */ jsx47("div", { className, children: /* @__PURE__ */ jsx47(FiltersContext.Provider, { value: filtersContextInstance, children }) });
}

// src/components/Filters/RangeInput.tsx
import { Matcher as Matcher6, useSearchActions as useSearchActions14, useSearchState as useSearchState25 } from "@yext/search-headless-react";
import { useCallback as useCallback19, useEffect as useEffect8, useMemo as useMemo15, useState as useState12 } from "react";
import classNames12 from "classnames";

// src/icons/InvalidIcon.tsx
import { jsx as jsx48 } from "react/jsx-runtime";
function InvalidIcon() {
  return /* @__PURE__ */ jsx48("svg", { width: "20", height: "18", viewBox: "0 0 20 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx48("path", { d: "M9.99955 7V9M9.99955 13H10.0095M3.07134 17H16.9277C18.4673 17 19.4296 15.3333 18.6598 14L11.7316 2C10.9618 0.666667 9.0373 0.666667 8.2675 2L1.33929 14C0.569492 15.3333 1.53174 17 3.07134 17Z", stroke: "#B91C1C", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
}

// src/components/Filters/RangeInput.tsx
import { jsx as jsx49, jsxs as jsxs22 } from "react/jsx-runtime";
var builtInCssClasses20 = {
  rangeInputContainer: "flex flex-col",
  input: "w-full h-9 form-input cursor-pointer border rounded-md focus:ring-0 text-neutral-dark text-sm text-right appearance-none leading-9",
  input___withPrefix: "pl-[2.5rem]",
  input___withoutPrefix: "px-2",
  input___disabled: "bg-gray-50 placeholder:text-neutral-light cursor-not-allowed",
  input___enabled: "placeholder:text-neutral",
  input___valid: "border-gray-300 focus:border-primary",
  input___invalid: "border-red-700 focus:border-red-700",
  inputContainer: "relative",
  inputRowContainer: "flex flex-row items-center space-x-3 group",
  buttonsContainer: "flex flex-row items-center justify-between pt-2",
  inputPrefix: "absolute left-2 top-2 text-sm",
  inputPrefix___disabled: "text-neutral-light cursor-not-allowed",
  inputPrefix___enabled: "text-neutral",
  applyButton: "text-sm text-primary font-medium",
  clearButton: "text-sm text-neutral font-medium",
  tooltipContainer: "invisible group-hover:visible relative -top-6",
  tooltip: "absolute z-10 left-0 whitespace-nowrap rounded shadow-lg p-3 text-sm bg-neutral-dark text-white",
  invalidMessage: "pl-3 text-sm text-red-700",
  invalidRowContainer: "pt-2 flex flex-row items-center"
};
function RangeInput(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { filters } = useFiltersContext();
  const { fieldId, setIsOptionsDisabled } = useFilterGroupContext();
  const {
    getFilterDisplayName = getDefaultFilterDisplayName,
    inputPrefix
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses20, props.customCssClasses);
  const searchActions = useSearchActions14();
  const [minRangeInput, setMinRangeInput] = useState12("");
  const [maxRangeInput, setMaxRangeInput] = useState12("");
  const staticFilters = useSearchState25((state) => state.filters.static);
  const fieldValueFilters = useMemo15(
    () => getSelectableFieldValueFilters(staticFilters != null ? staticFilters : []),
    [staticFilters]
  );
  const isDisabled = filters.some((filter) => filter.selected && filter.fieldId === fieldId);
  const rangeFilter = useMemo15(() => {
    return {
      kind: "fieldValue",
      fieldId,
      matcher: Matcher6.Between,
      value: parseNumberRangeInput(minRangeInput, maxRangeInput)
    };
  }, [fieldId, maxRangeInput, minRangeInput]);
  const isValid = isValidRange(rangeFilter.value);
  const matchingFilter = findSelectableFieldValueFilter(rangeFilter, fieldValueFilters);
  const isSelectedInAnswersState = (matchingFilter == null ? void 0 : matchingFilter.selected) === true;
  const hasUserInput = !!(minRangeInput || maxRangeInput);
  const shouldRenderApplyButton = hasUserInput && !isSelectedInAnswersState;
  useEffect8(() => {
    setIsOptionsDisabled(hasUserInput);
  }, [hasUserInput, setIsOptionsDisabled]);
  const handleMinChange = useCallback19((event) => {
    var _a2;
    const input = (_a2 = event == null ? void 0 : event.target) == null ? void 0 : _a2.value;
    validateNumericInput(input) && setMinRangeInput(input);
  }, []);
  const handleMaxChange = useCallback19((event) => {
    var _a2;
    const input = (_a2 = event == null ? void 0 : event.target) == null ? void 0 : _a2.value;
    validateNumericInput(input) && setMaxRangeInput(input);
  }, []);
  const handleClickApply = useCallback19(() => {
    if (!rangeFilter.value.start && !rangeFilter.value.end) {
      return;
    }
    if (!isValid) {
      return;
    }
    const displayName = getFilterDisplayName(rangeFilter.value);
    clearStaticRangeFilters(searchActions, /* @__PURE__ */ new Set([fieldId]));
    searchActions.setFilterOption({
      filter: rangeFilter,
      selected: true,
      displayName
    });
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }, [searchActions, fieldId, getFilterDisplayName, isValid, rangeFilter]);
  const handleClickClear = useCallback19(() => {
    const displayName = getFilterDisplayName(rangeFilter.value);
    searchActions.setFilterOption({
      filter: rangeFilter,
      selected: false,
      displayName
    });
    setMinRangeInput("");
    setMaxRangeInput("");
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }, [searchActions, getFilterDisplayName, rangeFilter]);
  const inputClasses = classNames12(cssClasses.input, {
    [(_a = cssClasses.input___withPrefix) != null ? _a : ""]: !!inputPrefix,
    [(_b = cssClasses.input___withoutPrefix) != null ? _b : ""]: !inputPrefix,
    [(_c = cssClasses.input___disabled) != null ? _c : ""]: isDisabled,
    [(_d = cssClasses.input___enabled) != null ? _d : ""]: !isDisabled,
    [(_e = cssClasses.input___invalid) != null ? _e : ""]: !isValid,
    [(_f = cssClasses.input___valid) != null ? _f : ""]: isValid
  });
  const inputPrefixClasses = classNames12(cssClasses.inputPrefix, {
    [(_g = cssClasses.inputPrefix___disabled) != null ? _g : ""]: isDisabled,
    [(_h = cssClasses.inputPrefix___enabled) != null ? _h : ""]: !isDisabled
  });
  function renderInput(value, onChange, placeholder) {
    return /* @__PURE__ */ jsxs22("div", { className: cssClasses.inputContainer, children: [
      inputPrefix && /* @__PURE__ */ jsx49("span", { className: inputPrefixClasses, "aria-hidden": "true", children: inputPrefix }),
      /* @__PURE__ */ jsx49(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          value,
          placeholder,
          disabled: isDisabled,
          className: inputClasses,
          onChange
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs22("div", { className: cssClasses.rangeInputContainer, children: [
    /* @__PURE__ */ jsxs22("div", { className: cssClasses.inputRowContainer, children: [
      renderInput(minRangeInput, handleMinChange, "Min"),
      /* @__PURE__ */ jsx49("div", { className: "w-2.5 text-sm text-neutral", children: "-" }),
      renderInput(maxRangeInput, handleMaxChange, "Max"),
      isDisabled && /* @__PURE__ */ jsx49("div", { className: cssClasses.tooltipContainer, children: /* @__PURE__ */ jsx49("div", { className: cssClasses.tooltip, children: "Unselect an option to enter in a range." }) })
    ] }),
    !isValid && /* @__PURE__ */ jsxs22("div", { className: cssClasses.invalidRowContainer, children: [
      /* @__PURE__ */ jsx49(InvalidIcon, {}),
      /* @__PURE__ */ jsx49("div", { className: cssClasses.invalidMessage, children: "Invalid range" })
    ] }),
    hasUserInput && /* @__PURE__ */ jsxs22("div", { className: cssClasses.buttonsContainer, children: [
      /* @__PURE__ */ jsx49(
        "button",
        {
          className: cssClasses.clearButton,
          onClick: handleClickClear,
          children: "Clear min and max"
        }
      ),
      shouldRenderApplyButton && /* @__PURE__ */ jsx49(
        "button",
        {
          className: cssClasses.applyButton,
          onClick: handleClickApply,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function getDefaultFilterDisplayName(numberRange) {
  const start = numberRange.start;
  const end = numberRange.end;
  if (start && end) {
    return `${start.value} - ${end.value}`;
  } else if (start && !end) {
    return `Over ${start.value}`;
  } else if (end && !start) {
    return `Up to ${end.value}`;
  }
  return "";
}
function validateNumericInput(str) {
  const numberRegex = new RegExp(/^\d*\.?\d*$/);
  return numberRegex.test(str);
}
function isValidRange(range) {
  if (range.start && range.end) {
    return range.start.value <= range.end.value;
  }
  return true;
}

// src/components/FilterGroup.tsx
import { useSearchUtilities as useSearchUtilities2 } from "@yext/search-headless-react";
import { useMemo as useMemo17, useState as useState13 } from "react";

// src/components/FacetTiltle.tsx
import { Fragment as Fragment9, useMemo as useMemo16 } from "react";
import { jsx as jsx50 } from "react/jsx-runtime";
function FacetTitle({
  label,
  customCssClasses,
  collapsible = true
}) {
  const collapsibleLabelCssClasses = useMemo16(() => {
    return {
      label: customCssClasses == null ? void 0 : customCssClasses.titleLabel
    };
  }, [customCssClasses]);
  return /* @__PURE__ */ jsx50(Fragment9, { children: collapsible ? /* @__PURE__ */ jsx50(CollapsibleLabel, { label, customCssClasses: collapsibleLabelCssClasses }) : label && /* @__PURE__ */ jsx50("div", { className: twMerge(
    "mb-4",
    builtInCssClasses19.label,
    collapsibleLabelCssClasses.label
  ), children: label }) });
}

// src/components/FilterGroup.tsx
import { Fragment as Fragment10, jsx as jsx51, jsxs as jsxs23 } from "react/jsx-runtime";
import { createElement as createElement2 } from "react";
function FilterGroup({
  fieldId,
  filterOptions,
  title,
  collapsible = true,
  defaultExpanded = true,
  searchable,
  customCssClasses = {},
  showMoreLimit = filterOptions.length,
  children
}) {
  const cssClasses = useMemo17(() => {
    const _a = customCssClasses, { option, optionLabel, optionInput } = _a, remainingClasses = __objRest(_a, ["option", "optionLabel", "optionInput"]);
    return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, remainingClasses), option && { optionContainer: option }), optionLabel && { label: optionLabel }), optionInput && { input: optionInput });
  }, [customCssClasses]);
  return /* @__PURE__ */ jsxs23(
    FilterGroupProvider,
    {
      fieldId,
      defaultExpanded: !collapsible || defaultExpanded,
      children: [
        /* @__PURE__ */ jsx51(
          FacetTitle,
          {
            label: title,
            customCssClasses,
            collapsible
          }
        ),
        /* @__PURE__ */ jsxs23(CollapsibleSection, { className: cssClasses.optionsContainer, children: [
          searchable && /* @__PURE__ */ jsx51(SearchInput, { className: cssClasses.searchInput }),
          /* @__PURE__ */ jsx51(
            CheckboxOptions,
            {
              filterOptions,
              showMoreLimit,
              cssClasses
            }
          ),
          children
        ] })
      ]
    }
  );
}
function CheckboxOptions({
  filterOptions,
  showMoreLimit,
  cssClasses
}) {
  const searchUtilities = useSearchUtilities2();
  const { searchValue } = useFilterGroupContext();
  const shouldRenderOption = (option) => {
    return searchUtilities.isCloseMatch(option.displayName || option.value.toString(), searchValue);
  };
  let displayedOptions = filterOptions.filter(shouldRenderOption).map((o) => {
    return /* @__PURE__ */ createElement2(
      CheckboxOption,
      __spreadProps(__spreadValues({}, o), {
        key: o.displayName || o.value.toString(),
        customCssClasses: cssClasses
      })
    );
  });
  const isLimited = displayedOptions.length > showMoreLimit;
  const [showAll, setShowAll] = useState13(!isLimited);
  displayedOptions = displayedOptions.slice(0, showAll ? displayedOptions.length : showMoreLimit);
  return /* @__PURE__ */ jsxs23(Fragment10, { children: [
    displayedOptions,
    isLimited && /* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */
    /* @__PURE__ */ jsx51("button", { className: "text-primary py-1 text-sm", onClick: () => setShowAll(!showAll), children: showAll ? "Show Less" : "Show More" })
  ] });
}

// src/components/StaticFilters.tsx
import { jsx as jsx52 } from "react/jsx-runtime";
function StaticFilters(props) {
  const _a = props, { searchOnChange, customCssClasses = {} } = _a, filterGroupProps = __objRest(_a, ["searchOnChange", "customCssClasses"]);
  const _b = customCssClasses, { staticFiltersContainer: containerClassName } = _b, filterGroupCssClasses = __objRest(_b, ["staticFiltersContainer"]);
  return /* @__PURE__ */ jsx52(StaticFiltersProvider, { searchOnChange, className: containerClassName, children: /* @__PURE__ */ jsx52(
    FilterGroup,
    __spreadValues({
      customCssClasses: filterGroupCssClasses
    }, filterGroupProps),
    filterGroupProps.fieldId
  ) });
}

// src/components/StandardFacets.tsx
import { Fragment as Fragment11 } from "react";

// src/components/FilterDivider.tsx
import { jsx as jsx53 } from "react/jsx-runtime";
function FilterDivider({ className }) {
  return /* @__PURE__ */ jsx53("div", { className: twMerge("w-full h-px bg-gray-200 my-4", className) });
}

// src/components/StandardFacets.tsx
import { jsx as jsx54, jsxs as jsxs24 } from "react/jsx-runtime";
function StandardFacets(props) {
  const _a = props, {
    searchOnChange,
    excludedFieldIds = [],
    customCssClasses = {},
    showMoreLimit = 10,
    showOptionCounts = true
  } = _a, filterGroupProps = __objRest(_a, [
    "searchOnChange",
    "excludedFieldIds",
    "customCssClasses",
    "showMoreLimit",
    "showOptionCounts"
  ]);
  return /* @__PURE__ */ jsx54(FacetsProvider, { searchOnChange, className: customCssClasses.standardFacetsContainer, children: (facets) => facets.filter((f) => !excludedFieldIds.includes(f.fieldId) && isStringFacet(f)).map((f, i) => {
    return /* @__PURE__ */ jsxs24(Fragment11, { children: [
      /* @__PURE__ */ jsx54(
        FilterGroup,
        __spreadValues({
          fieldId: f.fieldId,
          filterOptions: f.options.map((o) => {
            return showOptionCounts ? __spreadProps(__spreadValues({}, o), { resultsCount: o.count }) : o;
          }),
          title: f.displayName,
          customCssClasses,
          showMoreLimit,
          searchable: f.options.length > showMoreLimit
        }, filterGroupProps)
      ),
      i < facets.length - 1 && /* @__PURE__ */ jsx54(FilterDivider, { className: customCssClasses.divider })
    ] }, f.fieldId);
  }) });
}

// src/components/HierarchicalFacets.tsx
import { Fragment as Fragment12 } from "react";
import { jsx as jsx55, jsxs as jsxs25 } from "react/jsx-runtime";
function HierarchicalFacets({
  searchOnChange,
  collapsible,
  defaultExpanded,
  includedFieldIds,
  customCssClasses = {},
  delimiter,
  showMoreLimit
}) {
  return /* @__PURE__ */ jsx55(FacetsProvider, { searchOnChange, className: customCssClasses.hierarchicalFacetsContainer, children: (facets) => facets.filter((f) => f.options.length > 0 && includedFieldIds.includes(f.fieldId)).map((f, i) => {
    return /* @__PURE__ */ jsxs25(Fragment12, { children: [
      /* @__PURE__ */ jsxs25(
        FilterGroupProvider,
        {
          fieldId: f.fieldId,
          defaultExpanded: !collapsible || defaultExpanded,
          children: [
            collapsible ? /* @__PURE__ */ jsx55(CollapsibleLabel, { label: f.displayName }) : f.displayName && /* @__PURE__ */ jsx55("div", { className: "text-neutral-dark text-sm font-medium text-left mb-4", children: f.displayName }),
            /* @__PURE__ */ jsx55(CollapsibleSection, { children: /* @__PURE__ */ jsx55(
              HierarchicalFacetDisplay,
              {
                facet: f,
                delimiter,
                showMoreLimit,
                customCssClasses
              }
            ) })
          ]
        }
      ),
      i < facets.length - 1 && /* @__PURE__ */ jsx55(FilterDivider, { className: customCssClasses.divider })
    ] }, f.fieldId);
  }) });
}

// src/components/NumericalFacets.tsx
import { Fragment as Fragment13 } from "react";
import { Fragment as Fragment14, jsx as jsx56, jsxs as jsxs26 } from "react/jsx-runtime";
var DEFAULT_RANGE_INPUT_PREFIX = /* @__PURE__ */ jsx56(Fragment14, { children: "$" });
function NumericalFacets(_a) {
  var _b = _a, {
    searchOnChange,
    includedFieldIds = [],
    getFilterDisplayName,
    inputPrefix = DEFAULT_RANGE_INPUT_PREFIX,
    customCssClasses = {}
  } = _b, filterGroupProps = __objRest(_b, [
    "searchOnChange",
    "includedFieldIds",
    "getFilterDisplayName",
    "inputPrefix",
    "customCssClasses"
  ]);
  return /* @__PURE__ */ jsx56(FacetsProvider, { searchOnChange, className: customCssClasses.numericalFacetsContainer, children: (facets) => facets.filter((f) => isNumericalFacet(f) && (includedFieldIds.length === 0 || includedFieldIds.includes(f.fieldId))).map((f, i) => {
    return /* @__PURE__ */ jsxs26(Fragment13, { children: [
      /* @__PURE__ */ jsx56(
        FilterGroup,
        __spreadProps(__spreadValues({
          fieldId: f.fieldId,
          filterOptions: f.options,
          title: f.displayName,
          customCssClasses
        }, filterGroupProps), {
          children: /* @__PURE__ */ jsx56(
            RangeInput,
            {
              getFilterDisplayName,
              inputPrefix,
              customCssClasses
            }
          )
        })
      ),
      i < facets.length - 1 && /* @__PURE__ */ jsx56(FilterDivider, { className: customCssClasses.divider })
    ] }, f.fieldId);
  }) });
}

// src/components/StandardFacetContent.tsx
import { jsx as jsx57 } from "react/jsx-runtime";
function StandardFacetContent(_a) {
  var _b = _a, {
    fieldId,
    label,
    transformOptions,
    customCssClasses,
    facet,
    showMoreLimit = 10,
    showOptionCounts = true
  } = _b, filterGroupProps = __objRest(_b, [
    "fieldId",
    "label",
    "transformOptions",
    "customCssClasses",
    "facet",
    "showMoreLimit",
    "showOptionCounts"
  ]);
  const options = facet.options || [];
  const transformedOptions = transformOptions ? transformOptions(options) || [] : options;
  return /* @__PURE__ */ jsx57(
    FilterGroup,
    __spreadValues({
      fieldId,
      filterOptions: transformedOptions.map((o) => {
        return showOptionCounts ? __spreadProps(__spreadValues({}, o), { resultsCount: o.count }) : o;
      }),
      title: label || facet.displayName,
      customCssClasses,
      showMoreLimit,
      searchable: (facet == null ? void 0 : facet.options.length) > showMoreLimit
    }, filterGroupProps)
  );
}

// src/components/Facets.tsx
import { Fragment as Fragment16 } from "react";

// src/components/NumericalFacetContent.tsx
import { Fragment as Fragment15, jsx as jsx58 } from "react/jsx-runtime";
var DEFAULT_RANGE_INPUT_PREFIX2 = /* @__PURE__ */ jsx58(Fragment15, { children: "$" });
function NumericalFacetContent(_a) {
  var _b = _a, {
    fieldId,
    label,
    transformOptions,
    customCssClasses,
    getFilterDisplayName,
    facet,
    showMoreLimit = 10,
    showOptionCounts = false,
    inputPrefix = DEFAULT_RANGE_INPUT_PREFIX2
  } = _b, filterGroupProps = __objRest(_b, [
    "fieldId",
    "label",
    "transformOptions",
    "customCssClasses",
    "getFilterDisplayName",
    "facet",
    "showMoreLimit",
    "showOptionCounts",
    "inputPrefix"
  ]);
  const options = facet.options || [];
  const transformedOptions = transformOptions ? transformOptions(options) || [] : options;
  return /* @__PURE__ */ jsx58(
    FilterGroup,
    __spreadProps(__spreadValues({
      fieldId,
      filterOptions: transformedOptions.map((o) => {
        return showOptionCounts ? __spreadProps(__spreadValues({}, o), { resultsCount: o.count }) : o;
      }),
      title: label || facet.displayName,
      customCssClasses,
      showMoreLimit,
      searchable: (facet == null ? void 0 : facet.options.length) > showMoreLimit
    }, filterGroupProps), {
      children: /* @__PURE__ */ jsx58(
        RangeInput,
        {
          getFilterDisplayName,
          inputPrefix,
          customCssClasses
        }
      )
    })
  );
}

// src/components/HierarchicalFacetContent.tsx
import { jsx as jsx59, jsxs as jsxs27 } from "react/jsx-runtime";
function HierarchicalFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  delimiter,
  facet,
  collapsible = true,
  defaultExpanded = true,
  showMoreLimit = 4
}) {
  const options = facet.options || [];
  const transformedOptions = transformOptions ? transformOptions(options) || [] : options;
  return /* @__PURE__ */ jsxs27(FilterGroupProvider, { fieldId, defaultExpanded: !collapsible || defaultExpanded, children: [
    /* @__PURE__ */ jsx59(
      FacetTitle,
      {
        label: label || facet.displayName,
        customCssClasses,
        collapsible
      }
    ),
    /* @__PURE__ */ jsx59(CollapsibleSection, { children: /* @__PURE__ */ jsx59(
      HierarchicalFacetDisplay,
      {
        facet: __spreadProps(__spreadValues({}, facet), {
          options: transformedOptions
        }),
        delimiter,
        showMoreLimit,
        customCssClasses
      }
    ) })
  ] });
}

// src/components/Facets.tsx
import { jsx as jsx60, jsxs as jsxs28 } from "react/jsx-runtime";
function Facets(props) {
  const {
    searchOnChange,
    onlyRenderChildren = false,
    children,
    hierarchicalFieldIds,
    excludedFieldIds = [],
    customCssClasses = {}
  } = props;
  const fieldIdToCustomFacetProps = /* @__PURE__ */ new Map();
  const fieldIds = [];
  if (children) {
    (Array.isArray(children) ? children : [children]).filter((child) => {
      var _a;
      return (_a = child == null ? void 0 : child.props) == null ? void 0 : _a.fieldId;
    }).forEach((child) => {
      fieldIdToCustomFacetProps.set(child.props.fieldId, child);
      fieldIds.push(child.props.fieldId);
    });
  }
  return /* @__PURE__ */ jsx60("div", { children: /* @__PURE__ */ jsx60(FacetsProvider, { searchOnChange, className: customCssClasses.facetsContainer, children: (facets) => {
    if (!facets || !facets.length) {
      return;
    }
    if (!onlyRenderChildren) {
      facets.forEach((facet) => {
        if (!fieldIds.includes(facet.fieldId)) {
          fieldIds.push(facet.fieldId);
        }
      });
    }
    const fieldIdToFacet = /* @__PURE__ */ new Map();
    facets.forEach((facet) => fieldIdToFacet.set(facet.fieldId, facet));
    return fieldIds.filter((fieldId) => !excludedFieldIds.includes(fieldId) && fieldIdToFacet.get(fieldId).options.length > 0 && (!onlyRenderChildren || fieldIdToCustomFacetProps.has(fieldId))).map((fieldId, i) => {
      const facet = fieldIdToFacet.get(fieldId);
      return /* @__PURE__ */ jsxs28(Fragment16, { children: [
        /* @__PURE__ */ jsx60(
          Facet,
          {
            facet,
            facetsCustomCssClasses: customCssClasses,
            fieldIdToCustomFacetProps,
            hierarchicalFieldIds
          }
        ),
        i < facets.length - 1 && /* @__PURE__ */ jsx60(FilterDivider, { className: customCssClasses == null ? void 0 : customCssClasses.divider })
      ] }, facet.fieldId);
    });
  } }) });
}
function StandardFacet(props) {
  return null;
}
function NumericalFacet(props) {
  return null;
}
function HierarchicalFacet(props) {
  return null;
}
function Facet({
  facet,
  facetsCustomCssClasses,
  fieldIdToCustomFacetProps,
  hierarchicalFieldIds
}) {
  let facetType;
  let facetProps = {
    fieldId: facet.fieldId,
    label: facet.displayName
  };
  if (fieldIdToCustomFacetProps.has(facet.fieldId)) {
    const customFacetElement = fieldIdToCustomFacetProps.get(facet.fieldId);
    facetProps = __spreadValues(__spreadValues({}, facetProps), customFacetElement.props);
    facetType = getFacetTypeFromReactElementType(
      typeof customFacetElement.type === "function" ? customFacetElement.type.name : ""
    );
  } else {
    facetType = getFacetTypeFromFacet(facet, hierarchicalFieldIds);
  }
  facetProps = __spreadProps(__spreadValues({}, facetProps), {
    customCssClasses: __spreadValues(__spreadValues({}, facetsCustomCssClasses), facetProps.customCssClasses)
  });
  switch (facetType) {
    case "NUMERICAL" /* NUMERICAL */:
      return /* @__PURE__ */ jsx60(NumericalFacetContent, __spreadValues({ facet }, facetProps));
    case "HIERARCHICAL" /* HIERARCHICAL */:
      return /* @__PURE__ */ jsx60(HierarchicalFacetContent, __spreadValues({ facet }, facetProps));
    case "STANDARD" /* STANDARD */:
    default:
      return /* @__PURE__ */ jsx60(StandardFacetContent, __spreadValues({ facet }, facetProps));
  }
}
function getFacetTypeFromReactElementType(elementType) {
  switch (elementType) {
    case NumericalFacet.name.toString():
      return "NUMERICAL" /* NUMERICAL */;
    case HierarchicalFacet.name.toString():
      return "HIERARCHICAL" /* HIERARCHICAL */;
    case StandardFacet.name.toString():
    default:
      return "STANDARD" /* STANDARD */;
  }
}
function getFacetTypeFromFacet(facet, hierarchicalFieldIds = []) {
  if (hierarchicalFieldIds.includes(facet.fieldId)) {
    return "HIERARCHICAL" /* HIERARCHICAL */;
  } else if (isStringFacet(facet)) {
    return "STANDARD" /* STANDARD */;
  } else if (isNumericalFacet(facet)) {
    return "NUMERICAL" /* NUMERICAL */;
  }
  return "STANDARD" /* STANDARD */;
}

// src/components/ApplyFiltersButton.tsx
import { useSearchActions as useSearchActions15 } from "@yext/search-headless-react";
import { useCallback as useCallback20 } from "react";
import { jsx as jsx61 } from "react/jsx-runtime";
var builtInCssClasses21 = {
  button: "border border-gray-300 px-2.5 py-1 rounded-md text-primary bg-white shadow-md sticky bottom-3"
};
function ApplyFiltersButton({
  customCssClasses,
  label = "Apply Filters"
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses21, customCssClasses);
  const searchActions = useSearchActions15();
  const handleClick = useCallback20(() => {
    searchActions.setOffset(0);
    clearStaticRangeFilters(searchActions, getSelectedNumericalFacetFields(searchActions));
    executeSearch(searchActions);
  }, [searchActions]);
  return /* @__PURE__ */ jsx61(
    "button",
    {
      onClick: handleClick,
      className: cssClasses.button,
      children: label
    }
  );
}

// src/components/MapboxMap.tsx
import { useRef as useRef8, useEffect as useEffect9 } from "react";
import mapboxgl from "mapbox-gl";
import { useSearchState as useSearchState26 } from "@yext/search-headless-react";
import ReactDOM from "react-dom";
import { jsx as jsx62 } from "react/jsx-runtime";
function MapboxMap({
  mapboxAccessToken,
  mapboxOptions,
  PinComponent: PinComponent2,
  getCoordinate = getDefaultCoordinate,
  onDrag
}) {
  useEffect9(() => {
    mapboxgl.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);
  const mapContainer = useRef8(null);
  const map = useRef8(null);
  const markers = useRef8([]);
  const locationResults = useSearchState26((state) => state.vertical.results);
  const onDragDebounced = useDebouncedFunction(onDrag, 100);
  useEffect9(() => {
    if (mapContainer.current && !map.current) {
      const options = __spreadValues({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.005371, 40.741611],
        zoom: 9
      }, mapboxOptions);
      map.current = new mapboxgl.Map(options);
      const mapbox = map.current;
      mapbox.resize();
      if (onDragDebounced) {
        mapbox.on("drag", () => {
          onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
        });
      }
    }
  }, [mapboxOptions, onDragDebounced]);
  useEffect9(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && (locationResults == null ? void 0 : locationResults.length) > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      locationResults.forEach((result, i) => {
        const markerLocation = getCoordinate(result);
        if (markerLocation) {
          const { latitude, longitude } = markerLocation;
          const el = document.createElement("div");
          const markerOptions = {};
          if (PinComponent2) {
            ReactDOM.render(/* @__PURE__ */ jsx62(
              PinComponent2,
              {
                index: i,
                mapbox,
                result
              }
            ), el);
            markerOptions.element = el;
          }
          const marker = new mapboxgl.Marker(markerOptions).setLngLat({ lat: latitude, lng: longitude }).addTo(mapbox);
          markers.current.push(marker);
          bounds.extend([longitude, latitude]);
        }
      });
      if (!bounds.isEmpty()) {
        mapbox.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }
  }, [PinComponent2, getCoordinate, locationResults]);
  return /* @__PURE__ */ jsx62("div", { ref: mapContainer, className: "h-full w-full" });
}
function isCoordinate(data) {
  return typeof data == "object" && typeof (data == null ? void 0 : data["latitude"]) === "number" && typeof (data == null ? void 0 : data["longitude"]) === "number";
}
function getDefaultCoordinate(result) {
  const yextDisplayCoordinate = result.rawData["yextDisplayCoordinate"];
  if (!yextDisplayCoordinate) {
    console.error(`Unable to use the default "yextDisplayCoordinate" field as the result's coordinate to display on map.
Consider providing the "getCoordinate" prop to MapboxMap component to fetch the desire coordinate from result.`);
    return void 0;
  }
  if (!isCoordinate(yextDisplayCoordinate)) {
    console.error('The default `yextDisplayCoordinate` field from result is not of type "Coordinate".');
    return void 0;
  }
  return yextDisplayCoordinate;
}

// src/components/AnalyticsProvider.tsx
import { provideAnalytics } from "@yext/analytics";
import { jsx as jsx63 } from "react/jsx-runtime";
function AnalyticsProvider(props) {
  const _a = props, { children } = _a, analyticsConfig = __objRest(_a, ["children"]);
  const analyticsReporter = provideAnalytics(analyticsConfig);
  return /* @__PURE__ */ jsx63(AnalyticsContext.Provider, { value: analyticsReporter, children });
}

// src/models/StandardCardData.ts
function isCtaData(data) {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const expectedKeys = ["label", "link", "linkType"];
  return expectedKeys.every((key) => {
    return key in data;
  });
}

// src/index.ts
var ComponentsContentPath = "node_modules/@yext/search-ui-react/lib/**/*.{js,jsx}";
export {
  AlternativeVerticals,
  AnalyticsProvider,
  AppliedFilters,
  ApplyFiltersButton,
  ComponentsContentPath,
  DirectAnswer,
  DropdownItem,
  Facets,
  FilterDivider,
  FilterSearch,
  Geolocation,
  HierarchicalFacet,
  HierarchicalFacets,
  LocationBias,
  MapboxMap,
  NumericalFacet,
  NumericalFacets,
  Pagination,
  ResultsCount,
  SearchBar,
  SpellCheck,
  StandardCard,
  StandardFacet,
  StandardFacets,
  StandardSection,
  StaticFilters,
  ThumbsFeedback,
  UniversalResults,
  VerticalResults,
  executeAutocomplete,
  executeSearch,
  getSearchIntents,
  getUserLocation,
  isCtaData,
  renderHighlightedValue,
  updateLocationIfNeeded,
  useAnalytics,
  useCardAnalyticsCallback,
  useCardFeedbackCallback,
  useComposedCssClasses
};
//# sourceMappingURL=index.js.map