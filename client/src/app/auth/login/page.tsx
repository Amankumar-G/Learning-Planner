"use client"

import { toaster } from "@/components/ui/toaster"
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useState } from "react"
import { AuthCard } from "../_components/AuthCard"
import { useLogin } from "../_hooks/useLogin"

export default function LoginPage() {
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
              bg="white"
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
              bg="white"
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
            h="42px"
            mt={1}
            rounded="lg"
            bg="var(--accent)"
            color="white"
            fontWeight="700"
            fontSize="sm"
            _hover={{ bg: "#0b615a" }}
            _active={{ bg: "#085651" }}
            transition="all 0.18s"
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </AuthCard>
  )
}
