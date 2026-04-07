import { Badge, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { primaryButtonStyles } from "@/components/ui/button-styles"

interface Props {
  taskCount: number
  loading: boolean
  onCreateTask: () => void
}

export function TasksHeader({ taskCount, loading, onCreateTask }: Readonly<Props>) {
  const taskPluralSuffix = taskCount === 1 ? "" : "s"
  const summaryText = loading
    ? "Loading your study plan..."
    : `${taskCount} task${taskPluralSuffix} in your planner`

  return (
    <Flex
      mb={{ base: 6, md: 7 }}
      align={{ base: "start", md: "center" }}
      justify="space-between"
      gap={{ base: 4, md: 5 }}
      wrap="wrap"
    >
      <Flex direction="column" gap={{ base: 1, md: 1.5 }}>
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
