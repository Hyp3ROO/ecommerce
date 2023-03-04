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
