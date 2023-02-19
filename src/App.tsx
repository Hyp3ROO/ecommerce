import { useEffect, useState } from 'react'
import { fetchFromApi } from './api/api'
import NavBar from './components/NavBar'
import AllProductsList from './components/AllProductsList'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignInPage'

const App = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetchFromApi('products')
    setProducts(response)
  }

  const fetchAllCategories = async () => {
    const response = await fetchFromApi('products/categories')
    setCategories(response)
  }

  useEffect(() => {
    fetchAllProducts()
    fetchAllCategories()
  }, [])

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <header className='h-20'>
        <NavBar />
      </header>
      <Routes>
        <Route
          path='/'
          element={
            <main className='p-12'>
              <AllProductsList products={products} />
            </main>
          }
        />
        <Route path='/sign-in' element={<SignInPage />} />
      </Routes>
    </div>
  )
}
export default App
