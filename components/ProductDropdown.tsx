"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const ProductDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-charcoal hover:text-olive transition-colors duration-300 font-serif tracking-wide text-base font-bold"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-earth/10 overflow-hidden z-50">
                    <div className="py-2">
                        <Link
                            href="/products"
                            className="block px-4 py-3 text-charcoal hover:text-olive hover:bg-ivory/50 transition-colors duration-200 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            All Products
                        </Link>
                        <Link
                            href="/products/honey"
                            className="block px-4 py-3 text-charcoal hover:text-olive hover:bg-ivory/50 transition-colors duration-200 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Honey
                        </Link>
                        <Link
                            href="/products/chikki"
                            className="block px-4 py-3 text-charcoal hover:text-olive hover:bg-ivory/50 transition-colors duration-200 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Chikki
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDropdown;
