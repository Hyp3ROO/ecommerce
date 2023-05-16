import type { Product } from '../../types/types'
import { Link } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import useGetProducts from '../../hooks/useGetProducts'

type OrderItemProps = {
  orderDetails?: Product[]
}

const OrderItem = ({ orderDetails }: OrderItemProps) => {
  const { data: products } = useGetProducts('')
  const renderedOrder = orderDetails?.map((orderDetails: Product) => {
    const product = products?.find((product: Product) => {
      if (orderDetails.title === product.title) {
        return product
      }
    })

    return (
      <Link
        to={`/product/${product?.title.replace('/', '')}`}
        key={orderDetails.id}
        className='flex flex-col items-center justify-center text-center duration-200 hover:scale-105'>
        <img
          src={orderDetails.image}
          alt={orderDetails.title}
          className='h-[4rem] rounded-lg bg-white object-contain p-4 md:h-[8rem]'
          loading='lazy'
        />
        <span className='pt-1 font-bold'>{`x${orderDetails.quantity}`}</span>
      </Link>
    )
  })
  return <>{renderedOrder}</>
}
export default OrderItem