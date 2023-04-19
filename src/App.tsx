import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import AllProductsList from './components/AllProductsList'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
import FeaturedProducts from './components/FeaturedProducts'
import OrdersPage from './pages/OrdersPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import NotFound from './components/NotFound'
import ProductsCategories from './components/ProductsCategories'
import useStoreContext from './hooks/useStoreContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { fetchCart, fetchOrders, user } = useStoreContext()

  useEffect(() => {
    fetchCart()
    fetchOrders()
  }, [user])

  return (
    <div className='relative min-h-screen overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white'>
      <header className='h-20'>
        <NavBar />
      </header>
      <main className='p-12'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeaturedProducts />
                <ProductsCategories />
                <AllProductsList />
              </>
            }
          />
          <Route path='/cart' element={<CartPage />} />
          <Route
            path='/orders'
            element={
              user ? (
                <OrdersPage />
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
          <Route path='/product/:title' element={<ProductDetailsPage />} />
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
