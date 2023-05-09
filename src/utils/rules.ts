import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
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

// Sử dụng schema để validate

export const registerSchema = yup.object({
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
    .oneOf([yup.ref('password')], 'Nhập lại Confirm Password không khớp')
})
// export type dùng schema
export type RegisterSchemaType = yup.InferType<typeof registerSchema>

// kế thừa type của registerSchema dùng omit
export const loginSchema = registerSchema.omit(['confirm_password'])
export type LoginSchemaType = yup.InferType<typeof loginSchema>

// kế thừa type của registerSchema dùng pick
//export const emailASchema = registerSchema.pick(['email','password'])
// export type EmailAType = yup.InferType<typeof emailASchema>
