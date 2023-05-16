import mensClothing from '../../assets/men.jpg'
import womensClothing from '../../assets/women.jpg'
import jewelery from '../../assets/jewellery.jpg'
import electronics from '../../assets/electronics.jpg'
import allCategories from '../../assets/allcategories.jpg'
import ReactLoading from 'react-loading'
import toast from 'react-hot-toast'
import useStoreContext from '../../hooks/useStoreContext'
import useGetCategories from '../../hooks/useGetCategories'

type Images = {
  "men's clothing": string
  "women's clothing": string
  jewelery: string
  electronics: string
}

const ProductsCategories = () => {
  const { setSelectedCategory } = useStoreContext()
  const { data: productsCategories, isLoading, isFetching } = useGetCategories()
  const images: Images = {
    "men's clothing": mensClothing,
    "women's clothing": womensClothing,
    jewelery,
    electronics,
  }

  const handleSelect = (e: React.MouseEvent) => {
    const selectedCategory = e.currentTarget.firstElementChild?.textContent
    if (selectedCategory) {
      if (selectedCategory === 'all categories') {
        setSelectedCategory('')
      } else {
        setSelectedCategory(selectedCategory)
      }
    }
    toast.success('Selected category: ' + selectedCategory)
  }

  return (
    <div className='py-4'>
      <div className='pb-4 md:pb-10'>
        <h2 className='mb-2 text-center text-3xl font-bold uppercase tracking-widest md:text-left'>
          Categories
        </h2>
        <div className='rounded-br-full rounded-bl-full bg-blue-500 p-1.5 md:w-32 md:rounded-bl-none' />
        <div className='relative mt-6 flex min-h-[10rem] flex-col justify-around gap-4 md:grid md:grid-flow-col md:gap-6'>
          {isLoading || isFetching ? (
            <ReactLoading
              type='bars'
              width={'15%'}
              height={'15%'}
              color='rgb(59 130 246)'
              className='absolute top-10 left-[50%] -translate-x-1/2 md:top-0'
            />
          ) : (
            <>
              <div
                className='z-100 before:-z-1 relative grid cursor-pointer place-items-center rounded-lg text-white duration-200 before:absolute before:inset-0 before:h-full before:w-full before:rounded-lg before:bg-black/50 hover:scale-105'
                onClick={e => handleSelect(e)}>
                <h3 className='absolute px-2 text-center font-bold uppercase tracking-widest'>
                  all categories
                </h3>
                <img
                  src={allCategories}
                  alt='all categories'
                  className='h-[4rem] w-full rounded-lg object-cover md:h-[10rem] md:w-[10rem] lg:h-[12rem] lg:w-[12rem]'
                  loading='lazy'
                />
              </div>
              {productsCategories.map((category: string, index: number) => (
                <div
                  key={index}
                  className='z-100 before:-z-1 relative grid cursor-pointer place-items-center rounded-lg text-white duration-200 before:absolute before:inset-0 before:h-full before:w-full before:rounded-lg before:bg-black/50 hover:scale-105'
                  onClick={e => handleSelect(e)}>
                  <h3 className='absolute px-2 text-center font-bold uppercase tracking-widest'>
                    {category}
                  </h3>
                  <img
                    src={images[category as keyof Images]}
                    alt={category}
                    className='h-[4rem] w-full rounded-lg object-cover md:h-[10rem] md:w-[10rem] lg:h-[12rem] lg:w-[12rem]'
                    loading='lazy'
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductsCategories
