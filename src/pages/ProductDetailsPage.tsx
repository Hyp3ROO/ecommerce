import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import useGetProduct from '../hooks/useGetProduct'
import ProductImage from '../components/ProductImage'
import ReactLoading from 'react-loading'
import Rating from '@mui/material/Rating'
import useStoreContext from '../hooks/useStoreContext'
import Button from '../components/Button'

const ProductDetailsPage = () => {
  const { cartItems, addProductToCart } = useStoreContext()
  const navigate = useNavigate()
  const { title } = useParams()
  const storedTitle = (localStorage.storedTitle = title)
  const productDetailsQuery = useGetProduct(title || storedTitle)
  const productDetails = productDetailsQuery.data
  const cartItem = cartItems.find(
    (cartItem: Product) => cartItem.title === (productDetails?.title || '')
  )
  if (productDetails) {
    if (cartItem?.quantity) {
      productDetails.quantity = cartItem.quantity
    } else {
      productDetails.quantity = 1
    }
  }
  const [quantity, setQuantity] = useState(1)

  const handleClick = () => {
    if (productDetails) {
      cartItem?.quantity
        ? (productDetails.quantity = quantity - 1 + cartItem.quantity)
        : (productDetails.quantity = quantity - 1)

      addProductToCart(productDetails)
    }
  }

  useEffect(() => {
    if (productDetailsQuery.isSuccess) {
      if (!productDetails) navigate('/404')
    }
  })

  return (
    <>
      {productDetailsQuery.isSuccess ? (
        productDetailsQuery.isLoading || productDetailsQuery.isFetching ? (
          <ReactLoading
            type='bars'
            width={'20%'}
            height={'20%'}
            color='rgb(59 130 246)'
            className='top-30 absolute left-[50%] -translate-x-1/2'
          />
        ) : (
          <div className='grid grid-flow-row place-items-center gap-8 px-4 text-center md:mt-8 md:grid-cols-2 md:gap-12 md:px-16 lg:px-32'>
            <ProductImage
              image={productDetails?.image}
              alt={productDetails?.title}
              className='h-[12rem] rounded-lg bg-white object-contain p-4 md:col-start-1 md:col-end-3 md:h-[20rem]'
            />
            <div className='grid grid-flow-row place-items-center'>
              <h1 className='font-bold md:text-2xl'>{productDetails?.title}</h1>
              <p className='my-2 flex items-center justify-start gap-1 font-bold'>
                <Rating
                  name='read-only'
                  value={productDetails?.rating.rate}
                  precision={0.1}
                  readOnly
                />
                ({productDetails?.rating.count})
              </p>
              <p className='my-2 text-lg font-bold md:text-xl'>{`${productDetails?.price}$`}</p>
              <p className='mb-6 text-sm'>{productDetails?.description}</p>
              <div className='mb-2 text-sm md:text-lg'>
                <label className='mr-4'>Quantity</label>
                <select
                  value={quantity}
                  onChange={e => setQuantity(+e.currentTarget.value)}
                  className='my-3 cursor-pointer rounded-lg border-none bg-blue-500 p-1 text-white'>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <Button lg onClick={handleClick}>
                Add to Cart
              </Button>
            </div>
          </div>
        )
      ) : (
        ''
      )}
    </>
  )
}
export default ProductDetailsPage
