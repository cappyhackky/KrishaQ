"use client";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useContext, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { FaMailBulk } from "react-icons/fa";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

type ProfileInputs = {
  phone_no: string;
  image: FileList;
  password: string;
  confirm_password: string;
};

const UserDashboard = () => {
  const { user, updateUser } = useContext(AuthContext) as any;
  if (!user) {
    return <div className="container flex h-full justify-center items-center mt-32"><span className="text-lime-600 loading loading-lg loading-dots"></span></div>
  }
  const [encodedImage, setEncodedImage] = useState(user.image || "");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<ProfileInputs>({
    defaultValues: {
      phone_no: user.phone_no || "",
    },
  });
  
  

  const password = watch("password");

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleProfileUpload = async () => {
    const profile = document.getElementById("profile")?.files[0];
    if (profile) {
      const profileEncoded = (await toBase64(profile)) as string;
      setEncodedImage(profileEncoded);
    } else {
      toast.error("No image selected!");
    }
  };

  const onSubmit: SubmitHandler<ProfileInputs> = async (form) => {
    const { phone_no, image, password, confirm_password } = form;
    const encImg =
      image.length > 0 ? ((await toBase64(image[0])) as string) : user.image;

    if (password && password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          update: {
            phone_no,
            image: encImg,
            ...(password && { password }), // Only send password if it has been changed
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      updateUser(data.updatedUserData);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user.");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex-shrink-0">
          <img
            className="w-full rounded-full aspect-square object-cover"
            src={encodedImage || user.image}
            alt={`${user.name}'s profile`}
          />
        </div>
        <div className="ml-6 shadow-md rounded-lg text-lime-900 col-span-2 p-8 bg-fuchsia-100">
          <h2 className="text-4xl font-semibold">{user.name}</h2>
          <p className="flex items-center gap-4">
            <FaMailBulk />
            {user.email}
          </p>
          <p className="flex items-center gap-4">
            <MdOutlinePermPhoneMsg />
            +91 {user.phone_no}
          </p>

          <form className="mt-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <label htmlFor="phone_no" className="label">
                Phone No.
              </label>
              <div className="join w-full">
                <div className="join-item btn rounded-l-sm bg-lime-500 border-0 text-white hover:bg-lime-500">
                  +91
                </div>
                <input
                  type="text"
                  className="input join-item rounded-sm input-bordered w-full"
                  {...register("phone_no", {
                    required: "Phone number is required.",
                    validate: (value) => {
                      const phoneRegex = /^[6-9]\d{9}$/;
                      return (
                        phoneRegex.test(value) ||
                        "Invalid phone number format."
                      );
                    },
                  })}
                />
              </div>
              {errors.phone_no?.message && (
                <div className="text-error">{errors.phone_no.message}</div>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="image" className="label">
                Profile Image
              </label>
              <div className="join w-full">
                <input
                  id="profile"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-ghost join-item rounded-sm input-bordered w-full"
                  {...register("image")}
                />
                <div
                  className="join-item btn bg-lime-500 hover:bg-lime-600 text-white border-0 rounded-sm px-10"
                  onClick={handleProfileUpload}
                >
                  Upload
                </div>
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="password" className="label">
                New Password
              </label>
              <input type="password" className="rounded-sm input input-bordered w-full" {...register("password")}/>
            </div>

            <div className="my-2">
              <label htmlFor="confirm_password" className="label">
                Confirm Password
              </label>
              <input type="password" className="rounded-sm input input-bordered w-full" {...register("confirm_password", {validate: (value) =>value === password || "Passwords do not match.",})}/>
              {errors.confirm_password?.message && (
                <div className="text-error">
                  {errors.confirm_password.message}
                </div>
              )}
            </div>

            <button className="btn bg-lime-500 border-0 text-white hover:bg-lime-600 rounded-sm w-full mt-4" type="submit">
              {isSubmitting && <span className="loading loading-spinner"></span>}
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
