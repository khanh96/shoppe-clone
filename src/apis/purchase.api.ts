import { DeletePurChase, Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponseApi<Purchase[]>>(`${URL}`, {
      params: params
    })
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponseApi<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurChase: (purchaseIds: string[]) => {
    return http.delete<SuccessResponseApi<DeletePurChase>>(`${URL}`, {
      data: purchaseIds
    })
  },
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponseApi<Purchase[]>>(`${URL}/buy-products`, body)
  }
}

export default purchaseApi
