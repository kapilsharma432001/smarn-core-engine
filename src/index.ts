import {
  archiveMemory,
  createMemory,
  deleteMemory,
  getAllMemories,
  getMemoryById,
  updateMemory
} from "./services/memoryService";

const allMemoriesResult = getAllMemories();

if (allMemoriesResult.success) {
  console.log("Total Memories:", allMemoriesResult.data.length);
};

const singleMemoryResult = getMemoryById("mem_1");

if (singleMemoryResult.success) {
  console.log("Memory Details:", singleMemoryResult.data.title);
}
else {
  console.error("Error fetching memory:", singleMemoryResult.error.message);
}

const createResult = createMemory({
  title: "Practice TypeScript services",
  content: "Build memory service functions with ApiResult pattern.",
  category: "learning",
  tags: ["typescript", "service-layer"],
  importanceScore: 4
});

if (createResult.success) {
  console.log("Created memory:", createResult.data.title);
}

const updateResult = updateMemory("mem_1", {
  title: "Learn TypeScript deeply - updated"
});

if (updateResult.success) {
  console.log("Updated memory:", updateResult.data.title);
}

const archiveResult = archiveMemory("mem_2");

if (archiveResult.success) {
  console.log("Archived memory:", archiveResult.data.id);
}

const deleteResult = deleteMemory("mem_3");

if (deleteResult.success) {
  console.log("Deleted memory:", deleteResult.data.id);
}

const missingResult = getMemoryById("wrong_id");

if (!missingResult.success) {
  console.log("Expected error:", missingResult.error.message);
}


