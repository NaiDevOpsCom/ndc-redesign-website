"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ImageItem = {
    id: number | string;
    title: string;
    desc: string;
    url: string;
    span: string; // Tailwind CSS grid span classes
};

interface InteractiveImageBentoGalleryProps {
    imageItems: ImageItem[];
    title: string;
    description: string;
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 },
    },
};

const ImageModal = ({
    item,
    onClose,
}: {
    item: ImageItem;
    onClose: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative flex max-h-full max-w-7xl flex-col items-center justify-center outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={item.url}
                    alt={item.title}
                    className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
                />
                <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-white/80">{item.desc}</p>
                </div>
            </motion.div>
            <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                aria-label="Close image view"
            >
                <X size={28} />
            </button>
        </motion.div>
    );
};

const InteractiveImageBentoGallery: React.FC<
    InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);

    return (
        <section className="bg-background py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl"
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[300px]"
                >
                    {imageItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className={cn(
                                "group relative cursor-zoom-in overflow-hidden rounded-2xl bg-muted",
                                "min-h-[300px] w-full",
                                item.span
                            )}
                            onClick={() => setSelectedItem(item)}
                            layoutId={`card-${item.id}`}
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <h3 className="line-clamp-1 text-xl font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="line-clamp-1 mt-1 text-sm text-white/80">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ImageModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default InteractiveImageBentoGallery;