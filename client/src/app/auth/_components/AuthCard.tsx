import { Box, Card, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"

interface AuthCardProps {
  title: string
  subtitle: string
  footerText: string
  footerLinkLabel: string
  footerLinkHref: string
  children: React.ReactNode
}

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children,
}: Readonly<AuthCardProps>) {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" px={5} py={10}>
      <Box w="full" maxW="420px" className="fade-up">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text
            textAlign="center"
            fontSize="xl"
            fontWeight="800"
            letterSpacing="-0.6px"
            color="var(--ink)"
            mb={7}
            display="block"
          >
            Learn<Text as="span" color="var(--accent)">Flow</Text>
          </Text>
        </Link>

        <Card.Root
          className="grain-surface"
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--outline)"
          rounded="2xl"
          shadow="0 22px 52px rgba(31, 41, 51, 0.07)"
        >
          <Card.Body p={{ base: 6, md: 8 }}>
            <Stack gap={6}>
              <Stack gap={1}>
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  letterSpacing="-0.8px"
                  color="var(--ink)"
                >
                  {title}
                </Text>
                <Text fontSize="sm" color="var(--muted)">
                  {subtitle}
                </Text>
              </Stack>

              {children}

              <Text fontSize="sm" color="var(--muted)" textAlign="center">
                {footerText}{" "}
                <Link href={footerLinkHref} style={{ textDecoration: "none" }}>
                  <Text
                    as="span"
                    color="var(--accent)"
                    fontWeight="600"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {footerLinkLabel}
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  )
}
