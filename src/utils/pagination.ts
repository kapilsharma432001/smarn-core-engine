import type { PaginationOptions } from "../types/filters";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export type PaginatedResult<T> = {
    data: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

function normalizePositiveInteger(value: number | undefined, fallback: number): number {
    if (value === undefined){
        return fallback;
    }

    if(!Number.isFinite(value)){
        return fallback;
    }

    if (value < 1){
        return fallback;
    }
    return Math.floor(value);
}

// Partial T means take a type T and make all its properties optional
// optional: Partial<PaginationOptions> = {} means options can contain some, all or none of the properties from PaginationOptions

export function paginate<T>(
    items: T[],
    options: Partial<PaginationOptions> = {}
): PaginatedResult<T> {
    const page = normalizePositiveInteger(options.page, DEFAULT_PAGE);
    const requestedPageSize = normalizePositiveInteger(options.pageSize, DEFAULT_PAGE_SIZE);

    const pageSize = Math.min(requestedPageSize, MAX_PAGE_SIZE);
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const data = items.slice(startIndex, endIndex);

    return {
        data,
        page: safePage,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1
    };
} 