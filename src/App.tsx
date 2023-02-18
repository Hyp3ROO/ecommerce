import { useEffect, useState } from 'react'
import { fetchFromApi } from './api/api'
import NavBar from './components/NavBar'
import ProductsList from './components/ProductsList'

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
      <main className='p-12'>
        <ProductsList products={products} />
      </main>
    </div>
  )
}
export default App
