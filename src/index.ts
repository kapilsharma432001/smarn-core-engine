import { seedMemories } from "./data/seedMemories";

console.log("Total seed memories:", seedMemories.length);

for (const memory of seedMemories) {
  console.log(`${memory.id} -  Memory: ${memory.title} Status: ${memory.status})`);
}