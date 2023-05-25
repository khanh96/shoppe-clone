import { describe, beforeEach, it, expect } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

/**
 * Nên có 1 cái account test và 1 server test
 *
 */
//

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA5OjU5OjA2LjE2NloiLCJpYXQiOjE2ODQ4MzU5NDYsImV4cCI6MTY4NDgzNTk0N30.4SwN1O5abhpqGdHZEMMAJ3vG6gOVar4rDkrzRaJ_mkg'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTQ4MDI2NmQ3YzYyMDM0MDg1YzFhMiIsImVtYWlsIjoidXNlci0wMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTIzVDA5OjU5OjA1LjgwNloiLCJpYXQiOjE2ODQ4MzU5NDUsImV4cCI6MTc3MTIzNTk0NX0.mjIg4SOemD_iClXbJGyY5GyKEPM7ysBcLxExmxJbkHg'
  it('Call api', async () => {
    // Không nên dùng thư mục apis
    // Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
    // Vì lỡ như thư mục apis thay đổi gì đó thì cũng không ảnh hưởng tới file test này
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    // Nên có 1 cái account test
    // và 1 server test
    await http.post('login', {
      email: 'user-02@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Call api refresh token', async () => {
    // Khi có access_token hết hạn và refresh_token còn hạn thì mới test được.
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
