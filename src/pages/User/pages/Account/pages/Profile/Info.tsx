import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { FormData } from './Profile'
import { useTranslation } from 'react-i18next'

export default function Info() {
  const { t } = useTranslation(['profile'])
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()

  return (
    <>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'> {t('profile:name')}</div>
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
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'> {t('profile:phone_number')}</div>
        <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                type='text'
                placeholder={t('profile:enter_phone_number')}
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
