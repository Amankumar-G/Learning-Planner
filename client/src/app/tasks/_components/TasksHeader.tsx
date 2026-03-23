import { Button, Flex, Heading, Text } from "@chakra-ui/react"

interface Props {
  taskCount: number
  loading: boolean
}

export function TasksHeader({ taskCount, loading }: Readonly<Props>) {
  return (
    <Flex mb={8} align="center" justify="space-between">
      <Flex direction="column" gap={0.5}>
        <Heading size="xl" fontWeight="700" letterSpacing="-0.5px" color="gray.900">
          My Tasks
        </Heading>
        <Text fontSize="sm" color="gray.400">
          {loading ? "Loading…" : `${taskCount} task${taskCount === 1 ? "" : "s"}`}
        </Text>
      </Flex>

      <Button
        size="sm"
        colorPalette="blue"
        rounded="full"
        px={5}
        fontWeight="500"
        fontSize="sm"
      >
        + New Task
      </Button>
    </Flex>
  )
}
