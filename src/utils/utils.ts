import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

/**
 * Phương pháp "type predicate" dùng để thu hẹp kiểu của một biến
 * ✅ Đầu tiên chúng ta sẽ khai báo một function check kiểm tra cấu trúc về mặc logic javascript
 * ✅ Tiếp theo chúng ta thêm `parameterName is Type` làm kiểu return của function thay vì boolean
 * ✅ Khi dùng function kiểu tra kiểu này, ngoài việc kiểm tra về mặc logic cấu trúc, nó còn chuyển kiểu
 *
 * So sánh với phương pháp ép kiểu "Type Assertions" thì ép kiểu chúng giúp chúng ta đúng về mặc Type, chưa chắc về logic
 *
 */

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('en-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', minimumFractionDigits: 1 }).format(value)
}
