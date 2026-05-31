// we need both : typescript types: compile time safety
// constant array: runtime validation


import type { MemoryCategory, MemoryStatus, ImportanceScore } from "../types/memory";

export const MEMORY_CATEGORIES = [
    "personal",
    "work",
    "learning",
    "idea",
    "task",
    "reflection",
    "unknown"
] as const satisfies readonly MemoryCategory[];

export const MEMORY_STATUSES = [
    "active",
    "archived",
    "deleted"
] as const satisfies readonly MemoryStatus[]; // satisfies means - keep the exact literal values, but verify every item belongs to MemoryStatus type, and readonly means - typescript will prevent mutation during development/type checking

export const IMPORTANCE_SCORES = [1, 2, 3, 4, 5] as const satisfies readonly ImportanceScore[];

export const DEFAULT_MEMORY_CATEGORY: MemoryCategory = "unknown";

export const DEFAULT_MEMORY_STATUS: MemoryStatus = "active";

export const DEFAULT_IMPORTANCE_SCORE: ImportanceScore = 3;

export const MEMORY_LIMITS = {
  minTitleLength: 3,
  maxTitleLength: 120,
  minContentLength: 1,
  maxContentLength: 5000,
  maxTags: 10,
  maxTagLength: 40
} as const;


export const MEMORY_CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  learning: "Learning",
  idea: "Idea",
  task: "Task",
  reflection: "Reflection",
  unknown: "Unknown"
} satisfies Record<MemoryCategory, string>; // for every valid memory category, there must be one label