import { sortBy, order as orderConst } from 'src/constants/product'

import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface SortProductListProp {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: SortProductListProp) {
  const { sort_by = sortBy.view, order = orderConst.asc } = queryConfig
  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (priceOrderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        sort_by: 'price',
        order: priceOrderValue
      }).toString()
    })
  }
  const handleSearchParams = (pageNumber: number) => {
    return createSearchParams({
      ...queryConfig,
      page: pageNumber.toString()
    })
  }
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp thêm</div>
          <button
            onClick={() => handSort(sortBy.view)}
            className={classNames('h-8 px-4 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handSort(sortBy.createdAt)}
            className={classNames('h-8 px-4 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handSort(sortBy.sold)}
            className={classNames('h-8 px-4 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm outline-none', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option className='bg-white text-black' value={orderConst.asc}>
              Giá: Thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderConst.desc}>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className=''>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center'>
            {page === 1 ? (
              <span className='flex h-8 cursor-not-allowed items-center rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: handleSearchParams(page - 1).toString()
                }}
                className='flex h-8 items-center rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className=' flex h-8 cursor-not-allowed items-center rounded-tr-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: handleSearchParams(page + 1).toString()
                }}
                className='flex h-8 items-center rounded-tr-sm bg-white/60 px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
