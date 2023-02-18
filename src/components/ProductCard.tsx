type ProductProps = {
  product: {
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
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-6'>
      <img
        className='h-[20rem] object-contain'
        src={product?.image}
        alt={product?.title}
        loading='lazy'
      />
      <div className='flex flex-col items-center text-center'>
        <h3 className='my-4 font-bold'>{product?.title}</h3>
        <p className='my-2 font-bold'>{`${product?.price}$`}</p>
        <button className='rounded-lg border border-blue-700 px-10 py-2.5 text-center text-lg text-blue-700 duration-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800'>
          Buy Now
        </button>
      </div>
    </div>
  )
}
export default ProductCard
