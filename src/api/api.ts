import axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = 'https://fakestoreapi.com/products'

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    const err = error as AxiosError
    toast.error(err.message)
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  } catch (error) {
    const err = error as AxiosError
    toast.error(err.message)
  }
}

export { getProducts, getCategories }
