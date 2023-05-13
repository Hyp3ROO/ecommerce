import type { Product } from '../../types/types'
import Rating from '@mui/material/Rating/Rating'
import { Link } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import Button from '../../components/ui/Button'

type FeaturedProductProps = {
  featuredProduct: Product
}

const FeaturedProduct = ({ featuredProduct }: FeaturedProductProps) => {
  const { addProductToCart } = useStoreContext()
  const handleClick = () => {
    addProductToCart(featuredProduct)
  }

  return (
    <div className='flex flex-col rounded-lg py-12 px-6 md:grid md:grid-cols-2 md:place-items-center md:py-6'>
      <Link
        to={`/product/${featuredProduct?.title.replace('/', '')}`}
        className='duration-200 hover:scale-105'>
        <img
          src={featuredProduct?.image}
          alt={featuredProduct?.title}
          className='h-[12rem] rounded-lg bg-white object-contain p-4 md:h-[20rem]'
          loading='lazy'
        />
      </Link>
      <div>
        <Link
          to={`/product/${featuredProduct?.title.replace('/', '')}`}
          className='duration-200 hover:text-blue-500'>
          <h3 className='my-4 text-lg font-bold md:text-2xl'>
            {featuredProduct?.title}
          </h3>
        </Link>
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
        <Button lg onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
export default FeaturedProduct
