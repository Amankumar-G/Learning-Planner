"use client"

import apiClient from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import type { Task } from "../dto/task.dto"

async function getTask(id: number): Promise<Task> {
  const { data } = await apiClient.get<Task>(`/tasks/${id}`)
  return data
}

export function useTask(id: number) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  })
}
