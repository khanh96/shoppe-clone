import React, { forwardRef } from 'react'

interface InputNumberTypeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapClassName?: string
  inputClassName?: string
  errorClassName?: string
  errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberTypeProps>(function InputNumberInner(props, ref) {
  const {
    wrapClassName,
    inputClassName,
    type,
    name,
    onChange,
    errorClassName = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    errorMessage,
    ...rest
  } = props
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={wrapClassName}>
      <input name={name} type={type} className={inputClassName} onChange={handleChange} ref={ref} {...rest} />
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
