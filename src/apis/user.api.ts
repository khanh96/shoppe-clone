import { User } from 'src/types/user.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Pick<User, 'address' | 'date_of_birth' | 'name' | 'phone' | 'avatar'> {
  password?: string
  new_password?: string
}

const userApi = {
  getUser: () => {
    return http.get<SuccessResponseApi<User>>('me')
  },
  updateUser: (body: BodyUpdateProfile) => {
    return http.put<SuccessResponseApi<User>>('user', body)
  },
  // FormData là kiểu dữ liệu update ảnh bằng input file (key là image)
  uploadAvatar: (body: FormData) => {
    return http.post<SuccessResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
