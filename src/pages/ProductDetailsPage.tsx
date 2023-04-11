import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../api/api'
import { Product } from '../types/Product'
import ProductImage from '../components/ProductImage'
import ReactLoading from 'react-loading'
import Rating from '@mui/material/Rating'

type ProductDetailsProps = {
  addProductToCart: (product: Product) => void
}

const ProductDetailsPage = ({ addProductToCart }: ProductDetailsProps) => {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState<Product>()
  const [loading, setLoading] = useState(false)

  const fetchOneProduct = async (id: string) => {
    setLoading(true)
    const productInfo = await getOneProduct(id)
    setProductDetails(productInfo)
    setLoading(false)
  }

  const handleClick = () => {
    if (productDetails) {
      addProductToCart(productDetails)
    }
  }

  useEffect(() => {
    if (id) {
      fetchOneProduct(id)
    }
  }, [id])

  return (
    <>
      {loading ? (
        <ReactLoading
          type='bars'
          width={'20%'}
          height={'20%'}
          color='rgb(59 130 246)'
          className='absolute top-10 left-[50%] -translate-x-1/2'
        />
      ) : (
        <div className='grid grid-flow-row place-items-center gap-8 text-center'>
          <ProductImage
            image={productDetails?.image}
            alt={productDetails?.title}
            className='h-[12rem] rounded-lg bg-white object-contain p-4 md:h-[20rem]'
          />
          <div className='grid grid-flow-row place-items-center'>
            <h1 className='font-bold'>{productDetails?.title}</h1>
            <p className='my-2 flex items-center justify-start gap-1 font-bold'>
              <Rating
                name='read-only'
                value={productDetails?.rating.rate}
                precision={0.1}
                readOnly
              />
              ({productDetails?.rating.count})
            </p>
            <p className='my-2 text-lg font-bold'>{`${productDetails?.price}$`}</p>
            <p className='mb-6 text-sm'>{productDetails?.description}</p>
            <button
              className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'
              onClick={handleClick}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default ProductDetailsPage
