import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'
import config from './src/constants/config'
import HttpStatusCode from './src/constants/httpStatusCode.enum'
import authRequest from './src/msw/auth.msw.ts'
import productsRequest from './src/msw/product.msw.ts'
import userRequest from './src/msw/user.msw.ts'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

// const graphqlHandlers = [
//   graphql.query('https://graphql-endpoint.example/api/v1/posts', (req, res, ctx) => {
//     return res(ctx.data(posts))
//   })
// ]

// const server = setupServer(...restHandlers, ...graphqlHandlers)
const server = setupServer(...authRequest, ...productsRequest, ...userRequest)

// Start server before all tests
// bypass => những trường hợp nào gọi apt mà chưa đc khai báo api test thì k show lỗi nhưng sẽ bị call api thật. => không nên
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
