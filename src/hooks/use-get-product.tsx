import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/api'
import { Product } from '../types/Product'
import toast from 'react-hot-toast'

const useGetProduct = (productTitle: string | undefined) => {
  return useQuery({
    queryKey: ['productDetails'],
    queryFn: getProducts,
    select: (products: Product[]) => {
      if (productTitle !== '') {
        const foundProduct = products.find(
          (product: Product) =>
            product.title.trim().replace('/', '') === productTitle?.trim()
        )
        return foundProduct ? foundProduct : undefined
      }
    },
    refetchOnWindowFocus: false,
    onError: (error: Error) =>
      toast.error('Something went wrong: ' + error.message),
  })
}
export default useGetProduct
