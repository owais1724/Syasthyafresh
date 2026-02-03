"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const statsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Text Content
            if (textRef.current) {
                gsap.from(textRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            // Animate Image
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            }

            // Animate Stats Staggered
            gsap.fromTo(statsRef.current,
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: statsRef.current[0],
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-24 bg-olive text-ivory">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={textRef} className="space-y-8 opacity-100">
                        <span className="inline-block py-1 px-3 border border-ivory/30 rounded-full text-sm tracking-widest uppercase font-medium">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">Rooted in Tradition,<br />Driven by Purity.</h2>
                        <div className="space-y-6 text-ivory/80 text-lg leading-relaxed">
                            <p>
                                Svasthya Fresh was born from a simple desire: to bring back the authentic taste of real food. In a world full of processed alternatives, we stand for what is real.
                            </p>
                            <p>
                                We work directly with small-scale farmers who practice sustainable agriculture. Every jar of honey and every piece of chikki is a testament to our commitment to chemical-free living.
                            </p>
                        </div>
                        <div className="pt-4">
                            <div className="grid grid-cols-2 gap-8">
                                <div ref={el => { if (el) statsRef.current[0] = el }} className="opacity-100">
                                    <h4 className="text-3xl font-serif mb-1">500+</h4>
                                    <p className="text-sm opacity-70">Happy Families</p>
                                </div>
                                <div ref={el => { if (el) statsRef.current[1] = el }} className="opacity-100">
                                    <h4 className="text-3xl font-serif mb-1">100%</h4>
                                    <p className="text-sm opacity-70">Organic Sourced</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={imageRef} className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl bg-black/20 opacity-100">
                        {/* Placeholder for about image - using hero-honey for now */}
                        {/* Ideally use a dedicated about image */}
                        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/hero-honey.png')" }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
