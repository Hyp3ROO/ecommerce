import type { Order } from '../types/types'
import { Fragment, useState } from 'react'
import useStoreContext from '../hooks/useStoreContext'
import OrderItem from '../components/orders/OrderItem'
import withAuth from '../hoc/withAuth'
import { User } from 'firebase/auth'

const OrdersPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const { orders } = useStoreContext()

  const handleClick = (index: number) => {
    setExpandedIndex(currentExpandedIndex => {
      if (currentExpandedIndex === index) {
        return -1
      } else {
        return index
      }
    })
  }

  const renderedOrders = orders.map((order: Order, index: number) => {
    const isExpanded = index === expandedIndex
    let orderDate
    if (order.createdAt?.seconds) {
      orderDate = new Date(order.createdAt?.seconds * 1000).toUTCString()
    }

    return (
      <Fragment key={index}>
        <div className='flex flex-col items-center gap-4 text-center lg:grid lg:grid-flow-col lg:gap-24 lg:px-24'>
          <p className='font-bold'>Order: #{order.id}</p>
          <p className='text-xl font-bold'>Total: {order.total}$</p>
          <p>Ordered: {orderDate}</p>
          {isExpanded ? (
            <button
              className='cursor-pointer font-bold text-blue-500 duration-300 hover:scale-105'
              onClick={() => handleClick(index)}>
              Roll up your orders
            </button>
          ) : (
            <button
              className='cursor-pointer font-bold text-blue-500 duration-300 hover:scale-105'
              onClick={() => handleClick(index)}>
              Expand your orders
            </button>
          )}
          <div className='w-full rounded-br-full rounded-bl-full bg-blue-500 p-1.5 lg:hidden' />
        </div>
        <div className='flex flex-wrap items-center justify-center gap-8 md:gap-16'>
          {isExpanded && <OrderItem orderDetails={order.orderDetails} />}
        </div>
      </Fragment>
    )
  })

  return (
    <div className='self-start'>
      <h2 className='mb-12 text-center text-3xl font-bold uppercase tracking-widest'>
        Your Orders
      </h2>
      <div className='grid place-items-center justify-center gap-6 text-center lg:gap-16'>
        {renderedOrders.length > 0 ? (
          renderedOrders
        ) : (
          <p className='text-center text-xl'>
            You haven't ordered anything yet
          </p>
        )}
      </div>
    </div>
  )
}
export default withAuth({
  redirectCondition: (user: User | null | undefined) => !!user,
  redirectTo: '/',
})(OrdersPage)
