import Rating from '@mui/material/Rating/Rating'
import { Product } from '../types/Product'
import ProductImage from './ProductImage'

type FeaturedProductProps = {
  featuredProduct: Product
  addProductToCart: (product: Product) => void
}

const FeaturedProduct = ({
  featuredProduct,
  addProductToCart,
}: FeaturedProductProps) => {
  const handleClick = () => {
    addProductToCart(featuredProduct)
  }

  return (
    <div className='py-12 md:grid md:grid-cols-2 md:place-items-center'>
      <ProductImage
        image={featuredProduct?.image}
        alt={featuredProduct?.title}
        className='h-[12rem] object-contain md:h-[20rem]'
      />
      <div>
        <h3 className='my-4 text-lg font-bold md:text-2xl'>
          {featuredProduct?.title}
        </h3>
        <p className='flex items-center justify-center gap-1 text-sm font-bold'>
          <Rating
            name='read-only'
            value={featuredProduct?.rating.rate}
            precision={0.1}
            readOnly
          />
          ({featuredProduct?.rating.count})
        </p>
        <p className='my-2 text-lg font-bold'>{`${featuredProduct?.price}$`}</p>
        <button
          className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
          onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
export default FeaturedProduct
