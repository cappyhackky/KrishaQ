"use client";
import { OrderItem } from "@/lib/Models/OrderModel";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useContext } from "react";
import useSWR from "swr";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { data: order, error } = useSWR(`/api/orders/${orderId}`);
  if (error) return error.message;
  if (!order) return <div className="flex h-full justify-center items-center mt-32"><span className="text-lime-600 loading loading-lg loading-dots"></span></div>
  const {
    shippingAddress,
    items,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    createdAt,
    updatedAt,
  } = order;
  return (
    <>
      <div className=" m-4">
        <h1 className="text-2xl py-4">Order: {orderId}</h1>
        <div className="grid md:grid-cols-4 md:gap-5 my-4">
          <div className="md:col-span-3">
            <div className="card bg-base-300">
              <div className="card-body">
                <h2 className="card-title">Shipping Address</h2>
                <p>{shippingAddress.fullName}</p>
                <p>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}{" "}
                </p>
                {isDelivered ? (
                  <div className="text-success">Delivered</div>
                ) : (
                  <div className="text-error">Not Delivered</div>
                )}
              </div>
            </div>
            <div className="card bg-base-300 mt-4">
              <div className="card-body">
                <h2 className="card-title">Payment Method</h2>
                <p>{paymentMethod}</p>
                {isPaid ? (
                  <div className="text-success">Paid</div>
                ) : (
                  <div className="text-error">Not Paid</div>
                )}
              </div>
            </div>
            <div className="card bg-base-300 mt-4">
              <div className="card-body">
                <h2 className="card-title">Items</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: OrderItem) => (
                      <tr key={item.sku}>
                        <td>
                          <a
                            href={`/product/${item.sku}`}
                            className="flex items-center"
                          >
                            <img
                              className="w-16 drop-shadow-lg"
                              src={item.image}
                              alt={item.name}
                            />
                          </a>
                        </td>
                        <td>{item.qty}</td>
                        <td>₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <h2 className="card-title">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>₹{itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>₹{taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div>₹{shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>₹{totalPrice}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
