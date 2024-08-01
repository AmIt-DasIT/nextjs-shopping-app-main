import * as React from "react";
import { IndianRupee, Minus, Plus, X } from "lucide-react";
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
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";

export default function CartModal({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const {
    cart,
    totalPrice,
    totalQuantity,
    editCartMode,
    selectCart,
    selectAll,
  } = useAppSelector((state) => state.cart);

  React.useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </DrawerTrigger>
      <DrawerContent className="mt-10">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerClose asChild>
            <X
              strokeWidth={2}
              size={20}
              className="hover:scale-125 cursor-pointer"
            />
          </DrawerClose>
        </DrawerHeader>
        <div className="h-fit max-w-2xl p-4 flex flex-col gap-y-4">
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <div
                className="flex justify-between gap-20 items-center"
                key={cartItem._id}
              >
                <div className="flex gap-3.5">
                  <div className="relative">
                    <img
                      src={cartItem.img}
                      alt={cartItem.title}
                      className="rounded-md w-16 h-16"
                    />
                    <X
                      strokeWidth={2}
                      size={17}
                      className="hover:scale-105 p-0.5 cursor-pointer bg-gray-600 text-white rounded-full absolute -top-1 -right-1"
                      onClick={() => {
                        dispatch(removeCart(cartItem._id));
                        dispatch(setTotal());
                      }}
                    />
                  </div>
                  <div>
                    <div>{cartItem.title}</div>
                    <div className="text-gray-500">{cartItem.title}</div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-0.5 items-center">
                    <IndianRupee className="h-4 w-4" />
                    {Math.round(cartItem.price * cartItem.quantity)}
                  </div>
                  <div className="flex w-fit gap-4 border rounded items-center">
                    <Button
                      variant="link"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => {
                        dispatch(decItem(cartItem._id));
                        dispatch(setTotal());
                      }}
                      disabled={cartItem.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="tracking-tighter">{cartItem.quantity}</div>
                    <Button
                      variant="link"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => {
                        dispatch(incItem(cartItem._id));
                        dispatch(setTotal());
                      }}
                      disabled={cartItem.quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">Empty Cart</div>
              </div>
            </div>
          )}
          <hr className="mb-1.5" />

          <DrawerFooter>
            <div className="flex justify-between items-center">
              <div>Taxes</div>
              <div className="flex gap-0.5 items-center">
                <IndianRupee className="h-4 w-4" />
                {(Math.round(totalPrice * 12) / 100).toFixed(0)}
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <div>Shipping</div>
              <div className="flex gap-0.5 items-center">
                Calculated at checkout
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <div>Total</div>
              <div className="flex gap-0.5 items-center">
                <IndianRupee className="h-4 w-4" />
                {(totalPrice + Math.round(totalPrice * 12) / 100).toFixed(0)}
              </div>
            </div>
            <hr />
            <Button variant={"secondary"} className="my-3 border hover:scale-[1.02] active:scale-[0.98] duration-750 transition">Proceed to Checkout</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
