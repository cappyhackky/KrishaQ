"use client";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_no: string;
  role: string;
  image: FileList;
};

const From = () => {
  const { user } = useContext(AuthContext) as any;
  const [encodedImage, setEncodedImage] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_no: ""
    },
  });
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, user]);
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  // const handleProfileUpload = async () => {
  //   const profile = document.getElementById("profile")?.files[0];
  //   const profileEncoded = await toBase64(profile);
  //   setEncodedImage(profileEncoded);
  // };
  const handleProfileUpload = async () => {
    const profile = document.getElementById("profile")?.files[0];
    if (profile) {
      const profileEncoded = await toBase64(profile) as string;
      setEncodedImage(profileEncoded);
    } else {
      toast.error("No image selected!")
    }
  };
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password, image, phone_no } = form;
    const encImg = await toBase64(image[0]);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role: "user", encImg, phone_no }),
      });
      if (res.ok) {
        return router.push(`/signin?callbackUrl=${callbackUrl}&success=Account has been created Successfully!!!`);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error = err.message && err.message.indexOf("E11000") === 0 ? "User already exists!" : err.message;
      toast.error(error || "Some error occured!");
    }
  };
  return (
    <>
      <div className="max-w-sm mx-auto text-center">
        {params.get("error") && (
          <div className="alert text-error">{params.get("error") === "Configuration" ? "Invalid Email or Password" : params.get("error")}</div>
        )}
        {params.get("success") && (
          <div className="alert text-success">{params.get("success")}</div>
        )}
      </div>
      <div className="flex flex-col md:flex-row-reverse md:w-4/5 items-center justify-center mx-auto">
        <div className="md:w-1/3 flex justify-center items-center p-4">
          {<img className="h-64 w-64 rounded-full aspect-square object-cover" src={encodedImage ? encodedImage : "/images/others/dummy_user.png"} alt="encodedImage" />}
        </div>
        <form className="form md:w-2/3 p-4 border md:m-4 shadow-lime-300 rounded-md shadow" onSubmit={handleSubmit(formSubmit)}>
          <h2 className="card-title text-center w-full">Register</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="my-2">
              <label htmlFor="email" className="label">Name</label>
              <input type="text" className="input rounded-sm input-bordered w-full" {...register("name", { required: "Name is required", })} />
              {errors.name?.message && (<div className="text-error">{errors.name.message}</div>)}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">Email</label>
              <input type="text" className="input rounded-sm input-bordered w-full" {...register("email", { required: "E-mail is required", pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: "Enter a valid E-mail", } })} />
              {errors.email?.message && (<div className="text-error">{errors.email.message}</div>)}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">Password</label>
              <input type="password" className="input rounded-sm input-bordered w-full" {...register("password", { required: "Password is required", })} />
              {errors.password?.message && (<div className="text-error">{errors.password.message}</div>)}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">Confirm Password</label>
              <input type="password" className="input rounded-sm input-bordered w-full" {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => { const { password } = getValues(); return password === value || "Passwords Should match"; } })} />
              {errors.confirmPassword?.message && (<div className="text-error">{errors.confirmPassword.message}</div>)}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">Phone No.</label>
              <div className="join w-full">
                <div className="join-item btn rounded-l-sm bg-lime-500 border-0 text-white hover:bg-lime-500">+91</div>
                <input type="text" className="input join-item rounded-sm input-bordered w-full" {...register("phone_no", {
                  required: "Phone number is required.", validate: (value) => {
                    const phoneRegex = /^[6-9]\d{9}$/;
                    return phoneRegex.test(value) || "Invalid phone number format.";
                  }
                })} />
              </div>
              {errors.phone_no?.message && (<div className="text-error">{errors.phone_no.message}</div>)}
            </div>
            <div className="my-2">
              <label htmlFor="image" className="label">Profile Image</label>
              <div className="join">
                <input id="profile" type="file" accept="image/*" className="file-input file-input-ghost join-item rounded-sm input-bordered w-full" {...register("image", { required: "Profile Image is required", })} />
                <div className="join-item btn bg-lime-500 hover:bg-lime-600 text-white border-0 rounded-sm px-10" onClick={handleProfileUpload}>Upload</div>
              </div>
              {errors.image?.message && (<div className="text-error">{errors.image.message}</div>)}
            </div>
          </div>
          <div className="my-4 md:w-1/2 mx-auto">
            <button className="btn  bg-lime-500 border-0 text-white hover:bg-lime-600 rounded-sm w-full" type="submit">{isSubmitting && (<span className="loading loading-spinner"></span>)}Sign In</button>
          </div>
          <div className="divider"></div>
          <div className="text-center">Already have an account?{" "}
            <a className="text-lime-600 underline" href={`/signin?callbackUrl=${callbackUrl}`}><span>Login</span></a>
          </div>
        </form>
      </div>
    </>
  );
};

export default From;
