import { Box, Button, Card, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { compactButtonStyles } from "@/components/ui/button-styles"
import { useState } from "react"
import type { Task } from "../dto/task.dto"

interface Props {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: (completed: boolean) => void
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: Readonly<Props>) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const hasLongDescription = (task.description?.length ?? 0) > 160

  return (
    <Card.Root
      variant="outline"
      bg="var(--surface-elevated)"
      borderColor="var(--outline)"
      rounded="xl"
      shadow="none"
      _hover={{ borderColor: "var(--outline-strong)", shadow: "sm", transform: "translateY(-1px)" }}
      transition="all 0.18s"
    >
      <Card.Body px={{ base: 4, md: 5 }} py={{ base: 4, md: 4.5 }}>
        <Stack gap={3}>
          <Flex align="start" gap={3}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(event) => onToggleStatus(event.target.checked)}
              aria-label={`Mark ${task.title} as completed`}
              style={{
                marginTop: 2,
                width: 18,
                height: 18,
                accentColor: "var(--accent)",
                cursor: "pointer",
              }}
            />

            <Box flex="1" minW={0}>
              <Text
                fontSize="sm"
                fontWeight="700"
                color={task.completed ? "var(--task-done-ink)" : "var(--ink)"}
                textDecoration={task.completed ? "line-through" : "none"}
              >
                {task.title}
              </Text>

              {task.description && (
                <>
                  <Text
                    mt={1.5}
                    fontSize="sm"
                    color="var(--muted)"
                    whiteSpace="pre-wrap"
                    lineClamp={showFullDescription ? undefined : 3}
                  >
                    {task.description}
                  </Text>

                  {hasLongDescription && (
                    <Button
                      variant="ghost"
                      size="xs"
                      h="auto"
                      mt={1}
                      px={1}
                      color="var(--accent)"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </Button>
                  )}
                </>
              )}
            </Box>

            <Box
              px={2.5}
              py={1}
              rounded="full"
              bg={task.completed ? "var(--status-done-bg)" : "var(--status-pending-bg)"}
              fontSize="xs"
              fontWeight="700"
              color={task.completed ? "var(--status-done-ink)" : "var(--status-pending-ink)"}
              flexShrink={0}
            >
              {task.completed ? "Done" : "Pending"}
            </Box>
          </Flex>

          <Flex justify="space-between" align="center" gap={3}>
            <Text fontSize="xs" color="var(--muted)">
              Created {formattedDate}
            </Text>

            <HStack gap={2}>
              <Button
                variant="outline"
                borderColor="var(--outline)"
                color="var(--muted)"
                onClick={onEdit}
                {...compactButtonStyles}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                borderColor="var(--danger-border)"
                color="var(--danger-ink)"
                onClick={onDelete}
                {...compactButtonStyles}
              >
                Delete
              </Button>
            </HStack>
          </Flex>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
