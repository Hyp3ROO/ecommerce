import { Product } from '../types/Product'
import { BsFillTrashFill } from 'react-icons/bs'
import ProductImage from './ProductImage'
import toast from 'react-hot-toast'
import { MdOutlineGppBad } from 'react-icons/md'

type CartItemProps = {
  cartItem: Product
  deleteProductFromCart: (id: number) => void
}

const notify = () =>
  toast('Deleted item from cart', {
    icon: <MdOutlineGppBad className='h-5 w-5 text-red-800' />,
  })

const CartItem = ({ cartItem, deleteProductFromCart }: CartItemProps) => {
  const handleDeleteClick = () => {
    notify()
    deleteProductFromCart(cartItem?.id)
  }

  return (
    <div className='auto-cols-[30rem, 5rem] grid grid-flow-col items-center gap-4 md:gap-24 md:px-12'>
      <div className='flex items-center gap-8 md:gap-16'>
        <ProductImage
          image={cartItem?.image}
          alt={cartItem?.title}
          className='w-[8rem]'
        />
        <div className='flex flex-col gap-3'>
          <h3 className='font-bold md:text-xl'>{cartItem?.title}</h3>
          <div className='md:text-lg'>
            <label className='mr-4'>Quantity</label>
            <select>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <p className='font-bold'>{`${cartItem?.price}$`}</p>
        </div>
      </div>
      <button className='group' onClick={handleDeleteClick}>
        <BsFillTrashFill className='text-xl text-blue-500 duration-200 group-hover:scale-110 group-hover:text-blue-700 md:text-2xl' />
      </button>
    </div>
  )
}
export default CartItem
