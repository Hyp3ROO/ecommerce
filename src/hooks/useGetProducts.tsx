import type { Product } from '../types/types'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/api'

const useGetProducts = (selectedCategory: string) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products: Product[]) => {
      if (selectedCategory !== '') {
        return products.filter(
          (product: Product) => product.category === selectedCategory
        )
      } else {
        return products
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
export default useGetProducts
