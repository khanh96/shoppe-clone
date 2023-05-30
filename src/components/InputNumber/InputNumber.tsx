import React, { forwardRef, useState } from 'react'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameWrap?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(props, ref) {
  const {
    classNameWrap,
    classNameInput,
    type,
    name,
    onChange,
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    errorMessage,
    value,
    ...rest
  } = props
  const [localValue, setLocalValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cấp nhật localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={classNameWrap}>
      <input
        name={name}
        type={type}
        className={classNameInput}
        value={value === undefined ? localValue : value}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
