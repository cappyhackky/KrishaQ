'use client'
import useCartService from '@/lib/Hooks/useCartStore'
import { log } from 'console'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CartDetails = () => {
  const router = useRouter()
  const { items, itemsPrice, increase, decrease } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <>
      {items.length === 0 ? (
        <>
          <h2>Your Cart is empty</h2>
          <Link href={'/'}>Let's go shopping</Link>
        </>
      ) : (
        <>
          <h2>Cart Details</h2>
          <div className="grid md:grid-cols-4 md:gap-4">
            <div className="overflow-x-auto md:col-span-3">
              <table className="table">
                <thead className="text-2xl">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="text-lg">
                      <td>{index + 1}</td>
                      <td>
                        <Link href={`product/${item.id}`} className="flex items-center">
                          <img src={item.image} className="w-32" alt="thumbnail" />
                          <span>{item.name}</span>
                        </Link>
                      </td>
                      <td className="">
                        <button className="btn rounded btn-sm btn-primary p-1 py-0 text-xl" type="button" onClick={() => decrease(item)}>-</button>
                        <span>{item.qty}</span>
                        <button className="btn rounded btn-sm btn-primary p-1 py-0 text-xl" type="button" onClick={() => increase(item)}>+</button>
                      </td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="card bg-slate-200">
                <div className="card-body">
                  <ul>
                    <li>
                      <h2 className="text-2xl font-mediumbold">Subtotal ({items.reduce((prev, curr) => prev + curr.qty, 0)} items): ${itemsPrice}</h2>
                    </li>
                    <li>
                      <button className="btn btn-primary w-full" onClick={() => router.push('/shipping')}>
                        Proceed to Checkout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CartDetails
