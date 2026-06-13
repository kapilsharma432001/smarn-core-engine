import { searchMemories } from "./services/searchService";

const learningMemoriesResult = searchMemories({
  filters: {
    category: "learning"
  }
});

if (learningMemoriesResult.success) {
  console.log("Learning memories:");
  for (const memory of learningMemoriesResult.data) {
    console.log(`- ${memory.title}`);
  }
}

const activeTypeScriptMemoriesResult = searchMemories({
  view: "active",
  filters: {
    tags: ["typescript"],
    searchText: "engine"
  },
  sort: {
    sortBy: "importanceScore",
    sortDirection: "desc"
  }
});

if (activeTypeScriptMemoriesResult.success) {
  console.log("Active TypeScript engine memories:");
  for (const memory of activeTypeScriptMemoriesResult.data) {
    console.log(`- ${memory.title} (${memory.importanceScore})`);
  }
}

const archivedMemoriesResult = searchMemories({
  view: "archived",
  sort: {
    sortBy: "updatedAt",
    sortDirection: "desc"
  }
});

if (archivedMemoriesResult.success) {
  console.log("Archived memories:");
  for (const memory of archivedMemoriesResult.data) {
    console.log(`- ${memory.title}`);
  }
}