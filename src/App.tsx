import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'
import useStoreContext from './hooks/useStoreContext'
import ReactLoading from 'react-loading'
import NavBar from './components/navbar/NavBar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
const CartPage = lazy(() => import('./pages/CartPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'))
const SignInPage = lazy(() => import('./pages/SignInPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const NotFound = lazy(() => import('./components/NotFound'))

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
        <Suspense
          fallback={
            <ReactLoading
              type='bars'
              width={'20%'}
              height={'20%'}
              color='rgb(59 130 246)'
              className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'
            />
          }>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/product/:title' element={<ProductDetailsPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position={isMobile ? 'bottom-center' : 'top-center'} />
      <Footer />
    </div>
  )
}
export default App
