import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

type AddToCartParamsType = {
  product_id: string
  buy_count: number
}

export const purchaseApi = {
  addToCart: (params: AddToCartParamsType) => {
    return http.post<SuccessResponseApi<any>>(`${URL}/add-to-cart`, {
      params: params
    })
  }
}
