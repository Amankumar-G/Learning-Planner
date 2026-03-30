import { Card, Flex, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react"

export function TaskCardSkeleton() {
  return (
    <Card.Root
      variant="outline"
      bg="white"
      borderColor="var(--outline)"
      rounded="xl"
      shadow="none"
    >
      <Card.Body px={5} py={4}>
        <Flex align="center" gap={4}>
          <SkeletonCircle size="3" flexShrink={0} />

          <Flex flex="1" direction="column" gap={1.5} minW={0}>
            <Skeleton h="3" w="55%" rounded="full" />
            <Skeleton h="2.5" w="35%" rounded="full" />
          </Flex>

          <HStack gap={3} flexShrink={0}>
            <Skeleton h="2.5" w="10" rounded="full" />
            <Skeleton h="5" w="14" rounded="full" />
          </HStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}
