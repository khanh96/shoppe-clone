import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

export const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<SuccessResponseApi<ProductList>>('products', {
      params: params
    })
  },
  getProduct: (id: string) => {
    return http.get<SuccessResponseApi<Product>>(`products/${id}`)
  }
}
