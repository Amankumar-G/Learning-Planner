"use client"

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { FiCalendar, FiFlag, FiTarget } from "react-icons/fi"

const HIGHLIGHTS = [
  {
    title: "Plan with intent",
    body: "Break large goals into focused daily actions and keep momentum visible.",
    icon: FiTarget,
  },
  {
    title: "Track meaningful progress",
    body: "See what is complete, what is waiting, and what deserves your attention next.",
    icon: FiFlag,
  },
  {
    title: "Build a routine",
    body: "Review your tasks in one calm view that supports consistency over intensity.",
    icon: FiCalendar,
  },
]

export default function Home() {
  return (
    <Box minH="100vh" px={{ base: 5, md: 10 }} py={{ base: 8, md: 14 }}>
      <Container maxW="6xl" className="grain-surface fade-up" p={0}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "stretch", lg: "center" }}
          gap={{ base: 9, lg: 14 }}
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--outline)"
          rounded={{ base: "2xl", md: "3xl" }}
          p={{ base: 6, md: 10 }}
          shadow="0 28px 64px rgba(31, 41, 51, 0.08)"
          overflow="hidden"
          position="relative"
        >
          <Box
            position="absolute"
            top="-64px"
            right="-36px"
            w="220px"
            h="220px"
            rounded="full"
            bg="var(--accent-soft)"
            opacity={0.9}
          />

          <Stack flex="1" gap={5} position="relative" zIndex={1}>
            <Badge
              alignSelf="start"
              rounded="full"
              px={3.5}
              py={1}
              bg="var(--accent-soft)"
              color="var(--accent)"
              fontWeight="700"
              letterSpacing="0.3px"
            >
              Learning Planner
            </Badge>

            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight={{ base: 1.1, md: 1.05 }}
              letterSpacing="-1.4px"
              maxW="15ch"
              color="var(--ink)"
            >
              Build a study system that actually sticks.
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="var(--muted)" maxW="52ch">
              LearnFlow helps you turn your goals into a practical daily plan. Focus on
              the next right task, avoid overwhelm, and stay consistent.
            </Text>

            <Flex gap={3} wrap="wrap" pt={2}>
              <Link href="/tasks" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  rounded="full"
                  bg="var(--accent)"
                  color="white"
                  px={7}
                  _hover={{ bg: "#0b615a" }}
                >
                  Open Tasks
                </Button>
              </Link>
            </Flex>
          </Stack>

          <Card.Root
            flex="1"
            bg="#fbf7ee"
            borderColor="var(--outline)"
            rounded="2xl"
            shadow="none"
            maxW={{ base: "full", lg: "420px" }}
          >
            <Card.Body p={{ base: 5, md: 6 }}>
              <Stack gap={5}>
                <Text fontWeight="700" letterSpacing="0.2px" color="var(--ink)">
                  This week at a glance
                </Text>
                <SimpleGrid columns={2} gap={3}>
                  <StatCell label="Tasks done" value="12" hint="+3 since Monday" />
                  <StatCell label="Focus streak" value="6d" hint="Keep going" />
                  <StatCell label="In progress" value="4" hint="Two high-priority" />
                  <StatCell label="Next review" value="Fri" hint="15:00" />
                </SimpleGrid>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Flex>

        <SimpleGrid id="highlights" columns={{ base: 1, md: 3 }} gap={4} mt={6}>
          {HIGHLIGHTS.map((item) => (
            <Card.Root
              key={item.title}
              rounded="2xl"
              bg="var(--surface)"
              borderColor="var(--outline)"
              shadow="none"
              transition="transform 180ms ease, box-shadow 180ms ease"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Card.Body p={5}>
                <Stack gap={2.5}>
                  <Icon as={item.icon} boxSize={5} color="var(--accent)" />
                  <Heading size="md" letterSpacing="-0.2px" color="var(--ink)">
                    {item.title}
                  </Heading>
                  <Text fontSize="sm" color="var(--muted)">
                    {item.body}
                  </Text>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>

        <Flex justify="flex-end" mt={5}>
          <Link href="/tasks" style={{ textDecoration: "none" }}>
            <Button variant="ghost" color="var(--accent)" fontWeight="700" >
              Continue to your tasks
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}

function StatCell(props: Readonly<{ label: string; value: string; hint: string }>) {
  const { label, value, hint } = props

  return (
    <Box border="1px solid" borderColor="var(--outline)" rounded="xl" bg="white" p={3.5}>
      <Text fontSize="xs" color="var(--muted)">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="700" letterSpacing="-0.6px" color="var(--ink)">
        {value}
      </Text>
      <Text fontSize="xs" color="var(--muted)">
        {hint}
      </Text>
    </Box>
  )
}