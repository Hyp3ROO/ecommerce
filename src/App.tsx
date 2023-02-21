import { useEffect, useState } from 'react'
import { fetchFromApi } from './api/api'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import AllProductsList from './components/AllProductsList'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
import { Product } from './types/Product'

const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]')
  })

  const addProductToCart = (product: Product) => {
    setCartItems([...cartItems, product])
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, product]))
  }

  const deleteProductFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(
      (cartItem: { id: number }) => cartItem.id !== id
    )
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  const fetchAllProducts = async () => {
    const response = await fetchFromApi('products')
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
                <NavBar />
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
                <NavBar />
              </header>
              <main className='p-12'>
                <CartPage
                  cartItems={cartItems}
                  deleteProductFromCart={deleteProductFromCart}
                />
              </main>
            </>
          }
        />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}
export default App
