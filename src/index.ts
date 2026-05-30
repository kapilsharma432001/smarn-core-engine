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

console.log(memory);