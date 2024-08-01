"use client";

import React from "react";
import Cards from "../Card";
import { Products } from "@/data/products";

const ProductList = () => {
  return (
    <div className="">
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 sm:gap-4 gap-2">
        {Products?.length > 0 ? (
          Products?.map((product) => (
            <Cards product={product} key={product.title} />
          ))
        ) : (
          <div>Sorry! There is no product related to your query.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
