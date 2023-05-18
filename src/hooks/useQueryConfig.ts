import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export const initialQueryConfig: QueryConfig = {
  page: '1',
  exclude: undefined,
  limit: '20',
  max: undefined,
  order: undefined,
  price_max: undefined,
  price_min: undefined,
  rating_filter: undefined,
  sort_by: undefined,
  category: undefined,
  name: undefined
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  // Lọc ra những params query để request lên api. lấy params query từ url xuống sẽ là kiểu string
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || initialQueryConfig.page,
      exclude: queryParams.exclude || initialQueryConfig.exclude,
      limit: queryParams.limit || initialQueryConfig.limit,
      max: queryParams.max || initialQueryConfig.max,
      order: queryParams.order || initialQueryConfig.order,
      price_max: queryParams.price_max || initialQueryConfig.price_max,
      price_min: queryParams.price_min || initialQueryConfig.price_min,
      rating_filter: queryParams.rating_filter || initialQueryConfig.rating_filter,
      sort_by: queryParams.sort_by || initialQueryConfig.sort_by,
      category: queryParams.category || initialQueryConfig.category,
      name: queryParams.name || initialQueryConfig.name
    },
    isUndefined
  )
  return queryConfig
}
