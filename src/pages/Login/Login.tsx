import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { loginSchema, LoginSchemaType } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormData = LoginSchemaType

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => {
      return login(body)
    }
  })
  // const rules = getRules(getValues) validate k dùng yup
  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          // cách show lỗi với nhiều trường trong 1 form
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                type: 'server',
                message: formError[key as keyof Omit<FormData, 'confirm_password'>]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='lg:py32 grid grid-cols-1 py-12 lg:grid-cols-5 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-left text-2xl'>Đăng nhập</div>
              <Input
                classNameWrap='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                // rules={rules.email} validate k dùng yup
                errorMessage={errors.email?.message}
              />
              <Input
                classNameWrap='mt-3 relative'
                type='password'
                placeholder='Password'
                register={register}
                name='password'
                // rules={rules.password}
                errorMessage={errors.password?.message}
                showIconEye={false}
                classNameInput='w-full rounded-sm border border-gray-300 py-3 pl-3 pr-10  outline-none focus:border-gray-500 focus:shadow-sm'
                classNameIcon='absolute h-5 w-5 cursor-pointer top-3 right-3'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center text-sm'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link to={path.register} className='ml-1 text-red-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
