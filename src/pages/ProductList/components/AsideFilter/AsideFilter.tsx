import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { PriceRangeSchemaType, priceRangeSchema } from 'src/utils/rules'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'

interface AsideFilterProps {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<PriceRangeSchemaType>

export default function AsideFilter({ categories, queryConfig }: AsideFilterProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    shouldFocusError: false, // off tự động focus để tự handle focus
    resolver: yupResolver(priceRangeSchema)
  })
  const navigate = useNavigate()
  const formData = watch()
  console.log('formData', formData)
  console.log(queryConfig)

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, price_min: data.price_min, price_max: data.price_max }).toString()
    })
  })

  const handleSearchCategory = (categoryId: string) => {
    return createSearchParams({
      ...queryConfig,
      category: categoryId
    }).toString()
  }

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    })
    reset()
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !queryConfig.category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-black'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActiveCategory = categoryItem._id === queryConfig.category
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: handleSearchCategory(categoryItem._id)
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActiveCategory
                })}
              >
                {isActiveCategory && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/' className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  placeholder='đ TỪ'
                  inputClassName='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                  value={field.value}
                  ref={field.ref}
                  errorClassName='hidden'
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0 '>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  placeholder='đ Đến'
                  inputClassName='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                  value={field.value}
                  ref={field.ref}
                  errorClassName='hidden'
                />
              )}
            />
          </div>
          <div className='my-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='w-full items-center justify-center bg-orange p-2 px-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button
        onClick={handleRemoveAll}
        className='w-full items-center justify-center bg-orange p-2 px-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
