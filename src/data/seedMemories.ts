// in real prod environment - this file will be replaced by database query, api calls, local storage, redis cache, postgres repo etc
// but for learning typescript, seed data is perfect
import type { Memory } from "../types/memory";

export const seedMemories = [
  {
    id: "mem_1",
    title: "Learn TypeScript deeply",
    content: "Build SMARN Core Engine one module at a time and understand production TypeScript patterns.",
    category: "learning",
    tags: ["typescript", "smarn", "frontend"],
    status: "active",
    importanceScore: 5,
    createdAt: "2026-05-31T10:00:00.000Z",
    updatedAt: "2026-05-31T10:00:00.000Z"
  },
  {
    id: "mem_2",
    title: "Prepare for system design interviews",
    content: "Revise API design, pagination, caching, queues, rate limiting, and database indexing.",
    category: "work",
    tags: ["system-design", "interview", "backend"],
    status: "active",
    importanceScore: 4,
    createdAt: "2026-05-30T18:30:00.000Z",
    updatedAt: "2026-05-30T18:30:00.000Z"
  },
  {
    id: "mem_3",
    title: "SMARN product idea",
    content: "Create a second-brain system that can remember, search, summarize, and analyze personal knowledge.",
    category: "idea",
    tags: ["product", "ai", "second-brain"],
    status: "active",
    importanceScore: 5,
    createdAt: "2026-05-29T09:15:00.000Z",
    updatedAt: "2026-05-29T09:15:00.000Z"
  },
  {
    id: "mem_4",
    title: "Meeting confidence reflection",
    content: "Stay calm in meetings, speak slowly, and focus on the problem instead of worrying about judgment.",
    category: "reflection",
    tags: ["confidence", "communication", "mindset"],
    status: "archived",
    importanceScore: 3,
    createdAt: "2026-05-28T21:45:00.000Z",
    updatedAt: "2026-05-29T08:00:00.000Z"
  },
  {
    id: "mem_5",
    title: "Old debugging note",
    content: "This note is marked deleted to test filtering and status-based analytics later.",
    category: "work",
    tags: ["debugging", "old-note"],
    status: "deleted",
    importanceScore: 2,
    createdAt: "2026-05-20T12:00:00.000Z",
    updatedAt: "2026-05-25T12:00:00.000Z"
  },
  {
    id: "mem_6",
    title: "Ordered Blue Tokai Coffee",
    content: "Ordered a bag of Blue Tokai coffee beans to try out different brewing methods at home.",
    category: "personal",
    tags: ["coffee", "brewing"],
    status: "active",
    importanceScore: 3,
    createdAt: "2026-05-21T12:00:00.000Z",
    updatedAt: "2026-05-26T12:00:00.000Z"
  },
  {
    id: "mem_7",
    title: "Need to fix race condition in the lambdas",
    content: "Need to fix race condition in the lambdas.",
    category: "task",
    tags: ["debugging"],
    status: "active",
    importanceScore: 4,
    createdAt: "2026-05-22T12:00:00.000Z",
    updatedAt: "2026-05-27T12:00:00.000Z"
  }
] satisfies Memory[];