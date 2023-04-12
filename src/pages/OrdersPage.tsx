import { useState } from 'react'
import OrderItem from '../components/OrderItem'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { Product } from '../types/Product'

type Order = {
  id: string
  total?: number
  uid?: string
  createdAt?: {
    seconds: number
  }
  order?: Product[]
}

type OrdersProps = {
  orders: Order[]
  products: Product[]
}

const OrdersPage = ({ orders, products }: OrdersProps) => {
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const handleClick = (index: number) => {
    setExpandedIndex(currentExpandedIndex => {
      if (currentExpandedIndex === index) {
        return -1
      } else {
        return index
      }
    })
  }

  const renderedOrders = orders?.map((order: Order, index: number) => {
    const isExpanded = index === expandedIndex
    let orderDate
    if (order.createdAt?.seconds) {
      orderDate = new Date(order.createdAt?.seconds * 1000).toUTCString()
    }

    return (
      <>
        <div className='flex flex-col items-center gap-4 text-center md:flex-row md:gap-24 md:px-24'>
          <p className='font-bold'>Order: #{order.id}</p>
          <p className='text-xl font-bold'>Total: {order.total}$</p>
          <p>Ordered: {orderDate}</p>
          {isExpanded ? (
            <AiOutlineArrowUp
              className='cursor-pointer text-xl duration-300 hover:scale-110'
              onClick={() => handleClick(index)}
            />
          ) : (
            <AiOutlineArrowDown
              className='cursor-pointer text-xl duration-300 hover:scale-110'
              onClick={() => handleClick(index)}
            />
          )}
        </div>
        <div className='flex flex-wrap items-center justify-center gap-8 md:gap-16'>
          {isExpanded && (
            <OrderItem key={order.id} order={order.order} products={products} />
          )}
        </div>
      </>
    )
  })

  return (
    <>
      <h2 className='mb-12 text-center text-3xl font-bold uppercase tracking-widest'>
        Your Orders
      </h2>
      <div className='grid place-items-center justify-center gap-6 text-center md:gap-16'>
        {renderedOrders.length > 0 ? (
          renderedOrders
        ) : (
          <p className='text-center text-xl'>
            You haven't ordered anything yet
          </p>
        )}
      </div>
    </>
  )
}
export default OrdersPage
