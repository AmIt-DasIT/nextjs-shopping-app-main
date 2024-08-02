import ProductList from "@/components/store/ProductList";
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </main>
  );
}
