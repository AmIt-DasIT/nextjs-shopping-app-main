"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTotal } from "@/redux/slice/cartSlice";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartModal from "./cart/CartModal";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useAppDispatch();
  const { totalQuantity } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);

  return (
    <header className="border-b sticky top-0 z-10">
      <nav className="flex items-center justify-between gap-8 w-[95%] m-auto h-12">
        <div className="font-bold text-2xl">
          <Link href={"/"}>Shopify</Link>
        </div>
        <div className="flex items-center gap-4">
          <CartModal
            children={
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                <div className="absolute top-[-5px] right-[-7px] bg-red-400 text-white w-3.5 h-3.5 rounded-full text-xs p-1 font-semibold flex items-center justify-center">
                  {totalQuantity}
                </div>
              </div>
            }
          />
          <button
            className="md:hidden inline-block"
            onClick={() => setOpenMenu(!openMenu)}
            title="Menu"
          >
            <Menu strokeWidth={1.25} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
