import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

type ProductImageProps = {
  image: string | undefined
  alt: string | undefined
  [rest: string]: any
}

const ProductImage = ({ image, alt, ...rest }: ProductImageProps) => {
  return <LazyLoadImage src={image} alt={alt} effect='blur' {...rest} />
}
export default ProductImage
