"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import gsap from "gsap";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    desc: string;
}

interface ProductDetailProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!product || !isMounted) return;

        // Small timeout to ensure DOM is ready and prevent hydration mismatch
        const timeoutId = setTimeout(() => {
            const ctx = gsap.context(() => {
                if (overlayRef.current) {
                    gsap.fromTo(overlayRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.4, ease: "power2.out" }
                    );
                }
                if (panelRef.current) {
                    gsap.fromTo(panelRef.current,
                        { x: "100%" },
                        { x: "0%", duration: 0.5, ease: "power3.out" }
                    );
                }
            });

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [product, isMounted]);

    const handleClose = () => {
        if (!overlayRef.current || !panelRef.current) return;

        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
        gsap.to(panelRef.current, {
            x: "100%",
            duration: 0.4,
            ease: "power3.in",
            onComplete: onClose
        });
    };

    if (!product || !isMounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                ref={panelRef}
                className="relative w-full md:max-w-2xl h-full bg-ivory shadow-2xl overflow-y-auto"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-earth/20"
                    aria-label="Close product details"
                >
                    <X className="w-6 h-6 text-charcoal" />
                </button>

                <div className="w-full max-w-[380px] aspect-[2/3] relative bg-[#FAFAF5] flex items-center justify-center rounded-xl overflow-hidden mb-8 border border-earth/10 mx-auto shadow-sm">
                    {/* Minimal padding for maximum image visibility */}
                    <div className="absolute inset-0 p-2 flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.02]">
                        <div className="relative w-full h-full drop-shadow-sm hover:drop-shadow-md transition-all duration-300">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain object-center"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-8">
                    <div>
                        <span className="text-olive text-sm font-bold tracking-widest uppercase">Organic & Pure</span>
                        <h2 className="text-4xl font-serif text-charcoal mt-2">{product.name}</h2>
                        <p className="text-2xl text-olive font-medium mt-2">₹{product.price}</p>
                    </div>

                    <p className="text-earth text-lg leading-relaxed">
                        {product.desc} Experience the authentic taste of nature with our sustainably sourced {product.name.toLowerCase()}.
                        Handpicked and processed with care to retain maximum nutrients.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-lg border border-earth/20">
                            <h4 className="font-serif text-charcoal mb-2">Ingredients</h4>
                            <p className="text-sm text-earth">100% Organic {product.name.split(" ")[1] || "Produce"}, Natural Preservatives only.</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-earth/20">
                            <h4 className="font-serif text-charcoal mb-2">Health Benefits</h4>
                            <ul className="text-sm text-earth list-disc list-inside">
                                <li>Boosts Immunity</li>
                                <li>Rich in Antioxidants</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-4">
                        <a
                            href={`https://wa.me/91XXXXXXXXXX?text=Hi, I want to order ${product.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 py-4 bg-olive text-ivory rounded-xl text-lg font-medium hover:bg-olive/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Order via WhatsApp
                        </a>
                        <p className="text-center text-xs text-earth/60 mt-4">Safe & Secure Payment via UPI / Bank Transfer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
