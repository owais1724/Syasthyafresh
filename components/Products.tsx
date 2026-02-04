"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles, Shield, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    {
        category: "Honey",
        items: [
            { id: 1, name: "Wild Honey", price: 499, image: "/images/prod-wild-honey.png", desc: "Raw, unfiltered honey from deep forests." },
            { id: 2, name: "Tulsi Honey", price: 549, image: "/images/prod-tulsi-honey.png", desc: "Infused with the goodness of holy basil." },
            { id: 3, name: "Multi Floral Honey", price: 399, image: "/images/prod-multifloral-honey.png", desc: "Collected from diverse healing herbs." },
            { id: 4, name: "Jamun Honey", price: 599, image: "/images/prod-jamun-honey.png", desc: "Good for diabetics, bitter-sweet taste." },
        ]
    },
    {
        category: "Chikki",
        items: [
            { id: 5, name: "Classic Peanut Chikki", price: 149, image: "/images/prod-peanut-chikki.png", desc: "Crushed peanuts and organic jaggery." },
            { id: 6, name: "Sesame Chikki", price: 199, image: "/images/prod-sesame-chikki.png", desc: "Roasted sesame seeds for immune boost." },
            { id: 7, name: "Dry Fruit Chikki", price: 349, image: "/images/prod-dryfruit-chikki.png", desc: "Premium almonds, cashews, and pistachios." },
        ]
    },
    {
        category: "Coming Soon",
        items: [
            { id: 8, name: "Cold-pressed Juices", price: 299, image: "/images/prod-cold-pressed-juices.png", desc: "Freshly pressed juices with no added sugars or preservatives." },
            { id: 9, name: "Fruit Bowls", price: 199, image: "/images/prod-fruit-bowls.png", desc: "Assorted fresh fruits, perfect for a healthy breakfast or snack." },
            { id: 10, name: "Fresh Fruits", price: 149, image: "/images/prod-fresh-fruits.png", desc: "Seasonal fresh fruits, hand-picked for quality and taste." },
            { id: 11, name: "Detox Drinks", price: 249, image: "/images/prod-detox-drinks.png", desc: "Specially formulated drinks to help cleanse and rejuvenate your body." },
        ]
    }
];

export default function Products() {
    const searchParams = useSearchParams();

    // We need refs for each category to scroll to if searched
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const categoryRefsArray = useRef<(HTMLDivElement | null)[]>([]);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Section Heading
            if (headingRef.current) {
                gsap.fromTo(headingRef.current,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 95%",
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    }
                );
            }

            // Animate Category Headers Staggered
            gsap.fromTo(categoryRefsArray.current,
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: "power3.out"
                }
            );

            // Animate Product Cards Staggered
            gsap.fromTo(productRefs.current,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const search = searchParams.get("search");
        if (search) {
            const term = search.toLowerCase();
            let foundCategory = "";

            // Check Honey
            const honey = PRODUCTS.find(p => p.category === "Honey");
            if (honey && honey.items.some(i => i.name.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term))) {
                foundCategory = "Honey";
            } else {
                // Check Chikki
                const chikki = PRODUCTS.find(p => p.category === "Chikki");
                if (chikki && chikki.items.some(i => i.name.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term))) {
                    foundCategory = "Chikki";
                }
            }

            if (foundCategory && categoryRefs.current[foundCategory]) {
                categoryRefs.current[foundCategory]?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [searchParams]);

    // Horizontal scroll handler for separate categories
    const scroll = (id: string, direction: "left" | "right") => {
        const container = document.getElementById(`scroll-container-${id}`);
        if (container) {
            const scrollAmount = 400;
            container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section ref={sectionRef} id="products" className="pt-24 pb-4 overflow-hidden relative z-20">
            {/* Main Products Heading */}
            <div className="container mx-auto px-6 mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4 text-center">Our Products</h1>
                <p className="text-earth text-lg text-center max-w-3xl mx-auto">
                    Discover our range of pure, natural, and honest products crafted with care for your healthy lifestyle.
                </p>
            </div>

            <div className="space-y-6">
                {PRODUCTS.map((cat, catIndex) => (
                    <div
                        key={cat.category}
                        id={cat.category.toLowerCase()}
                        ref={el => {
                            if (el) {
                                categoryRefs.current[cat.category] = el;
                                categoryRefsArray.current[catIndex] = el;
                            }
                        }}
                        className="relative scroll-mt-28 opacity-100"
                    >
                        {/* Category Header - Enhanced with Eatopia style */}
                        <div className="container mx-auto px-6 mb-8 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive/10 rounded-full mb-4">
                                <Sparkles className="w-4 h-4 text-olive" />
                                <span className="text-sm font-medium text-olive">
                                    {cat.category === "Honey" ? "Pure & Natural" : cat.category === "Chikki" ? "Traditional Goodness" : "Coming Soon"}
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-serif text-charcoal mb-3">
                                {cat.category === "Honey" ? "Pure Honey Collection" : cat.category === "Chikki" ? "Handcrafted Chikki" : "Coming Soon"}
                            </h3>
                            <p className="text-earth text-lg mb-6">
                                {cat.category === "Honey" ? "100% Natural & Pure Honey Varieties" : cat.category === "Chikki" ? "Traditional Organic Sweet Treats" : "Exciting New Products Launching Soon"}
                            </p>

                            {/* Trust badges for existing products */}
                            {cat.category !== "Coming Soon" && (
                                <div className="flex items-center justify-center gap-8 text-sm text-earth/70">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-4 h-4" />
                                        <span>100% Authentic</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Truck className="w-4 h-4" />
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Scrollable Container */}
                        <div className="relative w-full">
                            <div
                                id={`scroll-container-${cat.category}`}
                                className="flex gap-6 overflow-x-auto pb-6 px-6 hide-scrollbar scroll-smooth snap-x"
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                                {cat.items.map((product, prodIndex) => (
                                    <div
                                        key={product.id}
                                        ref={el => { if (el) productRefs.current[prodIndex + (catIndex * cat.items.length)] = el }}
                                        className="min-w-[280px] md:min-w-[340px] group cursor-pointer snap-start opacity-100 hover:shadow-xl transition-all duration-500"
                                    >
                                        <Link href={`/products/${product.id}`} className="block w-full h-full group">
                                            <div className="flex flex-col w-full bg-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl border border-earth/10">
                                                {/* Image Container - Enhanced with badges */}
                                                <div className="relative aspect-square w-full bg-[#FAFAF5] overflow-hidden">
                                                    <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                                                        <div className="relative w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-contain object-center"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    
                                                    {/* Quick actions overlay */}
                                                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-ivory transition-colors">
                                                            <Heart className="w-4 h-4 text-charcoal" />
                                                        </button>
                                                        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-ivory transition-colors">
                                                            <ShoppingCart className="w-4 h-4 text-charcoal" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Card Info - Enhanced */}
                                                <div className="flex flex-col p-6 bg-white border-t border-earth/5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="text-xl font-serif text-charcoal group-hover:text-olive transition-colors line-clamp-1">{product.name}</h3>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-earth/80 line-clamp-2 mb-4 h-10 leading-relaxed">
                                                        {product.desc}
                                                    </p>

                                                    <div className="flex justify-between items-center mt-auto">
                                                        <div className="flex items-baseline gap-2">
                                                            <p className="text-lg text-olive font-bold">₹{product.price}</p>
                                                            <span className="text-xs text-earth/60">per unit</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-charcoal/60 hover:text-olive transition-colors duration-300">
                                                            <span className="text-xs font-medium border-b border-transparent group-hover:border-olive">View Details</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
