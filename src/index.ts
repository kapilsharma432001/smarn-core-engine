import {
  DEFAULT_IMPORTANCE_SCORE,
  DEFAULT_MEMORY_CATEGORY,
  DEFAULT_MEMORY_STATUS,
  IMPORTANCE_SCORES,
  MEMORY_CATEGORIES,
  MEMORY_LIMITS,
  MEMORY_STATUSES
} from "./constants/memoryConstants";

console.log("Memory categories:", MEMORY_CATEGORIES);
console.log("Memory statuses:", MEMORY_STATUSES);
console.log("Importance scores:", IMPORTANCE_SCORES);

console.log("Defaults:", {
  category: DEFAULT_MEMORY_CATEGORY,
  status: DEFAULT_MEMORY_STATUS,
  importanceScore: DEFAULT_IMPORTANCE_SCORE
});

console.log("Memory limits:", MEMORY_LIMITS);