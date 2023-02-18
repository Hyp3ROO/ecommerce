import ProductCard from './ProductCard'

type ProductsProps = {
  id: number
  title: string
  category: string
  description: string
  image: string
  price: number
  rating: {
    count: number
    rate: number
  }
}

const ProductsList = ({ products }: any) => {
  const renderedProducts = products?.map((product: ProductsProps) => (
    <ProductCard key={product.id} product={product} />
  ))

  return (
    <>
      <div className='pb-4'>
        <h2 className='mb-2 text-center text-3xl font-bold uppercase tracking-widest md:text-left'>
          All products
        </h2>
        <div className='rounded-br-full rounded-bl-full bg-blue-500 p-1.5 md:w-32 md:rounded-bl-none' />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12'>
        {renderedProducts}
      </div>
    </>
  )
}
export default ProductsList
