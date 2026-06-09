"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TestimonialItem {
    /** Unique identifier for the card */
    id: string | number;
    /** Title displayed for the card */
    title: string;
    /** Description text for the card */
    description: string;
    /** Image URL/path for the card */
    image: string;
}

interface TestimonialsCardProps {
    /** Array of testimonial items to display */
    items: TestimonialItem[];
    /** Additional CSS classes for the container */
    className?: string;
    /** Width of the card stack (default: 400) */
    width?: number;
    /** Whether to show navigation arrows (default: true) */
    showNavigation?: boolean;
    /** Whether to show the counter (default: true) */
    showCounter?: boolean;
    /** Whether to enable auto-play (default: false) */
    autoPlay?: boolean;
    /** Auto-play interval in ms (default: 3000) */
    autoPlayInterval?: number;
}

export function TestimonialsCard({
    items,
    className,
    width = 400,
    showNavigation = true,
    showCounter = true,
    autoPlay = false,
    autoPlayInterval = 3000,
}: TestimonialsCardProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = items[activeIndex];

    // Auto-play effect
    React.useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, items.length]);

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center p-8", className)}>
            <div
                className="relative grid  grid-cols-[1fr]  md:grid-cols-[1fr_1fr] md:grid-rows-[auto_auto_auto] gap-x-8 gap-y-2 w-full "
                style={{ perspective: "1400px", maxWidth: `${width}px` }}
            >
                {/* Counter */}
                {showCounter && (
                    <div className="row-start-1 md:col-start-2 md:row-start-1 text-right font-mono text-sm text-neutral-500 dark:text-neutral-400">
                        {activeIndex + 1} / {items.length}
                    </div>
                )}

                {/* Image Card Stack */}
                <div className="row-start-2  col-start-1 md:row-start-1 row-span-3 relative w-full aspect-square">
                    <div className="absolute inset-0 w-full h-full overflow-hidden border-[6px] bg-neutral-200 dark:bg-neutral-800 border-white dark:border-neutral-700 shadow-2xl rounded-lg">
                        <img
                            src={activeItem.image}
                            alt={activeItem.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </div>
                </div>

                {/* Text Area */}
                <div className="col-start-1 md:col-start-2   md:row-start-1 flex flex-col justify-center min-h-[120px]">
                    <div key={activeItem.id} className="transition-opacity duration-200">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {activeItem.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                            {activeItem.description}
                        </p>
                    </div>
                </div>

                {/* Navigation Controls */}
                {showNavigation && items.length > 1 && (
                    <div className="col-start-1 md:col-start-2 md:row-start-3 flex gap-2  m-auto -mt-2 md:mt-4  md:m-0">
                        <button
                            disabled={activeIndex === 0}
                            onClick={handlePrev}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                                activeIndex === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
                            )}
                            aria-label="Previous card"
                        >
                            <ArrowLeft className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        </button>
                        <button
                            disabled={activeIndex === items.length - 1}
                            onClick={handleNext}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                                activeIndex === items.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
                            )}
                            aria-label="Next card"
                        >
                            <ArrowRight className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestimonialsCard;
