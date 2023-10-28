import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'
import useStoreContext from './hooks/useStoreContext'
import NavBar from './components/navbar/NavBar'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import NotFound from './components/NotFound'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'

const App = () => {
  const { fetchCart, fetchOrders, user } = useStoreContext()
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    fetchCart()
    fetchOrders()
  }, [user])

  return (
    <div className='relative overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white'>
      <header>
        <NavBar />
      </header>
      <main className='min-h-screen place-items-center px-12 py-32 md:grid'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:title' element={<ProductDetailsPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position={isMobile ? 'bottom-center' : 'top-center'} />
      <Footer />
    </div>
  )
}
export default App
