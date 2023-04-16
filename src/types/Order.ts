import { Product } from './Product'

export type Order = {
  id: string
  total?: number
  uid?: string
  createdAt?: {
    seconds: number
  }
  orderDetails?: Product[]
}
