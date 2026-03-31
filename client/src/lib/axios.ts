import axios from "axios"

function getCookieValue(name: string): string | null {
  if (globalThis.window === undefined) {
    return null
  }

  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [rawKey, ...rawValue] = cookie.trim().split("=")
    if (rawKey === name) {
      return rawValue.join("=") || null
    }
  }

  return null
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
})

apiClient.interceptors.request.use((config) => {
  const token =
    globalThis.window === undefined
      ? null
      : localStorage.getItem("access_token") ?? getCookieValue("access_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
