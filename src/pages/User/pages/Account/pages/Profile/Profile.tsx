import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import DateSelect from 'src/pages/User/components/DateSelect'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchemaType, profileSchema } from 'src/utils/rules'

type FormData = Pick<UserSchemaType, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1910, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch: refetchGetProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  })
  const updateUserMutation = useMutation({
    mutationFn: userApi.updateUser
  })
  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile?.name)
      setValue('address', profile?.address)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1910, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateUserMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString()
      })
      refetchGetProfile()
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  })
  const formData = watch()
  // console.log(formData, errors)

  return (
    <div className='rounded-sm bg-white px-4 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
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
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                type='text'
                placeholder='Nhập địa chỉ'
                register={register}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          ></Controller>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
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
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            {/* <div className='my-5 h-24 w-24'>
              <img
                src='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div> */}
            <div className='my-5 flex h-24 w-24 items-center  justify-center rounded-full bg-[#efefef]'>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='h-12 w-12'
                stroke='#c6c6c6'
              >
                <g>
                  <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit={10} />
                  <path
                    d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                    fill='none'
                    strokeLinecap='round'
                    strokeMiterlimit={10}
                    stroke='#c6c6c6'
                  />
                </g>
              </svg>
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
