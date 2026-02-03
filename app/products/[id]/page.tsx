"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ArrowLeft, Plus, Minus } from "lucide-react";

const PRODUCT_DATA = {
    1: { id: 1, name: "Wild Honey", price: 499, image: "/images/prod-wild-honey.png", desc: "Raw, unfiltered honey from deep forests." },
    2: { id: 2, name: "Tulsi Honey", price: 549, image: "/images/prod-tulsi-honey.png", desc: "Infused with the goodness of holy basil." },
    3: { id: 3, name: "Multi Floral Honey", price: 399, image: "/images/prod-multifloral-honey.png", desc: "Collected from diverse healing herbs." },
    4: { id: 4, name: "Jamun Honey", price: 599, image: "/images/prod-jamun-honey.png", desc: "Good for diabetics, bitter-sweet taste." },
    5: { id: 5, name: "Classic Peanut Chikki", price: 149, image: "/images/prod-peanut-chikki.png", desc: "Crushed peanuts and organic jaggery." },
    6: { id: 6, name: "Sesame Chikki", price: 199, image: "/images/prod-sesame-chikki.png", desc: "Roasted sesame seeds for immune boost." },
    7: { id: 7, name: "Dry Fruit Chikki", price: 349, image: "/images/prod-dryfruit-chikki.png", desc: "Premium almonds, cashews, and pistachios." },
    8: { id: 8, name: "Cold-pressed Juices", price: 299, image: "/images/prod-cold-pressed-juices.png", desc: "Freshly pressed juices with no added sugars or preservatives." },
    9: { id: 9, name: "Fruit Bowls", price: 199, image: "/images/prod-fruit-bowls.png", desc: "Assorted fresh fruits, perfect for a healthy breakfast or snack." },
    10: { id: 10, name: "Fresh Fruits", price: 149, image: "/images/prod-fresh-fruits.png", desc: "Seasonal fresh fruits, hand-picked for quality and taste." },
    11: { id: 11, name: "Detox Drinks", price: 249, image: "/images/prod-detox-drinks.png", desc: "Specially formulated drinks to help cleanse and rejuvenate your body." },
};

const QUANTITY_OPTIONS = [
    { size: "100ml", priceMultiplier: 1 },
    { size: "240ml", priceMultiplier: 2.2 },
    { size: "300ml", priceMultiplier: 2.8 },
];

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);
    const product = PRODUCT_DATA[productId as keyof typeof PRODUCT_DATA];

    const [selectedQuantity, setSelectedQuantity] = useState("100ml");
    const [quantityCount, setQuantityCount] = useState(1);

    if (!product) {
        return (
            <main className="min-h-screen flex flex-col bg-ivory">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-serif text-charcoal mb-4">Product Not Found</h1>
                        <button
                            onClick={() => router.back()}
                            className="text-olive hover:text-charcoal transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const selectedOption = QUANTITY_OPTIONS.find(opt => opt.size === selectedQuantity);
    const adjustedPrice = Math.round(product.price * (selectedOption?.priceMultiplier || 1));

    return (
        <main className="min-h-screen flex flex-col bg-ivory">
            <Header />
            <div className="flex-grow">
                <div className="container mx-auto px-6 py-32">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-charcoal hover:text-olive transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Products
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="relative h-96 lg:h-[500px] bg-[#FAFAF5] rounded-lg flex items-center justify-center">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-8"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-serif text-charcoal mb-4">{product.name}</h1>
                                <p className="text-earth text-lg leading-relaxed">{product.desc}</p>
                            </div>

                            {/* Quantity Options */}
                            <div>
                                <h3 className="text-xl font-serif text-charcoal mb-4">Select Quantity</h3>
                                <div className="flex gap-4">
                                    {QUANTITY_OPTIONS.map((option) => (
                                        <button
                                            key={option.size}
                                            onClick={() => setSelectedQuantity(option.size)}
                                            className={`px-6 py-3 rounded-lg border-2 transition-all ${selectedQuantity === option.size
                                                ? 'border-olive bg-olive/10 text-olive'
                                                : 'border-earth/30 text-charcoal hover:border-olive'
                                                }`}
                                        >
                                            {option.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Counter */}
                            <div>
                                <h3 className="text-xl font-serif text-charcoal mb-4">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantityCount(Math.max(1, quantityCount - 1))}
                                        className="w-12 h-12 rounded-full border-2 border-earth/30 flex items-center justify-center text-charcoal hover:border-olive transition-colors"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-2xl font-serif text-charcoal w-16 text-center">
                                        {quantityCount}
                                    </span>
                                    <button
                                        onClick={() => setQuantityCount(quantityCount + 1)}
                                        className="w-12 h-12 rounded-full border-2 border-earth/30 flex items-center justify-center text-charcoal hover:border-olive transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Price and Add to Cart */}
                            <div className="space-y-6">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-serif text-olive font-bold">
                                        ₹{adjustedPrice}
                                    </span>
                                    <span className="text-earth">per {selectedQuantity}</span>
                                </div>

                                <button className="w-full bg-olive text-white py-4 rounded-lg font-serif text-lg hover:bg-green-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
