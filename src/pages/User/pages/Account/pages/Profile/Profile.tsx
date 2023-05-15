import React from 'react'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-4 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>du***********@gmail.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
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
      </div>
    </div>
  )
}
