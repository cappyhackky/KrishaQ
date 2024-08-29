'use client'
import CheckOutSteps from "@/Components/CheckOutSteps";
import useCartService from "@/lib/Hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const From = () => {
    const router = useRouter();    
    const {paymentMethod, savePaymentMethod, shippingAddress} = useCartService();    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        savePaymentMethod(selectedPaymentMethod);
        router.push('/place-order')
    }
    useEffect(()=>{
        if(!shippingAddress.address){
            router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || 'UPI')
    },[shippingAddress.address, router, paymentMethod])
  return (
    <>
      <CheckOutSteps current={2} />
      <div className="card w-11/12 md:w-1/2 mx-auto bg-fuchsia-100 m-4">
        <h2 className="card-title text-center w-full p-4">Payment Method</h2>
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit}>
            {['Cash on Delivery'].map((payment)=>(
            // {['UPI', 'Cash on Delivery'].map((payment)=>(
                <div key={payment}>
                    <label className="label cursor-pointer">
                        <span className="label-text">{payment}</span>
                        <input type="radio" name="paymentMethod" className="radio" value={payment} checked={selectedPaymentMethod === payment} onChange={()=>{setSelectedPaymentMethod(payment)}} />
                    </label>
                </div>
            ))}
            <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                type="submit"
                className="btn rounded-sm shadoe border-lime-500 border-0 text-lime-500 hover:bg-lime-600 hover:text-white w-full"
                onClick={()=>{router.back()}}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn rounded-sm bg-lime-500 border-0 text-white hover:bg-lime-600 w-full"
              >
                Next
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default From;
