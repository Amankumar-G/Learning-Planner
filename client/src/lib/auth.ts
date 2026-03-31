export const ACCESS_TOKEN_COOKIE_KEY = "access_token"
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24

export function setAuthToken(token: string): void {
  if (globalThis.window === undefined) {
    return
  }

  localStorage.setItem(ACCESS_TOKEN_COOKIE_KEY, token)
  document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=${token}; path=/; Max-Age=${ACCESS_TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`
}

export function clearAuthToken(): void {
  if (globalThis.window === undefined) {
    return
  }

  localStorage.removeItem(ACCESS_TOKEN_COOKIE_KEY)
  document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=; path=/; Max-Age=0; SameSite=Lax`
}
