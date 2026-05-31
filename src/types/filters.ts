import type {
    MemoryCategory,
    MemoryStatus
} from "./memory"

// all fields are optional because a user may search with only one condition
export type MemoryFilters = {
    category?: MemoryCategory,
    status?: MemoryStatus,
    tags?: string[],
    searchText?: string;
};

// we are not using a plain string here in "MemorySortBy" because this should be rejected: sortBy "randomField" - sorting should only happen on allowed fields
export type MemorySortBy = "createdAt" | "updatedAt" | "title" | "importanceScore";
export type SortDirection = "asc" | "desc";
export type MemoryListView = "all" | "active" | "archived" | "deleted";

export type MemorySortOptions = {
    sortBy: MemorySortBy;
    sortDirection: SortDirection;
};

export type PaginationOptions = {
    page: number;
    pageSize: number;
};

export type MemoryQueryOptions = {
    filters?: MemoryFilters;
    sort?: MemorySortOptions;
    pagination?: PaginationOptions;
    view?: MemoryListView;
};