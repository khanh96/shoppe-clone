import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputTypeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameWrap?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
}

export default function Input({
  classNameWrap,
  register,
  name,
  rules,
  type,
  errorMessage,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-left text-sm text-red-600',
  ...rest
}: InputTypeProps) {
  const registerResult = register && name ? { ...register(name, rules) } : {}

  return (
    <div className={classNameWrap}>
      <input type={type} className={classNameInput} {...registerResult} {...rest} />
      {/* Để  min-h-[1rem] để khi xuất hiện lỗi sẽ không bị xô lệnh input */}
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
