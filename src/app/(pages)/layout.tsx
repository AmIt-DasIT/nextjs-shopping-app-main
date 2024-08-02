"use client";

import Header from "@/components/Header";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthStatus, setUser } from "@/redux/slice/userSlice";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setAuthStatus(true));
        dispatch(
          setUser({
            _id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email,
          })
        );
      }
    });

    return () => unSub();
  }, [dispatch]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
