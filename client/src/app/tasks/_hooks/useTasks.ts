"use client"

import apiClient from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import type { TasksResponse } from "../dto/task.dto"

async function getTasks(): Promise<TasksResponse> {
  const { data } = await apiClient.get<TasksResponse>("/tasks")
  return data
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  })
}
