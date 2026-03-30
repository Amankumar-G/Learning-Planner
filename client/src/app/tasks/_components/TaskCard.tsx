import { Box, Card, Flex, HStack, Text } from "@chakra-ui/react"
import type { Task } from "../dto/task.dto"

interface Props {
  task: Task
}

export function TaskCard({ task }: Readonly<Props>) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <Card.Root
      variant="outline"
      bg="white"
      borderColor="var(--outline)"
      rounded="xl"
      shadow="none"
      _hover={{ borderColor: "#cabf9f", shadow: "sm", transform: "translateY(-1px)" }}
      transition="all 0.18s"
    >
      <Card.Body px={5} py={4}>
        <Flex align="center" gap={4}>
          <Box
            flexShrink={0}
            w={3}
            h={3}
            rounded="full"
            bg={task.completed ? "#14846d" : "var(--accent)"}
            mt={0.25}
            boxShadow="0 0 0 4px rgba(15, 118, 110, 0.12)"
          />

          <Box flex="1" minW={0}>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={task.completed ? "#9aa1a9" : "var(--ink)"}
              textDecoration={task.completed ? "line-through" : "none"}
              lineClamp={1}
            >
              {task.title}
            </Text>
            {task.description && (
              <Text fontSize="xs" color="var(--muted)" mt={0.5} lineClamp={1}>
                {task.description}
              </Text>
            )}
          </Box>

          <HStack gap={3} flexShrink={0}>
            <Text fontSize="xs" color="var(--muted)">
              {formattedDate}
            </Text>
            <Box
              px={2.5}
              py={1}
              rounded="full"
              bg={task.completed ? "#d7f4ef" : "#e6f7f2"}
              fontSize="xs"
              fontWeight="700"
              color={task.completed ? "#0f5f50" : "#0f766e"}
            >
              {task.completed ? "Done" : "Pending"}
            </Box>
          </HStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
