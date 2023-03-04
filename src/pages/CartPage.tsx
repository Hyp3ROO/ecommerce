import { Product } from '../types/Product'
import CartItem from '../components/CartItem'
import { useEffect, useState } from 'react'

type CartPageProps = {
  cartItems: Product[]
  deleteProductFromCart: (id: string) => void
  handleQuantityChange: (quantity: number, product: Product) => void
}

const CartPage = ({
  cartItems,
  deleteProductFromCart,
  handleQuantityChange,
}: CartPageProps) => {
  const [total, setTotal] = useState(0)
  const renderedCartItems = cartItems?.map((cartItem: Product) => (
    <CartItem
      key={cartItem.id}
      cartItem={cartItem}
      deleteProductFromCart={deleteProductFromCart}
      handleQuantityChange={handleQuantityChange}
    />
  ))

  useEffect(() => {
    let totalPrice = 0
    cartItems.forEach(cartItem => {
      totalPrice += cartItem.price * cartItem.quantity
    })
    setTotal(Math.round(totalPrice * 100) / 100)
  }, [cartItems])

  return (
    <div className='relative'>
      {cartItems.length > 0 ? (
        <div className='lg:auto-cols-[2fr, 1fr] grid place-items-center gap-4 lg:grid-flow-col lg:place-items-start lg:px-24'>
          <div>
            <h2 className='mb-8 text-2xl font-bold md:text-3xl'>Cart:</h2>
            <div className='grid gap-12'>{renderedCartItems}</div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-bold md:text-3xl'>Total:</h2>
              <p className='text-xl md:text-2xl'>{total}$</p>
            </div>
            <button className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='grid place-items-center'>
          <h2 className='text-2xl md:text-3xl'>No items in cart</h2>
        </div>
      )}
    </div>
  )
}
export default CartPage
