import type { Product } from '../types/types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetProduct from '../hooks/useGetProduct'
import ReactLoading from 'react-loading'
import Rating from '@mui/material/Rating'
import useStoreContext from '../hooks/useStoreContext'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'

const ProductDetailsPage = () => {
  const { cartItems, addProductToCart } = useStoreContext()
  const navigate = useNavigate()
  const { title } = useParams()
  const storedTitle = (localStorage.storedTitle = title)
  const {
    data: productDetails,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProduct(title || storedTitle)
  const cartItem = cartItems.find(
    (cartItem: Product) => cartItem.title === (productDetails?.title || '')
  )
  const [quantity, setQuantity] = useState(1)

  const handleClick = () => {
    if (productDetails) {
      if (cartItem?.quantity) {
        productDetails.quantity = quantity - 1 + cartItem.quantity
      } else {
        productDetails.quantity = quantity - 1
      }
      addProductToCart(productDetails)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (productDetails) {
        if (cartItem?.quantity) {
          productDetails.quantity = cartItem.quantity
        } else {
          productDetails.quantity = 1
        }
      } else {
        navigate('/404')
      }
    }
  })

  return (
    <>
      {isSuccess ? (
        isLoading || isFetching ? (
          <ReactLoading
            type='bars'
            width={'20%'}
            height={'20%'}
            color='rgb(59 130 246)'
            className='top-30 absolute left-[50%] -translate-x-1/2'
          />
        ) : (
          <div className='grid grid-flow-row place-items-center gap-8 px-4 text-center md:mt-8 md:grid-cols-2 md:gap-12 md:px-16 lg:px-32'>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className='h-[12rem] rounded-lg bg-white object-contain p-4 md:col-start-1 md:col-end-2 md:h-[20rem]'
              loading='lazy'
            />
            <div className='grid grid-flow-row place-items-center'>
              <h2 className='text-lg font-bold md:text-2xl'>
                {productDetails?.title}
              </h2>
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
              <Select
                quantity={quantity}
                handleChange={e => setQuantity(+e.currentTarget.value)}
                className='mb-6'
              />
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
