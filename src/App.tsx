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

const notify = (text: string, color: string) =>
  toast(text, {
    style: { color },
  })

const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]')
  })

  const addProductToCart = (product: Product) => {
    if (product.quantity < 5) {
      product.quantity++
    } else {
      notify('You can only have 5 of the same thing in your cart!', 'orange')
      return
    }
    setCartItems([...cartItems, product])
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, product]))
    notify('Added item to cart', 'green')
  }

  const deleteProductFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id)
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    notify('Deleted item from cart', 'red')
  }

  const handleQuantityChange = (quantity: number, product: Product) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === product.id) {
        return { ...cartItem, quantity }
      }
      return cartItem
    })
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  const fetchAllProducts = async () => {
    const response = await getProducts()
    setProducts(response)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <header className='h-20'>
                <NavBar cartItems={cartItems} />
              </header>
              <main className='p-12'>
                <AllProductsList
                  products={products}
                  addProductToCart={addProductToCart}
                />
              </main>
            </>
          }
        />
        <Route
          path='/cart'
          element={
            <>
              <header className='h-20'>
                <NavBar cartItems={cartItems} />
              </header>
              <main className='p-12'>
                <CartPage
                  cartItems={cartItems}
                  deleteProductFromCart={deleteProductFromCart}
                  handleQuantityChange={handleQuantityChange}
                />
              </main>
            </>
          }
        />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          position: 'bottom-right',
          style: {
            background: 'white',
            border: '.5px solid gray',
          },
          duration: 800,
        }}
      />
    </div>
  )
}
export default App
