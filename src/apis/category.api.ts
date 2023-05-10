import { Category } from 'src/types/category.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getCategories = () => {
  return http.get<SuccessResponseApi<Category[]>>('categories')
}
