"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import HealthBenefits from "@/components/HealthBenefits";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";

// Wrapper component to provide Suspense boundary for useSearchParams
function MainContent() {
  return (
    <div className="flex-grow">
      <Hero />
      <Suspense fallback={<div>Loading products...</div>}>
        <Products />
      </Suspense>
      <HealthBenefits />
      <WhyUs />
      <About />

      {/* Contact Section */}
      <section className="py-24 bg-white border-t border-earth/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif text-charcoal mb-6">Get in Touch</h2>
          <p className="text-earth text-lg mb-8 max-w-2xl mx-auto">Have questions about our products? We'd love to hear from you.</p>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-ivory rounded-full text-lg font-medium hover:bg-olive transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <MainContent />
      <Footer />
    </main>
  );
}
