import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  // Lọc ra những params query để request lên api. lấy params query từ url xuống sẽ là kiểu string
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      exclude: queryParams.exclude,
      limit: queryParams.limit || 5,
      max: queryParams.max,
      order: queryParams.order,
      price_max: queryParams.price_max,
      rating_filter: queryParams.rating_filter,
      price_min: queryParams.price_min,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true // giữ cho ui k bị giật khi query api
  })
  console.log(data?.data.data)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          {data && (
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
