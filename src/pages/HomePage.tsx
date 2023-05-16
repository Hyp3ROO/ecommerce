import FeaturedProducts from '../components/products/FeaturedProducts'
import ProductsCategories from '../components/products/ProductsCategories'
import ProductsList from '../components/products/ProductsList'

const HomePage = () => {
  return (
    <div className='w-full'>
      <FeaturedProducts />
      <ProductsCategories />
      <ProductsList />
    </div>
  )
}
export default HomePage
