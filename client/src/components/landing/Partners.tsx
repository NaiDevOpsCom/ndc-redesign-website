import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { partnersData } from "@/data/partnersData";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "start",
  dragFree: true, // Allows for continuous, fluid movement
};

export default function Partners() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Set initial active index
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const allPartners = partnersData.communityPartners; // Use original array, rely on Embla's loop option

  return (
    <section className="py-16 bg-white dark:bg-[#023047] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Partners & Supporters
          </h2>
          <p className="text-muted-foreground">
            Collaborating to Grow Kenya&apos;s DevOps and Tech Talent
          </p>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {allPartners.map((partner) => (
              <Card
                key={partner.id}
                className="flex-shrink-0 w-40 h-40 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                onClick={() => window.open(partner.website, "_blank", "noopener noreferrer")}
              >
                <CardContent className="flex flex-col items-center justify-center h-full w-full p-0">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-28 w-28 object-contain filter grayscale group-hover:filter-none transition-all duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: partnersData.communityPartners.length }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                idx === (activeIndex % partnersData.communityPartners.length) ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            onClick={() => window.open("/partners-sponsorship", "_self")}
          >
            <Handshake className="h-5 w-5 text-white mr-2" />
            Partner with us
          </Button>
        </div>
      </div>
    </section>
  );
}
