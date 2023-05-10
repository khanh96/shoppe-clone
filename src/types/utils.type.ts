// Chứa cấc type

export type ErrorResponseApi<Data> = {
  message: string
  data?: Data
}

export type SuccessResponseApi<Data> = {
  message: string
  data: Data
}

// `-?` cú pháp loại bỏ undefined khỏi key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
