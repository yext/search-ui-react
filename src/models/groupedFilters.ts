import { DisplayableFilter } from "@yext/answers-headless-react";

export interface GroupedFilters {
  staticFilters?: DisplayableFilter[],
  facets?: DisplayableFilter[],
  nlpFilters?: DisplayableFilter[]
}