export type MemoryId = string;
export type MemoryCategory = "personal" | "work" | "learning" | "idea" | "task" | "reflection" | "unknown";
export type MemoryStatus = "active" | "archived" | "deleted";
export type ImportanceScore = 1 | 2 | 3 | 4 | 5;

export type Memory = {
    id: MemoryId;
    title: string;
    content: string;
    category: MemoryCategory;
    tags: string[];
    status: MemoryStatus;
    importanceScore: ImportanceScore;
    createdAt: string;
    updatedAt: string;
};

// while creating memory - the user should only provide title, content, category, tags and importanceScore
// and not the fields like createdAt, updatedAt

export type CreateMemoryInput = {
    title: string;
    content: string;
    category?: MemoryCategory;
    tags?: string[];
    importanceScore?: ImportanceScore;
};

// update memory input - it should contain everything as optional because update usually means partial update
// we should not force the user to caller to send the whole memory object, this is like HTTP PATCH
export type UpdateMemoryInput = {
    title?: string;
    content?: string;
    category?: MemoryCategory;
    tags?: string[];
    status?: MemoryStatus;
    importanceScore?: ImportanceScore;
};


export type MemorySummary = Pick<Memory, "id" | "title" | "category" | "tags" | "status" | "importanceScore" | "createdAt">;