import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_ACCESS_TOKEN = 'refresh-access-token'

type RegisterAccountTypeParams = {
  email: string
  password: string
}

export const registerAccount = (body: RegisterAccountTypeParams) => {
  return http.post<AuthResponse>(URL_REGISTER, body)
}

export const login = (body: RegisterAccountTypeParams) => {
  return http.post<AuthResponse>(URL_LOGIN, body)
}

export const logout = () => {
  return http.post(URL_LOGOUT)
}
