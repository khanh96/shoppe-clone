import React, { forwardRef, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

export interface InputV2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameWrap?: string
  classNameInput?: string
  classNameError?: string
}
/**
 * InputV2 chỉ dùng khi sử dụng react-hook-form
 */
const InputV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> & InputV2Props
) => {
  const {
    type,
    onChange,
    value = '',
    classNameWrap,
    classNameInput,
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    // Điều kiện ở đây là type === number và nhập là số thì => true
    const numberCondition = (type === 'number' && /^\d+$/.test(valueFromInput)) || valueFromInput === ''
    // điều kiệu ở đây là nếu k phải là numberCondition thì có thể là type = 'text'. Có nghĩa là có thể nhập cả số và chữ
    if (numberCondition || type !== 'number') {
      // Cấp nhật localValue state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={classNameWrap}>
      <input
        {...field}
        {...rest}
        className={classNameInput}
        value={value === undefined ? localValue : value}
        onChange={handleChange}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
