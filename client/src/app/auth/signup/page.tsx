"use client"

import { toaster } from "@/components/ui/toaster"
import { primaryButtonStyles } from "@/components/ui/button-styles"
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { AuthCard } from "../_components/AuthCard"
import { useSignup } from "../_hooks/useSignup"

export default function SignupPage() {
  const router = useRouter()

  const { mutate: signup, isPending } = useSignup()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      toaster.create({ title: "Passwords do not match", type: "error" })
      return
    }

    signup(
      { name, email, password },
      {
        onSuccess: () => {
          toaster.create({ title: "Account created!", type: "success" })
          router.push("/tasks")
        },
        onError: (err: Error) => {
          toaster.create({
            title: "Sign up failed",
            description: err.message ?? "Something went wrong. Please try again.",
            type: "error",
          })
        },
      },
    )
  }

  const inputStyles = {
    bg: "var(--surface-elevated)",
    border: "1px solid",
    borderColor: "var(--outline)",
    rounded: "lg",
    fontSize: "sm",
    px: 3.5,
    h: "42px",
    _focus: { borderColor: "var(--accent)", outline: "none", boxShadow: "0 0 0 3px var(--accent-soft)" },
    _placeholder: { color: "var(--muted)" },
  } as const

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start building a study system that actually works."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkHref="/auth/login"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Stack gap={1.5}>
            <Text fontSize="sm" fontWeight="600" color="var(--ink)">
              Full name
            </Text>
            <Input
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              {...inputStyles}
            />
          </Stack>

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
              {...inputStyles}
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
              {...inputStyles}
            />
          </Stack>

          <Stack gap={1.5}>
            <Text fontSize="sm" fontWeight="600" color="var(--ink)">
              Confirm password
            </Text>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              {...inputStyles}
            />
          </Stack>

          <Button
            type="submit"
            loading={isPending}
            loadingText="Creating account…"
            w="full"
            bg="var(--accent)"
            color="white"
            mt={2}
            _hover={{ bg: "var(--accent-strong)" }}
            _active={{ bg: "var(--accent-pressed)" }}
            transition="all 0.18s"
            {...primaryButtonStyles}
          >
            Create account
          </Button>
        </Stack>
      </Box>
    </AuthCard>
  )
}
