import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputTypeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapClassName?: string
  inputClassName?: string
  errorClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
}

export default function Input({
  wrapClassName,
  register,
  name,
  rules,
  type,
  errorMessage,
  placeholder,
  inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  errorClassName = 'mt-1 min-h-[1.25rem] text-left text-sm text-red-600'
}: InputTypeProps) {
  const registerResult = register && name ? { ...register(name, rules) } : {}

  return (
    <div className={wrapClassName}>
      <input type={type} className={inputClassName} placeholder={placeholder} {...registerResult} />
      {/* Để  min-h-[1rem] để khi xuất hiện lỗi sẽ không bị xô lệnh input */}
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}
