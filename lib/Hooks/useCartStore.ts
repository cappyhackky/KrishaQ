import { create } from 'zustand'
import { round2 } from '../Utils/utility'
import { OrderItem } from '../Models/OrderModel'
import { persist } from 'zustand/middleware'

type Cart = {
  items: OrderItem[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
}

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0
}

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  })
)


export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x._id === item._id)
      const updatedCartItems = exist ?
        items.map((x) =>
          x._id === item._id ? { ...exist, qty: exist.qty + 1 } : x
        )
        : [...items, { ...item, qty: 1 }]
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems)
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x._id === item._id)
      if (!exist) return
      const updatedCartItems = exist.qty === 1 ?
      items.filter((x: OrderItem) => x._id !== item._id)
      :
      items.map((x) => (x._id === item._id ? { ...exist, qty: exist.qty - 1 } : x))
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems)
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
    }

  }
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 40),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}