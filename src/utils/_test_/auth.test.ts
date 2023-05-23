import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'
import { before } from 'lodash'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA3OjQ2OjE0LjUwM1oiLCJpYXQiOjE2ODQ4Mjc5NzQsImV4cCI6MTY4NDkxNDM3NH0.wdEdcU4tO_QuzLcp4wlVHXGSB8omKb1GGLldpHrJW7Y'
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA3OjQ2OjE0LjUwM1oiLCJpYXQiOjE2ODQ4Mjc5NzQsImV4cCI6MTY4NDgzMTU3NH0.ylw0dc2luX1yuuzjJ_5LImWda4nsuDowHQ72RhHuM8s'
const profile = {
  _id: '645480266d7c62034085c1a2',
  roles: ['User'],
  email: 'user-02@gmail.com',
  createdAt: '2023-05-05T04:03:50.790Z',
  updatedAt: '2023-05-18T18:23:23.546Z',
  __v: 0,
  address: '12312313131313đâ',
  date_of_birth: '2000-03-02T17:00:00.000Z',
  name: 'LucianVVVdâd',
  phone: '12312312313313',
  avatar: '50479cc3-60c7-46bc-a052-70cbc88b82eb.jpg'
}

beforeEach(() => {
  localStorage.clear()
})

// describe mổ tả các ngữ cảnh và đơn vị cần test: Ví dụ như function, component
describe('access_token', () => {
  // Dùng để ghi chú trường hợp cần test
  it('access_token được set và get từ localStorage', () => {
    // expect dùng để mong đợi giá trị trả về
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

// describe mổ tả các ngữ cảnh và đơn vị cần test: Ví dụ như function, component
describe('refresh_token', () => {
  // Dùng để ghi chú trường hợp cần test
  it('refresh_token được set và get từ localStorage', () => {
    // expect dùng để mong đợi giá trị trả về
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('profile', () => {
  // Dùng để ghi chú trường hợp cần test
  it('profile được get và set từ localStorage', () => {
    setProfileToLS(profile as any)
    // expect dùng để mong đợi giá trị trả về
    // toEqual kiểm tra cả về value r
    expect(getProfileFromLS()).toEqual(profile)
  })
})
