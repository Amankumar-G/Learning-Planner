"use client"

import { Box } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { useMemo, useState } from "react"
import { TaskModal } from "./_components/TaskModal"
import { TaskList } from "./_components/TaskList"
import { TasksHeader } from "./_components/TasksHeader"
import { useTaskMutations } from "./_hooks/useTaskMutations"
import { useTasks } from "./_hooks/useTasks"
import type { Task } from "./dto/task.dto"
import type { TaskFormValues } from "./_utils/taskValidation"

type ModalMode = "create" | "edit" | "delete" | null

export default function TasksPage() {
  const { data, isLoading, error } = useTasks()
  const tasks = data?.data ?? []
  const {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    toggleTaskStatusMutation,
  } = useTaskMutations()

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

  const errorMessage = error ? (error as Error).message : null

  const isModalOpen = modalMode !== null

  const isPending = useMemo(() => {
    if (modalMode === "create") {
      return createTaskMutation.isPending
    }

    if (modalMode === "edit") {
      return updateTaskMutation.isPending
    }

    if (modalMode === "delete") {
      return deleteTaskMutation.isPending
    }

    return false
  }, [
    createTaskMutation.isPending,
    deleteTaskMutation.isPending,
    modalMode,
    updateTaskMutation.isPending,
  ])

  function closeModal() {
    setModalMode(null)
    setSelectedTask(undefined)
  }

  function openCreateModal() {
    setSelectedTask(undefined)
    setModalMode("create")
  }

  function openEditModal(task: Task) {
    setSelectedTask(task)
    setModalMode("edit")
  }

  function openDeleteModal(task: Task) {
    setSelectedTask(task)
    setModalMode("delete")
  }

  async function handleCreateTask(values: TaskFormValues) {
    await createTaskMutation.mutateAsync(values)
    toaster.create({ title: "Task created", type: "success" })
  }

  async function handleEditTask(taskId: number, values: TaskFormValues) {
    await updateTaskMutation.mutateAsync({ id: taskId, ...values })
    toaster.create({ title: "Task updated", type: "success" })
  }

  async function handleDeleteTask(taskId: number) {
    await deleteTaskMutation.mutateAsync(taskId)
    toaster.create({ title: "Task deleted", type: "success" })
  }

  async function handleToggleTaskStatus(task: Task, completed: boolean) {
    try {
      await toggleTaskStatusMutation.mutateAsync({ id: task.id, completed })
      toaster.create({
        title: completed ? "Task marked completed" : "Task marked pending",
        type: "success",
      })
    } catch (error) {
      toaster.create({
        title: "Status update failed",
        description: error instanceof Error ? error.message : "Something went wrong.",
        type: "error",
      })
    }
  }

  return (
    <Box minH="100vh" px={{ base: 4, md: 8, xl: 10 }} py={{ base: 6, md: 9, xl: 10 }}>
      <Box
        maxW="5xl"
        mx="auto"
        className="grain-surface fade-up"
        bg="var(--surface)"
        border="1px solid"
        borderColor="var(--outline)"
        rounded={{ base: "2xl", md: "3xl" }}
        p={{ base: 4, md: 7, xl: 8 }}
        shadow="0 22px 52px rgba(31, 41, 51, 0.07)"
      >
        <TasksHeader
          taskCount={tasks.length}
          loading={isLoading}
          onCreateTask={openCreateModal}
        />
        <TaskList
          tasks={tasks}
          loading={isLoading}
          error={errorMessage}
          onCreateTask={openCreateModal}
          onEditTask={openEditModal}
          onDeleteTask={openDeleteModal}
          onToggleTaskStatus={handleToggleTaskStatus}
        />
      </Box>

      {modalMode && (
        <TaskModal
          open={isModalOpen}
          mode={modalMode}
          task={selectedTask}
          isPending={isPending}
          onClose={closeModal}
          onCreate={handleCreateTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </Box>
  )
}
