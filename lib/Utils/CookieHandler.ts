'use server'

import { cookies } from "next/headers";

export const setCookie = (cookieName: string, cookieValue: string) => {
  cookies().set({
    name: cookieName,
    value: cookieValue,
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite:'none'
  });
};

export const getCookie = (cookieName: string) => {
  const cookieStore = cookies();
  const cookieData = cookieStore.get(cookieName);
  return cookieData;
};

export const deleteCookie = (cookieName: string) => {
  cookies().delete(cookieName);
};
