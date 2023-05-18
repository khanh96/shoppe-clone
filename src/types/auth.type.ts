// Chứa các type response từ api

import { User } from './user.type'
import { ErrorResponseApi, SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponseApi<{
  access_token: string
}>

export type ErrorExpireTokenResponse = ErrorResponseApi<{
  message: string
  name: 'EXPIRED_TOKEN'
}>
