"use client"

import apiClient from "@/lib/axios"
import { setAuthToken } from "@/lib/auth"
import { useMutation } from "@tanstack/react-query"
import type { AuthResponse, LoginRequest } from "../dto/auth.dto"

async function login(body: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", body)
  return data
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ access_token }) => {
      setAuthToken(access_token)
    },
  })
}
