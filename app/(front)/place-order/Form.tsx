"use client";
import CheckOutSteps from "@/Components/CheckOutSteps";
import useCartService from "@/lib/Hooks/useCartStore";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

const Form = () => {
  const {user} = useContext(AuthContext) as any;
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();
  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        clear();
        toast.success("Order placed successfully!!!");
        return router.push(`/order-history`);
      } else {
        toast.error("Somethinng went wrong at place-order!");
      }
    }
  );
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (items.length === 0) {
      router.push("/");
    }
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return (
    <>
      <CheckOutSteps current={3} />
      <div className="grid md:grid-cols-4 md:gap-4 m-4">
        <div className="grid gap-4 md:col-span-3">
          <div className="card bg-fuchsia-100">
            <div className="card-body">
              <h2 className="card-title">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}</p>
              <p>{shippingAddress.pinCode}</p>
              <p>{shippingAddress.country}</p>
            </div>
            <div className="btn">
              <a href="/shipping">Edit</a>
            </div>
          </div>
          <div className="card bg-fuchsia-100">
            <div className="card-body">
              <h2 className="card-title">Payment Method</h2>
              <p>{paymentMethod}</p>
            </div>
            <div className="btn">
              <a href="/payment">Edit</a>
            </div>
          </div>
          <div className="card bg-fuchsia-100">
            <div className="card-body">
              <h2 className="card-title">Shopping Items</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.sku}>
                      <td>
                        <a
                          href={`/product/${item.sku}`}
                          className="flex-items-center"
                        >
                          {item.title}
                          vendor {item.vendor}
                        </a>
                      </td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btn">
              <a href="/payment">Edit</a>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-fuchsia-100">
            <div className="card-body">
              <div className="card-title">Order Summary</div>
              <ul className="space-y-3">
                <li>
                  <div className="flex justify-between">
                    <div>Items Total</div>
                    <div>{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Tax</div>
                    <div>{taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Shipping</div>
                    <div>{shippingPrice}</div>
                  </div>
                </li>
                <div className="divider"></div>
                <li>
                  <div className="flex justify-between">
                    <div>Grand Total</div>
                    <div>{totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    className="btn rounded-sm bg-lime-500 border-0 text-white hover:bg-lime-600 w-full"
                    onClick={() => {placeOrder()}}
                    disabled={isPlacing}
                  >
                  {isPlacing && (
                    <span className="loading loading-spinner"></span>
                  )}
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
