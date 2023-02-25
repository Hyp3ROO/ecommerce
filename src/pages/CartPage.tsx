import { Product } from '../types/Product'
import CartItem from '../components/CartItem'

type CartPageProps = {
  cartItems: Product[]
  deleteProductFromCart: (id: number) => void
  handleQuantityChange: (quantity: number, product: Product) => void
}

const CartPage = ({
  cartItems,
  deleteProductFromCart,
  handleQuantityChange,
}: CartPageProps) => {
  const renderedCartItems = cartItems?.map((cartItem: Product) => (
    <CartItem
      key={cartItem.id}
      cartItem={cartItem}
      deleteProductFromCart={deleteProductFromCart}
      handleQuantityChange={handleQuantityChange}
    />
  ))

  return (
    <div className='relative'>
      {cartItems.length > 0 ? (
        <div className='lg:auto-cols-[2fr, 1fr] grid place-items-center gap-4 lg:grid-flow-col lg:place-items-start lg:px-24'>
          <div>
            <h2 className='mb-8 text-2xl font-bold md:text-3xl'>Cart:</h2>
            <div className='grid gap-12'>{renderedCartItems}</div>
          </div>
          <div>
            <h2 className='text-2xl font-bold md:text-3xl'>Subtotal:</h2>
          </div>
        </div>
      ) : (
        <div className='grid place-items-center'>
          <h2 className='text-2xl md:text-3xl'>No items in cart</h2>
        </div>
      )}
    </div>
  )
}
export default CartPage
