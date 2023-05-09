import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.1625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            alt={product.name}
            src={product.image}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden px-2 pb-2'>
          <div className='mt-2 min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex flex-col items-start '>
            <div className='truncate text-gray-500 line-through'>
              <span className='tex-xs'>đ</span>
              <span className=''>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='truncate text-orange'>
              <span className='tex-xs'>đ</span>
              <span className=''>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <ProductRating rating={product.rating} />
            <div className='text-sm '>
              <span className='text-xs'>Đã bán </span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
