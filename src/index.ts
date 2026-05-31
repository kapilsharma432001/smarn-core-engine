import type {ApiResult} from "./types/api";
import type { Memory } from "./types/memory";

const memory: Memory = {
  id: "mem_1",
  title: "Learn TypeScript deeply",
  content: "Build SMARN Core Engine one module at a time.",
  category: "learning",
  tags: ["typescript", "smarn", "frontend"],
  status: "active",
  importanceScore: 5,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const successResult: ApiResult<Memory> = {
  success: true,
  data: memory,
  meta: {
    requestId: "req_12345",
    timestamp: new Date().toISOString()
  }
};

const errorResult: ApiResult<Memory> = {
  success: false,
  error: {
    code: "MEMORY_NOT_FOUND",
    message: "The requested memory was not found.",
    details: {
      memoryId: ["The memory with the given ID does not exist."]
    }
  }
};

function printMemoryResult(result: ApiResult<Memory>): void {
    if (result.success) {
        console.log("Memory found:", result.data);
        console.log("Request metadata:", result.meta);
    } else {
        console.error("Error:", result.error.message);
    }
}

printMemoryResult(successResult);
printMemoryResult(errorResult);