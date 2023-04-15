import { useEffect, useState } from 'react'
import { getProducts } from './api/api'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Product } from './types/Product'
import { toast, Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import AllProductsList from './components/AllProductsList'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
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
import { auth, db } from './auth/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import FeaturedProducts from './components/FeaturedProducts'
import OrdersPage from './pages/OrdersPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import { useQuery } from '@tanstack/react-query'
import NotFound from './components/NotFound'

const App = () => {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  })
  const products = productsQuery.isSuccess ? productsQuery.data : []
  const featuredProducts = products.filter((product: Product) => {
    return product.rating.rate > 4.5
  })
  const [user] = useAuthState(auth)
  const [orders, setOrders] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]')
  })

  const addProductToCart = async (product: Product) => {
    if (product.quantity < 5) {
      product.quantity++
    } else {
      toast.error('You can only have 5 of the same thing in your cart!')
      return
    }
    const newCartItems = cartItems.filter(
      cartItem => cartItem.title !== product.title
    )
    setCartItems([...newCartItems, product])
    localStorage.setItem(
      'cartItems',
      JSON.stringify([...newCartItems, product])
    )
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const productExistInCart = cartItems.find(
        cartItem => cartItem.title === product.title
      )
      if (productExistInCart !== undefined) {
        await updateDoc(doc(db, uid, productExistInCart.id), {
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
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
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
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    toast.success('Changed quantity of item')
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await updateDoc(doc(db, uid, product.id), {
        cartItem: {
          ...product,
          quantity,
        },
      })
    }
  }

  const fetchCart = async () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const q = query(collection(db, uid))
      onSnapshot(q, querySnapshot => {
        let cartItems: any[] = []
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
        let orders: any[] = []
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

  useEffect(() => {
    fetchCart()
    fetchOrders()
  }, [user])

  return (
    <div className='relative min-h-screen overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white'>
      <header className='h-20'>
        <NavBar cartItems={cartItems} />
      </header>
      <main className='p-12'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeaturedProducts
                  featuredProducts={featuredProducts}
                  addProductToCart={addProductToCart}
                  productsQuery={productsQuery}
                />
                <AllProductsList
                  products={products}
                  addProductToCart={addProductToCart}
                  productsQuery={productsQuery}
                />
              </>
            }
          />
          <Route
            path='/cart'
            element={
              <CartPage
                cartItems={cartItems}
                setCartItems={setCartItems}
                deleteProductFromCart={deleteProductFromCart}
                handleQuantityChange={handleQuantityChange}
                products={products}
              />
            }
          />

          <Route
            path='/orders'
            element={
              user ? (
                <OrdersPage orders={orders} products={products} />
              ) : (
                <>
                  <p className='text-center text-3xl font-bold'>
                    Redirecting...
                  </p>
                  <Navigate to='/' />
                </>
              )
            }
          />
          <Route
            path='/product/:title'
            element={
              <ProductDetailsPage
                addProductToCart={addProductToCart}
                cartItems={cartItems}
                products={products}
              />
            }
          />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}
export default App
