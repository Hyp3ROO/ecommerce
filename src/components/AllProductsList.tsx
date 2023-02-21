import ProductCard from './ProductCard'
import ReactLoading from 'react-loading'
import { Product } from '../types/Product'

type ProductsProps = {
  products: Product[]
  addProductToCart: (product: Product) => void
}

const ProductsList = ({ products, addProductToCart }: ProductsProps) => {
  const renderedProducts = products?.map((product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
      addProductToCart={addProductToCart}
    />
  ))

  return (
    <>
      <div className='pb-4'>
        <h2 className='mb-2 text-center text-3xl font-bold uppercase tracking-widest md:text-left'>
          All products
        </h2>
        <div className='rounded-br-full rounded-bl-full bg-blue-500 p-1.5 md:w-32 md:rounded-bl-none' />
      </div>
      <div className='relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12'>
        {products.length > 0 ? (
          renderedProducts
        ) : (
          <ReactLoading
            type='bars'
            width={'20%'}
            height={'20%'}
            color='rgb(59 130 246)'
            className='absolute top-10 left-[50%] -translate-x-1/2'
          />
        )}
      </div>
    </>
  )
}
export default ProductsList
