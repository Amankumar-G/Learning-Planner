"use client"

import apiClient from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import type { Task, TasksResponse } from "../dto/task.dto"

// --- Static data (remove once API is connected) ---
const STATIC_TASKS: Task[] = [
  {
    id: 1,
    title: "Learn Next.js App Router",
    description: "Study layouts, server components, and data fetching patterns.",
    completed: false,
    createdAt: "2026-03-20T10:00:00.000Z",
    updatedAt: "2026-03-20T10:00:00.000Z",
    userId: 1,
  },
  {
    id: 2,
    title: "Set up Prisma schema",
    description: "Define Task and User models with relations.",
    completed: true,
    createdAt: "2026-03-18T09:00:00.000Z",
    updatedAt: "2026-03-19T11:00:00.000Z",
    userId: 1,
  },
  {
    id: 3,
    title: "Implement JWT authentication",
    description: "Add login, registration and protected routes.",
    completed: true,
    createdAt: "2026-03-17T08:00:00.000Z",
    updatedAt: "2026-03-18T14:00:00.000Z",
    userId: 1,
  },
  {
    id: 4,
    title: "Build task list UI",
    description: "Create the tasks page with Chakra UI components.",
    completed: false,
    createdAt: "2026-03-21T12:00:00.000Z",
    updatedAt: "2026-03-21T12:00:00.000Z",
    userId: 1,
  },
  {
    id: 5,
    title: "Write API integration tests",
    description: null,
    completed: false,
    createdAt: "2026-03-22T15:00:00.000Z",
    updatedAt: "2026-03-22T15:00:00.000Z",
    userId: 1,
  },
]

async function getTasks(): Promise<TasksResponse> {
  const { data } = await apiClient.get<TasksResponse>("/tasks")
  return data
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    // Remove this initialData once API is connected
    initialData: { data: STATIC_TASKS, total: STATIC_TASKS.length, page: 1, limit: 10 },
  })
}
