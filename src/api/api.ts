import axios from 'axios'
import { toast } from 'react-hot-toast'

const getProducts = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_VERCEL_API_URL)
    return response.data
  } catch (error) {
    toast.error('Something went wrong')
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VERCEL_API_URL}/categories`
    )
    return response.data
  } catch (error) {
    toast.error('Something went wrong')
  }
}

export { getProducts, getCategories }
