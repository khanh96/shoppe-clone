import React, { forwardRef } from 'react'

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
    ...rest
  } = props
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={classNameWrap}>
      <input name={name} type={type} className={classNameInput} onChange={handleChange} ref={ref} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
