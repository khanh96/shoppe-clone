import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { AuthResponse, ErrorExpireTokenResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { path } from 'src/constants/path'
import config from 'src/constants/config'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError, redirectToPageNotFound } from './utils'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_ACCESS_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { ErrorResponseApi } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    // Tạo biến và lưu accessToken từ localStorage để lúc lấy accessToken sẽ lấy từ RAM nhanh hơn là lấy từ bộ nhớ (localStorage)
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60, // 1h
        'expire-refresh-token': 60 * 60 * 24 * 1000 // 1 ngay
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // Các lỗi không phải là 422 vaf 401 thì mới nhảy vào đấy
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ message: string; name: string }>>(error)) {
          const config = error.response?.config as InternalAxiosRequestConfig
          const { url } = config
          // Trường hợp token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError<ErrorExpireTokenResponse>(error) && url !== URL_REFRESH_ACCESS_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng.
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              config.headers.authorization = access_token
              return this.instance(config)
            })
          }
          // Còn những trường hợp như token không đúng
          // không tuyển token,
          // token hết hạn nhưng gọi refresh token bị fail thì tiến hành xóa local storage và toast message
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        if (
          error.response?.status === HttpStatusCode.NotFound ||
          error.response?.status === HttpStatusCode.BadRequest
        ) {
          redirectToPageNotFound()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_ACCESS_TOKEN, { refresh_token: this.refreshToken })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
