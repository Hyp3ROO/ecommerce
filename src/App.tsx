import { useEffect, useState } from 'react'
import { fetchFromApi } from './api/api'

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

  return <div>App</div>
}
export default App
