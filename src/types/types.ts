import { UseQueryResult } from '@tanstack/react-query'
import { User } from '@firebase/auth'

export type Product = {
  quantity: number
  id: string
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

export type Order = {
  id: string
  total?: number
  uid?: string
  createdAt?: {
    seconds: number
  }
  orderDetails?: Product[]
}

export type StoreContextType = {
  user: User | null | undefined
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  cartItems: Product[]
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  products: Product[]
  productsQuery: UseQueryResult<any, unknown>
  featuredProducts: Product[]
  productsCategoriesQuery: UseQueryResult<any, unknown>
  addProductToCart: (product: Product) => Promise<void>
  deleteProductFromCart: (id: string) => Promise<void>
  handleQuantityChange: (quantity: number, product: Product) => Promise<void>
  fetchCart: () => Promise<void>
  fetchOrders: () => Promise<void>
}
