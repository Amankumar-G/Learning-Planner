"use client"

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [{ label: "Tasks", href: "/tasks" }]

export function Navbar() {
  const pathname = usePathname()

  return (
    <Box
      as="nav"
      borderBottomWidth="1px"
      borderColor="var(--outline)"
      bg="rgba(255, 253, 247, 0.88)"
      backdropFilter="blur(8px)"
      px={{ base: 5, md: 10 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={30}
    >
      <Flex align="center" justify="space-between" maxW="5xl" mx="auto">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text fontSize="lg" fontWeight="800" letterSpacing="-0.6px" color="var(--ink)">
            Learn<Text as="span" color="var(--accent)">Flow</Text>
          </Text>
        </Link>

        <HStack
          gap={1}
          p={1}
          rounded="full"
          border="1px solid"
          borderColor="var(--outline)"
          bg="rgba(255, 255, 255, 0.75)"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <Text
                px={4}
                py={1.5}
                rounded="full"
                fontSize="sm"
                fontWeight="600"
                color={pathname === href ? "var(--accent)" : "var(--muted)"}
                bg={pathname === href ? "var(--accent-soft)" : "transparent"}
                _hover={{ color: "var(--ink)" }}
                transition="all 0.18s"
              >
                {label}
              </Text>
            </Link>
          ))}
        </HStack>

        <Button
          size="sm"
          variant="outline"
          borderColor="var(--outline)"
          color="var(--muted)"
          rounded="full"
          fontSize="sm"
          _hover={{ bg: "#faf4e7", color: "var(--ink)" }}
        >
          Log out
        </Button>
      </Flex>
    </Box>
  )
}
