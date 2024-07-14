'use client'
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();
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
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) =>{
    const {email, password} = form
    signIn('credentials',{
        email,
        password,
    })
  }
  
  return(
    <>
    <div className="card max-w-sm mx-auto bg-fuchsia-100 m-4 p-4">
      <h2 className="card-title text-center w-full">
        Sign In
      </h2>
      {params.get('error') && (
          <div className="alert text-error">
            {params.get('error') === 'Configuration'?
            'Invalid Email or Password'
            :
            params.get('error')
            }
          </div>
        )}
        {params.get('success') && (
          <div className="alert text-success">{params.get('success')}</div>
          )}
      <div className="card-body">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="email" className="label">Email</label>
            <input type="text" className="input input-bordered w-full"
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
            <input type="password" className="input input-bordered w-full"
            { ...register('password',{
              required:"Password is required",
            })} />
            {errors.password?.message&&(
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-4">
            <button className="btn btn-primary w-full" type="submit">
            {isSubmitting && (
              <span className="loading loading-spinner"></span>
            )}
            Sign In
            </button>
          </div>
          <div className="divider"></div>
            <div className="text-center">
              Not Registered? <a className="text-primary underline" href={`/register?callbackUrl=${callbackUrl}`}><span>Register Now</span></a>
            </div>
        </form>
      </div>
    </div>
    </>
  )
};
export default Form;
