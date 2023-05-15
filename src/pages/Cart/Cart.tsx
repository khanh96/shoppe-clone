import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}

export default function Cart(): JSX.Element {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch: purchasesRefetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    }
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      purchasesRefetch()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data
  // check mọi object purchase checked trong mảng extendedPurchases === true thì isAllChecked === true
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked === true)

  // console.log(purchasesInCart)
  useEffect(() => {
    if (purchasesInCart) {
      setExtendedPurchases((preExtendedPurchases) => {
        const preExtendedPurchasesObject = keyBy(preExtendedPurchases, '_id')
        return (
          purchasesInCart.map((purchase) => {
            return { ...purchase, checked: Boolean(preExtendedPurchasesObject[purchase._id]?.checked), disabled: false }
          }) || []
        )
      })
    }
  }, [purchasesInCart])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueChecked = event.target.checked
    // sử dụng immer js để mutate state
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = valueChecked
      })
    )
  }
  const handleChecked = () => {
    setExtendedPurchases((preExtendedPurchase) => {
      return preExtendedPurchase.map((p) => {
        return {
          ...p,
          checked: !isAllChecked
        }
      })
    })
  }
  const handleDeleteChecked = () => {
    setExtendedPurchases((preExtendedPurchase) => {
      return preExtendedPurchase.map((p) => {
        return {
          ...p,
          checked: false
        }
      })
    })
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    const purchase = extendedPurchases[purchaseIndex]
    if (enable) {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {/* HEADER */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-4 py-6 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleChecked}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {/* BODY */}
            <div className='my-3 rounded-sm shadow'>
              {extendedPurchases?.map((purchase, index) => {
                return (
                  <div
                    key={purchase._id}
                    className='mt-3 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 last:mb-3'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleCheck(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex items-center'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='h-20 w-20 flex-shrink-0'
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pb-2 pt-1 text-left'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6 flex items-center'>
                      <div className='grid grid-cols-5 items-center '>
                        <div className='col-span-2'>
                          <div className='flex items-center items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              đ{formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3 '>đ{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            classNameWrapper='flex items-center'
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onType={(value) => handleTypeQuantity(index, value)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            đ{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button className='transition-color hover: bg-none hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex flex-col rounded-sm bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center justify-start '>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleChecked}
              />
            </div>
            <div>
              <button onClick={handleChecked} className='mx-3 border-none bg-none'>
                Chọn tất cả ({extendedPurchases.length})
              </button>
              <button onClick={handleDeleteChecked} className='mx-3 border-none bg-none'>
                Xóa
              </button>
            </div>
          </div>
          <div className='mt-5 flex flex-col sm:ml-auto  sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'>đ194555</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>đ194555</div>
              </div>
            </div>
            <Button className='ml-4 mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
