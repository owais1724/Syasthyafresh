"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={<div>Loading products...</div>}>
          <Products />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
