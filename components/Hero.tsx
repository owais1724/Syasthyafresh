"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Leaf, ShieldCheck, Zap } from "lucide-react";

// Using the product images we generated which have white backgrounds.
// On the Ivory background, we can use mix-blend-multiply to make them look transparent.
const SLIDES = [
    {
        id: 1,
        image: "/images/prod-wild-honey.png",
        backgroundParams: "from-[#F9F8F4] to-[#E6E2D6]", // Soft gradient
        subtitle: "Raw & Unfiltered",
        title: "Wild Honey",
        highlight: "Daily Immunity",
        description: "Sourced from deep forests, this raw honey is packed with natural antioxidants and enzymes.",
        features: [
            { icon: Leaf, label: "100% Natural" },
            { icon: Zap, label: "Energy Boost" },
            { icon: ShieldCheck, label: "Lab Tested" },
        ],
        color: "text-amber-700"
    },
    {
        id: 2,
        image: "/images/prod-peanut-chikki.png",
        backgroundParams: "from-[#F9F8F4] to-[#DDBEA9]",
        subtitle: "Traditional Recipe",
        title: "Peanut Chikki",
        highlight: "Guilt-free Snack",
        description: "Crunchy organic peanuts fused with chemical-free jaggery. The perfect protein-packed treat.",
        features: [
            { icon: Leaf, label: "Organic Jaggery" },
            { icon: Zap, label: "High Protein" },
            { icon: ShieldCheck, label: "No Sugar" },
        ],
        color: "text-brown"
    },
    {
        id: 3,
        image: "/images/prod-jamun-honey.png",
        backgroundParams: "from-[#F9F8F4] to-[#E2D4E6]", // Slight purple tint
        subtitle: "Medicinal Choice",
        title: "Jamun Honey",
        highlight: "Diabetic Friendly",
        description: "Distinct bitter-sweet taste with low glycemic index. Ideal for health-conscious living.",
        features: [
            { icon: Leaf, label: "Pure Harvest" },
            { icon: Zap, label: "Low GI" },
            { icon: ShieldCheck, label: "Unpasteurized" },
        ],
        color: "text-purple-900"
    },
    {
        id: 4,
        image: "/images/prod-multifloral-honey.png",
        backgroundParams: "from-[#F9F8F4] to-[#F4E8D0]", // Warm golden tint
        subtitle: "Nature's Best",
        title: "Multifloral Honey",
        highlight: "Rich Flavor",
        description: "A harmonious blend of nectar from multiple flowers, offering complex flavors and enhanced health benefits.",
        features: [
            { icon: Leaf, label: "Multi Source" },
            { icon: Zap, label: "Vitamins Rich" },
            { icon: ShieldCheck, label: "Pure Raw" },
        ],
        color: "text-amber-800"
    },
    {
        id: 5,
        image: "/images/prod-tulsi-honey.png",
        backgroundParams: "from-[#F9F8F4] to-[#E8F4E8]", // Green tint
        subtitle: "Herbal Infusion",
        title: "Tulsi Honey",
        highlight: "Wellness Boost",
        description: "Infused with holy basil, this honey combines the benefits of tulsi with natural sweetness for optimal health.",
        features: [
            { icon: Leaf, label: "Ayurvedic" },
            { icon: Zap, label: "Stress Relief" },
            { icon: ShieldCheck, label: "Medicinal" },
        ],
        color: "text-green-800"
    },
    {
        id: 6,
        image: "/images/prod-dryfruit-chikki.png",
        backgroundParams: "from-[#F9F8F4] to-[#E6D4C8]", // Warm brown tint
        subtitle: "Nutrient Dense",
        title: "Dryfruit Chikki",
        highlight: "Superfood Snack",
        description: "Premium dry fruits and nuts bound with pure jaggery. A powerhouse of nutrition in every bite.",
        features: [
            { icon: Leaf, label: "Mixed Nuts" },
            { icon: Zap, label: "Omega Rich" },
            { icon: ShieldCheck, label: "No Preservatives" },
        ],
        color: "text-brown-800"
    },
    {
        id: 7,
        image: "/images/prod-sesame-chikki.png",
        backgroundParams: "from-[#F9F8F4] to-[#F0E6D2]", // Light sandy tint
        subtitle: "Calcium Rich",
        title: "Sesame Chikki",
        highlight: "Bone Health",
        description: "Crunchy sesame seeds with jaggery provide essential calcium and minerals for strong bones.",
        features: [
            { icon: Leaf, label: "Iron Rich" },
            { icon: Zap, label: "High Calcium" },
            { icon: ShieldCheck, label: "Traditional" },
        ],
        color: "text-amber-900"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const changeSlide = (index: number) => {
        setCurrentSlide(index);
    }

    useEffect(() => {
        if (slideRefs.current.length === 0) return;

        const ctx = gsap.context(() => {
            slideRefs.current.forEach((slide, index) => {
                if (!slide) return;
                const content = slide.querySelector(".hero-content");
                const imageContainer = slide.querySelector(".hero-image-container");
                const bg = slide.querySelector(".hero-bg");

                if (index === currentSlide) {
                    gsap.set(slide, { zIndex: 1, visibility: "visible" });
                    gsap.to(slide, { opacity: 1, duration: 0.8, ease: "power2.out" });

                    // Animate Text
                    if (content) {
                        gsap.fromTo(content.children,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                        );
                    }

                    // Animate Image
                    if (imageContainer) {
                        gsap.fromTo(imageContainer,
                            { x: 50, opacity: 0, scale: 0.95 },
                            { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
                        );
                    }

                } else {
                    gsap.set(slide, { zIndex: 0 });
                    gsap.to(slide, { opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => { gsap.set(slide, { visibility: "hidden" }); } });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [currentSlide]);

    return (
        <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden pt-20 z-40" ref={containerRef}>
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    ref={(el) => { if (el) slideRefs.current[index] = el; }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 invisible"
                >
                    {/* Dynamic Background Gradient */}
                    <div className={`hero-bg absolute inset-0 bg-gradient-to-br ${slide.backgroundParams} opacity-50 transition-colors duration-1000`} />

                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
                        {/* Left Content */}
                        <div className="hero-content space-y-8 md:pl-8 pt-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-charcoal leading-tight">
                                    {slide.title} <br />
                                    <span className="text-charcoal">{slide.highlight}</span>
                                </h1>
                            </div>

                            <p className="text-lg text-earth/80 max-w-md leading-relaxed">
                                {slide.description}
                            </p>

                            {/* Features (Icons) */}
                            <div className="flex gap-8 py-4">
                                {slide.features.map((feature, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center text-olive shadow-sm">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-medium uppercase tracking-wider text-charcoal/70">{feature.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Link href="#products" className="px-8 py-4 bg-charcoal text-ivory rounded-full text-lg font-medium hover:bg-olive transition-colors shadow-lg">
                                    Shop Now
                                </Link>
                                <Link href="#about" className="px-8 py-4 border border-charcoal/20 text-charcoal rounded-full text-lg font-medium hover:bg-charcoal/5 transition-colors">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        {/* Right Image - Adjusted container height and sizing to prevent clipping */}
                        <div className="hero-image-container relative h-[400px] md:h-[600px] w-full flex items-center justify-center p-6">
                            {/* Decorative Circle behind product */}
                            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/40 bg-white/20 blur-3xl scale-90" />

                            <div className="relative w-full h-full max-w-lg mx-auto">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators/Navigation */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 z-[20] flex gap-4">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => changeSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 border border-charcoal ${index === currentSlide ? "bg-charcoal w-10" : "bg-transparent hover:bg-charcoal/30"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
