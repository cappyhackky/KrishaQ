import { Product } from "@/lib/Models/ProductModel";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <div key={product.sku} className="p-4">
        <div className="card glass bg-white rounded-sm">
          <div className="w-60 bg-white rounded m-8 mb-0 p-4">
            <Link href={`/products/${product.sku}`}>
              <img
                className="w-fit transition-all ease-in-out duration-500 hover:scale-105 aspect-square object-scale-down"
                src={product.images[0]}
                alt={product.title}
              />
            </Link>
          </div>
          <div className="card-body mt-0">
            <h2 className="card-title text-lg">
              {product.title.length > 20
                ? product.title.substring(0, 20) + "..."
                : product.title}
            </h2>
            <p className="text-xs">
              {product.description.length > 30
                ? product.description.substring(0, 27) + "..."
                : product.description}
            </p>
            <div className="card-actions border-t-2 border-lime-500 py-2">
              <Link href={`/products/${product.sku}`} className="w-full">
                <button className="btn w-full bg-lime-500 border-0 text-white hover:bg-lime-600 rounded-sm">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
