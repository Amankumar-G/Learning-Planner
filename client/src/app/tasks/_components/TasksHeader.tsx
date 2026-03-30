import { Badge, Button, Flex, Heading, Text } from "@chakra-ui/react"

interface Props {
  taskCount: number
  loading: boolean
}

export function TasksHeader({ taskCount, loading }: Readonly<Props>) {
  const taskPluralSuffix = taskCount === 1 ? "" : "s"
  const summaryText = loading
    ? "Loading your study plan..."
    : `${taskCount} task${taskPluralSuffix} in your planner`

  return (
    <Flex mb={7} align={{ base: "start", md: "center" }} justify="space-between" gap={4} wrap="wrap">
      <Flex direction="column" gap={1.5}>
        <Heading size="xl" fontWeight="800" letterSpacing="-0.7px" color="var(--ink)">
          My Tasks
        </Heading>
        <Flex align="center" gap={2.5}>
          <Text fontSize="sm" color="var(--muted)">
            {summaryText}
          </Text>
          {!loading && (
            <Badge rounded="full" px={2.5} py={1} bg="var(--accent-soft)" color="var(--accent)">
              Active
            </Badge>
          )}
        </Flex>
      </Flex>

      <Button
        size="md"
        bg="var(--accent)"
        color="white"
        rounded="full"
        px={6}
        fontWeight="600"
        fontSize="sm"
        _hover={{ bg: "#0b615a" }}
      >
        + New Task
      </Button>
    </Flex>
  )
}
