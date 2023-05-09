// Chứa cấc type

export type ErrorResponseApi<Data> = {
  message: string
  data?: Data
}

export type SuccessResponseApi<Data> = {
  message: string
  data: Data
}
