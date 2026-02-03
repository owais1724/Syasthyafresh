"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, ArrowRight } from "lucide-react";
import gsap from "gsap";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    // ... (useEffect remains same, handled by React)

    useEffect(() => {
        if (!containerRef.current || !panelRef.current) return;
        // ... (animation logic remains same, we don't need to replace it if we just target handleSearch carefully, or we can replace the top of component)

        if (isOpen) {
            gsap.to(containerRef.current, { duration: 0.5, opacity: 1, pointerEvents: "auto", ease: "power2.out" });
            gsap.fromTo(panelRef.current, { y: "-100%" }, { y: "0%", duration: 0.6, ease: "power3.out" });
        } else {
            gsap.to(containerRef.current, { duration: 0.4, opacity: 0, pointerEvents: "none", ease: "power2.in" });
            gsap.to(panelRef.current, { y: "-100%", duration: 0.5, ease: "power3.in" });
        }
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onClose();
            router.push(`/?search=${encodeURIComponent(searchTerm)}#products`);
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm opacity-0 pointer-events-none"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                className="w-full bg-ivory shadow-xl pt-24 pb-12 px-6 md:px-12 border-b border-earth/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="container mx-auto max-w-4xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 md:top-8 md:right-12 p-2 text-charcoal hover:text-earth transition-colors z-50"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <form onSubmit={handleSearch} className="relative mt-4">
                        <input
                            type="text"
                            placeholder="Search for honey, chikki, wellness..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-earth/30 py-4 text-2xl md:text-4xl text-charcoal placeholder-earth/50 focus:outline-none focus:border-olive transition-colors font-serif"
                            autoFocus={isOpen}
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-olive hover:text-brown transition-colors"
                        >
                            <ArrowRight className="w-8 h-8" />
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-earth">
                        <span className="uppercase tracking-wider font-medium">Popular Searches:</span>
                        <div className="flex flex-wrap gap-4">
                            {["Wild Honey", "Peanut Chikki", "Immunity", "Gift Packs"].map((term) => (
                                <button
                                    key={term}
                                    onClick={() => setSearchTerm(term)}
                                    className="hover:text-olive transition-colors underline decoration-transparent hover:decoration-olive"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
