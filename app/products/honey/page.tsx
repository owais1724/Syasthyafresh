"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const HONEY_PRODUCTS = [
    { id: 1, name: "Wild Honey", price: 499, image: "/images/prod-wild-honey.png", desc: "Raw, unfiltered honey from deep forests." },
    { id: 2, name: "Tulsi Honey", price: 549, image: "/images/prod-tulsi-honey.png", desc: "Infused with the goodness of holy basil." },
    { id: 3, name: "Multi Floral Honey", price: 399, image: "/images/prod-multifloral-honey.png", desc: "Collected from diverse healing herbs." },
    { id: 4, name: "Jamun Honey", price: 599, image: "/images/prod-jamun-honey.png", desc: "Good for diabetics, bitter-sweet taste." },
];

export default function HoneyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-ivory">
            <Header />
            <div className="flex-grow">
                <div className="container mx-auto px-6 py-32">
                    <h1 className="text-5xl font-serif text-charcoal mb-6">Pure Honey Collection</h1>
                    <p className="text-earth text-lg mb-8">
                        Discover our range of pure, natural honey crafted with care for your healthy lifestyle.
                    </p>
                    
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {HONEY_PRODUCTS.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="relative h-64 bg-[#FAFAF5] flex items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-charcoal mb-2">{product.name}</h3>
                                    <p className="text-earth text-sm mb-4">{product.desc}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg text-olive font-bold">₹{product.price}</p>
                                        <button className="text-charcoal hover:text-olive transition-colors font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
