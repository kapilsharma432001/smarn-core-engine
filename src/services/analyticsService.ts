import {
    MEMORY_CATEGORIES,
    MEMORY_STATUSES
} from '../constants/memoryConstants';

import type { ApiResult } from "../types/api";

import type {
  Memory,
  MemoryCategory,
  MemoryStatus
} from "../types/memory";

import { getAllMemories } from "./memoryService";

// create an object where every memory category is a key and every value is a number
export type CategoryCounts = Record<MemoryCategory, number>;

export type StatusCounts = Record<MemoryStatus, number>;

export type MemoryAnalytics = {
  total: number;
  byCategory: CategoryCounts;
  byStatus: StatusCounts;
  activeCount: number;
  archivedCount: number;
  deletedCount: number;
  highImportanceCount: number;
};

function createEmptyCategoryCounts(): CategoryCounts {
    const counts = {} as CategoryCounts;
    for (const category of MEMORY_CATEGORIES) {
        counts[category] = 0;
    }
    return counts;
}

function createEmptyStatusCounts(): StatusCounts {
  const counts = {} as StatusCounts;

  for (const status of MEMORY_STATUSES) {
    counts[status] = 0;
  }

  return counts;
}

export function countByCategory(memories: Memory[]): CategoryCounts {
    const counts = createEmptyCategoryCounts();

    for (const memory of memories) {
        counts[memory.category] += 1;
    }

    return counts;
}

export function countByStatus(memories: Memory[]): StatusCounts {
    const counts = createEmptyStatusCounts();

    for (const memory of memories) {
        counts[memory.status] += 1;
    }

    return counts;
}

export function getMemoryAnalytics(): ApiResult<MemoryAnalytics> {
    const memoriesResult = getAllMemories();

    if (!memoriesResult.success) {
        return memoriesResult;
    }

    const memories = memoriesResult.data;

    const byCategory = countByCategory(memories);
    const byStatus = countByStatus(memories);

    const highImportanceCount = memories.filter(memory => memory.importanceScore >= 4).length;

    return {
        success: true,
        data: {
            total: memories.length,
            byCategory,
            byStatus,
            activeCount: byStatus.active,
            archivedCount: byStatus.archived,
            deletedCount: byStatus.deleted,
            highImportanceCount
        }
    }
}


export function getTopCategories(
    limit: number
): ApiResult<Array<{ category: MemoryCategory; count: number }>> {
    const analyticsResult = getMemoryAnalytics();

    if (!analyticsResult.success) {
        return analyticsResult;
    }

    const byCategory = analyticsResult.data.byCategory;

    const sortedCategories = Object.entries(byCategory)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, limit)
        .map(([category, count]) => ({ category: category as MemoryCategory, count }));

    return {
        success: true,
        data: sortedCategories
    };
}



/**
 Understanding getTopCategories function:
Object.entries(byCategory) gives us
  [
  ["personal", 1],
  ["work", 3],
  ["learning", 5],
  ["idea", 2],
  ["task", 4],
  ["reflection", 1],
  ["unknown", 0]
]
Then we are doing sorting for descending order based on the count value, 
and then slicing the array to get the top 'limit' number of categories. -> .slice(0, 3) means take items from index 0 upto index 3 (excluding index 3)
Finally, we are mapping the array to return an array of objects with category and count properties. 
*/