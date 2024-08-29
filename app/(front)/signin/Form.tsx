'use client'
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { user, login } = useContext(AuthContext) as any;
  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, callbackUrl, params, router]);
  const formSubmit: SubmitHandler<Inputs> = async (form) =>{
    const {email, password} = form
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json()
        login(data.jwtToken, data.userProfile);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error = err.message 
      toast.error(error || "Some error occured!");
    }
  }
  
  return(
    <>
    <div className="card max-w-sm mx-auto bg-fuchsia-100 m-4 p-4">
      <h2 className="card-title text-center w-full">
        Sign In
      </h2>
      <div className="card-body">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="email" className="label">Email</label>
            <input type="text" className="input rounded-sm input-bordered w-full"
            { ...register('email',{
              required:"E-mail is required",
              pattern:{
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message:"Enter a valid E-mail"
              },
            })} />
            {errors.email?.message&&(
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="email" className="label">Password</label>
            <input type="password" className="input rounded-sm input-bordered w-full"
            { ...register('password',{
              required:"Password is required",
            })} />
            {errors.password?.message&&(
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-4">
            <button className="btn  bg-lime-500 border-0 text-white hover:bg-lime-600 rounded-sm w-full" type="submit">
            {isSubmitting && (<span className="loading loading-spinner"></span>)}Sign In</button>
          </div>
          <div className="divider"></div>
            <div className="text-center">
              Not Registered? <a className="text-lime-600 underline" href={`/register?callbackUrl=${callbackUrl}`}><span>Register Now</span></a>
            </div>
        </form>
      </div>
    </div>
    </>
  )
};
export default Form;
