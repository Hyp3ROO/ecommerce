import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useStoreContext from './hooks/useStoreContext'
import NavBar from './components/NavBar'
import FeaturedProducts from './pages/Products/FeaturedProducts'
import ProductsCategories from './pages/Products/ProductsCategories'
import AllProductsList from './pages/Products/AllProductsList'
import CartPage from './pages/Cart/CartPage'
import OrdersPage from './pages/Orders/OrdersPage'
import ProductDetailsPage from './pages/Products/ProductDetailsPage'
import SignInPage from './pages/Login/SignInPage'
import SignUpPage from './pages/Signup/SignUpPage'
import NotFound from './components/NotFound'

const App = () => {
  const { fetchCart, fetchOrders, user } = useStoreContext()

  useEffect(() => {
    fetchCart()
    fetchOrders()
  }, [user])

  return (
    <div className='relative min-h-screen overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white'>
      <header>
        <NavBar />
      </header>
      <main className='min-h-screen place-items-center px-12 py-32 md:grid'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='w-full'>
                <FeaturedProducts />
                <ProductsCategories />
                <AllProductsList />
              </div>
            }
          />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:title' element={<ProductDetailsPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}
export default App
