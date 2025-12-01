import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlidesData } from "@/data/heroSlidesData.ts";
import HeroSlide from "./HeroSlide";

const slideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  visible: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 5000; // 5 seconds per slide

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % heroSlidesData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + heroSlidesData.length) % heroSlidesData.length);
  };

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > index ? 1 : -1);
    setIndex(slideIndex);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, slideDuration);
    }
    return () => {
      resetTimeout();
    };
  }, [index, isPaused]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              nextSlide();
            } else if (swipe > 10000) {
              prevSlide();
            }
          }}
        >
          <HeroSlide slide={heroSlidesData[index]} />
        </motion.div>
      </AnimatePresence>

      {/* Optional: Add Next/Prev Buttons Here if desired */}
      
      <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-1.5 w-8 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            } transition-colors duration-300`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
