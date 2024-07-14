"use client";

import useCartService from "@/lib/Hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";

const UserOptions = () => {
  const { init } = useCartService();
  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };
  const { data: session } = useSession();

  return (
    <>
      {session && session.user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                //   src={session.user.image}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="text-center font-bold">{session.user.name}</li>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a href="/order-history">Order History</a>
            </li>
            <li onClick={signOutHandler}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className="btn btn-primary btn-sm rounded ms-3"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </div>
      )}
    </>
  );
};

export default UserOptions;
