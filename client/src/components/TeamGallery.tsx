import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  image: string;
  caption: string;
  fallbackImage?: string;
  note?: string;
}

const ANIMATION_VARIANTS = [
  {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.7, ease: "easeIn" },
  },
  {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: "circOut" },
  },
  {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
    transition: { duration: 0.6, ease: "backInOut" },
  },
  {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.6, ease: "anticipate" },
  },
];

const SLOT_COUNT = 6;

/**
 * EventGallery displays images in a grid with smooth animations and fallback options.
 * It first tries to fetch from the API, then falls back to local images if needed.
 * Supports both local and remote images with proper fallback handling.
 */
export default function EventGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [slotIndexes, setSlotIndexes] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [slotTransitions, setSlotTransitions] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const timers = useRef<(NodeJS.Timeout | null)[]>(Array(SLOT_COUNT).fill(null));

  // Handle image load error and use fallback
  const handleImageError = (originalSrc: string, fallbackSrc: string) => {
    if (!failedImages.has(originalSrc)) {
      setFailedImages(prev => new Set([...prev, originalSrc]));
      // Update the items array to use the fallback image
      setItems(prev => prev.map(item => 
        item.image === originalSrc 
          ? { ...item, image: fallbackSrc }
          : item
      ));
    }
  };

  // Fetch images with fallback
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("API fetch failed");
        
        const data = await response.json();
        if (data && data.length >= SLOT_COUNT) {
          setItems(data);
          setLoading(false);
          return;
        }
        throw new Error("Insufficient API data");
      } catch (err) {
        // Fallback to local images
        try {
          const localData = await import("@/data/galleryImages.json");
          setItems(localData.images);
        } catch (fallbackErr) {
          console.error("Failed to load fallback images:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Set up independent timers for each slot
  useEffect(() => {
    if (items.length < SLOT_COUNT) return;
    // Clear any existing timers
    timers.current.forEach(timer => timer && clearInterval(timer));
    // Set up new timers
    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const randomInterval = 3000 + Math.floor(Math.random() * 4000); // 3-7s
      timers.current[slot] = setInterval(() => {
        setSlotIndexes(prev => {
          const next = [...prev];
          // Pick a new random index for this slot, different from current
          let newIdx;
          do {
            newIdx = Math.floor(Math.random() * items.length);
          } while (newIdx === next[slot] && items.length > 1);
          next[slot] = newIdx;
          return next;
        });
        setSlotTransitions(prev => {
          const next = [...prev];
          next[slot] = Math.floor(Math.random() * ANIMATION_VARIANTS.length);
          return next;
        });
      }, randomInterval);
    }
    return () => {
      timers.current.forEach(timer => timer && clearInterval(timer));
    };
  }, [items]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SLOT_COUNT }).map((_, i) => (
          <div 
            key={i} 
            className="rounded-xl shadow-lg bg-gray-100 animate-pulse h-[220px] sm:h-[260px] lg:h-[220px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {slotIndexes.map((itemIdx, slot) => (
        <AnimatePresence mode="wait" key={slot}>
          <motion.div
            key={items[itemIdx].image + slot + slotTransitions[slot]}
            {...ANIMATION_VARIANTS[slotTransitions[slot]]}
            className="relative rounded-xl shadow-lg overflow-hidden group h-[220px] sm:h-[260px] lg:h-[220px]"
          >
            <motion.img
              src={items[itemIdx].image}
              alt={items[itemIdx].caption}
              className="w-full h-full object-cover"
              style={{ minHeight: 180 }}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={() => items[itemIdx].fallbackImage && 
                handleImageError(items[itemIdx].image, items[itemIdx].fallbackImage!)
              }
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white text-base font-medium px-4 pb-2 drop-shadow-lg">
                {items[itemIdx].caption}
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ))}
      
      {/* {error && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
          Using local fallback images
        </div>
      )} */}
    </div>
  );
}