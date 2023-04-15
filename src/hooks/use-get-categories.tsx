import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/api'

const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  })
}
export default useGetCategories
