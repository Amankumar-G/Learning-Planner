"use client"

import apiClient from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Task, TasksResponse } from "../dto/task.dto"

interface TaskPayload {
  title: string
  description: string
}

interface UpdateTaskPayload extends TaskPayload {
  id: number
}

const TASKS_QUERY_KEY = ["tasks"] as const

async function createTask(payload: TaskPayload): Promise<Task> {
  const { data } = await apiClient.post<Task>("/tasks", payload)
  return data
}

async function updateTask(payload: UpdateTaskPayload): Promise<Task> {
  const { id, ...body } = payload
  const { data } = await apiClient.put<Task>(`/tasks/${id}`, body)
  return data
}

async function deleteTask(id: number): Promise<{ message: string }> {
  const { data } = await apiClient.delete<{ message: string }>(`/tasks/${id}`)
  return data
}

function safelyIncrementTotal(value: number): number {
  return Number.isFinite(value) ? value + 1 : 1
}

function safelyDecrementTotal(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value - 1) : 0
}

export function useTaskMutations() {
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY })
      const previous = queryClient.getQueryData<TasksResponse>(TASKS_QUERY_KEY)

      if (previous) {
        const optimisticTask: Task = {
          id: -Date.now(),
          title: payload.title,
          description: payload.description || null,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 0,
        }

        queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
          ...previous,
          data: [optimisticTask, ...previous.data],
          meta: {
            ...previous.meta,
            total: safelyIncrementTotal(previous.meta.total),
          },
        })
      }

      return { previous }
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous)
      }
    },
    onSuccess: (serverTask) => {
      const current = queryClient.getQueryData<TasksResponse>(TASKS_QUERY_KEY)
      if (!current) {
        return
      }

      const firstOptimisticIndex = current.data.findIndex((task) => task.id < 0)

      if (firstOptimisticIndex !== -1) {
        const nextData = [...current.data]
        nextData[firstOptimisticIndex] = serverTask
        queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
          ...current,
          data: nextData,
        })
        return
      }

      queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
        ...current,
        data: [serverTask, ...current.data],
        meta: {
          ...current.meta,
          total: safelyIncrementTotal(current.meta.total),
        },
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY })
      const previous = queryClient.getQueryData<TasksResponse>(TASKS_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
          ...previous,
          data: previous.data.map((task) =>
            task.id === payload.id
              ? {
                  ...task,
                  title: payload.title,
                  description: payload.description || null,
                }
              : task,
          ),
        })
      }

      return { previous }
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous)
      }
    },
    onSuccess: (serverTask) => {
      const current = queryClient.getQueryData<TasksResponse>(TASKS_QUERY_KEY)
      if (!current) {
        return
      }

      queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
        ...current,
        data: current.data.map((task) => (task.id === serverTask.id ? serverTask : task)),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY })
      const previous = queryClient.getQueryData<TasksResponse>(TASKS_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<TasksResponse>(TASKS_QUERY_KEY, {
          ...previous,
          data: previous.data.filter((task) => task.id !== taskId),
          meta: {
            ...previous.meta,
            total: safelyDecrementTotal(previous.meta.total),
          },
        })
      }

      return { previous }
    },
    onError: (_error, _taskId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
