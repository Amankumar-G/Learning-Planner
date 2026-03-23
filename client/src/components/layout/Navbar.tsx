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
      borderColor="gray.100"
      bg="white"
      px={{ base: 5, md: 10 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" justify="space-between" maxW="5xl" mx="auto">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text fontSize="lg" fontWeight="700" letterSpacing="-0.5px" color="gray.900">
            Learn<Text as="span" color="blue.500">Flow</Text>
          </Text>
        </Link>

        <HStack gap={1}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <Text
                px={4}
                py={1.5}
                rounded="full"
                fontSize="sm"
                fontWeight="500"
                color={pathname === href ? "blue.600" : "gray.500"}
                bg={pathname === href ? "blue.50" : "transparent"}
                _hover={{ color: "gray.900" }}
                transition="all 0.15s"
              >
                {label}
              </Text>
            </Link>
          ))}
        </HStack>

        <Button size="sm" variant="ghost" colorPalette="gray" color="gray.500" fontSize="sm">
          Log out
        </Button>
      </Flex>
    </Box>
  )
}
