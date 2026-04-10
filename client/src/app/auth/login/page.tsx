"use client"

import { Suspense } from "react"
import { toaster } from "@/components/ui/toaster"
import { primaryButtonStyles } from "@/components/ui/button-styles"
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useState } from "react"
import { AuthCard } from "../_components/AuthCard"
import { useLogin } from "../_hooks/useLogin"

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/tasks"

  const { mutate: login, isPending } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    login(
      { email, password },
      {
        onSuccess: () => {
          toaster.create({ title: "Welcome back!", type: "success" })
          router.push(redirect)
        },
        onError: (err: Error) => {
          toaster.create({
            title: "Login failed",
            description: err.message ?? "Please check your credentials.",
            type: "error",
          })
        },
      },
    )
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your learning plan."
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/auth/signup"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Stack gap={1.5}>
            <Text fontSize="sm" fontWeight="600" color="var(--ink)">
              Email
            </Text>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="var(--surface-elevated)"
              border="1px solid"
              borderColor="var(--outline)"
              rounded="lg"
              fontSize="sm"
              px={3.5}
              h="42px"
              _focus={{ borderColor: "var(--accent)", outline: "none", boxShadow: "0 0 0 3px var(--accent-soft)" }}
              _placeholder={{ color: "var(--muted)" }}
            />
          </Stack>

          <Stack gap={1.5}>
            <Text fontSize="sm" fontWeight="600" color="var(--ink)">
              Password
            </Text>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="var(--surface-elevated)"
              border="1px solid"
              borderColor="var(--outline)"
              rounded="lg"
              fontSize="sm"
              px={3.5}
              h="42px"
              _focus={{ borderColor: "var(--accent)", outline: "none", boxShadow: "0 0 0 3px var(--accent-soft)" }}
              _placeholder={{ color: "var(--muted)" }}
            />
          </Stack>

          <Button
            type="submit"
            loading={isPending}
            loadingText="Signing in…"
            w="full"
            bg="var(--accent)"
            color="white"
            mt={2}
            _hover={{ bg: "var(--accent-strong)" }}
            _active={{ bg: "var(--accent-pressed)" }}
            transition="all 0.18s"
            {...primaryButtonStyles}
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </AuthCard>
  )
}
