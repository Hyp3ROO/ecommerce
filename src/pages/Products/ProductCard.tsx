import type { Product } from '../../types/types'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'
import Button from '../../components/ui/Button'

type ProductProps = {
  product: Product
}

const ProductCard = ({ product }: ProductProps) => {
  const { addProductToCart } = useStoreContext()
  return (
    <div className='flex flex-col items-center justify-center rounded-lg py-6'>
      <Link
        to={`/product/${product?.title.replace('/', '')}`}
        className='duration-200 hover:scale-105'>
        <img
          src={product?.image}
          alt={product?.title}
          className='h-[12rem] rounded-lg bg-white object-contain p-4 md:h-[20rem]'
          loading='lazy'
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
        <Button lg onClick={() => addProductToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
export default ProductCard
