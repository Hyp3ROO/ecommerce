import type { Product } from '../../types/types'
import Rating from '@mui/material/Rating'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import useStoreContext from '../../hooks/useStoreContext'

type ProductProps = {
  product: Product
}

const ProductCard = ({ product }: ProductProps) => {
  const { addProductToCart } = useStoreContext()
  return (
    <div className='flex flex-col items-center rounded-lg'>
      <Link
        to={`/product/${product?.title.replace('/', '')}`}
        className='duration-200 hover:scale-105'>
        <img
          src={product?.image}
          alt={product?.title}
          className='h-[12rem] rounded-lg bg-white object-contain p-4 md:h-[20rem]'
          loading='lazy'
          width={300}
          height={200}
        />
      </Link>
      <div className='flex flex-col place-items-center text-center md:grid md:grid-rows-[85px_minmax(5px,_1fr)_70px]'>
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
        <p className='my-2 text-2xl font-bold'>{`${product?.price}$`}</p>
        <Button lg onClick={() => addProductToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
export default ProductCard
