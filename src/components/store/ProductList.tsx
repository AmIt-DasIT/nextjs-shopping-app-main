"use client";

import React, { useEffect, useTransition } from "react";
import Cards from "../Card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { db } from "@/lib/firebase";
import {
  setAllProductLoading,
  setAllProducts,
} from "@/redux/slice/productSlice";
import { collection, doc, getDocs } from "firebase/firestore";
import Spinner from "../Spinner";

const ProductList = () => {
  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state) => state.product);
  const { allProductLoading } = useAppSelector((state) => state.product);

  const [isPending, startTranstition] = useTransition();
  const getProduct = () => {
    startTranstition(async () => {
      dispatch(setAllProductLoading(true));
      const docRef = collection(doc(db, "data", "products"), "garments");
      const querySnapshot = await getDocs(docRef);
      let documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ _id: doc.id + 1, ...doc.data() });
      });

      dispatch(
        setAllProducts({
          page: 0,
          totalPages: 0,
          totalProducts: 0,
          products: documents,
        })
      );
      dispatch(setAllProductLoading(false));
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (allProductLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 sm:gap-4 gap-2">
      {allProducts?.products && allProducts?.products?.length > 0 ? (
        allProducts.products?.map((product) => (
          <Cards product={product} key={product.title} />
        ))
      ) : allProducts?.products?.length === 0 ? (
        <div>No Products Found</div>
      ) : allProductLoading ? (
        <Spinner />
      ) : null}
    </div>
  );
};

export default ProductList;
