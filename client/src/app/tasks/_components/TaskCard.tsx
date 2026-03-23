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
      borderColor="gray.100"
      rounded="xl"
      shadow="none"
      _hover={{ borderColor: "blue.200", shadow: "sm" }}
      transition="all 0.15s"
    >
      <Card.Body px={5} py={4}>
        <Flex align="center" gap={4}>
          {/* Status dot */}
          <Box
            flexShrink={0}
            w={2.5}
            h={2.5}
            rounded="full"
            bg={task.completed ? "teal.400" : "blue.400"}
            mt={0.5}
          />

          {/* Content */}
          <Box flex="1" minW={0}>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={task.completed ? "gray.400" : "gray.800"}
              textDecoration={task.completed ? "line-through" : "none"}
              lineClamp={1}
            >
              {task.title}
            </Text>
            {task.description && (
              <Text fontSize="xs" color="gray.400" mt={0.5} lineClamp={1}>
                {task.description}
              </Text>
            )}
          </Box>

          {/* Meta */}
          <HStack gap={3} flexShrink={0}>
            <Text fontSize="xs" color="gray.400">
              {formattedDate}
            </Text>
            <Box
              px={2.5}
              py={0.5}
              rounded="full"
              bg={task.completed ? "teal.50" : "blue.50"}
              fontSize="xs"
              fontWeight="500"
              color={task.completed ? "teal.600" : "blue.600"}
            >
              {task.completed ? "Done" : "Pending"}
            </Box>
          </HStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
