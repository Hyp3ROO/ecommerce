import { useState } from 'react'
import OrderItem from '../components/OrderItem'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

const OrdersPage = ({ orders, products }: any) => {
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

  const renderedOrders = orders?.map((order: any, index: number) => {
    const isExpanded = index === expandedIndex

    return (
      <>
        <div className='flex items-center gap-24 px-24 text-center'>
          <p className='font-bold'>Order: #{order.id}</p>
          <p className='text-xl font-bold'>Total: {order.total}$</p>
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
        <div className='flex flex-wrap items-center justify-center gap-16'>
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
      <div className='grid place-items-center justify-center gap-16 text-center'>
        {renderedOrders}
      </div>
    </>
  )
}
export default OrdersPage
