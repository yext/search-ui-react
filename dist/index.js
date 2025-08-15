"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// locales/ar/search-ui-react.json
var require_search_ui_react = __commonJS({
  "locales/ar/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "\u0625\u062C\u0627\u0628\u0629 \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647\u0627 \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",
      allCategories: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A ",
      appliedFiltersToCurrentSearch: "\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A",
      apply: "\u062A\u0637\u0628\u064A\u0642",
      applyFilters: "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631",
      autocompleteOptionsFound_few: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u062E\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A {{label}}.",
      autocompleteOptionsFound_many: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u062E\u064A\u0627\u0631\u064B\u0627 \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A {{label}}.",
      autocompleteOptionsFound_one: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062E\u064A\u0627\u0631 \u0648\u0627\u062D\u062F \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A {{label}}.",
      autocompleteOptionsFound_other: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u062E\u064A\u0627\u0631 \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A {{label}}.",
      autocompleteOptionsFound_two: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062E\u064A\u0627\u0631\u064A\u0646 \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A {{label}}.",
      autocompleteOptionsFound_zero: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u062E\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A.",
      autocompleteSuggestion: "\u0627\u0642\u062A\u0631\u0627\u062D \u0627\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A: {{suggestion}}",
      autocompleteSuggestionsFound_few: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A.",
      autocompleteSuggestionsFound_many: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0627\u0642\u062A\u0631\u0627\u062D\u064B\u0627.",
      autocompleteSuggestionsFound_one: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u062D \u0648\u0627\u062D\u062F.",
      autocompleteSuggestionsFound_other: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0627\u0642\u062A\u0631\u0627\u062D.",
      autocompleteSuggestionsFound_two: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u062D\u064A\u0646.",
      autocompleteSuggestionsFound_zero: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A.",
      basedOnYourDevice: " (\u0627\u0633\u062A\u0646\u0627\u062F\u064B\u0627 \u0625\u0644\u0649 \u062C\u0647\u0627\u0632\u0643)",
      basedOnYourInternetAddress: " (\u0627\u0633\u062A\u0646\u0627\u062F\u064B\u0627 \u0625\u0644\u0649 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0627\u0644\u062E\u0627\u0635 \u0628\u0643)",
      categoriesText_one: "\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C \u0644\u0640 - <strong>{{query}}</strong>",
      categoriesText_other: "\u0627\u0644\u0641\u0626\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C \u0644\u0640 - <strong>{{query}}</strong>",
      clearAll: "\u0645\u0633\u062D \u0627\u0644\u0643\u0644",
      clearMinAndMax: "\u0645\u0633\u062D \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0648\u0627\u0644\u0623\u0642\u0635\u0649",
      clearTheRangeToSelectOptions: "\u0627\u0645\u0633\u062D \u0627\u0644\u0646\u0637\u0627\u0642 \u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A.",
      clearTheSearchBar: "\u0627\u0645\u0633\u062D \u0634\u0631\u064A\u0637 \u0627\u0644\u0628\u062D\u062B",
      conductASearch: "\u0625\u062C\u0631\u0627\u0621 \u0628\u062D\u062B",
      currentLocation: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A",
      didYouMean: "\u0647\u0644 \u0643\u0646\u062A \u062A\u0642\u0635\u062F <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "\u0639\u0646\u062F \u062A\u0648\u0641\u0631 \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u060C \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0633\u0647\u0645 \u0644\u0644\u0623\u0639\u0644\u0649 \u0648\u0627\u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u062A\u0646\u0642\u0644 \u0648\u0627\u0636\u063A\u0637 Enter \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631.",
      feedback: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
      invalidRange: "\u0646\u0637\u0627\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",
      max: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649",
      min: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649",
      navigateToTheNextResultsPage: "\u0627\u0646\u062A\u0642\u0644 \u0625\u0644\u0649 \u0635\u0641\u062D\u0629 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u0627\u0644\u064A\u0629",
      navigateToThePreviousResultsPage: "\u0627\u0646\u062A\u0642\u0644 \u0625\u0644\u0649 \u0635\u0641\u062D\u0629 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
      noAutocompleteOptionsFound: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062E\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A.",
      noAutocompleteSuggestionsFound: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A.",
      noResultsFoundIn: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C \u0641\u064A {{currentVerticalLabel}}.",
      pagination: "\u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0635\u0641\u062D\u0627\u062A",
      readMoreAbout: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F \u0639\u0646 <a>{{name}}</a>",
      recentSearch: "\u0628\u062D\u062B \u062D\u062F\u064A\u062B: {{query}}",
      recentSearchesFound_few: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0639\u0645\u0644\u064A\u0627\u062A \u0628\u062D\u062B.",
      recentSearchesFound_many: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0639\u0645\u0644\u064A\u0629 \u0628\u062D\u062B.",
      recentSearchesFound_one: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0645\u0644\u064A\u0629 \u0628\u062D\u062B \u0648\u0627\u062D\u062F\u0629.",
      recentSearchesFound_other: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0639\u0645\u0644\u064A\u0629 \u0628\u062D\u062B.",
      recentSearchesFound_two: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0645\u0644\u064A\u062A\u064A \u0628\u062D\u062B.",
      recentSearchesFound_zero: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0639\u0645\u0644\u064A\u0627\u062A \u0628\u062D\u062B \u062D\u062F\u064A\u062B\u0629.",
      removeFilter: "\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0641\u0644\u062A\u0631 \xAB{{displayName}}\xBB",
      resultPreview: "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0646\u062A\u064A\u062C\u0629: {{value}}",
      resultPreviewsFound_few: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0645\u0639\u0627\u064A\u0646\u0627\u062A.",
      resultPreviewsFound_many: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0645\u0639\u0627\u064A\u0646\u0629.",
      resultPreviewsFound_one: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629.",
      resultPreviewsFound_other: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 {{count}} \u0645\u0639\u0627\u064A\u0646\u0629.",
      resultPreviewsFound_two: "\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0639\u0627\u064A\u0646\u062A\u064A\u0646.",
      resultPreviewsFound_zero: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0639\u0627\u064A\u0646\u0627\u062A.",
      resultsCountText_few: "{{count}} \u0646\u062A\u0627\u0626\u062C",
      resultsCountText_many: "{{count}} \u0646\u062A\u064A\u062C\u0629",
      resultsCountText_one: "\u0646\u062A\u064A\u062C\u0629 \u0648\u0627\u062D\u062F\u0629",
      resultsCountText_other: "{{count}} \u0646\u062A\u064A\u062C\u0629",
      resultsCountText_two: "\u0646\u062A\u064A\u062C\u062A\u0627\u0646",
      resultsCountText_zero: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} \u0645\u0646 \u0623\u0635\u0644 {{resultsCount}} \u0646\u062A\u064A\u062C\u0629",
      searchHere: "\u0627\u0628\u062D\u062B \u0647\u0646\u0627\u2026",
      showLess: "\u0639\u0631\u0636 \u0623\u0642\u0644",
      showMore: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F",
      showingAllInstead: "\u064A\u062A\u0645 \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0646\u062A\u0627\u0626\u062C {{currentVerticalLabel}} \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643.",
      sources_few: "\u0645\u0635\u0627\u062F\u0631 ({{count}})",
      sources_many: "\u0645\u0635\u062F\u0631 ({{count}})",
      sources_one: "\u0645\u0635\u062F\u0631",
      sources_other: "\u0645\u0635\u062F\u0631 ({{count}})",
      sources_two: "\u0645\u0635\u062F\u0631\u0627\u0646",
      sources_zero: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0627\u062F\u0631",
      submitSearch: "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0628\u062D\u062B",
      suggestionResultsCount_few: "{{label}} - {{count}} \u0646\u062A\u0627\u0626\u062C",
      suggestionResultsCount_many: "{{label}} - {{count}} \u0646\u062A\u064A\u062C\u0629",
      suggestionResultsCount_one: "{{label}} - \u0646\u062A\u064A\u062C\u0629 \u0648\u0627\u062D\u062F\u0629",
      suggestionResultsCount_other: "{{label}} - {{count}} \u0646\u062A\u064A\u062C\u0629",
      suggestionResultsCount_two: "{{label}} - \u0646\u062A\u064A\u062C\u062A\u0627\u0646",
      suggestionResultsCount_zero: "{{label}} - \u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C",
      thankYouForYourFeedback: "\u0634\u0643\u0631\u064B\u0627 \u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643!",
      thisAnsweredMyQuestion: "\u0646\u0639\u0645\u060C \u0647\u0630\u0627 \u0623\u062C\u0627\u0628 \u0639\u0644\u0649 \u0633\u0624\u0627\u0644\u064A",
      thisDidNotAnswerMyQuestion: "\u0644\u0627\u060C \u0647\u0630\u0627 \u0644\u0645 \u064A\u062C\u0628 \u0639\u0644\u0649 \u0633\u0624\u0627\u0644\u064A",
      unselectAnOptionToEnterInARange: "\u0642\u0645 \u0628\u0625\u0644\u063A\u0627\u0621 \u062A\u062D\u062F\u064A\u062F \u062E\u064A\u0627\u0631 \u0644\u0625\u062F\u062E\u0627\u0644 \u0646\u0637\u0627\u0642.",
      updateYourLocation: "\u062A\u062D\u062F\u064A\u062B \u0645\u0648\u0642\u0639\u0643",
      useCurrentLocation: "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A",
      useMyLocation: "\u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0648\u0642\u0639\u064A",
      viewAll: "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
      viewDetails: "\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"
    };
  }
});

// locales/cs/search-ui-react.json
var require_search_ui_react2 = __commonJS({
  "locales/cs/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI generovan\xE1 odpov\u011B\u010F",
      allCategories: "V\u0161echny kategorie",
      appliedFiltersToCurrentSearch: "Pou\u017Eit\xE9 filtry pro aktu\xE1ln\xED hled\xE1n\xED",
      apply: "Pou\u017E\xEDt",
      applyFilters: "Pou\u017E\xEDt filtry",
      autocompleteOptionsFound_few: "Nalezeny {{count}}{{label}} mo\u017Enosti automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      autocompleteOptionsFound_one: "Nalezena {{count}}{{label}} mo\u017Enost automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      autocompleteOptionsFound_other: "Nalezeno {{count}}{{label}} mo\u017Enost\xED automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      autocompleteSuggestion: "n\xE1vrh automatick\xE9ho dopl\u0148ov\xE1n\xED: {{suggestion}}",
      autocompleteSuggestionsFound_few: "Nalezeny {{count}} n\xE1vrhy automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      autocompleteSuggestionsFound_one: "Nalezen {{count}} n\xE1vrh automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      autocompleteSuggestionsFound_other: "Nalezeno {{count}} n\xE1vrh\u016F automatick\xE9ho dokon\u010Dov\xE1n\xED.",
      basedOnYourDevice: " (na z\xE1klad\u011B va\u0161eho za\u0159\xEDzen\xED)",
      basedOnYourInternetAddress: " (na z\xE1klad\u011B va\u0161\xED IP adresy)",
      categoriesText_few: "N\xE1sleduj\xEDc\xED kategorie p\u0159inesla v\xFDsledky pro \u2013 <strong>{{query}}</strong>",
      categoriesText_one: "N\xE1sleduj\xEDc\xED kategorie p\u0159inesly v\xFDsledky pro \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "N\xE1sleduj\xEDc\xEDch kategori\xED p\u0159ineslo v\xFDsledky pro \u2013 <strong>{{query}}</strong>",
      clearAll: "Vy\u010Distit v\u0161e",
      clearMinAndMax: "Vymazat min a max",
      clearTheRangeToSelectOptions: "Vyma\u017Ete rozsah pro v\xFDb\u011Br mo\u017Enost\xED.",
      clearTheSearchBar: "Vyma\u017Ete vyhled\xE1vac\xED li\u0161tu",
      conductASearch: "Prov\xE9st vyhled\xE1v\xE1n\xED",
      currentLocation: "Aktu\xE1ln\xED poloha",
      didYouMean: "Mysleli jste <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Pokud jsou dostupn\xE9 v\xFDsledky automatick\xE9ho dopln\u011Bn\xED, pou\u017Eijte \u0161ipky nahoru/dol\u016F pro v\xFDb\u011Br a Enter pro potvrzen\xED.",
      feedback: "Zp\u011Btn\xE1 vazba",
      invalidRange: "Neplatn\xFD rozsah",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "P\u0159ejd\u011Bte na dal\u0161\xED str\xE1nku v\xFDsledk\u016F",
      navigateToThePreviousResultsPage: "P\u0159ejd\u011Bte na str\xE1nku p\u0159edchoz\xEDch v\xFDsledk\u016F",
      noAutocompleteOptionsFound: "Nenalezeny \u017E\xE1dn\xE9 mo\u017Enost\xED automatick\xE9ho dopl\u0148ov\xE1n\xED.",
      noAutocompleteSuggestionsFound: "Nenalezeny \u017E\xE1dn\xE9 n\xE1vrhy automatick\xE9ho dopl\u0148ov\xE1n\xED.",
      noResultsFoundIn: "V {{currentVerticalLabel}} nebyly nalezeny \u017E\xE1dn\xE9 v\xFDsledky.",
      pagination: "Str\xE1nkov\xE1n\xED",
      readMoreAbout: "P\u0159e\u010D\xEDst si v\xEDce o <a>{{name}}</a>",
      recentSearch: "ned\xE1vn\xE9 vyhled\xE1v\xE1n\xED: {{query}}",
      recentSearchesFound_few: "Nalezena {{count}} ned\xE1vn\xE1 hled\xE1n\xED.",
      recentSearchesFound_one: "Nalezeno {{count}} ned\xE1vn\xE9 hled\xE1n\xED.",
      recentSearchesFound_other: "Nalezeno {{count}} ned\xE1vn\xFDch hled\xE1n\xED.",
      removeFilter: "Odebrat filtr \u201E{{displayName}}\u201C",
      resultPreview: "n\xE1hled v\xFDsledk\u016F: {{value}}",
      resultPreviewsFound_few: "Nalezeny {{count}} n\xE1hledy v\xFDsledk\u016F.",
      resultPreviewsFound_one: "Nalezen {{count}} n\xE1hled v\xFDsledku.",
      resultPreviewsFound_other: "Nalezeno {{count}} n\xE1hled\u016F v\xFDsledk\u016F.",
      resultsCountText_few: "{{count}} v\xFDsledky",
      resultsCountText_one: "{{count}} v\xFDsledek",
      resultsCountText_other: "{{count}} v\xFDsledk\u016F",
      resultsCountWithPaginationText: "{{paginateStart}} \u2013 {{paginateEnd}} z {{resultsCount}} v\xFDsledk\u016F",
      searchHere: "Hledejte zde\u2026",
      showLess: "Zobrazit m\xE9n\u011B",
      showMore: "Zobrazit v\xEDce",
      showingAllInstead: "M\xEDsto toho zobrazujeme v\u0161echny {{currentVerticalLabel}}.",
      sources_few: "Zdroje ({{count}})",
      sources_one: "Zdroj",
      sources_other: "Zdroje ({{count}})",
      submitSearch: "Odeslat vyhled\xE1v\xE1n\xED",
      suggestionResultsCount_few: "{{label}} \u2013 {{count}} v\xFDsledky",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} v\xFDsledek",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} v\xFDsledk\u016F",
      thankYouForYourFeedback: "D\u011Bkujeme za va\u0161i zp\u011Btnou vazbu!",
      thisAnsweredMyQuestion: "Toto odpov\u011Bd\u011Blo na mou ot\xE1zku",
      thisDidNotAnswerMyQuestion: "Toto neodpov\u011Bd\u011Blo na mou ot\xE1zku",
      unselectAnOptionToEnterInARange: "Zru\u0161te v\xFDb\u011Br mo\u017Enosti, abyste mohli zadat rozsah.",
      updateYourLocation: "Aktualizujte svou polohu",
      useCurrentLocation: "Pou\u017E\xEDt aktu\xE1ln\xED polohu",
      useMyLocation: "Pou\u017E\xEDt mou polohu",
      viewAll: "Zobrazit v\u0161e",
      viewDetails: "Zobrazit podrobnosti"
    };
  }
});

// locales/da/search-ui-react.json
var require_search_ui_react3 = __commonJS({
  "locales/da/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI-genereret svar",
      allCategories: "Alle kategorier",
      appliedFiltersToCurrentSearch: "Anvendte filtre til den aktuelle s\xF8gning",
      apply: "Anvende",
      applyFilters: "Anvend filtre",
      autocompleteOptionsFound_one: "{{count}}{{label}} autofuldf\xF8relsesmulighed fundet.",
      autocompleteOptionsFound_other: "{{count}}{{label}} autofuldf\xF8relsesmuligheder fundet.",
      autocompleteSuggestion: "autofuldf\xF8relsesforslag: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} autofuldf\xF8relsesforslag fundet.",
      autocompleteSuggestionsFound_other: "{{count}} autofuldf\xF8relsesforslag fundet.",
      basedOnYourDevice: " (baseret p\xE5 din enhed)",
      basedOnYourInternetAddress: " (baseret p\xE5 din internetadresse)",
      categoriesText_one: "F\xF8lgende kategori gav resultater for - <strong>{{query}}</strong>",
      categoriesText_other: "F\xF8lgende kategorier gav resultater for - <strong>{{query}}</strong>",
      clearAll: "Ryd alle",
      clearMinAndMax: "Ryd maks og min",
      clearTheRangeToSelectOptions: "Ryd r\xE6kkevidden for at v\xE6lge indstillinger.",
      clearTheSearchBar: "Ryd s\xF8gefeltet",
      conductASearch: "Foretage en s\xF8gning",
      currentLocation: "Nuv\xE6rende placering",
      didYouMean: "Mente du <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "N\xE5r autoudfyldningsresultater er tilg\xE6ngelige, brug pil op/ned for at gennemg\xE5 og Enter for at v\xE6lge.",
      feedback: "Feedback",
      invalidRange: "Ugyldigt r\xE6kkevidde",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Naviger til den n\xE6ste resultatside",
      navigateToThePreviousResultsPage: "Naviger til den tidligere resultatside",
      noAutocompleteOptionsFound: "0 autofuldf\xF8relsesmuligheder fundet.",
      noAutocompleteSuggestionsFound: "0 forslag til autofuldf\xF8relse fundet.",
      noResultsFoundIn: "Ingen resultater fundet i {{currentVerticalLabel}}.",
      pagination: "Pagination",
      readMoreAbout: "L\xE6s mere om <a>{{name}}</a>",
      recentSearch: "nylig s\xF8gning: {{query}}",
      recentSearchesFound_one: "{{count}} seneste s\xF8gning fundet.",
      recentSearchesFound_other: "{{count}} seneste s\xF8gninger fundet.",
      removeFilter: "Fjern filteret \xBB{{displayName}}\xAB",
      resultPreview: "resultatvisninger: {{value}}",
      resultPreviewsFound_one: "{{count}} resultatvisning fundet.",
      resultPreviewsFound_other: "{{count}} resultatvisninger fundet.",
      resultsCountText_one: "{{count}} resultat",
      resultsCountText_other: "{{count}} resultater",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} af {{resultsCount}} resultater",
      searchHere: "S\xF8g her\u2026",
      showLess: "Vis mindre",
      showMore: "Vis mere",
      showingAllInstead: "Viser i stedet alle {{currentVerticalLabel}}.",
      sources_one: "Kilde",
      sources_other: "Kilder ({{count}})",
      submitSearch: "Indsend s\xF8gning",
      suggestionResultsCount_one: "{{label}} - {{count}} resultat",
      suggestionResultsCount_other: "{{label}} - {{count}} resultater",
      thankYouForYourFeedback: "Tak for din feedback!",
      thisAnsweredMyQuestion: "Dette besvarede mit sp\xF8rgsm\xE5l",
      thisDidNotAnswerMyQuestion: "Dette besvarede ikke mit sp\xF8rgsm\xE5l",
      unselectAnOptionToEnterInARange: "Frav\xE6lg en mulighed for at indtaste et interval.",
      updateYourLocation: "Opdater din placering",
      useCurrentLocation: "Brug nuv\xE6rende placering",
      useMyLocation: "Brug min placering",
      viewAll: "Se alle",
      viewDetails: "Se detaljer"
    };
  }
});

// locales/de/search-ui-react.json
var require_search_ui_react4 = __commonJS({
  "locales/de/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "KI-generierte Antwort",
      allCategories: "Alle Kategorien",
      appliedFiltersToCurrentSearch: "Angewandte Filter auf die aktuelle Suche",
      apply: "Anwenden",
      applyFilters: "Filter anwenden",
      autocompleteOptionsFound_one: "{{count}}{{label}} Autovervollst\xE4ndigungsoption gefunden.",
      autocompleteOptionsFound_other: "{{count}}{{label}} Autovervollst\xE4ndigungsoptionen gefunden.",
      autocompleteSuggestion: "autovervollst\xE4ndigung Vorschlag: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} Autovervollst\xE4ndigungsvorschlag gefunden.",
      autocompleteSuggestionsFound_other: "{{count}} Autovervollst\xE4ndigungsvorschl\xE4ge gefunden.",
      basedOnYourDevice: " (basierend auf Ihrem Ger\xE4t)",
      basedOnYourInternetAddress: " (basierend auf Ihrer IP-Adresse)",
      categoriesText_one: "Die folgende Kategorie lieferte Ergebnisse f\xFCr - <strong>{{query}}</strong>",
      categoriesText_other: "Die folgenden Kategorien lieferten Ergebnisse f\xFCr - <strong>{{query}}</strong>",
      clearAll: "Alle klar",
      clearMinAndMax: "Min und Max l\xF6schen",
      clearTheRangeToSelectOptions: "L\xF6schen Sie den Bereich, um Optionen auszuw\xE4hlen.",
      clearTheSearchBar: "L\xF6schen Sie die Suchleiste",
      conductASearch: "Eine Suche durchf\xFChren",
      currentLocation: "Aktueller Standort",
      didYouMean: "Meinten Sie <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Wenn Autovervollst\xE4ndigungsergebnisse verf\xFCgbar sind, mit Pfeiltasten navigieren und mit Enter ausw\xE4hlen.",
      feedback: "R\xFCckmeldung",
      invalidRange: "Ung\xFCltiger Bereich",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Navigieren Sie zur n\xE4chsten Ergebnisseite",
      navigateToThePreviousResultsPage: "Navigieren Sie zur vorherigen Ergebnisseite",
      noAutocompleteOptionsFound: "0 autovervollst\xE4ndigung Optionen gefunden.",
      noAutocompleteSuggestionsFound: "0 autovervollst\xE4ndigung Vorschl\xE4ge gefunden.",
      noResultsFoundIn: "Keine Ergebnisse in {{currentVerticalLabel}} gefunden.",
      pagination: "Seitennavigation",
      readMoreAbout: "Mehr erfahren \xFCber <a>{{name}}</a>",
      recentSearch: "neuere Suche: {{query}}",
      recentSearchesFound_one: "{{count}} letzter Suchbegriff gefunden.",
      recentSearchesFound_other: "{{count}} letzte Suchbegriffe gefunden.",
      removeFilter: "Filter \u201E{{displayName}}\u201C entfernen",
      resultPreview: "Ergebnisvorschau: {{value}}",
      resultPreviewsFound_one: "{{count}} Ergebnisvorschau gefunden.",
      resultPreviewsFound_other: "{{count}} Ergebnisvorschauen gefunden.",
      resultsCountText_one: "{{count}} Ergebnis",
      resultsCountText_other: "{{count}} Ergebnisse",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} von {{resultsCount}} Ergebnissen",
      searchHere: "Suche hier\u2026",
      showLess: "Weniger anzeigen",
      showMore: "Mehr anzeigen",
      showingAllInstead: "Zeige stattdessen alle {{currentVerticalLabel}} an.",
      sources_one: "Quelle",
      sources_other: "Quellen ({{count}})",
      submitSearch: "Suche einreichen",
      suggestionResultsCount_one: "{{label}} - {{count}} Ergebnis",
      suggestionResultsCount_other: "{{label}} - {{count}} Ergebnisse",
      thankYouForYourFeedback: "Vielen Dank f\xFCr Ihr Feedback!",
      thisAnsweredMyQuestion: "Das hat meine Frage beantwortet",
      thisDidNotAnswerMyQuestion: "Das hat meine Frage nicht beantwortet",
      unselectAnOptionToEnterInARange: "W\xE4hlen Sie eine Option ab, um einen Bereich einzugeben.",
      updateYourLocation: "Aktualisieren Sie Ihren Standort",
      useCurrentLocation: "Aktuellen Standort verwenden",
      useMyLocation: "Meinen Standort verwenden",
      viewAll: "Alle anzeigen",
      viewDetails: "Details anzeigen"
    };
  }
});

// locales/el/search-ui-react.json
var require_search_ui_react5 = __commonJS({
  "locales/el/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "\u0391\u03C0\u03AC\u03BD\u03C4\u03B7\u03C3\u03B7 \u03C0\u03BF\u03C5 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AE\u03B8\u03B7\u03BA\u03B5 \u03B1\u03C0\u03CC \u03A4\u039D",
      allCategories: "\u038C\u03BB\u03B5\u03C2 \u03BF\u03B9 \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B5\u03C2",
      appliedFiltersToCurrentSearch: "\u0395\u03C6\u03B1\u03C1\u03BC\u03BF\u03C3\u03BC\u03AD\u03BD\u03B1 \u03C6\u03AF\u03BB\u03C4\u03C1\u03B1 \u03C3\u03C4\u03B7\u03BD \u03C4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7",
      apply: "\u0395\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE",
      applyFilters: "\u0395\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE \u03C6\u03AF\u03BB\u03C4\u03C1\u03C9\u03BD",
      autocompleteOptionsFound_one: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 {{count}}{{label}} \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      autocompleteOptionsFound_other: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD {{count}}{{label}} \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AD\u03C2 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      autocompleteSuggestion: "\u03A0\u03C1\u03CC\u03C4\u03B1\u03C3\u03B7 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2: {{suggestion}}",
      autocompleteSuggestionsFound_one: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 {{count}} \u03C0\u03C1\u03CC\u03C4\u03B1\u03C3\u03B7 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      autocompleteSuggestionsFound_other: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD {{count}} \u03C0\u03C1\u03BF\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      basedOnYourDevice: " (\u03BC\u03B5 \u03B2\u03AC\u03C3\u03B7 \u03C4\u03B7 \u03C3\u03C5\u03C3\u03BA\u03B5\u03C5\u03AE \u03C3\u03B1\u03C2)",
      basedOnYourInternetAddress: " (\u03BC\u03B5 \u03B2\u03AC\u03C3\u03B7 \u03C4\u03B7 \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IP \u03C3\u03B1\u03C2)",
      categoriesText_one: "\u0397 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1 \u03AD\u03B4\u03C9\u03C3\u03B5 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 - <strong>{{query}}</strong>",
      categoriesText_other: "\u039F\u03B9 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B5\u03C2 \u03AD\u03B4\u03C9\u03C3\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 - <strong>{{query}}</strong>",
      clearAll: "\u039A\u03B1\u03B8\u03AC\u03C1\u03B9\u03C3\u03BC\u03B1 \u03CC\u03BB\u03C9\u03BD",
      clearMinAndMax: "\u039A\u03B1\u03B8\u03AC\u03C1\u03B9\u03C3\u03BC\u03B1 \u03B5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF\u03C5 \u03BA\u03B1\u03B9 \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF\u03C5",
      clearTheRangeToSelectOptions: "\u039A\u03B1\u03B8\u03AC\u03C1\u03B9\u03C3\u03B5 \u03C4\u03BF \u03B5\u03CD\u03C1\u03BF\u03C2 \u03B3\u03B9\u03B1 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03CE\u03BD.",
      clearTheSearchBar: "\u039A\u03B1\u03B8\u03AC\u03C1\u03B9\u03C3\u03B5 \u03C4\u03B7 \u03B3\u03C1\u03B1\u03BC\u03BC\u03AE \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2",
      conductASearch: "\u0394\u03B9\u03B5\u03BE\u03B1\u03B3\u03C9\u03B3\u03AE \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2",
      currentLocation: "\u03A4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1",
      didYouMean: "\u039C\u03AE\u03C0\u03C9\u03C2 \u03B5\u03BD\u03BD\u03BF\u03BF\u03CD\u03C3\u03B1\u03C4\u03B5 <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "\u038C\u03C4\u03B1\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2, \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03C4\u03B5 \u03C4\u03B1 \u03B2\u03B5\u03BB\u03AC\u03BA\u03B9\u03B1 \u03C0\u03AC\u03BD\u03C9/\u03BA\u03AC\u03C4\u03C9 \u03B3\u03B9\u03B1 \u03C0\u03C1\u03BF\u03B5\u03C0\u03B9\u03C3\u03BA\u03CC\u03C0\u03B7\u03C3\u03B7 \u03BA\u03B1\u03B9 Enter \u03B3\u03B9\u03B1 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE.",
      feedback: "\u03A3\u03C7\u03CC\u03BB\u03B9\u03B1",
      invalidRange: "\u0386\u03BA\u03C5\u03C1\u03BF \u03B5\u03CD\u03C1\u03BF\u03C2",
      max: "\u039C\u03AD\u03B3.",
      min: "\u0395\u03BB\u03AC\u03C7.",
      navigateToTheNextResultsPage: "\u039C\u03B5\u03C4\u03AC\u03B2\u03B1\u03C3\u03B7 \u03C3\u03C4\u03B7\u03BD \u03B5\u03C0\u03CC\u03BC\u03B5\u03BD\u03B7 \u03C3\u03B5\u03BB\u03AF\u03B4\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD",
      navigateToThePreviousResultsPage: "\u0395\u03C0\u03B9\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE \u03C3\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7 \u03C3\u03B5\u03BB\u03AF\u03B4\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD",
      noAutocompleteOptionsFound: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03BA\u03B1\u03BC\u03AF\u03B1 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      noAutocompleteSuggestionsFound: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03BA\u03B1\u03BC\u03AF\u03B1 \u03C0\u03C1\u03CC\u03C4\u03B1\u03C3\u03B7 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B7\u03C2 \u03C3\u03C5\u03BC\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7\u03C2.",
      noResultsFoundIn: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03C3\u03C4\u03BF/\u03C3\u03C4\u03B7 {{currentVerticalLabel}}.",
      pagination: "\u03A3\u03B5\u03BB\u03B9\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7",
      readMoreAbout: "\u0394\u03B9\u03B1\u03B2\u03AC\u03C3\u03C4\u03B5 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03B1 \u03B3\u03B9\u03B1 <a>{{name}}</a>",
      recentSearch: "\u03C0\u03C1\u03CC\u03C3\u03C6\u03B1\u03C4\u03B7 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7: {{query}}",
      recentSearchesFound_one: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 {{count}} \u03C0\u03C1\u03CC\u03C3\u03C6\u03B1\u03C4\u03B7 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7.",
      recentSearchesFound_other: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD {{count}} \u03C0\u03C1\u03CC\u03C3\u03C6\u03B1\u03C4\u03B5\u03C2 \u03B1\u03BD\u03B1\u03B6\u03B7\u03C4\u03AE\u03C3\u03B5\u03B9\u03C2.",
      removeFilter: "\u0391\u03C6\u03B1\u03AF\u03C1\u03B5\u03C3\u03B7 \u03C6\u03AF\u03BB\u03C4\u03C1\u03BF\u03C5 \xAB{{displayName}}\xBB",
      resultPreview: "\u03C0\u03C1\u03BF\u03B5\u03C0\u03B9\u03C3\u03BA\u03CC\u03C0\u03B7\u03C3\u03B7 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03BF\u03C2: {{value}}",
      resultPreviewsFound_one: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 {{count}} \u03C0\u03C1\u03BF\u03B5\u03C0\u03B9\u03C3\u03BA\u03CC\u03C0\u03B7\u03C3\u03B7 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03BF\u03C2.",
      resultPreviewsFound_other: "\u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD {{count}} \u03C0\u03C1\u03BF\u03B5\u03C0\u03B9\u03C3\u03BA\u03BF\u03C0\u03AE\u03C3\u03B5\u03B9\u03C2 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD.",
      resultsCountText_one: "{{count}} \u0391\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1",
      resultsCountText_other: "{{count}} \u0391\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1",
      resultsCountWithPaginationText: "{{paginateStart}} \u2013 {{paginateEnd}} \u03B1\u03C0\u03CC {{resultsCount}} \u0391\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1",
      searchHere: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B5 \u03B5\u03B4\u03CE\u2026",
      showLess: "\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03BB\u03B9\u03B3\u03CC\u03C4\u03B5\u03C1\u03C9\u03BD",
      showMore: "\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03C9\u03BD",
      showingAllInstead: "\u0394\u03B5\u03AF\u03C7\u03BD\u03C9\u03BD\u03C4\u03B1\u03B9 \u03CC\u03BB\u03B1 \u03C4\u03B1/{{currentVerticalLabel}} \u03B1\u03BD\u03C4\u2019 \u03B1\u03C5\u03C4\u03BF\u03CD.",
      sources_one: "\u03A0\u03B7\u03B3\u03AE",
      sources_other: "\u03A0\u03B7\u03B3\u03AD\u03C2 ({{count}})",
      submitSearch: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} \u03B1\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1",
      thankYouForYourFeedback: "\u0395\u03C5\u03C7\u03B1\u03C1\u03B9\u03C3\u03C4\u03BF\u03CD\u03BC\u03B5 \u03B3\u03B9\u03B1 \u03C4\u03B1 \u03C3\u03C7\u03CC\u03BB\u03B9\u03AC \u03C3\u03B1\u03C2!",
      thisAnsweredMyQuestion: "\u0391\u03C5\u03C4\u03CC \u03B1\u03C0\u03AC\u03BD\u03C4\u03B7\u03C3\u03B5 \u03C3\u03C4\u03B7\u03BD \u03B5\u03C1\u03CE\u03C4\u03B7\u03C3\u03AE \u03BC\u03BF\u03C5",
      thisDidNotAnswerMyQuestion: "\u0391\u03C5\u03C4\u03CC \u03B4\u03B5\u03BD \u03B1\u03C0\u03AC\u03BD\u03C4\u03B7\u03C3\u03B5 \u03C3\u03C4\u03B7\u03BD \u03B5\u03C1\u03CE\u03C4\u03B7\u03C3\u03AE \u03BC\u03BF\u03C5",
      unselectAnOptionToEnterInARange: "\u0391\u03C0\u03BF\u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03BC\u03B9\u03B1\u03C2 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE\u03C2 \u03B3\u03B9\u03B1 \u03B5\u03B9\u03C3\u03B1\u03B3\u03C9\u03B3\u03AE \u03C3\u03B5 \u03B5\u03CD\u03C1\u03BF\u03C2.",
      updateYourLocation: "\u0395\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B5 \u03C4\u03B7\u03BD \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1 \u03C3\u03BF\u03C5",
      useCurrentLocation: "\u03A7\u03C1\u03AE\u03C3\u03B7 \u03C4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1\u03C2 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1\u03C2",
      useMyLocation: "\u03A7\u03C1\u03AE\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1\u03C2 \u03BC\u03BF\u03C5",
      viewAll: "\u0394\u03B5\u03C2 \u03CC\u03BB\u03B1",
      viewDetails: "\u0394\u03B5\u03C2 \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03AD\u03C1\u03B5\u03B9\u03B5\u03C2"
    };
  }
});

// locales/en-GB/search-ui-react.json
var require_search_ui_react6 = __commonJS({
  "locales/en-GB/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI Generated Answer",
      allCategories: "All Categories",
      appliedFiltersToCurrentSearch: "Applied filters to current search",
      apply: "Apply",
      applyFilters: "Apply Filters",
      autocompleteOptionsFound_one: "{{count}}{{label}} autocomplete option found.",
      autocompleteOptionsFound_other: "{{count}}{{label}} autocomplete options found.",
      autocompleteSuggestion: "autocomplete suggestion: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} autocomplete suggestion found.",
      autocompleteSuggestionsFound_other: "{{count}} autocomplete suggestions found.",
      basedOnYourDevice: " (based on your device)",
      basedOnYourInternetAddress: " (based on your internet address)",
      categoriesText_one: "The following category yielded results for - <strong>{{query}}</strong>",
      categoriesText_other: "The following categories yielded results for - <strong>{{query}}</strong>",
      clearAll: "Clear All",
      clearMinAndMax: "Clear min and max",
      clearTheRangeToSelectOptions: "Clear the range to select options.",
      clearTheSearchBar: "Clear the search bar",
      conductASearch: "Conduct a search",
      currentLocation: "Current Location",
      didYouMean: "Did you mean <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "When autocomplete results are available, use up and down arrows to review and enter to select.",
      feedback: "Feedback",
      invalidRange: "Invalid range",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Navigate to the next results page",
      navigateToThePreviousResultsPage: "Navigate to the previous results page",
      noAutocompleteOptionsFound: "0 autocomplete options found.",
      noAutocompleteSuggestionsFound: "0 autocomplete suggestions found.",
      noResultsFoundIn: "No results found in {{currentVerticalLabel}}.",
      pagination: "Pagination",
      readMoreAbout: "Read more about <a>{{name}}</a>",
      recentSearch: "recent search: {{query}}",
      recentSearchesFound_one: "{{count}} recent search found.",
      recentSearchesFound_other: "{{count}} recent searches found.",
      removeFilter: 'Remove "{{displayName}}" filter',
      resultPreview: "result preview: {{value}}",
      resultPreviewsFound_one: "{{count}} result preview found.",
      resultPreviewsFound_other: "{{count}} recent previews found.",
      resultsCountText_one: "{{count}} Result",
      resultsCountText_other: "{{count}} Results",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} of {{resultsCount}} Results",
      searchHere: "Search here\u2026",
      showLess: "Show Less",
      showMore: "Show More",
      showingAllInstead: "Showing all {{currentVerticalLabel}} instead.",
      sources_one: "Source",
      sources_other: "Sources ({{count}})",
      submitSearch: "Submit Search",
      suggestionResultsCount_one: "{{label}} - {{count}} result",
      suggestionResultsCount_other: "{{label}} - {{count}} results",
      thankYouForYourFeedback: "Thank you for your feedback!",
      thisAnsweredMyQuestion: "This answered my question",
      thisDidNotAnswerMyQuestion: "This did not answer my question",
      unselectAnOptionToEnterInARange: "Unselect an option to enter in a range.",
      updateYourLocation: "Update your location",
      useCurrentLocation: "Use Current Location",
      useMyLocation: "Use my location",
      viewAll: "View all",
      viewDetails: "View Details"
    };
  }
});

// locales/en/search-ui-react.json
var require_search_ui_react7 = __commonJS({
  "locales/en/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI Generated Answer",
      allCategories: "All Categories",
      appliedFiltersToCurrentSearch: "Applied filters to current search",
      apply: "Apply",
      applyFilters: "Apply Filters",
      autocompleteOptionsFound_one: "{{count}}{{label}} autocomplete option found.",
      autocompleteOptionsFound_other: "{{count}}{{label}} autocomplete options found.",
      autocompleteSuggestion: "autocomplete suggestion: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} autocomplete suggestion found.",
      autocompleteSuggestionsFound_other: "{{count}} autocomplete suggestions found.",
      basedOnYourDevice: " (based on your device)",
      basedOnYourInternetAddress: " (based on your internet address)",
      categoriesText_one: "The following category yielded results for - <strong>{{query}}</strong>",
      categoriesText_other: "The following categories yielded results for - <strong>{{query}}</strong>",
      clearAll: "Clear All",
      clearMinAndMax: "Clear min and max",
      clearTheRangeToSelectOptions: "Clear the range to select options.",
      clearTheSearchBar: "Clear the search bar",
      conductASearch: "Conduct a search",
      currentLocation: "Current Location",
      didYouMean: "Did you mean <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "When autocomplete results are available, use up and down arrows to review and enter to select.",
      feedback: "Feedback",
      invalidRange: "Invalid range",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Navigate to the next results page",
      navigateToThePreviousResultsPage: "Navigate to the previous results page",
      noAutocompleteOptionsFound: "0 autocomplete options found.",
      noAutocompleteSuggestionsFound: "0 autocomplete suggestions found.",
      noResultsFoundIn: "No results found in {{currentVerticalLabel}}.",
      pagination: "Pagination",
      readMoreAbout: "Read more about <a>{{name}}</a>",
      recentSearch: "recent search: {{query}}",
      recentSearchesFound_one: "{{count}} recent search found.",
      recentSearchesFound_other: "{{count}} recent searches found.",
      removeFilter: 'Remove "{{displayName}}" filter',
      resultPreview: "result preview: {{value}}",
      resultPreviewsFound_one: "{{count}} result preview found.",
      resultPreviewsFound_other: "{{count}} recent previews found.",
      resultsCountText_one: "{{count}} Result",
      resultsCountText_other: "{{count}} Results",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} of {{resultsCount}} Results",
      searchHere: "Search here...",
      showLess: "Show Less",
      showMore: "Show More",
      showingAllInstead: "Showing all {{currentVerticalLabel}} instead.",
      sources_one: "Source",
      sources_other: "Sources ({{count}})",
      submitSearch: "Submit Search",
      suggestionResultsCount_one: "{{label}} - {{count}} result",
      suggestionResultsCount_other: "{{label}} - {{count}} results",
      thankYouForYourFeedback: "Thank you for your feedback!",
      thisAnsweredMyQuestion: "This answered my question",
      thisDidNotAnswerMyQuestion: "This did not answer my question",
      unselectAnOptionToEnterInARange: "Unselect an option to enter in a range.",
      updateYourLocation: "Update your location",
      useCurrentLocation: "Use Current Location",
      useMyLocation: "Use my location",
      viewAll: "View all",
      viewDetails: "View Details"
    };
  }
});

// locales/es/search-ui-react.json
var require_search_ui_react8 = __commonJS({
  "locales/es/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Respuesta generada por IA",
      allCategories: "Todas las categor\xEDas",
      appliedFiltersToCurrentSearch: "Filtros aplicados a la b\xFAsqueda actual",
      apply: "Aplicar",
      applyFilters: "Aplicar filtros",
      autocompleteOptionsFound_one: "{{count}}{{label}} opci\xF3n de autocompletado encontrada.",
      autocompleteOptionsFound_other: "{{count}}{{label}} opciones de autocompletado encontradas.",
      autocompleteSuggestion: "sugerencia de autocompleto: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} sugerencia de autocompletado encontrada.",
      autocompleteSuggestionsFound_other: "{{count}} sugerencias de autocompletado encontradas.",
      basedOnYourDevice: " (basado en tu dispositivo)",
      basedOnYourInternetAddress: " (basado en tu direcci\xF3n de internet)",
      categoriesText_one: "La siguiente categor\xEDa produjo resultados para - <strong>{{query}}</strong>",
      categoriesText_other: "Las siguientes categor\xEDas produjeron resultados para - <strong>{{query}}</strong>",
      clearAll: "Borrar todo",
      clearMinAndMax: "Borrar m\xEDnimo y m\xE1ximo",
      clearTheRangeToSelectOptions: "Borrar el rango para seleccionar opciones.",
      clearTheSearchBar: "Borrar la barra de b\xFAsqueda",
      conductASearch: "Realizar una b\xFAsqueda",
      currentLocation: "Ubicaci\xF3n Actual",
      didYouMean: "Quisiste decir <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Cuando haya resultados de autocompletar, usa las flechas arriba y abajo para revisar y entra para seleccionar.",
      feedback: "Comentarios",
      invalidRange: "Rango no v\xE1lido",
      max: "M\xE1x.",
      min: "M\xEDn.",
      navigateToTheNextResultsPage: "Navegue a la p\xE1gina de resultados del siguiente",
      navigateToThePreviousResultsPage: "Navegue a la p\xE1gina de resultados anterior",
      noAutocompleteOptionsFound: "0 Opciones de autocompletar encontradas.",
      noAutocompleteSuggestionsFound: "0 Sugerencias de autocompletar encontradas.",
      noResultsFoundIn: "No se encontraron resultados en {{currentVerticalLabel}}.",
      pagination: "Paginaci\xF3n",
      readMoreAbout: "Leer m\xE1s sobre <a>{{name}}</a>",
      recentSearch: "b\xFAsqueda reciente: {{query}}",
      recentSearchesFound_one: "{{count}} b\xFAsqueda reciente encontrada.",
      recentSearchesFound_other: "{{count}} b\xFAsquedas recientes encontradas.",
      removeFilter: "Quitar el filtro \xAB{{displayName}}\xBB",
      resultPreview: "vista previa de resultados: {{value}}",
      resultPreviewsFound_one: "{{count}} vista previa de resultado encontrada.",
      resultPreviewsFound_other: "{{count}} vistas previas de resultados encontradas.",
      resultsCountText_one: "{{count}} resultado",
      resultsCountText_other: "{{count}} resultados",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} de {{resultsCount}} resultados",
      searchHere: "Buscar aqu\xED\u2026",
      showLess: "Mostrar Menos",
      showMore: "Mostrar M\xE1s",
      showingAllInstead: "Mostrando todos los {{currentVerticalLabel}} en su lugar.",
      sources_one: "Fuente",
      sources_other: "Fuentes ({{count}})",
      submitSearch: "Enviar b\xFAsqueda",
      suggestionResultsCount_one: "{{label}} - {{count}} resultado",
      suggestionResultsCount_other: "{{label}} - {{count}} resultados",
      thankYouForYourFeedback: "\xA1Gracias por tus comentarios!",
      thisAnsweredMyQuestion: "Esto respondi\xF3 mi pregunta",
      thisDidNotAnswerMyQuestion: "Esto no respondi\xF3 mi pregunta",
      unselectAnOptionToEnterInARange: "Deselecciona una opci\xF3n para ingresar un rango.",
      updateYourLocation: "Actualiza tu ubicaci\xF3n",
      useCurrentLocation: "Usar Ubicaci\xF3n Actual",
      useMyLocation: "Usar mi ubicaci\xF3n",
      viewAll: "Ver todo",
      viewDetails: "Ver detalles"
    };
  }
});

// locales/et/search-ui-react.json
var require_search_ui_react9 = __commonJS({
  "locales/et/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Tehisintellekti loodud vastus",
      allCategories: "K\xF5ik kategooriad",
      appliedFiltersToCurrentSearch: "Rakendatud filtrid praegusele otsingule",
      apply: "Rakendama",
      applyFilters: "Rakenda filtrid",
      autocompleteOptionsFound_one: "Leiti {{count}}{{label}} automaatse t\xE4itmise valik.",
      autocompleteOptionsFound_other: "Leiti {{count}}{{label}} automaatse t\xE4itmise valikut.",
      autocompleteSuggestion: "automaatse t\xE4itmise soovitus: {{suggestion}}",
      autocompleteSuggestionsFound_one: "Leiti {{count}} automaatse t\xE4itmise soovitus.",
      autocompleteSuggestionsFound_other: "Leiti {{count}} automaatse t\xE4itmise soovitust.",
      basedOnYourDevice: " (p\xF5hineb sinu seadmel)",
      basedOnYourInternetAddress: " (p\xF5hineb sinu internetiaadressil)",
      categoriesText_one: "J\xE4rgmine kategooria andis tulemusi p\xE4ringu jaoks \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "J\xE4rgmised kategooriad andsid tulemusi p\xE4ringu jaoks \u2013 <strong>{{query}}</strong>",
      clearAll: "Puhastama k\xF5ik",
      clearMinAndMax: "T\xFChjenda miinimum ja maksimum",
      clearTheRangeToSelectOptions: "Valikute valimiseks t\xFChjendage vahemik.",
      clearTheSearchBar: "T\xFChjendage otsinguriba",
      conductASearch: "Otsingut tegema",
      currentLocation: "Praegune asukoht",
      didYouMean: "Kas m\xF5tlesite <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Kui automaatt\xE4ite tulemused on saadaval, kasuta \xFCles-/allanooleid eelvaateks ja Enterit valimiseks.",
      feedback: "Tagasiside",
      invalidRange: "Kehtetu vahemik",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Liikuge j\xE4rgmisele tulemuste lehele",
      navigateToThePreviousResultsPage: "Liikuge eelmise tulemuste lehele",
      noAutocompleteOptionsFound: "0 leitud automaatse t\xE4itmise valikud.",
      noAutocompleteSuggestionsFound: "0 leitud automaatse t\xE4itmise ettepanekuid.",
      noResultsFoundIn: "Tulemusi ei leitud kategoorias {{currentVerticalLabel}}.",
      pagination: "Lehek\xFClgede navigeerimine",
      readMoreAbout: "Loe rohkem: <a>{{name}}</a>",
      recentSearch: "hiljutine otsing: {{query}}",
      recentSearchesFound_one: "Leiti {{count}} hiljutine otsing.",
      recentSearchesFound_other: "Leiti {{count}} hiljutist otsingut.",
      removeFilter: "Eemalda filter \u201E{{displayName}}\u201D",
      resultPreview: "tulemuse eelvaade: {{value}}",
      resultPreviewsFound_one: "Leiti {{count}} tulemuse eelvaade.",
      resultPreviewsFound_other: "Leiti {{count}} tulemuse eelvaateid.",
      resultsCountText_one: "{{count}} tulemust",
      resultsCountText_other: "{{count}} tulemust",
      resultsCountWithPaginationText: "{{paginateStart}} \u2013 {{paginateEnd}} / {{resultsCount}} tulemust",
      searchHere: "Otsige siit\u2026",
      showLess: "N\xE4ita v\xE4hem",
      showMore: "N\xE4ita rohkem",
      showingAllInstead: "N\xE4idatakse hoopis k\xF5iki kategooriaid {{currentVerticalLabel}}.",
      sources_one: "Allikas",
      sources_other: "Allikad ({{krahv}})",
      submitSearch: "Otsingut esitama",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} tulemus",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} tulemust",
      thankYouForYourFeedback: "T\xE4name teie tagasiside eest!",
      thisAnsweredMyQuestion: "See vastas minu k\xFCsimusele",
      thisDidNotAnswerMyQuestion: "See ei vastanud minu k\xFCsimusele",
      unselectAnOptionToEnterInARange: "Valiku t\xFChistamiseks sisestage vahemik.",
      updateYourLocation: "V\xE4rskendage oma asukohta",
      useCurrentLocation: "Kasuta praegust asukohta",
      useMyLocation: "Kasuta minu asukohta",
      viewAll: "Vaata k\xF5iki",
      viewDetails: "Vaadake \xFCksikasju"
    };
  }
});

// locales/fi/search-ui-react.json
var require_search_ui_react10 = __commonJS({
  "locales/fi/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Teko\xE4lyn luoma vastaus",
      allCategories: "Kaikki kategoriat",
      appliedFiltersToCurrentSearch: "K\xE4ytetyt suodattimet nykyiseen hakuun",
      apply: "K\xE4yt\xE4",
      applyFilters: "K\xE4yt\xE4 suodattimia",
      autocompleteOptionsFound_one: "{{count}}{{label}} automaattista ehdotusta l\xF6ytyi.",
      autocompleteOptionsFound_other: "{{count}}{{label}} automaattista ehdotusta l\xF6ytyi.",
      autocompleteSuggestion: "automaattinen ehdotus: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} automaattinen ehdotus l\xF6ytyi.",
      autocompleteSuggestionsFound_other: "{{count}} automaattista ehdotusta l\xF6ytyi.",
      basedOnYourDevice: " (perustuu laitteeseesi)",
      basedOnYourInternetAddress: " (perustuu internet-osoitteeseesi)",
      categoriesText_one: "Seuraava kategoria antoi tuloksia hakusanalle - <strong>{{query}}</strong>",
      categoriesText_other: "Seuraavat kategoriat antoivat tuloksia hakusanalle - <strong>{{query}}</strong>",
      clearAll: "Tyhjenn\xE4 kaikki",
      clearMinAndMax: "Tyhjenn\xE4 minimi ja maksimi",
      clearTheRangeToSelectOptions: "Tyhjenn\xE4 valintav\xE4li.",
      clearTheSearchBar: "Tyhjenn\xE4 hakupalkki",
      conductASearch: "Tee haku",
      currentLocation: "Nykyinen sijainti",
      didYouMean: "Tarkoititko <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Kun automaattiset tulokset ovat saatavilla, k\xE4yt\xE4 nuolin\xE4pp\xE4imi\xE4 selaamiseen ja Enteri\xE4 valitsemiseen.",
      feedback: "Palaute",
      invalidRange: "Virheellinen v\xE4li",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Siirry seuraavalle tulossivulle",
      navigateToThePreviousResultsPage: "Siirry edelliselle tulossivulle",
      noAutocompleteOptionsFound: "0 automaattista ehdotusta l\xF6ytyi.",
      noAutocompleteSuggestionsFound: "0 automaattista ehdotusta l\xF6ytyi.",
      noResultsFoundIn: "Tuloksia ei l\xF6ytynyt kohdasta {{currentVerticalLabel}}.",
      pagination: "Sivutus",
      readMoreAbout: "Lue lis\xE4\xE4 aiheesta <a>{{name}}</a>",
      recentSearch: "viimeisin haku: {{query}}",
      recentSearchesFound_one: "{{count}} viimeisin haku l\xF6ytyi.",
      recentSearchesFound_other: "{{count}} viimeisint\xE4 hakua l\xF6ytyi.",
      removeFilter: 'Poista suodatin "{{displayName}}"',
      resultPreview: "tuloksen esikatselu: {{value}}",
      resultPreviewsFound_one: "{{count}} tuloksen esikatselu l\xF6ytyi.",
      resultPreviewsFound_other: "{{count}} tuloksen esikatselua l\xF6ytyi.",
      resultsCountText_one: "{{count}} tulos",
      resultsCountText_other: "{{count}} tulosta",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} / {{resultsCount}} tulosta",
      searchHere: "Hae t\xE4st\xE4\u2026",
      showLess: "N\xE4yt\xE4 v\xE4hemm\xE4n",
      showMore: "N\xE4yt\xE4 lis\xE4\xE4",
      showingAllInstead: "N\xE4ytet\xE4\xE4n kaikki kohteessa {{currentVerticalLabel}} sen sijaan.",
      sources_one: "L\xE4hde",
      sources_other: "L\xE4hteet ({{count}})",
      submitSearch: "L\xE4het\xE4 haku",
      suggestionResultsCount_one: "{{label}} - {{count}} tulos",
      suggestionResultsCount_other: "{{label}} - {{count}} tulosta",
      thankYouForYourFeedback: "Kiitos palautteestasi!",
      thisAnsweredMyQuestion: "T\xE4m\xE4 vastasi kysymykseeni",
      thisDidNotAnswerMyQuestion: "T\xE4m\xE4 ei vastannut kysymykseeni",
      unselectAnOptionToEnterInARange: "Poista valinta p\xE4\xE4st\xE4ksesi sy\xF6tt\xE4m\xE4\xE4n v\xE4lin.",
      updateYourLocation: "P\xE4ivit\xE4 sijaintisi",
      useCurrentLocation: "K\xE4yt\xE4 nykyist\xE4 sijaintia",
      useMyLocation: "K\xE4yt\xE4 sijaintiani",
      viewAll: "N\xE4yt\xE4 kaikki",
      viewDetails: "N\xE4yt\xE4 tiedot"
    };
  }
});

// locales/fr/search-ui-react.json
var require_search_ui_react11 = __commonJS({
  "locales/fr/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "R\xE9ponse g\xE9n\xE9r\xE9e par l'IA",
      allCategories: "Toutes les cat\xE9gories",
      appliedFiltersToCurrentSearch: "Filtres appliqu\xE9s \xE0 la recherche actuelle",
      apply: "Appliquer",
      applyFilters: "Appliquer les filtres",
      autocompleteOptionsFound_one: "{{count}} option d'autocompl\xE9tion{{label}} trouv\xE9e.",
      autocompleteOptionsFound_other: "{{count}} options d'autocompl\xE9tion{{label}} trouv\xE9es.",
      autocompleteSuggestion: "suggestion de saisie semi-automatique: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} suggestion d'autocompl\xE9tion trouv\xE9e.",
      autocompleteSuggestionsFound_other: "{{count}} suggestions d'autocompl\xE9tion trouv\xE9es.",
      basedOnYourDevice: " (bas\xE9 sur votre appareil)",
      basedOnYourInternetAddress: " (bas\xE9 sur votre adresse Internet)",
      categoriesText_one: "La cat\xE9gorie suivante a donn\xE9 des r\xE9sultats pour - <strong>{{query}}</strong>",
      categoriesText_other: "Les cat\xE9gories suivantes ont donn\xE9 des r\xE9sultats pour - <strong>{{query}}</strong>",
      clearAll: "Effacer tout",
      clearMinAndMax: "Effacer min et max",
      clearTheRangeToSelectOptions: "Effacer la plage pour s\xE9lectionner les options.",
      clearTheSearchBar: "Effacer la barre de recherche",
      conductASearch: "Effectuer une recherche",
      currentLocation: "Localisation actuelle",
      didYouMean: "Vouliez-vous dire <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Lorsque des r\xE9sultats de saisie semi-automatique sont disponibles, utilisez les fl\xE8ches haut et bas pour naviguer et appuyez sur Entr\xE9e pour s\xE9lectionner.",
      feedback: "Retour",
      invalidRange: "Gamme non valide",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Acc\xE9dez \xE0 la page de r\xE9sultats suivante",
      navigateToThePreviousResultsPage: "Acc\xE9dez \xE0 la page de r\xE9sultats pr\xE9c\xE9dents",
      noAutocompleteOptionsFound: "0 option de saisie semi-automatique trouv\xE9e.",
      noAutocompleteSuggestionsFound: "0 suggestion de saisie semi-automatique trouv\xE9es.",
      noResultsFoundIn: "Aucun r\xE9sultat trouv\xE9 dans {{currentVerticalLabel}}.",
      pagination: "Pagination",
      readMoreAbout: "En savoir plus sur <a>{{name}}</a>",
      recentSearch: "recherche r\xE9cente : {{query}}",
      recentSearchesFound_one: "{{count}} recherche r\xE9cente trouv\xE9e.",
      recentSearchesFound_other: "{{count}} recherches r\xE9centes trouv\xE9es.",
      removeFilter: "Supprimer le filtre \xAB{{displayName}}\xBB",
      resultPreview: "aper\xE7u du r\xE9sultat: {{value}}",
      resultPreviewsFound_one: "{{count}} aper\xE7u de r\xE9sultat trouv\xE9.",
      resultPreviewsFound_other: "{{count}} aper\xE7us de r\xE9sultats trouv\xE9s.",
      resultsCountText_one: "{{count}} r\xE9sultat",
      resultsCountText_other: "{{count}} r\xE9sultats",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} sur {{resultsCount}} r\xE9sultats",
      searchHere: "Recherche ici\u2026",
      showLess: "Afficher moins",
      showMore: "Afficher plus",
      showingAllInstead: "Affichage de tous les {{currentVerticalLabel}} \xE0 la place.",
      sources_one: "Source",
      sources_other: "Sources ({{count}})",
      submitSearch: "Soumettre la recherche",
      suggestionResultsCount_one: "{{label}} - {{count}} r\xE9sultat",
      suggestionResultsCount_other: "{{label}} - {{count}} r\xE9sultats",
      thankYouForYourFeedback: "Merci pour votre retour !",
      thisAnsweredMyQuestion: "Cela a r\xE9pondu \xE0 ma question",
      thisDidNotAnswerMyQuestion: "Cela n'a pas r\xE9pondu \xE0 ma question",
      unselectAnOptionToEnterInARange: "D\xE9s\xE9lectionnez une option pour saisir une plage.",
      updateYourLocation: "Mettez \xE0 jour votre emplacement",
      useCurrentLocation: "Utiliser la localisation actuelle",
      useMyLocation: "Utiliser ma localisation",
      viewAll: "Afficher tous",
      viewDetails: "Afficher les d\xE9tails"
    };
  }
});

// locales/hi/search-ui-react.json
var require_search_ui_react12 = __commonJS({
  "locales/hi/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "\u090F\u0906\u0908 \u0926\u094D\u0935\u093E\u0930\u093E \u091C\u0928\u0930\u0947\u091F \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u0909\u0924\u094D\u0924\u0930",
      allCategories: "\u0938\u092D\u0940 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0901",
      appliedFiltersToCurrentSearch: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0916\u094B\u091C \u092A\u0930 \u0932\u093E\u0917\u0942 \u092B\u093C\u093F\u0932\u094D\u091F\u0930",
      apply: "\u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902",
      applyFilters: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902",
      autocompleteOptionsFound_one: "{{count}}{{label}} \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0935\u093F\u0915\u0932\u094D\u092A \u092E\u093F\u0932\u093E\u0964",
      autocompleteOptionsFound_other: "{{count}}{{label}} \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0935\u093F\u0915\u0932\u094D\u092A \u092E\u093F\u0932\u0947\u0964",
      autocompleteSuggestion: "\u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0938\u0941\u091D\u093E\u0935: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0938\u0941\u091D\u093E\u0935 \u092E\u093F\u0932\u093E\u0964",
      autocompleteSuggestionsFound_other: "{{count}} \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0938\u0941\u091D\u093E\u0935 \u092E\u093F\u0932\u0947\u0964",
      basedOnYourDevice: " (\u0906\u092A\u0915\u0947 \u0921\u093F\u0935\u093E\u0907\u0938 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930)",
      basedOnYourInternetAddress: " (\u0906\u092A\u0915\u0947 \u0907\u0902\u091F\u0930\u0928\u0947\u091F \u092A\u0924\u0947 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930)",
      categoriesText_one: "\u0928\u093F\u092E\u094D\u0928\u0932\u093F\u0916\u093F\u0924 \u0936\u094D\u0930\u0947\u0923\u0940 \u092E\u0947\u0902 \u092A\u0930\u093F\u0923\u093E\u092E \u092E\u093F\u0932\u0947 - <strong>{{query}}</strong>",
      categoriesText_other: "\u0928\u093F\u092E\u094D\u0928\u0932\u093F\u0916\u093F\u0924 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u092A\u0930\u093F\u0923\u093E\u092E \u092E\u093F\u0932\u0947 - <strong>{{query}}</strong>",
      clearAll: "\u0938\u092D\u0940 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      clearMinAndMax: "\u0928\u094D\u092F\u0942\u0928\u0924\u092E \u0914\u0930 \u0905\u0927\u093F\u0915\u0924\u092E \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      clearTheRangeToSelectOptions: "\u0935\u093F\u0915\u0932\u094D\u092A \u091A\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u0940\u092E\u093E \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902\u0964",
      clearTheSearchBar: "\u0916\u094B\u091C \u092C\u093E\u0930 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      conductASearch: "\u0916\u094B\u091C \u0915\u0930\u0947\u0902",
      currentLocation: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0938\u094D\u0925\u093E\u0928",
      didYouMean: "\u0915\u094D\u092F\u093E \u0906\u092A\u0915\u093E \u092E\u0924\u0932\u092C <button>{{correctedQuery}}</button> \u0925\u093E",
      dropDownScreenReaderInstructions: "\u091C\u092C \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0923 \u092A\u0930\u093F\u0923\u093E\u092E \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u094B\u0902, \u0924\u094B \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0947 \u0932\u093F\u090F \u090A\u092A\u0930 \u0914\u0930 \u0928\u0940\u091A\u0947 \u0915\u0947 \u0924\u0940\u0930 \u0915\u0941\u0902\u091C\u0940 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902 \u0914\u0930 \u091A\u092F\u0928 \u0915\u0947 \u0932\u093F\u090F \u090F\u0902\u091F\u0930 \u0926\u092C\u093E\u090F\u0902\u0964",
      feedback: "\u092A\u094D\u0930\u0924\u093F\u0915\u094D\u0930\u093F\u092F\u093E",
      invalidRange: "\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u0940\u092E\u093E",
      max: "\u0905\u0927\u093F\u0915\u0924\u092E",
      min: "\u0928\u094D\u092F\u0942\u0928\u0924\u092E",
      navigateToTheNextResultsPage: "\u0905\u0917\u0932\u0947 \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0943\u0937\u094D\u0920 \u092A\u0930 \u091C\u093E\u090F\u0902",
      navigateToThePreviousResultsPage: "\u092A\u093F\u091B\u0932\u0947 \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0943\u0937\u094D\u0920 \u092A\u0930 \u091C\u093E\u090F\u0902",
      noAutocompleteOptionsFound: "\u0915\u094B\u0908 \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0935\u093F\u0915\u0932\u094D\u092A \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
      noAutocompleteSuggestionsFound: "\u0915\u094B\u0908 \u0938\u094D\u0935\u0924\u0903 \u092A\u0942\u0930\u094D\u0924\u093F \u0938\u0941\u091D\u093E\u0935 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
      noResultsFoundIn: "{{currentVerticalLabel}} \u092E\u0947\u0902 \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
      pagination: "\u092A\u0943\u0937\u094D\u0920\u093E\u0902\u0915\u0928",
      readMoreAbout: "<a>{{name}}</a> \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u0914\u0930 \u092A\u0922\u093C\u0947\u0902",
      recentSearch: "\u0939\u093E\u0932 \u0915\u0940 \u0916\u094B\u091C: {{query}}",
      recentSearchesFound_one: "{{count}} \u0939\u093E\u0932 \u0915\u0940 \u0916\u094B\u091C \u092E\u093F\u0932\u0940\u0964",
      recentSearchesFound_other: "{{count}} \u0939\u093E\u0932 \u0915\u0940 \u0916\u094B\u091C \u092E\u093F\u0932\u0940\u0902\u0964",
      removeFilter: "\u201C{{displayName}}\u201C \u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0939\u091F\u093E\u090F\u0902",
      resultPreview: "\u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928: {{value}}",
      resultPreviewsFound_one: "{{count}} \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u092E\u093F\u0932\u093E\u0964",
      resultPreviewsFound_other: "{{count}} \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u092E\u093F\u0932\u0947\u0964",
      resultsCountText_one: "{{count}} \u092A\u0930\u093F\u0923\u093E\u092E",
      resultsCountText_other: "{{count}} \u092A\u0930\u093F\u0923\u093E\u092E",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} \u092E\u0947\u0902 \u0938\u0947 \u0915\u0941\u0932 {{resultsCount}} \u092A\u0930\u093F\u0923\u093E\u092E",
      searchHere: "\u092F\u0939\u093E\u0901 \u0916\u094B\u091C\u0947\u0902\u2026",
      showLess: "\u0915\u092E \u0926\u093F\u0916\u093E\u090F\u0901",
      showMore: "\u0914\u0930 \u0926\u093F\u0916\u093E\u090F\u0901",
      showingAllInstead: "\u0907\u0938\u0915\u0947 \u092C\u091C\u093E\u092F \u0938\u092D\u0940 {{currentVerticalLabel}} \u0926\u093F\u0916\u093E \u0930\u0939\u0947 \u0939\u0948\u0902\u0964",
      sources_one: "\u0938\u094D\u0930\u094B\u0924",
      sources_other: "\u0938\u094D\u0930\u094B\u0924 ({{count}})",
      submitSearch: "\u0916\u094B\u091C \u091C\u092E\u093E \u0915\u0930\u0947\u0902",
      suggestionResultsCount_one: "{{label}} - {{count}} \u092A\u0930\u093F\u0923\u093E\u092E",
      suggestionResultsCount_other: "{{label}} - {{count}} \u092A\u0930\u093F\u0923\u093E\u092E",
      thankYouForYourFeedback: "\u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u0924\u093F\u0915\u094D\u0930\u093F\u092F\u093E \u0915\u0947 \u0932\u093F\u090F \u0927\u0928\u094D\u092F\u0935\u093E\u0926!",
      thisAnsweredMyQuestion: "\u0907\u0938\u0938\u0947 \u092E\u0947\u0930\u0947 \u092A\u094D\u0930\u0936\u094D\u0928 \u0915\u093E \u0909\u0924\u094D\u0924\u0930 \u092E\u093F\u0932\u093E",
      thisDidNotAnswerMyQuestion: "\u0907\u0938\u0938\u0947 \u092E\u0947\u0930\u0947 \u092A\u094D\u0930\u0936\u094D\u0928 \u0915\u093E \u0909\u0924\u094D\u0924\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
      unselectAnOptionToEnterInARange: "\u0938\u0940\u092E\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0915\u0932\u094D\u092A \u0905\u0928\u091A\u0947\u0915 \u0915\u0930\u0947\u0902\u0964",
      updateYourLocation: "\u0905\u092A\u0928\u093E \u0938\u094D\u0925\u093E\u0928 \u0905\u092A\u0921\u0947\u091F \u0915\u0930\u0947\u0902",
      useCurrentLocation: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0938\u094D\u0925\u093E\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902",
      useMyLocation: "\u092E\u0947\u0930\u093E \u0938\u094D\u0925\u093E\u0928 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902",
      viewAll: "\u0938\u092D\u0940 \u0926\u0947\u0916\u0947\u0902",
      viewDetails: "\u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902"
    };
  }
});

// locales/hr/search-ui-react.json
var require_search_ui_react13 = __commonJS({
  "locales/hr/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI generirani odgovor",
      allCategories: "Sve kategorije",
      appliedFiltersToCurrentSearch: "Primijenjeni filtri na trenutnu pretragu",
      apply: "Primijeni",
      applyFilters: "Primijeni filtere",
      autocompleteOptionsFound_few: "Prona\u0111ene su {{count}}{{label}} opcije za automatsko dovr\u0161avanje.",
      autocompleteOptionsFound_one: "Prona\u0111ena je {{count}}{{label}} opcija za automatsko dovr\u0161avanje.",
      autocompleteOptionsFound_other: "Prona\u0111eno je {{count}}{{label}} opcija za automatsko dovr\u0161avanje.",
      autocompleteSuggestion: "prijedlog za automatsko dovr\u0161avanje: {{suggestion}}",
      autocompleteSuggestionsFound_few: "Prona\u0111ena su {{count}} prijedloga za automatsko dovr\u0161avanje.",
      autocompleteSuggestionsFound_one: "Prona\u0111en je {{count}} prijedlog za automatsko dovr\u0161avanje.",
      autocompleteSuggestionsFound_other: "Prona\u0111eno je {{count}} prijedloga za automatsko dovr\u0161avanje.",
      basedOnYourDevice: " (na temelju va\u0161eg ure\u0111aja)",
      basedOnYourInternetAddress: " (na temelju va\u0161e internet adrese)",
      categoriesText_few: "Sljede\u0107e kategorije dale su rezultate za - <strong>{{query}}</strong>",
      categoriesText_one: "Sljede\u0107a kategorija dala je rezultate za - <strong>{{query}}</strong>",
      categoriesText_other: "Sljede\u0107e kategorije dale su rezultate za - <strong>{{query}}</strong>",
      clearAll: "O\u010Disti sve",
      clearMinAndMax: "O\u010Disti min i max",
      clearTheRangeToSelectOptions: "O\u010Distite raspon za odabir opcija.",
      clearTheSearchBar: "O\u010Distite traku za pretra\u017Eivanje",
      conductASearch: "Provesti pretragu",
      currentLocation: "Trenutna lokacija",
      didYouMean: "Jeste li mislili na <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Kad su dostupni rezultati automatskog dovr\u0161avanja, koristite strelice gore i dolje za pregled i Enter za odabir.",
      feedback: "Povratne informacije",
      invalidRange: "Neva\u017Ee\u0107i raspon",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Do\u0111ite do sljede\u0107e stranice rezultata",
      navigateToThePreviousResultsPage: "Do\u0111ite do stranice s prethodnim rezultatima",
      noAutocompleteOptionsFound: "Nije prona\u0111ena 0 opcija automatskog dovr\u0161avanja.",
      noAutocompleteSuggestionsFound: "Nije prona\u0111en 0 prijedloga za automatsko dovr\u0161avanje.",
      noResultsFoundIn: "Nema rezultata u {{currentVerticalLabel}}.",
      pagination: "Paginacija",
      readMoreAbout: "Pro\u010Ditaj vi\u0161e o <a>{{name}}</a>",
      recentSearch: "nedavno pretra\u017Eivanje: {{query}}",
      recentSearchesFound_few: "Prona\u0111ene su {{count}} nedavne pretrage.",
      recentSearchesFound_one: "Prona\u0111ena je {{count}} nedavna pretraga.",
      recentSearchesFound_other: "Prona\u0111eno je {{count}} nedavnih pretraga.",
      removeFilter: "Ukloni filtar \u201E{{displayName}}\u201C",
      resultPreview: "pregled rezultata: {{value}}",
      resultPreviewsFound_few: "Prona\u0111ena su {{count}} pregleda rezultata.",
      resultPreviewsFound_one: "Prona\u0111en je {{count}} pregled rezultata.",
      resultPreviewsFound_other: "Prona\u0111eno je {{count}} pregleda rezultata.",
      resultsCountText_few: "{{count}} rezultata",
      resultsCountText_one: "{{count}} rezultat",
      resultsCountText_other: "{{count}} rezultata",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} od {{resultsCount}} rezultata",
      searchHere: "Pretra\u017Eite ovdje\u2026",
      showLess: "Prika\u017Ei manje",
      showMore: "Prika\u017Ei vi\u0161e",
      showingAllInstead: "Prikazuju se svi {{currentVerticalLabel}} umjesto toga.",
      sources_few: "Izvora ({{count}})",
      sources_one: "Izvor",
      sources_other: "Izvori ({{count}})",
      submitSearch: "Po\u0161aljite pretragu",
      suggestionResultsCount_few: "{{label}} - {{count}} rezultata",
      suggestionResultsCount_one: "{{label}} - {{count}} rezultat",
      suggestionResultsCount_other: "{{label}} - {{count}} rezultata",
      thankYouForYourFeedback: "Hvala na va\u0161oj povratnoj informaciji!",
      thisAnsweredMyQuestion: "Ovo je odgovorilo na moje pitanje",
      thisDidNotAnswerMyQuestion: "Ovo nije odgovorilo na moje pitanje",
      unselectAnOptionToEnterInARange: "Poni\u0161tite odabir opcije da biste unijeli raspon.",
      updateYourLocation: "A\u017Eurirajte svoje mjesto",
      useCurrentLocation: "Koristi trenutnu lokaciju",
      useMyLocation: "Koristi moju lokaciju",
      viewAll: "Pogledajte sve",
      viewDetails: "Pogledajte detalje"
    };
  }
});

// locales/hu/search-ui-react.json
var require_search_ui_react14 = __commonJS({
  "locales/hu/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI gener\xE1lt v\xE1lasz",
      allCategories: "\xD6sszes kateg\xF3ria",
      appliedFiltersToCurrentSearch: "Alkalmazott sz\u0171r\u0151k az aktu\xE1lis keres\xE9sre",
      apply: "Alkalmaz",
      applyFilters: "Sz\u0171r\u0151k alkalmaz\xE1sa",
      autocompleteOptionsFound_one: "{{count}}{{label}} automatikus kieg\xE9sz\xEDt\xE9si opci\xF3 tal\xE1lhat\xF3.",
      autocompleteOptionsFound_other: "{{count}}{{label}} automatikus kieg\xE9sz\xEDt\xE9si opci\xF3 tal\xE1lhat\xF3.",
      autocompleteSuggestion: "automatikus kieg\xE9sz\xEDt\xE9si javaslat: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} automatikus javaslat tal\xE1lhat\xF3.",
      autocompleteSuggestionsFound_other: "{{count}} automatikus javaslat tal\xE1lhat\xF3.",
      basedOnYourDevice: " (a k\xE9sz\xFCl\xE9k alapj\xE1n)",
      basedOnYourInternetAddress: " (az internetes c\xEDm alapj\xE1n)",
      categoriesText_one: "Az al\xE1bbi kateg\xF3ria adott tal\xE1latot erre: - <strong>{{query}}</strong>",
      categoriesText_other: "Az al\xE1bbi kateg\xF3ri\xE1k adtak tal\xE1latot erre: - <strong>{{query}}</strong>",
      clearAll: "Tiszt\xEDtsa meg az \xF6sszeset",
      clearMinAndMax: "T\xF6r\xF6ld a minimumot \xE9s maximumot",
      clearTheRangeToSelectOptions: "T\xF6r\xF6lje az Opci\xF3k kiv\xE1laszt\xE1s\xE1hoz a tartom\xE1nyt.",
      clearTheSearchBar: "T\xF6r\xF6lje a keres\u0151s\xE1vot",
      conductASearch: "Kutat\xE1st v\xE9gez",
      currentLocation: "Jelenlegi helyzet",
      didYouMean: "Ezt szerette volna: <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Ha automatikus kieg\xE9sz\xEDt\xE9si eredm\xE9nyek \xE9rhet\u0151k el, haszn\xE1ld a fel/le nyilakat a b\xF6ng\xE9sz\xE9shez, \xE9s az Entert a kiv\xE1laszt\xE1shoz.",
      feedback: "Visszacsatol\xE1s",
      invalidRange: "\xC9rv\xE9nytelen hat\xF3t\xE1vols\xE1g",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Keresse meg a k\xF6vetkez\u0151 eredm\xE9nyoldalt",
      navigateToThePreviousResultsPage: "Keresse meg az el\u0151z\u0151 eredm\xE9nyoldalt",
      noAutocompleteOptionsFound: "0 automatikus kieg\xE9sz\xEDt\xE9si lehet\u0151s\xE9g tal\xE1lhat\xF3.",
      noAutocompleteSuggestionsFound: "0 automatikus kieg\xE9sz\xEDt\xE9si javaslat tal\xE1lhat\xF3.",
      noResultsFoundIn: "Nem tal\xE1lhat\xF3k tal\xE1latok a(z) {{currentVerticalLabel}}-ben.",
      pagination: "Lapoz\xE1s",
      readMoreAbout: "Olvass t\xF6bbet err\u0151l: <a>{{name}}</a>",
      recentSearch: "legut\xF3bbi keres\xE9s: {{query}}",
      recentSearchesFound_one: "{{count}} legut\xF3bbi keres\xE9s tal\xE1lhat\xF3.",
      recentSearchesFound_other: "{{count}} legut\xF3bbi keres\xE9s tal\xE1lhat\xF3.",
      removeFilter: "\u201E{{displayName}}\u201C sz\u0171r\u0151 elt\xE1vol\xEDt\xE1sa",
      resultPreview: "tal\xE1lati el\u0151n\xE9zete: {{value}}",
      resultPreviewsFound_one: "{{count}} tal\xE1lati el\u0151n\xE9zet tal\xE1lhat\xF3.",
      resultPreviewsFound_other: "{{count}} tal\xE1lati el\u0151n\xE9zet tal\xE1lhat\xF3.",
      resultsCountText_one: "{{count}} tal\xE1lat",
      resultsCountText_other: "{{count}} tal\xE1lat",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} / \xF6sszesen {{resultsCount}} tal\xE1lat",
      searchHere: "Keressen itt\u2026",
      showLess: "Kevesebb mutat\xE1sa",
      showMore: "T\xF6bb mutat\xE1sa",
      showingAllInstead: "Helyette az \xF6sszes {{currentVerticalLabel}} megjelen\xEDt\xE9se.",
      sources_one: "Forr\xE1s ({{count}})",
      sources_other: "Forr\xE1sok ({{count}})",
      submitSearch: "K\xFCldje el a keres\xE9st",
      suggestionResultsCount_one: "{{label}} - {{count}} tal\xE1lat",
      suggestionResultsCount_other: "{{label}} - {{count}} tal\xE1lat",
      thankYouForYourFeedback: "K\xF6sz\xF6nj\xFCk a visszajelz\xE9s\xE9t!",
      thisAnsweredMyQuestion: "Ez megv\xE1laszolta a k\xE9rd\xE9semet",
      thisDidNotAnswerMyQuestion: "Ez nem v\xE1laszolta meg a k\xE9rd\xE9semet",
      unselectAnOptionToEnterInARange: "T\xF6r\xF6lj\xF6n egy jel\xF6l\xE9st a tartom\xE1ny megad\xE1s\xE1hoz.",
      updateYourLocation: "Friss\xEDtse a tart\xF3zkod\xE1si hely\xE9t",
      useCurrentLocation: "Haszn\xE1ld a jelenlegi helyzetet",
      useMyLocation: "Haszn\xE1ld a helyzetemet",
      viewAll: "Tekintse meg az \xF6sszeset",
      viewDetails: "A r\xE9szletek megtekint\xE9se"
    };
  }
});

// locales/it/search-ui-react.json
var require_search_ui_react15 = __commonJS({
  "locales/it/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Risposta generata dall'IA",
      allCategories: "Tutte le categorie",
      appliedFiltersToCurrentSearch: "Filtri applicati alla ricerca corrente",
      apply: "Applica",
      applyFilters: "Applica filtri",
      autocompleteOptionsFound_one: "{{count}}{{label}} opzione di completamento automatico trovata.",
      autocompleteOptionsFound_other: "{{count}}{{label}} opzioni di completamento automatico trovate.",
      autocompleteSuggestion: "suggerimento di completamento automatico: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} suggerimento di completamento automatico trovato.",
      autocompleteSuggestionsFound_other: "{{count}} suggerimenti di completamento automatico trovati.",
      basedOnYourDevice: " (basato sul tuo dispositivo)",
      basedOnYourInternetAddress: " (basato sul tuo indirizzo internet)",
      categoriesText_one: "La seguente categoria ha prodotto risultati per \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "Le seguenti categorie hanno prodotto risultati per \u2013 <strong>{{query}}</strong>",
      clearAll: "Cancella tutto",
      clearMinAndMax: "Cancella min e max",
      clearTheRangeToSelectOptions: "Cancella l'intervallo per selezionare le opzioni.",
      clearTheSearchBar: "Cancella la barra di ricerca",
      conductASearch: "Condurre una ricerca",
      currentLocation: "Posizione attuale",
      didYouMean: "Volevi dire <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Quando sono disponibili i risultati di completamento automatico, usa le frecce su e gi\xF9 per rivedere e invio per selezionare.",
      feedback: "Feedback",
      invalidRange: "Gamma non valida",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Passare alla pagina dei risultati successivi",
      navigateToThePreviousResultsPage: "Passare alla pagina dei risultati precedenti",
      noAutocompleteOptionsFound: "0 opzioni di completamento automatico trovate.",
      noAutocompleteSuggestionsFound: "0 suggerimenti di completamento automatico trovati.",
      noResultsFoundIn: "Nessun risultato trovato in {{currentVerticalLabel}}.",
      pagination: "Paginazione",
      readMoreAbout: "Leggi di pi\xF9 su <a>{{name}}</a>",
      recentSearch: "ricerca recente: {{query}}",
      recentSearchesFound_one: "{{count}} ricerca recente trovata.",
      recentSearchesFound_other: "{{count}} ricerche recenti trovate.",
      removeFilter: "Rimuovi il filtro \xAB{{displayName}}\xBB",
      resultPreview: "anteprima dei risultati: {{value}}",
      resultPreviewsFound_one: "{{count}} anteprima del risultato trovata.",
      resultPreviewsFound_other: "{{count}} anteprime dei risultati trovate.",
      resultsCountText_one: "{{count}} risultato",
      resultsCountText_other: "{{count}} risultati",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} di {{resultsCount}} risultati",
      searchHere: "Cerca qui\u2026",
      showLess: "Mostra meno",
      showMore: "Mostra di pi\xF9",
      showingAllInstead: "Mostrando invece tutti i {{currentVerticalLabel}}.",
      sources_one: "Fonte",
      sources_other: "Fonti ({{count}})",
      submitSearch: "Invia la ricerca",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} risultato",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} risultati",
      thankYouForYourFeedback: "Grazie per il tuo feedback!",
      thisAnsweredMyQuestion: "Questa risposta ha risolto il mio dubbio",
      thisDidNotAnswerMyQuestion: "Questa risposta non ha risolto il mio dubbio",
      unselectAnOptionToEnterInARange: "Deseleziona un\u2019opzione per inserire un intervallo.",
      updateYourLocation: "Aggiorna la tua posizione",
      useCurrentLocation: "Usa la posizione attuale",
      useMyLocation: "Usa la mia posizione",
      viewAll: "Visualizza tutto",
      viewDetails: "Visualizza i dettagli"
    };
  }
});

// locales/ja/search-ui-react.json
var require_search_ui_react16 = __commonJS({
  "locales/ja/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI\u751F\u6210\u3055\u308C\u305F\u56DE\u7B54",
      allCategories: "\u3059\u3079\u3066\u306E\u30AB\u30C6\u30B4\u30EA\u30FC",
      appliedFiltersToCurrentSearch: "\u73FE\u5728\u306E\u691C\u7D22\u306B\u9069\u7528\u3055\u308C\u305F\u30D5\u30A3\u30EB\u30BF\u30FC",
      apply: "\u9069\u7528",
      applyFilters: "\u30D5\u30A3\u30EB\u30BF\u30FC\u3092\u9069\u7528",
      autocompleteOptionsFound_other: "{{label}}\u306E\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8\u5019\u88DC\u304C{{count}}\u4EF6\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      autocompleteSuggestion: "\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8\u306E\u63D0\u6848\uFF1A{{suggestion}}",
      autocompleteSuggestionsFound_other: "{{count}} \u4EF6\u306E\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8\u5019\u88DC\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      basedOnYourDevice: "\uFF08\u30C7\u30D0\u30A4\u30B9\u306B\u57FA\u3065\u304F\uFF09",
      basedOnYourInternetAddress: "\uFF08\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u30A2\u30C9\u30EC\u30B9\u306B\u57FA\u3065\u304F\uFF09",
      categoriesText_other: "\u6B21\u306E\u30AB\u30C6\u30B4\u30EA\u3067\u306F\u3001 -  <strong> {{query}} </strong>\u306E\u7D50\u679C\u304C\u5F97\u3089\u308C\u307E\u3057\u305F",
      clearAll: "\u3059\u3079\u3066\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059",
      clearMinAndMax: "\u6700\u5C0F\u5024\u3068\u6700\u5927\u5024\u3092\u30AF\u30EA\u30A2",
      clearTheRangeToSelectOptions: "\u7BC4\u56F2\u3092\u30AF\u30EA\u30A2\u3057\u3066\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u9078\u629E\u3057\u307E\u3059\u3002",
      clearTheSearchBar: "\u691C\u7D22\u30D0\u30FC\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059",
      conductASearch: "\u691C\u7D22\u3092\u5B9F\u65BD\u3057\u307E\u3059",
      currentLocation: "\u73FE\u5728\u5730",
      didYouMean: "<button>{{correctedQuery}}</button> \u3068\u8A00\u3044\u305F\u304B\u3063\u305F\u3067\u3059\u304B",
      dropDownScreenReaderInstructions: "\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8\u7D50\u679C\u304C\u5229\u7528\u53EF\u80FD\u306A\u5834\u5408\u3001\u2191\u2193\u30AD\u30FC\u3067\u9078\u629E\u3057\u3001Enter \u30AD\u30FC\u3067\u9078\u629E\u3002",
      feedback: "\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF",
      invalidRange: "\u7121\u52B9\u306A\u7BC4\u56F2",
      max: "\u6700\u5927",
      min: "\u6700\u5C0F",
      navigateToTheNextResultsPage: "\u6B21\u306E\u7D50\u679C\u30DA\u30FC\u30B8\u306B\u79FB\u52D5\u3057\u307E\u3059",
      navigateToThePreviousResultsPage: "\u524D\u306E\u7D50\u679C\u30DA\u30FC\u30B8\u306B\u79FB\u52D5\u3057\u307E\u3059",
      noAutocompleteOptionsFound: "\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8 \u30AA\u30D7\u30B7\u30E7\u30F3\u304C 0 \u4EF6\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      noAutocompleteSuggestionsFound: "\u30AA\u30FC\u30C8\u30B3\u30F3\u30D7\u30EA\u30FC\u30C8\u5019\u88DC\u304C 0 \u4EF6\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      noResultsFoundIn: "{{currentVerticalLabel}}\u3067\u7D50\u679C\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
      pagination: "\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3",
      readMoreAbout: "<a>{{name}}</a> \u306B\u3064\u3044\u3066\u8A73\u3057\u304F\u8AAD\u3080",
      recentSearch: "\u6700\u8FD1\u306E\u691C\u7D22\uFF1A{{query}}",
      recentSearchesFound_other: "{{count}} \u4EF6\u306E\u6700\u8FD1\u306E\u691C\u7D22\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      removeFilter: "\u300C{{displayName}}\u300D \u30D5\u30A3\u30EB\u30BF\u30FC\u3092\u524A\u9664",
      resultPreview: "\u7D50\u679C\u30D7\u30EC\u30D3\u30E5\u30FC\uFF1A{{value}}",
      resultPreviewsFound_other: "{{count}} \u4EF6\u306E\u7D50\u679C\u30D7\u30EC\u30D3\u30E5\u30FC\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002",
      resultsCountText_other: "{{count}}\u4EF6",
      resultsCountWithPaginationText: "{{paginateStart}}\u301C{{paginateEnd}}\uFF0F\u5168{{resultsCount}}\u4EF6",
      searchHere: "\u3053\u3053\u3067\u691C\u7D22\u2026",
      showLess: "\u6298\u308A\u305F\u305F\u3080",
      showMore: "\u3082\u3063\u3068\u898B\u308B",
      showingAllInstead: "\u4EE3\u308F\u308A\u306B\u3059\u3079\u3066\u306E{{currentVerticalLabel}}\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059\u3002",
      sources_other: "\u51FA\u5178\uFF08{{count}}\uFF09",
      submitSearch: "\u691C\u7D22\u3092\u9001\u4FE1\u3057\u307E\u3059",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} \u4EF6\u306E\u7D50\u679C",
      thankYouForYourFeedback: "\u3054\u610F\u898B\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\uFF01",
      thisAnsweredMyQuestion: "\u3053\u306E\u56DE\u7B54\u3067\u7591\u554F\u304C\u89E3\u6C7A\u3057\u307E\u3057\u305F",
      thisDidNotAnswerMyQuestion: "\u3053\u306E\u56DE\u7B54\u3067\u306F\u7591\u554F\u304C\u89E3\u6C7A\u3057\u307E\u305B\u3093\u3067\u3057\u305F",
      unselectAnOptionToEnterInARange: "\u7BC4\u56F2\u3092\u5165\u529B\u3059\u308B\u306B\u306F\u3001\u9078\u629E\u3092\u89E3\u9664\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      updateYourLocation: "\u3042\u306A\u305F\u306E\u5834\u6240\u3092\u66F4\u65B0\u3057\u307E\u3059",
      useCurrentLocation: "\u73FE\u5728\u5730\u3092\u4F7F\u7528",
      useMyLocation: "\u73FE\u5728\u5730\u3092\u4F7F\u7528",
      viewAll: "\u3059\u3079\u3066\u3092\u8868\u793A\u3057\u307E\u3059",
      viewDetails: "\u8A73\u7D30\u3092\u8868\u793A\u3057\u307E\u3059"
    };
  }
});

// locales/ko/search-ui-react.json
var require_search_ui_react17 = __commonJS({
  "locales/ko/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI \uC0DD\uC131 \uB2F5\uBCC0",
      allCategories: "\uC804\uCCB4 \uCE74\uD14C\uACE0\uB9AC",
      appliedFiltersToCurrentSearch: "\uD604\uC7AC \uAC80\uC0C9\uC5D0 \uC801\uC6A9\uB41C \uD544\uD130",
      apply: "\uC801\uC6A9",
      applyFilters: "\uD544\uD130 \uC801\uC6A9",
      autocompleteOptionsFound_other: "{{count}}{{label}}\uAC1C\uC758 \uC790\uB3D9\uC644\uC131 \uC635\uC158\uC744 \uCC3E\uC558\uC2B5\uB2C8\uB2E4.",
      autocompleteSuggestion: "\uC790\uB3D9\uC644\uC131 \uC81C\uC548: {{suggestion}}",
      autocompleteSuggestionsFound_other: "{{count}}\uAC1C\uC758 \uC790\uB3D9\uC644\uC131 \uC81C\uC548\uC744 \uCC3E\uC558\uC2B5\uB2C8\uB2E4.",
      basedOnYourDevice: " (\uAE30\uAE30 \uAE30\uC900)",
      basedOnYourInternetAddress: " (\uC778\uD130\uB137 \uC8FC\uC18C \uAE30\uC900)",
      categoriesText_other: "\uB2E4\uC74C \uCE74\uD14C\uACE0\uB9AC\uC5D0\uC11C \uACB0\uACFC\uAC00 \uB098\uD0C0\uB0AC\uC2B5\uB2C8\uB2E4: <strong>{{query}}</strong>",
      clearAll: "\uBAA8\uB450 \uC9C0\uC6B0\uAE30",
      clearMinAndMax: "\uCD5C\uC18C\uAC12 \uBC0F \uCD5C\uB300\uAC12 \uC9C0\uC6B0\uAE30",
      clearTheRangeToSelectOptions: "\uBC94\uC704\uB97C \uC9C0\uC6CC \uC635\uC158\uC744 \uC120\uD0DD\uD558\uC138\uC694.",
      clearTheSearchBar: "\uAC80\uC0C9\uCC3D \uC9C0\uC6B0\uAE30",
      conductASearch: "\uAC80\uC0C9 \uC2E4\uD589",
      currentLocation: "\uD604\uC7AC \uC704\uCE58",
      didYouMean: "\uB2E4\uC74C\uC744 \uCC3E\uC73C\uC168\uB098\uC694 <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "\uC790\uB3D9\uC644\uC131 \uACB0\uACFC\uAC00 \uC788\uC744 \uB54C \uC704/\uC544\uB798 \uD654\uC0B4\uD45C\uB85C \uD0D0\uC0C9\uD558\uACE0 Enter \uD0A4\uB85C \uC120\uD0DD\uD558\uC138\uC694.",
      feedback: "\uD53C\uB4DC\uBC31",
      invalidRange: "\uC798\uBABB\uB41C \uBC94\uC704\uC785\uB2C8\uB2E4",
      max: "\uCD5C\uB300",
      min: "\uCD5C\uC18C",
      navigateToTheNextResultsPage: "\uB2E4\uC74C \uACB0\uACFC \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
      navigateToThePreviousResultsPage: "\uC774\uC804 \uACB0\uACFC \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
      noAutocompleteOptionsFound: "\uC790\uB3D9\uC644\uC131 \uC635\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
      noAutocompleteSuggestionsFound: "\uC790\uB3D9\uC644\uC131 \uC81C\uC548\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
      noResultsFoundIn: "{{currentVerticalLabel}}\uC5D0\uC11C \uACB0\uACFC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      pagination: "\uD398\uC774\uC9C0\uB124\uC774\uC158",
      readMoreAbout: "<a>{{name}}</a>\uC5D0 \uB300\uD574 \uB354 \uC77D\uAE30",
      recentSearch: "\uCD5C\uADFC \uAC80\uC0C9: {{query}}",
      recentSearchesFound_other: "{{count}}\uAC1C\uC758 \uCD5C\uADFC \uAC80\uC0C9\uC5B4\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
      removeFilter: "\u300C{{displayName}}\u300D\uD544\uD130 \uC81C\uAC70",
      resultPreview: "\uACB0\uACFC \uBBF8\uB9AC\uBCF4\uAE30: {{value}}",
      resultPreviewsFound_other: "{{count}}\uAC1C\uC758 \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uCC3E\uC558\uC2B5\uB2C8\uB2E4.",
      resultsCountText_other: "{{count}}\uAC1C \uACB0\uACFC",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} / \uCD1D {{resultsCount}}\uAC1C \uACB0\uACFC",
      searchHere: "\uC5EC\uAE30\uC5D0 \uAC80\uC0C9\u2026",
      showLess: "\uAC04\uB7B5\uD788 \uBCF4\uAE30",
      showMore: "\uB354 \uBCF4\uAE30",
      showingAllInstead: "{{currentVerticalLabel}} \uC804\uCCB4\uB97C \uD45C\uC2DC\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.",
      sources_other: "\uCD9C\uCC98 ({{count}})",
      submitSearch: "\uAC80\uC0C9",
      suggestionResultsCount_other: "{{label}} - {{count}}\uAC1C \uACB0\uACFC",
      thankYouForYourFeedback: "\uD53C\uB4DC\uBC31 \uAC10\uC0AC\uD569\uB2C8\uB2E4!",
      thisAnsweredMyQuestion: "\uC9C8\uBB38\uC5D0 \uB300\uD55C \uB2F5\uBCC0\uC774 \uB418\uC5C8\uC2B5\uB2C8\uB2E4",
      thisDidNotAnswerMyQuestion: "\uC9C8\uBB38\uC5D0 \uB300\uD55C \uB2F5\uBCC0\uC774 \uC544\uB2D9\uB2C8\uB2E4",
      unselectAnOptionToEnterInARange: "\uBC94\uC704\uB97C \uC785\uB825\uD558\uB824\uBA74 \uC120\uD0DD\uC744 \uCDE8\uC18C\uD558\uC138\uC694.",
      updateYourLocation: "\uC704\uCE58 \uC5C5\uB370\uC774\uD2B8",
      useCurrentLocation: "\uD604\uC7AC \uC704\uCE58 \uC0AC\uC6A9",
      useMyLocation: "\uB0B4 \uC704\uCE58 \uC0AC\uC6A9",
      viewAll: "\uC804\uCCB4 \uBCF4\uAE30",
      viewDetails: "\uC790\uC138\uD788 \uBCF4\uAE30"
    };
  }
});

// locales/lt/search-ui-react.json
var require_search_ui_react18 = __commonJS({
  "locales/lt/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Dirbtinio intelekto sugeneruotas atsakymas",
      allCategories: "Visos kategorijos",
      appliedFiltersToCurrentSearch: "Taikyti filtrai dabartiniam paie\u0161kai",
      apply: "Taikyti",
      applyFilters: "Taikyti filtrus",
      autocompleteOptionsFound_few: "Rastos {{count}}{{label}} automatinio u\u017Ebaigimo parinktys.",
      autocompleteOptionsFound_one: "Rasta {{count}}{{label}} automatinio u\u017Ebaigimo parinktis.",
      autocompleteOptionsFound_other: "Rasta {{count}}{{label}} automatinio u\u017Ebaigimo parink\u010Di\u0173.",
      autocompleteSuggestion: "automatinis u\u017Ebaigimas pasi\u016Blymas: {{suggestion}}",
      autocompleteSuggestionsFound_few: "Rasti {{count}} automatinio u\u017Ebaigimo pasi\u016Blymai.",
      autocompleteSuggestionsFound_one: "Rastas {{count}} automatinio u\u017Ebaigimo pasi\u016Blymas.",
      autocompleteSuggestionsFound_other: "Rasta {{count}} automatinio u\u017Ebaigimo pasi\u016Blym\u0173.",
      basedOnYourDevice: " (remiantis j\u016Bs\u0173 \u012Frenginiu)",
      basedOnYourInternetAddress: " (remiantis j\u016Bs\u0173 interneto adresu)",
      categoriesText_few: "\u0160ios kategorijos pateik\u0117 rezultatus \u2013 <strong>{{query}}</strong>",
      categoriesText_one: "\u0160i kategorija pateik\u0117 rezultatus \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "\u0160i\u0173 kategorij\u0173 pateikta rezultat\u0173 \u2013 <strong>{{query}}</strong>",
      clearAll: "I\u0161valyti visk\u0105",
      clearMinAndMax: "I\u0161valyti min ir max",
      clearTheRangeToSelectOptions: "I\u0161valykite diapazon\u0105, kur\u012F galite pasirinkti parinktys.",
      clearTheSearchBar: "I\u0161valykite paie\u0161kos juost\u0105",
      conductASearch: "Atlikite paie\u0161k\u0105",
      currentLocation: "Dabartin\u0117 vieta",
      didYouMean: "Ar tur\u0117jote omenyje <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Kai yra automatinio u\u017Ebaigimo rezultatai, naudokite rodykles auk\u0161tyn ir \u017Eemyn nar\u0161ymui ir Enter pasirinkimui.",
      feedback: "Atsiliepimai",
      invalidRange: "Neteisingas diapazonas",
      max: "Maks.",
      min: "Min.",
      navigateToTheNextResultsPage: "Eikite \u012F kit\u0105 rezultat\u0173 puslap\u012F",
      navigateToThePreviousResultsPage: "Eikite \u012F ankstesn\u012F rezultat\u0173 puslap\u012F",
      noAutocompleteOptionsFound: "0 automaatse t\xE4itmise valikut ei leitud.",
      noAutocompleteSuggestionsFound: "0 automaatse t\xE4itmise soovitust ei leitud.",
      noResultsFoundIn: "Rezultat\u0173 nerasta {{currentVerticalLabel}}.",
      pagination: "Puslapiavimas",
      readMoreAbout: "Skaityti daugiau apie <a>{{name}}</a>",
      recentSearch: "Naujausia paie\u0161ka: {{query}}",
      recentSearchesFound_few: "Rastos {{count}} neseniai atliktos paie\u0161kos.",
      recentSearchesFound_one: "Rasta {{count}} neseniai atlikta paie\u0161ka.",
      recentSearchesFound_other: "Rasta {{count}} neseniai atlikt\u0173 paie\u0161k\u0173.",
      removeFilter: "Pa\u0161alinti filtr\u0105: \u201E{{displayName}}\u201C",
      resultPreview: "rezultato per\u017Ei\u016Bra: {{value}}",
      resultPreviewsFound_few: "Rastos {{count}} rezultat\u0173 per\u017Ei\u016Bros.",
      resultPreviewsFound_one: "Rasta {{count}} rezultat\u0173 per\u017Ei\u016Bra.",
      resultPreviewsFound_other: "Rasta {{count}} rezultat\u0173 per\u017Ei\u016Br\u0173.",
      resultsCountText_few: "{{count}} rezultatai",
      resultsCountText_one: "{{count}} rezultatas",
      resultsCountText_other: "{{count}} rezultat\u0173",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} i\u0161 {{resultsCount}} rezultat\u0173",
      searchHere: "Ie\u0161kokite \u010Dia\u2026",
      showLess: "Rodyti ma\u017Eiau",
      showMore: "Rodyti daugiau",
      showingAllInstead: "Vietoje to rodomi visi {{currentVerticalLabel}}.",
      sources_few: "\u0160altiniai ({{count}})",
      sources_one: "\u0160altinis",
      sources_other: "\u0160altini\u0173 ({{count}})",
      submitSearch: "Pateikti paie\u0161k\u0105",
      suggestionResultsCount_few: "{{label}} \u2013 {{count}} rezultatai",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} rezultatas",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} rezultat\u0173",
      thankYouForYourFeedback: "A\u010Di\u016B u\u017E j\u016Bs\u0173 atsiliepimus!",
      thisAnsweredMyQuestion: "Tai atsak\u0117 \u012F mano klausim\u0105",
      thisDidNotAnswerMyQuestion: "Tai neatsak\u0117 \u012F mano klausim\u0105",
      unselectAnOptionToEnterInARange: "At\u017Eym\u0117kite parinkt\u012F, kad gal\u0117tum\u0117te \u012Fvesti interval\u0105.",
      updateYourLocation: "Atnaujinkite savo viet\u0105",
      useCurrentLocation: "Naudoti dabartin\u0119 viet\u0105",
      useMyLocation: "Naudoti mano viet\u0105",
      viewAll: "Per\u017Ei\u016Br\u0117ti visus",
      viewDetails: "Per\u017Ei\u016Br\u0117ti i\u0161sami\u0105 informacij\u0105"
    };
  }
});

// locales/lv/search-ui-react.json
var require_search_ui_react19 = __commonJS({
  "locales/lv/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI \u0123ener\u0113ta atbilde",
      allCategories: "Visas kategorijas",
      appliedFiltersToCurrentSearch: "Pielietotie filtri pa\u0161reiz\u0113jai mekl\u0113\u0161anai",
      apply: "Pielietot",
      applyFilters: "Pielietot filtrus",
      autocompleteOptionsFound_one: "Atrasta {{count}}{{label}} autom\u0101tisk\u0101s aizpildes iesp\u0113ja.",
      autocompleteOptionsFound_other: "Atrastas {{count}}{{label}} autom\u0101tisk\u0101s aizpildes iesp\u0113jas.",
      autocompleteOptionsFound_zero: "Nav atrasta neviena{{label}} autom\u0101tisk\u0101s aizpildes iesp\u0113jas.",
      autocompleteSuggestion: "autom\u0101tisk\u0101s pabeig\u0161anas ieteikums: {{suggestion}}",
      autocompleteSuggestionsFound_one: "Atrasts {{count}} autom\u0101t\u0101s aizpildes ieteikums.",
      autocompleteSuggestionsFound_other: "Atrasti {{count}} autom\u0101tisk\u0101s aizpildes ieteikumi.",
      autocompleteSuggestionsFound_zero: "Atrasti {{count}} autom\u0101tisk\u0101s aizpildes ieteikumi.",
      basedOnYourDevice: " (balstoties uz j\u016Bsu ier\u012Bci)",
      basedOnYourInternetAddress: " (balstoties uz j\u016Bsu interneta adresi)",
      categoriesText_one: "N\u0101kam\u0101 kategorija deva rezult\u0101tus priek\u0161 \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "N\u0101kamo kategoriju skaits deva rezult\u0101tus priek\u0161 \u2013 <strong>{{query}}</strong>",
      categoriesText_zero: "Nav neviena rezult\u0101ta kategorijai \u2013 <strong>{{query}}</strong>",
      clearAll: "Not\u012Br\u012Bt visu",
      clearMinAndMax: "Not\u012Br\u012Bt min un max",
      clearTheRangeToSelectOptions: "Not\u012Briet diapazonu, lai izv\u0113l\u0113tos opcijas.",
      clearTheSearchBar: "Not\u012Briet mekl\u0113\u0161anas joslu",
      conductASearch: "Veikt mekl\u0113\u0161anu",
      currentLocation: "Pa\u0161reiz\u0113j\u0101 atra\u0161an\u0101s vieta",
      didYouMean: "Vai j\u016Bs dom\u0101j\u0101t <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Kad ir pieejami autom\u0101tisk\u0101s pabeig\u0161anas rezult\u0101ti, izmantojiet bulti\u0146as uz aug\u0161u un leju, lai p\u0101rl\u016Bkotu, un Enter, lai izv\u0113l\u0113tos.",
      feedback: "Atsauksmes",
      invalidRange: "Neder\u012Bgs diapazons",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Dodieties uz n\u0101kamo rezult\u0101tu lapu",
      navigateToThePreviousResultsPage: "Dodieties uz iepriek\u0161\u0113jo rezult\u0101tu lapu",
      noAutocompleteOptionsFound: "Atrasta 0 autom\u0101tisk\u0101s pabeig\u0161anas opcija.",
      noAutocompleteSuggestionsFound: "Atrasti 0 autom\u0101tisk\u0101s pabeig\u0161anas ieteikumi.",
      noResultsFoundIn: "Rezult\u0101ti nav atrasti {{currentVerticalLabel}}.",
      pagination: "Lappu\u013Co\u0161ana",
      readMoreAbout: "Las\u012Bt vair\u0101k par <a>{{name}}</a>",
      recentSearch: "nesen\u0101 mekl\u0113\u0161ana: {{query}}",
      recentSearchesFound_one: "Atrasta {{count}} nesen\u0101 mekl\u0113\u0161ana.",
      recentSearchesFound_other: "Atrastas {{count}} nesen\u0101s mekl\u0113\u0161anas.",
      recentSearchesFound_zero: "Atrastas {{count}} nesen\u0101s mekl\u0113\u0161anas.",
      removeFilter: "No\u0146emt filtru: \u201E{{displayName}}\u201C",
      resultPreview: "rezult\u0101ta priek\u0161skat\u012Bjums: {{value}}",
      resultPreviewsFound_one: "Atrasts {{count}} rezult\u0101tu priek\u0161skat\u012Bjums.",
      resultPreviewsFound_other: "Atrastas {{count}} rezult\u0101tu priek\u0161skat\u012Bjumi.",
      resultPreviewsFound_zero: "Atrastas {{count}} rezult\u0101tu priek\u0161skat\u012Bjumi.",
      resultsCountText_one: "{{count}} rezult\u0101ts",
      resultsCountText_other: "{{count}} rezult\u0101ti",
      resultsCountText_zero: "{{count}} rezult\u0101tu",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} no {{resultsCount}} rezult\u0101tiem",
      searchHere: "Mekl\u0113t \u0161eit\u2026",
      showLess: "R\u0101d\u012Bt maz\u0101k",
      showMore: "R\u0101d\u012Bt vair\u0101k",
      showingAllInstead: "Tiek r\u0101d\u012Bti visi {{currentVerticalLabel}}.",
      sources_one: "Avots",
      sources_other: "Avoti ({{count}})",
      sources_zero: "Avoti nav pieejami",
      submitSearch: "Iesniegt mekl\u0113\u0161anu",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} rezult\u0101ts",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} rezult\u0101tu",
      suggestionResultsCount_zero: "{{label}} \u2013 nav rezult\u0101tu",
      thankYouForYourFeedback: "Paldies par j\u016Bsu atsauksm\u0113m!",
      thisAnsweredMyQuestion: "\u0160is atbild\u0113ja uz manu jaut\u0101jumu",
      thisDidNotAnswerMyQuestion: "\u0160is neatbild\u0113ja uz manu jaut\u0101jumu",
      unselectAnOptionToEnterInARange: "Atce\u013Ciet izv\u0113li, lai ievad\u012Btu diapazonu.",
      updateYourLocation: "Atjauniniet savu atra\u0161an\u0101s vietu",
      useCurrentLocation: "Izmantot pa\u0161reiz\u0113jo atra\u0161an\u0101s vietu",
      useMyLocation: "Izmantot manu atra\u0161an\u0101s vietu",
      viewAll: "Skat\u012Bt visu",
      viewDetails: "Skat\u012Bt inform\u0101ciju"
    };
  }
});

// locales/nb/search-ui-react.json
var require_search_ui_react20 = __commonJS({
  "locales/nb/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI-generert svar",
      allCategories: "Alle kategorier",
      appliedFiltersToCurrentSearch: "Brukte filtre for gjeldende s\xF8k",
      apply: "Bruk",
      applyFilters: "Bruk filtre",
      autocompleteOptionsFound_one: "{{count}}{{label}} autofullf\xF8ringsvalg funnet.",
      autocompleteOptionsFound_other: "{{count}}{{label}} autofullf\xF8ringsvalg funnet.",
      autocompleteSuggestion: "autofullf\xF8ringsforslag: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} autofullf\xF8ringsforslag funnet.",
      autocompleteSuggestionsFound_other: "{{count}} autofullf\xF8ringsforslag funnet.",
      basedOnYourDevice: " (basert p\xE5 enheten din)",
      basedOnYourInternetAddress: " (basert p\xE5 din internettadresse)",
      categoriesText_one: "F\xF8lgende kategori ga resultater for \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "F\xF8lgende kategorier ga resultater for \u2013 <strong>{{query}}</strong>",
      clearAll: "Fjern alt",
      clearMinAndMax: "Fjern min og maks",
      clearTheRangeToSelectOptions: "Fjern omr\xE5det for \xE5 velge alternativer.",
      clearTheSearchBar: "T\xF8m s\xF8kefeltet",
      conductASearch: "Utf\xF8r et s\xF8k",
      currentLocation: "N\xE5v\xE6rende posisjon",
      didYouMean: "Mente du <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "N\xE5r autofullf\xF8ringsresultater er tilgjengelige, bruk opp- og nedpiler for \xE5 bla gjennom og enter for \xE5 velge.",
      feedback: "Tilbakemelding",
      invalidRange: "Ugyldig omr\xE5de",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "G\xE5 til neste resultatside",
      navigateToThePreviousResultsPage: "G\xE5 til forrige resultatside",
      noAutocompleteOptionsFound: "0 autofullf\xF8ringsvalg funnet.",
      noAutocompleteSuggestionsFound: "0 autofullf\xF8ringsforslag funnet.",
      noResultsFoundIn: "Ingen resultater funnet i {{currentVerticalLabel}}.",
      pagination: "Sideinndeling",
      readMoreAbout: "Les mer om <a>{{name}}</a>",
      recentSearch: "siste s\xF8k: {{query}}",
      recentSearchesFound_one: "{{count}} siste s\xF8k funnet.",
      recentSearchesFound_other: "{{count}} siste s\xF8k funnet.",
      removeFilter: "Fjern filteret \u201C{{displayName}}\u201D",
      resultPreview: "resultatforh\xE5ndsvisning: {{value}}",
      resultPreviewsFound_one: "{{count}} resultatforh\xE5ndsvisning funnet.",
      resultPreviewsFound_other: "{{count}} resultatforh\xE5ndsvisninger funnet.",
      resultsCountText_one: "{{count}} resultat",
      resultsCountText_other: "{{count}} resultater",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} av {{resultsCount}} resultater",
      searchHere: "S\xF8k her\u2026",
      showLess: "Vis mindre",
      showMore: "Vis mer",
      showingAllInstead: "Viser alle {{currentVerticalLabel}} i stedet.",
      sources_one: "Kilde",
      sources_other: "Kilder ({{count}})",
      submitSearch: "Send s\xF8k",
      suggestionResultsCount_one: "{{label}} - {{count}} resultat",
      suggestionResultsCount_other: "{{label}} - {{count}} resultater",
      thankYouForYourFeedback: "Takk for tilbakemeldingen!",
      thisAnsweredMyQuestion: "Dette besvarte sp\xF8rsm\xE5let mitt",
      thisDidNotAnswerMyQuestion: "Dette besvarte ikke sp\xF8rsm\xE5let mitt",
      unselectAnOptionToEnterInARange: "Fjern valg for \xE5 angi et omr\xE5de.",
      updateYourLocation: "Oppdater plasseringen din",
      useCurrentLocation: "Bruk n\xE5v\xE6rende posisjon",
      useMyLocation: "Bruk min posisjon",
      viewAll: "Se alle",
      viewDetails: "Se detaljer"
    };
  }
});

// locales/nl/search-ui-react.json
var require_search_ui_react21 = __commonJS({
  "locales/nl/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI gegenereerd antwoord",
      allCategories: "Alle categorie\xEBn",
      appliedFiltersToCurrentSearch: "Toegepaste filters op de huidige zoekopdracht",
      apply: "Toepassen",
      applyFilters: "Filters toepassen",
      autocompleteOptionsFound_one: "{{count}}{{label}} automatisch aanvulsuggestie gevonden.",
      autocompleteOptionsFound_other: "{{count}}{{label}} automatisch aanvulsuggesties gevonden.",
      autocompleteSuggestion: "automatisch aanvultip: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} automatisch aanvultip gevonden.",
      autocompleteSuggestionsFound_other: "{{count}} automatisch aanvultips gevonden.",
      basedOnYourDevice: " (gebaseerd op je apparaat)",
      basedOnYourInternetAddress: " (gebaseerd op je internetadres)",
      categoriesText_one: "De volgende categorie leverde resultaten op voor - <strong>{{query}}</strong>",
      categoriesText_other: "De volgende categorie\xEBn leverden resultaten op voor - <strong>{{query}}</strong>",
      clearAll: "Alles wissen",
      clearMinAndMax: "Min en max wissen",
      clearTheRangeToSelectOptions: "Wis het bereik om opties te selecteren.",
      clearTheSearchBar: "Zoekbalk wissen",
      conductASearch: "Een zoekopdracht uitvoeren",
      currentLocation: "Huidige locatie",
      didYouMean: "Bedoelde je <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Wanneer automatische aanvulresultaten beschikbaar zijn, gebruik de pijltjestoetsen omhoog en omlaag om te navigeren en Enter om te selecteren.",
      feedback: "Feedback",
      invalidRange: "Ongeldig bereik",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Navigeer naar de volgende resultatenpagina",
      navigateToThePreviousResultsPage: "Navigeer naar de vorige resultatenpagina",
      noAutocompleteOptionsFound: "0 automatisch aanvulopties gevonden.",
      noAutocompleteSuggestionsFound: "0 automatisch aanvultips gevonden.",
      noResultsFoundIn: "Geen resultaten gevonden in {{currentVerticalLabel}}.",
      pagination: "Paginering",
      readMoreAbout: "Lees meer over <a>{{name}}</a>",
      recentSearch: "recente zoekopdracht: {{query}}",
      recentSearchesFound_one: "{{count}} recente zoekopdracht gevonden.",
      recentSearchesFound_other: "{{count}} recente zoekopdrachten gevonden.",
      removeFilter: "Filter \u201E{{displayName}}\u201C verwijderen",
      resultPreview: "resultaatvoorbeeld: {{value}}",
      resultPreviewsFound_one: "{{count}} resultaatvoorbeeld gevonden.",
      resultPreviewsFound_other: "{{count}} resultaatvoorbeelden gevonden.",
      resultsCountText_one: "{{count}} resultaat",
      resultsCountText_other: "{{count}} resultaten",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} van {{resultsCount}} resultaten",
      searchHere: "Hier zoeken\u2026",
      showLess: "Minder weergeven",
      showMore: "Meer weergeven",
      showingAllInstead: "Toont in plaats daarvan alle {{currentVerticalLabel}}.",
      sources_one: "Bron",
      sources_other: "Bronnen ({{count}})",
      submitSearch: "Zoekopdracht versturen",
      suggestionResultsCount_one: "{{label}} - {{count}} resultaat",
      suggestionResultsCount_other: "{{label}} - {{count}} resultaten",
      thankYouForYourFeedback: "Bedankt voor je feedback!",
      thisAnsweredMyQuestion: "Dit beantwoordde mijn vraag",
      thisDidNotAnswerMyQuestion: "Dit beantwoordde mijn vraag niet",
      unselectAnOptionToEnterInARange: "Deselecteer een optie om een bereik in te voeren.",
      updateYourLocation: "Werk je locatie bij",
      useCurrentLocation: "Gebruik huidige locatie",
      useMyLocation: "Gebruik mijn locatie",
      viewAll: "Bekijk alles",
      viewDetails: "Bekijk details"
    };
  }
});

// locales/pl/search-ui-react.json
var require_search_ui_react22 = __commonJS({
  "locales/pl/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI wygenerowa\u0142o odpowied\u017A",
      allCategories: "Wszystkie kategorie",
      appliedFiltersToCurrentSearch: "Zastosowane filtry do bie\u017C\u0105cego wyszukiwania",
      apply: "Zastosuj",
      applyFilters: "Zastosuj filtry",
      autocompleteOptionsFound_few: "Znaleziono {{count}}{{label}} opcje autouzupe\u0142niania.",
      autocompleteOptionsFound_one: "Znaleziono {{count}}{{label}} opcj\u0119 autouzupe\u0142niania.",
      autocompleteOptionsFound_other: "Znaleziono {{count}}{{label}} opcji autouzupe\u0142niania.",
      autocompleteSuggestion: "sugestia autouzupe\u0142niania: {{suggestion}}",
      autocompleteSuggestionsFound_few: "Znaleziono {{count}} sugestie autouzupe\u0142niania.",
      autocompleteSuggestionsFound_one: "Znaleziono {{count}} sugesti\u0119 autouzupe\u0142niania.",
      autocompleteSuggestionsFound_other: "Znaleziono {{count}} sugestii autouzupe\u0142niania.",
      basedOnYourDevice: " (na podstawie Twojego urz\u0105dzenia)",
      basedOnYourInternetAddress: " (na podstawie Twojego adresu internetowego)",
      categoriesText_few: "Nast\u0119puj\u0105ce kategorie zwr\xF3ci\u0142y wyniki dla \u2013 <strong>{{query}}</strong>",
      categoriesText_one: "Nast\u0119puj\u0105ca kategoria zwr\xF3ci\u0142a wyniki dla \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "Nast\u0119puj\u0105cych kategorii zwr\xF3ci\u0142o wyniki dla \u2013 <strong>{{query}}</strong>",
      clearAll: "Wyczy\u015B\u0107 wszystko",
      clearMinAndMax: "Wyczy\u015B\u0107 min i max",
      clearTheRangeToSelectOptions: "Wyczy\u015B\u0107 zakres, aby wybra\u0107 opcje.",
      clearTheSearchBar: "Wyczy\u015B\u0107 pasek wyszukiwania",
      conductASearch: "Przeprowadzi\u0107 wyszukiwanie",
      currentLocation: "Aktualna lokalizacja",
      didYouMean: "Czy chodzi\u0142o Ci o <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Gdy dost\u0119pne s\u0105 wyniki autouzupe\u0142niania, u\u017Cyj strza\u0142ek w g\xF3r\u0119 i w d\xF3\u0142, aby przejrze\u0107, a enter, aby wybra\u0107.",
      feedback: "Informacja zwrotna",
      invalidRange: "Nieprawid\u0142owy zasi\u0119g",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Przejd\u017A do strony nast\u0119pnych wynik\xF3w",
      navigateToThePreviousResultsPage: "Przejd\u017A do strony poprzednich wynik\xF3w",
      noAutocompleteOptionsFound: "Znaleziono 0 opcji autouzupe\u0142niania.",
      noAutocompleteSuggestionsFound: "Znaleziono 0 sugestii autouzupe\u0142niania.",
      noResultsFoundIn: "Nie znaleziono wynik\xF3w w {{currentVerticalLabel}}.",
      pagination: "Paginacja",
      readMoreAbout: "Czytaj wi\u0119cej o <a>{{name}}</a>",
      recentSearch: "najnowsze wyszukiwanie: {{query}}",
      recentSearchesFound_few: "Znaleziono {{count}} ostatnie wyszukiwania.",
      recentSearchesFound_one: "Znaleziono {{count}} ostatnie wyszukiwanie.",
      recentSearchesFound_other: "Znaleziono {{count}} ostatnich wyszukiwa\u0144.",
      removeFilter: "Usu\u0144 filtr \u201E{{displayName}}\u201C",
      resultPreview: "podgl\u0105d wynik\xF3w: {{value}}",
      resultPreviewsFound_few: "Znaleziono {{count}} podgl\u0105dy wynik\xF3w.",
      resultPreviewsFound_one: "Znaleziono {{count}} podgl\u0105d wyniku.",
      resultPreviewsFound_other: "Znaleziono {{count}} podgl\u0105d\xF3w wynik\xF3w.",
      resultsCountText_few: "{{count}} wyniki",
      resultsCountText_one: "{{count}} wynik",
      resultsCountText_other: "{{count}} wynik\xF3w",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} z {{resultsCount}} wynik\xF3w",
      searchHere: "Wyszukaj tutaj\u2026",
      showLess: "Poka\u017C mniej",
      showMore: "Poka\u017C wi\u0119cej",
      showingAllInstead: "Wy\u015Bwietlam wszystkie {{currentVerticalLabel}} zamiast tego.",
      sources_few: "\u0179r\xF3d\u0142a ({{count}})",
      sources_one: "\u0179r\xF3d\u0142o",
      sources_other: "\u0179r\xF3de\u0142 ({{count}})",
      submitSearch: "Prze\u015Blij wyszukiwanie",
      suggestionResultsCount_few: "{{label}} \u2013 {{count}} wyniki",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} wynik",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} wynik\xF3w",
      thankYouForYourFeedback: "Dzi\u0119kujemy za Twoj\u0105 opini\u0119!",
      thisAnsweredMyQuestion: "To odpowiedzia\u0142o na moje pytanie",
      thisDidNotAnswerMyQuestion: "To nie odpowiedzia\u0142o na moje pytanie",
      unselectAnOptionToEnterInARange: "Odznacz opcj\u0119, aby wpisa\u0107 zakres.",
      updateYourLocation: "Zaktualizuj swoj\u0105 lokalizacj\u0119",
      useCurrentLocation: "U\u017Cyj aktualnej lokalizacji",
      useMyLocation: "U\u017Cyj mojej lokalizacji",
      viewAll: "Zobacz wszystkie",
      viewDetails: "Zobacz szczeg\xF3\u0142y"
    };
  }
});

// locales/pt/search-ui-react.json
var require_search_ui_react23 = __commonJS({
  "locales/pt/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Resposta Gerada por IA",
      allCategories: "Todas as Categorias",
      appliedFiltersToCurrentSearch: "Filtros aplicados \xE0 pesquisa atual",
      apply: "Aplicar",
      applyFilters: "Aplicar Filtros",
      autocompleteOptionsFound_one: "{{count}}{{label}} op\xE7\xE3o de preenchimento autom\xE1tico encontrada.",
      autocompleteOptionsFound_other: "{{count}}{{label}} op\xE7\xF5es de preenchimento autom\xE1tico encontradas.",
      autocompleteSuggestion: "sugest\xE3o de preenchimento autom\xE1tico: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} sugest\xE3o de preenchimento autom\xE1tico encontrada.",
      autocompleteSuggestionsFound_other: "{{count}} sugest\xF5es de preenchimento autom\xE1tico encontradas.",
      basedOnYourDevice: " (baseado no seu dispositivo)",
      basedOnYourInternetAddress: " (baseado no seu endere\xE7o de internet)",
      categoriesText_one: "A seguinte categoria apresentou resultados para - <strong>{{query}}</strong>",
      categoriesText_other: "As seguintes categorias apresentaram resultados para - <strong>{{query}}</strong>",
      clearAll: "Limpar Tudo",
      clearMinAndMax: "Limpar m\xEDn e m\xE1x",
      clearTheRangeToSelectOptions: "Limpar o intervalo para selecionar op\xE7\xF5es.",
      clearTheSearchBar: "Limpar a barra de pesquisa",
      conductASearch: "Realizar uma busca",
      currentLocation: "Localiza\xE7\xE3o Atual",
      didYouMean: "Voc\xEA quis dizer <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Quando os resultados de preenchimento autom\xE1tico estiverem dispon\xEDveis, use as setas para cima e para baixo para revisar e Enter para selecionar.",
      feedback: "Feedback",
      invalidRange: "Intervalo inv\xE1lido",
      max: "M\xE1x",
      min: "M\xEDn",
      navigateToTheNextResultsPage: "Navegar para a pr\xF3xima p\xE1gina de resultados",
      navigateToThePreviousResultsPage: "Navegar para a p\xE1gina de resultados anterior",
      noAutocompleteOptionsFound: "0 op\xE7\xF5es de preenchimento autom\xE1tico encontradas.",
      noAutocompleteSuggestionsFound: "0 sugest\xF5es de preenchimento autom\xE1tico encontradas.",
      noResultsFoundIn: "Nenhum resultado encontrado em {{currentVerticalLabel}}.",
      pagination: "Pagina\xE7\xE3o",
      readMoreAbout: "Leia mais sobre <a>{{name}}</a>",
      recentSearch: "busca recente: {{query}}",
      recentSearchesFound_one: "{{count}} busca recente encontrada.",
      recentSearchesFound_other: "{{count}} buscas recentes encontradas.",
      removeFilter: "Remover filtro \xAB{{displayName}}\xBB",
      resultPreview: "pr\xE9-visualiza\xE7\xE3o do resultado: {{value}}",
      resultPreviewsFound_one: "{{count}} pr\xE9-visualiza\xE7\xE3o do resultado encontrada.",
      resultPreviewsFound_other: "{{count}} pr\xE9-visualiza\xE7\xF5es recentes encontradas.",
      resultsCountText_one: "{{count}} Resultado",
      resultsCountText_other: "{{count}} Resultados",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} de {{resultsCount}} Resultados",
      searchHere: "Pesquise aqui\u2026",
      showLess: "Mostrar Menos",
      showMore: "Mostrar Mais",
      showingAllInstead: "Mostrando todos os {{currentVerticalLabel}} em vez disso.",
      sources_one: "Fonte",
      sources_other: "Fontes ({{count}})",
      submitSearch: "Enviar pesquisa",
      suggestionResultsCount_one: "{{label}} - {{count}} resultado",
      suggestionResultsCount_other: "{{label}} - {{count}} resultados",
      thankYouForYourFeedback: "Obrigado pelo seu feedback!",
      thisAnsweredMyQuestion: "Isso respondeu \xE0 minha pergunta",
      thisDidNotAnswerMyQuestion: "Isso n\xE3o respondeu \xE0 minha pergunta",
      unselectAnOptionToEnterInARange: "Desmarque uma op\xE7\xE3o para inserir um intervalo.",
      updateYourLocation: "Atualize sua localiza\xE7\xE3o",
      useCurrentLocation: "Usar Localiza\xE7\xE3o Atual",
      useMyLocation: "Usar minha localiza\xE7\xE3o",
      viewAll: "Ver tudo",
      viewDetails: "Ver Detalhes"
    };
  }
});

// locales/ro/search-ui-react.json
var require_search_ui_react24 = __commonJS({
  "locales/ro/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "R\u0103spuns generat de AI",
      allCategories: "Toate categoriile",
      appliedFiltersToCurrentSearch: "Filtre aplicate la c\u0103utarea curent\u0103",
      apply: "Aplic\u0103",
      applyFilters: "Aplic\u0103 filtre",
      autocompleteOptionsFound_few: "{{count}}{{label}} op\u021Biuni de completare automat\u0103 g\u0103site.",
      autocompleteOptionsFound_one: "{{count}}{{label}} op\u021Biune de completare automat\u0103 g\u0103sit\u0103.",
      autocompleteOptionsFound_other: "{{count}}{{label}} op\u021Biuni de completare automat\u0103 g\u0103site.",
      autocompleteSuggestion: "sugestie complet\u0103 automat\u0103: {{suggestion}}",
      autocompleteSuggestionsFound_few: "{{count}} sugestii de completare automat\u0103 g\u0103site.",
      autocompleteSuggestionsFound_one: "{{count}} sugestie de completare automat\u0103 g\u0103sit\u0103.",
      autocompleteSuggestionsFound_other: "{{count}} sugestii de completare automat\u0103 g\u0103site.",
      basedOnYourDevice: " (bazat pe dispozitivul t\u0103u)",
      basedOnYourInternetAddress: " (bazat pe adresa ta de internet)",
      categoriesText_few: "Urm\u0103toarele categorii au generat rezultate pentru \u2013 <strong>{{query}}</strong>",
      categoriesText_one: "Urm\u0103toarea categorie a generat rezultate pentru \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "Urm\u0103toarele categorii au generat rezultate pentru \u2013 <strong>{{query}}</strong>",
      clearAll: "\u0218terge\u021Bi toate",
      clearMinAndMax: "\u0218terge min \u0219i max",
      clearTheRangeToSelectOptions: "\u0218terge\u021Bi intervalul pentru a selecta op\u021Biuni.",
      clearTheSearchBar: "\u0218terge\u021Bi bara de c\u0103utare",
      conductASearch: "Efectua\u021Bi o c\u0103utare",
      currentLocation: "Loca\u021Bia curent\u0103",
      didYouMean: "Ai vrut s\u0103 spui <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "C\xE2nd sunt disponibile rezultate de completare automat\u0103, folose\u0219te s\u0103ge\u021Bile sus \u0219i jos pentru a naviga \u0219i Enter pentru a selecta.",
      feedback: "Feedback",
      invalidRange: "Interval nevalid",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Naviga\u021Bi la pagina de rezultate urm\u0103toare",
      navigateToThePreviousResultsPage: "Naviga\u021Bi la pagina de rezultate anterioare",
      noAutocompleteOptionsFound: "Nu a fost g\u0103sit\u0103 nicio op\u021Biune de completare automat\u0103.",
      noAutocompleteSuggestionsFound: "Nu a fost g\u0103sit\u0103 nicio sugestie de completare automat\u0103.",
      noResultsFoundIn: "Niciun rezultat g\u0103sit \xEEn {{currentVerticalLabel}}.",
      pagination: "Paginare",
      readMoreAbout: "Cite\u0219te mai mult despre <a>{{name}}</a>",
      recentSearch: "c\u0103utare recent\u0103: {{query}}",
      recentSearchesFound_few: "{{count}} c\u0103ut\u0103ri recente g\u0103site.",
      recentSearchesFound_one: "{{count}} c\u0103utare recent\u0103 g\u0103sit\u0103.",
      recentSearchesFound_other: "{{count}} c\u0103ut\u0103ri recente g\u0103site.",
      removeFilter: "Elimin\u0103 filtrul \u201E{{displayName}}\u201C",
      resultPreview: "rezultat previzualizare: {{value}}",
      resultPreviewsFound_few: "{{count}} previzualiz\u0103ri ale rezultatelor g\u0103site.",
      resultPreviewsFound_one: "{{count}} previzualizare a rezultatului g\u0103sit\u0103.",
      resultPreviewsFound_other: "{{count}} previzualiz\u0103ri ale rezultatelor g\u0103site.",
      resultsCountText_few: "{{count}} rezultate",
      resultsCountText_one: "{{count}} rezultat",
      resultsCountText_other: "{{count}} de rezultate",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} din {{resultsCount}} rezultate",
      searchHere: "C\u0103uta\u021Bi aici\u2026",
      showLess: "Arat\u0103 mai pu\u021Bin",
      showMore: "Arat\u0103 mai mult",
      showingAllInstead: "Se afi\u0219eaz\u0103 toate {{currentVerticalLabel}} \xEEn schimb.",
      sources_few: "Surse ({{count}})",
      sources_one: "Surs\u0103",
      sources_other: "Surse ({{count}})",
      submitSearch: "Trimite\u021Bi c\u0103utarea",
      suggestionResultsCount_few: "{{label}} \u2013 {{count}} rezultate",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} rezultat",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} rezultate",
      thankYouForYourFeedback: "Mul\u021Bumim pentru feedback!",
      thisAnsweredMyQuestion: "Aceasta a r\u0103spuns la \xEEntrebarea mea",
      thisDidNotAnswerMyQuestion: "Aceasta nu a r\u0103spuns la \xEEntrebarea mea",
      unselectAnOptionToEnterInARange: "Deselecteaz\u0103 o op\u021Biune pentru a introduce un interval.",
      updateYourLocation: "Actualiza\u021Bi -v\u0103 loca\u021Bia",
      useCurrentLocation: "Folose\u0219te loca\u021Bia curent\u0103",
      useMyLocation: "Folose\u0219te loca\u021Bia mea",
      viewAll: "Vizualiza\u021Bi toate",
      viewDetails: "Vizualiza\u021Bi detalii"
    };
  }
});

// locales/ru/search-ui-react.json
var require_search_ui_react25 = __commonJS({
  "locales/ru/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "\u041E\u0442\u0432\u0435\u0442, \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0418\u0418",
      allCategories: "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
      appliedFiltersToCurrentSearch: "\u041F\u0440\u0438\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u043A \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u043F\u043E\u0438\u0441\u043A\u0443",
      apply: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
      applyFilters: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B",
      autocompleteOptionsFound_few: "\u041D\u0430\u0439\u0434\u0435\u043D\u044B {{count}} \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0435 \u043E\u043F\u0446\u0438\u0438 {{label}}.",
      autocompleteOptionsFound_many: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0445 \u043E\u043F\u0446\u0438\u0439 {{label}}.",
      autocompleteOptionsFound_one: "\u041D\u0430\u0439\u0434\u0435\u043D\u0430 {{count}} \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0430\u044F \u043E\u043F\u0446\u0438\u044F {{label}}.",
      autocompleteOptionsFound_other: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0445 \u043E\u043F\u0446\u0438\u0439 {{label}}.",
      autocompleteSuggestion: "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F: {{suggestion}}",
      autocompleteSuggestionsFound_few: "\u041D\u0430\u0439\u0434\u0435\u043D\u044B {{count}} \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F.",
      autocompleteSuggestionsFound_many: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F.",
      autocompleteSuggestionsFound_one: "\u041D\u0430\u0439\u0434\u0435\u043D\u0430 {{count}} \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F.",
      autocompleteSuggestionsFound_other: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F.",
      basedOnYourDevice: " (\u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430)",
      basedOnYourInternetAddress: " (\u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u0430\u0434\u0440\u0435\u0441\u0430)",
      categoriesText_few: "\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u0445 \u2014 <strong>{{query}}</strong> \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B",
      categoriesText_many: "\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u0445 \u2014 <strong>{{query}}</strong> \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      categoriesText_one: "\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u2014 <strong>{{query}}</strong> \u043D\u0430\u0439\u0434\u0435\u043D \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
      categoriesText_other: "\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u0445 \u2014 <strong>{{query}}</strong> \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      clearAll: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0451",
      clearMinAndMax: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F",
      clearTheRangeToSelectOptions: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0435 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u043F\u0446\u0438\u0439.",
      clearTheSearchBar: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443 \u043F\u043E\u0438\u0441\u043A\u0430",
      conductASearch: "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
      currentLocation: "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      didYouMean: "\u0412\u044B \u0438\u043C\u0435\u043B\u0438 \u0432 \u0432\u0438\u0434\u0443 <button>{{correctedQuery}}</button>?",
      dropDownScreenReaderInstructions: "\u041A\u043E\u0433\u0434\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u0432\u0432\u0435\u0440\u0445 \u0438 \u0432\u043D\u0438\u0437 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0438 Enter \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430.",
      feedback: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C",
      invalidRange: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      max: "\u041C\u0430\u043A\u0441",
      min: "\u041C\u0438\u043D",
      navigateToTheNextResultsPage: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      navigateToThePreviousResultsPage: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      noAutocompleteOptionsFound: "\u0410\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u044F\u044E\u0449\u0438\u0445 \u043E\u043F\u0446\u0438\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E.",
      noAutocompleteSuggestionsFound: "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E.",
      noResultsFoundIn: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0432 {{currentVerticalLabel}}.",
      pagination: "\u041F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u044F",
      readMoreAbout: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u043E <a>{{name}}</a>",
      recentSearch: "\u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0439 \u043F\u043E\u0438\u0441\u043A: {{query}}",
      recentSearchesFound_few: "\u041D\u0430\u0439\u0434\u0435\u043D\u044B {{count}} \u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0445 \u043F\u043E\u0438\u0441\u043A\u0430.",
      recentSearchesFound_many: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432.",
      recentSearchesFound_one: "\u041D\u0430\u0439\u0434\u0451\u043D {{count}} \u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0439 \u043F\u043E\u0438\u0441\u043A.",
      recentSearchesFound_other: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043D\u0435\u0434\u0430\u0432\u043D\u0438\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432.",
      removeFilter: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440 \xAB{{displayName}}\xBB",
      resultPreview: "\u041F\u0440\u0435\u0432\u044C\u044E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430: {{value}}",
      resultPreviewsFound_few: "\u041D\u0430\u0439\u0434\u0435\u043D\u044B {{count}} \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.",
      resultPreviewsFound_many: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432.",
      resultPreviewsFound_one: "\u041D\u0430\u0439\u0434\u0451\u043D {{count}} \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440.",
      resultPreviewsFound_other: "\u041D\u0430\u0439\u0434\u0435\u043D\u043E {{count}} \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432.",
      resultsCountText_few: "{{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430",
      resultsCountText_many: "{{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      resultsCountText_one: "{{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
      resultsCountText_other: "{{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} \u0438\u0437 {{resultsCount}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      searchHere: "\u0418\u0441\u043A\u0430\u0442\u044C \u0437\u0434\u0435\u0441\u044C\u2026",
      showLess: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435",
      showMore: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
      showingAllInstead: "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0441\u0435 {{currentVerticalLabel}} \u0432\u043C\u0435\u0441\u0442\u043E \u044D\u0442\u043E\u0433\u043E.",
      sources_few: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 ({{count}})",
      sources_many: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 ({{count}})",
      sources_one: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
      sources_other: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 ({{count}})",
      submitSearch: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
      suggestionResultsCount_few: "{{label}} - {{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430",
      suggestionResultsCount_many: "{{label}} - {{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
      suggestionResultsCount_one: "{{label}} - {{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
      suggestionResultsCount_other: "{{label}} - {{count}} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430",
      thankYouForYourFeedback: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u043E\u0442\u0437\u044B\u0432!",
      thisAnsweredMyQuestion: "\u042D\u0442\u043E \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u043E \u043D\u0430 \u043C\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441",
      thisDidNotAnswerMyQuestion: "\u042D\u0442\u043E \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u043E \u043D\u0430 \u043C\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441",
      unselectAnOptionToEnterInARange: "\u0421\u043D\u0438\u043C\u0438\u0442\u0435 \u0432\u044B\u0431\u043E\u0440 \u043E\u043F\u0446\u0438\u0438, \u0447\u0442\u043E\u0431\u044B \u0432\u0432\u0435\u0441\u0442\u0438 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D.",
      updateYourLocation: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u0430\u0448\u0435 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      useCurrentLocation: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      useMyLocation: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0451 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
      viewAll: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435",
      viewDetails: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u0438"
    };
  }
});

// locales/sk/search-ui-react.json
var require_search_ui_react26 = __commonJS({
  "locales/sk/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Odpove\u010F generovan\xE1 AI",
      allCategories: "V\u0161etky kateg\xF3rie",
      appliedFiltersToCurrentSearch: "Pou\u017Eit\xE9 filtre na aktu\xE1lne vyh\u013Ead\xE1vanie",
      apply: "Pou\u017Ei\u0165",
      applyFilters: "Pou\u017Ei\u0165 filtre",
      autocompleteOptionsFound_few: "N\xE1jden\xE9 {{count}}{{label}} mo\u017Enosti automatick\xE9ho dop\u013A\u0148ania.",
      autocompleteOptionsFound_one: "N\xE1jden\xE1 {{count}}{{label}} mo\u017Enos\u0165 automatick\xE9ho dop\u013A\u0148ania.",
      autocompleteOptionsFound_other: "N\xE1jden\xFDch {{count}}{{label}} mo\u017Enost\xED automatick\xE9ho dop\u013A\u0148ania.",
      autocompleteSuggestion: "n\xE1vrh automatick\xE9ho dop\u013A\u0148ania: {{suggestion}}",
      autocompleteSuggestionsFound_few: "N\xE1jden\xE9 {{count}} n\xE1vrhy automatick\xE9ho dop\u013A\u0148ania.",
      autocompleteSuggestionsFound_one: "N\xE1jden\xFD {{count}} n\xE1vrh automatick\xE9ho dop\u013A\u0148ania.",
      autocompleteSuggestionsFound_other: "N\xE1jden\xFDch {{count}} n\xE1vrhov automatick\xE9ho dop\u013A\u0148ania.",
      basedOnYourDevice: " (na z\xE1klade v\xE1\u0161ho zariadenia)",
      basedOnYourInternetAddress: " (na z\xE1klade va\u0161ej internetovej adresy)",
      categoriesText_few: "Nasleduj\xFAce kateg\xF3rie priniesli v\xFDsledky pre \u2013 <strong>{{query}}</strong>",
      categoriesText_one: "Nasleduj\xFAca kateg\xF3ria priniesla v\xFDsledky pre \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "Nasleduj\xFAcych kateg\xF3ri\xED prinieslo v\xFDsledky pre \u2013 <strong>{{query}}</strong>",
      clearAll: "Vymaza\u0165 v\u0161etko",
      clearMinAndMax: "Vymaza\u0165 min a max",
      clearTheRangeToSelectOptions: "Vymaza\u0165 rozsah na v\xFDber mo\u017Enost\xED.",
      clearTheSearchBar: "Vymaza\u0165 vyh\u013Ead\xE1vac\xED panel",
      conductASearch: "Vykona\u0165 vyh\u013Ead\xE1vanie",
      currentLocation: "Aktu\xE1lna poloha",
      didYouMean: "Mali ste na mysli <button>{{correctedQuery}}</button>?",
      dropDownScreenReaderInstructions: "Ke\u010F s\xFA k dispoz\xEDcii v\xFDsledky automatick\xE9ho dokon\u010Denia, pou\u017Eite \u0161\xEDpky nahor a nadol na presk\xFAmanie a enter na v\xFDber.",
      feedback: "Sp\xE4tn\xE1 v\xE4zba",
      invalidRange: "Neplatn\xFD rozsah",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "Prejs\u0165 na \u010Fal\u0161iu str\xE1nku v\xFDsledkov",
      navigateToThePreviousResultsPage: "Prejs\u0165 na predch\xE1dzaj\xFAcu str\xE1nku v\xFDsledkov",
      noAutocompleteOptionsFound: "0 n\xE1jden\xFDch mo\u017Enost\xED automatick\xE9ho dokon\u010Denia.",
      noAutocompleteSuggestionsFound: "0 n\xE1jden\xFDch n\xE1vrhov automatick\xE9ho dokon\u010Denia.",
      noResultsFoundIn: "Nena\u0161li sa \u017Eiadne v\xFDsledky v {{currentVerticalLabel}}.",
      pagination: "Str\xE1nkovanie",
      readMoreAbout: "\u010C\xEDta\u0165 viac o <a>{{name}}</a>",
      recentSearch: "ned\xE1vne vyh\u013Ead\xE1vanie: {{query}}",
      recentSearchesFound_few: "N\xE1jden\xE9 {{count}} ned\xE1vne vyh\u013Ead\xE1vania.",
      recentSearchesFound_one: "N\xE1jden\xE9 {{count}} ned\xE1vne vyh\u013Ead\xE1vanie.",
      recentSearchesFound_other: "N\xE1jden\xFDch {{count}} ned\xE1vnych vyh\u013Ead\xE1van\xED.",
      removeFilter: "Odstr\xE1ni\u0165 filter \u201E{{displayName}}\u201C",
      resultPreview: "v\xFDsledkov\xFD n\xE1h\u013Ead: {{value}}",
      resultPreviewsFound_few: "N\xE1jden\xE9 {{count}} n\xE1h\u013Eady v\xFDsledkov.",
      resultPreviewsFound_one: "N\xE1jden\xFD {{count}} n\xE1h\u013Ead v\xFDsledku.",
      resultPreviewsFound_other: "N\xE1jden\xFDch {{count}} n\xE1h\u013Eadov v\xFDsledkov.",
      resultsCountText_few: "{{count}} v\xFDsledky",
      resultsCountText_one: "{{count}} v\xFDsledok",
      resultsCountText_other: "{{count}} v\xFDsledkov",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} z {{resultsCount}} v\xFDsledkov",
      searchHere: "Vyh\u013Eadajte tu\u2026",
      showLess: "Zobrazi\u0165 menej",
      showMore: "Zobrazi\u0165 viac",
      showingAllInstead: "Zobrazuj\xFA sa v\u0161etky polo\u017Eky v {{currentVerticalLabel}}.",
      sources_few: "Zdroje ({{count}})",
      sources_one: "Zdroj",
      sources_other: "Zdroje ({{count}})",
      submitSearch: "Odovzda\u0165",
      suggestionResultsCount_few: "{{label}} \u2013 {{count}} v\xFDsledky",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} v\xFDsledok",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} v\xFDsledkov",
      thankYouForYourFeedback: "\u010Eakujeme za va\u0161u sp\xE4tn\xFA v\xE4zbu!",
      thisAnsweredMyQuestion: "Toto odpovedalo na moju ot\xE1zku",
      thisDidNotAnswerMyQuestion: "Toto neodpovedalo na moju ot\xE1zku",
      unselectAnOptionToEnterInARange: "Zru\u0161te v\xFDber mo\u017Enosti, aby ste mohli zada\u0165 rozsah.",
      updateYourLocation: "Aktualizujte svoju polohu",
      useCurrentLocation: "Pou\u017Ei\u0165 aktu\xE1lnu polohu",
      useMyLocation: "Pou\u017Ei\u0165 moju polohu",
      viewAll: "Zobrazi\u0165 v\u0161etko",
      viewDetails: "Zobrazi\u0165 podrobnosti"
    };
  }
});

// locales/sv/search-ui-react.json
var require_search_ui_react27 = __commonJS({
  "locales/sv/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI-genererat svar",
      allCategories: "Alla kategorier",
      appliedFiltersToCurrentSearch: "Till\xE4mpade filter f\xF6r aktuell s\xF6kning",
      apply: "Till\xE4mpa",
      applyFilters: "Till\xE4mpa filter",
      autocompleteOptionsFound_one: "{{count}}{{label}} autofyllningsval hittades.",
      autocompleteOptionsFound_other: "{{count}}{{label}} autofyllningsval hittades.",
      autocompleteSuggestion: "autofyllningsf\xF6rslag: {{suggestion}}",
      autocompleteSuggestionsFound_one: "{{count}} autofyllningsf\xF6rslag hittades.",
      autocompleteSuggestionsFound_other: "{{count}} autofyllningsf\xF6rslag hittades.",
      basedOnYourDevice: " (baserat p\xE5 din enhet)",
      basedOnYourInternetAddress: " (baserat p\xE5 din internetadress)",
      categoriesText_one: "F\xF6ljande kategori gav resultat f\xF6r \u2013 <strong>{{query}}</strong>",
      categoriesText_other: "F\xF6ljande kategorier gav resultat f\xF6r \u2013 <strong>{{query}}</strong>",
      clearAll: "Rensa allt",
      clearMinAndMax: "Rensa min och max",
      clearTheRangeToSelectOptions: "Rensa intervallet f\xF6r att v\xE4lja alternativ.",
      clearTheSearchBar: "Rensa s\xF6kf\xE4ltet",
      conductASearch: "Utf\xF6r en s\xF6kning",
      currentLocation: "Aktuell plats",
      didYouMean: "Menade du <button>{{correctedQuery}}</button>?",
      dropDownScreenReaderInstructions: "N\xE4r autofyllningsresultat \xE4r tillg\xE4ngliga, anv\xE4nd upp- och nedpilar f\xF6r att bl\xE4ddra och enter f\xF6r att v\xE4lja.",
      feedback: "Feedback",
      invalidRange: "Ogiltigt intervall",
      max: "Max",
      min: "Min",
      navigateToTheNextResultsPage: "G\xE5 till n\xE4sta resultatsida",
      navigateToThePreviousResultsPage: "G\xE5 till f\xF6reg\xE5ende resultatsida",
      noAutocompleteOptionsFound: "0 autofyllningsval hittades.",
      noAutocompleteSuggestionsFound: "0 autofyllningsf\xF6rslag hittades.",
      noResultsFoundIn: "Inga resultat hittades i {{currentVerticalLabel}}.",
      pagination: "Pagination",
      readMoreAbout: "L\xE4s mer om <a>{{name}}</a>",
      recentSearch: "senaste s\xF6kningen: {{query}}",
      recentSearchesFound_one: "{{count}} senaste s\xF6kning hittades.",
      recentSearchesFound_other: "{{count}} senaste s\xF6kningar hittades.",
      removeFilter: 'Ta bort filtret "{{displayName}}"',
      resultPreview: "resultatf\xF6rhandsgranskning: {{value}}",
      resultPreviewsFound_one: "{{count}} f\xF6rhandsgranskning hittades.",
      resultPreviewsFound_other: "{{count}} f\xF6rhandsgranskningar hittades.",
      resultsCountText_one: "{{count}} resultat",
      resultsCountText_other: "{{count}} resultat",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} av {{resultsCount}} resultat",
      searchHere: "S\xF6k h\xE4r\u2026",
      showLess: "Visa mindre",
      showMore: "Visa mer",
      showingAllInstead: "Visar alla {{currentVerticalLabel}} i st\xE4llet.",
      sources_one: "K\xE4lla",
      sources_other: "K\xE4llor ({{count}})",
      submitSearch: "Skicka s\xF6kning",
      suggestionResultsCount_one: "{{label}} \u2013 {{count}} resultat",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} resultat",
      thankYouForYourFeedback: "Tack f\xF6r din feedback!",
      thisAnsweredMyQuestion: "Detta besvarade min fr\xE5ga",
      thisDidNotAnswerMyQuestion: "Detta besvarade inte min fr\xE5ga",
      unselectAnOptionToEnterInARange: "Avmarkera ett alternativ f\xF6r att ange ett intervall.",
      updateYourLocation: "Uppdatera din plats",
      useCurrentLocation: "Anv\xE4nd aktuell plats",
      useMyLocation: "Anv\xE4nd min plats",
      viewAll: "Visa alla",
      viewDetails: "Visa detaljer"
    };
  }
});

// locales/tr/search-ui-react.json
var require_search_ui_react28 = __commonJS({
  "locales/tr/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Yapay Zek\xE2 Taraf\u0131ndan Olu\u015Fturulan Yan\u0131t",
      allCategories: "T\xFCm Kategoriler",
      appliedFiltersToCurrentSearch: "Mevcut aramaya uygulanan filtreler",
      apply: "Uygula",
      applyFilters: "Filtreleri Uygula",
      autocompleteOptionsFound_other: "{{count}}{{label}} tamamlay\u0131c\u0131 se\xE7enekler bulundu.",
      autocompleteSuggestion: "tamamlay\u0131c\u0131 \xF6neri: {{suggestion}}",
      autocompleteSuggestionsFound_other: "{{count}} tamamlay\u0131c\u0131 \xF6neri bulundu.",
      basedOnYourDevice: " (cihaz\u0131n\u0131za g\xF6re)",
      basedOnYourInternetAddress: " (internet adresinize g\xF6re)",
      categoriesText_other: "A\u015Fa\u011F\u0131daki kategoriler i\xE7in sonu\xE7lar bulundu \u2013 <strong>{{query}}</strong>",
      clearAll: "T\xFCm\xFCn\xFC Temizle",
      clearMinAndMax: "Min ve maks de\u011Ferleri temizle",
      clearTheRangeToSelectOptions: "Se\xE7enekleri se\xE7mek i\xE7in aral\u0131\u011F\u0131 temizle.",
      clearTheSearchBar: "Arama \xE7ubu\u011Funu temizle",
      conductASearch: "Arama yap",
      currentLocation: "Mevcut Konum",
      didYouMean: "Demek istediniz mi <button>{{correctedQuery}}</button>",
      dropDownScreenReaderInstructions: "Tamamlay\u0131c\u0131 sonu\xE7lar mevcut oldu\u011Funda, yukar\u0131/a\u015Fa\u011F\u0131 oklar\u0131 kullanarak gezinip enter ile se\xE7in.",
      feedback: "Geri bildirim",
      invalidRange: "Ge\xE7ersiz aral\u0131k",
      max: "Maks",
      min: "Min",
      navigateToTheNextResultsPage: "Sonraki sonu\xE7 sayfas\u0131na git",
      navigateToThePreviousResultsPage: "\xD6nceki sonu\xE7 sayfas\u0131na git",
      noAutocompleteOptionsFound: "0 tamamlay\u0131c\u0131 se\xE7enek bulundu.",
      noAutocompleteSuggestionsFound: "0 tamamlay\u0131c\u0131 \xF6neri bulundu.",
      noResultsFoundIn: "{{currentVerticalLabel}} i\xE7inde sonu\xE7 bulunamad\u0131.",
      pagination: "Sayfaland\u0131rma",
      readMoreAbout: "<a>{{name}}</a> hakk\u0131nda daha fazla oku",
      recentSearch: "son arama: {{query}}",
      recentSearchesFound_other: "{{count}} son arama bulundu.",
      removeFilter: "\u201C{{displayName}}\u201D filtresini kald\u0131r",
      resultPreview: "sonu\xE7 \xF6nizlemesi: {{value}}",
      resultPreviewsFound_other: "{{count}} yak\u0131n zamanda \xF6nizleme bulundu.",
      resultsCountText_other: "{{count}} Sonu\xE7",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} toplam {{resultsCount}} sonu\xE7",
      searchHere: "Burada ara\u2026",
      showLess: "Daha az g\xF6ster",
      showMore: "Daha fazla g\xF6ster",
      showingAllInstead: "Bunun yerine t\xFCm {{currentVerticalLabel}} g\xF6steriliyor.",
      sources_other: "Kaynaklar ({{count}})",
      submitSearch: "Aramay\u0131 G\xF6nder",
      suggestionResultsCount_other: "{{label}} - {{count}} sonu\xE7",
      thankYouForYourFeedback: "Geri bildiriminiz i\xE7in te\u015Fekk\xFCrler!",
      thisAnsweredMyQuestion: "Bu sorumu yan\u0131tlad\u0131",
      thisDidNotAnswerMyQuestion: "Bu sorumu yan\u0131tlamad\u0131",
      unselectAnOptionToEnterInARange: "Aral\u0131k girmek i\xE7in bir se\xE7ene\u011Fin se\xE7imini kald\u0131r\u0131n.",
      updateYourLocation: "Konumunuzu g\xFCncelleyin",
      useCurrentLocation: "Mevcut Konumu Kullan",
      useMyLocation: "Konumumu kullan",
      viewAll: "T\xFCm\xFCn\xFC G\xF6r",
      viewDetails: "Detaylar\u0131 G\xF6r\xFCnt\xFCle"
    };
  }
});

// locales/vi/search-ui-react.json
var require_search_ui_react29 = __commonJS({
  "locales/vi/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "Tr\u1EA3 l\u1EDDi do AI t\u1EA1o",
      allCategories: "T\u1EA5t c\u1EA3 danh m\u1EE5c",
      appliedFiltersToCurrentSearch: "B\u1ED9 l\u1ECDc \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng cho t\xECm ki\u1EBFm hi\u1EC7n t\u1EA1i",
      apply: "\xC1p d\u1EE5ng",
      applyFilters: "\xC1p d\u1EE5ng b\u1ED9 l\u1ECDc",
      autocompleteOptionsFound_other: "\u0110\xE3 t\xECm th\u1EA5y {{count}} t\xF9y ch\u1ECDn t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh{{label}}.",
      autocompleteSuggestion: "\u0111\u1EC1 xu\u1EA5t t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh: {{suggestion}}",
      autocompleteSuggestionsFound_other: "\u0110\xE3 t\xECm th\u1EA5y {{count}} \u0111\u1EC1 xu\u1EA5t t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh.",
      basedOnYourDevice: " (d\u1EF1a tr\xEAn thi\u1EBFt b\u1ECB c\u1EE7a b\u1EA1n)",
      basedOnYourInternetAddress: " (d\u1EF1a tr\xEAn \u0111\u1ECBa ch\u1EC9 internet c\u1EE7a b\u1EA1n)",
      categoriesText_other: "C\xE1c danh m\u1EE5c sau c\xF3 k\u1EBFt qu\u1EA3 cho \u2013 <strong>{{query}}</strong>",
      clearAll: "X\xF3a t\u1EA5t c\u1EA3",
      clearMinAndMax: "X\xF3a gi\xE1 tr\u1ECB t\u1ED1i thi\u1EC3u v\xE0 t\u1ED1i \u0111a",
      clearTheRangeToSelectOptions: "X\xF3a ph\u1EA1m vi \u0111\u1EC3 ch\u1ECDn c\xE1c t\xF9y ch\u1ECDn.",
      clearTheSearchBar: "X\xF3a thanh t\xECm ki\u1EBFm",
      conductASearch: "Ti\u1EBFn h\xE0nh t\xECm ki\u1EBFm",
      currentLocation: "V\u1ECB tr\xED hi\u1EC7n t\u1EA1i",
      didYouMean: "\xDD b\u1EA1n l\xE0 <button>{{correctedQuery}}</button> ph\u1EA3i kh\xF4ng",
      dropDownScreenReaderInstructions: "Khi c\xF3 k\u1EBFt qu\u1EA3 t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh, d\xF9ng ph\xEDm m\u0169i l\xEAn/xu\u1ED1ng \u0111\u1EC3 duy\u1EC7t v\xE0 Enter \u0111\u1EC3 ch\u1ECDn.",
      feedback: "Ph\u1EA3n h\u1ED3i",
      invalidRange: "Ph\u1EA1m vi kh\xF4ng h\u1EE3p l\u1EC7",
      max: "T\u1ED1i \u0111a",
      min: "T\u1ED1i thi\u1EC3u",
      navigateToTheNextResultsPage: "\u0110i\u1EC1u h\u01B0\u1EDBng \u0111\u1EBFn trang k\u1EBFt qu\u1EA3 ti\u1EBFp theo",
      navigateToThePreviousResultsPage: "\u0110i\u1EC1u h\u01B0\u1EDBng \u0111\u1EBFn trang k\u1EBFt qu\u1EA3 tr\u01B0\u1EDBc \u0111\xF3",
      noAutocompleteOptionsFound: "0 t\xF9y ch\u1ECDn t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh \u0111\u01B0\u1EE3c t\xECm th\u1EA5y.",
      noAutocompleteSuggestionsFound: "0 \u0111\u1EC1 xu\u1EA5t t\u1EF1 \u0111\u1ED9ng ho\xE0n th\xE0nh \u0111\u01B0\u1EE3c t\xECm th\u1EA5y.",
      noResultsFoundIn: "Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 trong {{currentVerticalLabel}}.",
      pagination: "Ph\xE2n trang",
      readMoreAbout: "T\xECm hi\u1EC3u th\xEAm v\u1EC1 <a>{{name}}</a>",
      recentSearch: "T\xECm ki\u1EBFm g\u1EA7n \u0111\xE2y: {{query}}",
      recentSearchesFound_other: "\u0110\xE3 t\xECm th\u1EA5y {{count}} l\u01B0\u1EE3t t\xECm ki\u1EBFm g\u1EA7n \u0111\xE2y.",
      removeFilter: "X\xF3a b\u1ED9 l\u1ECDc \u201C{{displayName}}\u201D",
      resultPreview: "Xem tr\u01B0\u1EDBc k\u1EBFt qu\u1EA3: {{value}}",
      resultPreviewsFound_other: "\u0110\xE3 t\xECm th\u1EA5y {{count}} b\u1EA3n xem tr\u01B0\u1EDBc k\u1EBFt qu\u1EA3.",
      resultsCountText_other: "{{count}} k\u1EBFt qu\u1EA3",
      resultsCountWithPaginationText: "{{paginateStart}}\u2013{{paginateEnd}} tr\xEAn t\u1ED5ng {{resultsCount}} k\u1EBFt qu\u1EA3",
      searchHere: "T\xECm ki\u1EBFm \u1EDF \u0111\xE2y\u2026",
      showLess: "\u1EA8n b\u1EDBt",
      showMore: "Xem th\xEAm",
      showingAllInstead: "Hi\u1EC3n th\u1ECB t\u1EA5t c\u1EA3 {{currentVerticalLabel}} thay v\xE0o \u0111\xF3.",
      sources_other: "Ngu\u1ED3n ({{count}})",
      submitSearch: "G\u1EEDi t\xECm ki\u1EBFm",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} k\u1EBFt qu\u1EA3",
      thankYouForYourFeedback: "C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 ph\u1EA3n h\u1ED3i!",
      thisAnsweredMyQuestion: "\u0110i\u1EC1u n\xE0y \u0111\xE3 tr\u1EA3 l\u1EDDi c\xE2u h\u1ECFi c\u1EE7a t\xF4i",
      thisDidNotAnswerMyQuestion: "\u0110i\u1EC1u n\xE0y kh\xF4ng tr\u1EA3 l\u1EDDi c\xE2u h\u1ECFi c\u1EE7a t\xF4i",
      unselectAnOptionToEnterInARange: "B\u1ECF ch\u1ECDn m\u1ED9t t\xF9y ch\u1ECDn \u0111\u1EC3 nh\u1EADp kho\u1EA3ng gi\xE1 tr\u1ECB.",
      updateYourLocation: "C\u1EADp nh\u1EADt v\u1ECB tr\xED c\u1EE7a b\u1EA1n",
      useCurrentLocation: "D\xF9ng v\u1ECB tr\xED hi\u1EC7n t\u1EA1i",
      useMyLocation: "D\xF9ng v\u1ECB tr\xED c\u1EE7a t\xF4i",
      viewAll: "Xem t\u1EA5t c\u1EA3",
      viewDetails: "Xem chi ti\u1EBFt"
    };
  }
});

// locales/zh-CN/search-ui-react.json
var require_search_ui_react30 = __commonJS({
  "locales/zh-CN/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI \u751F\u6210\u7684\u7B54\u6848",
      allCategories: "\u6240\u6709\u7C7B\u522B",
      appliedFiltersToCurrentSearch: "\u5DF2\u5E94\u7528\u4E8E\u5F53\u524D\u641C\u7D22\u7684\u7B5B\u9009\u6761\u4EF6",
      apply: "\u5E94\u7528",
      applyFilters: "\u5E94\u7528\u7B5B\u9009\u6761\u4EF6",
      autocompleteOptionsFound_other: "\u627E\u5230 {{count}} \u4E2A{{label}}\u81EA\u52A8\u5B8C\u6210\u9009\u9879\u3002",
      autocompleteSuggestion: "\u81EA\u52A8\u5B8C\u6210\u5EFA\u8BAE\uFF1A{{suggestion}}",
      autocompleteSuggestionsFound_other: "\u627E\u5230 {{count}} \u4E2A\u81EA\u52A8\u5B8C\u6210\u5EFA\u8BAE\u3002",
      basedOnYourDevice: "\uFF08\u57FA\u4E8E\u60A8\u7684\u8BBE\u5907\uFF09",
      basedOnYourInternetAddress: "\uFF08\u57FA\u4E8E\u60A8\u7684 IP \u5730\u5740\uFF09",
      categoriesText_other: "\u4EE5\u4E0B\u5206\u7C7B\u5305\u542B\u4E0E<strong>{{query}}</strong>\u76F8\u5173\u7684\u7ED3\u679C",
      clearAll: "\u6E05\u9664\u5168\u90E8",
      clearMinAndMax: "\u6E05\u9664\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C",
      clearTheRangeToSelectOptions: "\u6E05\u9664\u4EE5\u9009\u62E9\u9009\u9879\u7684\u8303\u56F4\u3002",
      clearTheSearchBar: "\u6E05\u9664\u641C\u7D22\u680F",
      conductASearch: "\u8FDB\u884C\u641C\u7D22",
      currentLocation: "\u5F53\u524D\u4F4D\u7F6E",
      didYouMean: "\u60A8\u7684\u610F\u601D\u662F <button>{{correctedQuery}}</button> \u5417",
      dropDownScreenReaderInstructions: "\u5F53\u6709\u81EA\u52A8\u5B8C\u6210\u7ED3\u679C\u65F6\uFF0C\u4F7F\u7528\u4E0A\u4E0B\u7BAD\u5934\u6D4F\u89C8\uFF0C\u6309\u56DE\u8F66\u952E\u9009\u62E9\u3002",
      feedback: "\u53CD\u9988",
      invalidRange: "\u65E0\u6548\u8303\u56F4",
      max: "\u6700\u5927",
      min: "\u6700\u5C0F",
      navigateToTheNextResultsPage: "\u5BFC\u822A\u5230\u4E0B\u4E00\u4E2A\u7ED3\u679C\u9875\u9762",
      navigateToThePreviousResultsPage: "\u5BFC\u822A\u5230\u4E0A\u4E00\u4E2A\u7ED3\u679C\u9875\u9762",
      noAutocompleteOptionsFound: "0\u5DF2\u627E\u5230\u81EA\u52A8\u5B8C\u6210\u9009\u9879\u3002",
      noAutocompleteSuggestionsFound: "0\u53D1\u73B0\u81EA\u52A8\u5B8C\u6210\u5EFA\u8BAE\u3002",
      noResultsFoundIn: "\u5728{{currentVerticalLabel}}\u4E2D\u672A\u627E\u5230\u7ED3\u679C\u3002",
      pagination: "\u5206\u9875",
      readMoreAbout: "\u9605\u8BFB\u5173\u4E8E<a>{{name}}</a>\u7684\u66F4\u591A\u5185\u5BB9",
      recentSearch: "\u6700\u8FD1\u7684\u641C\u7D22\uFF1A{{query}}",
      recentSearchesFound_other: "\u627E\u5230 {{count}} \u4E2A\u6700\u8FD1\u7684\u641C\u7D22\u8BB0\u5F55\u3002",
      removeFilter: "\u79FB\u9664\u201C{{displayName}}\u201D\u7B5B\u9009\u5668",
      resultPreview: "\u7ED3\u679C\u9884\u89C8\uFF1A{{value}}",
      resultPreviewsFound_other: "\u627E\u5230 {{count}} \u4E2A\u7ED3\u679C\u9884\u89C8\u3002",
      resultsCountText_other: "{{count}} \u6761\u7ED3\u679C",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} / \u5171 {{resultsCount}} \u4E2A\u7ED3\u679C",
      searchHere: "\u5728\u6B64\u641C\u7D22\u2026",
      showLess: "\u6536\u8D77",
      showMore: "\u67E5\u770B\u66F4\u591A",
      showingAllInstead: "\u6B63\u5728\u663E\u793A\u6240\u6709{{currentVerticalLabel}}\u3002",
      sources_other: "\u6765\u6E90\uFF08{{count}}\uFF09",
      submitSearch: "\u63D0\u4EA4\u641C\u7D22",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} \u4E2A\u7ED3\u679C",
      thankYouForYourFeedback: "\u611F\u8C22\u60A8\u7684\u53CD\u9988\uFF01",
      thisAnsweredMyQuestion: "\u8FD9\u4E2A\u56DE\u7B54\u4E86\u6211\u7684\u95EE\u9898",
      thisDidNotAnswerMyQuestion: "\u8FD9\u4E2A\u6CA1\u6709\u56DE\u7B54\u6211\u7684\u95EE\u9898",
      unselectAnOptionToEnterInARange: "\u53D6\u6D88\u9009\u62E9\u67D0\u4E2A\u9009\u9879\u4EE5\u8F93\u5165\u8303\u56F4\u3002",
      updateYourLocation: "\u66F4\u65B0\u60A8\u7684\u4F4D\u7F6E",
      useCurrentLocation: "\u4F7F\u7528\u5F53\u524D\u4F4D\u7F6E",
      useMyLocation: "\u4F7F\u7528\u6211\u7684\u4F4D\u7F6E",
      viewAll: "\u67E5\u770B\u5168\u90E8",
      viewDetails: "\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F"
    };
  }
});

// locales/zh-TW/search-ui-react.json
var require_search_ui_react31 = __commonJS({
  "locales/zh-TW/search-ui-react.json"(exports2, module2) {
    module2.exports = {
      aiGeneratedAnswer: "AI \u7522\u751F\u7684\u7B54\u6848",
      allCategories: "\u6240\u6709\u5206\u985E",
      appliedFiltersToCurrentSearch: "\u5DF2\u5957\u7528\u81F3\u76EE\u524D\u641C\u5C0B\u7684\u7BE9\u9078\u5668",
      apply: "\u5957\u7528",
      applyFilters: "\u5957\u7528\u7BE9\u9078\u5668",
      autocompleteOptionsFound_other: "\u627E\u5230 {{count}} \u500B{{label}}\u81EA\u52D5\u5B8C\u6210\u9078\u9805\u3002",
      autocompleteSuggestion: "\u81EA\u52D5\u5B8C\u6210\u5EFA\u8B70\uFF1A{{suggestion}}",
      autocompleteSuggestionsFound_other: "\u627E\u5230 {{count}} \u500B\u81EA\u52D5\u5B8C\u6210\u5EFA\u8B70\u3002",
      basedOnYourDevice: "\uFF08\u4F9D\u64DA\u60A8\u7684\u88DD\u7F6E\uFF09",
      basedOnYourInternetAddress: "\uFF08\u4F9D\u64DA\u60A8\u7684\u7DB2\u969B\u7DB2\u8DEF\u4F4D\u5740\uFF09",
      categoriesText_other: "\u4EE5\u4E0B\u5206\u985E\u5305\u542B\u8207<strong>{{query}}</strong>\u76F8\u95DC\u7684\u7D50\u679C",
      clearAll: "\u6E05\u9664\u5168\u90E8",
      clearMinAndMax: "\u6E05\u9664\u6700\u5C0F\u503C\u8207\u6700\u5927\u503C",
      clearTheRangeToSelectOptions: "\u6E05\u9664\u7BC4\u570D\u4EE5\u9078\u64C7\u9078\u9805\u3002",
      clearTheSearchBar: "\u6E05\u9664\u641C\u5C0B\u6B04",
      conductASearch: "\u9032\u884C\u641C\u5C0B",
      currentLocation: "\u76EE\u524D\u4F4D\u7F6E",
      didYouMean: "\u60A8\u7684\u610F\u601D\u662F <button>{{correctedQuery}}</button> \u55CE",
      dropDownScreenReaderInstructions: "\u6709\u81EA\u52D5\u5B8C\u6210\u7D50\u679C\u6642\uFF0C\u8ACB\u4F7F\u7528\u4E0A\u4E0B\u9375\u700F\u89BD\u4E26\u6309 Enter \u9375\u9078\u53D6\u3002",
      feedback: "\u56DE\u994B",
      invalidRange: "\u7121\u6548\u7BC4\u570D",
      max: "\u6700\u5927",
      min: "\u6700\u5C0F",
      navigateToTheNextResultsPage: "\u524D\u5F80\u4E0B\u4E00\u9801\u7D50\u679C",
      navigateToThePreviousResultsPage: "\u524D\u5F80\u4E0A\u4E00\u9801\u7D50\u679C",
      noAutocompleteOptionsFound: "\u672A\u627E\u5230\u81EA\u52D5\u5B8C\u6210\u9078\u9805\u3002",
      noAutocompleteSuggestionsFound: "\u672A\u627E\u5230\u81EA\u52D5\u5B8C\u6210\u5EFA\u8B70\u3002",
      noResultsFoundIn: "\u5728{{currentVerticalLabel}}\u4E2D\u627E\u4E0D\u5230\u7D50\u679C\u3002",
      pagination: "\u5206\u9801",
      readMoreAbout: "\u95B1\u8B80\u66F4\u591A\u95DC\u65BC<a>{{name}}</a>\u7684\u8CC7\u8A0A",
      recentSearch: "\u6700\u8FD1\u641C\u5C0B\uFF1A{{query}}",
      recentSearchesFound_other: "\u627E\u5230 {{count}} \u7B46\u6700\u8FD1\u641C\u5C0B\u3002",
      removeFilter: "\u79FB\u9664\u300C{{displayName}}\u300D\u7BE9\u9078\u5668",
      resultPreview: "\u7D50\u679C\u9810\u89BD\uFF1A{{value}}",
      resultPreviewsFound_other: "\u627E\u5230 {{count}} \u7B46\u7D50\u679C\u9810\u89BD\u3002",
      resultsCountText_other: "{{count}} \u7B46\u7D50\u679C",
      resultsCountWithPaginationText: "{{paginateStart}} - {{paginateEnd}} / \u5171 {{resultsCount}} \u7B46\u7D50\u679C",
      searchHere: "\u8ACB\u5728\u6B64\u641C\u5C0B\u2026",
      showLess: "\u986F\u793A\u8F03\u5C11",
      showMore: "\u986F\u793A\u66F4\u591A",
      showingAllInstead: "\u986F\u793A\u6240\u6709 {{currentVerticalLabel}}\u3002",
      sources_other: "\u4F86\u6E90\uFF08{{count}}\uFF09",
      submitSearch: "\u63D0\u4EA4\u641C\u5C0B",
      suggestionResultsCount_other: "{{label}} \u2013 {{count}} \u7B46\u7D50\u679C",
      thankYouForYourFeedback: "\u611F\u8B1D\u60A8\u7684\u610F\u898B\u56DE\u994B\uFF01",
      thisAnsweredMyQuestion: "\u9019\u6709\u56DE\u7B54\u5230\u6211\u7684\u554F\u984C",
      thisDidNotAnswerMyQuestion: "\u9019\u6C92\u6709\u56DE\u7B54\u5230\u6211\u7684\u554F\u984C",
      unselectAnOptionToEnterInARange: "\u53D6\u6D88\u9078\u64C7\u4E00\u500B\u9078\u9805\u4EE5\u8F38\u5165\u7BC4\u570D\u3002",
      updateYourLocation: "\u66F4\u65B0\u60A8\u7684\u4F4D\u7F6E",
      useCurrentLocation: "\u4F7F\u7528\u76EE\u524D\u4F4D\u7F6E",
      useMyLocation: "\u4F7F\u7528\u6211\u7684\u4F4D\u7F6E",
      viewAll: "\u67E5\u770B\u5168\u90E8",
      viewDetails: "\u67E5\u770B\u8A73\u7D30\u8CC7\u6599"
    };
  }
});

// src/utils/supportedLocales.ts
var require_supportedLocales = __commonJS({
  "src/utils/supportedLocales.ts"(exports2, module2) {
    "use strict";
    var supportedLocales2 = [
      "ar",
      "cs",
      "da",
      "de",
      "el",
      "en-GB",
      "en",
      "es",
      "et",
      "fi",
      "fr",
      "hi",
      "hr",
      "hu",
      "it",
      "ja",
      "ko",
      "lt",
      "lv",
      "nb",
      "nl",
      "pl",
      "pt",
      "ro",
      "ru",
      "sk",
      "sv",
      "tr",
      "vi",
      "zh-CN",
      "zh-TW"
    ];
    module2.exports = { supportedLocales: supportedLocales2 };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AlternativeVerticals: () => AlternativeVerticals,
  AnalyticsProvider: () => AnalyticsProvider,
  AppliedFilters: () => AppliedFilters,
  ApplyFiltersButton: () => ApplyFiltersButton,
  ComponentsContentPath: () => ComponentsContentPath,
  DirectAnswer: () => DirectAnswer,
  DropdownItem: () => DropdownItem,
  Facets: () => Facets,
  FilterDivider: () => FilterDivider,
  FilterSearch: () => FilterSearch,
  GenerativeDirectAnswer: () => GenerativeDirectAnswer,
  Geolocation: () => Geolocation,
  HierarchicalFacet: () => HierarchicalFacet,
  HierarchicalFacets: () => HierarchicalFacets,
  LocationBias: () => LocationBias,
  MapboxMap: () => MapboxMap,
  NumericalFacet: () => NumericalFacet,
  NumericalFacets: () => NumericalFacets,
  Pagination: () => Pagination,
  ResultsCount: () => ResultsCount,
  SearchBar: () => SearchBar,
  SearchI18nextProvider: () => SearchI18nextProvider,
  SpellCheck: () => SpellCheck,
  StandardCard: () => StandardCard,
  StandardFacet: () => StandardFacet,
  StandardFacets: () => StandardFacets,
  StandardSection: () => StandardSection,
  StaticFilters: () => StaticFilters,
  ThumbsFeedback: () => ThumbsFeedback,
  UniversalResults: () => UniversalResults,
  VerticalResults: () => VerticalResults,
  executeAutocomplete: () => executeAutocomplete,
  executeGenerativeDirectAnswer: () => executeGenerativeDirectAnswer,
  executeSearch: () => executeSearch,
  getSearchIntents: () => getSearchIntents,
  getUserLocation: () => getUserLocation,
  i18nInstance: () => i18nInstance,
  isCtaData: () => isCtaData,
  renderHighlightedValue: () => renderHighlightedValue,
  updateLocationIfNeeded: () => updateLocationIfNeeded,
  useAnalytics: () => useAnalytics,
  useCardAnalyticsCallback: () => useCardAnalyticsCallback,
  useCardFeedbackCallback: () => useCardFeedbackCallback,
  useComposedCssClasses: () => useComposedCssClasses
});
module.exports = __toCommonJS(index_exports);

// src/components/SearchBar.tsx
var import_react_i18next3 = require("react-i18next");
var import_search_headless_react7 = require("@yext/search-headless-react");
var import_classnames = __toESM(require("classnames"));
var import_react26 = __toESM(require("react"));

// src/hooks/useEntityPreviews.tsx
var import_react3 = require("react");

// src/hooks/useComponentMountStatus.tsx
var import_react = require("react");
function useComponentMountStatus() {
  const isMountedRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
}

// src/hooks/useDebouncedFunction.ts
var import_react2 = require("react");
function useDebouncedFunction(func, milliseconds) {
  const timeoutIdRef = (0, import_react2.useRef)();
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
  ] = (0, import_react3.useState)({});
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
  const [isLoading, setLoadingState] = (0, import_react3.useState)(false);
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
    debouncedUniversalSearch?.();
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
var import_react4 = require("react");
var import_recent_searches = require("recent-searches");
function useRecentSearches(recentSearchesLimit, verticalKey) {
  const recentSearchesKey = getRecentSearchesKey(verticalKey);
  const [recentSearches, setRecentSeaches] = (0, import_react4.useState)(
    new import_recent_searches.RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    })
  );
  const clearRecentSearches = (0, import_react4.useCallback)(() => {
    localStorage.removeItem(recentSearchesKey);
    setRecentSeaches(new import_recent_searches.RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
    localStorage.removeItem(recentSearchesKey);
  }, [recentSearchesKey, recentSearchesLimit]);
  const setRecentSearch = (0, import_react4.useCallback)((input) => {
    recentSearches.setRecentSearch(input);
  }, [recentSearches]);
  (0, import_react4.useEffect)(() => {
    setRecentSeaches(new import_recent_searches.RecentSearches({
      limit: recentSearchesLimit,
      namespace: recentSearchesKey
    }));
  }, [recentSearchesKey, recentSearchesLimit]);
  return [recentSearches?.getRecentSearches(), setRecentSearch, clearRecentSearches];
}
function getRecentSearchesKey(verticalKey) {
  if (verticalKey) {
    return `__yxt_recent_searches_${verticalKey}__`;
  } else {
    return "__yxt_recent_searches_universal__";
  }
}

// src/hooks/useSearchWithNearMeHandling.ts
var import_search_headless_react3 = require("@yext/search-headless-react");

// src/utils/search-operations.ts
var import_search_headless_react = require("@yext/search-headless-react");
async function executeSearch(searchActions) {
  const isVertical = searchActions.state.meta.searchType === import_search_headless_react.SearchTypeEnum.Vertical;
  try {
    isVertical ? searchActions.executeVerticalQuery() : searchActions.executeUniversalQuery();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? "vertical" : "universal"} search.
`, e);
  }
}
async function executeAutocomplete(searchActions) {
  const isVertical = searchActions.state.meta.searchType === import_search_headless_react.SearchTypeEnum.Vertical;
  try {
    return isVertical ? searchActions.executeVerticalAutocomplete() : searchActions.executeUniversalAutocomplete();
  } catch (e) {
    console.error(`Error occured executing a ${isVertical ? "vertical" : "universal"} autocomplete search.
`, e);
  }
}
async function getSearchIntents(searchActions) {
  const results = await executeAutocomplete(searchActions);
  return results?.inputIntents;
}
async function executeGenerativeDirectAnswer(searchActions) {
  try {
    return await searchActions.executeGenerativeDirectAnswer();
  } catch (e) {
    console.error(`Error occured executing generative direct answer.
`, e);
  }
}

// src/utils/location-operations.ts
var import_search_headless_react2 = require("@yext/search-headless-react");
var defaultGeolocationOptions = {
  enableHighAccuracy: false,
  timeout: 6e3,
  maximumAge: 3e5
};
async function updateLocationIfNeeded(searchActions, intents, geolocationOptions) {
  if (intents.includes(import_search_headless_react2.SearchIntent.NearMe) && !searchActions.state.location.userLocation) {
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
        { ...defaultGeolocationOptions, ...geolocationOptions }
      );
    } else {
      reject("No access to geolocation API. Unable to determine user's location.");
    }
  });
}

// src/hooks/useSearchWithNearMeHandling.ts
var import_react5 = require("react");
function useSearchWithNearMeHandling(geolocationOptions, onSearch) {
  const autocompletePromiseRef = (0, import_react5.useRef)();
  const searchActions = (0, import_search_headless_react3.useSearchActions)();
  async function executeQuery() {
    try {
      let intents = [];
      if (!searchActions.state.location.userLocation) {
        if (!autocompletePromiseRef.current) {
          autocompletePromiseRef.current = executeAutocomplete(searchActions);
        }
        const autocompleteResponseBeforeSearch = await autocompletePromiseRef.current;
        intents = autocompleteResponseBeforeSearch?.inputIntents || [];
        await updateLocationIfNeeded(searchActions, intents, geolocationOptions);
      }
    } catch (e) {
      console.error("Error executing autocomplete before search:", e);
      await updateLocationIfNeeded(searchActions, [], geolocationOptions);
    }
    const verticalKey = searchActions.state.vertical.verticalKey ?? "";
    const query = searchActions.state.query.input ?? "";
    onSearch ? onSearch({ verticalKey, query }) : executeSearch(searchActions);
  }
  return [executeQuery, autocompletePromiseRef];
}

// src/hooks/useSynchronizedRequest.tsx
var import_react6 = require("react");
function useSynchronizedRequest(executeRequest, handleRejectedPromise) {
  const executeRequestRef = (0, import_react6.useRef)(executeRequest);
  const handleRejectedPromiseRef = (0, import_react6.useRef)(handleRejectedPromise);
  const isMountedRef = useComponentMountStatus();
  const networkIds = (0, import_react6.useRef)({ latestRequest: 0, responseInState: 0 });
  const [synchronizedResponse, setSynchronizedResponse] = (0, import_react6.useState)();
  const executeSynchronizedRequest = (0, import_react6.useCallback)(async (data) => {
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
  const clearResponseData = (0, import_react6.useCallback)(() => {
    setSynchronizedResponse(void 0);
  }, [setSynchronizedResponse]);
  (0, import_react6.useEffect)(() => {
    executeRequestRef.current = executeRequest;
    handleRejectedPromiseRef.current = handleRejectedPromise;
  });
  return [synchronizedResponse, executeSynchronizedRequest, clearResponseData];
}

// src/icons/VerticalDividerIcon.tsx
var import_react7 = __toESM(require("react"));
function VerticalDividerIcon({ className }) {
  return /* @__PURE__ */ import_react7.default.createElement(
    "svg",
    {
      className,
      width: "1",
      height: "24",
      viewBox: "0 0 1 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true"
    },
    /* @__PURE__ */ import_react7.default.createElement("rect", { width: "1", height: "24", rx: "0.5", fill: "#E1E5E8" })
  );
}

// src/icons/HistoryIcon.tsx
var import_react8 = __toESM(require("react"));
function HistoryIcon() {
  return /* @__PURE__ */ import_react8.default.createElement("svg", { viewBox: "0 0 14 15", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react8.default.createElement("path", { d: "M13.7813 7.75C13.7539 4.00391 10.7188 0.96875 7 0.96875C5.11328 0.96875 3.39063 1.76172 2.16016 2.99219L0.929688 1.76172C0.738281 1.57031 0.382813 1.70703 0.382813 2.00781L0.382813 5.45312C0.382813 5.64453 0.519531 5.78125 0.710938 5.78125L4.21094 5.78125C4.51172 5.78125 4.64844 5.42578 4.45703 5.23437L3.11719 3.92188C4.10156 2.91016 5.46875 2.28125 7 2.28125C10.0078 2.28125 12.4688 4.74219 12.4688 7.75C12.4688 10.7852 10.0078 13.2187 7 13.2188C5.57813 13.2188 4.32031 12.6992 3.33594 11.8516C3.22656 11.7422 3.00781 11.7422 2.89844 11.8516L2.43359 12.3164C2.29688 12.4531 2.29688 12.6719 2.43359 12.8086C3.63672 13.875 5.25 14.5586 7 14.5312C10.7188 14.5312 13.7813 11.4961 13.7813 7.75ZM9.1875 10.2109L9.59766 9.69141C9.67969 9.52734 9.65234 9.33594 9.51563 9.22656L7.65625 7.85937V3.92187C7.65625 3.75781 7.49219 3.59375 7.32813 3.59375H6.67188C6.48047 3.59375 6.34375 3.75781 6.34375 3.92187V8.54297L8.75 10.293C8.88672 10.4023 9.10547 10.375 9.1875 10.2109Z" }));
}

// src/icons/CloseIcon.tsx
var import_react9 = __toESM(require("react"));
function CloseIcon() {
  return /* @__PURE__ */ import_react9.default.createElement("svg", { viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ import_react9.default.createElement("path", { d: "M10.9095 9.00028L16.6786 3.2311L17.8684 2.04138C18.0439 1.86587 18.0439 1.58067 17.8684 1.40517L16.5954 0.132192C16.4199 -0.0433137 16.1347 -0.0433137 15.9592 0.132192L9.00028 7.0911L2.04138 0.131629C1.86587 -0.0438764 1.58067 -0.0438764 1.40517 0.131629L0.131629 1.40461C-0.0438764 1.58011 -0.0438764 1.86531 0.131629 2.04081L7.0911 9.00028L0.131629 15.9592C-0.0438764 16.1347 -0.0438764 16.4199 0.131629 16.5954L1.40461 17.8684C1.58011 18.0439 1.86531 18.0439 2.04081 17.8684L9.00028 10.9095L14.7695 16.6786L15.9592 17.8684C16.1347 18.0439 16.4199 18.0439 16.5954 17.8684L17.8684 16.5954C18.0439 16.4199 18.0439 16.1347 17.8684 15.9592L10.9095 9.00028Z", fill: "#6b7280" }));
}

// src/icons/MagnifyingGlassIcon.tsx
var import_react10 = __toESM(require("react"));
function MagnifyingGlassIcon() {
  return /* @__PURE__ */ import_react10.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ import_react10.default.createElement("path", { d: "M0 0h24v24H0V0z", fill: "none" }), /* @__PURE__ */ import_react10.default.createElement(
    "path",
    {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }
  ));
}

// src/components/Dropdown/Dropdown.tsx
var import_react_i18next = require("react-i18next");
var import_react18 = __toESM(require("react"));

// src/components/Dropdown/DropdownContext.ts
var import_react11 = require("react");
var DropdownContext = (0, import_react11.createContext)(null);
function useDropdownContext() {
  const dropdownContextInstance = (0, import_react11.useContext)(DropdownContext);
  if (dropdownContextInstance === null) {
    throw new Error("Tried to use DropdownContext when none exists.");
  }
  return dropdownContextInstance;
}

// src/components/Dropdown/InputContext.ts
var import_react12 = require("react");
var InputContext = (0, import_react12.createContext)(null);
function useInputContext() {
  const inputContextInstance = (0, import_react12.useContext)(InputContext);
  if (inputContextInstance === null) {
    throw new Error("Tried to use InputContext when none exists.");
  }
  return inputContextInstance;
}

// src/components/Dropdown/Dropdown.tsx
var import_useRootClose = __toESM(require("@restart/ui/useRootClose"));

// src/components/Dropdown/FocusContext.ts
var import_react13 = require("react");
var FocusContext = (0, import_react13.createContext)(null);
function useFocusContext() {
  const focusContextInstance = (0, import_react13.useContext)(FocusContext);
  if (focusContextInstance === null) {
    throw new Error("Tried to use FocusContext when none exists.");
  }
  return focusContextInstance;
}

// src/components/ScreenReader.tsx
var import_react14 = __toESM(require("react"));
function ScreenReader({
  instructionsId,
  instructions,
  announcementKey,
  announcementText
}) {
  return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      id: instructionsId,
      className: "hidden"
    },
    instructions
  ), /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      className: "sr-only",
      key: announcementKey,
      "aria-live": "assertive"
    },
    announcementText
  ));
}

// src/components/utils/recursivelyMapChildren.ts
var import_react15 = require("react");
function recursivelyMapChildren(children, elementReplacer) {
  return import_react15.Children.map(children, (c, index) => {
    if (!(0, import_react15.isValidElement)(c)) {
      return c;
    }
    const replacedElement = elementReplacer(c, index);
    if (!replacedElement || !(0, import_react15.isValidElement)(replacedElement)) {
      return replacedElement;
    }
    const grandchildren = replacedElement.props.children;
    if (!grandchildren) {
      return replacedElement;
    }
    const replacedGrandchildren = recursivelyMapChildren(grandchildren, elementReplacer);
    return (0, import_react15.cloneElement)(replacedElement, {}, [replacedGrandchildren]);
  });
}

// src/components/Dropdown/DropdownItem.tsx
var import_react16 = __toESM(require("react"));

// src/components/Dropdown/generateDropdownId.ts
function generateDropdownId(screenReaderUUID, index) {
  if (!screenReaderUUID) return "";
  return screenReaderUUID + "_" + index;
}

// src/components/Dropdown/DropdownItem.tsx
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
  const handleClick = (0, import_react16.useCallback)(() => {
    toggleDropdown(false);
    updateFocusedItem(-1);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect?.(value, index, itemData);
    onClick?.(value, index, itemData);
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
  return /* @__PURE__ */ import_react16.default.createElement(
    "div",
    {
      id: generateDropdownId(screenReaderUUID, index),
      tabIndex: 0,
      className: isFocused ? focusedClassName : className,
      onClick: handleClick,
      "aria-label": typeof ariaLabel === "function" ? ariaLabel(value) : ariaLabel
    },
    children
  );
}

// src/hooks/useLayoutEffect.ts
var import_use_isomorphic_layout_effect = __toESM(require("use-isomorphic-layout-effect"));
var useLayoutEffect = typeof import_use_isomorphic_layout_effect.default === "function" ? import_use_isomorphic_layout_effect.default : import_use_isomorphic_layout_effect.default["default"];

// src/hooks/useId.ts
var import_react17 = __toESM(require("react"));
var serverHandoffComplete = false;
var id = 0;
function genId(baseName) {
  ++id;
  return baseName + "-" + id.toString();
}
var maybeReactUseId = import_react17.default["useId".toString()];
function useId(baseName) {
  if (maybeReactUseId !== void 0) {
    return maybeReactUseId();
  }
  const initialId = serverHandoffComplete ? genId(baseName) : "";
  const [id2, setId] = (0, import_react17.useState)(initialId);
  useLayoutEffect(() => {
    if (id2 === "") {
      setId(genId(baseName));
    }
  }, [id2]);
  (0, import_react17.useEffect)(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);
  return id2;
}

// src/components/Dropdown/Dropdown.tsx
var useRootClose = typeof import_useRootClose.default === "function" ? import_useRootClose.default : import_useRootClose.default["default"];
function Dropdown(props) {
  const { t } = (0, import_react_i18next.useTranslation)();
  const {
    children,
    screenReaderText,
    screenReaderInstructions,
    onSelect,
    onToggle,
    className,
    activeClassName,
    parentQuery,
    alwaysSelectOption = false
  } = props;
  const containerRef = (0, import_react18.useRef)(null);
  const screenReaderUUID = useId("dropdown");
  const [screenReaderKey, setScreenReaderKey] = (0, import_react18.useState)(0);
  const [hasTyped, setHasTyped] = (0, import_react18.useState)(false);
  const [childrenWithDropdownItemsTransformed, items] = (0, import_react18.useMemo)(() => {
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
  return /* @__PURE__ */ import_react18.default.createElement("div", { ref: containerRef, className: isActive ? activeClassName : className, onKeyDown: handleKeyDown }, /* @__PURE__ */ import_react18.default.createElement(DropdownContext.Provider, { value: dropdownContext }, /* @__PURE__ */ import_react18.default.createElement(InputContext.Provider, { value: inputContext }, /* @__PURE__ */ import_react18.default.createElement(FocusContext.Provider, { value: focusContext }, childrenWithDropdownItemsTransformed))), /* @__PURE__ */ import_react18.default.createElement(
    ScreenReader,
    {
      announcementKey: screenReaderKey,
      announcementText: isActive && (hasTyped || items.length || value) ? screenReaderText : "",
      instructionsId: screenReaderUUID,
      instructions: screenReaderInstructions ?? t("dropDownScreenReaderInstructions")
    }
  ));
}
function useInputContextInstance() {
  const [value, setValue] = (0, import_react18.useState)("");
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = (0, import_react18.useState)("");
  return {
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  };
}
function useFocusContextInstance(items, lastTypedOrSubmittedValue, setValue, screenReaderKey, setScreenReaderKey, alwaysSelectOption) {
  const [focusedIndex, setFocusedIndex] = (0, import_react18.useState)(-1);
  const [focusedValue, setFocusedValue] = (0, import_react18.useState)(null);
  const [focusedItemData, setFocusedItemData] = (0, import_react18.useState)(void 0);
  (0, import_react18.useEffect)(() => {
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
      updatedValue = value ?? lastTypedOrSubmittedValue;
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
      updatedValue = value ?? items[loopedAroundIndex].value;
      setFocusedIndex(loopedAroundIndex);
      setFocusedItemData(items[loopedAroundIndex].itemData);
    } else {
      updatedValue = value ?? items[updatedFocusedIndex].value;
      setFocusedIndex(updatedFocusedIndex);
      setFocusedItemData(items[updatedFocusedIndex].itemData);
    }
    setFocusedValue(updatedValue);
    setValue(alwaysSelectOption ? value ?? lastTypedOrSubmittedValue : updatedValue);
  }
  return {
    focusedIndex,
    focusedValue,
    focusedItemData,
    updateFocusedItem
  };
}
function useDropdownContextInstance(prevValue, value, index, focusedItemData, screenReaderUUID, setHasTyped, onToggle, onSelect) {
  const [isActive, _toggleDropdown] = (0, import_react18.useState)(false);
  const toggleDropdown = (willBeOpen) => {
    if (!willBeOpen) {
      setHasTyped(false);
    }
    _toggleDropdown(willBeOpen);
    onToggle?.(willBeOpen, prevValue, value, index, focusedItemData);
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
    if (!((0, import_react18.isValidElement)(child) && child.type === DropdownItem)) {
      return child;
    }
    const props = child.props;
    items.push({
      value: props.value,
      itemData: props.itemData
    });
    return (0, import_react18.createElement)(DropdownItemWithIndex, { ...props, index: items.length - 1 });
  });
  return [childrenWithDropdownItemsTransformed, items];
}

// src/components/Dropdown/DropdownInput.tsx
var import_react19 = __toESM(require("react"));
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
  const inputRef = (0, import_react19.useRef)(null);
  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { value = "", setLastTypedOrSubmittedValue } = useInputContext();
  const {
    focusedIndex = -1,
    focusedItemData,
    focusedValue,
    updateFocusedItem
  } = useFocusContext();
  const [isTyping, setIsTyping] = (0, import_react19.useState)(true);
  const handleChange = (0, import_react19.useCallback)((e) => {
    setIsTyping(true);
    toggleDropdown(true);
    onChange?.(e.target.value);
    updateFocusedItem(-1, e.target.value);
    setLastTypedOrSubmittedValue(e.target.value);
  }, [onChange, setLastTypedOrSubmittedValue, toggleDropdown, updateFocusedItem]);
  const handleKeyDown = (0, import_react19.useCallback)((e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab") {
      setIsTyping(false);
    }
    if (e.key === "Enter" && (!submitCriteria || submitCriteria(focusedIndex))) {
      updateFocusedItem(focusedIndex);
      toggleDropdown(false);
      inputRef.current?.blur();
      onSubmit?.(value, focusedIndex, focusedItemData);
      if (focusedIndex >= 0) {
        onSelect?.(value, focusedIndex, focusedItemData);
      }
      updateFocusedItem(-1, focusedValue ?? void 0);
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
  const handleFocus = (0, import_react19.useCallback)(() => {
    toggleDropdown(true);
    updateFocusedItem(-1);
    onFocus?.(value);
  }, [onFocus, toggleDropdown, updateFocusedItem, value]);
  return /* @__PURE__ */ import_react19.default.createElement(
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
var import_react20 = __toESM(require("react"));
function DropdownMenu({ children }) {
  const { isActive } = useDropdownContext();
  if (!isActive) {
    return null;
  }
  return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null, children);
}

// src/hooks/useComposedCssClasses.tsx
var import_react21 = require("react");
var import_tailwind_merge = require("tailwind-merge");
var twMerge = (0, import_tailwind_merge.extendTailwindMerge)({
  classGroups: {
    form: ["input", "checkbox", "textarea", "select", "multiselect", "radio"].map((v) => "form-" + v)
  }
});
function useComposedCssClasses(builtInClasses, customClasses, disableBuiltInClasses = false) {
  return (0, import_react21.useMemo)(() => {
    if (disableBuiltInClasses && customClasses) {
      return customClasses;
    }
    const mergedCssClasses = { ...builtInClasses };
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
  }, [builtInClasses, customClasses, disableBuiltInClasses]);
}

// src/components/SearchButton.tsx
var import_react_i18next2 = require("react-i18next");
var import_react22 = __toESM(require("react"));
function SearchButton({ handleClick, className }) {
  const { t } = (0, import_react_i18next2.useTranslation)();
  return /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      className,
      onClick: handleClick,
      "aria-label": t("submitSearch")
    },
    /* @__PURE__ */ import_react22.default.createElement(MagnifyingGlassIcon, null)
  );
}

// src/components/utils/renderHighlightedValue.tsx
var import_react23 = __toESM(require("react"));
var defaultCssClasses = {
  highlighted: "font-normal",
  nonHighlighted: "font-semibold"
};
function renderHighlightedValue(highlightedValueOrString, customCssClasses) {
  const { value = "", matchedSubstrings } = typeof highlightedValueOrString === "string" ? { value: highlightedValueOrString, matchedSubstrings: [] } : highlightedValueOrString;
  const cssClasses = { ...defaultCssClasses, ...customCssClasses };
  if (!matchedSubstrings || matchedSubstrings.length === 0) {
    return /* @__PURE__ */ import_react23.default.createElement("span", null, value);
  }
  const substrings = [...matchedSubstrings];
  substrings.sort((a, b) => a.offset - b.offset);
  const highlightedJSX = [];
  let curr = 0;
  for (const { offset, length } of substrings) {
    if (offset > curr) {
      highlightedJSX.push(
        /* @__PURE__ */ import_react23.default.createElement("span", { key: curr, className: cssClasses.nonHighlighted }, value.substring(curr, offset))
      );
    }
    highlightedJSX.push(
      /* @__PURE__ */ import_react23.default.createElement("span", { key: offset, className: cssClasses.highlighted }, value.substring(offset, offset + length))
    );
    curr = offset + length;
  }
  if (curr < value.length) {
    highlightedJSX.push(
      /* @__PURE__ */ import_react23.default.createElement("span", { key: curr, className: cssClasses.nonHighlighted }, value.substring(curr))
    );
  }
  return /* @__PURE__ */ import_react23.default.createElement(import_react23.default.Fragment, null, highlightedJSX);
}

// src/components/utils/renderAutocompleteResult.tsx
var import_react24 = __toESM(require("react"));
var builtInCssClasses = {
  option: "whitespace-no-wrap max-w-full px-3 text-neutral-dark truncate",
  icon: "w-6 h-full flex-shrink-0 text-gray-400"
};
function renderAutocompleteResult(result, cssClasses = {}, Icon, ariaLabel) {
  return /* @__PURE__ */ import_react24.default.createElement(import_react24.default.Fragment, null, Icon && /* @__PURE__ */ import_react24.default.createElement("div", { className: cssClasses.icon }, /* @__PURE__ */ import_react24.default.createElement(Icon, null)), /* @__PURE__ */ import_react24.default.createElement("div", { "aria-label": ariaLabel || "", className: cssClasses.option }, renderHighlightedValue(result, cssClasses)));
}

// src/hooks/useAnalytics.ts
var import_react25 = require("react");
var AnalyticsContext = (0, import_react25.createContext)(null);
function useAnalytics() {
  return (0, import_react25.useContext)(AnalyticsContext);
}

// src/hooks/useSearchBarAnalytics.ts
var import_search_headless_react4 = require("@yext/search-headless-react");
function useSearchBarAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = (0, import_search_headless_react4.useSearchState)((state) => state.vertical.verticalKey);
  const queryId = (0, import_search_headless_react4.useSearchState)((state) => state.query.queryId);
  const reportAutocompleteEvent = (suggestedSearchText) => {
    analytics?.report({
      type: "AUTO_COMPLETE_SELECTION",
      ...queryId && { queryId },
      suggestedSearchText
    });
  };
  const reportSearchClearEvent = () => {
    if (!queryId) {
      console.error("Unable to report a search clear event. Missing field: queryId.");
      return;
    }
    analytics?.report({
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
var import_search_headless_react6 = require("@yext/search-headless-react");
var import_isEqual = __toESM(require("lodash/isEqual.js"));

// src/models/NumberRangeFilter.ts
var import_search_headless_react5 = require("@yext/search-headless-react");
function isNumberRangeFilter(unknownFilter = {}) {
  const filter = unknownFilter;
  return filter.matcher === import_search_headless_react5.Matcher.Between && isNumberRangeValue(filter.value);
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
  return (0, import_isEqual.default)(thisFilter.value, otherFilter.value);
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
    const { displayName: _2, ...storedFilter } = selectableFilter;
    return isDuplicateFieldValueFilter(storedFilter, filter);
  });
}
function parseNumberRangeInput(minRangeInput, maxRangeInput) {
  const minRange = parseNumber(minRangeInput);
  const maxRange = parseNumber(maxRangeInput);
  return {
    ...minRange !== void 0 && {
      start: {
        matcher: import_search_headless_react6.Matcher.GreaterThanOrEqualTo,
        value: minRange
      }
    },
    ...maxRange !== void 0 && {
      end: {
        matcher: import_search_headless_react6.Matcher.LessThanOrEqualTo,
        value: maxRange
      }
    }
  };
}
function parseNumber(num) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    return void 0;
  }
  return parsedNum;
}
function clearStaticRangeFilters(searchActions, fieldIds) {
  const selectedStaticRangeFilters = searchActions.state?.filters?.static?.filter(
    (filter) => isNumberRangeFilter(filter) && filter.selected === true && (!fieldIds || fieldIds.has(filter.fieldId))
  );
  selectedStaticRangeFilters?.forEach((filter) => {
    searchActions.setFilterOption({
      ...filter,
      selected: false
    });
  });
}
function getSelectedNumericalFacetFields(searchActions) {
  const selectedNumericalFacets = searchActions.state.filters.facets?.filter(
    (f) => isNumericalFacet(f) && f.options.some((o) => o.selected)
  ) ?? [];
  return new Set(selectedNumericalFacets.map((f) => f.fieldId));
}
function getSelectableFieldValueFilters(staticFilters) {
  return staticFilters.map((s) => {
    const { filter: { kind, ...filterFields }, ...displayFields } = s;
    if (kind === "fieldValue") {
      return {
        ...displayFields,
        ...filterFields
      };
    }
    return void 0;
  }).filter((s) => !!s);
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

// src/components/SearchBar.tsx
var builtInCssClasses2 = {
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
  entityPreviewsDivider: "h-px bg-gray-200 mt-1 mb-4 mx-3.5",
  ...builtInCssClasses
};
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
  const { t } = (0, import_react_i18next3.useTranslation)();
  const {
    entityPreviewSearcher,
    renderEntityPreviews,
    includedVerticals,
    universalLimit,
    entityPreviewsDebouncingTime = 500
  } = visualAutocompleteConfig ?? {};
  const searchActions = (0, import_search_headless_react7.useSearchActions)();
  const searchUtilities = (0, import_search_headless_react7.useSearchUtilities)();
  const reportAnalyticsEvent = useSearchBarAnalytics();
  const query = (0, import_search_headless_react7.useSearchState)((state) => state.query.input) ?? "";
  const cssClasses = useComposedCssClasses(builtInCssClasses2, customCssClasses);
  const isVertical = (0, import_search_headless_react7.useSearchState)((state) => state.meta.searchType) === import_search_headless_react7.SearchTypeEnum.Vertical;
  const verticalKey = (0, import_search_headless_react7.useSearchState)((state) => state.vertical.verticalKey);
  const debouncedExecuteAutocompleteSearch = useDebouncedFunction(() => executeAutocomplete(searchActions), 200);
  const [autocompleteResponse, executeAutocomplete2, clearAutocompleteData] = useSynchronizedRequest(
    async () => {
      return debouncedExecuteAutocompleteSearch ? debouncedExecuteAutocompleteSearch() : void 0;
    }
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
  const filteredRecentSearches = recentSearches?.filter(
    (search) => searchUtilities.isCloseMatch(search.query, query)
  );
  (0, import_react26.useEffect)(() => {
    if (hideRecentSearches) {
      clearRecentSearches();
    }
  }, [clearRecentSearches, hideRecentSearches]);
  const clearAutocomplete = (0, import_react26.useCallback)(() => {
    clearAutocompleteData();
    autocompletePromiseRef.current = void 0;
  }, [autocompletePromiseRef, clearAutocompleteData]);
  const executeQuery = (0, import_react26.useCallback)(() => {
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
  const handleSubmit = (0, import_react26.useCallback)((value, index, itemData) => {
    value !== void 0 && searchActions.setQuery(value);
    searchActions.setOffset(0);
    searchActions.setFacets([]);
    clearStaticRangeFilters(searchActions);
    if (itemData && isVerticalLink(itemData.verticalLink) && onSelectVerticalLink) {
      onSelectVerticalLink({ verticalLink: itemData.verticalLink, querySource: import_search_headless_react7.QuerySource.Autocomplete });
    } else {
      executeQuery();
    }
    if (typeof index === "number" && index >= 0 && !itemData?.isEntityPreview) {
      reportAnalyticsEvent("AUTO_COMPLETE_SELECTION", value);
    }
  }, [searchActions, executeQuery, onSelectVerticalLink, reportAnalyticsEvent]);
  const [
    entityPreviewsState,
    executeEntityPreviewsQuery
  ] = useEntityPreviews(entityPreviewSearcher, entityPreviewsDebouncingTime);
  const { verticalKeyToResults, isLoading: entityPreviewsLoading } = entityPreviewsState;
  const entityPreviews = renderEntityPreviews?.(
    entityPreviewsLoading,
    verticalKeyToResults,
    { onClick: handleSubmit, ariaLabel: getAriaLabel }
  );
  const updateEntityPreviews = (0, import_react26.useCallback)((query2) => {
    if (!renderEntityPreviews || !includedVerticals) {
      return;
    }
    executeEntityPreviewsQuery(query2, universalLimit ?? {}, includedVerticals);
  }, [executeEntityPreviewsQuery, renderEntityPreviews, includedVerticals, universalLimit]);
  const handleInputFocus = (0, import_react26.useCallback)((value = "") => {
    searchActions.setQuery(value);
    updateEntityPreviews(value);
    autocompletePromiseRef.current = executeAutocomplete2();
  }, [searchActions, autocompletePromiseRef, executeAutocomplete2, updateEntityPreviews]);
  const handleInputChange = (0, import_react26.useCallback)((value = "") => {
    searchActions.setQuery(value);
    updateEntityPreviews(value);
    autocompletePromiseRef.current = executeAutocomplete2();
  }, [searchActions, autocompletePromiseRef, executeAutocomplete2, updateEntityPreviews]);
  const handleClickClearButton = (0, import_react26.useCallback)(() => {
    updateEntityPreviews("");
    searchActions.setQuery("");
    reportAnalyticsEvent("SEARCH_CLEAR_BUTTON");
  }, [handleSubmit, reportAnalyticsEvent, updateEntityPreviews]);
  function renderInput() {
    return /* @__PURE__ */ import_react26.default.createElement(
      DropdownInput,
      {
        className: cssClasses.inputElement,
        placeholder,
        onSubmit: handleSubmit,
        onFocus: handleInputFocus,
        onChange: handleInputChange,
        ariaLabel: t("conductASearch")
      }
    );
  }
  function renderRecentSearches() {
    const recentSearchesCssClasses = {
      icon: cssClasses.recentSearchesIcon,
      option: cssClasses.recentSearchesOption,
      nonHighlighted: cssClasses.recentSearchesNonHighlighted
    };
    return filteredRecentSearches?.map((result, i) => /* @__PURE__ */ import_react26.default.createElement(
      DropdownItem,
      {
        className: "flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100",
        focusedClassName: twMerge("flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
        key: i,
        value: result.query,
        onClick: handleSubmit
      },
      renderAutocompleteResult(
        { value: result.query, inputIntents: [] },
        recentSearchesCssClasses,
        HistoryIcon,
        t("recentSearch", {
          query: result.query
        })
      )
    ));
  }
  const itemDataMatrix = (0, import_react26.useMemo)(() => {
    return autocompleteResponse?.results.map((result) => {
      return result.verticalKeys?.map((verticalKey2) => ({
        verticalLink: { verticalKey: verticalKey2, query: result.value }
      })) ?? [];
    }) ?? [];
  }, [autocompleteResponse?.results]);
  function renderQuerySuggestions() {
    return autocompleteResponse?.results.map((result, i) => /* @__PURE__ */ import_react26.default.createElement(import_react26.Fragment, { key: i }, /* @__PURE__ */ import_react26.default.createElement(
      DropdownItem,
      {
        className: "flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100",
        focusedClassName: twMerge("flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
        value: result.value,
        onClick: handleSubmit
      },
      renderAutocompleteResult(
        result,
        cssClasses,
        MagnifyingGlassIcon,
        t("autocompleteSuggestion", { suggestion: result.value })
      )
    ), showVerticalLinks && !isVertical && result.verticalKeys?.map((verticalKey2, j) => /* @__PURE__ */ import_react26.default.createElement(
      DropdownItem,
      {
        key: j,
        className: "flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100",
        focusedClassName: twMerge("flex items-stretch py-1.5 px-3.5 cursor-pointer hover:bg-gray-100", cssClasses.focusedOption),
        value: result.value,
        itemData: itemDataMatrix[i][j],
        onClick: handleSubmit
      },
      renderAutocompleteResult(
        {
          value: `in ${verticalKeyToLabel ? verticalKeyToLabel(verticalKey2) : verticalKey2}`,
          inputIntents: []
        },
        { ...cssClasses, option: cssClasses.verticalLink }
      )
    ))));
  }
  function renderClearButton() {
    return /* @__PURE__ */ import_react26.default.createElement(import_react26.default.Fragment, null, /* @__PURE__ */ import_react26.default.createElement(
      "button",
      {
        "aria-label": t("clearTheSearchBar"),
        className: cssClasses.clearButton,
        onClick: handleClickClearButton
      },
      /* @__PURE__ */ import_react26.default.createElement(CloseIcon, null)
    ), /* @__PURE__ */ import_react26.default.createElement(VerticalDividerIcon, { className: cssClasses.verticalDivider }));
  }
  const entityPreviewsCount = calculateEntityPreviewsCount(entityPreviews);
  const showEntityPreviewsDivider = entityPreviews && !!(autocompleteResponse?.results.length || filteredRecentSearches?.length);
  const hasItems = !!(autocompleteResponse?.results.length || filteredRecentSearches?.length || entityPreviews);
  const screenReaderText = getScreenReaderText(
    autocompleteResponse?.results.length,
    filteredRecentSearches?.length,
    entityPreviewsCount
  );
  const activeClassName = (0, import_classnames.default)("relative z-10 bg-white border rounded-3xl border-gray-200 w-full overflow-hidden", {
    ["shadow-lg"]: hasItems
  });
  const handleToggleDropdown = (0, import_react26.useCallback)((isActive) => {
    if (!isActive) {
      clearAutocomplete();
    }
  }, [clearAutocomplete]);
  return /* @__PURE__ */ import_react26.default.createElement("div", { className: cssClasses.searchBarContainer }, /* @__PURE__ */ import_react26.default.createElement(
    Dropdown,
    {
      className: "relative bg-white border rounded-3xl border-gray-200 w-full overflow-hidden",
      activeClassName,
      screenReaderText,
      parentQuery: query,
      onToggle: handleToggleDropdown
    },
    /* @__PURE__ */ import_react26.default.createElement("div", { className: "inline-flex items-center justify-between w-full" }, renderInput(), query && renderClearButton(), /* @__PURE__ */ import_react26.default.createElement(
      DropdownSearchButton,
      {
        handleSubmit,
        cssClasses
      }
    )),
    hasItems && /* @__PURE__ */ import_react26.default.createElement(StyledDropdownMenu, { cssClasses }, renderRecentSearches(), renderQuerySuggestions(), showEntityPreviewsDivider && /* @__PURE__ */ import_react26.default.createElement("div", { className: cssClasses.entityPreviewsDivider }), entityPreviews)
  ));
}
function StyledDropdownMenu({ cssClasses, children }) {
  return /* @__PURE__ */ import_react26.default.createElement(DropdownMenu, null, /* @__PURE__ */ import_react26.default.createElement("div", { className: cssClasses.inputDivider }), /* @__PURE__ */ import_react26.default.createElement("div", { className: "bg-white py-4" }, children));
}
function getScreenReaderText(autocompleteOptions = 0, recentSearchesOptions = 0, entityPreviewsCount = 0) {
  const { t } = (0, import_react_i18next3.useTranslation)();
  let texts = [];
  recentSearchesOptions > 0 && texts.push(t("recentSearchesFound", {
    count: recentSearchesOptions
  }));
  entityPreviewsCount > 0 && texts.push(t("resultPreviewsFound", {
    count: entityPreviewsCount
  }));
  autocompleteOptions > 0 && texts.push(t("autocompleteSuggestionsFound", {
    count: autocompleteOptions
  }));
  const text = texts.join(" ");
  if (text === "") {
    return t("noAutocompleteSuggestionsFound");
  }
  return text.trim();
}
function DropdownSearchButton({ handleSubmit, cssClasses }) {
  const { toggleDropdown } = useDropdownContext();
  const handleClick = (0, import_react26.useCallback)(() => {
    handleSubmit();
    toggleDropdown(false);
  }, [handleSubmit, toggleDropdown]);
  return /* @__PURE__ */ import_react26.default.createElement("div", { className: cssClasses.searchButtonContainer }, /* @__PURE__ */ import_react26.default.createElement(
    SearchButton,
    {
      className: cssClasses.searchButton,
      handleClick
    }
  ));
}
function getAriaLabel(value) {
  const { t } = (0, import_react_i18next3.useTranslation)();
  return t("resultPreview", { value });
}
function calculateEntityPreviewsCount(children) {
  let count = 0;
  recursivelyMapChildren(children, (c) => {
    if ((0, import_react26.isValidElement)(c) && c.type === DropdownItem) {
      count++;
    }
    return c;
  });
  return count;
}

// src/components/SpellCheck.tsx
var import_react_i18next5 = require("react-i18next");
var import_search_headless_react9 = require("@yext/search-headless-react");
var import_classnames2 = __toESM(require("classnames"));
var import_react30 = __toESM(require("react"));

// src/hooks/useCardAnalytics.ts
var import_search_headless_react8 = require("@yext/search-headless-react");
var import_react27 = require("react");
function isDirectAnswer(data) {
  return data?.type === import_search_headless_react8.DirectAnswerType.FeaturedSnippet || data?.type === import_search_headless_react8.DirectAnswerType.FieldValue;
}
function isGenerativeDirectAnswer(data) {
  return !!data?.destinationUrl;
}
function useCardAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = (0, import_search_headless_react8.useSearchState)((state) => state.vertical?.verticalKey);
  const queryId = (0, import_search_headless_react8.useSearchState)((state) => state.query.queryId);
  const reportCtaEvent = (0, import_react27.useCallback)((result, eventType) => {
    let url, entityId, fieldName;
    let directAnswer = false;
    let generativeDirectAnswer = false;
    if (isDirectAnswer(result)) {
      url = result.relatedResult.link;
      entityId = result.relatedResult.id;
      fieldName = result.type === import_search_headless_react8.DirectAnswerType.FeaturedSnippet ? void 0 : result.fieldName;
      directAnswer = true;
    } else if (isGenerativeDirectAnswer(result)) {
      url = result.destinationUrl;
      entityId = result.searchResult?.id;
      fieldName = "gda-snippet";
      directAnswer = true;
      generativeDirectAnswer = true;
    } else {
      url = result.link;
      entityId = result.id;
    }
    if (!queryId) {
      console.error("Unable to report a CTA event. Missing field: queryId.");
      return;
    }
    analytics?.report({
      type: eventType,
      entityId,
      searcher: verticalKey ? "VERTICAL" : "UNIVERSAL",
      queryId,
      verticalKey: verticalKey || "",
      url,
      fieldName,
      directAnswer,
      generativeDirectAnswer
    });
  }, [analytics, queryId, verticalKey]);
  const reportFeedbackEvent = (0, import_react27.useCallback)((result, feedbackType) => {
    if (!queryId) {
      console.error("Unable to report a result feedback event. Missing field: queryId.");
      return;
    }
    let directAnswer = false;
    let entityId;
    if (isDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.relatedResult.id;
    } else if (isGenerativeDirectAnswer(result)) {
      directAnswer = true;
      entityId = result.searchResult?.id;
    } else {
      entityId = result.id;
    }
    analytics?.report({
      type: feedbackType,
      entityId,
      searcher: verticalKey ? "VERTICAL" : "UNIVERSAL",
      queryId,
      verticalKey: verticalKey || "",
      directAnswer
    });
  }, [analytics, queryId, verticalKey]);
  const reportAnalyticsEvent = (0, import_react27.useCallback)((cardResult, analyticsEventType) => {
    if (!analytics) {
      return;
    }
    if (analyticsEventType === "TITLE_CLICK" || analyticsEventType === "CTA_CLICK" || analyticsEventType === "CITATION_CLICK" || analyticsEventType === "DRIVING_DIRECTIONS" || analyticsEventType === "VIEW_WEBSITE" || analyticsEventType === "TAP_TO_CALL") {
      reportCtaEvent(cardResult, analyticsEventType);
    }
    if (analyticsEventType === "THUMBS_DOWN" || analyticsEventType === "THUMBS_UP") {
      reportFeedbackEvent(cardResult, analyticsEventType);
    }
  }, [analytics, reportCtaEvent, reportFeedbackEvent]);
  return reportAnalyticsEvent;
}

// src/hooks/useCardAnalyticsCallback.tsx
var import_react28 = require("react");
function useCardAnalyticsCallback(result, analyticsType) {
  const reportAnalyticsEvent = useCardAnalytics();
  return (0, import_react28.useCallback)(() => {
    reportAnalyticsEvent(result, analyticsType);
  }, [analyticsType, reportAnalyticsEvent, result]);
}

// src/hooks/useCardFeedbackCallback.tsx
var import_react29 = require("react");
function useCardFeedbackCallback(result) {
  const reportAnalyticsEvent = useCardAnalytics();
  return (0, import_react29.useCallback)((analyticsType) => {
    reportAnalyticsEvent(result, analyticsType);
  }, [reportAnalyticsEvent, result]);
}

// src/utils/i18n.ts
var import_i18next = __toESM(require("i18next"));
var import_react_i18next4 = require("react-i18next");

// require("../../locales/**/*/search-ui-react.json") in src/utils/i18n.ts
var globRequire_locales_search_ui_react_json = __glob({
  "../../locales/ar/search-ui-react.json": () => require_search_ui_react(),
  "../../locales/cs/search-ui-react.json": () => require_search_ui_react2(),
  "../../locales/da/search-ui-react.json": () => require_search_ui_react3(),
  "../../locales/de/search-ui-react.json": () => require_search_ui_react4(),
  "../../locales/el/search-ui-react.json": () => require_search_ui_react5(),
  "../../locales/en-GB/search-ui-react.json": () => require_search_ui_react6(),
  "../../locales/en/search-ui-react.json": () => require_search_ui_react7(),
  "../../locales/es/search-ui-react.json": () => require_search_ui_react8(),
  "../../locales/et/search-ui-react.json": () => require_search_ui_react9(),
  "../../locales/fi/search-ui-react.json": () => require_search_ui_react10(),
  "../../locales/fr/search-ui-react.json": () => require_search_ui_react11(),
  "../../locales/hi/search-ui-react.json": () => require_search_ui_react12(),
  "../../locales/hr/search-ui-react.json": () => require_search_ui_react13(),
  "../../locales/hu/search-ui-react.json": () => require_search_ui_react14(),
  "../../locales/it/search-ui-react.json": () => require_search_ui_react15(),
  "../../locales/ja/search-ui-react.json": () => require_search_ui_react16(),
  "../../locales/ko/search-ui-react.json": () => require_search_ui_react17(),
  "../../locales/lt/search-ui-react.json": () => require_search_ui_react18(),
  "../../locales/lv/search-ui-react.json": () => require_search_ui_react19(),
  "../../locales/nb/search-ui-react.json": () => require_search_ui_react20(),
  "../../locales/nl/search-ui-react.json": () => require_search_ui_react21(),
  "../../locales/pl/search-ui-react.json": () => require_search_ui_react22(),
  "../../locales/pt/search-ui-react.json": () => require_search_ui_react23(),
  "../../locales/ro/search-ui-react.json": () => require_search_ui_react24(),
  "../../locales/ru/search-ui-react.json": () => require_search_ui_react25(),
  "../../locales/sk/search-ui-react.json": () => require_search_ui_react26(),
  "../../locales/sv/search-ui-react.json": () => require_search_ui_react27(),
  "../../locales/tr/search-ui-react.json": () => require_search_ui_react28(),
  "../../locales/vi/search-ui-react.json": () => require_search_ui_react29(),
  "../../locales/zh-CN/search-ui-react.json": () => require_search_ui_react30(),
  "../../locales/zh-TW/search-ui-react.json": () => require_search_ui_react31()
});

// src/utils/i18n.ts
var { supportedLocales } = require_supportedLocales();
var NAMESPACE = "search-ui-react";
var resources = {};
supportedLocales.forEach((locale) => {
  resources[locale] = {
    [NAMESPACE]: globRequire_locales_search_ui_react_json(`../../locales/${locale}/search-ui-react.json`)
  };
});
var i18nInstance = import_i18next.default.createInstance();
i18nInstance.use(import_react_i18next4.initReactI18next).init({
  fallbackLng: "en",
  ns: [NAMESPACE],
  defaultNS: NAMESPACE,
  interpolation: { escapeValue: false },
  resources
});

// src/components/SpellCheck.tsx
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
  const verticalKey = (0, import_search_headless_react9.useSearchState)((state) => state.vertical.verticalKey) ?? "";
  const cssClasses = useComposedCssClasses(builtInCssClasses3, customCssClasses);
  const correctedQuery = (0, import_search_headless_react9.useSearchState)((state) => state.spellCheck.correctedQuery) ?? "";
  const isLoading = (0, import_search_headless_react9.useSearchState)((state) => state.searchStatus.isLoading);
  const containerClassNames = (0, import_classnames2.default)(cssClasses.spellCheckContainer, {
    [cssClasses.spellCheckLoading ?? ""]: isLoading
  });
  const searchActions = (0, import_search_headless_react9.useSearchActions)();
  const handleClickSuggestion = (0, import_react30.useCallback)(() => {
    searchActions.setQuery(correctedQuery);
    onClick ? onClick({ correctedQuery, verticalKey }) : executeSearch(searchActions);
  }, [searchActions, correctedQuery, onClick, verticalKey]);
  if (!correctedQuery) {
    return null;
  }
  return /* @__PURE__ */ import_react30.default.createElement("div", { className: containerClassNames }, /* @__PURE__ */ import_react30.default.createElement("span", { className: cssClasses.helpText }, /* @__PURE__ */ import_react30.default.createElement(
    import_react_i18next5.Trans,
    {
      i18nKey: "didYouMean",
      components: { button: /* @__PURE__ */ import_react30.default.createElement("button", { className: cssClasses.link, onClick: handleClickSuggestion }) },
      values: { correctedQuery }
    }
  )));
}

// src/components/DirectAnswer.tsx
var import_search_headless_react12 = require("@yext/search-headless-react");

// src/components/ThumbsFeedback.tsx
var import_react_i18next6 = require("react-i18next");
var import_search_headless_react10 = require("@yext/search-headless-react");
var import_react32 = __toESM(require("react"));

// src/icons/ThumbIcon.tsx
var import_react31 = __toESM(require("react"));
function ThumbIcon({ className }) {
  return /* @__PURE__ */ import_react31.default.createElement("svg", { className, viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react31.default.createElement("path", { d: "M10.6667 7.33333H14.6366C15.8756 7.33333 16.6814 8.63719 16.1273 9.74536L13.2107 15.5787C12.9283 16.1433 12.3512 16.5 11.7199 16.5H8.37184C8.23557 16.5 8.09982 16.4833 7.96762 16.4502L4.83333 15.6667M10.6667 7.33333V3.16667C10.6667 2.24619 9.92047 1.5 9 1.5H8.92044C8.50414 1.5 8.16667 1.83748 8.16667 2.25377C8.16667 2.84903 7.99047 3.43096 7.66028 3.92624L4.83333 8.16667V15.6667M10.6667 7.33333H9M4.83333 15.6667H3.16667C2.24619 15.6667 1.5 14.9205 1.5 14V9C1.5 8.07953 2.24619 7.33333 3.16667 7.33333H5.25", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}

// src/components/ThumbsFeedback.tsx
var builtInCssClasses4 = {
  thumbsFeedbackContainer: "flex justify-end mt-2 text-sm text-gray-500 font-medium",
  thumbsUpIcon: "ml-3 w-5",
  thumbsDownIcon: "w-5 ml-1 transform rotate-180"
};
function ThumbsFeedback(props) {
  const { t } = (0, import_react_i18next6.useTranslation)();
  const {
    onClick,
    feedbackText,
    feedbackTextOnSubmission
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses4, props.customCssClasses);
  const query = (0, import_search_headless_react10.useSearchState)((state) => state.query.mostRecentSearch);
  const [isFeedbackProvided, setIsFeedbackProvided] = (0, import_react32.useState)(false);
  const handleClickThumbsUp = (0, import_react32.useCallback)(() => {
    onClick("THUMBS_UP");
    setIsFeedbackProvided(true);
  }, [onClick]);
  const handleClickThumbsDown = (0, import_react32.useCallback)(() => {
    onClick("THUMBS_DOWN");
    setIsFeedbackProvided(true);
  }, [onClick]);
  useLayoutEffect(() => {
    setIsFeedbackProvided(false);
  }, [query]);
  return /* @__PURE__ */ import_react32.default.createElement("div", { className: cssClasses.thumbsFeedbackContainer }, isFeedbackProvided ? feedbackTextOnSubmission ?? t("thankYouForYourFeedback") : /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, feedbackText ?? t("feedback", "Feedback"), /* @__PURE__ */ import_react32.default.createElement(
    "button",
    {
      className: cssClasses.thumbsUpIcon,
      onClick: handleClickThumbsUp,
      "aria-label": t("thisAnsweredMyQuestion")
    },
    /* @__PURE__ */ import_react32.default.createElement(ThumbIcon, null)
  ), /* @__PURE__ */ import_react32.default.createElement(
    "button",
    {
      className: cssClasses.thumbsDownIcon,
      onClick: handleClickThumbsDown,
      "aria-label": t("thisDidNotAnswerMyQuestion")
    },
    /* @__PURE__ */ import_react32.default.createElement(ThumbIcon, null)
  )));
}

// src/components/FieldValueDirectAnswer.tsx
var import_react_i18next7 = require("react-i18next");
var import_search_headless_react11 = require("@yext/search-headless-react");
var import_react33 = __toESM(require("react"));
function FieldValueDirectAnswer2({
  result,
  viewDetailsClickHandler,
  UnknownFieldTypeDisplay,
  cssClasses = {}
}) {
  const { t } = (0, import_react_i18next7.useTranslation)();
  const title = `${result.entityName} / ${result.fieldName}`;
  const link = result.relatedResult.link ?? result.relatedResult.rawData.landingPageUrl;
  const resultContent = (0, import_react33.useMemo)(() => {
    return getResultContent(result, UnknownFieldTypeDisplay);
  }, [result, UnknownFieldTypeDisplay]);
  return /* @__PURE__ */ import_react33.default.createElement("div", { className: cssClasses.answerContainer }, title && /* @__PURE__ */ import_react33.default.createElement("div", { className: cssClasses.header }, title), /* @__PURE__ */ import_react33.default.createElement("div", { className: cssClasses.content }, /* @__PURE__ */ import_react33.default.createElement("div", { className: cssClasses.body }, resultContent), link && /* @__PURE__ */ import_react33.default.createElement("div", { className: "mt-4" }, /* @__PURE__ */ import_react33.default.createElement("a", { href: link, className: "text-primary", onClick: viewDetailsClickHandler }, t("viewDetails")))));
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
    case import_search_headless_react11.BuiltInFieldType.InstagramHandle:
      return getAnchorTagJsxElement(`https://www.instagram.com/${result.value}`, result.value);
    case import_search_headless_react11.BuiltInFieldType.TwitterHandle:
      return getAnchorTagJsxElement(`https://twitter.com/${result.value}`, `@${result.value}`);
    case import_search_headless_react11.BuiltInFieldType.FacebookURL:
    case import_search_headless_react11.BuiltInFieldType.AndroidAppURL:
    case import_search_headless_react11.BuiltInFieldType.IOSAppURL:
      return getAnchorTagJsxElement(result.value);
    case import_search_headless_react11.BuiltInFieldType.ComplexURL:
      const url = result.value.url;
      const displayUrl = result.value.preferDisplayUrl ? result.value.displayUrl : url;
      return getAnchorTagJsxElement(url, displayUrl);
    case import_search_headless_react11.BuiltInFieldType.URL:
      return Array.isArray(result.value) ? getListJsxElement(result.value, (url2) => getAnchorTagJsxElement(url2)) : getAnchorTagJsxElement(result.value);
    case import_search_headless_react11.BuiltInFieldType.Phone:
      return getAnchorTagJsxElement(`tel:${result.value}`, result.value);
    case import_search_headless_react11.BuiltInFieldType.Email:
      return getListJsxElement(result.value, (e) => getAnchorTagJsxElement(`mailto:${e}`, e));
    case import_search_headless_react11.BuiltInFieldType.Address:
      return getAddressJsxElement(result.value);
    case import_search_headless_react11.BuiltInFieldType.RichText:
      console.warn("Rendering markdown for rich text direct answer is currently not supported. Displaying the unrendered markdown string(s) as is.");
      return Array.isArray(result.value) ? getListJsxElement(result.value, (val) => getTextJsxElement(val)) : getTextJsxElement(result.value);
    case import_search_headless_react11.BuiltInFieldType.Hours:
      return /* @__PURE__ */ import_react33.default.createElement("div", null, JSON.stringify(result.value));
    case "unknown":
      return /* @__PURE__ */ import_react33.default.createElement(UnknownFieldTypeDisplay, { result });
    default:
      return Array.isArray(result.value) ? getListJsxElement(result.value, (val) => getTextJsxElement(val)) : getTextJsxElement(result.value);
  }
}
function getListJsxElement(list, getItemJsxElement) {
  return /* @__PURE__ */ import_react33.default.createElement("ul", { className: "list-disc list-inside" }, list.map((el, i) => /* @__PURE__ */ import_react33.default.createElement("li", { key: i }, getItemJsxElement(el))));
}
function getTextJsxElement(text) {
  return /* @__PURE__ */ import_react33.default.createElement("p", { className: "whitespace-pre-wrap" }, text);
}
function getAnchorTagJsxElement(href, displayText) {
  return /* @__PURE__ */ import_react33.default.createElement("a", { href, className: "text-primary" }, displayText ?? href);
}
function getAddressJsxElement(address) {
  if (address.extraDescription) {
    return /* @__PURE__ */ import_react33.default.createElement("div", null, address.extraDescription);
  }
  const formattedCity = address.city ? address.city + "," : "";
  const formattedCityRegionPostalCode = [formattedCity, address.region, address.postalCode].join(" ").trim();
  return /* @__PURE__ */ import_react33.default.createElement("div", null, address.line1 && /* @__PURE__ */ import_react33.default.createElement("p", null, address.line1), address.line2 && /* @__PURE__ */ import_react33.default.createElement("p", null, address.line2), address.line3 && /* @__PURE__ */ import_react33.default.createElement("p", null, address.line3), formattedCityRegionPostalCode && /* @__PURE__ */ import_react33.default.createElement("p", null, formattedCityRegionPostalCode), /* @__PURE__ */ import_react33.default.createElement("p", null, address.countryCode));
}

// src/components/FeaturedSnippetDirectAnswer.tsx
var import_react_i18next8 = require("react-i18next");
var import_react34 = __toESM(require("react"));
var unsupportedTextFormats = ["rich_text", "rich_text_v2", "markdown"];
function FeaturedSnippetDirectAnswer({
  result,
  readMoreClickHandler,
  cssClasses = {}
}) {
  const answer = result.fieldType === "multi_line_text" && result.value;
  if (unsupportedTextFormats.includes(result.fieldType)) {
    console.warn("Rendering " + result.fieldType + " direct answer is currently not supported. You can modify your search configuration to convert " + result.fieldType + " to HTML to be rendered on the page.");
  }
  let snippet;
  const snippetValue = (0, import_react34.useMemo)(() => {
    return { __html: result.snippet?.value };
  }, [result.snippet?.value]);
  if (result.fieldType === "html") {
    snippet = /* @__PURE__ */ import_react34.default.createElement("div", { dangerouslySetInnerHTML: snippetValue });
  } else {
    snippet = renderHighlightedValue(result.snippet, { highlighted: cssClasses.highlighted });
  }
  const link = result.relatedResult.link || result.relatedResult.rawData.landingPageUrl;
  const name = result.relatedResult.name;
  return /* @__PURE__ */ import_react34.default.createElement("div", { className: cssClasses.answerContainer }, answer && /* @__PURE__ */ import_react34.default.createElement("div", { className: cssClasses.header }, answer), /* @__PURE__ */ import_react34.default.createElement("div", { className: cssClasses.content }, /* @__PURE__ */ import_react34.default.createElement("div", { className: cssClasses.body }, snippet), link && name && /* @__PURE__ */ import_react34.default.createElement("div", { className: "pt-4 text-neutral" }, /* @__PURE__ */ import_react34.default.createElement(
    import_react_i18next8.Trans,
    {
      i18nKey: "readMoreAbout",
      components: { a: /* @__PURE__ */ import_react34.default.createElement("a", { className: "text-primary", href: link, onClick: readMoreClickHandler }) },
      values: { name }
    }
  ))));
}

// src/components/DirectAnswer.tsx
var import_react35 = __toESM(require("react"));
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
  const directAnswerResult = (0, import_search_headless_react12.useSearchState)((state) => state.directAnswer.result);
  const isLoading = (0, import_search_headless_react12.useSearchState)((state) => state.searchStatus.isLoading || false);
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
  return /* @__PURE__ */ import_react35.default.createElement("div", { className: containerCssClasses }, directAnswerResult.type === import_search_headless_react12.DirectAnswerType.FieldValue ? /* @__PURE__ */ import_react35.default.createElement(
    FieldValueDirectAnswer2,
    {
      result: directAnswerResult,
      cssClasses,
      viewDetailsClickHandler: handleClickViewDetails,
      UnknownFieldTypeDisplay
    }
  ) : /* @__PURE__ */ import_react35.default.createElement(
    FeaturedSnippetDirectAnswer,
    {
      result: directAnswerResult,
      readMoreClickHandler: handleClickViewDetails,
      cssClasses
    }
  ), /* @__PURE__ */ import_react35.default.createElement(
    ThumbsFeedback,
    {
      onClick: handleClickFeedbackButton,
      customCssClasses: composedCssClasses
    }
  ));
}
function getCssClassesForAnswerType(cssClasses, type) {
  const isSnippet = type === import_search_headless_react12.DirectAnswerType.FeaturedSnippet;
  return {
    ...cssClasses,
    header: isSnippet ? cssClasses.answer : cssClasses.description,
    body: isSnippet ? cssClasses.description : cssClasses.answer
  };
}

// src/components/FilterSearch.tsx
var import_react_i18next11 = require("react-i18next");
var import_search_headless_react14 = require("@yext/search-headless-react");
var import_react41 = __toESM(require("react"));

// src/components/Geolocation.tsx
var import_react_i18next10 = require("react-i18next");

// src/icons/LoadingIndicator.tsx
var import_react36 = __toESM(require("react"));
function LoadingIndicator() {
  return /* @__PURE__ */ import_react36.default.createElement("div", { className: "animate-[rotate_1.4s_linear_infinite]" }, /* @__PURE__ */ import_react36.default.createElement("svg", { className: "[stroke-dasharray:208] origin-[50%_50%] animate-[dash_1.4s_ease-in-out_infinite]", viewBox: "0 0 72 72" }, /* @__PURE__ */ import_react36.default.createElement("circle", { className: "", cx: "36", cy: "36", r: "33", stroke: "black", strokeWidth: "3", fill: "none" })));
}

// src/icons/YextIcon.tsx
var import_react37 = __toESM(require("react"));
function YextIcon() {
  return /* @__PURE__ */ import_react37.default.createElement("svg", { viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react37.default.createElement("path", { d: "M25.517 28.142v.095h-.204v.905h-.066v-.905h-.197v-.095h.467zm.667 0h.066v1h-.066v-.825l-.24.595h-.013l-.24-.595v.825h-.066v-1h.066l.247.61.246-.61zM15 28.8c7.622 0 13.8-6.178 13.8-13.8 0-7.622-6.178-13.8-13.8-13.8C7.378 1.2 1.2 7.378 1.2 15c0 7.622 6.178 13.8 13.8 13.8zM15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0zm.45 16.65v-1.2h6.6v1.2h-2.7v5.4h-1.2v-5.4h-2.7zm-1.599-1.35l.849.849-2.601 2.601 2.601 2.601-.849.849-2.601-2.601L8.649 22.2l-.849-.849 2.601-2.601L7.8 16.149l.849-.849 2.601 2.601 2.601-2.601zM18.675 9a2.175 2.175 0 00-1.847 3.323l2.995-2.995A2.163 2.163 0 0018.675 9zm0 5.55a3.375 3.375 0 112.833-5.209l-3.789 3.788a2.175 2.175 0 003.13-1.954h1.201a3.375 3.375 0 01-3.375 3.375zm-7.425-3.734L13.78 7.8l.92.771-2.85 3.397v2.582h-1.2v-2.582L7.8 8.57l.92-.771 2.53 3.016z" }));
}

// src/hooks/useGeolocationHandler.ts
var import_react_i18next9 = require("react-i18next");
var import_search_headless_react13 = require("@yext/search-headless-react");
var import_react38 = require("react");
var GEOLOCATION_FIELD_ID = "builtin.location";
var LOCATION_FIELD_IDS = [GEOLOCATION_FIELD_ID, "builtin.region", "address.countryCode"];
var METERS_PER_MILE = 1609.344;
function useGeolocationHandler({
  geolocationOptions,
  radius = 50,
  handleUserPosition
}) {
  const { t } = (0, import_react_i18next9.useTranslation)();
  const [isFetchingUserLocation, setIsFetchingUserLocation] = (0, import_react38.useState)(false);
  const searchActions = (0, import_search_headless_react13.useSearchActions)();
  const staticFilters = (0, import_search_headless_react13.useSearchState)((s) => s.filters.static || []);
  const defaultHandleUserPosition = (0, import_react38.useCallback)((position) => {
    const { latitude, longitude, accuracy } = position.coords;
    const locationFilter = {
      displayName: t("currentLocation"),
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: GEOLOCATION_FIELD_ID,
        matcher: import_search_headless_react13.Matcher.Near,
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
  const geolocationHandler = (0, import_react38.useCallback)(async () => {
    setIsFetchingUserLocation(true);
    try {
      const position = await getUserLocation(geolocationOptions);
      (handleUserPosition ?? defaultHandleUserPosition)(position);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFetchingUserLocation(false);
    }
  }, [setIsFetchingUserLocation, geolocationOptions, handleUserPosition, defaultHandleUserPosition]);
  return [geolocationHandler, isFetchingUserLocation];
}

// src/components/Geolocation.tsx
var import_react39 = __toESM(require("react"));
var builtInCssClasses6 = {
  geolocationContainer: "text-sm text-neutral text-center justify-center items-center flex flex-row",
  button: "text-primary font-semibold hover:underline focus:underline",
  iconContainer: "w-4 ml-2"
};
function Geolocation({
  geolocationOptions,
  radius = 50,
  label,
  //TODO: replace default icon with SVG create from design team
  GeolocationIcon = YextIcon,
  handleClick,
  customCssClasses,
  useIconAsButton = false,
  disableBuiltInClasses = false
}) {
  const { t } = (0, import_react_i18next10.useTranslation)();
  const cssClasses = useComposedCssClasses(builtInCssClasses6, customCssClasses, disableBuiltInClasses);
  const [handleGeolocationClick, isFetchingUserLocation] = useGeolocationHandler({
    geolocationOptions,
    radius,
    handleUserPosition: handleClick
  });
  const iconContainer = /* @__PURE__ */ import_react39.default.createElement("div", { className: cssClasses.iconContainer }, isFetchingUserLocation ? /* @__PURE__ */ import_react39.default.createElement(LoadingIndicator, null) : /* @__PURE__ */ import_react39.default.createElement(GeolocationIcon, null));
  if (useIconAsButton) {
    return /* @__PURE__ */ import_react39.default.createElement(
      "button",
      {
        className: cssClasses.button,
        onClick: handleGeolocationClick,
        "aria-label": t("useCurrentLocation")
      },
      iconContainer
    );
  } else {
    return /* @__PURE__ */ import_react39.default.createElement("div", { className: cssClasses.geolocationContainer }, /* @__PURE__ */ import_react39.default.createElement("button", { className: cssClasses.button, onClick: handleGeolocationClick }, label ?? t("useMyLocation")), iconContainer);
  }
}

// src/icons/CurrentLocationIcon.tsx
var import_react40 = __toESM(require("react"));
function CurrentLocationIcon() {
  return /* @__PURE__ */ import_react40.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full" }, /* @__PURE__ */ import_react40.default.createElement("line", { x1: "2", x2: "5", y1: "12", y2: "12" }), /* @__PURE__ */ import_react40.default.createElement("line", { x1: "19", x2: "22", y1: "12", y2: "12" }), /* @__PURE__ */ import_react40.default.createElement("line", { x1: "12", x2: "12", y1: "2", y2: "5" }), /* @__PURE__ */ import_react40.default.createElement("line", { x1: "12", x2: "12", y1: "19", y2: "22" }), /* @__PURE__ */ import_react40.default.createElement("circle", { cx: "12", cy: "12", r: "7" }), /* @__PURE__ */ import_react40.default.createElement("circle", { cx: "12", cy: "12", r: "3" }));
}

// src/components/FilterSearch.tsx
var builtInCssClasses7 = {
  filterSearchContainer: "relative mb-2",
  label: "mb-4 text-sm font-medium text-neutral-dark",
  inputElement: "text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-primary text-neutral-dark placeholder:text-neutral",
  sectionLabel: "text-sm text-neutral-dark font-semibold py-2 px-4",
  focusedOption: "bg-gray-100",
  option: "text-sm text-neutral-dark py-1 cursor-pointer hover:bg-gray-100 px-4",
  currentLocationButton: "h-5 w-5",
  currentLocationAndInputContainer: "w-full flex items-center justify-start gap-2"
};
function FilterSearch({
  searchFields,
  label,
  placeholder,
  searchOnSelect,
  onSelect,
  onDropdownInputChange,
  afterDropdownInputFocus,
  sectioned = false,
  customCssClasses,
  disableBuiltInClasses = false,
  ariaLabel,
  showCurrentLocationButton = false,
  geolocationProps = {}
}) {
  const { t } = (0, import_react_i18next11.useTranslation)();
  const searchActions = (0, import_search_headless_react14.useSearchActions)();
  const searchParamFields = searchFields.map((searchField) => {
    return { ...searchField, fetchEntities: false };
  });
  const matchingFieldIds = (0, import_react41.useMemo)(() => {
    const fieldIds = new Set(searchFields.map((s) => s.fieldApiName));
    if (fieldIds.has("builtin.location")) {
      ["builtin.region", "address.countryCode"].forEach((s) => fieldIds.add(s));
    }
    return fieldIds;
  }, [searchFields]);
  const cssClasses = useComposedCssClasses(builtInCssClasses7, customCssClasses, disableBuiltInClasses);
  const [currentFilter, setCurrentFilter] = (0, import_react41.useState)();
  const [filterQuery, setFilterQuery] = (0, import_react41.useState)();
  const staticFilters = (0, import_search_headless_react14.useSearchState)((state) => state.filters.static);
  const matchingFilters = (0, import_react41.useMemo)(() => {
    return staticFilters?.filter(
      ({ filter, selected }) => selected && filter.kind === "fieldValue" && matchingFieldIds.has(filter.fieldId)
    ) ?? [];
  }, [staticFilters, matchingFieldIds]);
  const debouncedExecuteFilterSearch = useDebouncedFunction(
    (query) => searchActions.executeFilterSearch(query, sectioned, searchParamFields),
    200
  );
  const [
    filterSearchResponse,
    executeFilterSearch,
    clearFilterSearchResponse
  ] = useSynchronizedRequest(
    async (inputValue) => {
      setFilterQuery(inputValue);
      return debouncedExecuteFilterSearch ? debouncedExecuteFilterSearch(inputValue ?? "") : void 0;
    },
    (e) => console.error("Error occurred executing a filter search request.\n", e)
  );
  (0, import_react41.useEffect)(() => {
    if (matchingFilters.length > 1 && !onSelect) {
      console.warn("More than one selected static filter found that matches the filter search fields: [" + [...matchingFieldIds].join(", ") + "]. Please update the state to remove the extra filters. Picking one filter to display in the input.");
    }
    if (currentFilter && staticFilters?.find(
      (f) => isDuplicateStaticFilter(f.filter, currentFilter) && f.selected
    )) {
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
  const sections = (0, import_react41.useMemo)(() => {
    return filterSearchResponse?.sections.filter((section) => section.results.length > 0) ?? [];
  }, [filterSearchResponse?.sections]);
  const hasResults = sections.flatMap((s) => s.results).length > 0;
  const handleSelectDropdown = (0, import_react41.useCallback)(async (_value, _index, itemData) => {
    const newFilter = itemData?.filter;
    const newDisplayName = itemData?.displayName;
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
  const handleInputChange = (0, import_react41.useCallback)((value) => {
    onDropdownInputChange ? onDropdownInputChange({
      value,
      executeFilterSearch
    }) : executeFilterSearch(value);
  }, [
    onDropdownInputChange,
    executeFilterSearch
  ]);
  const meetsSubmitCritera = (0, import_react41.useCallback)((index) => index >= 0, []);
  const itemDataMatrix = (0, import_react41.useMemo)(() => {
    return sections.map((section) => {
      return section.results.map((result) => ({
        filter: { ...result.filter, kind: "fieldValue" },
        displayName: result.value
      }));
    });
  }, [sections]);
  function renderDropdownItems() {
    return sections.map((section, sectionIndex) => {
      return /* @__PURE__ */ import_react41.default.createElement("div", { className: "pb-2", key: sectionIndex }, section.label && /* @__PURE__ */ import_react41.default.createElement("div", { className: cssClasses.sectionLabel }, section.label), /* @__PURE__ */ import_react41.default.createElement("div", { className: cssClasses.optionsContainer }, section.results.map((result, index) => /* @__PURE__ */ import_react41.default.createElement(
        DropdownItem,
        {
          key: index,
          focusedClassName: cssClasses.focusedOption,
          value: result.value,
          itemData: itemDataMatrix[sectionIndex][index]
        },
        renderAutocompleteResult(result, cssClasses)
      ))));
    });
  }
  const handleInputFocus = (0, import_react41.useCallback)((value = "") => {
    if (value) {
      executeFilterSearch(value);
    }
    afterDropdownInputFocus?.({ value });
  }, [afterDropdownInputFocus, executeFilterSearch]);
  const dropdownInput = /* @__PURE__ */ import_react41.default.createElement(
    DropdownInput,
    {
      className: cssClasses.inputElement,
      placeholder: placeholder ?? t("searchHere"),
      onChange: handleInputChange,
      onFocus: handleInputFocus,
      submitCriteria: meetsSubmitCritera,
      ariaLabel
    }
  );
  const dropdownMenu = /* @__PURE__ */ import_react41.default.createElement(DropdownMenu, null, hasResults && /* @__PURE__ */ import_react41.default.createElement("div", { className: "absolute z-10 w-full shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 mt-1" }, renderDropdownItems()));
  return /* @__PURE__ */ import_react41.default.createElement("div", { className: cssClasses.filterSearchContainer }, label && /* @__PURE__ */ import_react41.default.createElement("h1", { className: cssClasses.label }, label), /* @__PURE__ */ import_react41.default.createElement(
    Dropdown,
    {
      screenReaderText: getScreenReaderText2(sections),
      onSelect: handleSelectDropdown,
      alwaysSelectOption: true,
      parentQuery: filterQuery
    },
    showCurrentLocationButton ? /* @__PURE__ */ import_react41.default.createElement("div", { className: cssClasses.currentLocationAndInputContainer }, /* @__PURE__ */ import_react41.default.createElement("div", { className: "relative flex-1" }, dropdownInput, dropdownMenu), /* @__PURE__ */ import_react41.default.createElement(
      Geolocation,
      {
        GeolocationIcon: CurrentLocationIcon,
        customCssClasses: {
          button: cssClasses.currentLocationButton,
          iconContainer: "w-full h-full ml-0"
        },
        useIconAsButton: true,
        ...geolocationProps
      }
    )) : /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null, dropdownInput, dropdownMenu)
  ));
}
function getScreenReaderText2(sections) {
  const { t } = (0, import_react_i18next11.useTranslation)();
  if (sections.length === 0) {
    return t("noAutocompleteOptionsFound");
  }
  const screenReaderPhrases = sections.map((section) => {
    const label = section.label ? ` ${section.label}` : "";
    const count = section.results.length;
    return t("autocompleteOptionsFound", {
      count,
      label
    });
  });
  return screenReaderPhrases.join(" ");
}

// src/components/LocationBias.tsx
var import_react_i18next12 = require("react-i18next");
var import_search_headless_react15 = require("@yext/search-headless-react");
var import_react42 = __toESM(require("react"));
var builtInCssClasses8 = {
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
  const { t } = (0, import_react_i18next12.useTranslation)();
  const searchActions = (0, import_search_headless_react15.useSearchActions)();
  const locationBias = (0, import_search_headless_react15.useSearchState)((s) => s.location.locationBias);
  const [isFetchingLocation, setIsFetchingLocation] = (0, import_react42.useState)(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses8, customCssClasses);
  const loadingIndicatorCss = twMerge(cssClasses.loadingIndicatorContainer, !isFetchingLocation && "invisible");
  if (!locationBias?.displayName) return null;
  const attributionMessage = locationBias?.method === import_search_headless_react15.LocationBiasMethod.Ip ? t("basedOnYourInternetAddress") : locationBias?.method === import_search_headless_react15.LocationBiasMethod.Device ? t("basedOnYourDevice") : "";
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
  return /* @__PURE__ */ import_react42.default.createElement("div", { className: cssClasses.locationBiasContainer }, /* @__PURE__ */ import_react42.default.createElement("span", { className: cssClasses.location }, locationBias.displayName), /* @__PURE__ */ import_react42.default.createElement("span", { className: cssClasses.source }, attributionMessage, /* @__PURE__ */ import_react42.default.createElement("span", { className: "invisible lg:visible" }, " - ")), /* @__PURE__ */ import_react42.default.createElement("div", { className: "flex flex-row items-center" }, /* @__PURE__ */ import_react42.default.createElement(
    "button",
    {
      className: cssClasses.button,
      onClick: handleGeolocationClick
    },
    t("updateYourLocation")
  ), /* @__PURE__ */ import_react42.default.createElement("div", { className: loadingIndicatorCss }, /* @__PURE__ */ import_react42.default.createElement(LoadingIndicator, null))));
}

// src/components/AppliedFilters.tsx
var import_search_headless_react22 = require("@yext/search-headless-react");
var import_classnames3 = __toESM(require("classnames"));

// src/components/AppliedFiltersDisplay.tsx
var import_react_i18next13 = require("react-i18next");

// src/hooks/useClearFiltersCallback.ts
var import_search_headless_react16 = require("@yext/search-headless-react");
var import_react43 = require("react");
function useClearFiltersCallback() {
  const searchActions = (0, import_search_headless_react16.useSearchActions)();
  const staticFilters = (0, import_search_headless_react16.useSearchState)((state) => state.filters.static);
  return (0, import_react43.useCallback)(() => {
    searchActions.setOffset(0);
    searchActions.resetFacets();
    staticFilters && searchActions.setStaticFilters(staticFilters.map((f) => {
      return {
        ...f,
        selected: false
      };
    }));
    executeSearch(searchActions);
  }, [searchActions, staticFilters]);
}

// src/components/AppliedFiltersDisplay.tsx
var import_search_headless_react17 = require("@yext/search-headless-react");
var import_react44 = __toESM(require("react"));
function AppliedFiltersDisplay(props) {
  const { t } = (0, import_react_i18next13.useTranslation)();
  const {
    nlpFilterDisplayNames = [],
    removableFilters = [],
    cssClasses = {}
  } = props;
  const handleClickClearAllButton = useClearFiltersCallback();
  const searchActions = (0, import_search_headless_react17.useSearchActions)();
  if (removableFilters.length + nlpFilterDisplayNames.length === 0) {
    return null;
  }
  const dedupedNlpFilterDisplayNames = nlpFilterDisplayNames.filter((displayName) => {
    return !removableFilters.some((f) => f.displayName === displayName);
  });
  const dedupedRemovableFilters = getDedupedRemovableFilters(removableFilters);
  function handleRemoveDedupedFilter(dedupedFilter) {
    dedupedFilter.handleRemove();
    for (const f of dedupedFilter.duplicates ?? []) {
      f.handleRemove();
    }
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }
  return /* @__PURE__ */ import_react44.default.createElement("div", { className: cssClasses.appliedFiltersContainer, "aria-label": t("appliedFiltersToCurrentSearch") }, dedupedNlpFilterDisplayNames.map((displayName, i) => renderNlpFilter(displayName, i, cssClasses)), dedupedRemovableFilters.map((f, i) => {
    return /* @__PURE__ */ import_react44.default.createElement(
      RemovableFilter,
      {
        displayName: f.displayName,
        handleRemove: () => handleRemoveDedupedFilter(f),
        index: i,
        cssClasses
      }
    );
  }), removableFilters.length > 0 && /* @__PURE__ */ import_react44.default.createElement("button", { onClick: handleClickClearAllButton, className: cssClasses.clearAllButton }, t("clearAll")));
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
function RemovableFilter({
  displayName,
  handleRemove,
  index,
  cssClasses
}) {
  const { t } = (0, import_react_i18next13.useTranslation)();
  return /* @__PURE__ */ import_react44.default.createElement("div", { className: cssClasses.removableFilter, key: `${displayName}-${index}` }, /* @__PURE__ */ import_react44.default.createElement("div", { className: cssClasses.filterLabel }, displayName), /* @__PURE__ */ import_react44.default.createElement(
    "button",
    {
      className: "w-2 h-2 text-neutral m-1.5",
      onClick: handleRemove,
      "aria-label": t("removeFilter", { displayName })
    },
    /* @__PURE__ */ import_react44.default.createElement(CloseIcon, null)
  ));
}
function renderNlpFilter(displayName, index, cssClasses) {
  return /* @__PURE__ */ import_react44.default.createElement("div", { className: cssClasses.nlpFilter, key: `${displayName}-${index}` }, /* @__PURE__ */ import_react44.default.createElement("span", { className: cssClasses.filterLabel }, displayName));
}

// src/components/Filters/HierarchicalFacetDisplay.tsx
var import_react_i18next14 = require("react-i18next");
var import_react47 = __toESM(require("react"));

// src/hooks/useHierarchicalFacetTree.ts
var import_react45 = require("react");
function useHierarchicalFacetTree(hierarchicalFacet, delimiter) {
  return (0, import_react45.useMemo)(() => {
    return parseHierarchicalFacetTree(hierarchicalFacet, delimiter);
  }, [delimiter, hierarchicalFacet]);
}
function parseHierarchicalFacetTree(hierarchicalFacet, delimiter) {
  const optionsInAscendingLength = hierarchicalFacet?.options.map((o) => {
    const displayNameTokens = o.displayName.split(delimiter).map((s) => s.trim());
    return {
      ...o,
      displayNameTokens
    };
  }).sort((a, b) => a.displayNameTokens.length - b.displayNameTokens.length) || [];
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
var import_react46 = require("react");
var FiltersContext = (0, import_react46.createContext)(null);
function useFiltersContext() {
  const filtersContextInstance = (0, import_react46.useContext)(FiltersContext);
  if (filtersContextInstance === null) {
    throw new Error("Tried to use FiltersContext when none exists.");
  }
  return filtersContextInstance;
}

// src/components/Filters/HierarchicalFacetDisplay.tsx
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
  const [isShowingMore, setIsShowingMore] = (0, import_react47.useState)(false);
  const resetShowMore = (0, import_react47.useCallback)(() => setIsShowingMore(false), []);
  const toggleShowMore = (0, import_react47.useCallback)(() => {
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
      const activeNode = selectedChildNode ?? activeParentNode;
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
    return /* @__PURE__ */ import_react47.default.createElement(
      AllCategories,
      {
        key: "_AllCategories",
        activeClassName: cssClasses.allCategoriesOption___active,
        inactiveClassName: cssClasses.allCategoriesOption___inactive,
        facet,
        resetShowMore
      }
    );
  }
  function renderAvailableOptions(nodes) {
    const nodesToRender = isShowingMore ? nodes : nodes.slice(0, showMoreLimit);
    return nodesToRender.map(
      (n) => /* @__PURE__ */ import_react47.default.createElement(
        AvailableOption,
        {
          key: n.lastDisplayNameToken,
          activeClassName: cssClasses.availableOption__active,
          inactiveClassName: cssClasses.availableOption__inactive,
          fieldId: facet.fieldId,
          currentNode: n,
          resetShowMore,
          siblingNodes: nodes.filter((siblingNode) => siblingNode !== n)
        }
      )
    );
  }
  function renderShowMoreButton() {
    return /* @__PURE__ */ import_react47.default.createElement(
      ShowMoreButton,
      {
        key: "_ShowMoreButton",
        className: cssClasses.showMoreButton,
        isShowingMore,
        toggleShowMore
      }
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
      return /* @__PURE__ */ import_react47.default.createElement(ParentCategory, { className: cssClasses.parentCategory, ...sharedProps });
    } else {
      return /* @__PURE__ */ import_react47.default.createElement(CurrentCategory, { className: cssClasses.currentCategory, ...sharedProps });
    }
  }
  return /* @__PURE__ */ import_react47.default.createElement("div", { className: cssClasses.treeContainer }, renderTree());
}
function AllCategories({ facet, inactiveClassName, activeClassName, resetShowMore }) {
  const { t } = (0, import_react_i18next14.useTranslation)();
  const { applyFilters, selectFilter } = useFiltersContext();
  const handleClickAllCategories = (0, import_react47.useCallback)(() => {
    facet.options.filter((o) => o.selected).forEach((o) => selectFilter({ ...o, fieldId: facet.fieldId, selected: false }));
    applyFilters();
    resetShowMore();
  }, [applyFilters, facet.fieldId, facet.options, resetShowMore, selectFilter]);
  const allCategoriesText = t("allCategories");
  if (facet.options.find((o) => o.selected)) {
    return /* @__PURE__ */ import_react47.default.createElement(
      "button",
      {
        className: inactiveClassName,
        onClick: handleClickAllCategories
      },
      `${allCategoriesText} + /`
    );
  }
  return /* @__PURE__ */ import_react47.default.createElement("div", { className: activeClassName }, allCategoriesText);
}
function AvailableOption(props) {
  const { fieldId, currentNode, activeClassName, inactiveClassName, resetShowMore, siblingNodes } = props;
  const { applyFilters, selectFilter } = useFiltersContext();
  const { selected, lastDisplayNameToken, facetOption } = currentNode;
  const handleClickAvailableOptions = (0, import_react47.useCallback)(() => {
    siblingNodes.filter((n) => n.selected).forEach((n) => selectFilter({
      ...n.facetOption,
      selected: false,
      fieldId
    }));
    selectFilter({
      ...facetOption,
      selected: !selected,
      fieldId
    });
    const parentFacetOption = currentNode.parentNode?.facetOption;
    parentFacetOption && selectFilter({
      ...parentFacetOption,
      selected,
      fieldId
    });
    applyFilters();
    resetShowMore();
  }, [
    applyFilters,
    currentNode.parentNode?.facetOption,
    facetOption,
    fieldId,
    resetShowMore,
    selectFilter,
    selected,
    siblingNodes
  ]);
  return /* @__PURE__ */ import_react47.default.createElement(
    "button",
    {
      className: selected ? activeClassName : inactiveClassName,
      onClick: handleClickAvailableOptions
    },
    lastDisplayNameToken
  );
}
function ParentCategory({ fieldId, selectedNode, className, resetShowMore }) {
  const { applyFilters, selectFilter } = useFiltersContext();
  const deselectChildOptions = (0, import_react47.useCallback)((node) => {
    const tree = node.childTree;
    Object.values(tree).forEach((n) => {
      selectFilter({
        ...n.facetOption,
        selected: false,
        fieldId
      });
      deselectChildOptions(n);
    });
  }, [fieldId, selectFilter]);
  const handleClickParentCategory = (0, import_react47.useCallback)(() => {
    selectFilter({
      ...selectedNode.facetOption,
      selected: true,
      fieldId
    });
    deselectChildOptions(selectedNode);
    applyFilters();
    resetShowMore();
  }, [applyFilters, deselectChildOptions, fieldId, resetShowMore, selectFilter, selectedNode]);
  return /* @__PURE__ */ import_react47.default.createElement("button", { className, onClick: handleClickParentCategory }, selectedNode.lastDisplayNameToken + " /");
}
function CurrentCategory({ fieldId, selectedNode, className, resetShowMore }) {
  const { applyFilters, selectFilter } = useFiltersContext();
  const handleClickCurrentCategory = (0, import_react47.useCallback)(() => {
    selectFilter({
      ...selectedNode.facetOption,
      selected: false,
      fieldId
    });
    const parentFacetOption = selectedNode.parentNode?.facetOption;
    parentFacetOption && selectFilter({
      ...parentFacetOption,
      selected: true,
      fieldId
    });
    applyFilters();
    resetShowMore();
  }, [
    applyFilters,
    fieldId,
    resetShowMore,
    selectFilter,
    selectedNode.facetOption,
    selectedNode.parentNode?.facetOption
  ]);
  return /* @__PURE__ */ import_react47.default.createElement(
    "button",
    {
      className,
      onClick: handleClickCurrentCategory
    },
    selectedNode.lastDisplayNameToken
  );
}
function ShowMoreButton({ className, isShowingMore, toggleShowMore }) {
  const { t } = (0, import_react_i18next14.useTranslation)();
  return /* @__PURE__ */ import_react47.default.createElement("button", { className, onClick: toggleShowMore }, isShowingMore ? t("showLess") : t("showMore"));
}

// src/hooks/useNlpFilterDisplayNames.ts
var import_search_headless_react18 = require("@yext/search-headless-react");
var import_react48 = require("react");
function useNlpFilterDisplayNames(removableFilters, hiddenFields) {
  const nlpFilters = (0, import_search_headless_react18.useSearchState)((state) => state.vertical.appliedQueryFilters);
  return (0, import_react48.useMemo)(() => {
    return nlpFilters?.filter(({ filter }) => {
      if (hiddenFields.includes(filter.fieldId)) {
        return false;
      }
      const duplicateFilter = removableFilters.find((f) => isDuplicateFieldValueFilter(f, filter));
      return !duplicateFilter;
    }).map((f) => f.displayValue) ?? [];
  }, [hiddenFields, nlpFilters, removableFilters]);
}

// src/hooks/useRemovableFilters.ts
var import_search_headless_react21 = require("@yext/search-headless-react");
var import_isEqual2 = __toESM(require("lodash/isEqual.js"));
var import_react51 = require("react");

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
var import_search_headless_react19 = require("@yext/search-headless-react");
var import_react49 = require("react");
function useStateUpdatedOnSearch(stateSelector) {
  const isLoading = (0, import_search_headless_react19.useSearchState)((state) => state.searchStatus.isLoading);
  const wasLoading = (0, import_react49.useRef)(isLoading);
  const currentState = (0, import_search_headless_react19.useSearchState)(stateSelector);
  const snapshottedState = (0, import_react49.useRef)(currentState);
  if (!isLoading && wasLoading.current) {
    snapshottedState.current = currentState;
  }
  wasLoading.current = isLoading;
  return snapshottedState.current;
}

// src/hooks/useRemovableStaticFilters.ts
var import_search_headless_react20 = require("@yext/search-headless-react");
var import_react50 = require("react");
function useRemovableStaticFilters(hiddenFields) {
  const staticFilters = useStateUpdatedOnSearch((state) => state.filters.static);
  const hasResults = !!(0, import_search_headless_react20.useSearchState)((state) => state.vertical.results);
  const searchActions = (0, import_search_headless_react20.useSearchActions)();
  return (0, import_react50.useMemo)(() => {
    if (!hasResults || !staticFilters) {
      return [];
    }
    function handleRemoveStaticFilterOption(filter) {
      searchActions.setFilterOption({
        filter: { ...filter, kind: "fieldValue" },
        selected: false
      });
    }
    return getSelectableFieldValueFilters(staticFilters).filter((f) => f.selected && !hiddenFields.includes(f.fieldId)).map((f) => ({
      displayName: f.displayName ?? "",
      handleRemove: () => handleRemoveStaticFilterOption(f),
      filter: f
    }));
  }, [hasResults, hiddenFields, searchActions, staticFilters]);
}

// src/hooks/useRemovableFilters.ts
function useRemovableFilters(hierarchicalFieldIds, hierarchicalDelimiter, hiddenFields) {
  const facets = useStateUpdatedOnSearch((state) => state.filters.facets);
  const hasResults = !!(0, import_search_headless_react21.useSearchState)((state) => state.vertical.results);
  const searchActions = (0, import_search_headless_react21.useSearchActions)();
  const removableStaticFilters = useRemovableStaticFilters(hiddenFields);
  return (0, import_react51.useMemo)(() => {
    if (!hasResults) {
      return [];
    }
    const removableFacets = facets?.filter((f) => !hiddenFields.includes(f.fieldId)).flatMap((f) => {
      if (hierarchicalFieldIds?.includes(f.fieldId)) {
        return processHierarchicalFacet(f, hierarchicalDelimiter, searchActions, facets);
      }
      return processRegularFacet(f, searchActions);
    }) ?? [];
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
  facets?.filter((f) => f.fieldId === filter.fieldId).flatMap((f) => f.options).forEach((o) => {
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
  const parentOption = facets?.filter((f) => f.fieldId === filter.fieldId).flatMap((f) => f.options).find((o) => {
    const tokens = splitDisplayName(o.displayName, delimiter);
    return (0, import_isEqual2.default)(tokens, parentTokens);
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
var import_react52 = __toESM(require("react"));
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
  const isLoading = (0, import_search_headless_react22.useSearchState)((state) => state.searchStatus.isLoading);
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
  cssClasses.appliedFiltersContainer = (0, import_classnames3.default)(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersLoading ?? ""]: isLoading
  });
  return /* @__PURE__ */ import_react52.default.createElement(
    AppliedFiltersDisplay,
    {
      removableFilters,
      nlpFilterDisplayNames,
      cssClasses
    }
  );
}

// src/components/UniversalResults.tsx
var import_search_headless_react24 = require("@yext/search-headless-react");

// src/components/VerticalResultsDisplay.tsx
var import_classnames4 = __toESM(require("classnames"));
var import_react53 = __toESM(require("react"));
var builtInCssClasses11 = {
  verticalResultsLoading: "opacity-50"
};
function VerticalResultsDisplay(props) {
  const {
    CardComponent,
    results,
    isLoading = false,
    customCssClasses,
    setResultsRef
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses11, customCssClasses);
  if (results.length === 0) {
    return null;
  }
  const resultsClassNames = (0, import_classnames4.default)(cssClasses.verticalResultsContainer, {
    [cssClasses.verticalResultsLoading ?? ""]: isLoading
  });
  return /* @__PURE__ */ import_react53.default.createElement("div", { className: resultsClassNames }, results?.map((result) => renderResult(CardComponent, result, setResultsRef)));
}
function renderResult(CardComponent, result, setResultsRef) {
  const key = result.id && result.index ? `${result.id}-${result.index}` : result.id || result.index;
  return /* @__PURE__ */ import_react53.default.createElement("div", { key: result.id, ref: result.index ? setResultsRef?.(result.index) : null }, /* @__PURE__ */ import_react53.default.createElement(CardComponent, { result, key }));
}

// src/components/cards/standard/StandardCardDisplay.tsx
var import_react54 = __toESM(require("react"));
var import_prop_types = __toESM(require("prop-types"));
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
    return link2 ? /* @__PURE__ */ import_react54.default.createElement("a", { href: link2, className: "text-lg font-medium text-primary hover:underline focus:underline", onClick: clickHandlers.handleTitleClick }, titleJsx) : /* @__PURE__ */ import_react54.default.createElement("div", { className: cssClasses.title }, titleJsx);
  }
  function renderCTAs(cta12, cta22) {
    if (cta12 || cta22) {
      return /* @__PURE__ */ import_react54.default.createElement("div", { className: "flex flex-col justify-end ml-4" }, cta12 && /* @__PURE__ */ import_react54.default.createElement("button", { className: cssClasses.cta1, onClick: clickHandlers.handleCtaClick }, cta12.label), cta22 && /* @__PURE__ */ import_react54.default.createElement("button", { className: cssClasses.cta2, onClick: clickHandlers.handleCtaClick }, cta22.label));
    }
    return null;
  }
  function renderDescription(text) {
    if (text) {
      return /* @__PURE__ */ import_react54.default.createElement("div", { className: "w-full" }, renderHighlightedValue(text, { highlighted: "font-semibold", nonHighlighted: "font-normal" }));
    }
    return null;
  }
  function renderFeedbackIcons() {
    if (showFeedbackButtons) {
      return /* @__PURE__ */ import_react54.default.createElement(
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
  return /* @__PURE__ */ import_react54.default.createElement("div", { className: cssClasses.container }, /* @__PURE__ */ import_react54.default.createElement("div", { className: cssClasses.header }, renderTitle(title, link)), (description ?? cta1 ?? cta2) && /* @__PURE__ */ import_react54.default.createElement("div", { className: cssClasses.body }, renderDescription(description), renderCTAs(cta1, cta2)), renderFeedbackIcons());
}
StandardCardDisplay.propTypes = {
  title: import_prop_types.default.oneOfType([
    import_prop_types.default.string,
    import_prop_types.default.shape({
      value: import_prop_types.default.string.isRequired,
      matchedSubstrings: import_prop_types.default.arrayOf(import_prop_types.default.shape({
        length: import_prop_types.default.number.isRequired,
        offset: import_prop_types.default.number.isRequired
      })).isRequired
    })
  ]).isRequired,
  link: import_prop_types.default.string,
  description: import_prop_types.default.string,
  cta1: import_prop_types.default.shape({
    label: import_prop_types.default.string.isRequired,
    link: import_prop_types.default.string.isRequired,
    linkType: import_prop_types.default.string.isRequired
  }),
  cta2: import_prop_types.default.shape({
    label: import_prop_types.default.string.isRequired,
    link: import_prop_types.default.string.isRequired,
    linkType: import_prop_types.default.string.isRequired
  })
};

// src/components/cards/standard/StandardCard.tsx
var import_react55 = __toESM(require("react"));
function StandardCard(props) {
  const {
    result,
    customCssClasses,
    showFeedbackButtons
  } = props;
  const data = {
    title: result.highlightedFields?.name ?? result.name ?? result.rawData.name,
    description: result.highlightedFields?.description ?? result.rawData.description,
    cta1: result.rawData.c_primaryCTA,
    cta2: result.rawData.c_secondaryCTA
  };
  const clickHandlers = {
    handleCtaClick: useCardAnalyticsCallback(result, "CTA_CLICK"),
    handleTitleClick: useCardAnalyticsCallback(result, "TITLE_CLICK"),
    handleFeedbackClick: useCardFeedbackCallback(result)
  };
  return /* @__PURE__ */ import_react55.default.createElement(
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
var import_react56 = __toESM(require("react"));
var builtInCssClasses13 = {
  section: ""
};
function StandardSection(props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses13, props.customCssClasses);
  const { results, CardComponent = StandardCard, header } = props;
  if (results.length === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react56.default.createElement("section", { className: cssClasses.section }, header, /* @__PURE__ */ import_react56.default.createElement(
    VerticalResultsDisplay,
    {
      results,
      CardComponent,
      customCssClasses: cssClasses
    }
  ));
}

// src/components/sections/SectionHeader.tsx
var import_react_i18next15 = require("react-i18next");

// src/icons/CollectionIcon.tsx
var import_react57 = __toESM(require("react"));
function CollectionIcon() {
  return /* @__PURE__ */ import_react57.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react57.default.createElement("path", { d: "M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17", stroke: "#1f2937", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}

// src/components/sections/SectionHeader.tsx
var import_search_headless_react23 = require("@yext/search-headless-react");
var import_classnames5 = __toESM(require("classnames"));
var import_react58 = __toESM(require("react"));
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
  const { t } = (0, import_react_i18next15.useTranslation)();
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedQueryFilters,
    cssClasses = FALLBACK_CSS_CLASSES,
    getViewAllUrl
  } = props;
  const latestQuery = (0, import_search_headless_react23.useSearchState)((state) => state.query.mostRecentSearch);
  const nlpFilterDisplayNames = appliedQueryFilters?.map((f) => f.displayValue);
  const analytics = useAnalytics();
  const queryId = (0, import_search_headless_react23.useSearchState)((state) => state.query.queryId);
  const isLoading = (0, import_search_headless_react23.useSearchState)((state) => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = (0, import_classnames5.default)(cssClasses.appliedFiltersContainer, {
    [cssClasses.appliedFiltersLoading ?? ""]: isLoading
  });
  const href = getViewAllUrl ? getViewAllUrl({ verticalKey, query: latestQuery }) : `/${verticalKey}?query=${latestQuery}`;
  const handleClickViewAllButton = (0, import_react58.useCallback)(() => {
    if (!analytics) {
      return;
    }
    if (!queryId) {
      console.error("Unable to report a vertical view all event. Missing field: queryId.");
      return;
    }
    analytics?.report({
      type: "VERTICAL_VIEW_ALL",
      queryId,
      verticalKey
    });
  }, [analytics, queryId, verticalKey]);
  return /* @__PURE__ */ import_react58.default.createElement("div", { className: cssClasses.sectionHeaderContainer }, /* @__PURE__ */ import_react58.default.createElement("div", { className: cssClasses.sectionHeaderIconContainer }, /* @__PURE__ */ import_react58.default.createElement(CollectionIcon, null)), /* @__PURE__ */ import_react58.default.createElement("h2", { className: cssClasses.sectionHeaderLabel }, label), appliedQueryFilters && /* @__PURE__ */ import_react58.default.createElement(AppliedFiltersDisplay, { nlpFilterDisplayNames, cssClasses }), viewAllButton && /* @__PURE__ */ import_react58.default.createElement("div", { className: cssClasses.viewMoreContainer }, /* @__PURE__ */ import_react58.default.createElement("a", { className: cssClasses.viewMoreLink, href, onClick: handleClickViewAllButton }, t("viewAll"))));
}

// src/components/UniversalResults.tsx
var import_classnames6 = __toESM(require("classnames"));
var import_react59 = __toESM(require("react"));
var builtInCssClasses15 = {
  universalResultsContainer: "space-y-8",
  universalResultsLoading: "opacity-50",
  ...builtInCssClasses14
};
function UniversalResults({
  verticalConfigMap,
  showAppliedFilters,
  customCssClasses
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses15, customCssClasses);
  const resultsFromAllVerticals = (0, import_search_headless_react24.useSearchState)((state) => state?.universal?.verticals) || [];
  const isLoading = (0, import_search_headless_react24.useSearchState)((state) => state.searchStatus.isLoading);
  if (resultsFromAllVerticals.length === 0) {
    return null;
  }
  const resultsClassNames = (0, import_classnames6.default)(cssClasses.universalResultsContainer, {
    [cssClasses.universalResultsLoading ?? ""]: isLoading
  });
  return /* @__PURE__ */ import_react59.default.createElement("div", { className: resultsClassNames }, renderVerticalSections({ resultsFromAllVerticals, showAppliedFilters, verticalConfigMap, cssClasses }));
}
function renderVerticalSections(props) {
  const { resultsFromAllVerticals, verticalConfigMap, cssClasses } = props;
  return /* @__PURE__ */ import_react59.default.createElement(import_react59.default.Fragment, null, resultsFromAllVerticals.filter((verticalResults) => verticalResults.results).map((verticalResults) => {
    const verticalKey = verticalResults.verticalKey;
    const verticalConfig = verticalConfigMap[verticalKey] || {};
    const label = verticalConfig.label ?? verticalKey;
    const results = verticalResults.results;
    const SectionComponent = verticalConfig.SectionComponent || StandardSection;
    const appliedQueryFilters = props.showAppliedFilters ? verticalResults.appliedQueryFilters : void 0;
    return /* @__PURE__ */ import_react59.default.createElement(
      SectionComponent,
      {
        results,
        verticalKey,
        header: /* @__PURE__ */ import_react59.default.createElement(SectionHeader, { ...{
          label,
          appliedQueryFilters,
          verticalKey,
          viewAllButton: verticalConfig.viewAllButton,
          getViewAllUrl: verticalConfig.getViewAllUrl,
          cssClasses
        } }),
        CardComponent: verticalConfig.CardComponent,
        key: verticalKey
      }
    );
  }));
}

// src/components/VerticalResults.tsx
var import_search_headless_react25 = require("@yext/search-headless-react");
var import_react60 = __toESM(require("react"));
function VerticalResults(props) {
  const { displayAllOnNoResults = true, ...otherProps } = props;
  const verticalResults = (0, import_search_headless_react25.useSearchState)((state) => state.vertical.results) || [];
  const allResultsForVertical = (0, import_search_headless_react25.useSearchState)((state) => state.vertical?.noResults?.allResultsForVertical.results) || [];
  const isLoading = (0, import_search_headless_react25.useSearchState)((state) => state.searchStatus.isLoading);
  let results = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }
  return /* @__PURE__ */ import_react60.default.createElement(VerticalResultsDisplay, { results, isLoading, ...otherProps });
}

// src/components/Pagination.tsx
var import_react_i18next16 = require("react-i18next");
var import_search_headless_react27 = require("@yext/search-headless-react");

// src/icons/ChevronIcon.tsx
var import_react61 = __toESM(require("react"));
function ChevronIcon({ className }) {
  return /* @__PURE__ */ import_react61.default.createElement(
    "svg",
    {
      viewBox: "0 0 12 8",
      fill: "none",
      stroke: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-hidden": "true"
    },
    /* @__PURE__ */ import_react61.default.createElement("path", { d: "M1.33341 6.5L6.00008 1.83333L10.6667 6.5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
}

// src/hooks/usePaginationAnalytics.ts
var import_search_headless_react26 = require("@yext/search-headless-react");
function usePaginationAnalytics() {
  const analytics = useAnalytics();
  const verticalKey = (0, import_search_headless_react26.useSearchState)((state) => state.vertical.verticalKey);
  const queryId = (0, import_search_headless_react26.useSearchState)((state) => state.query.queryId);
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
var import_react62 = __toESM(require("react"));
var import_classnames7 = __toESM(require("classnames"));
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
  const { t } = (0, import_react_i18next16.useTranslation)();
  const { customCssClasses = {}, paginateAllOnNoResults = false } = props;
  const cssClasses = useComposedCssClasses(builtInPaginationCssClasses, customCssClasses);
  const searchActions = (0, import_search_headless_react27.useSearchActions)();
  const verticalResultsCount = (0, import_search_headless_react27.useSearchState)((state) => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical = (0, import_search_headless_react27.useSearchState)((state) => state.vertical?.noResults?.allResultsForVertical.resultsCount) || 0;
  const isLoading = (0, import_search_headless_react27.useSearchState)((state) => state.searchStatus.isLoading);
  let resultsCount = verticalResultsCount;
  if (verticalResultsCount === 0 && paginateAllOnNoResults) {
    resultsCount = allResultsCountForVertical;
  }
  const offset = (0, import_search_headless_react27.useSearchState)((state) => state.vertical.offset) || 0;
  const limit = (0, import_search_headless_react27.useSearchState)((state) => state.vertical.limit) || 20;
  const currentPageNumber = offset / limit + 1;
  const maxPageCount = Math.ceil(resultsCount / limit);
  const reportAnalyticsEvent = usePaginationAnalytics();
  const navigateToPage = (0, import_react62.useCallback)((newPageNumber) => {
    const newOffset = limit * (newPageNumber - 1);
    searchActions.setOffset(newOffset);
    searchActions.setIsPagination(true);
    executeSearch(searchActions);
    reportAnalyticsEvent(newPageNumber, currentPageNumber, maxPageCount);
  }, [searchActions, limit, maxPageCount, currentPageNumber, reportAnalyticsEvent]);
  if (maxPageCount <= 1) {
    return null;
  }
  const paginationLabels = generatePaginationLabels(currentPageNumber, maxPageCount);
  const paginationContainerClassNames = (0, import_classnames7.default)(cssClasses.paginationContainer, {
    [cssClasses.paginationLoading ?? ""]: isLoading
  });
  return /* @__PURE__ */ import_react62.default.createElement("div", { className: paginationContainerClassNames }, /* @__PURE__ */ import_react62.default.createElement("nav", { className: "inline-flex shadow-sm -space-x-px", "aria-label": t("pagination") }, /* @__PURE__ */ import_react62.default.createElement(
    PaginationButton,
    {
      ariaLabel: t("navigateToThePreviousResultsPage"),
      className: cssClasses.leftIconContainer,
      navigateToPage,
      newPageNumber: currentPageNumber - 1,
      disabled: currentPageNumber === 1
    },
    /* @__PURE__ */ import_react62.default.createElement(ChevronIcon, { className: cssClasses.icon + " transform -rotate-90" })
  ), paginationLabels.map((label, index) => {
    switch (label) {
      case "...":
        return /* @__PURE__ */ import_react62.default.createElement(
          "div",
          {
            key: index,
            className: cssClasses.label
          },
          label
        );
      case `${currentPageNumber}`:
        return /* @__PURE__ */ import_react62.default.createElement(
          PaginationButton,
          {
            key: index,
            className: cssClasses.selectedLabel,
            navigateToPage,
            newPageNumber: currentPageNumber
          },
          label
        );
      default:
        return /* @__PURE__ */ import_react62.default.createElement(
          PaginationButton,
          {
            key: index,
            className: cssClasses.label,
            navigateToPage,
            newPageNumber: Number(label)
          },
          label
        );
    }
  }), /* @__PURE__ */ import_react62.default.createElement(
    PaginationButton,
    {
      ariaLabel: t("navigateToTheNextResultsPage"),
      className: cssClasses.rightIconContainer,
      navigateToPage,
      newPageNumber: currentPageNumber + 1,
      disabled: currentPageNumber === maxPageCount
    },
    /* @__PURE__ */ import_react62.default.createElement(ChevronIcon, { className: cssClasses.icon + " transform rotate-90" })
  )));
}
function PaginationButton(props) {
  const { navigateToPage, newPageNumber } = props;
  const handleClick = (0, import_react62.useCallback)(() => {
    navigateToPage(newPageNumber);
  }, [navigateToPage, newPageNumber]);
  return /* @__PURE__ */ import_react62.default.createElement(
    "button",
    {
      "aria-label": props.ariaLabel,
      className: props.className,
      onClick: handleClick,
      disabled: props.disabled
    },
    props.children
  );
}
function generatePaginationLabels(currentPageNumber, maxPageCount) {
  const paginationLabels = [];
  const previousPageNumber = currentPageNumber - 1;
  const nextPageNumber = currentPageNumber + 1;
  if (previousPageNumber > 3) {
    paginationLabels.push("1", "...", `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_2, index) => paginationLabels.push(`${index + 1}`));
  }
  paginationLabels.push(`${currentPageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, "...", `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)].forEach((_2, index) => paginationLabels.push(`${nextPageNumber + index}`));
  }
  return paginationLabels;
}

// src/components/AlternativeVerticals.tsx
var import_react_i18next17 = require("react-i18next");

// src/icons/StarIcon.tsx
var import_react63 = __toESM(require("react"));
function StarIcon({ className }) {
  return /* @__PURE__ */ import_react63.default.createElement(
    "svg",
    {
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 18 18",
      className,
      "aria-hidden": "true"
    },
    /* @__PURE__ */ import_react63.default.createElement("path", { d: "M8.991 0C4.023 0 0 4.032 0 9s4.023 9 8.991 9C13.968 18 18 13.968 18 9s-4.032-9-9.009-9zm3.816 14.4L9 12.105 5.193 14.4l1.008-4.329-3.357-2.907 4.428-.378L9 2.7l1.728 4.077 4.428.378-3.357 2.907z" })
  );
}

// src/components/AlternativeVerticals.tsx
var import_search_headless_react28 = require("@yext/search-headless-react");
var import_classnames8 = __toESM(require("classnames"));
var import_react64 = __toESM(require("react"));
var builtInCssClasses16 = {
  alternativeVerticalsContainer: "flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm",
  alternativeVerticalsLoading: "opacity-50",
  noResultsText: "text-lg text-neutral-dark pb-2",
  categoriesText: "text-neutral",
  suggestion: "pb-4 flex items-center",
  verticalIcon: "w-4 mr-2"
};
function isVerticalSuggestion(suggestion) {
  return suggestion?.resultsCount !== void 0 && suggestion?.verticalKey !== void 0;
}
function AlternativeVerticals({
  currentVerticalLabel,
  verticalConfigMap,
  displayAllOnNoResults = true,
  customCssClasses
}) {
  const { t } = (0, import_react_i18next17.useTranslation)();
  const cssClasses = useComposedCssClasses(builtInCssClasses16, customCssClasses);
  const alternativeVerticals = (0, import_search_headless_react28.useSearchState)((state) => state.vertical.noResults?.alternativeVerticals) || [];
  const allResultsForVertical = (0, import_search_headless_react28.useSearchState)((state) => state.vertical.noResults?.allResultsForVertical.results) || [];
  const query = (0, import_search_headless_react28.useSearchState)((state) => state.query.mostRecentSearch);
  const verticalSuggestions = buildVerticalSuggestions(verticalConfigMap, alternativeVerticals);
  const isShowingAllResults = displayAllOnNoResults && allResultsForVertical.length > 0;
  const isLoading = (0, import_search_headless_react28.useSearchState)((state) => state.searchStatus.isLoading);
  const containerClassNames = (0, import_classnames8.default)(cssClasses.alternativeVerticalsContainer, {
    [cssClasses.alternativeVerticalsLoading ?? ""]: isLoading
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
  const count = verticalSuggestions.length;
  return /* @__PURE__ */ import_react64.default.createElement("div", { className: containerClassNames }, renderNoResultsInfo(), verticalSuggestions && /* @__PURE__ */ import_react64.default.createElement("div", { className: "pt-4 text-neutral-dark" }, /* @__PURE__ */ import_react64.default.createElement("div", { className: cssClasses.categoriesText }, /* @__PURE__ */ import_react64.default.createElement(
    import_react_i18next17.Trans,
    {
      i18nKey: "categoriesText",
      count,
      values: { query },
      components: { strong: /* @__PURE__ */ import_react64.default.createElement("strong", null) }
    }
  )), /* @__PURE__ */ import_react64.default.createElement("ul", { className: "pt-4" }, verticalSuggestions.map(renderSuggestion))));
  function renderNoResultsInfo() {
    return /* @__PURE__ */ import_react64.default.createElement("div", { className: cssClasses.noResultsText }, /* @__PURE__ */ import_react64.default.createElement("span", null, t("noResultsFoundIn", { currentVerticalLabel })), isShowingAllResults && /* @__PURE__ */ import_react64.default.createElement("span", null, " ", t("showingAllInstead", { currentVerticalLabel })));
  }
  function renderSuggestion(suggestion) {
    const { verticalKey, resultsCount, label } = suggestion;
    return /* @__PURE__ */ import_react64.default.createElement("li", { key: verticalKey, className: cssClasses.suggestion }, /* @__PURE__ */ import_react64.default.createElement("div", { className: cssClasses.verticalIcon }, /* @__PURE__ */ import_react64.default.createElement(StarIcon, null)), /* @__PURE__ */ import_react64.default.createElement("span", { className: "font-bold" }, t("suggestionResultsCount", {
      label,
      count: resultsCount
    })));
  }
}

// src/components/ResultsCount.tsx
var import_react_i18next18 = require("react-i18next");
var import_search_headless_react29 = require("@yext/search-headless-react");
var import_classnames9 = __toESM(require("classnames"));
var import_react65 = __toESM(require("react"));
var builtInCssClasses17 = {
  resultsCountContainer: "font-semibold text-neutral mb-4 py-2 mr-2.5 whitespace-nowrap",
  resultsCountLoading: "opacity-50"
};
function ResultsCount({ customCssClasses }) {
  const cssClasses = useComposedCssClasses(builtInCssClasses17, customCssClasses);
  const isLoading = (0, import_search_headless_react29.useSearchState)((state) => state.searchStatus.isLoading);
  const resultsCountText = useResultsCount();
  const resultsCountClassnames = (0, import_classnames9.default)(cssClasses.resultsCountContainer, {
    [cssClasses.resultsCountLoading ?? ""]: isLoading
  });
  return /* @__PURE__ */ import_react65.default.createElement("div", { className: resultsCountClassnames }, resultsCountText);
}
function useResultsCount() {
  const { t } = (0, import_react_i18next18.useTranslation)();
  const isVertical = (0, import_search_headless_react29.useSearchState)((state) => state.meta.searchType) === import_search_headless_react29.SearchTypeEnum.Vertical;
  const results = (0, import_search_headless_react29.useSearchState)((state) => isVertical ? state.vertical : state.universal.verticals);
  const offset = (0, import_search_headless_react29.useSearchState)((state) => state.vertical.offset) || 0;
  const limit = (0, import_search_headless_react29.useSearchState)((state) => state.vertical.limit) || 20;
  let resultsCount = 0;
  if (results) {
    if (isUniversalSearchResults(results)) {
      results.forEach((resultsOfAVertical) => resultsCount += resultsOfAVertical.resultsCount);
    } else {
      resultsCount = results.resultsCount ?? 0;
    }
  }
  if (resultsCount === 0) {
    return null;
  }
  if (resultsCount > limit && isVertical) {
    const paginateStart = offset + 1;
    const paginateEnd = Math.min(offset + limit, resultsCount);
    return t("resultsCountWithPaginationText", { paginateStart, paginateEnd, resultsCount });
  } else {
    return t("resultsCountText", { count: resultsCount });
  }
}
function isUniversalSearchResults(data) {
  return Array.isArray(data);
}

// src/components/Filters/CheckboxOption.tsx
var import_react_i18next19 = require("react-i18next");
var import_search_headless_react30 = require("@yext/search-headless-react");
var import_react67 = __toESM(require("react"));

// src/components/Filters/FilterGroupContext.ts
var import_react66 = require("react");
var FilterGroupContext = (0, import_react66.createContext)(null);
function useFilterGroupContext() {
  const filterGroupContextInstance = (0, import_react66.useContext)(FilterGroupContext);
  if (filterGroupContextInstance === null) {
    throw new Error("Tried to use FilterGroupContext when none exists.");
  }
  return filterGroupContextInstance;
}

// src/components/Filters/CheckboxOption.tsx
var import_classnames10 = __toESM(require("classnames"));
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
  const { t } = (0, import_react_i18next19.useTranslation)();
  const { fieldId, isOptionsDisabled } = useFilterGroupContext();
  const {
    value,
    matcher = import_search_headless_react30.Matcher.Equals,
    selectedByDefault = false,
    displayName = props.value,
    resultsCount,
    singleSelection = false
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses18, props.customCssClasses);
  const optionId = useId("facet");
  const { selectFilter, filters, applyFilters } = useFiltersContext();
  const handleClick = (0, import_react67.useCallback)((checked) => {
    selectFilter({
      matcher,
      fieldId,
      value,
      displayName: typeof displayName === "string" ? displayName : void 0,
      selected: checked
    });
    applyFilters();
  }, [applyFilters, fieldId, displayName, selectFilter, value, matcher]);
  const handleChange = (0, import_react67.useCallback)((evt) => {
    handleClick(evt.target.checked);
  }, [handleClick]);
  const optionFilter = (0, import_react67.useMemo)(() => {
    return {
      fieldId,
      matcher,
      value
    };
  }, [fieldId, value, matcher]);
  const existingStoredFilter = findSelectableFieldValueFilter(optionFilter, filters);
  (0, import_react67.useEffect)(() => {
    if (!existingStoredFilter && selectedByDefault) {
      selectFilter({
        ...optionFilter,
        displayName: typeof displayName === "string" ? displayName : void 0,
        selected: true
      });
    }
  }, [displayName, selectFilter, selectedByDefault, existingStoredFilter, optionFilter]);
  const isSelected = existingStoredFilter ? existingStoredFilter.selected : false;
  const displayNameString = isNumberRangeValue(displayName) ? getDefaultFilterDisplayName(displayName) : displayName.toString();
  const labelText = resultsCount ? `${displayNameString} (${resultsCount})` : displayNameString;
  const inputClasses = (0, import_classnames10.default)(cssClasses.input, {
    [cssClasses.input___disabled ?? ""]: isOptionsDisabled
  });
  const labelClasses = (0, import_classnames10.default)(cssClasses.label, {
    [cssClasses.label___disabled ?? ""]: isOptionsDisabled
  });
  return /* @__PURE__ */ import_react67.default.createElement("div", { className: cssClasses.container }, /* @__PURE__ */ import_react67.default.createElement("div", { className: cssClasses.optionContainer }, singleSelection ? /* @__PURE__ */ import_react67.default.createElement(
    "input",
    {
      type: "radio",
      name: fieldId,
      id: optionId,
      checked: isSelected,
      className: inputClasses,
      onChange: handleChange,
      disabled: isOptionsDisabled
    }
  ) : /* @__PURE__ */ import_react67.default.createElement(
    "input",
    {
      type: "checkbox",
      id: optionId,
      checked: isSelected,
      className: inputClasses,
      onChange: handleChange,
      disabled: isOptionsDisabled
    }
  ), /* @__PURE__ */ import_react67.default.createElement("label", { className: labelClasses, htmlFor: optionId }, labelText)), isOptionsDisabled && /* @__PURE__ */ import_react67.default.createElement("div", { className: cssClasses.tooltipContainer }, /* @__PURE__ */ import_react67.default.createElement("div", { className: cssClasses.tooltip }, t("clearTheRangeToSelectOptions"))));
}

// src/components/Filters/CollapsibleLabel.tsx
var import_classnames11 = __toESM(require("classnames"));
var import_react68 = __toESM(require("react"));
var builtInCssClasses19 = {
  label: "text-neutral-dark text-sm font-medium text-left"
};
function CollapsibleLabel({ label, customCssClasses }) {
  const { isExpanded, getToggleProps } = useFilterGroupContext();
  const iconClassName = (0, import_classnames11.default)("w-3 text-gray-400", {
    "transform rotate-180": !isExpanded
  });
  const cssClasses = useComposedCssClasses(builtInCssClasses19, customCssClasses);
  return /* @__PURE__ */ import_react68.default.createElement("button", { className: "w-full flex justify-between items-center mb-4", ...getToggleProps() }, /* @__PURE__ */ import_react68.default.createElement("div", { className: cssClasses.label }, label), /* @__PURE__ */ import_react68.default.createElement(ChevronIcon, { className: iconClassName }));
}

// src/components/Filters/CollapsibleSection.tsx
var import_react69 = __toESM(require("react"));
function CollapsibleSection(props) {
  const {
    className = "space-y-3",
    children
  } = props;
  const { getCollapseProps } = useFilterGroupContext();
  return /* @__PURE__ */ import_react69.default.createElement("div", { className, ...getCollapseProps() }, children);
}

// src/components/Filters/FacetsProvider.tsx
var import_search_headless_react31 = require("@yext/search-headless-react");
var import_react70 = __toESM(require("react"));
function FacetsProvider({
  children,
  className = "w-full",
  searchOnChange = true
}) {
  const searchActions = (0, import_search_headless_react31.useSearchActions)();
  const facetsInState = (0, import_search_headless_react31.useSearchState)((state) => state.filters.facets);
  const facets = (0, import_react70.useMemo)(() => facetsInState ?? [], [facetsInState]);
  const filters = (0, import_react70.useMemo)(() => {
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
  const filtersContextInstance = (0, import_react70.useMemo)(() => {
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
  return /* @__PURE__ */ import_react70.default.createElement("div", { className }, /* @__PURE__ */ import_react70.default.createElement(FiltersContext.Provider, { value: filtersContextInstance }, children?.(facets)));
}

// src/components/Filters/FilterGroupProvider.tsx
var import_react71 = __toESM(require("react"));
var import_react_collapsed = require("react-collapsed");
function FilterGroupProvider(props) {
  const {
    children,
    defaultExpanded = true,
    fieldId
  } = props;
  const [searchValue, setSearchValue] = (0, import_react71.useState)("");
  const [isOptionsDisabled, setIsOptionsDisabled] = (0, import_react71.useState)(false);
  const { getCollapseProps, getToggleProps, isExpanded } = (0, import_react_collapsed.useCollapse)({ defaultExpanded });
  const FilterGroupContextInstance = (0, import_react71.useMemo)(() => {
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
  return /* @__PURE__ */ import_react71.default.createElement(FilterGroupContext.Provider, { value: FilterGroupContextInstance }, children);
}

// src/components/Filters/SearchInput.tsx
var import_react_i18next20 = require("react-i18next");
var import_react72 = __toESM(require("react"));
function SearchInput(props) {
  const { t } = (0, import_react_i18next20.useTranslation)();
  const {
    className = "text-sm form-input bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:ring-primary focus:ring-0 text-neutral-dark placeholder:text-neutral",
    placeholder
  } = props;
  const { searchValue, setSearchValue } = useFilterGroupContext();
  const handleChange = (0, import_react72.useCallback)((e) => {
    setSearchValue(e.target.value);
  }, [setSearchValue]);
  return /* @__PURE__ */ import_react72.default.createElement(
    "input",
    {
      className,
      type: "text",
      placeholder: placeholder ?? t("searchHere"),
      value: searchValue,
      onChange: handleChange
    }
  );
}

// src/components/Filters/StaticFiltersProvider.tsx
var import_search_headless_react32 = require("@yext/search-headless-react");
var import_react73 = __toESM(require("react"));
function StaticFiltersProvider({
  children,
  className = "w-full",
  searchOnChange = true
}) {
  const searchActions = (0, import_search_headless_react32.useSearchActions)();
  const displayableFilters = (0, import_search_headless_react32.useSearchState)((state) => state.filters.static);
  const filtersContextInstance = (0, import_react73.useMemo)(() => {
    return {
      selectFilter(filter) {
        const { selected, displayName, ...fieldValueFilter } = filter;
        searchActions.setFilterOption({
          filter: {
            kind: "fieldValue",
            ...fieldValueFilter
          },
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
      filters: getSelectableFieldValueFilters(displayableFilters ?? [])
    };
  }, [searchActions, displayableFilters, searchOnChange]);
  return /* @__PURE__ */ import_react73.default.createElement("div", { className }, /* @__PURE__ */ import_react73.default.createElement(FiltersContext.Provider, { value: filtersContextInstance }, children));
}

// src/components/Filters/RangeInput.tsx
var import_react_i18next21 = require("react-i18next");
var import_search_headless_react33 = require("@yext/search-headless-react");
var import_react75 = __toESM(require("react"));
var import_classnames12 = __toESM(require("classnames"));

// src/icons/InvalidIcon.tsx
var import_react74 = __toESM(require("react"));
function InvalidIcon() {
  return /* @__PURE__ */ import_react74.default.createElement("svg", { width: "20", height: "18", viewBox: "0 0 20 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react74.default.createElement("path", { d: "M9.99955 7V9M9.99955 13H10.0095M3.07134 17H16.9277C18.4673 17 19.4296 15.3333 18.6598 14L11.7316 2C10.9618 0.666667 9.0373 0.666667 8.2675 2L1.33929 14C0.569492 15.3333 1.53174 17 3.07134 17Z", stroke: "#B91C1C", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}

// src/components/Filters/RangeInput.tsx
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
  const { t } = (0, import_react_i18next21.useTranslation)();
  const { filters } = useFiltersContext();
  const { fieldId, setIsOptionsDisabled } = useFilterGroupContext();
  const {
    getFilterDisplayName = getDefaultFilterDisplayName,
    inputPrefix
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses20, props.customCssClasses);
  const searchActions = (0, import_search_headless_react33.useSearchActions)();
  const [minRangeInput, setMinRangeInput] = (0, import_react75.useState)("");
  const [maxRangeInput, setMaxRangeInput] = (0, import_react75.useState)("");
  const staticFilters = (0, import_search_headless_react33.useSearchState)((state) => state.filters.static);
  const fieldValueFilters = (0, import_react75.useMemo)(
    () => getSelectableFieldValueFilters(staticFilters ?? []),
    [staticFilters]
  );
  const isDisabled = filters.some((filter) => filter.selected && filter.fieldId === fieldId);
  const rangeFilter = (0, import_react75.useMemo)(() => {
    return {
      kind: "fieldValue",
      fieldId,
      matcher: import_search_headless_react33.Matcher.Between,
      value: parseNumberRangeInput(minRangeInput, maxRangeInput)
    };
  }, [fieldId, maxRangeInput, minRangeInput]);
  const isValid = isValidRange(rangeFilter.value);
  const matchingFilter = findSelectableFieldValueFilter(rangeFilter, fieldValueFilters);
  const isSelectedInAnswersState = matchingFilter?.selected === true;
  const hasUserInput = !!(minRangeInput || maxRangeInput);
  const shouldRenderApplyButton = hasUserInput && !isSelectedInAnswersState;
  (0, import_react75.useEffect)(() => {
    setIsOptionsDisabled(hasUserInput);
  }, [hasUserInput, setIsOptionsDisabled]);
  const handleMinChange = (0, import_react75.useCallback)((event) => {
    const input = event?.target?.value;
    validateNumericInput(input) && setMinRangeInput(input);
  }, []);
  const handleMaxChange = (0, import_react75.useCallback)((event) => {
    const input = event?.target?.value;
    validateNumericInput(input) && setMaxRangeInput(input);
  }, []);
  const handleClickApply = (0, import_react75.useCallback)(() => {
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
  const handleClickClear = (0, import_react75.useCallback)(() => {
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
  const inputClasses = (0, import_classnames12.default)(cssClasses.input, {
    [cssClasses.input___withPrefix ?? ""]: !!inputPrefix,
    [cssClasses.input___withoutPrefix ?? ""]: !inputPrefix,
    [cssClasses.input___disabled ?? ""]: isDisabled,
    [cssClasses.input___enabled ?? ""]: !isDisabled,
    [cssClasses.input___invalid ?? ""]: !isValid,
    [cssClasses.input___valid ?? ""]: isValid
  });
  const inputPrefixClasses = (0, import_classnames12.default)(cssClasses.inputPrefix, {
    [cssClasses.inputPrefix___disabled ?? ""]: isDisabled,
    [cssClasses.inputPrefix___enabled ?? ""]: !isDisabled
  });
  function renderInput(value, onChange, placeholder) {
    return /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.inputContainer }, inputPrefix && /* @__PURE__ */ import_react75.default.createElement("span", { className: inputPrefixClasses, "aria-hidden": "true" }, inputPrefix), /* @__PURE__ */ import_react75.default.createElement(
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
    ));
  }
  return /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.rangeInputContainer }, /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.inputRowContainer }, renderInput(minRangeInput, handleMinChange, t("min")), /* @__PURE__ */ import_react75.default.createElement("div", { className: "w-2.5 text-sm text-neutral" }, "-"), renderInput(maxRangeInput, handleMaxChange, t("max")), isDisabled && /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.tooltipContainer }, /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.tooltip }, t("unselectAnOptionToEnterInARange")))), !isValid && /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.invalidRowContainer }, /* @__PURE__ */ import_react75.default.createElement(InvalidIcon, null), /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.invalidMessage }, t("invalidRange"))), hasUserInput && /* @__PURE__ */ import_react75.default.createElement("div", { className: cssClasses.buttonsContainer }, /* @__PURE__ */ import_react75.default.createElement(
    "button",
    {
      className: cssClasses.clearButton,
      onClick: handleClickClear
    },
    t("clearMinAndMax")
  ), shouldRenderApplyButton && /* @__PURE__ */ import_react75.default.createElement(
    "button",
    {
      className: cssClasses.applyButton,
      onClick: handleClickApply
    },
    t("apply")
  )));
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
var import_react_i18next22 = require("react-i18next");
var import_search_headless_react34 = require("@yext/search-headless-react");
var import_react77 = __toESM(require("react"));

// src/components/FacetTiltle.tsx
var import_react76 = __toESM(require("react"));
function FacetTitle({
  label,
  customCssClasses,
  collapsible = true
}) {
  const collapsibleLabelCssClasses = (0, import_react76.useMemo)(() => {
    return {
      label: customCssClasses?.titleLabel
    };
  }, [customCssClasses]);
  return /* @__PURE__ */ import_react76.default.createElement(import_react76.Fragment, null, collapsible ? /* @__PURE__ */ import_react76.default.createElement(CollapsibleLabel, { label, customCssClasses: collapsibleLabelCssClasses }) : label && /* @__PURE__ */ import_react76.default.createElement("div", { className: twMerge(
    "mb-4",
    builtInCssClasses19.label,
    collapsibleLabelCssClasses.label
  ) }, label));
}

// src/components/FilterGroup.tsx
var DEFAULT_CUSTOM_CSS_CLASSES = {};
function FilterGroup({
  fieldId,
  filterOptions,
  title,
  collapsible = true,
  defaultExpanded = true,
  searchable,
  customCssClasses = DEFAULT_CUSTOM_CSS_CLASSES,
  showMoreLimit = filterOptions.length,
  singleSelection,
  children
}) {
  const cssClasses = (0, import_react77.useMemo)(() => {
    const { option, optionLabel, optionInput, ...remainingClasses } = customCssClasses;
    return {
      ...remainingClasses,
      ...option && { optionContainer: option },
      ...optionLabel && { label: optionLabel },
      ...optionInput && { input: optionInput }
    };
  }, [customCssClasses]);
  return /* @__PURE__ */ import_react77.default.createElement(
    FilterGroupProvider,
    {
      fieldId,
      defaultExpanded: !collapsible || defaultExpanded
    },
    /* @__PURE__ */ import_react77.default.createElement(
      FacetTitle,
      {
        label: title,
        customCssClasses,
        collapsible
      }
    ),
    /* @__PURE__ */ import_react77.default.createElement(CollapsibleSection, { className: cssClasses.optionsContainer }, searchable && /* @__PURE__ */ import_react77.default.createElement(SearchInput, { className: cssClasses.searchInput }), /* @__PURE__ */ import_react77.default.createElement(
      CheckboxOptions,
      {
        filterOptions,
        showMoreLimit,
        cssClasses,
        singleSelection
      }
    ), children)
  );
}
function CheckboxOptions({
  filterOptions,
  showMoreLimit,
  cssClasses,
  singleSelection
}) {
  const { t } = (0, import_react_i18next22.useTranslation)();
  const searchUtilities = (0, import_search_headless_react34.useSearchUtilities)();
  const { searchValue } = useFilterGroupContext();
  const shouldRenderOption = (option) => {
    return searchUtilities.isCloseMatch(option.displayName || option.value.toString(), searchValue);
  };
  let displayedOptions = filterOptions.filter(shouldRenderOption).map((o) => {
    return /* @__PURE__ */ import_react77.default.createElement(
      CheckboxOption,
      {
        ...o,
        key: o.displayName || o.value.toString(),
        customCssClasses: cssClasses,
        singleSelection
      }
    );
  });
  const isLimited = displayedOptions.length > showMoreLimit;
  const [showAll, setShowAll] = (0, import_react77.useState)(!isLimited);
  displayedOptions = displayedOptions.slice(0, showAll ? displayedOptions.length : showMoreLimit);
  return /* @__PURE__ */ import_react77.default.createElement(import_react77.default.Fragment, null, displayedOptions, isLimited && /* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */
  /* @__PURE__ */ import_react77.default.createElement("button", { className: "text-primary py-1 text-sm", onClick: () => setShowAll(!showAll) }, showAll ? t("showLess") : t("showMore")));
}

// src/components/StaticFilters.tsx
var import_react78 = __toESM(require("react"));
function StaticFilters(props) {
  const { searchOnChange, customCssClasses = {}, ...filterGroupProps } = props;
  const { staticFiltersContainer: containerClassName, ...filterGroupCssClasses } = customCssClasses;
  return /* @__PURE__ */ import_react78.default.createElement(StaticFiltersProvider, { searchOnChange, className: containerClassName }, /* @__PURE__ */ import_react78.default.createElement(
    FilterGroup,
    {
      key: filterGroupProps.fieldId,
      customCssClasses: filterGroupCssClasses,
      ...filterGroupProps
    }
  ));
}

// src/components/StandardFacets.tsx
var import_react80 = __toESM(require("react"));

// src/components/FilterDivider.tsx
var import_react79 = __toESM(require("react"));
function FilterDivider({ className }) {
  return /* @__PURE__ */ import_react79.default.createElement("div", { className: twMerge("w-full h-px bg-gray-200 my-4", className) });
}

// src/components/StandardFacets.tsx
function StandardFacets(props) {
  const {
    searchOnChange,
    excludedFieldIds = [],
    customCssClasses = {},
    showMoreLimit = 10,
    showOptionCounts = true,
    singleSelection = false,
    ...filterGroupProps
  } = props;
  return /* @__PURE__ */ import_react80.default.createElement(FacetsProvider, { searchOnChange, className: customCssClasses.standardFacetsContainer }, (facets) => facets.filter((f) => !excludedFieldIds.includes(f.fieldId) && isStringFacet(f)).map((f, i) => {
    return /* @__PURE__ */ import_react80.default.createElement(import_react80.Fragment, { key: f.fieldId }, /* @__PURE__ */ import_react80.default.createElement(
      FilterGroup,
      {
        fieldId: f.fieldId,
        filterOptions: f.options.map((o) => {
          return showOptionCounts ? { ...o, resultsCount: o.count } : o;
        }),
        title: f.displayName,
        customCssClasses,
        showMoreLimit,
        searchable: f.options.length > showMoreLimit,
        singleSelection,
        ...filterGroupProps
      }
    ), i < facets.length - 1 && /* @__PURE__ */ import_react80.default.createElement(FilterDivider, { className: customCssClasses.divider }));
  }));
}

// src/components/HierarchicalFacets.tsx
var import_react81 = __toESM(require("react"));
function HierarchicalFacets({
  searchOnChange,
  collapsible,
  defaultExpanded,
  includedFieldIds,
  customCssClasses = {},
  delimiter,
  showMoreLimit
}) {
  return /* @__PURE__ */ import_react81.default.createElement(FacetsProvider, { searchOnChange, className: customCssClasses.hierarchicalFacetsContainer }, (facets) => facets.filter((f) => f.options.length > 0 && includedFieldIds.includes(f.fieldId)).map((f, i) => {
    return /* @__PURE__ */ import_react81.default.createElement(import_react81.Fragment, { key: f.fieldId }, /* @__PURE__ */ import_react81.default.createElement(
      FilterGroupProvider,
      {
        fieldId: f.fieldId,
        defaultExpanded: !collapsible || defaultExpanded
      },
      collapsible ? /* @__PURE__ */ import_react81.default.createElement(CollapsibleLabel, { label: f.displayName }) : f.displayName && /* @__PURE__ */ import_react81.default.createElement("div", { className: "text-neutral-dark text-sm font-medium text-left mb-4" }, f.displayName),
      /* @__PURE__ */ import_react81.default.createElement(CollapsibleSection, null, /* @__PURE__ */ import_react81.default.createElement(
        HierarchicalFacetDisplay,
        {
          facet: f,
          delimiter,
          showMoreLimit,
          customCssClasses
        }
      ))
    ), i < facets.length - 1 && /* @__PURE__ */ import_react81.default.createElement(FilterDivider, { className: customCssClasses.divider }));
  }));
}

// src/components/NumericalFacets.tsx
var import_react82 = __toESM(require("react"));
var DEFAULT_RANGE_INPUT_PREFIX = /* @__PURE__ */ import_react82.default.createElement(import_react82.default.Fragment, null, "$");
function NumericalFacets({
  searchOnChange,
  includedFieldIds = [],
  getFilterDisplayName,
  inputPrefix = DEFAULT_RANGE_INPUT_PREFIX,
  customCssClasses = {},
  ...filterGroupProps
}) {
  return /* @__PURE__ */ import_react82.default.createElement(FacetsProvider, { searchOnChange, className: customCssClasses.numericalFacetsContainer }, (facets) => facets.filter((f) => isNumericalFacet(f) && (includedFieldIds.length === 0 || includedFieldIds.includes(f.fieldId))).map((f, i) => {
    return /* @__PURE__ */ import_react82.default.createElement(import_react82.Fragment, { key: f.fieldId }, /* @__PURE__ */ import_react82.default.createElement(
      FilterGroup,
      {
        fieldId: f.fieldId,
        filterOptions: f.options,
        title: f.displayName,
        customCssClasses,
        ...filterGroupProps
      },
      /* @__PURE__ */ import_react82.default.createElement(
        RangeInput,
        {
          getFilterDisplayName,
          inputPrefix,
          customCssClasses
        }
      )
    ), i < facets.length - 1 && /* @__PURE__ */ import_react82.default.createElement(FilterDivider, { className: customCssClasses.divider }));
  }));
}

// src/components/StandardFacetContent.tsx
var import_react83 = __toESM(require("react"));
function StandardFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  facet,
  showMoreLimit = 10,
  showOptionCounts = true,
  ...filterGroupProps
}) {
  const options = facet.options || [];
  const transformedOptions = transformOptions ? transformOptions(options) || [] : options;
  return /* @__PURE__ */ import_react83.default.createElement(
    FilterGroup,
    {
      fieldId,
      filterOptions: transformedOptions.map((o) => {
        return showOptionCounts ? { ...o, resultsCount: o.count } : o;
      }),
      title: label || facet.displayName,
      customCssClasses,
      showMoreLimit,
      searchable: facet?.options.length > showMoreLimit,
      ...filterGroupProps
    }
  );
}

// src/components/Facets.tsx
var import_react86 = __toESM(require("react"));

// src/components/NumericalFacetContent.tsx
var import_react84 = __toESM(require("react"));
var DEFAULT_RANGE_INPUT_PREFIX2 = /* @__PURE__ */ import_react84.default.createElement(import_react84.default.Fragment, null, "$");
function NumericalFacetContent({
  fieldId,
  label,
  transformOptions,
  customCssClasses,
  getFilterDisplayName,
  facet,
  showMoreLimit = 10,
  showOptionCounts = false,
  inputPrefix = DEFAULT_RANGE_INPUT_PREFIX2,
  ...filterGroupProps
}) {
  const options = facet.options || [];
  const transformedOptions = transformOptions ? transformOptions(options) || [] : options;
  return /* @__PURE__ */ import_react84.default.createElement(
    FilterGroup,
    {
      fieldId,
      filterOptions: transformedOptions.map((o) => {
        return showOptionCounts ? { ...o, resultsCount: o.count } : o;
      }),
      title: label || facet.displayName,
      customCssClasses,
      showMoreLimit,
      searchable: facet?.options.length > showMoreLimit,
      ...filterGroupProps
    },
    /* @__PURE__ */ import_react84.default.createElement(
      RangeInput,
      {
        getFilterDisplayName,
        inputPrefix,
        customCssClasses
      }
    )
  );
}

// src/components/HierarchicalFacetContent.tsx
var import_react85 = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react85.default.createElement(FilterGroupProvider, { fieldId, defaultExpanded: !collapsible || defaultExpanded }, /* @__PURE__ */ import_react85.default.createElement(
    FacetTitle,
    {
      label: label || facet.displayName,
      customCssClasses,
      collapsible
    }
  ), /* @__PURE__ */ import_react85.default.createElement(CollapsibleSection, null, /* @__PURE__ */ import_react85.default.createElement(
    HierarchicalFacetDisplay,
    {
      facet: {
        ...facet,
        options: transformedOptions
      },
      delimiter,
      showMoreLimit,
      customCssClasses
    }
  )));
}

// src/components/Facets.tsx
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
    (Array.isArray(children) ? children : [children]).filter((child) => child?.props?.fieldId).forEach((child) => {
      fieldIdToCustomFacetProps.set(child.props.fieldId, child);
      fieldIds.push(child.props.fieldId);
    });
  }
  return /* @__PURE__ */ import_react86.default.createElement("div", null, /* @__PURE__ */ import_react86.default.createElement(FacetsProvider, { searchOnChange, className: customCssClasses.facetsContainer }, (facets) => {
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
      return /* @__PURE__ */ import_react86.default.createElement(import_react86.Fragment, { key: facet.fieldId }, /* @__PURE__ */ import_react86.default.createElement(
        Facet,
        {
          facet,
          facetsCustomCssClasses: customCssClasses,
          fieldIdToCustomFacetProps,
          hierarchicalFieldIds
        }
      ), i < facets.length - 1 && /* @__PURE__ */ import_react86.default.createElement(FilterDivider, { className: customCssClasses?.divider }));
    });
  }));
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
    facetProps = { ...facetProps, ...customFacetElement.props };
    facetType = getFacetTypeFromReactElementType(
      typeof customFacetElement.type === "function" ? customFacetElement.type.name : ""
    );
  } else {
    facetType = getFacetTypeFromFacet(facet, hierarchicalFieldIds);
  }
  facetProps = {
    ...facetProps,
    customCssClasses: {
      ...facetsCustomCssClasses,
      ...facetProps.customCssClasses
    }
  };
  switch (facetType) {
    case "NUMERICAL" /* NUMERICAL */:
      return /* @__PURE__ */ import_react86.default.createElement(NumericalFacetContent, { facet, ...facetProps });
    case "HIERARCHICAL" /* HIERARCHICAL */:
      return /* @__PURE__ */ import_react86.default.createElement(HierarchicalFacetContent, { facet, ...facetProps });
    case "STANDARD" /* STANDARD */:
    // fall through
    default:
      return /* @__PURE__ */ import_react86.default.createElement(StandardFacetContent, { facet, ...facetProps });
  }
}
function getFacetTypeFromReactElementType(elementType) {
  switch (elementType) {
    case NumericalFacet.name.toString():
      return "NUMERICAL" /* NUMERICAL */;
    case HierarchicalFacet.name.toString():
      return "HIERARCHICAL" /* HIERARCHICAL */;
    case StandardFacet.name.toString():
    // fall through
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
var import_react_i18next23 = require("react-i18next");
var import_search_headless_react35 = require("@yext/search-headless-react");
var import_react87 = require("react");
var import_react88 = __toESM(require("react"));
var builtInCssClasses21 = {
  button: "border border-gray-300 px-2.5 py-1 rounded-md text-primary bg-white shadow-md sticky bottom-3"
};
function ApplyFiltersButton({
  customCssClasses,
  label
}) {
  const { t } = (0, import_react_i18next23.useTranslation)();
  const cssClasses = useComposedCssClasses(builtInCssClasses21, customCssClasses);
  const searchActions = (0, import_search_headless_react35.useSearchActions)();
  const handleClick = (0, import_react87.useCallback)(() => {
    searchActions.setOffset(0);
    clearStaticRangeFilters(searchActions, getSelectedNumericalFacetFields(searchActions));
    executeSearch(searchActions);
  }, [searchActions]);
  return /* @__PURE__ */ import_react88.default.createElement(
    "button",
    {
      onClick: handleClick,
      className: cssClasses.button
    },
    label ?? t("applyFilters")
  );
}

// src/components/MapboxMap.tsx
var import_react89 = __toESM(require("react"));
var import_mapbox_gl = __toESM(require("mapbox-gl"));
var import_search_headless_react36 = require("@yext/search-headless-react");
var import_lodash = __toESM(require("lodash"));
var import_react_dom = __toESM(require("react-dom"));
function MapboxMap({
  mapboxAccessToken,
  mapboxOptions,
  PinComponent: PinComponent2,
  renderPin,
  getCoordinate = getDefaultCoordinate,
  onDrag,
  iframeWindow,
  allowUpdates = false,
  onPinClick,
  markerOptionsOverride
}) {
  const mapboxInstance = iframeWindow?.mapboxgl ?? import_mapbox_gl.default;
  (0, import_react89.useEffect)(() => {
    mapboxInstance.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);
  const mapContainer = (0, import_react89.useRef)(null);
  const map = (0, import_react89.useRef)(null);
  const markers = (0, import_react89.useRef)([]);
  const locationResults = (0, import_search_headless_react36.useSearchState)((state) => state.vertical.results);
  const onDragDebounced = useDebouncedFunction(onDrag, 100);
  const [selectedResult, setSelectedResult] = (0, import_react89.useState)(void 0);
  const handlePinClick = (0, import_react89.useCallback)((result) => {
    setSelectedResult((prev) => prev === result ? void 0 : result);
  }, []);
  (0, import_react89.useEffect)(() => {
    onPinClick?.(selectedResult);
  }, [selectedResult]);
  const locale = (0, import_search_headless_react36.useSearchState)((state) => state.meta?.locale);
  const prevMapboxOptions = (0, import_react89.useRef)(mapboxOptions);
  const localizeMap = (0, import_react89.useCallback)(() => {
    const mapbox = map.current;
    if (!mapbox || !locale) return;
    const localizeLabels = () => {
      mapbox.getStyle().layers.forEach((layer) => {
        if (layer.type === "symbol" && layer.layout?.["text-field"]) {
          mapbox.setLayoutProperty(
            layer.id,
            "text-field",
            [
              "coalesce",
              ["get", `name_${getMapboxLanguage(locale)}`],
              ["get", "name"]
            ]
          );
        }
      });
    };
    if (mapbox.isStyleLoaded()) {
      localizeLabels();
    } else {
      mapbox.once("styledata", () => localizeLabels());
    }
  }, [locale]);
  (0, import_react89.useEffect)(() => {
    if (mapContainer.current) {
      if (map.current && allowUpdates) {
        if (!import_lodash.default.isEqual(prevMapboxOptions.current, mapboxOptions)) {
          handleMapboxOptionsUpdates(mapboxOptions, map.current);
          prevMapboxOptions.current = mapboxOptions;
        }
      } else if (!map.current && mapboxInstance) {
        const options = {
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-74.005371, 40.741611],
          zoom: 9,
          ...mapboxOptions
        };
        map.current = new mapboxInstance.Map(options);
        const mapbox = map.current;
        mapbox.resize();
        const nav = new mapboxInstance.NavigationControl({
          showCompass: false,
          showZoom: true,
          visualizePitch: false
        });
        mapbox.addControl(nav, "top-right");
        if (onDragDebounced) {
          mapbox.on("drag", () => {
            onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
          });
          mapbox.on("zoom", (e) => {
            if (e.originalEvent) {
              onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
            }
          });
          return () => {
            mapbox.off("drag", () => {
              onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
            });
            mapbox.off("zoom", (e) => {
              if (e.originalEvent) {
                onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
              }
            });
          };
        }
      }
      localizeMap();
    }
  }, [mapboxOptions, onDragDebounced, localizeMap]);
  (0, import_react89.useEffect)(() => {
    if (iframeWindow && map.current) {
      map.current.resize();
    }
  }, [mapContainer.current]);
  (0, import_react89.useEffect)(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && locationResults?.length > 0) {
      const bounds = new mapboxInstance.LngLatBounds();
      locationResults.forEach((result, i) => {
        const markerLocation = getCoordinate(result);
        if (markerLocation) {
          const { latitude, longitude } = markerLocation;
          const el = document.createElement("div");
          let markerOptions = {};
          if (PinComponent2) {
            if (renderPin) {
              console.warn(
                "Found both PinComponent and renderPin props. Using PinComponent."
              );
            }
            import_react_dom.default.render(/* @__PURE__ */ import_react89.default.createElement(
              PinComponent2,
              {
                index: i,
                mapbox,
                result,
                selected: selectedResult === result
              }
            ), el);
            markerOptions.element = el;
          } else if (renderPin) {
            renderPin({ index: i, mapbox, result, container: el });
            markerOptions.element = el;
          }
          if (markerOptionsOverride) {
            markerOptions = {
              ...markerOptions,
              ...markerOptionsOverride(selectedResult === result)
            };
          }
          const marker = new mapboxInstance.Marker(markerOptions).setLngLat({ lat: latitude, lng: longitude }).addTo(mapbox);
          marker?.getElement().addEventListener("click", () => handlePinClick(result));
          markers.current.push(marker);
          bounds.extend([longitude, latitude]);
        }
      });
      if (!bounds.isEmpty()) {
        mapbox.fitBounds(bounds, {
          // these settings are defaults and will be overriden if present on fitBoundsOptions
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: mapboxOptions?.maxZoom ?? 15,
          ...mapboxOptions?.fitBoundsOptions
        });
      }
      return () => {
        markers.current.forEach((marker, i) => {
          marker?.getElement().removeEventListener("click", () => handlePinClick(locationResults[i]));
        });
      };
    }
  }, [PinComponent2, getCoordinate, locationResults, selectedResult, markerOptionsOverride]);
  return /* @__PURE__ */ import_react89.default.createElement("div", { ref: mapContainer, className: "h-full w-full" });
}
function handleMapboxOptionsUpdates(mapboxOptions, currentMap) {
  if (mapboxOptions?.style) {
    currentMap.setStyle(mapboxOptions.style);
  }
}
function isCoordinate(data) {
  return typeof data == "object" && typeof data?.["latitude"] === "number" && typeof data?.["longitude"] === "number";
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
function getMapboxLanguage(locale) {
  try {
    const localeOptions = new Intl.Locale(locale.replaceAll("_", "-"));
    return localeOptions.script ? `${localeOptions.language}-${localeOptions.script}` : localeOptions.language;
  } catch (e) {
    console.warn(`Locale "${locale}" is not supported.`);
  }
  return "en";
}

// src/components/AnalyticsProvider.tsx
var import_react90 = __toESM(require("react"));
var import_analytics = require("@yext/analytics");
function AnalyticsProvider(props) {
  const { children, ...analyticsConfig } = props;
  const analyticsReporter = (0, import_analytics.provideAnalytics)(analyticsConfig);
  return /* @__PURE__ */ import_react90.default.createElement(AnalyticsContext.Provider, { value: analyticsReporter }, children);
}

// src/components/GenerativeDirectAnswer.tsx
var import_react_i18next24 = require("react-i18next");
var import_search_headless_react37 = require("@yext/search-headless-react");

// src/components/Markdown.tsx
var import_react_markdown = __toESM(require("react-markdown"));
var import_remark_gfm = __toESM(require("remark-gfm"));
var import_rehype_raw = __toESM(require("rehype-raw"));
var import_rehype_sanitize = __toESM(require("rehype-sanitize"));
var import_react91 = __toESM(require("react"));
var unifiedPlugins = {
  remark: [
    import_remark_gfm.default
    //renders Github-Flavored Markdown
  ],
  rehype: [
    import_rehype_raw.default,
    //to support HTML embedded in markdown
    import_rehype_sanitize.default
    //to sanitize HTML content
  ]
};
var builtInCssClasses22 = {
  link: "cursor-pointer"
};
function Markdown({
  content,
  customCssClasses,
  onLinkClick
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses22, customCssClasses);
  const components = (0, import_react91.useMemo)(() => {
    const createClickHandlerFn = (href) => () => {
      onLinkClick?.(href);
    };
    return {
      a: ({ node: _2, children, ...props }) => {
        return /* @__PURE__ */ import_react91.default.createElement(
          "a",
          {
            ...props,
            onClick: createClickHandlerFn(props.href),
            rel: "noopener noreferrer",
            className: cssClasses.link
          },
          children
        );
      }
    };
  }, [
    cssClasses,
    onLinkClick
  ]);
  return /* @__PURE__ */ import_react91.default.createElement(
    import_react_markdown.default,
    {
      className: cssClasses.container,
      children: content,
      remarkPlugins: unifiedPlugins.remark,
      rehypePlugins: unifiedPlugins.rehype,
      components
    }
  );
}

// src/components/GenerativeDirectAnswer.tsx
var import_react92 = __toESM(require("react"));
var builtInCssClasses23 = {
  container: "p-6 border border-gray-200 rounded-lg shadow-sm",
  header: "text-xl",
  answerText: "mt-4 prose",
  divider: "border-b border-gray-200 w-full pb-6 mb-6",
  citationsContainer: "mt-4 flex overflow-x-auto gap-4",
  citation: "p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-100 flex flex-col grow-0 shrink-0 basis-64 text-sm text-neutral overflow-x-auto cursor-pointer hover:border-indigo-500",
  citationTitle: "font-bold",
  citationSnippet: "line-clamp-2 text-ellipsis break-words"
};
function GenerativeDirectAnswer({
  customCssClasses,
  answerHeader,
  citationsHeader,
  CitationCard,
  CitationsContainer = Citations
}) {
  const cssClasses = useComposedCssClasses(builtInCssClasses23, customCssClasses);
  const isUniversal = (0, import_search_headless_react37.useSearchState)((state) => state.meta.searchType) === import_search_headless_react37.SearchTypeEnum.Universal;
  const universalResults = (0, import_search_headless_react37.useSearchState)((state) => state.universal);
  const verticalResults = (0, import_search_headless_react37.useSearchState)((state) => state.vertical);
  const searchId = (0, import_search_headless_react37.useSearchState)((state) => state.meta.uuid);
  const searchResults = import_react92.default.useMemo(() => {
    if (isUniversal) {
      return universalResults.verticals?.flatMap((v) => v.results);
    } else {
      return verticalResults.results;
    }
  }, [isUniversal, universalResults, verticalResults]);
  const lastExecutedSearchResults = (0, import_react92.useRef)(void 0);
  const searchActions = (0, import_search_headless_react37.useSearchActions)();
  const gdaResponse = (0, import_search_headless_react37.useSearchState)((state) => state.generativeDirectAnswer?.response);
  const isLoading = (0, import_search_headless_react37.useSearchState)((state) => state.generativeDirectAnswer?.isLoading);
  const handleClickEvent = useReportClickEvent();
  import_react92.default.useEffect(() => {
    if (!searchResults?.length || !searchId || searchResults === lastExecutedSearchResults.current) {
      return;
    }
    executeGenerativeDirectAnswer(searchActions);
    lastExecutedSearchResults.current = searchResults;
  }, [searchResults, searchId]);
  if (!searchResults?.length || isLoading || !gdaResponse || gdaResponse.resultStatus !== "SUCCESS") {
    return null;
  }
  return /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.container }, /* @__PURE__ */ import_react92.default.createElement(
    Answer,
    {
      gdaResponse,
      cssClasses,
      answerHeader,
      linkClickHandler: handleClickEvent
    }
  ), /* @__PURE__ */ import_react92.default.createElement(
    CitationsContainer,
    {
      gdaResponse,
      cssClasses,
      searchResults,
      citationsHeader,
      CitationCard,
      citationClickHandler: handleClickEvent
    }
  ));
}
function Answer(props) {
  const {
    gdaResponse,
    cssClasses,
    answerHeader,
    linkClickHandler
  } = props;
  const { t } = (0, import_react_i18next24.useTranslation)();
  const markdownCssClasses = (0, import_react92.useMemo)(
    () => ({
      container: cssClasses.answerText
    }),
    [cssClasses.answerText]
  );
  return /* @__PURE__ */ import_react92.default.createElement(import_react92.default.Fragment, null, /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.header }, answerHeader ?? t("aiGeneratedAnswer")), /* @__PURE__ */ import_react92.default.createElement(
    Markdown,
    {
      content: gdaResponse.directAnswer,
      onLinkClick: (destinationUrl) => destinationUrl && linkClickHandler?.({ destinationUrl }),
      customCssClasses: markdownCssClasses
    }
  ));
}
function Citations(props) {
  const {
    gdaResponse,
    cssClasses,
    searchResults,
    citationsHeader,
    CitationCard = Citation,
    citationClickHandler
  } = props;
  const { t } = (0, import_react_i18next24.useTranslation)();
  const citationResults = import_react92.default.useMemo(() => {
    let citationIds = new Set(gdaResponse.citations);
    return searchResults.filter((result) => {
      const { uid, name } = result.rawData ?? {};
      const dataIsInvalid = !uid || !name || typeof name != "string" || typeof uid != "string";
      if (dataIsInvalid || !citationIds.has(uid)) {
        return false;
      }
      citationIds.delete(uid);
      return true;
    });
  }, [gdaResponse.citations, searchResults]);
  const count = citationResults.length;
  if (!count) {
    return null;
  }
  return /* @__PURE__ */ import_react92.default.createElement(import_react92.default.Fragment, null, /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.divider }), /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.header }, citationsHeader ?? t("sources", { count })), /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.citationsContainer }, citationResults.map((r, i) => /* @__PURE__ */ import_react92.default.createElement(CitationCard, { key: i, searchResult: r, cssClasses, citationClickHandler }))));
}
function Citation(props) {
  const {
    searchResult,
    cssClasses,
    citationClickHandler
  } = props;
  const { name, description, answer, link } = searchResult.rawData ?? {};
  const citationTitle = String(name ?? "");
  const citationSnippet = String(description ?? answer ?? "");
  const citationUrl = typeof link === "string" ? link : void 0;
  return /* @__PURE__ */ import_react92.default.createElement(
    "a",
    {
      className: cssClasses.citation,
      href: citationUrl,
      onClick: () => citationUrl && citationClickHandler?.({ searchResult, destinationUrl: citationUrl })
    },
    /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.citationTitle }, citationTitle),
    /* @__PURE__ */ import_react92.default.createElement("div", { className: cssClasses.citationSnippet }, citationSnippet)
  );
}
function useReportClickEvent() {
  const reportAnalyticsEvent = useCardAnalytics();
  return import_react92.default.useCallback((data) => {
    if (data.searchResult) {
      reportAnalyticsEvent(data, "CITATION_CLICK");
    } else {
      reportAnalyticsEvent(data, "CTA_CLICK");
    }
  }, [reportAnalyticsEvent]);
}

// src/components/SearchI18nextProvider.tsx
var import_react93 = __toESM(require("react"));
var import_react_i18next25 = require("react-i18next");
function SearchI18nextProvider(props) {
  const { searcher, translationOverrides, children } = props;
  import_react93.default.useEffect(() => {
    translationOverrides && Object.entries(translationOverrides).forEach(([locale, translation]) => {
      i18nInstance.addResourceBundle(locale, "search-ui-react", translation, true, true);
    });
    i18nInstance.changeLanguage(searcher.state.meta.locale);
    searcher.addListener({
      valueAccessor: (state) => state.meta.locale,
      callback: (locale) => {
        i18nInstance.changeLanguage(locale);
      }
    });
  }, []);
  return /* @__PURE__ */ import_react93.default.createElement(import_react_i18next25.I18nextProvider, { i18n: i18nInstance }, children);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  GenerativeDirectAnswer,
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
  SearchI18nextProvider,
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
  executeGenerativeDirectAnswer,
  executeSearch,
  getSearchIntents,
  getUserLocation,
  i18nInstance,
  isCtaData,
  renderHighlightedValue,
  updateLocationIfNeeded,
  useAnalytics,
  useCardAnalyticsCallback,
  useCardFeedbackCallback,
  useComposedCssClasses
});
//# sourceMappingURL=index.js.map