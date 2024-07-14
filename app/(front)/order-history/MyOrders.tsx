'use client'

import { Order } from "@/lib/Models/OrderModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const MyOrders = () => {
  const router = useRouter();
  const { data: orders, error } = useSWR("/api/orders/mine");
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{
    setMounted(true)
  },[])
  console.log(orders);
  
  if (!mounted) return <></>;
  if (error) return <>Some error has occured on the MyOrders page</>;
  if (!orders) return <>Loading...</>;
  return(
    <>
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
                    {orders.map((order :Order)=>(
                        <tr>
                            <td>{order._id.substring(20,24)}</td>
                            <td>{order.createdAt}</td>
                            <td>₹ {order.totalPrice}</td>
                            <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                            <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                            <td><Link className="btn btn-sm btn-primary rounded" href={`/order/${order._id}`}>Details</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
};

export default MyOrders;
