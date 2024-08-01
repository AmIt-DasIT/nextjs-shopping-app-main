"use client";

import React from "react";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="overflow-hidden">{children}</main>;
};

export default StoreLayout;
