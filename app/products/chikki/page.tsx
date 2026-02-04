"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const CHIKKI_PRODUCTS = [
    { id: 5, name: "Classic Peanut Chikki", price: 149, image: "/images/prod-peanut-chikki.png", desc: "Crushed peanuts and organic jaggery." },
    { id: 6, name: "Sesame Chikki", price: 199, image: "/images/prod-sesame-chikki.png", desc: "Roasted sesame seeds for immune boost." },
    { id: 7, name: "Dry Fruit Chikki", price: 349, image: "/images/prod-dryfruit-chikki.png", desc: "Premium almonds, cashews, and pistachios." },
];

export default function ChikkiPage() {
    return (
        <main className="min-h-screen flex flex-col bg-ivory">
            <Header />
            <div className="flex-grow">
                <div className="container mx-auto px-6 py-32">
                    <h1 className="text-5xl font-serif text-charcoal mb-6">Handcrafted Chikki</h1>
                    <p className="text-earth text-lg mb-8">
                        Traditional chikki made with pure ingredients and love.
                    </p>
                    
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {CHIKKI_PRODUCTS.map((product) => (
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
                                        <span className="text-charcoal hover:text-olive transition-colors font-medium">
                                            View Details
                                        </span>
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
