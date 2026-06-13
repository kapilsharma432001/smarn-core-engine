// we need - search memories by text, filter by category, status, tags, list view, sort results etc.
// Logic for search service:-
// 1. Get all memories from memoryService
// 2. Apply view filter
// 3. Apply catgory/status/tags/searchText filters
// 4. Apply sorting
// 5. Return results in ApiResult<T> format
// we will not do pagination - for now, search service is filtering + sorting

import type { ApiResult } from "../types/api";

import type {
  Memory,
  MemoryCategory,
  MemoryStatus
} from "../types/memory";

import type {
  MemoryFilters,
  MemoryListView,
  MemoryQueryOptions,
  MemorySortOptions
} from "../types/filters";

import { getAllMemories } from "./memoryService";

function applyViewFilter(memories: Memory[], view: MemoryListView | undefined): Memory[] {
    if (!view || view === "all") {
        return memories;
    }
    return memories.filter((memory) => memory.status === view);
}

function applyCategoryFilter(memories: Memory[], category: MemoryCategory | undefined): Memory[] {
    if (!category) {
        return memories;
    }
    return memories.filter((memory) => memory.category === category);
}

function applyStatusFilter(memories: Memory[], status: MemoryStatus | undefined): Memory[] {
    if (!status) {
        return memories;
    }
    return memories.filter((memory) => memory.status === status);
}

function applyTagsFilter(memories: Memory[], tags: string[] | undefined): Memory[] {
    if (!tags || tags.length === 0) {
        return memories;
    }

    // return memories that contains all requested tags
    return memories.filter((memory) => tags.every(tag => memory.tags.includes(tag)));
}


function applySearchTextFilter(
  memories: Memory[],
  searchText: string | undefined
): Memory[] {
  if (!searchText) {
    return memories;
  }

  const normalizedSearchText = searchText.trim().toLowerCase();

  if (!normalizedSearchText) {
    return memories;
  }

  return memories.filter((memory) => {
    const searchableText = [
      memory.title,
      memory.content,
      memory.category,
      memory.status,
      ...memory.tags
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchText);
  });
}

function applyFilters(
    memories: Memory[],
    filters: MemoryFilters | undefined
): Memory[] {
    if (!filters) {
        return memories;
    }

    let filteredMemories = memories;
    
    filteredMemories = applyCategoryFilter(filteredMemories, filters.category);
    filteredMemories = applyStatusFilter(filteredMemories, filters.status);
    filteredMemories = applyTagsFilter(filteredMemories, filters.tags);
    filteredMemories = applySearchTextFilter(filteredMemories, filters.searchText);

    return filteredMemories;
}


function applySorting(memories: Memory[], sort: MemorySortOptions | undefined): Memory[] {
    const sortOptions: MemorySortOptions = sort ?? { sortBy: "createdAt", sortDirection: "desc" }; 
    
    return [...memories].sort((firstMemory, secondMemory) => {
        const firstValue = firstMemory[sortOptions.sortBy];
        const secondValue = secondMemory[sortOptions.sortBy];

        if (firstValue < secondValue) {
            return sortOptions.sortDirection === "asc" ? -1 : 1;
        }

        if (firstValue > secondValue) {
            return sortOptions.sortDirection === "asc" ? 1 : -1;
        }
        
        return 0;
    });
}

export function searchMemories(
  options: MemoryQueryOptions = {}
): ApiResult<Memory[]> {
  const allMemoriesResult = getAllMemories();

  if (!allMemoriesResult.success) {
    return allMemoriesResult;
  }

  let result = allMemoriesResult.data;

  result = applyViewFilter(result, options.view);
  result = applyFilters(result, options.filters);
  result = applySorting(result, options.sort);

  return {
    success: true,
    data: result
  };
}
