import type { Product } from '../../types/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import { BsFillTrashFill } from 'react-icons/bs'
import useGetProducts from '../../hooks/useGetProducts'
import Select from '../ui/Select'

type CartItemProps = {
  cartItem: Product
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { deleteProductFromCart, handleQuantityChange } = useStoreContext()
  const { data: products } = useGetProducts('')
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const product = products?.find((product: Product) => {
    if (cartItem.title === product.title) {
      return product
    }
  })

  const handleDeleteClick = () => {
    cartItem.quantity = 0
    deleteProductFromCart(cartItem?.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(+e.currentTarget.value)
    handleQuantityChange(+e.currentTarget.value, cartItem)
  }

  return (
    <div className='flex items-center gap-6 text-black dark:text-white md:gap-24'>
      <Link
        to={`/product/${product?.title.replace('/', '')}`}
        className='duration-200 hover:scale-105'>
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className='w-24 rounded-lg bg-white p-4 md:w-32'
          loading='lazy'
        />
      </Link>
      <div className='flex flex-col gap-2'>
        <Link
          to={`/product/${product?.title.replace('/', '')}`}
          className='duration-200 hover:text-blue-500'>
          <h3 className='text-sm font-bold md:text-lg xl:hidden'>
            {`${cartItem?.title.substring(0, 16)}...`}
          </h3>
          <h3 className='hidden text-xl font-bold xl:block'>
            {cartItem?.title}
          </h3>
        </Link>
        <Select quantity={quantity} handleChange={e => handleChange(e)} />
        <p className='text-2xl font-bold'>{`${cartItem?.price}$`}</p>
      </div>
      <button className='group' onClick={handleDeleteClick}>
        <BsFillTrashFill className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
      </button>
    </div>
  )
}
export default CartItem
