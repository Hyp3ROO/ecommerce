import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { Product } from '../types/Product'

const OrderItem = ({ order, products }: any) => {
  const renderedOrder = order?.map((order: any) => {
    const foundOrder = products?.find((product: Product) => {
      if (order.title === product.title) {
        return product
      }
    })

    return (
      <Link
        to={`/product/${foundOrder.id}`}
        key={order.id}
        className='flex flex-col items-center justify-center text-center duration-200 hover:scale-105'>
        <ProductImage
          image={order.image}
          alt={order.title}
          className='h-[4rem] rounded-lg bg-white object-contain p-4 md:h-[8rem]'
        />
      </Link>
    )
  })
  return <>{renderedOrder}</>
}
export default OrderItem
