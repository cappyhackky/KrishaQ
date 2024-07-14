import { Metadata } from "next";
import { title } from "process";
import OrderDetails from "./OrderDetails";

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  return { title: `Order - ${params.id}` };
};

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <OrderDetails orderId={params.id} />
    </>
  );
};

export default OrderDetailPage;
