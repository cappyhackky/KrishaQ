"use client";

import useCartService from "@/lib/Hooks/useCartStore";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { useContext } from "react";
const UserOptions = () => {

  const { user, logout } = useContext(AuthContext) as any;
  const { init } = useCartService();

  const signOutHandler = () => {
    logout("/signin");
    init();
  };


  return (
    <>
      {(!user) && <button className="btn btn-ghost btn-circle font-thin">
        <a href="/vendor/register">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#291334"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" /></svg>
        </a>
      </button>}
      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.image || "/images/others/dummy_user.png"} alt="user"/>
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm space-y-2 dropdown-content text-lg z-[1] p-4 shadow-lg bg-fuchsia-50 text-lime-900 rounded-lg w-52">
            <li className="text-center font-bold border-b-2 border-lime-900">{user.name}</li>
            <li><a href={user.role == 'user' ? 'profile' : `/${user.role}/profile`}>Profile</a></li>
            {user.role === 'user' && <li><a href="/order-history">Order History</a></li>}
            <li onClick={signOutHandler}><a >Logout</a></li>
          </ul>
        </div>
      ) : (
        <a className="btn bg-lime-500 border-0 text-white hover:bg-lime-600 btn-sm rounded ms-3" href="/signin">Login</a>
      )}
    </>
  );
};

export default UserOptions;
