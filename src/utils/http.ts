import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { AuthResponse } from 'src/types/auth.type'
import { path } from 'src/constants/path'
import config from 'src/constants/config'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    // Tạo biến và lưu accessToken từ localStorage để lúc lấy accessToken sẽ lấy từ RAM nhanh hơn là lấy từ bộ nhớ (localStorage)
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
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
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        // Các lỗi không phải là 422 thì mới nhảy vào đấy
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // Các lỗi là 401 thì mới nhảy vào đấy
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
