import ProductImage from './ProductImage'
import { Product } from '../types/Product'
import toast, { Toaster } from 'react-hot-toast'

type ProductProps = {
  product: Product
  addProductToCart: (product: Product) => void
}

const notify = () => toast('Successfully added item to cart')

const ProductCard = ({ product, addProductToCart }: ProductProps) => {
  const handleClick = () => {
    notify()
    addProductToCart(product)
  }

  return (
    <div className='flex flex-col items-center justify-center py-6'>
      <ProductImage
        image={product?.image}
        alt={product?.title}
        className='h-[20rem] object-contain'
      />
      <div className='flex flex-col items-center text-center'>
        <h3 className='my-4 font-bold'>{product?.title}</h3>
        <p className='my-2 font-bold'>{`${product?.price}$`}</p>
        <button
          className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
          onClick={handleClick}>
          Add to Cart
        </button>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: 'rgb(59 130 246)',
          },
          duration: 800,
        }}
      />
    </div>
  )
}
export default ProductCard
