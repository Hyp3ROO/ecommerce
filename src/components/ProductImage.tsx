import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const ProductImage = ({ image, alt }: any) => {
  console.log(image, alt)
  return (
    <LazyLoadImage
      alt={alt}
      src={image}
      effect='blur'
      className='h-[20rem] object-contain'
    />
  )
}
export default ProductImage
