import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroSlideData } from "@/data/heroSlidesData";

interface HeroSlideProps {
    slide: HeroSlideData;
    // small prop in case we want to tweak per-slide behavior later
}

const bgVariant = {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
};

const contentVariant = {
    initial: { opacity: 0, y: 20 },
    animate: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i } }),
    exit: { opacity: 0, y: -10 },
};

const HeroSlide: React.FC<HeroSlideProps> = ({ slide }) => {
    const handlePrimaryClick = () => {
        window.location.href = slide.ctaPrimary.link;
    };

    const handleSecondaryClick = () => {
        if (slide.ctaSecondary.isScroll) {
            const el = document.getElementById(slide.ctaSecondary.link);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.href = slide.ctaSecondary.link;
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Background image layer */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
                variants={bgVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.9, ease: "easeInOut" }}
                aria-hidden
            />

            {/* subtle dark overlay for contrast */}
            <motion.div
                className="absolute inset-0 bg-black/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                aria-hidden
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center pointer-events-auto">
                <div>
                    <motion.h2
                        className="text-lg md:text-2xl lg:text-3xl font-semibold text-white mb-4 leading-tight"
                        custom={0}
                        variants={contentVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.6 }}
                    >
                        {slide.headlineTop}
                    </motion.h2>

                    <motion.h1
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        custom={1}
                        variants={contentVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.8 }}
                    >
                        {slide.headlineMain}
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto"
                        custom={2}
                        variants={contentVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.7 }}
                    >
                        {slide.description}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        custom={3}
                        variants={contentVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.7 }}
                    >
                        <Button
                            size="lg"
                            className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200"
                            onClick={handlePrimaryClick}
                        >
                            {slide.ctaPrimary.text}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
                            onClick={handleSecondaryClick}
                        >
                            {slide.ctaSecondary.text}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
