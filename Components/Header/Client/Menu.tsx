"use client";
import useCartService from "@/lib/Hooks/useCartStore";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items, itemsPrice, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div className="dropdown dropdown-end z-40">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {mounted && items.length != 0 && (
              <span className="badge badge-sm indicator-item">
                {items.reduce((a, c) => a + c.qty, 0)}{" "}
              </span>
            )}
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-3 card card-compact dropdown-content rounded-sm w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            {mounted && items.length != 0 && (
              <span className="font-bold text-lg">
                {items.reduce((a, c) => a + c.qty, 0)} Items
              </span>
            )}
            <span className="text-lime-900 text-xl">Subtotal: ₹ {itemsPrice}</span>
            <div className="card-actions">
              <Link href="/cart" className="btn rounded-sm bg-lime-500 border-0 text-white hover:bg-lime-600 btn-block">
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
