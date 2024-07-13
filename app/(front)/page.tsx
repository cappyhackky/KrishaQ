import HomeBody from "@/Components/Home/HomeBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:"KrishaQ",
  description: "Welcome to KrishaQ, your one-stop-shop for all your questions and answers"
}
const Home = async () => {
  return (
    <>
      <HomeBody />
    </>
  );
}
export default Home