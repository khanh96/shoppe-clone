import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponseApi } from 'src/types/utils.type'
import { UserSchemaType, passwordSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'

export type FormPassword = Pick<UserSchemaType, 'password' | 'new_password' | 'confirm_password'>

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormPassword>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const changePasswordMutation = useMutation({
    mutationFn: userApi.updateUser
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await changePasswordMutation.mutateAsync({
        password: data.password,
        new_password: data.new_password
      })
      reset()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponseApi<Omit<FormPassword, 'confirm_password'>>>(error)) {
        const formError = error.response?.data.data
        // cách show lỗi với nhiều trường trong 1 form
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<FormPassword, 'confirm_password'>, {
              type: 'server',
              message: formError[key as keyof Omit<FormPassword, 'confirm_password'>]
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-4 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </div>
      <form className='mt-8 flex'>
        <div className='mt-6 max-w-2xl flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[25%] sm:text-right'>Mật khẩu cũ</div>
            <div className='mt-2 sm:mt-0 sm:w-[75%] sm:pl-5 '>
              <Input
                classNameWrap='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 pr-[45px] outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                type='password'
                placeholder='Nhập mật khẩu cũ'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[25%] sm:text-right'>Mật khẩu mới</div>
            <div className='mt-2 sm:mt-0 sm:w-[75%] sm:pl-5'>
              <Input
                classNameWrap='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                type='password'
                placeholder='Nhập mật khẩu mới'
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[25%] sm:text-right'>Xác nhận mật khẩu</div>
            <div className='mt-2 sm:mt-0 sm:w-[75%] sm:pl-5'>
              <Input
                classNameWrap='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu mới'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[25%] sm:text-right'></div>
            <div className='mt-2 sm:mt-0 sm:w-[75%] sm:pl-5'>
              <Button
                onClick={onSubmit}
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='button'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
