import { PropsWithChildren, createContext, useState } from 'react'
import type { Product } from '../types/Product'
import type { Order } from '../types/Order'
import type { StoreContextType } from '../types/StoreContextType'
import { toast } from 'react-hot-toast'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '../auth/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import useGetProducts from '../hooks/useGetProducts'
import useGetCategories from '../hooks/useGetCategories'

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const Provider = ({ children }: PropsWithChildren) => {
  const [user] = useAuthState(auth)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.cartItems || '[]')
  })
  const productsQuery = useGetProducts(selectedCategory)
  const products = productsQuery.isSuccess ? productsQuery.data : []
  const featuredProductsQuery = useGetProducts('')
  const featuredProducts = featuredProductsQuery.isSuccess
    ? featuredProductsQuery.data.filter(
        (product: Product) => product.rating.rate > 4.5
      )
    : []
  const productsCategoriesQuery = useGetCategories()

  const addProductToCart = async (product: Product) => {
    const cartItem = cartItems.find(
      cartItem => cartItem.title === (product?.title || '')
    )
    if (product.quantity && product.quantity < 5) {
      product.quantity++
    } else if (cartItem?.quantity) {
      if (cartItem?.quantity < 5) {
        product.quantity = cartItem.quantity + 1
      } else {
        toast.error('You can only have 5 of the same thing in your cart!')
        return
      }
    } else {
      product.quantity = 1
    }
    const newCartItems = cartItems.filter(
      cartItem => cartItem.title !== product.title
    )
    setCartItems([...newCartItems, product])
    localStorage.cartItems = JSON.stringify([...newCartItems, product])
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const productExistsInCart = cartItems.find(
        cartItem => cartItem.title === product.title
      )
      if (productExistsInCart !== undefined) {
        await updateDoc(doc(db, uid, productExistsInCart.id), {
          cartItem: product,
        })
      } else {
        await addDoc(collection(db, uid), {
          cartItem: product,
        })
      }
    }
    toast.success('Added item to cart')
  }

  const deleteProductFromCart = async (id: string) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id)
    setCartItems(updatedCartItems)
    localStorage.cartItems = JSON.stringify(updatedCartItems)
    toast.error('Deleted item from cart')
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await deleteDoc(doc(db, uid, id))
    }
  }

  const handleQuantityChange = async (quantity: number, product: Product) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === product.id) {
        return { ...cartItem, quantity }
      }
      return cartItem
    })
    setCartItems(updatedCartItems)
    localStorage.cartItems = JSON.stringify(updatedCartItems)
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await updateDoc(doc(db, uid, product.id), {
        cartItem: {
          ...product,
          quantity,
        },
      })
    }
    toast.success('Changed quantity of item')
  }

  const fetchCart = async () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const q = query(collection(db, uid))
      onSnapshot(q, querySnapshot => {
        let cartItems: Product[] = []
        querySnapshot.forEach(doc => {
          cartItems.push({ ...doc.data().cartItem, id: doc.id })
        })
        setCartItems(cartItems)
      })
    }
  }

  const fetchOrders = async () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
      onSnapshot(q, querySnapshot => {
        let orders: Order[] = []
        querySnapshot.forEach(doc => {
          if (uid === doc.data().uid) {
            orders.push({
              ...doc.data(),
              id: doc.id,
            })
          }
        })
        setOrders(orders)
      })
    }
  }

  const valueToShare = {
    user,
    setSelectedCategory,
    cartItems,
    setCartItems,
    orders,
    setOrders,
    products,
    productsQuery,
    featuredProducts,
    productsCategoriesQuery,
    addProductToCart,
    deleteProductFromCart,
    handleQuantityChange,
    fetchCart,
    fetchOrders,
  }

  return (
    <>
      <StoreContext.Provider value={valueToShare}>
        {children}
      </StoreContext.Provider>
    </>
  )
}

export { Provider }
export default StoreContext
