"use client"

import apiClient from "@/lib/axios"
import { setAuthToken } from "@/lib/auth"
import { useMutation } from "@tanstack/react-query"
import type { AuthResponse, SignupRequest } from "../dto/auth.dto"

async function signup(body: SignupRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/signup", body)
  return data
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: ({ access_token }) => {
      setAuthToken(access_token)
    },
  })
}
