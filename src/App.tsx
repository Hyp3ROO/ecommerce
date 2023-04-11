import { useEffect, useState } from 'react'
import { getProducts } from './api/api'
import { Route, Routes } from 'react-router-dom'
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
  query,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from './auth/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import FeaturedProducts from './components/FeaturedProducts'
import OrdersPage from './pages/OrdersPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

const notify = (text: string, color: string) =>
  toast(text, {
    style: { color },
  })

const App = () => {
  const [user] = useAuthState(auth)
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]')
  })

  const addProductToCart = async (product: Product) => {
    if (product.quantity < 5) {
      product.quantity++
    } else {
      notify('You can only have 5 of the same thing in your cart!', 'orange')
      return
    }
    const newCartItems = cartItems.filter(
      cartItem => cartItem.id !== product.id
    )
    setCartItems([...newCartItems, product])
    localStorage.setItem(
      'cartItems',
      JSON.stringify([...newCartItems, product])
    )
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      await addDoc(collection(db, uid), {
        cartItem: product,
      })
    }
    notify('Added item to cart', 'green')
  }

  const deleteProductFromCart = async (id: string) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id)
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    notify('Deleted item from cart', 'red')
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
    notify('Changed quantity of item', 'royalblue')
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

  const fetchFeaturedProducts = async () => {
    const response = await getProducts()
    const featuredProducts = response?.filter((product: Product) => {
      return product.rating.rate > 4.5
    })
    setFeaturedProducts(featuredProducts)
  }

  const fetchProducts = async () => {
    const response = await getProducts()
    setProducts(response)
    fetchFeaturedProducts()
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
      const q = query(collection(db, 'orders'))
      onSnapshot(q, querySnapshot => {
        let orders: any[] = []
        querySnapshot.forEach(doc => {
          orders.push({ ...doc.data(), id: doc.id })
        })
        setOrders(orders)
      })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
                />
                <AllProductsList
                  products={products}
                  addProductToCart={addProductToCart}
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
                setOrders={setOrders}
                products={products}
              />
            }
          />
          <Route
            path='/orders'
            element={<OrdersPage orders={orders} products={products} />}
          />
          <Route
            path='/product/:id'
            element={<ProductDetailsPage addProductToCart={addProductToCart} />}
          />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </main>
      <Toaster
        toastOptions={{
          position: 'bottom-right',
          style: {
            background: 'white',
            border: '.5px solid gray',
          },
          duration: 1200,
        }}
      />
    </div>
  )
}
export default App
