'use client'
import useCartService from "@/lib/Hooks/useCartStore"
import { OrderItem } from "@/lib/Models/OrderModel"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const AddToCart = ({ item }: { item: OrderItem }) => {
  // const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((x) => x.sku === item.sku))
  }, [item, items])

  const addToCartHandler = () => {
    increase(item)
  }
  return (
    existItem ? (
      <div className="flex items-center justify-between w-2/3 mx-auto border">
        <button className="btn rounded btn-primary text-2xl" type="button" onClick={()=>{decrease(existItem)}}>-</button>
        <span>{existItem.qty}</span>
        <button className="btn rounded btn-primary text-2xl" type="button" onClick={()=>{increase(existItem)}}>+</button>
      </div>) : (
      <button className="btn w-full bg-lime-600 text-lg border-0 text-white hover:bg-lime-700" type="button" onClick={addToCartHandler}>Add to Cart</button>)
  )
}

export default AddToCart