import { Card, CardContent } from "@/components/ui/card";
import { partnersData } from "@/data/partnersData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Partners() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const allPartners = [...partnersData.communityPartners, ...partnersData.campusTour];

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
        >
          <div className="flex">
            {allPartners.map((partner, idx) => (
              <Card
                key={idx}
                className="w-44 h-44 flex-shrink-0 flex items-center justify-center p-4 border-0 mx-6 transition-all duration-500 hover:scale-105 hover:shadow-xl group cursor-pointer"
                style={{ background: '#9E98B333' }}
                onClick={() => window.open(partner.website, '_self')}
              >
                <CardContent className="flex flex-col items-center justify-center h-full w-full p-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-32 w-32 object-contain mb-2 filter grayscale group-hover:filter-none transition-all duration-500"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      const next = e.currentTarget.nextSibling as HTMLElement | null;
                      if (next) {
                        next.style.display = 'block';
                      }
                    }}
                  />
                  <span style={{display: 'none'}} className="text-center text-sm text-foreground font-medium">{partner.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Dot indicator for carousel/pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {allPartners.map((_, idx) => (
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
            onClick={() => window.open('/partners-sponsorship', '_self')}
          >
            <Handshake className="h-5 w-5 text-white" />
              Partner with us
          </Button>
        </div>
      </div>
    </section>
  );
}
