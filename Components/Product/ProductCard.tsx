import { Product } from '@/lib/Models/ProductModel'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <div key={product.sku} className="p-4">
        <div className="card glass bg-yellow-500">
          <div className="indicator w-60 bg-white rounded m-8 mb-0 pb-0">
            <span className="indicator-item badge badge-primary p-2 text-xs">New</span>
              <Link href={`products/${product.sku}`}>
            <figure>
                <img className="transition-all ease-in-out duration-500 hover:scale-110 aspect-square object-scale-down" src={product.images[0]} alt="car!" />
            </figure>
              </Link>
          </div>
          <div className="card-body mt-0">
            <h2 className="card-title text-lg">{product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title}</h2>
            <p className="text-xs">{product.description.length > 75 ? product.description.substring(0, 75) + '...' : product.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProductCard