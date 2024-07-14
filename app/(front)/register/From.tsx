'use client'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const From = () => {
  const { data: session } = useSession();
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
    },
  });
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created Successfully!!!`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error = err.message && err.message.indexOf('E11000') === 0 ? 'User already exists!' : err.message;
      toast.error(error || "Some error occured!");
    }
  };
  return (
    <>
      <div className="card w-2/3 mx-auto bg-fuchsia-100 m-4 p-4">
        <h2 className="card-title text-center w-full">Register</h2>
        {params.get("error") && (
          <div className="alert text-error">
            {params.get("error") === "Configuration"
              ? "Invalid Email or Password"
              : params.get("error")}
          </div>
        )}
        {params.get("success") && (
          <div className="alert text-success">{params.get("success")}</div>
        )}
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="my-2">
              <label htmlFor="email" className="label">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name?.message && (
                <div className="text-error">{errors.name.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "E-mail is required",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Enter a valid E-mail",
                  },
                })}
              />
              {errors.email?.message && (
                <div className="text-error">{errors.email.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password?.message && (
                <div className="text-error">{errors.password.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="email" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>{
                    const {password} = getValues()
                    return password === value || 'Passwords Should match'
                  }
                })}
              />
              {errors.confirmPassword?.message && (
                <div className="text-error">{errors.confirmPassword.message}</div>
              )}
            </div>
            </div>
            <div className="my-4 md:w-1/2 mx-auto">
              <button className="btn btn-primary w-full" type="submit">
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Sign In
              </button>
            </div>
            <div className="divider"></div>
            <div className="text-center">
              Already have an account? <a className="text-primary underline" href={`/signin?callbackUrl=${callbackUrl}`}><span>Login</span></a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default From;
