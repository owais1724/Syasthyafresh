"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

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

            // Animate Image Reveal
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    scale: 0.9,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out"
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="why-us" className="py-16 bg-ivory relative z-10 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div ref={textRef} className="flex-1 space-y-6 opacity-100">
                        <div>
                            <span className="text-olive uppercase tracking-widest font-medium text-sm">Our Promise</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-2 mb-4">Why Choose Svasthya Fresh?</h2>
                            <p className="text-earth text-lg leading-relaxed">
                                We go beyond just selling products. We are committed to bringing you the purest form of nature, ensuring every drop of honey and every bite of chikki is a step towards a healthier lifestyle.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "100% Sourced from Nature, Zero Additives",
                                "Sustainable & Ethical Farming Practices",
                                "Traditional Recipes Preserved for Generations",
                                "Lab-Tested for Absolute Purity"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <CheckCircle2 className="w-6 h-6 text-olive group-hover:scale-110 transition-transform" />
                                    <span className="text-charcoal text-lg">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <a
                                href="#about"
                                className="inline-flex items-center gap-2 text-olive font-medium text-lg hover:gap-4 transition-all duration-300 group"
                            >
                                <span className="border-b border-transparent group-hover:border-olive transition-all">Read Our Story</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Visual/Image Side */}
                    <div ref={imageRef} className="flex-1 relative opacity-100">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-earth/10 relative shadow-2xl">
                            <img
                                src="/images/why-us-purity.png"
                                alt="Pure honey and natural ingredients"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-2xl font-serif text-white/90 italic drop-shadow-md">"Purity is not just a claim, it's our heritage."</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
