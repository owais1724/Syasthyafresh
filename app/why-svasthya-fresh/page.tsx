"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyUs from "@/components/WhyUs";

export default function WhySvasthyaFreshPage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <div className="flex-grow">
        <section className="pt-32 pb-4 bg-ivory">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-serif text-charcoal mb-6 text-center">Why Svasthya Fresh</h1>
            <p className="text-earth text-lg text-center max-w-3xl mx-auto mb-12">
              Learn what makes us the trusted choice for pure, natural, and honest food products.
            </p>
          </div>
        </section>
        <WhyUs />
      </div>
      <Footer />
    </main>
  );
}
