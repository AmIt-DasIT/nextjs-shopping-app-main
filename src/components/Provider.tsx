"use client";

import { Providers } from "@/redux/Providers";

import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default Provider;
