"use client";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteCookie, setCookie } from "../Utils/CookieHandler";

const getAuthData = async (token: string, userProfile?:string) => {
  try {
    const res = await fetch(`/api/auth/get-user-auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      const userData = {
        _id:data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        image: userProfile,
        phone_no: data.user.phone_no,
        address: data.user.address,
        pan_no: data.user.pan_no,
        storeName: data.user.storeName
      };
      return userData;
    } else {
      const data = await res.json();
      throw new Error(data.message);
    }
  } catch (err: any) {
    const error = err.message;
    toast.error(error || "Some error occured!");
  }
};

type user = {
  name: string;
  email: string;
  role: string;
  image:string;
};
interface AuthContextType {
  user: user;
  userToken: string;
  login: (token: string, userProfile:string) => void;
  logout: (callBackUrl: string) => void;
  isAuthorized: (pathname: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      const userProfile = sessionStorage.getItem("userProfile");
      if (token && !user) {
        try {
          const userData: any = await getAuthData(token, userProfile);
          setUser(userData);
          setUserToken(token);
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);


  const login = async (token: string, userProfile:string) => {
    const userData: any = await getAuthData(token, userProfile);
    setUser(userData);
    setUserToken(token);
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userProfile", userProfile);
    setCookie('authToken', token);
  };

  const logout = (callBackUrl: string) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userProfile")
    deleteCookie('authToken')
    setUser(null);
    setUserToken("");
    router.push(callBackUrl);
  };

  const updateUser = (updatedUserData) => {
    setUser((user) => ({
      ...user,
      ...updatedUserData
    }));
    sessionStorage.setItem("userProfile", updatedUserData.image);
  };
  return (
    <AuthContext.Provider
      value={{ user, userToken, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
