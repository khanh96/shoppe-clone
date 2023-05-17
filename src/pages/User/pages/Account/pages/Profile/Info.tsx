import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { FormData } from './Profile'

export default function Info() {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()

  return (
    <>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            name='name'
            type='text'
            register={register}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                type='text'
                placeholder='Nhập số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={(event) => {
                  field.onChange(event)
                }}
              />
            )}
          ></Controller>
        </div>
      </div>
    </>
  )
}
