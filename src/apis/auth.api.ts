import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

type RegisterAccountTypeParams = {
  email: string
  password: string
}

export const registerAccount = (body: RegisterAccountTypeParams) => {
  return http.post<AuthResponse>('/register', body)
}

export const login = (body: RegisterAccountTypeParams) => {
  return http.post<AuthResponse>('/login', body)
}

export const logout = () => {
  return http.post('/logout')
}