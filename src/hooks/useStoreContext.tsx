import { useContext } from 'react'
import StoreContext from '../context/context'

const useStoreContext = () => {
  const storeContext = useContext(StoreContext)
  if (!storeContext)
    throw new Error(
      'No StoreContext.Provider found when calling useStoreContext.'
    )
  return storeContext
}
export default useStoreContext
