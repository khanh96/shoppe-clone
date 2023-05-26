import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '636f935e5fdc5f037e6f68d3',
    roles: ['User'],
    email: 'd3@gmail.com',
    createdAt: '2022-11-12T12:36:46.282Z',
    updatedAt: '2022-12-02T07:57:45.069Z',
    avatar: 'a59b50bf-511c-4603-ae90-3ccc63d373a9.png',
    name: 'Dư Thanh Được'
  }
}

const refreshTokenResError = {
  message: 'Lỗi',
  data: {
    message: 'Token hết hạn',
    name: 'EXPIRED_TOKEN'
  }
}

export const getMeRequest = rest.get(`${config.baseURL}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  if (access_token === access_token_1s) {
    return res(ctx.status(HttpStatusCode.Unauthorized), ctx.json(refreshTokenResError))
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequest = [getMeRequest]

export default userRequest
