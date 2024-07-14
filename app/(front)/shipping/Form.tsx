"use client";
import CheckOutSteps from "@/Components/CheckOutSteps";
import useCartService from "@/lib/Hooks/useCartStore";
import { ShippingAddress } from "@/lib/Models/OrderModel";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm, ValidationRule } from "react-hook-form";

const From = () => {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      pinCode: "",
      country: "",
    },
  });
  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("pinCode", shippingAddress.pinCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);
  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };
  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="my-2">
      <label htmlFor={id} className="label">
        {name}
      </label>
      <input
        type="text"
        id={id}
        className="input input-bordered w-full"
        {...register(id, {
          required: required && `${name} is required!`,
          pattern,
        })}
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id].message}</div>
      )}
    </div>
  );

  return (
    <>
      <CheckOutSteps current={1} />
      <div className="card w-11/12 md:w-2/3 mx-auto bg-fuchsia-100 m-4">
        <h2 className="card-title text-center w-full p-4">Shipping Address</h2>
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <FormInput name="Full Name" id="fullName" required />
              <FormInput name="Address" id="address" required />
              <FormInput name="City" id="city" required />
              <FormInput name="Pin Code" id="pinCode" required />
              <FormInput name="Country" id="country" required />
            </div>
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
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
