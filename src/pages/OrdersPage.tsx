import type { Order } from '../types/types'
import { Fragment, useState } from 'react'
import useStoreContext from '../hooks/useStoreContext'
import OrderItem from '../components/orders/OrderItem'
import withAuth from '../hoc/withAuth'
import { User } from 'firebase/auth'

const OrdersPage = () => {
  const [expandedIndex, setExpandedIndex] = useState('')
  const { orders } = useStoreContext()

  const handleClick = (index: string) => {
    setExpandedIndex(currentExpandedIndex => {
      if (currentExpandedIndex === index) {
        return ''
      } else {
        return index
      }
    })
  }

  const renderedOrders = orders.map((order: Order) => {
    const isExpanded = order.id === expandedIndex
    let orderDate
    if (order.createdAt?.seconds) {
      orderDate = new Date(order.createdAt?.seconds * 1000).toUTCString()
    }

    return (
      <div key={order.id} className='grid gap-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <p className='font-bold'>Order: #{order.id}</p>
          <p className='text-xl font-bold'>Total: {order.total}$</p>
          <p>Ordered: {orderDate}</p>
          {isExpanded ? (
            <button
              className='cursor-pointer font-bold text-blue-500 duration-300 hover:scale-105'
              onClick={() => handleClick(order.id)}>
              Roll up your orders
            </button>
          ) : (
            <button
              className='cursor-pointer font-bold text-blue-500 duration-300 hover:scale-105'
              onClick={() => handleClick(order.id)}>
              Expand your orders
            </button>
          )}
          <div className='w-full rounded-br-full rounded-bl-full bg-blue-500 p-1.5' />
        </div>
        <div className='grid grid-cols-fill justify-center gap-6'>
          {isExpanded && <OrderItem orderDetails={order.orderDetails} />}
        </div>
      </div>
    )
  })

  return (
    <div className='self-start'>
      <h2 className='mb-12 text-center text-3xl font-bold uppercase tracking-widest'>
        Your Orders
      </h2>
      <div className='grid gap-16 text-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
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
