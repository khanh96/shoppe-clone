import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA5OjU5OjA2LjE2NloiLCJpYXQiOjE2ODQ4MzU5NDYsImV4cCI6MTY4NDgzNTk0N30.4SwN1O5abhpqGdHZEMMAJ3vG6gOVar4rDkrzRaJ_mkg'
export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA5OjU5OjA1LjgwNloiLCJpYXQiOjE2ODQ4MzU5NDUsImV4cCI6MTc3MTIzNTk0NX0.mjIg4SOemD_iClXbJGyY5GyKEPM7ysBcLxExmxJbkHg'
export const access_token_1h =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDA5OjMyOjU1Ljc1NFoiLCJpYXQiOjE2ODUwOTM1NzUsImV4cCI6MTY4NTA5NzE3NX0.x0OquSK9mFAN4gSW_3Zd6PT8bKBZguk6LLUUbgAihgo'
const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDA3OjM4OjUxLjk3MloiLCJpYXQiOjE2ODUwODY3MzEsImV4cCI6MTY4NTA4NzczMX0.QFPCpYRtoCJaQLfTnYrn3UjXEeu2EA2L-xSivTxVjLo',
    expires: 3600,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDAzOjQyOjU5LjEzOFoiLCJpYXQiOjE2ODUwNzI1NzksImV4cCI6MTY4NTE1ODk3OX0.o0f3M5fMiLaad64yb5z-G83gYqqSyK5iA9AL-FmcGZw',
    expires_refresh_token: 86400,
    user: {
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
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xOVQwNzozMTowMC4yNTJaIiwiaWF0IjoxNjcxNDM1MDYwLCJleHAiOjE2NzIwMzk4NjB9.vTHglpuxad5h_CPpIaDCUpW0xJPYarJzLFeeul0W61E'
  }
}

export const loginRequest = rest.post(`${config.baseURL}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

export const refreshTokenRequest = rest.post(`${config.baseURL}refresh-access-token`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

const authRequest = [loginRequest, refreshTokenRequest]

export default authRequest
