import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/api'
import { Product } from '../types/Product'

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
  })
}
export default useGetProduct
