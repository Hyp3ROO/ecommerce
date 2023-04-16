import ProductImage from './ProductImage'
import { Product } from '../types/Product'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

type ProductProps = {
  product: Product
  addProductToCart: (product: Product) => void
}

const ProductCard = ({ product, addProductToCart }: ProductProps) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg py-6 px-2'>
      <Link
        to={`/product/${product?.title.replace('/', '')}`}
        className='duration-200 hover:scale-105'>
        <ProductImage
          image={product?.image}
          alt={product?.title}
          className='h-[12rem] rounded-lg bg-white object-contain p-4 md:h-[20rem]'
        />
      </Link>
      <div className='flex flex-col items-center text-center'>
        <Link
          to={`/product/${product?.title.replace('/', '')}`}
          className='duration-200 hover:text-blue-500'>
          <h3 className='my-4 font-bold'>{product?.title}</h3>
        </Link>
        <p className='flex items-center justify-center gap-1 text-sm font-bold'>
          <Rating
            name='read-only'
            value={product?.rating.rate}
            precision={0.1}
            readOnly
          />
          ({product?.rating.count})
        </p>
        <p className='my-2 font-bold'>{`${product?.price}$`}</p>
        <button
          className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
          onClick={() => addProductToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
export default ProductCard
