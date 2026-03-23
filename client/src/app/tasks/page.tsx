"use client"

import { Box } from "@chakra-ui/react"
import { TaskList } from "./_components/TaskList"
import { TasksHeader } from "./_components/TasksHeader"
import { useTasks } from "./_hooks/useTasks"

export default function TasksPage() {
  const { data, isLoading, error } = useTasks()

  const tasks = data?.data ?? []
  const errorMessage = error ? (error as Error).message : null

  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 5, md: 10 }} py={10} maxW="5xl" mx="auto">
      <TasksHeader taskCount={tasks.length} loading={isLoading} />
      <TaskList tasks={tasks} loading={isLoading} error={errorMessage} />
    </Box>
  )
}
