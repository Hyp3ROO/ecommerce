import { Product } from '../types/Product'
import { BsFillTrashFill } from 'react-icons/bs'
import ProductImage from './ProductImage'
import { useState } from 'react'

type CartItemProps = {
  cartItem: Product
  deleteProductFromCart: (id: string) => void
  handleQuantityChange: (quantity: number, product: Product) => void
}

const CartItem = ({
  cartItem,
  deleteProductFromCart,
  handleQuantityChange,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const handleDeleteClick = () => {
    cartItem.quantity = 0
    deleteProductFromCart(cartItem?.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(+e.currentTarget.value)
    handleQuantityChange(+e.currentTarget.value, cartItem)
  }

  return (
    <div className='flex items-center gap-6 md:gap-24'>
      <ProductImage
        image={cartItem?.image}
        alt={cartItem?.title}
        className='w-24 md:w-32'
      />
      <div className='flex flex-col gap-2'>
        <h3 className='text-sm font-bold md:text-xl'>{cartItem?.title}</h3>
        <div className='text-xs md:text-lg'>
          <label className='mr-4'>Quantity</label>
          <select
            value={quantity}
            onChange={e => handleChange(e)}
            className='p-1'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <p className='font-bold'>{`${cartItem?.price}$`}</p>
      </div>
      <button className='group' onClick={handleDeleteClick}>
        <BsFillTrashFill className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
      </button>
    </div>
  )
}
export default CartItem
