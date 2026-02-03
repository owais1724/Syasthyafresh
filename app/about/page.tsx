"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <div className="flex-grow">
        <section className="pt-32 pb-4 bg-ivory">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-serif text-charcoal mb-6 text-center">About Us</h1>
            <p className="text-earth text-lg text-center max-w-3xl mx-auto mb-12">
              Our story, our mission, and our commitment to bringing you the finest natural products.
            </p>
          </div>
        </section>
        <About />
      </div>
      <Footer />
    </main>
  );
}
