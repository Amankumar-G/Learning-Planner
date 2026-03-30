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
      <Flex
        justify="center"
        align="center"
        h="52"
        direction="column"
        gap={3}
        border="1px dashed"
        borderColor="var(--outline)"
        rounded="2xl"
        bg="#fffcf6"
      >
        <Spinner size="md" color="var(--accent)" borderWidth="2px" />
        <Text fontSize="sm" color="var(--muted)">
          Syncing your tasks...
        </Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex
        justify="center"
        align="center"
        h="52"
        border="1px solid"
        borderColor="#efc0bf"
        rounded="2xl"
        bg="#fff5f5"
      >
        <Text fontSize="sm" color="#a63b37" fontWeight="500">
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
        gap={4}
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
          size="sm"
          bg="var(--accent)"
          color="white"
          rounded="full"
          px={5}
          _hover={{ bg: "#0b615a" }}
        >
          + New Task
        </Button>
      </Flex>
    )
  }

  return (
    <Stack gap={3}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}
