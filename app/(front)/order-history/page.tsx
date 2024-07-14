import { Metadata } from "next";
import MyOrders from "./MyOrders";
export const metadata:Metadata = {
  title:'Order History'
}
const OrderHistory = () => {
  return (
    <>
      <MyOrders />
    </>
  );
};

export default OrderHistory;
