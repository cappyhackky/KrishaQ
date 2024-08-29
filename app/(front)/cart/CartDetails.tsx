"use client";
import useCartService from "@/lib/Hooks/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartDetails = () => {
  const router = useRouter();
  const { items, itemsPrice, increase, decrease } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <>
      {items.length === 0 ? (
        <>
          <div className="mx-auto w-11/12 sm:p-16 lg:p-16 grid md:grid-cols-2 mt-20">
            <div className="flex justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-lime-900 text-2xl">
              <div className="py-16 lg:p-16">
                Cart is empty!{" "}
                <Link
                  href="/"
                  className="btn rounded bg-lime-500 border-0 text-white hover:bg-lime-600"
                >
                  Go shopping
                </Link>
              </div>
            </div>
            <div className="mx-auto p-16">
              <img src="images/others/cart.png" className="w-32" alt="" />
              {/* <span className="text-4xl"><BiCart/></span> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <h2>Cart Details</h2> */}
          <div className="m-4 grid md:grid-cols-4 md:gap-4">
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
                        <Link
                          href={`product/${item._id}`}
                          className="flex items-center"
                        >
                          <img
                            src={`${item.images[0]}`}
                            className="w-24"
                            alt="thumbnail"
                          />
                          <span>{item.name}</span>
                        </Link>
                      </td>
                      <td className="">
                        
                        <button
                          className="btn rounded btn-sm bg-lime-500 border-0 text-white hover:bg-lime-600 px-4 py-0 text-xl"
                          type="button"
                          onClick={() => decrease(item)}
                        >
                          -
                        </button>
                        <span className="px-6">{item.qty}</span>
                        <button
                          className="btn rounded btn-sm bg-lime-500 border-0 text-white hover:bg-lime-600 px-4 py-0 text-xl"
                          type="button"
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                        
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
                    <li><h2 className="text-xl p-4 mx-auto">Subtotal ({items.reduce((prev, curr) => prev + curr.qty, 0)}{" "} items): ₹ {itemsPrice}</h2></li>
                    <li><button className="btn bg-lime-500 border-0 text-white hover:bg-lime-600 w-full rounded" onClick={() => router.push("/shipping")}>Proceed to Checkout</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetails;
