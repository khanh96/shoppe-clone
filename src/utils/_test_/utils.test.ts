import { describe, expect, it } from 'vitest'
import { formatCurrency, isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// describe mổ tả các ngữ cảnh và đơn vị cần test: Ví dụ như function, component
describe('isAxiosError', () => {
  // Dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.ServiceUnavailable,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
describe('formatCurrency', () => {
  const currencyNumber = 1000000
  const currencyString = 'dadada'
  it('formatCurrency đầu ra phải trả về số dạng tiền tệ', () => {
    expect(formatCurrency(currencyNumber)).toBe(Intl.NumberFormat('en-DE').format(currencyNumber))
    expect(formatCurrency(currencyString as any)).toBe('NaN')
  })
})
