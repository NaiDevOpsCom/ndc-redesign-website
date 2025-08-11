import { Card, CardContent } from "@/components/ui/card";
import { partnersData } from "@/data/partnersData";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Partners() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (!emblaApi) return;
    let autoplay: number;
    const startAutoplay = () => {
      if (!isHovered) {
        autoplay = setInterval(() => {
          emblaApi.scrollNext();
        }, 3500);
      }
    };
    const stopAutoplay = () => {
      if (autoplay) {
        clearInterval(autoplay);
      }
    };
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [emblaApi, isHovered]);

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

  return (
    <section className="py-16 bg-white dark:bg-[#023047] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Partners & Supporters</h2>
          <p> Collaborating to Grow Kenya's DevOps and Tech Talent</p>
        </div>
        <div 
          className="relative overflow-hidden" 
          ref={emblaRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex">
            {partnersData.map((partner, idx) => (
              <Card
                key={idx}
                className="w-44 h-44 flex-shrink-0 flex items-center justify-center p-4 border-0 mx-6 transition-all duration-500 hover:scale-105 hover:shadow-xl group cursor-pointer"
                style={{ background: '#9E98B333' }}
                onClick={() => window.open(partner.website, '_blank', 'noopener,noreferrer')}
              >
                <CardContent className="flex flex-col items-center justify-center h-full w-full p-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-32 w-32 object-contain mb-2 filter grayscale group-hover:filter-none transition-all duration-500"
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling && ((e.currentTarget.nextSibling as HTMLElement).style.display = 'block'); }}
                  />
                  <span style={{display: 'none'}} className="text-center text-sm text-foreground font-medium">{partner.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Dot indicator for carousel/pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {partnersData.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full inline-block transition-colors duration-300 ${
                idx === activeIndex ? 'bg-[#2563eb]' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="bg-primary text-white flex items-center justify-center hover:bg-[#023047] transition-colors duration-200"
            style={{ width: '300px', height: '65px', borderRadius: '8px', gap: '10px' }}
            onClick={() => window.open('/partners', '_blank', 'noopener,noreferrer')}
          >
            <Handshake className="h-5 w-5 text-white" />
            <span style={{ fontWeight: 700, fontSize: '20px', lineHeight: '32px' }}>
              Partner with us
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
