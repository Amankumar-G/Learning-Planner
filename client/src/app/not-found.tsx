import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function NotFound() {
  return (
    <Box minH="100vh" px={{ base: 5, md: 10 }} py={{ base: 10, md: 14 }}>
      <Container maxW="4xl" p={0}>
        <Box
          className="grain-surface fade-up"
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--outline)"
          rounded={{ base: "2xl", md: "3xl" }}
          p={{ base: 7, md: 10 }}
          shadow="0 22px 52px rgba(31, 41, 51, 0.07)"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-68px"
            right="-44px"
            w="220px"
            h="220px"
            rounded="full"
            bg="var(--accent-soft)"
            opacity={0.75}
          />

          <Stack gap={5} position="relative" zIndex={1}>
            <Text
              fontSize={{ base: "6xl", md: "8xl" }}
              lineHeight={0.95}
              letterSpacing="-2px"
              fontWeight="900"
              color="var(--ink)"
            >
              404
            </Text>

            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              letterSpacing="-1px"
              lineHeight={1.05}
              color="var(--ink)"
              maxW="18ch"
            >
              This page wandered off your learning path.
            </Heading>

            <Text color="var(--muted)" fontSize={{ base: "md", md: "lg" }} maxW="58ch">
              The link may be old, or the page may have moved. Let&apos;s get you
              back to a place that exists.
            </Text>

            <Stack direction={{ base: "column", sm: "row" }} gap={3} pt={2}>
              <Link href="/tasks" style={{ textDecoration: "none" }}>
                <Button
                  w={{ base: "full", sm: "auto" }}
                  rounded="full"
                  bg="var(--accent)"
                  color="white"
                  px={7}
                  _hover={{ bg: "#0b615a" }}
                >
                  Go to tasks
                </Button>
              </Link>

              <Link href="/" style={{ textDecoration: "none" }}>
                <Button
                  w={{ base: "full", sm: "auto" }}
                  rounded="full"
                  variant="outline"
                  borderColor="var(--outline)"
                  color="var(--ink)"
                  px={7}
                  _hover={{ bg: "var(--accent-soft)", borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Back home
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
