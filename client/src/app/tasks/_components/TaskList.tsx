import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react"
import { primaryButtonStyles } from "@/components/ui/button-styles"
import type { Task } from "../dto/task.dto"
import { TaskCard } from "./TaskCard"
import { TaskCardSkeleton } from "./TaskCardSkeleton"

interface Props {
  tasks: Task[]
  loading: boolean
  error: string | null
  onCreateTask: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  onToggleTaskStatus: (task: Task, completed: boolean) => void
}

export function TaskList({
  tasks,
  loading,
  error,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
}: Readonly<Props>) {
  const skeletonkeys = ["task1", "task2", "task3", "task4", "task5"]
  if (loading) {
    return (
      <Stack gap={{ base: 3.5, md: 3 }}>
        {skeletonkeys.map((key) => (
          <TaskCardSkeleton key={key} />
        ))}
      </Stack>
    )
  }

  if (error) {
    return (
      <Flex
        justify="center"
        align="center"
        h="52"
        px={{ base: 4, md: 5 }}
        border="1px solid"
        borderColor="#efc0bf"
        rounded="2xl"
        bg="#fff5f5"
      >
        <Text fontSize="sm" color="#a63b37" fontWeight="500" textAlign="center">
          {error}
        </Text>
      </Flex>
    )
  }

  if (tasks.length === 0) {
    return (
      <Flex
        justify="center"
        align="center"
        h="56"
        direction="column"
        gap={{ base: 3.5, md: 4 }}
        px={{ base: 4, md: 6 }}
        border="1px dashed"
        borderColor="var(--outline)"
        rounded="2xl"
        bg="#fffcf6"
      >
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="700" color="var(--ink)">
            No tasks yet
          </Text>
          <Text fontSize="sm" color="var(--muted)" mt={1}>
            Create your first task to start your weekly learning rhythm
          </Text>
        </Box>
        <Button
          bg="var(--accent)"
          color="white"
          onClick={onCreateTask}
          _hover={{ bg: "#0b615a" }}
          {...primaryButtonStyles}
        >
          + New Task
        </Button>
      </Flex>
    )
  }

  return (
    <Stack gap={{ base: 3.5, md: 3 }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task)}
          onToggleStatus={(completed) => onToggleTaskStatus(task, completed)}
        />
      ))}
    </Stack>
  )
}
