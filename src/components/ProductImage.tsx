import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import ReactLoading from 'react-loading'

const ProductImage = ({ image, alt, ...rest }: any) => {
  return (
    <div className='relative'>
      <LazyLoadImage
        alt={alt}
        src={image}
        effect='blur'
        beforeLoad={() => (
          <ReactLoading
            type='bars'
            width={'20%'}
            height={'20%'}
            color='rgb(59 130 246)'
            className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
          />
        )}
        {...rest}
      />
    </div>
  )
}
export default ProductImage
