import axios, { AxiosError } from 'axios'
import { Product } from '../types/Product'

const API_URL = 'https://fakestoreapi.com/products'

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    const updatedResponse = response.data.map((item: Product) => {
      return { ...item, quantity: 0 }
    })
    return updatedResponse
  } catch (error) {
    const err = error as AxiosError
    throw new Error(err.message)
  }
}

export { getProducts }
