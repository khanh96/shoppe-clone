import { range, rangeRight } from 'lodash'
import React, { useEffect, useState } from 'react'

interface DateSelectProps {
  errorMessage?: string
  value?: Date
  onChange?: (value: Date) => void
}

export default function DateSelect({ errorMessage, value, onChange }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1910
  })
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = () => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='date'
            onChange={handleChange()}
            value={value?.getDate() || date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='month'
            onChange={handleChange()}
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => {
              return (
                <option key={item} value={item}>
                  {item + 1}
                </option>
              )
            })}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='year'
            onChange={handleChange()}
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {rangeRight(1910, 2024).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}