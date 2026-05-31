/*
The logic is simple:-
1. Keep an internal array
2. Read from that array
3. Add new memory to that array
4. Archive memory by changing the status
5. Delete memory by changing status to 'deleted'
6. Update memory by 'id'
7. Return ApiResult<T> from every function
*/

import type { Memory, CreateMemoryInput, UpdateMemoryInput, MemoryId } from "../types/memory";
import { seedMemories } from "../data/seedMemories";
import type { ApiResult } from "../types/api";
import { DEFAULT_IMPORTANCE_SCORE, DEFAULT_MEMORY_CATEGORY, DEFAULT_MEMORY_STATUS } from "../constants/memoryConstants";


let memories: Memory[] = [...seedMemories]; // using spread operator here

function generateMemoryId(): MemoryId {
    return `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}


export function getAllMemories(): ApiResult<Memory[]>{
    return {
        success: true,
        data: [...memories]
    }
}

export function getMemoryById(id: MemoryId): ApiResult<Memory> {
    const memory = memories.find((currentMemory) => currentMemory.id === id);

    if (!memory){
        return {
            success: false,
            error: {
                code: "MEMORY_NOT_FOUND",
                message: `Memory with id ${id} not found`
            }
        }
    }
    return {
        success: true,
        data: memory
    }
}



export function createMemory(input: CreateMemoryInput): ApiResult<Memory> {
    const now = new Date().toISOString();

    const newMemory: Memory = {
        id: generateMemoryId(),
        title: input.title,
        content: input.content,
        category: input.category ?? DEFAULT_MEMORY_CATEGORY, // if category is not provided, use default
        tags: input.tags ?? [],
        status: DEFAULT_MEMORY_STATUS,
        importanceScore: input.importanceScore ?? DEFAULT_IMPORTANCE_SCORE,
        createdAt: now,
        updatedAt: now
    };

    memories = [newMemory, ...memories]; // add new memory to the beginning of the array
    
    return {
        success: true,
        data: newMemory
    }
}

export function updateMemory(id: MemoryId, input: UpdateMemoryInput): ApiResult<Memory> {
    const existingMemory = memories.find((memory) => memory.id === id);
    
    if (!existingMemory) {
        return {
            success: false,
            error: {
                code: "MEMORY_NOT_FOUND",
                message: `Memory with id ${id} not found`
            }
        }
    }

    if (existingMemory.status === "deleted") {
        return {
            success: false,
            error: {
                code: "MEMORY_ALREADY_DELETED",
                message: `Memory with id ${id} is deleted and cannot be updated`
            }
        }
    }

    const updatedMemory: Memory = {
        ...existingMemory, // copies the full memory object first and then do the update of the fields that user has sent
        title: input.title ?? existingMemory.title,
        content: input.content ?? existingMemory.content,
        category: input.category ?? existingMemory.category,
        tags: input.tags ?? existingMemory.tags,
        status: input.status ?? existingMemory.status,
        importanceScore: input.importanceScore ?? existingMemory.importanceScore,
        updatedAt: new Date().toISOString()
    };

    memories = memories.map((memory) => memory.id === id ? updatedMemory : memory); // go through every memory and if memory.id = input id then replace that with updatedMemoty else keep the old one
    return {
        success: true,
        data: updatedMemory
    }
}


export function archiveMemory(id: MemoryId): ApiResult<Memory> {
    return updateMemory(id, { status: "archived" });
}

export function deleteMemory(id: MemoryId): ApiResult<Memory> {

    const existingMemory = memories.find((memory) => memory.id === id);

    if (!existingMemory) {
    return {
      success: false,
      error: {
        code: "MEMORY_NOT_FOUND",
        message: `Memory with id "${id}" was not found.`
      }
    };
  }

  if (existingMemory.status === "deleted") {
    return {
      success: false,
      error: {
        code: "MEMORY_ALREADY_DELETED",
        message: `Memory with id "${id}" is already deleted.`
      }
    };
  }

    return updateMemory(id, { status: "deleted" });
}


export function restoreMemory(id: MemoryId): ApiResult<Memory> {
  const existingMemory = memories.find((memory) => memory.id === id);

  if (!existingMemory) {
    return {
      success: false,
      error: {
        code: "MEMORY_NOT_FOUND",
        message: `Memory with id "${id}" was not found.`
      }
    };
  }

  if (existingMemory.status === "active") {
    return {
      success: true,
      data: existingMemory
    };
  }

  const restoredMemory: Memory = {
    ...existingMemory,
    status: "active",
    updatedAt: new Date().toISOString()
  };

  memories = memories.map((memory) =>
    memory.id === id ? restoredMemory : memory
  );

  return {
    success: true,
    data: restoredMemory
  };
}