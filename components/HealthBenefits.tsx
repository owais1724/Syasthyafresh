"use client";

import { ShieldCheck, Zap, Leaf, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HealthBenefits() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const benefits = [
        {
            icon: ShieldCheck,
            title: "Immunity Boost",
            desc: "Our natural products are rich in antioxidants and vitamins that strengthen your immune system naturally"
        },
        {
            icon: Zap,
            title: "Energy & Nutrition",
            desc: "Natural sugars and nutrients provide sustained energy without the crash of processed alternatives"
        },
        {
            icon: Leaf,
            title: "Chemical-Free Living",
            desc: "Enjoy pure, unadulterated products free from pesticides, preservatives, and artificial additives"
        },
        {
            icon: Users,
            title: "Suitable for All Ages",
            desc: "From children to elders, our products provide essential nutrients for every stage of life"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Heading
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

            // Animate Cards Staggered
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-white relative z-10">
            <div className="container mx-auto px-6">
                <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-8 opacity-100">
                    <span className="text-olive uppercase tracking-widest font-medium text-sm">Natural Benefits</span>
                    <h2 className="text-4xl font-serif text-charcoal mt-2">Health Benefits</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) cardsRef.current[i] = el }}
                            className="p-8 rounded-xl bg-ivory border border-earth/10 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group opacity-100"
                        >
                            {/* Icon Container - Green Circle */}
                            <div className="w-20 h-20 bg-[#28a745] rounded-full flex items-center justify-center text-white mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-10 h-10" />
                            </div>

                            <h3 className="text-xl font-serif text-charcoal mb-4 font-bold">{item.title}</h3>
                            <p className="text-earth text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
