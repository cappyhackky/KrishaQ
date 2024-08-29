"use client";

import { Order } from "@/lib/Models/OrderModel";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const fetchOrders = async (url: string) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const MyOrders = () => {
  const { user } = useContext(AuthContext) as any;
  const url = user ? `/api/orders/mine?userId=${user._id}` : null;
  const { data: orders, error } = useSWR(url, fetchOrders);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [user]);

  if (!mounted) return <></>;
  if (!user) {
    return <div>Please log in to view your orders</div>;
  }
  if (error) return <>Some error has occured on the MyOrders page</>;
  if (!orders) return <>Loading...</>;
  return (
    <>
      {orders.length > 0 ?
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Order history</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(20, 24)}</td>
                    <td>{order.createdAt}</td>
                    <td>₹ {order.totalPrice}</td>
                    <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                    <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                    <td>
                      <Link
                        className="btn btn-sm rounded-sm bg-lime-500 border-0 text-white hover:bg-lime-600"
                        href={`/order/${order._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> :
        <div className="mx-auto w-11/12 sm:p-16 lg:p-16 grid md:grid-cols-2 mt-20">
        <div className="flex justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-lime-900 text-2xl">
          <div className="py-16 lg:p-16">
            No orders yet!{" "}
            <a href="/products/category/fruits" className="btn rounded bg-lime-500 border-0 text-white hover:bg-lime-600">Order Now</a>
          </div>
        </div>
        <div className="mx-auto p-16">
          <img src="/images/others/add-product.png" className="w-32" alt="Add Product" />
        </div>
      </div>
      }
    </>
  );
};

export default MyOrders;
