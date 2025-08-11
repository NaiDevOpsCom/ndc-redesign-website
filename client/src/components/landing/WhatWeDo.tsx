import { Card, CardContent } from "@/components/ui/card";
import { whatWeDoData } from "@/data/whatWeDoData";
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useCallback, useState } from 'react';

export default function WhatWeDo() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 3,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // Update active index on slide change
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Group cards into triplets
  const cardTriplets = [];
  for (let i = 0; i < whatWeDoData.length; i += 3) {
    cardTriplets.push(whatWeDoData.slice(i, i + 3));
  }

  return (
    <section className="py-16 bg-[#18465a] dark:bg-[hsla(0,0%,0%,0.8)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">What We Do</h2>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            We’re more than a meetup—we’re a movement. Nairobi DevOps Community exists to empower, connect, and grow the next generation of tech talent through:
          </p>
        </div>
        
        {/* carousel  */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {cardTriplets.map((triplet, idx) => (
              <div key={idx} className="flex min-w-full gap-8 justify-center">
                {triplet.map((service, index) => (
                  <Card key={index} className="bg-[#e6f0fa] rounded-lg shadow-md border-0 w-full max-w-md">
                    <CardContent className="p-8 text-center flex flex-col items-center">
                      <div className="w-10 h-10 mb-4 flex items-center justify-center">
                        <service.icon className="text-[#2563eb] h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold text-[#023047] mb-2">{service.title}</h3>
                      <p className="text-base text-[#22223b] leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Dot indicator for carousel/pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {cardTriplets.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full inline-block transition-colors duration-300 ${
                idx === activeIndex ? 'bg-[#2563eb]' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
