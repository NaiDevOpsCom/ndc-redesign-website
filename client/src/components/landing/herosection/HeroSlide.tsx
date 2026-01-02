import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "wouter";
import { Users, Calendar, ArrowRight, Briefcase, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroSlideData } from "@/data/heroSlidesData";

interface HeroSlideProps {
  slide: HeroSlideData;
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

const iconMap = {
  users: Users,
  calendar: Calendar,
  "arrow-right": ArrowRight,
  briefcase: Briefcase,
  heart: Heart,
};

const HeroSlide: React.FC<HeroSlideProps> = ({ slide }) => {
  const [, navigate] = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loaded state when slide changes
  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = slide.bgImage;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [slide.bgImage]);

  const handlePrimaryClick = () => {
    if (slide.ctaPrimary.link.startsWith("http")) {
      window.open(slide.ctaPrimary.link, "_blank", "noopener");
    } else {
      navigate(slide.ctaPrimary.link);
    }
  };

  const handleSecondaryClick = () => {
    if (slide.ctaSecondary.isScroll) {
      const el = document.getElementById(slide.ctaSecondary.link);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (slide.ctaSecondary.link.startsWith("http")) {
      window.open(slide.ctaSecondary.link, "_blank", "noopener");
    } else {
      navigate(slide.ctaSecondary.link);
    }
  };

  const PrimaryIcon = slide.ctaPrimary.icon ? iconMap[slide.ctaPrimary.icon] : null;
  const SecondaryIcon = slide.ctaSecondary.icon ? iconMap[slide.ctaSecondary.icon] : null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Background image layer - Placeholder (blurred) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${slide.placeholder})` }}
        variants={bgVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.9, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Background image layer - High Resolution */}
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            key={slide.bgImage}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* subtle dark overlay for contrast */}
      <motion.div
        className="absolute inset-0 bg-black/45 z-[1]"
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
              {PrimaryIcon && <PrimaryIcon className="mr-2 h-5 w-5" />}
              {slide.ctaPrimary.text}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
              onClick={handleSecondaryClick}
            >
              {SecondaryIcon && <SecondaryIcon className="mr-2 h-5 w-5" />}
              {slide.ctaSecondary.text}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
