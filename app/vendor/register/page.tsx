import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Vendor Registeration",
};

const Register = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default Register;
