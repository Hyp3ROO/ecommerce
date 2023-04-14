import { Product } from '../types/Product'
import CartItem from '../components/CartItem'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../auth/firebase'
import toast from 'react-hot-toast'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

type CartPageProps = {
  cartItems: Product[]
  setCartItems: (cartItems: Product[]) => void
  deleteProductFromCart: (id: string) => void
  handleQuantityChange: (quantity: number, product: Product) => void
  products: Product[]
}

const notify = (text: string, color: string) =>
  toast(text, {
    style: { color },
  })

const CartPage = ({
  cartItems,
  setCartItems,
  deleteProductFromCart,
  handleQuantityChange,
  products,
}: CartPageProps) => {
  const [user] = useAuthState(auth)
  const [total, setTotal] = useState(0)
  const renderedCartItems = cartItems?.map((cartItem: Product) => (
    <CartItem
      key={cartItem.id}
      cartItem={cartItem}
      deleteProductFromCart={deleteProductFromCart}
      handleQuantityChange={handleQuantityChange}
      products={products}
    />
  ))

  const handleOrder = async () => {
    if (!user) {
      notify('You need to be signed in to make an order', 'red')
      return
    }
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'orders'), {
        order: cartItems,
        uid,
        total,
        createdAt: serverTimestamp(),
      })
      cartItems.forEach(async cartItem => {
        await deleteDoc(doc(db, uid, cartItem.id))
      })
    }
    setCartItems([])
    localStorage.setItem('cartItems', '[]')
    notify('You made an order!', 'green')
  }

  const handleDeleteAll = () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      cartItems.forEach(async cartItem => {
        await deleteDoc(doc(db, uid, cartItem.id))
      })
    }
    products.map(product => (product.quantity = 0))
    setCartItems([])
    localStorage.setItem('cartItems', '[]')
    notify('Deleted all items from cart', 'red')
  }

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
        <div className='lg:auto-cols-[2fr, 1fr] grid place-items-center gap-4 md:gap-8 lg:grid-flow-col lg:place-items-start lg:px-24'>
          <div>
            <div className='flex items-center justify-between pb-8'>
              <h2 className='text-2xl font-bold md:text-3xl'>Cart:</h2>
              <button
                className='rounded-lg border border-blue-700 px-6 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
                onClick={handleDeleteAll}>
                Delete All
              </button>
            </div>
            <div className='grid gap-12'>{renderedCartItems}</div>
          </div>
          <div className='flex flex-col items-center gap-4 md:items-start'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-bold md:text-3xl'>Total:</h2>
              <p className='text-xl md:text-2xl'>{total}$</p>
            </div>
            <button
              className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
              onClick={handleOrder}>
              Make an Order
            </button>
          </div>
        </div>
      ) : (
        <h2 className='text-center text-2xl md:text-3xl'>No items in cart</h2>
      )}
    </div>
  )
}
export default CartPage
