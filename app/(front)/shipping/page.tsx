import { Metadata } from "next";
import Form from "../shipping/Form";

export const metadata: Metadata = {
  title: "Shipping",
};

const Shipping = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default Shipping;
