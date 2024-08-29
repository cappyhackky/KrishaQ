import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Sign In",
};

const Signin = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default Signin;
