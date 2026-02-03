"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, MessageCircle } from "lucide-react"; // Using message circle for WhatsApp generic
import SearchOverlay from "./SearchOverlay";
import ProductDropdown from "./ProductDropdown";
// Removed invalid import 
// However, the user asked for "WhatsApp Icon". Let's stick to a clean SVG or just Image. 
// But wait, I don't have react-icons installed. I can install it or use a simple SVG path. 
// A clear SVG is safer than adding a package midway without check, but installing react-icons is also fine.
// The user has lucide-react. Let's use MessageCircle as a placeholder or import a specific one if I can.
// Actually, let's just use an SVG directly to be precise.

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-earth/10 transition-all duration-300">
                <div className="container mx-auto px-6 h-28 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative h-32 w-96 flex-shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Svasthya Fresh"
                            fill
                            className="object-contain object-left md:object-center"
                            priority
                        />
                    </Link>

                    {/* New Nav Order: Home, Products, Why Svasthya Fresh, About Us */}
                    <nav className="hidden md:flex items-center space-x-10 lg:space-x-14">
                        <Link
                            href="/"
                            className="text-charcoal hover:text-olive transition-colors duration-300 font-serif tracking-wide text-base font-bold"
                        >
                            Home
                        </Link>
                        <ProductDropdown />
                        <Link
                            href="/why-svasthya-fresh"
                            className="text-charcoal hover:text-olive transition-colors duration-300 font-serif tracking-wide text-base font-bold"
                        >
                            Why Svasthya Fresh
                        </Link>
                        <Link
                            href="/about"
                            className="text-charcoal hover:text-olive transition-colors duration-300 font-serif tracking-wide text-base font-bold"
                        >
                            About Us
                        </Link>
                    </nav>

                    {/* Right Actions: Search Icon, WhatsApp Icon */}
                    <div className="flex items-center space-x-8">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-charcoal hover:text-olive transition-colors duration-300"
                            aria-label="Search"
                        >
                            <Search className="w-6 h-6" />
                        </button>

                        <a
                            href="https://wa.me/919999999999" // Replace with real number
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-olive hover:text-green-600 transition-colors duration-300"
                            aria-label="WhatsApp Us"
                        >
                            <WhatsAppIcon className="w-7 h-7" />
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-charcoal"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-24 left-0 w-full h-screen bg-white p-8 flex flex-col space-y-6">
                        {[
                            ["Home", "/"],
                            ["Products", "/products"],
                            ["Why Svasthya Fresh", "/why-svasthya-fresh"],
                            ["About Us", "/about"],
                        ].map(([label, href]) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-charcoal hover:text-olive text-2xl font-serif font-bold"
                            >
                                {label}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/919999999999"
                            className="flex items-center gap-3 text-olive text-xl font-bold mt-4"
                        >
                            <WhatsAppIcon className="w-6 h-6" /> WhatsApp Us
                        </a>
                    </div>
                )}
            </header>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
