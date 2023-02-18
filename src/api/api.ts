import axios, { AxiosError } from 'axios'

const API_URL = 'https://fakestoreapi.com/'

const fetchFromApi = async (endpoint: string) => {
  try {
    const response = await axios.get(API_URL + endpoint)
    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw new Error(err.message)
  }
}

export { fetchFromApi }
