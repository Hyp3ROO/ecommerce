import { useEffect, useState } from 'react'
import { fetchFromApi } from './api/api'
import { Route, Routes } from 'react-router-dom'
import { Product } from './types/Product'
import { toast, Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import AllProductsList from './components/AllProductsList'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'

const notify = (text: string, color: string) =>
  toast(text, {
    style: { color },
  })

const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]')
  })

  const addProductToCart = (product: Product) => {
    if (!product.quantity) {
      product.quantity = 1
    } else if (product.quantity >= 5) {
      notify('You can only have 5 of the same thing in your cart!', 'orange')
      return
    } else {
      product.quantity++
    }
    const newCartItems = cartItems.filter(
      cartItem => cartItem.id !== product.id
    )
    setCartItems([...newCartItems, product])
    localStorage.setItem(
      'cartItems',
      JSON.stringify([...newCartItems, product])
    )
    notify('Added item to cart', 'green')
  }

  const deleteProductFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id)
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    notify('Deleted item from cart', 'red')
  }

  const handleQuantityChange = (quantity: number, product: Product) => {
    const cartItemToUpdate = cartItems.find(
      cartItem => cartItem.id === product.id
    )
    if (cartItemToUpdate !== undefined) {
      cartItemToUpdate.quantity = quantity
      const filteredCartItems = cartItems.filter(
        cartItem => cartItem.id !== product.id
      )
      const updatedCartItems = [...filteredCartItems, cartItemToUpdate]
      setCartItems(updatedCartItems)
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }
  }

  const fetchAllProducts = async () => {
    const response = await fetchFromApi('products')
    setProducts(response)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <header className='h-20'>
                <NavBar cartItems={cartItems} />
              </header>
              <main className='p-12'>
                <AllProductsList
                  products={products}
                  addProductToCart={addProductToCart}
                />
              </main>
            </>
          }
        />
        <Route
          path='/cart'
          element={
            <>
              <header className='h-20'>
                <NavBar cartItems={cartItems} />
              </header>
              <main className='p-12'>
                <CartPage
                  cartItems={cartItems}
                  deleteProductFromCart={deleteProductFromCart}
                  handleQuantityChange={handleQuantityChange}
                />
              </main>
            </>
          }
        />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          position: 'bottom-right',
          style: {
            background: 'white',
            border: '.5px solid gray',
          },
          duration: 800,
        }}
      />
    </div>
  )
}
export default App
