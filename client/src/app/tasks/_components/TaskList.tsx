import { Box, Button, Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import type { Task } from "../dto/task.dto"
import { TaskCard } from "./TaskCard"

interface Props {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export function TaskList({ tasks, loading, error }: Readonly<Props>) {
  if (loading) {
    return (
      <Flex justify="center" align="center" h="52">
        <Spinner size="md" color="blue.400" borderWidth="2px" />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="52">
        <Text fontSize="sm" color="red.400">{error}</Text>
      </Flex>
    )
  }

  if (tasks.length === 0) {
    return (
      <Flex justify="center" align="center" h="52" direction="column" gap={4}>
        <Box textAlign="center">
          <Text fontSize="sm" fontWeight="500" color="gray.700">No tasks yet</Text>
          <Text fontSize="xs" color="gray.400" mt={1}>Create your first task to get started</Text>
        </Box>
        <Button size="sm" colorPalette="blue" variant="outline" rounded="full" px={5}>
          + New Task
        </Button>
      </Flex>
    )
  }

  return (
    <Stack gap={2}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}
