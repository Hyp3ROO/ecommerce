import type { Product } from '../types/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { auth, db } from '../auth/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import useStoreContext from '../hooks/useStoreContext'
import Button from '../components/ui/Button'
import CartItem from '../components/cart/CartItem'
import useGetProducts from '../hooks/useGetProducts'

const CartPage = () => {
  const { cartItems, setCartItems, user } = useStoreContext()
  const { data: products } = useGetProducts('')
  const [total, setTotal] = useState(0)
  const renderedCartItems = cartItems?.map((cartItem: Product) => (
    <CartItem key={cartItem.id} cartItem={cartItem} />
  ))

  const handleOrder = async () => {
    if (!user) {
      toast.error('You need to be signed in to make an order')
      return
    }
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'orders'), {
        orderDetails: cartItems,
        uid,
        total,
        createdAt: serverTimestamp(),
      })
      cartItems.forEach(async (cartItem: Product) => {
        await deleteDoc(doc(db, uid, cartItem.id))
      })
      setCartItems([])
      localStorage.cartItems = []
      toast.success('You made an order!')
    }
  }

  const handleDeleteAll = () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      cartItems.forEach(async (cartItem: Product) => {
        await deleteDoc(doc(db, uid, cartItem.id))
      })
    }
    products?.map((product: Product) => (product.quantity = 0))
    setCartItems([])
    localStorage.cartItems = []
    toast.error('Deleted all items from cart')
  }

  useEffect(() => {
    let totalPrice = 0
    cartItems.forEach((cartItem: Product) => {
      totalPrice += cartItem.price * cartItem.quantity
    })
    setTotal(Math.round(totalPrice * 100) / 100)
  }, [cartItems])

  return (
    <div className='relative w-full place-self-start'>
      {cartItems.length > 0 ? (
        <div className='lg:auto-cols-[2fr, 1fr] grid place-items-center gap-4 md:gap-8 lg:grid-flow-col lg:place-items-start lg:px-24'>
          <div>
            <div className='flex items-center justify-between pb-8'>
              <h2 className='text-2xl font-bold md:text-3xl'>Cart:</h2>
              <Button md onClick={handleDeleteAll}>
                Delete All
              </Button>
            </div>
            <div className='grid gap-12'>{renderedCartItems}</div>
          </div>
          <div className='flex flex-col items-center gap-4 md:items-start'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-bold md:text-3xl'>Total:</h2>
              <p className='text-xl md:text-2xl'>{total}$</p>
            </div>
            <Button lg onClick={handleOrder}>
              Make an Order
            </Button>
          </div>
        </div>
      ) : (
        <h2 className='text-center text-2xl md:text-3xl'>No items in cart</h2>
      )}
    </div>
  )
}
export default CartPage
