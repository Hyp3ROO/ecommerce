import type { Product } from '../../types/types'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ReactLoading from 'react-loading'
import FeaturedProduct from './FeaturedProduct'
import useGetProducts from '../../hooks/useGetProducts'

const FeaturedProducts = () => {
  const { data: products, isLoading, isSuccess } = useGetProducts('')
  const featuredProducts = isSuccess
    ? products.filter((product: Product) => product.rating.rate > 4.5)
    : []
  const featuredProductsList = featuredProducts?.map(
    (featuredProduct: Product) => (
      <div key={featuredProduct?.id}>
        <FeaturedProduct featuredProduct={featuredProduct} />
      </div>
    )
  )

  return (
    <div className='py-4'>
      <div className='pb-4'>
        <h2 className='mb-2 text-center text-3xl font-bold uppercase tracking-widest md:text-left'>
          Featured Products
        </h2>
        <div className='rounded-br-full rounded-bl-full bg-blue-500 p-1.5 md:w-32 md:rounded-bl-none' />
      </div>
      <div className='relative min-h-[10rem] py-10 md:min-h-[30rem]'>
        {!isLoading ? (
          <Carousel
            autoPlay
            infiniteLoop
            emulateTouch
            transitionTime={1000}
            showThumbs={false}
            preventMovementUntilSwipeScrollTolerance>
            {featuredProductsList}
          </Carousel>
        ) : (
          <ReactLoading
            type='bars'
            width={'20%'}
            height={'20%'}
            color='rgb(59 130 246)'
            className='absolute left-[50%] -translate-x-1/2'
          />
        )}
      </div>
    </div>
  )
}
export default FeaturedProducts
