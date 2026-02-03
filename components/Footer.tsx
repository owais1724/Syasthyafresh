"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const sectionRef = useRef(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentYear, setCurrentYear] = useState(2024); // Fallback year

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
        
        const ctx = gsap.context(() => {
            // Animate Footer Columns Staggered
            gsap.fromTo(columnRefs.current,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={sectionRef} className="bg-charcoal text-ivory pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div ref={el => { if (el) columnRefs.current[0] = el }} className="space-y-6 opacity-100">
                        <div className="relative h-32 w-96">
                            <Image
                                src="/logo.png"
                                alt="Svasthya Fresh"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-earth/80 max-w-xs leading-relaxed">
                            Fresh By Nature. Bringing you pure, organic, and honest food directly from nature's lap to your home.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div ref={el => { if (el) columnRefs.current[1] = el }} className="opacity-100">
                        <h4 className="font-serif text-xl mb-6 text-beige">Explore</h4>
                        <ul className="space-y-4">
                            {["Home", "Products", "Why Us", "About", "Contact"].map((link) => (
                                <li key={link}>
                                    <Link href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-earth/80 hover:text-ivory transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div ref={el => { if (el) columnRefs.current[2] = el }} className="opacity-100">
                        <h4 className="font-serif text-xl mb-6 text-beige">Contact</h4>
                        <ul className="space-y-4 text-earth/80">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 shrink-0 mt-1" />
                                <span>123 Organic Farms Rd,<br />Pune, Maharashtra 411001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-ivory transition-colors">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 shrink-0" />
                                <a href="mailto:hello@svasthya.com" className="hover:text-ivory transition-colors">hello@svasthya.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div ref={el => { if (el) columnRefs.current[3] = el }} className="opacity-100">
                        <h4 className="font-serif text-xl mb-6 text-beige">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-ivory">
                                <Instagram className="w-5 h-5" />
                            </a>
                            {/* Add more icons as needed */}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-earth/60">
                    <p>© {currentYear} Svasthya Fresh. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-ivory transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-ivory transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
