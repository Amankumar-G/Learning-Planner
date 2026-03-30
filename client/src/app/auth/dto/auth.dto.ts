export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  access_token: string
  user: AuthUser
}
