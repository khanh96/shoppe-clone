import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { text } from 'stream/consumers'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Trường Email phải bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài email từ 5 - 160 ký tự'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Trường Password phải bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài Password từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài Password từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Trường Confirm Password phải bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài Confirm Password từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài Confirm Password từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => {
            if (getValues('password') === value) {
              return true
            }
            return 'Nhập lại Confirm Password không khớp'
          }
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_max !== '' || price_min !== ''
}

// Sử dụng schema để validate

export const schema = yup.object({
  email: yup
    .string()
    .required('Trường Email phải bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài email từ 5 - 160 ký tự')
    .max(160, 'Độ dài email từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Trường Password phải bắt buộc')
    .min(6, 'Độ dài email từ 6 - 160 ký tự')
    .max(160, 'Độ dài email từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Trường Confirm Password phải bắt buộc')
    .min(6, 'Độ dài email từ 6 - 160 ký tự')
    .max(160, 'Độ dài email từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại Confirm Password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testPriceMinMax
  })
})
// export type dùng schema
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export type RegisterSchemaType = yup.InferType<typeof registerSchema>

// kế thừa type của registerSchema dùng omit
export const loginSchema = schema.pick(['email', 'password'])
export type LoginSchemaType = yup.InferType<typeof loginSchema>

export const priceRangeSchema = schema.pick(['price_min', 'price_max'])
export type PriceRangeSchemaType = yup.InferType<typeof priceRangeSchema>

// kế thừa type của registerSchema dùng pick
//export const emailASchema = registerSchema.pick(['email','password'])
// export type EmailAType = yup.InferType<typeof emailASchema>
