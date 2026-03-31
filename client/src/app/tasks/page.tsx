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
    <Box minH="100vh" px={{ base: 5, md: 10 }} py={{ base: 7, md: 10 }}>
      <Box
        maxW="5xl"
        mx="auto"
        className="grain-surface fade-up"
        bg="var(--surface)"
        border="1px solid"
        borderColor="var(--outline)"
        rounded={{ base: "2xl", md: "3xl" }}
        p={{ base: 5, md: 8 }}
        shadow="0 22px 52px rgba(31, 41, 51, 0.07)"
      >
        <TasksHeader taskCount={tasks.length} loading={isLoading} />
        <TaskList tasks={tasks} loading={isLoading} error={errorMessage} />
      </Box>
    </Box>
  )
}
