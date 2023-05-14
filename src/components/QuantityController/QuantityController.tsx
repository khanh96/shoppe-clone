import React, { useEffect, useRef, useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  classNameWrapper?: string
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}

export default function QuantityController(props: QuantityControllerProps) {
  const { classNameWrapper = 'ml-10', onDecrease, onIncrease, onType, value, max, ...rest } = props
  const [localValue, setLocalValue] = useState<number>(Number(value) || 0)
  const inputNumberRef = useRef<HTMLInputElement>(null)
  const onHandleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }

  const onHandleDecrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  const onHandleIncrease = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={`${classNameWrapper} flex items-center`}>
      <button
        onClick={onHandleDecrease}
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
        </svg>
      </button>
      <InputNumber
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={onHandleType}
        value={value || localValue}
        type='text'
        ref={inputNumberRef}
        {...rest}
      />
      <button
        onClick={onHandleIncrease}
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
        </svg>
      </button>
    </div>
  )
}
