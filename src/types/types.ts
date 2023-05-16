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

export type Form = {
  email: string
  password: string
  emailError: string
  passwordError: string
}

export type StoreContextType = {
  user: User | null | undefined
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  cartItems: Product[]
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  addProductToCart: (product: Product) => Promise<void>
  deleteProductFromCart: (id: string) => Promise<void>
  handleQuantityChange: (quantity: number, product: Product) => Promise<void>
  fetchCart: () => Promise<void>
  fetchOrders: () => Promise<void>
}
