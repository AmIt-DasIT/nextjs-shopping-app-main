"use client";

import useDeviceSize from "@/lib/useDeviceSize";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decItem,
  handleEditCartMode,
  handleSelectAll,
  handleSelectCart,
  incItem,
  removeCart,
  removeSelectedCart,
  setTotal,
} from "@/redux/slice/cartSlice";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { width } = useDeviceSize();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const {
    cart,
    totalPrice,
    totalQuantity,
    editCartMode,
    selectCart,
    selectAll,
  } = useAppSelector((state) => state.cart);
  const { authStatus } = useAppSelector((state) => state.user);

  const handleCheckout = async () => {
    try {
      if (authStatus) {
        const { data } = await axios.post("/api/payment", {
          cart,
        });

        localStorage.setItem(
          "order",
          JSON.stringify({
            items: cart,
            totalQuantity,
            totalPrice,
          })
        );
        localStorage.removeItem("myCart");

        router.push(data.url);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);

  return (
    <main className="bg-gray-100 relative">
      <section className="py-4 max-md:pt-0">
        {cart.length > 0 && (
          <>
            {width < 768 && (
              <div className="flex items-center justify-between p-4 mb-4 bg-white">
                <p>My Cart ({totalQuantity})</p>
                <button
                  onClick={() => dispatch(handleEditCartMode(!editCartMode))}
                >
                  {!editCartMode ? "Edit" : "Cancel"}
                </button>
              </div>
            )}
          </>
        )}
        {cart.length > 0 ? (
          cart.map((elm) => (
            <div
              className="flex items-center gap-4 p-4 md:px-8 bg-white mb-4"
              key={elm._id}
            >
              {editCartMode && width < 768 && (
                <div>
                  <input
                    type="checkbox"
                    name="edit"
                    id="edit"
                    checked={selectCart.includes(elm._id)}
                    onChange={() =>
                      dispatch(
                        handleSelectCart({
                          id: elm._id,
                          cartLength: cart.length,
                        })
                      )
                    }
                  />
                </div>
              )}
              <div>
                <figure className="sm:w-28 sm:h-28 w-16 h-16">
                  {/* <Image
                    src={elm.img}
                    width={width > 640 ? 100 : 60}
                    height={width > 640 ? 100 : 60}
                    alt={elm.title}
                    className="w-full h-full object-scale-down"
                  /> */}
                </figure>
              </div>
              <div className="flex-1 flex sm:items-center max-sm:justify-between max-sm:flex-col">
                <h2 className="md:text-xl font-medium flex-1">{elm.title}</h2>
                <div className="flex-1 flex items-center">
                  <p className="md::text-lg flex-1">{elm.price}</p>
                  <div className="flex-1 flex items-center md:justify-center justify-end">
                    <button
                      className="w-6 h-6 sm:w-8 sm:h-8 border flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed "
                      disabled={elm.quantity <= 1}
                      onClick={() => {
                        dispatch(decItem(elm._id));
                        dispatch(setTotal());
                      }}
                    >
                      <Minus strokeWidth={1.5} size={18} />
                    </button>
                    <span className="w-10 h-6 sm:w-12 sm:h-8 inline-flex items-center justify-center border-t border-b">
                      {elm.quantity}
                    </span>
                    <button
                      className="w-6 h-6 sm:w-8 sm:h-8 border flex items-center justify-center hover:bg-gray-100"
                      onClick={() => {
                        dispatch(incItem(elm._id));
                        dispatch(setTotal());
                      }}
                    >
                      <Plus strokeWidth={1.5} size={18} />
                    </button>
                  </div>
                  <div className="flex-1 hidden md:flex items-center justify-end">
                    <button
                      className=" w-4 h-4 hover:scale-125"
                      onClick={() => {
                        dispatch(removeCart(elm._id));
                        dispatch(setTotal());
                      }}
                    >
                      <X strokeWidth={1.5} size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center pt-8">
            <p className="text-4xl font-medium">Your cart is empty!</p>
          </div>
        )}
      </section>
      {cart.length > 0 && (
        <>
          {editCartMode && width < 768 ? (
            <div className="fixed bottom-0 inset-x-0 px-8 h-[72px] bg-white flex gap-8 items-center justify-between">
              <label htmlFor="all" className="">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  checked={selectAll}
                  onChange={() =>
                    dispatch(handleSelectAll(cart.map((c) => c._id)))
                  }
                />{" "}
                All
              </label>
              <button
                className="rounded-none"
                disabled={selectCart.length < 1}
                onClick={() => {
                  dispatch(removeSelectedCart());
                  dispatch(setTotal());
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="fixed bottom-0 inset-x-0 px-8 h-[72px] bg-white flex gap-8 items-center justify-end">
              <p className="font-medium text-xl">{totalPrice}</p>
              <button className="rounded-none " onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Page;
