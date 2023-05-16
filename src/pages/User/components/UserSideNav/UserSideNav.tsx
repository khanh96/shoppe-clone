import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='mb-5'>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={
              profile?.avatar ||
              'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            }
            alt='avatar'
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name || 'No name'}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              alt=''
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='h-full w-full'
            />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.changePassword} className='mt-3 flex items-center capitalize  transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              alt=''
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='h-full w-full'
            />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.historyPurchase} className='mt-3 flex items-center capitalize  transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              alt=''
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              className='h-full w-full'
            />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}
